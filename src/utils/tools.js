/**
 * @file: 工具函数
 * @author: haoxin03(haoxin03@baidu.com)
 */

/**
 * 判断客户端
 * @return {string} 宿主类型 ios | android | pc
 */
export const clientType = () => {
    let client = '';
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        client = 'ios';

    } else if (/(Android)/i.test(navigator.userAgent)) {
        client = 'android';
    } else {
        client = 'pc';
    }
    return client;
};

/**
 * JSON对象key值重命名
 * @param {Object} object 配置项
 * @param {string} key 键名
 * @param {string} newKey 新键名
 * @return {Object} key值重命名后的对象
 */
export const renameKey = (object, key, newKey) => {
    const clonedObj = Object.assign({}, object);
    const targetKey = clonedObj[key];
    if (targetKey && newKey) {
        delete clonedObj[key];
        clonedObj[newKey] = targetKey;
    }
    return clonedObj;
};

/**
 * 根据某属性将对象数组进行分组
 * @param {Array} array 数组对象
 * @param {string} key 键名
 * @param {number} init 分组对象键名默认值
 * @return {Object} 返回已分组的对象
 */
export const splitArr = (array, key, init) => {
    return array.reduce((acc, item) => {
        let currentVal = item[key] || init;
        acc[currentVal] || (acc[currentVal] = []);
        acc[currentVal].push(item);
        return acc;
    }, {});
};
