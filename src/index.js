/**
 * @file: 图片合成方法
 * @author: haoxin
 */

import {
    addImgToCanvas,
    addTextToCanvas,
    addQrCodeToCanvas,
    createCanvas,
    canvasToBase64
} from './utils/canvasUtils';
import {createImg} from './utils/createImg';
import {errorMap} from './config/errorMap';
import {splitArr} from './utils/tools';
import md5 from 'md5';

let hash = ''; ;

/**
 * 绘制背景图
 * @param {Object} config 总配置项
 * @return {Promise<Object>} config 总配置项
 */
export const addBackgroundImg = async config => {
    try {
        const {base, ctx} = config;
        const img = await createImg(base.backgroundImg, base.loadingTimeout);
        const width = base.width || 300;
        const height = base.height || 300;
        ctx.drawImage(img, 0, 0, width, height);
        return config;
    }
    catch (err) {
        return Promise.reject(Object.assign({}, errorMap.ADD_BG_ERROR, {err}));
    }
};

/**
 * 添加动态元素
 * @param {Object} config 总配置项
 * @return {Promise<Object>} config 总配置项
 */
export const addDynamicElementToCanvas = async config => {
    try {
        const {ctx, dynamic = [], replaceText} = config;
        const timeout = config.base.loadingTimeout;

        // 动态配置按weight属性分组
        let weightConfig = splitArr(dynamic, 'weight', 0);
        let weightKeys = Object.keys(weightConfig);
        weightKeys.sort(function (a, b) {
            return a - b;
        });

        // 分组绘制动态元素
        for (let item of weightKeys) {
            let dynamicPromises = [];
            let currWeightConfig = weightConfig[item];
            for (let i = 0; i < currWeightConfig.length; i++) {
                if (currWeightConfig[i].type === 1) {
                    dynamicPromises.push(addImgToCanvas(ctx, currWeightConfig[i], replaceText, timeout));
                }
                else {
                    dynamicPromises.push(addTextToCanvas(ctx, currWeightConfig[i], replaceText));
                }
            }
            await Promise.all(dynamicPromises);
        }
        return config;
    }
    catch (err) {
        return Promise.reject(Object.assign({}, errorMap.ADD_DYNAMIC_ERROR, {err}));
    }
};

/**
 * 缓存base64文件
 * @param {string} base64Img 图片base64字符
 */
export const cacheFile = base64Img => {
    try {
        let base64Queue = JSON.parse(localStorage.getItem('mix_img_base64_queue')) || [];
        base64Queue.push(`mix_img_base64_${hash}`);

        // 缓存超过2个出队 && 删除对应的item
        if (base64Queue.length > 2) {
            localStorage.removeItem(base64Queue.shift());
        }

        localStorage.setItem('mix_img_base64_queue', JSON.stringify(base64Queue));
        localStorage.setItem(`mix_img_base64_${hash}`, base64Img);

    }
    catch (e) {
        console.log(`[mix img log] ${e}`);
    }
};

/**
 * 生成base64图片
 * @param {Object} config 总配置项
 * @return {Promise<Object>} base64字符对象
 */
export const getBase64 = async config => {
    const {canvasImg, base, dev} = config;
    const base64Img = await canvasToBase64(canvasImg, {
        fileType: base.fileType,
        quality: base.quality
    });
    if (!dev?.notUseCache) {
        cacheFile(base64Img);
    }
    return {
        base64: base64Img
    };
};

/**
 * 获取canvas处理流程
 * @param {Object} config 总配置项
 * @return {Promise<Object>} base64字符对象
 */
export const processCanvas = async config => {
    return config
        |> await createCanvas(#)
        |> await addBackgroundImg(#)
        |> await addDynamicElementToCanvas(#)
        |> await addQrCodeToCanvas(#);
};

/**
 * 获取base64处理流程
 * @param {Object} config 总配置项
 * @return {Promise<Object>} canvas对象
 */
export const processBase64 = async config => {
    hash = md5(JSON.stringify(config));
    const localBase64Img = config.dev?.notUseCache ? ''
        : localStorage.getItem(`mix_img_base64_${hash}`);
    // 有缓存 直接读取 | 无缓存 重新获取
    return localBase64Img ? {base64: localBase64Img}
        : config
            |> await createCanvas(#)
            |> await addBackgroundImg(#)
            |> await addDynamicElementToCanvas(#)
            |> await addQrCodeToCanvas(#)
            |> await getBase64(#);
};

/**
 * 图片合成函数
 * @param {Object} mixConfig
 * @param {string} mixConfig.base.dataType 合成类型  默认 'base64' 返回base64图片字符 | 'canvas' 返回canvas对象
 * @return {Promise<Object>} 合成结果
 */
export const mixImg = async mixConfig => {
    const start = (new Date()).getTime();
    try {
        // 深拷贝配置项
        let config = JSON.parse(JSON.stringify(mixConfig));
        let data = config.base.dataType === 'canvas' ? await processCanvas(config) : await processBase64(config);
        console.log(`[mix img time] ${(new Date().getTime() - start)} ms`);
        return {
            errno: 0,
            data
        };
    }
    catch (err) {
        return err;
    }
};
