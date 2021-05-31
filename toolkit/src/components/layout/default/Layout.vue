<template>
    <Layout class="layout-container">
        <appHeader/>
        <Layout class="layout-body ivu-layout-has-sider">
            <Layout class="layout-body-right">
                <Content class="layout-body-right-content">
                    <router-view/>
                </Content>
            </Layout>
        </Layout>
        <Footer>
            <div class="footer-content clear">
                <div class="footer-content-more clear">
                    <div class="footer-content-more-title">
                        <Icon type="ios-link"/>
                        更多资源
                    </div>
                    <a
                        class="footer-content-more-content" href="https://smartprogram.baidu.com/docs/develop/tutorial/intro/"
                        target="_blank" rel="noopener noreferrer"
                    >
                        <div class="footer-content-more-content-main">百度智能小程序</div>
                        <div class="footer-content-more-content-sub"></div>
                    </a>
                    <a
                        class="footer-content-more-content" href="https://efe.baidu.com/"
                        target="_blank" rel="noopener noreferrer"
                    >
                        <div class="footer-content-more-content-main">百度EFE（Excellent FrontEnd）技术体系</div>
                        <div class="footer-content-more-content-sub"></div>
                    </a>
                </div>
                <div class="footer-content-more clear">
                    <div class="footer-content-more-title">
                        <Icon type="ios-people"/>
                        开发团队&招聘
                    </div>
                    <a
                        class="footer-content-more-content" href="https://talent.baidu.com/external/baidu/index.html#/jobDetail/2/150801"
                        target="_blank" rel="noopener noreferrer"
                    >
                        <div class="footer-content-more-content-main">百度用户增长研发部</div>
                    </a>
                </div>
                <div class="footer-content-slogan clear">
                    <div class="footer-content-slogan-logo"></div>
                    <div class="footer-content-slogan-title">图片合成平台</div>
                    <div class="footer-content-slogan-main">致力于提供方便快捷的图片合成服务</div>
                </div>
            </div>
        </Footer>
    </Layout>
</template>

<script>
import appHeader from './components/header/appHeader';
export default {
    components: {
        appHeader
    }
};
</script>
<style lang="less" scoped>
.ivu-layout-header {
  padding: 0 30px;
}
</style>
<style lang="less" scoped>
.layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    &-container{
        height: 100%;
        &-body {
            display: flex;
            flex-direction: row;
            &-right {
            padding: 10px;
            &-content {
                padding: 10px 120px;
                min-height: 700px;
                background: #fff;
            }
            }
            &-breadcrumb {
                padding-left: 130px;
            }
        }
    }
}
.ivu-layout-footer {
    height: 227px;
    background: #15273b;
    .footer-content {
        margin: 0 75px;
        color: #fff;
        height: 143px;
        &-more {
            float: left;
            margin-right: 116px;
            &-title {
                .ivu-icon {
                    font-size: 20px;
                }
                font-size: 18px;
                margin-bottom: 18px;
            }
            &-content{
                color: #ffffff;
                display: flex;
                margin-top: 5px;
                &-main {
                    font-size: 15px;
                    line-height: 25px;
                }
                &-sub {
                    font-size: 12px;
                    line-height: 25px;
                    margin-left: 5px;
                }
            }
        }
        &-slogan {
            float: right;
            font-size: 16px;
            color: #ffffff;
            width: 320px;
            // display: flex;
            // flex-direction: column;
            &-logo {
                width: 105px;
                height: 86px;
                background-image: url("../../../assets/logo.png");
                background-size: 100% 100%;
                margin-bottom: 11px;
                float: right;

            }
            &-title,&-main {
                width: 100%;
                float: right;
                text-align: right;
            }

        }
    }
}
.footer {
  width: 100%;
  text-align: center;
  margin-top: 8px;
  color: #ffffff;
}
</style>
