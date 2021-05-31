import babel from 'rollup-plugin-babel';
import serve from 'rollup-plugin-serve';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
const internalIp = require('internal-ip');
const devHost = internalIp.v4.sync();
export default {
    input: 'test/e2e/index.js',
    output: {
        file: 'dist/e2e/test.js',
        format: 'iife'
    },
    plugins: [
        babel({
            include: ['src/**', 'test/**']
        }),
        resolve(),
        commonjs(),
        serve({
            host: devHost,
            open: true,
            openPage: '/test.html',
            contentBase: ['test/e2e', 'dist'],
            port: 8899
        })
    ]
};
