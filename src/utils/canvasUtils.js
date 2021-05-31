/**
 * @file: 向canvas中增加元素
 * @author: haoxin
 */

import {getQrCodeImg} from './qrcode';
import {clientType, renameKey} from './tools';
import {errorMap} from '../config/errorMap';
import {createImg} from './createImg';

/**
 * 变量替换
 * @param {string} text 带变量的原内容
 * @param {Object} replaceText 待替换的变量对象
 * @return {string} targetText 替换后的内容
 */
export const replaceVariable = (text, replaceText = {}) => {
    const reg = /(.*)({(.*)})(.*)/g;
    const matchTextArr = reg.exec(text);
    return matchTextArr ? matchTextArr[1] + replaceText[matchTextArr[3]] + matchTextArr[4] : text;
};

/**
 * 向canvas中添加文本
 * @param {Object} ctx 上下文对象
 * @param {Object} config 文本配置
 * @param {number} config.position.x 距上距离
 * @param {number} config.position.y 距左距离
 * @param {string} config.style.color 颜色
 * @param {number} config.style.fontSize 大小
 * @param {string} config.style.fontWeight 粗细
 * @param {string} config.style.textAlign 水平对齐方式
 * @param {string} config.style.textBaseline 垂直对齐方式
 * @param {string} config.font 字体设置 优先级高于style中的配置
 * @param {Object} replaceText 替换项对象
 */
export const addTextToCanvas = async (ctx, config = {}, replaceText) => {
    try {
        if (!config.text) {
            return;
        }
        // 颜色
        ctx.fillStyle = config.style?.color;
        // 字体
        const fontSize = config.style?.fontSize ? `${config.style.fontSize}px` : '20px';
        const initFF = clientType() === 'ios' ? 'PingFang SC' : 'Roboto';
        const fontFamily = config.style?.fontFamily ? `${config.style.fontFamily}, ${initFF}` : initFF;
        const fontWeight = config.style?.fontWeight ? `${config.style.fontWeight}` : 'normal';
        ctx.font = config.font ? config.font : `${fontWeight} ${fontSize} ${fontFamily}`;
        // 水平对齐
        ctx.textAlign = config.style?.textAlign ? config.style.textAlign : 'left';
        // 垂直对齐
        ctx.textBaseline = config.style?.textBaseline ? config.style.textBaseline : 'alphabetic';
        // 文本
        const text = replaceVariable(config.text, replaceText);
        // 等待字体加载完毕
        try {
            document?.fonts?.load && await document.fonts.load(ctx.font);
        }
        catch (e) {
            console.error('[Font loading failed]', e);
        }
        ctx.fillText(text, config.position?.x || 0, config.position?.y || 0);
    }
    catch (err) {
        return Promise.reject(Object.assign({}, errorMap.ADD_TEXT_ERROR, {err}));
    }
};

/**
 * 创建圆形裁剪区
 * @param {Object} ctx 上下文对象
 * @param {number} halfWidth 图形半宽
 * @param {number} halfHeight 图形半高
 * @param {number} x 图形距上距离
 * @param {number} y 图形距左距离
 */
export const setClipZone = (ctx, halfWidth, halfHeight, x, y) => {
    ctx.beginPath();
    ctx.arc(halfWidth + x, halfHeight + y, halfWidth, 0, 2 * Math.PI);
    ctx.clip();
};

/**
 * 向canvas中添加图片
 * @param {Object} ctx 上下文对象
 * @param {Object} config 图片配置
 * @param {number} config.position.x 距上距离
 * @param {number} config.position.y 距左距离
 * @param {number} config.size.dWidth 图片宽
 * @param {number} config.size.dHeight 图片高
 * @param {number} config.isRound 是否裁剪为圆形
 * @param {Object} replaceText 替换项对象
 * @param {number} timeout 请求图片的超时时间
 */
export const addImgToCanvas = async (ctx, config = {}, replaceText, timeout) => {
    try {
        if (!config.imgUrl) {
            return;
        }
        // 传入图片为base64不进行变量替换
        const isBase64 = config.imgUrl.startsWith('data:image');
        const src = isBase64 ? config.imgUrl : replaceVariable(config.imgUrl, replaceText);
        const img = await createImg(src, timeout);
        let width = img.width;
        let height = img.height;
        if (config.size && config.size.dWidth && config.size.dHeight) {
            width = config.size.dWidth;
            height = config.size.dHeight;
        }
        ctx.save();
        if (config.isRound) {
            setClipZone(ctx, width / 2, height / 2, config.position?.x, config.position?.y);
        }
        ctx.drawImage(img, config.position?.x, config.position?.y, width, height);
        ctx.restore();
    }
    catch (err) {
        return Promise.reject(Object.assign({}, errorMap.ADD_IMG_ERROR, {err}));
    }
};

/**
 * 向canvas中添加二维码
 * @param {Object} config 配置项
 * @return {Promise<Object>} config 配置项
 */
export const addQrCodeToCanvas = async config => {
    try {
        let {ctx, qrCode, replaceText} = config;
        if (qrCode?.text) {
            qrCode.text = replaceVariable(qrCode.text, replaceText);
            qrCode = renameKey(qrCode, 'foreground', 'colorDark');
            qrCode = renameKey(qrCode, 'background', 'colorLight');
            const qrCodeCanvas = await getQrCodeImg(qrCode);
            ctx.drawImage(qrCodeCanvas, qrCode.x || 0, qrCode.y || 0, qrCode.width || 70, qrCode.height || 70);
        }
        return config.base.dataType === 'canvas' ? {canvas: config.canvasImg} : config;
    }
    catch (err) {
        return Promise.reject(Object.assign({}, errorMap.ADD_QRCODE_ERROR, {err}));
    }
};

/**
 * 创建canvas标签
 * @param {Object} config 配置项
 * @return {Object} canvas对象、canvas上下文与配置项合并后的总配置项
 */
export const createCanvas = config => {
    try {
        const canvasId = '_mixImgCanvas';
        const {width, height} = config.base;
        let canvas = document.getElementById(canvasId);
        if (!canvas) {
            canvas = document.createElement('canvas');
            canvas.id = canvasId;
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return Object.assign({canvasImg: canvas, ctx}, config);
    }
    catch (err) {
        return Promise.reject(Object.assign({}, errorMap.CREATE_CANVAS_ERROR, {err}));
    }
};

/**
 * canvas转base64文件
 * @param {Object} canvas canvas对象
 * @param {Object} fileConfig 文件配置
 * @param {string} fileConfig.fileType 文件类型
 * @param {number} fileConfig.quality 文件质量 0-1
 * @return {string} base64图片的 data URI
 */
export const canvasToBase64 = (canvas, fileConfig = {}) => {
    try {
        const fileType = fileConfig.fileType ? `image/${fileConfig.fileType}` : 'image/jpeg';
        const quality = fileConfig.quality || 0.8;
        return canvas.toDataURL(fileType, quality);
    }
    catch (err) {
        return Promise.reject(Object.assign({}, errorMap.TO_BASE64_ERROR, {err}));
    }
};

