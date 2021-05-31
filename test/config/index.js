/**
 * @file: 配置
 * @author: zhw
 * @Date: 2020-06-30 13:45:06
 * @Last Modified by: zhw
 * @Last Modified time: 2020-12-13 17:44:24
 */

export const addTextToCanvasConfig = {
    type: 2,
    position: {
        x: 187,
        y: 200
    },
    style: {
        fontSize: 34,
        color: '#ffebc0',
        textAlign: 'center',
        fontWeight: 'normal'
    },
    text: '名字叫小芳'
};

export const addTextToCanvasConfigWithReplaceText = {
    type: 2,
    position: {
        x: 187,
        y: 200
    },
    style: {
        fontSize: 34,
        color: '#ffebc0',
        textAlign: 'center',
        fontWeight: 'normal'
    },
    text: '名字叫{name}',
    replaceText: {
        name: '小明'
    }
};

export const addImgToCanvasConfig = {
    type: 1,
    imgUrl: 'https://efe-h2.cdn.bcebos.com/ceug/resource/res/2020-09/1599455753277/pu26hccjgzoj.png',
    position: {
        x: 39,
        y: 200
    },
    size: {
        dWidth: 150,
        dHeight: 50
    }
};

export const dynamicConfig = [addTextToCanvasConfig, addImgToCanvasConfig];

export const backgroundImgConfig = {
    backgroundImg: 'https://efe-h2.cdn.bcebos.com/ceug/resource/res/2020-07/1594797097021/ml9v716tnxoc.jpg',
    width: 375,
    height: 667,
    quality: 0.8,
    fileType: 'jpeg'
};

export const qrCodeConfig = {
    width: 80,
    height: 80,
    text: 'https://www.baidu.com',
    x: 275,
    y: 573,
    background: '#cccccc',
    foreground: '#000d54',
    correctLevel: 1
};

export const userAgentMap = {
    pc: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36',
    android: 'Mozilla/5.0 (Linux; Android 10; YAL-AL10 Build/HUAWEIYAL-AL10; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/76.0.3809.89 Mobile Safari/537.36 T7/12.5 SP-engine/2.26.0 baiduboxapp/12.5.1.10 (Baidu; P1 10) NABar/1.0',
    ios: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) BaiduBoxApp/12.5.0 Mobile/18B92 Safari/602.1 SP-engine/2.26.0 main%2F1.0 baiduboxapp/12.5.0.11 (Baidu; P2 14.2) NABar/1.0 webCore=0x12c6b1320'
};
