/**
 * @file 路径配置配置
 * @author zhw(zhw)
 */

import Main from '../components/layout/default';
export default [
    {
        path: '/',
        component: Main,
        redirect: 'imageViewFe',
        children: [
            {
                path: 'imageViewFe',
                component: () => import(/* webpackChunkName: 'dynamicFe' */ '../template/dynamicFe/index')
            }
        ]
    }
];
