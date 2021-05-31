## 调试工具
### 产生背景
图片合成的配置项包含 base（基本配置）、replaceText（替换字段配置）、qrCode（二维码配置）、dynamic（动态元素配置）四大项。 其中动态元素配置更是会有很多的情况，调试配置参数很困难。为了减少开发人员工作量，内置了参数调试工具。用户可以在平台内更改参数，预览合成图片效果。调试完毕后，复制最终配置到项目中使用。

### 如何启动
```
# 将代码clone到本地
git clone https://github.com/baidu/mix-img.git
# 安装依赖
npm i
# 启动配置调试工具
npm run tool
```

### 工具界面
![图片](https://efe-h2.cdn.bcebos.com/ceug/resource/res/2021-05/1620978160538/b0006kpaixoi.png)

### 使用步骤
1. 修改 JSON 配置
2. 点击「生成预览」按钮，进行预览
3. 参数调试完毕，点击「复制配置」按钮
