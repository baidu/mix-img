/**
 * @file: 入口文件
 * @author: zhw
 * @Date: 2020-03-25 00:04:33
 * @Last Modified by: zhw
 * @Last Modified time: 2020-12-27 14:04:18
 */
import Vue from 'vue';
import ViewUI from 'view-design';
import App from './App.vue';
import router from './router';
import 'view-design/dist/styles/iview.css';

Vue.use(ViewUI);

// 开启debug模式
Vue.config.debug = true;

// eslint-disable-next-line no-new
new Vue({
    el: '#app',
    router,
    render: h => h(App)
});

