# mix-img
mix-img图片合成工具，通过调用canvas API实现包括图片和文字的合成并最终生成图片base64，合成成功后向用户展示和分享。

![image](https://efe-h2.cdn.bcebos.com/ceug/resource/res/2021-03/1616594872570/aol5g54dm8p7.jpg)
## Install

```js
npm install --save mix-img
```
## Quick Start
```js
import {mixImg} from 'mix-img';
import {mixConfig} from './mixConfig';  // 配置文件路径自定义
async function getImg() {
    const res = await mixImg(mixConfig);
    console.log('图片合成结束', res);
}
```

> mixConfig参数配置可参见参数说明文档；Lib库使用者可以通过调试工具在本地进行预览调试，生成配置。

## Document
- [Start](./README.md)
- [Example](./test/e2e/index.js)
- [mixImg方法使用说明](./docs/mixImg.md)
- [mixConfig参数说明文档](./docs/mixConfig.md)
- [参数调试工具](./docs/tool.md)
- [本库开发者阅读](./docs/dev.md)

## ChangeLog
Please visit document [ChangeLog](./CHANGELOG.md)
