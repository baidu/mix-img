/**
 * @file: babel配置文件
 * @author: zhw
 * @Date: 2021-01-09 14:16:42
 * @Last Modified by: zhw
 * @Last Modified time: 2021-05-31 22:08:36
 */
module.exports = function (api) {
    api.cache(true);
    const presets = [];
    const plugins = [
        '@babel/plugin-proposal-optional-chaining',
        '@babel/plugin-proposal-async-generator-functions',
        ['@babel/plugin-proposal-pipeline-operator', {proposal: 'smart'}]
    ];
    // 打包umd模块包含完备的polyfill
    if (process.env.NODE_ENV === 'build:umd') {
        presets.push([
            '@babel/preset-env',
            {
                useBuiltIns: 'usage',
                corejs: 3
            }
        ]);
    }
    // 单测需要转一下es modules至commonjs
    if (process.env.NODE_ENV === 'test') {
        plugins.push('@babel/plugin-transform-modules-commonjs');
    }
    return {
        presets,
        plugins
    };
};
