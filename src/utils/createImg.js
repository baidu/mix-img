/**
 * 创建启用了CORS的图片
 * @param {string} src 图片的src
 * @param {number} timeout 请求图片的超时时间
 * @return {Promise<Element>} HTMLImageElement img对象
 */
import {errorMap} from '../config/errorMap';

export const createImg = (src, timeout = 5000) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.src = src;
        setTimeout(() => {
            reject(Object.assign({}, errorMap.CREATE_IMG_TIMEOUT, {
                err: `img response time more than ${timeout} ms`,
                errSrc: src
            }));
        }, timeout);
        img.onload = () => {
            resolve(img);
        };
        img.onerror = err => {
            reject(Object.assign({}, errorMap.CREATE_IMG_ERROR, {err, errSrc: src}));
        };
    });
};
