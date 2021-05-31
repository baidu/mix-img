/**
 * @file: vue conf
 * @author: zhw(zhenghaiwang)
 * @Date: 2020-03-24 23:46:04
 * @Last Modified by: zhw
 * @Last Modified time: 2020-12-31 15:57:50
 */

module.exports = {
    publicPath: '/mix-img-toolkit',
    assetsDir: '',
    // outputDir: 'dist',
    devServer: {
        compress: true,
        port: 9000,
        // host: 'ug.baidu-int.com',
        host: '0.0.0.0',
        historyApiFallback: true,
        hot: true,
        inline: true,
        open: true
    }
};
