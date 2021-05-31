/**
 * @file: 二维码生成
 * @author: haoxin03(haoxin03@baidu.com)
 */

import QRCode from 'qrcodejs2-fixes';

/**
 * 获取二维码canvas对象
 * @param {Object} config 二维码配置项
 * @return {Promise<Element>} HTMLCanvasElement 绘制了二维码的canvas对象
 */
export const getQrCodeImg = config => {
    return new Promise((resolve, reject) => {
        const options = Object.assign({
            width: 70,
            height: 70,
            colorDark: '#000000',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.L
        }, config, {text: ''});

        const qrWrap = document.createElement('div');
        const qrCode = new QRCode(qrWrap, options);
        qrCode.makeCode(config.text);
        const qrCodeCanvas = qrWrap.getElementsByTagName('canvas')[0];
        resolve(qrCodeCanvas);
    });
};
