## mixImg 图片合成方法

### 使用
```js
import {mixImg} from 'mix-img';
import {mixConfig} from './mixConfig';  // 配置文件路径自定义
async function getImg() {
    const res = await mixImg(mixConfig);
    console.log('图片合成结束', res);
}
```

### 参数示例
```js
export const mixConfig = {
    'replaceText': {
        'submitName': '朱雀号',
        'userName': '百度网友123',
        'avatarUrl': 'https://efe-h2.cdn.bcebos.com/ceug/resource/res/2020-07/1594717976441/idyexeq1u92w.png',
        'qrCodeUrl': 'https://www.baidu.com'
    },
    'base': {
        'backgroundImg': 'https://efe-h2.cdn.bcebos.com/ceug/resource/res/2020-07/1594797097021/ml9v716tnxoc.jpg',
        'width': 375,
        'height': 667,
        'quality': 0.8,
        'fileType': 'jpeg'
    },
    'qrCode': {
        'width': 74,
        'height': 74,
        'text': '{qrCodeUrl}',
        'x': 279,
        'y': 576,
        'correctLevel': 1
    },
    'dynamic': [
        {
            'type': 2,
            'position': {
                'x': 187,
                'y': 353
            },
            'style': {
                'fontSize': 22,
                'color': '#ffebc0',
                'textAlign': 'center',
                'fontWeight': 'bold'
            },
            'text': '『{submitName}』'
        },
        {
            'type': 1,
            'position': {
                'x': 169,
                'y': 207
            },
            'size': {
                'dWidth': 40,
                'dHeight': 40
            },
            'imgUrl': '{avatarUrl}',
            'isRound': true
        },
        {
            'type': 2,
            'position': {
                'x': 187,
                'y': 268
            },
            'style': {
                'textAlign': 'center',
                'fontSize': 16,
                'color': '#ffebc0',
                'fontWeight': 'normal'
            },
            'text': '{userName}'
        }
    ]
};
```

> 参数含义可参见 [mixConfig参数说明文档](./docs/mixConfig.md)

### 返回数据

#### 合成成功

1.dataType 为 base64

- 返回参数说明

| 参数 | 类型 | 说明 |
| ------ | ------ | ------ |
| errno | Number | 错误码，合成成功时为 0 |
| data | Object | 数据对象 |
| data.base64 | String | 图片的 base64 字符 |

- 返回示例
```json5
{
    errno: 0,
    data: {
        base64: 'data:image/jpeg;base64,000'
    }
}
```
2.dataType 为 draw
- 返回参数说明

| 参数 | 类型 | 说明 |
| ------ | ------ | ------ |
| errno | Number | 错误码，合成成功时为 0 |
| data | Object | 数据对象 |
| data.canvas | Object | 绘制完成的 canvas 对象 |

- 返回示例
```json5
{
    errno: 0,
    data: {
        canvas: '<canvas id="_mixImgCanvas"></canvas>'  // 绘制完成的 canvas 对象
    }
}
```

#### 合成失败
- 返回参数说明

| 参数 | 类型 | 说明 |
| ------ | ------ | ------ |
| errno | Number | 错误码 |
| errmsg | String | 错误描述 |
| err | Object / String | 错误信息 |

- 返回示例
```json5
{
    errno: 90002,
    errmsg: '[mix img err] 创建img标签超时！',
    err: 'img response time more than 5000 ms'
}
```
