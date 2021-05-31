module.exports = {
    extends: [
        // 代码规范检查
        '@ecomfe/eslint-config',
        // 支持vue文件
        '@ecomfe/eslint-config/vue'
    ],
    rules: {
        'comma-dangle': ['error', {
            objects: 'never'
        }]
    }
};
