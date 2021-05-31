/**
 * @file: rollup umd配置文件
 * @author: haoxin
 */
// rollup.umd.config.js
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import {terser} from 'rollup-plugin-terser';
export default [
    {
        input: 'src/index.js',
        output: {
            file: './dist/umd/index.umd.js',
            format: 'umd',
            name: 'mixImg'
        },
        plugins: [
            babel({
                runtimeHelpers: true,
                extensions: ['.js'],
                exclude: 'node_modules/**'
            }),
            resolve(),
            commonjs(),
            terser()
        ],
        watch: {
            include: 'src/**'
        }
    }
];

