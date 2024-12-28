<template>
  <div class="xiecheng">
    <!-- 容器本身 -->
    <el-container>
      <el-header class="layout-header">
        <layout-header></layout-header>
      </el-header>

      <!-- 左侧导航 -->
      <layout-left-menu></layout-left-menu>

      <el-main class="main_in" v-loading.fullscreen.lock="loading" element-loading-text="拼命加载中">

      <navigation></navigation>

      <el-scrollbar>
        <div class="main_in2" v-if="!loading">
          <transition name="el-fade-in-linear" mode="out-in">
            <router-view v-if="!$store.state.common.contentIsNeedRefresh"></router-view>
          </transition>
        </div>
      </el-scrollbar>

      </el-main>
      <el-backtop target=".main_in .el-scrollbar .el-scrollbar__wrap"></el-backtop>

      <el-footer>
        <layout-footer></layout-footer>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
  import Navigation from "@/components/layout/navigation";
  import LayoutHeader from '@/components/layout/header'
  import LayoutLeftMenu from '@/components/layout/left-menu'
  import LayoutFooter from '@/components/layout/footer'
  export default {
    inject: ['refresh'],
    components: {
      Navigation,
      LayoutHeader,
      LayoutLeftMenu,
      LayoutFooter,
    },
    data() {
      return {
        loading: false,
      };
    }
  };
</script>

<style lang="scss" scoped>








  .el-main {
    padding: 0;
  }
  .main_in{
    height: calc(100% - 101px);
    background: #f3f3f4;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    .el-scrollbar__wrap{
      overflow-x: hidden!important;
    }
    .main_in2{
      padding: 0 25px 25px 25px;
    }
  }
  .el-menu {
    border-right: none;
    height: 100%;
    .el-submenu__title i{
      color:#e1e1e1;
    }
    .title_i{
      color:#cfcfcf;
      padding-right: 15px;
    }
  }
  .el-menu-item i {
    color: #e1e1e1;
  }
  .is-active i {
    color: #409eff;
  }
  .el-scrollbar{
    height: 100%;
  }
  .el-aside {
    height: 100%;
    overflow: hidden!important;

  }
  .el-container {
    height: 100%;
  }
  .el-header{
    padding: 0;
  }

  .head_logo{
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    background:#000;
    color:#fff;
    span{color:#409EFF;}
  }
  .index_top_bg{
    border-bottom: 1px solid #e7eaec!important;
    height: 50px;
    .index_header{
      float: left;
      .right_head_i{line-height: 50px;font-size: 18px;color:#333;margin-left: 30px;}
    }
    .avatar {width: 30px; height: 30px;border-radius: 50%;float: right;margin-top: 10px;}
    .right_head_other{
      float: right;margin-right: 40px;position: relative;
      i{font-size: 20px}
    }
    .head_user{line-height: 50px;float: right;position: relative;margin-left: 10px;margin-right: 30px;}
  }
  .clear_cache{
    line-height: 50px;
    float: left;
    margin-top: 2px;
    margin-right: 20px;
  }
</style>
