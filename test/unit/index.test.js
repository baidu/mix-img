/**
 * @file: 测试index文件
 * @author: haoxin
 */

// createImg方法调用了onload, 但jest-canvas-mock暂时还没找到可以开启这个方法的地方，故mock
jest.mock('../../src/utils/createImg', () => {
    return {
        createImg: jest.fn(() => {
            const img = global.document.createElement('img');
            img.src = '';
            return img;
        }),
        __esModule: true
    };
});

import {
    addBackgroundImg,
    addDynamicElementToCanvas,
    getBase64,
    mixImg
} from '../../src/index';
// config
import {backgroundImgConfig, dynamic} from '../config';
import {base64Config, canvasConfig} from '../config/allConfig';

describe('绘制背景图', () => {
    it('绘制背景图成功', async () => {
        const canvas = document.createElement('canvas').getContext('2d');
        const data = await addBackgroundImg({ctx: canvas, base: backgroundImgConfig});
        expect(data).toHaveProperty('base');
    });
    it('绘制背景图失败', async () => {
        expect.assertions(1);
        try {
            await addBackgroundImg();
        }
        catch (e) {
            expect(e).toHaveProperty('errno', 20001);
        }
    });
});

describe('添加动态元素', () => {
    Object.defineProperty(document, 'fonts', {
        writable: true,
        value: {
            load: jest.fn().mockImplementation(() => Promise.resolve())
        }
    });
    it('添加动态元素成功', async () => {
        const canvas = document.createElement('canvas').getContext('2d');
        const data = await addDynamicElementToCanvas({ctx: canvas, dynamic, base: {}});
        expect(data).toHaveProperty('dynamic');
    });
    it('添加动态元素失败', async () => {
        expect.assertions(1);
        try {
            await addDynamicElementToCanvas();
        }
        catch (e) {
            expect(e).toHaveProperty('errno', 30001);
        }
    });
});

describe('生成base64图片对象', () => {
    it('生成jpeg图片', async () => {
        const canvas = document.createElement('canvas');

        const {base64} = await getBase64({
            canvasImg: canvas,
            base: {
                fileType: 'jpeg',
                quality: '0.8'
            }
        });
        expect(base64).toMatch(/data:image\/jpeg;base64,/);
    });

    it('生成png图片', async () => {
        let canvas = document.createElement('canvas');
        const {base64} = await getBase64({
            canvasImg: canvas,
            base: {
                fileType: 'png',
                quality: '1'
            }
        });
        expect(base64).toMatch(/data:image\/png;base64,/);
    });
});

describe('图片合成函数是否正常', () => {
    it('dataType传参为base64', async () => {
        const res = await mixImg(base64Config);
        expect(res.data.base64).toMatch(/data:image\/jpeg;base64,/);
    });

    it('dataType传参为canvas', async () => {
        const res = await mixImg(canvasConfig);
        expect(res.data.canvas).toHaveProperty('id', '_mixImgCanvas');

    });
});

