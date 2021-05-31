/**
 * @file errorMap
 * @author haoxin(haoxin03@baidu.com)
 */

export const errorMap = {
    CREATE_CANVAS_ERROR: {errno: 10001, errmsg: '[mix img err] 创建canvas标签出错！'},
    ADD_BG_ERROR: {errno: 20001, errmsg: '[mix img err] 绘制背景图出错！'},
    ADD_DYNAMIC_ERROR: {errno: 30001, errmsg: '[mix img err] 添加动态元素错误！'},
    ADD_TEXT_ERROR: {errno: 300011, errmsg: '[mix img err] 添加文字错误！'},
    ADD_IMG_ERROR: {errno: 300012, errmsg: '[mix img err] 添加图片错误！'},
    ADD_QRCODE_ERROR: {errno: 30002, errmsg: '[mix img err] 添加二维码错误！'},
    TO_BASE64_ERROR: {errno: 40001, errmsg: '[mix img err] canvas转base64出错！'},
    CREATE_IMG_ERROR: {errno: 90001, errmsg: '[mix img err] 创建img标签出错！请排查该图片是否跨域'},
    CREATE_IMG_TIMEOUT: {errno: 90002, errmsg: '[mix img err] 创建img标签超时！'}
};
