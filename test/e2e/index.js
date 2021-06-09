/**
 * @file: e2e入口文件
 * @author: zhw
 * @Date: 2021-01-09 13:34:21
 * @Last Modified by: zhw
 * @Last Modified time: 2021-05-31 22:08:08
 */
import san from 'san';
import {mixImg} from '../../src/index';
import {canvasConfig, base64Config} from '../config/allConfig';

const App = san.defineComponent({
    template: ` <div class="wrap">
                    <div>合成图片测试</div>
                    <div class="mi-btn" on-click="getImg">合成图片</div>
                    <div id="show-img-wrap"></div>
                    <div id="font-load-one">.</div>
                    <div id="font-load-two">.</div>
                </div>`,
    async getImg() {
        const res = await mixImg(canvasConfig);
        // 返回了canvas则置入页面
        if (res.errno === 0 && res.data.canvas) {
            document.getElementById('show-img-wrap').appendChild(res.data.canvas);
        }
        console.log('图片合成结束~~', res);
    }
});

new App().attach(document.body);
