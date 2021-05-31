/**
 * @file: rollup配置文件
 * @author: zhw
 * @Date: 2020-07-06 16:16:49
 * @Last Modified by: zhw
 * @Last Modified time: 2021-01-09 16:27:16
 */
// rollup.config.js
import babel from 'rollup-plugin-babel';
import {terser} from 'rollup-plugin-terser';
export default [
    {
        input: 'src/index.js',
        output: {
            file: './dist/index.min.js',
            format: 'es'
        },
        plugins: [
            babel({
                runtimeHelpers: true,
                extensions: ['.js'],
                exclude: 'node_modules/**'
            }),
            terser()
        ],
        watch: {
            include: 'src/**'
        }
    },
    {
        input: 'src/index.js',
        output: {
            file: './dist/index.js',
            format: 'es'
        },
        plugins: [
            babel({
                runtimeHelpers: true,
                extensions: ['.js'],
                exclude: 'node_modules/**'
            })
        ],
        watch: {
            include: 'src/**'
        }
    }
];

