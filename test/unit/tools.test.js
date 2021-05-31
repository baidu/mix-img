/**
 * @file: 测试utils方法
 * @author: haoxin
 */

import {clientType, renameKey, splitArr} from '../../src/utils/tools';
import {userAgentMap, qrCodeConfig, dynamicConfig} from '../config';

describe('判断clientType方法', () => {
    it('clientType为android', () => {
        Object.defineProperty(navigator, 'userAgent', {
            writable: true,
            value: userAgentMap.android
        });
        expect(clientType()).toBe('android');
    });

    it('clientType为ios', () => {
        Object.defineProperty(navigator, 'userAgent', {
            writable: true,
            value: userAgentMap.ios
        });
        expect(clientType()).toBe('ios');
    });

    it('clientType为pc', () => {
        Object.defineProperty(navigator, 'userAgent', {
            writable: true,
            value: userAgentMap.pc
        });
        expect(clientType()).toBe('pc');
    });
});

describe('renameKey方法', () => {
    it('重写对象属性名成功', () => {
        const obj = renameKey(qrCodeConfig, 'foreground', 'colorDark');
        expect(obj).toHaveProperty('colorDark');
    });

    it('被重写的属性不存在时是否不做处理', () => {
        const obj = renameKey(qrCodeConfig, 'noExistKey', 'newName');
        expect(obj).not.toHaveProperty('newName');
    });


    it('新属性名为空时是否不做处理', () => {
        const obj = renameKey(qrCodeConfig, 'foreground', '');
        expect(obj).toHaveProperty('foreground');
    });
});

describe('splitArr方法', () => {
    it('根据weight属性分组成功', () => {
        const obj = splitArr(dynamicConfig, 'weight', 0);
        expect(obj[0]).toHaveLength(2);
    });
});
