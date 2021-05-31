/**
 * @file: 测试h5
 * @author: zhw
 * @Date: 2020-06-30 13:45:06
 * @Last Modified by: zhw
 * @Last Modified time: 2021-01-09 16:48:33
 */

let mockImg = {};
let mockCanvas = {};

// createImg方法调用了onload, 但jest-canvas-mock暂时还没找到可以开启这个方法的地方，故mock
jest.mock('../../src/utils/createImg', () => {
    return {
        createImg: jest.fn(() => {
            const img = global.document.createElement('img');
            img.src = 'https://efe-h2.cdn.bcebos.com/ceug/resource/res/2020-09/1599455753277/pu26hccjgzoj.png';
            mockImg = img;
            return img;
        }),
        __esModule: true
    };
});

// 生成二维码canvas引用外部库，故mock
jest.mock('../../src/utils/qrcode', () => {
    return {
        getQrCodeImg: jest.fn(() => {
            const qrcodeCanvas = global.document.createElement('canvas');
            mockCanvas = qrcodeCanvas;
            return qrcodeCanvas;
        }),
        __esModule: true
    };
});

import {
    replaceVariable,
    addTextToCanvas,
    addImgToCanvas,
    setClipZone,
    addQrCodeToCanvas
} from '../../src/utils/canvasUtils';
import {
    addTextToCanvasConfig,
    addTextToCanvasConfigWithReplaceText,
    addImgToCanvasConfig,
    qrCodeConfig
} from '../config';

// const canvas = document.createElement('canvas');
// const events = canvas.__getEvents();
describe('replaceVariable替换方法', () => {
    it('replaceVariable变量替换返回是否正常', () => {
        const text = replaceVariable('{prize}元奖金', {prize: 100});
        expect(text).toBe('100元奖金');
    });
    it('replaceVariable传入空和null返回是否正常', () => {
        const text = replaceVariable('', null);
        expect(text).toBe('');
    });
    it('replaceVariable仅传了变量文本返回是否正常', () => {
        const text = replaceVariable('{prize}元奖金');
        expect(text).toBe('undefined元奖金');
    });
});

describe('向canvas中添加文本', () => {
    Object.defineProperty(document, 'fonts', {
        writable: true,
        value: {
            load: jest.fn().mockImplementation(() => Promise.resolve())
        }
    });
    it('没有替换字段的文本', async () => {
        const canvas = document.createElement('canvas').getContext('2d');
        await addTextToCanvas(canvas, addTextToCanvasConfig);
        const events = canvas.__getEvents();
        expect(events).toMatchSnapshot();
    });
    it('有替换字段的文本', async () => {
        const canvas = document.createElement('canvas').getContext('2d');
        await addTextToCanvas(
            canvas, addTextToCanvasConfigWithReplaceText, addTextToCanvasConfigWithReplaceText.replaceText
        );
        expect(canvas.fillText).toBeCalledWith('名字叫小明', 187, 200);
    });
});

describe('向canvas中添加图片', () => {
    it('添加图片', async () => {
        const canvas = document.createElement('canvas').getContext('2d');
        await addImgToCanvas(canvas, addImgToCanvasConfig);
        const calls = canvas.__getDrawCalls();
        expect(calls).toMatchSnapshot();
        expect(canvas.drawImage).toBeCalledWith(mockImg, 39, 200, 150, 50);
    });
});

describe('设置clipZone', () => {
    it('添加图片', () => {
        const canvas = document.createElement('canvas').getContext('2d');
        setClipZone(canvas, 4, 4, 80, 80);
        const calls = canvas.__getDrawCalls();
        expect(calls).toMatchSnapshot();
        expect(canvas.arc).toBeCalledWith(84, 84, 4, 0, 6.283185307179586);
    });
});

describe('向canvas中添加二维码', () => {
    it('绘制二维码', async () => {
        const canvas = document.createElement('canvas').getContext('2d');
        await addQrCodeToCanvas({ctx: canvas, qrCode: qrCodeConfig, base: {}});
        const calls = canvas.__getDrawCalls();
        expect(calls).toMatchSnapshot();
        expect(canvas.drawImage).toBeCalledWith(mockCanvas, 275, 573, 80, 80);
    });
});
