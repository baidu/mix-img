<template>
    <div class="dynamic-template">
        <Tabs value="JSON_EDITOR" class="tabs">
            <TabPane label="JSON配置" name="JSON_EDITOR">
                <div ref="json" class="json-contain">
                </div>
            </TabPane>
        </Tabs>
        <Card
            class="image-contain"
            :padding="10"
        >
            <p slot="title">图片预览</p>
            <div class="image-box">
            </div>
        </Card>
        <div class="button-list">
            <Button
                class="button-item" type="primary"
                @click="preview"
            >生成预览</Button>
            <Button
                class="button-item copy-button"
                type="warning"
                :data-clipboard-text="copyText"
                @click="copy"
            >复制配置</Button>
        </div>
    </div>
</template>
<script>
import JSONEditor from 'jsoneditor';
import 'jsoneditor/dist/jsoneditor.min.css';
import Clipboard from 'clipboard';
import {mixImg} from 'mix-img';

export default {
    data() {
        return {
            editor: null,
            basicFormModel: {
                backgroundImg: 'https://efe-h2.cdn.bcebos.com/ceug/resource/res/2020-07/1594797097021/ml9v716tnxoc.jpg',
                width: 375,
                height: 667,
                quality: 0.8,
                fileType: 'jpeg',
                dataType: 'canvas'
            },
            qrCodeFormModel: {
                width: 100,
                height: 100,
                text: 'https://www.baidu.com',
                x: 270,
                y: 573,
                correctLevel: 1
            },
            dynamicFormModel: [
                {
                    type: 2,
                    position: {
                        x: 187,
                        y: 350
                    },
                    style: {
                        fontSize: 34,
                        color: '#ffebc0',
                        textAlign: 'center',
                        fontWeight: 'bold'
                    },
                    text: '{variate}'
                },
                {
                    type: 1,
                    position: {
                        x: 162,
                        y: 200
                    },
                    size: {
                        dWidth: 50,
                        dHeight: 50
                    },
                    imgUrl: 'https://efe-h2.cdn.bcebos.com/ceug/resource/res/2020-07/1594717976441/idyexeq1u92w.png',
                    isRound: true
                }
            ],
            replaceFinalText: {
                variate: '小明',
                avatarUrl: 'https://efe-h2.cdn.bcebos.com/ceug/resource/res/2020-12/1608522700040/yq3fma464m5y.png'
            },
            copyText: ''
        };
    },
    computed: {
        // 表单数据
        formData() {
            return Object.assign(
                {},
                {
                    base: this.basicFormModel,
                    qrCode: this.qrCodeFormModel,
                    dynamic: this.dynamicFormModel,
                    replaceText: this.replaceFinalText
                }
            );
        }
    },
    mounted() {
        this.editor = new JSONEditor(this.$refs.json, {
            modes: ['code', 'text', 'preview']
        });
        this.editor.set(this.formData);
        this.preview();
    },
    methods: {
        async preview() {
            const res = await mixImg(this.editor.get());
            console.log('图片合成结束~~', res);
            if (res.errno === 0 && res.data.canvas) {
                document.getElementsByClassName('image-box')[0].appendChild(res.data.canvas);
            }
        },

        // 复制配置
        copy() {
            this.copyText = this.editor && JSON.stringify(this.editor.get());
            const clipboard = new Clipboard('.copy-button');
            clipboard.on('success', e => {
                this.$Message.info('复制成功');
                e.clearSelection();
                clipboard.destroy();
            });
        }
    }
};
</script>
<style lang="less">
.dynamic-template {
    display: flex;
    justify-content: space-between;
    .tabs {
        width: 1000px;
        .form-pannel {
            position: relative;
            &-dele {
                position: absolute;
                right: 10px;
                top: 50%;
                margin-top: -9px;
            }
        }
    }
    .button-list {
        width: 100px;
        text-align: center;
        padding-top: 100px;
        .button-item {
            margin-top: 50px;
        }
    }
    .image-contain {
        width: 434px;
        height: 100%;
        margin: 30px;
        .image-box {
            #_mixImgCanvas {
                width: 100%;
            }
        }
    }
    .json-contain {
        width: 100%;
        height: 780px;
    }
    .title-btn-right {
        margin: 20px 0 0 50px;
    }
}
</style>
