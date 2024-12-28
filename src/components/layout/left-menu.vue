<template>
  <div>
    <el-drawer
      title=""
      :visible.sync="is_show"
      :with-header="false"
      :append-to-body="false"
      :destroy-on-close="true"
      @opened="changeMenu(category_id)"
      direction="ltr"
      size="15%">
      <div class="logo">
        {{ web_info.web_chinese_name }}
      </div>

      <el-aside>
        <el-scrollbar>
          <el-menu
            background-color="#000"
            text-color="#fff"
            active-text-color="#409eff"
            @open="handleOpen"
            @close="handleClose"
            :collapse="isCollapse"
            :unique-opened="true"
            :default-active="defaultActive"
            :router="true">

            <el-submenu :index="v.id+''" v-for="(v,k) in menus" :key="k">
              <template slot="title">
                <i :class="v.icon ? 'el-custom-icon-' + v.icon : ''"></i>
                <span slot="title">{{v.title}}</span>
              </template>
              <el-menu-item-group v-if="v.navigation && v.navigation.length>0">
                <el-menu-item v-if="vo.is_hidden == 1" :route="set_url(vo.url)" v-for="(vo,key) in v.navigation" :key="key" :index="vo.id+''">
                  {{vo.title}}
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-scrollbar>
      </el-aside>


    </el-drawer>
  </div>
</template>

<script>
  import common from '@/views/common/base'
  export default {
    extends: common,
    data() {
      return {
        menus: [],
        web_info: {}, // 系统数据
        drawer: false,
        leftBarWidth:"185px", // 左侧宽度
        defaultActive: '0',
        isCollapse:false, // 侧边栏缩进打开
      };
    },
    methods: {
      handleOpen:function(){},
      handleClose:function(){},
      left_bar:function() {
        this.isCollapse = !this.isCollapse;

        if(this.isCollapse)
        {
          this.leftBarWidth = "65px";
          // this.isShow = false;
        }
        else
        {
          this.leftBarWidth = "185px";
          // this.isShow = true;
        }
      },
      set_url: function(url) {
        if(url.indexOf('/') == 0)
        {
          return url;
        }
        else
        {
          return '/' + url;
        }
      },
      getWebInfo: function() {
        let _this = this;
        _this.web_info = JSON.parse(localStorage.getItem('web_info'));
      },
      initMenu: function() {
        let _this = this;
        _this.$http({
          url: _this.$http.adornUrl(`/user/menu`),
          method: 'get',
          params: _this.$http.adornParams()
        }).then(({data}) => {
          if (data && data.status === 200) {
            localStorage.setItem('menuList', JSON.stringify(data.data || '[]'))
          }
        })
      },
      changeMenu: function(category_id) {
        let data = JSON.parse(localStorage.getItem('menuList'));
        this.menus = data[category_id]
      },
    },
    created() {
      this.initMenu();
      this.getWebInfo();
    },
    computed: {
      is_show: {
        get: function () {
          return this.$store.state.menu.is_show
        },
        set: function () {
          this.$store.commit('menu/setIsShow', false);
        }
      },
      category_id: {
        get: function () {
          return this.$store.state.menu.category_id
        },
        set: function () {
          this.$store.commit('menu/setCategoryId', 0);
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  .logo {
    width: 100%;
    height: 60px;
    padding: 17px 0;
    font-size: 20px;
    text-align: center;
    color: #fff;
    background-color: #409EFF;
  }

  .el-aside {
    width: 100% !important;
    height: 100%;
  }

  .el-scrollbar {
    height: 100%;
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
</style>
