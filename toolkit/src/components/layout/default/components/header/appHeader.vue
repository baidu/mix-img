<template>
    <Header>
        <Menu
            mode="horizontal" class="header-theme"
            theme="dark"
        >
            <div class="layout-logo"></div>
            <div class="layout-nav">
                <div class="layout-title">
                    <div class="layout-title-line"></div>
                    <span class="layout-title-content">图片合成配置平台</span>
                </div>
            </div>
        </Menu>
    </Header>
</template>

<script>
export default {
};
</script>
<style lang="less" scoped>
.layout-logo {
    width: 46px;
    height: 38px;
    float: left;
    position: relative;
    top: 20px;
    left: 150px;
    background-repeat: no-repeat;
    background-size: contain;
    background-image: url("../../../../../assets/logo.png");
}
.layout-nav {
  margin-left: 200px;
  color: #fff;
  font-size: 24px;
  .layout-title {
    float: left;
    position: relative;
    margin-right: 10px;

    &-line {
      position: absolute;
      width: 50px;
      height: 1px;
      background: #ffffff;
      top: 50%;
      margin-top: -0.5px;
    }
    &-content {
        margin-left: 50px;
      }
  }
}
.layout-user {
    float: right;
    margin: 0 120px;
    color: #fff;
}

.ivu-layout-header {
  padding: 0 !important;
  height: 78px;
  line-height: 78px;
}
.ivu-menu-dark {
  background: #15273b;
}
.ivu-menu-horizontal {
  height: 78px;
  line-height: 78px;
}
.layout-router {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
}
</style>
