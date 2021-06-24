## mixConfig 图片合成参数

### 参数说明
#### mixConfig 参数说明
|参数名|类型|必填|说明|备注|
|---|---|---|---|---|
|replaceText|Object|否|替换字段配置|需要替换的属性设置为 `{变量}` <br>支持替换的内容：动态配置中文本的 text、动态配置中图片的 imgUrl、二维码配置的 text|
|base|Object|是|基本配置|具体配置参见 base 参数说明|
|qrCode|Object|否|二维码配置|具体配置参见 qrCode 参数说明|
|dynamic|Array.&lt;object&gt;|否|动态配置|具体配置参见 dynamic 参数说明|
|dev|Object|否|开发配置|具体配置参见 dev 参数说明|

#### base 参数说明

|参数名|类型|必填|默认值|说明|备注|
|---|---|---|---|---|---|
|backgroundImg|String|否|-|合成图片的背景图，支持 url 或 base64<br>若不传，fileType 为 jpeg 时背景为黑色，为 png 时背景透明|图片过大影响性能，建议压缩至 100k 以下|
|width|Number|是|300|合成图片的宽度|单位 px|
|height|Number|是|300|合成图片的高度|单位 px|
|quality|Number|否|0.8|生成图片的质量，取值范围为 (0, 1]|建议设置为0.9及以下|
|fileType|String|否|jpeg|生成图片的数据类型，值为 jpeg 或 png|-|
|dataType|String|否|base64|最终返回的数据格式，值为 base64 或 canvas|默认返回 base64 字符；若指定为 canvas，则返回绘制完毕的 canvas 对象|
|loadingTimeout|Number|否|5000|加载图片响应超时时间|单位 ms，背景图、动态图片超过该时间未加载完毕则返回超时信息|

#### qrCode 参数说明

|参数名|类型|必填|默认值|说明|备注|
|---|---|---|---|---|---|
|width|Number|是|70|生成二维码宽度|单位 px|
|height|Number|是|70|生成二维码高度|单位 px|
|text|String|是|-|要转换成二维码的文本|支持变量，如：`{qrcodeUrl}`|
|x|Number|是|0|横坐标信息|起始点为背景图片左上角|
|y|Number|是|0|纵坐标信息|起始点为背景图片左上角|
|background|String|否|#ffffff|二维码背景色|-|
|foreground|String|否|#000000|二维码前景色|-|
|correctLevel|Number|否|1|容错级别，值为 1、0、3、2|对应容错率为：L (7%)、M (15%)、Q (25%)、H (30%)<br>级别越高，二维码图片允许遮挡的部分越多，二维码信息越复杂|

#### dynamic 参数说明

* 动态信息为图片时：type = 1

|参数名|类型|必填|默认值|说明|备注|
|---|---|---|---|---|---|
|type|Number|是|-|动态信息类型，1 为图片、2 为文字||
|imgUrl|String|是|-|图片地址，支持 url 或 base64|支持变量，如：`{avatarUrl}`|
|size|Object|是|-|-|-|
|size.dWidth|Number|是|图片实际宽度|绘制图片的宽度|单位 px|
|size.dHeight|Number|是|图片实际高度|绘制图片的高度|单位 px|
|position|Object|是|-|-|-|
|position.x|Number|是|0|横坐标信息|起始点为背景图片左上角|
|position.y|Number|是|0|纵坐标信息|起始点为背景图片左上角|
|isRound|Boolean|否|false|是否绘制成圆形|-|
|weight|Number|否|0|绘制权重|权重越大，绘制越晚，层级越高|

* 动态信息为文字时：type = 2

|参数名|类型|必填|默认值|说明|备注|
|---|---|---|---|---|---|
|type|Number|是|-|动态信息类型，1 为图片、2 为文字|-|
|text|String|是|-|文字内容|支持变量，如：`{userName}`|
|style|Object|是|-|-|-|
|style.color|String|是|#000000|文字颜色|-|
|style.fontSize|Number|是|20|文字大小|单位px|
|style.fontWeight|String|否|normal|文字粗细，值为 normal、bold、lighter|-|
|style.fontFamily|String|否|PingFang SC / Roboto|文字字体|IOS 为`PingFang SC`，Android 为`Roboto`|
|style.textAlign|String|是|left|文字水平方向对齐方式，值为 left、center、right 等|[textAlign 文档](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/textAlign)|
|style.textBaseline|String|是|alphabetic|文字垂直方向对齐方式|[textBaseline 文档](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/textBaseline)|
|position|Object|是|-|-|-|
|position.x|Number|是|0|横坐标信息|起始点为背景图片左上角|
|position.y|Number|是|0|纵坐标信息|起始点为背景图片左上角|
|weight|Number|否|0|绘制权重|权重越大，绘制越晚，层级越高|

#### dev 参数说明
|参数名|类型|必填|默认值|说明|备注|
|---|---|---|---|---|---|
|notUseCache|Boolean|否|false|是否禁用缓存|默认启用缓存策略|
> 缓存策略：当 dataType 为默认值返回 base64 时，会使用当前传入配置 mixConfig 的 md5 值做键名，缓存合成后的 base64 字符（仅缓存最新的两条）。当用户传入相同配置项时，会从缓存中直接读取 base64 字符。


### 注意事项
#### 1. 动态元素 weight 属性
weight 属性可以控制动态元素的绘制层级，当动态配置中两个元素存在覆盖关系时，上方元素的 weight 属性需要设置更大的值。若 weight 属性值相同，则绘制层级随机。
- 图片示例
![图片](https://efe-h2.cdn.bcebos.com/ceug/resource/res/2021-03/1615882302636/q7eb8uj36ww2.png)


#### 2. 文字使用自定义字体
>【注意】请确认使用的自定义字体已获得授权，增强法律意识，避免字体侵权行为。

a. 声明自定义字体
- css
```css
@font-face {
    font-family: 'myFont';
    src: url("https://efe-h2.cdn.bcebos.com/ceug/resource/res/2021-1/1611891166782/c4964f1209aa.ttf") format('truetype');
}
```

b. 预下载自定义字体

通常情况下，当页面元素用到了 font-face 中定义的字体，则会执行下载。
- css
```css
#font-loaded {
    font-size: 0;
    font-family: 'myFont', sans-serif;
}
```

- html
```html
<div id="font-loaded">.</div>
```

c. 动态配置中 fontFamily 设置为自定义字体

- 动态配置
```
'dynamic': [
    {
        'type': 2,
        'position': {
            'x': 187,
            'y': 353
        },
        'style': {
            'fontFamily': 'myFont'
            'fontSize': 22,
            'color': '#ffebc0',
            'textAlign': 'center'
        },
        'text': '『自定义字体abc123』'
    }
]
```

> 在绘制文字前，使用了 [FontFaceSet.load()](https://developer.mozilla.org/en-US/docs/Web/API/FontFaceSet/load) 方法等待自定义字体下载完毕再进行后续操作。由于该API存在兼容性问题，若当前环境不可用，且绘制文字时找不到已加载的自定义字体，本次将使用默认字体进行绘制，同时触发自定义字体的加载。
