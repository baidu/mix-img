/**
 * @file: 路由处理
 * @author: zhw(zhenghaiwang)
 * @Date: 2020-03-24 23:36:24
 * @Last Modified by: zhw
 * @Last Modified time: 2020-12-18 17:42:27
 */
import Vue from 'vue';
import Router from 'vue-router';
import routes from './routers';

Vue.use(Router);
const router = new Router({
    routes,
    mode: 'hash'
});

export default router;
