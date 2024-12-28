<template>
  <div class="header">
    <el-row>
      <el-col class="logo">
        {{ web_info.web_chinese_name }}
      </el-col>
      <el-col class="top-menu">
        <el-menu class="el-menu-demo" mode="horizontal"
          :default-active="defaultActive"
          :unique-opened="true">

          <el-menu-item index="0" @click="$router.push({name: 'home'})">
            <i class="el-custom-icon-console"></i>
            <span slot="title">
              {{ $t('common.console') }}
            </span>
          </el-menu-item>

          <el-menu-item :index="v.id+''" v-for="(v,k) in menuList" :key="k" @click="handleLeftMenu(v.id)">
            <i :class="v.icon ? 'el-custom-icon-' + v.icon : ''"></i>
            {{ v.title }}
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col class="user-center">
        <el-row>
          <el-col :span="4" class="clear">
            <el-link :underline="false">
              <el-tooltip effect="dark" :content="$t('common.clear_cache')" placement="bottom-start">
                <i class="el-custom-icon-clear" @click="clearCache">
                </i>
              </el-tooltip>
            </el-link>
          </el-col>
          <el-col :span="4" class="message">
            <el-link @click="$router.push({name: 'user_message_list'})" :underline="false">
              <el-badge :is-dot="this.is_unread" class="item" id="dot">
                <i class="el-custom-icon-notice" :title="$t('common.message')">
                </i>
              </el-badge>
            </el-link>
          </el-col>
          <el-col :span="16">
            <el-row>
              <el-col :span="4" class="avatar">
                <el-avatar :size="30" :src="user_info.avatar">
                  <img src="@/assets/images/default/circle.png"/>
                </el-avatar>
              </el-col>
              <el-col :span="20" class="list">
                <el-dropdown  @command="handleCommand">
                  <span class="el-dropdown-link">
                    {{user_info.nickname}}<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu class="head_menu" slot="dropdown">
                    <el-dropdown-item command="center">
                      {{ $t('common.user_center') }}
                    </el-dropdown-item>
                    <el-dropdown-item command="logout" divided>
                      {{ $t('common.logout') }}
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
    </el-row>


  </div>
</template>

<script>
  import common from '@/views/common/base'
  export default {
    extends: common,
    data() {
      return {
        defaultActive: '0',
        menuList: {},
        web_info: {}, // 系统数据
        is_unread: false, // 是否存在未读消息
      };
    },
    methods: {
      handleCommand: function(e) {
        // 点击退出
        if(e == 'logout'){
          this.logout();
        }

        if(e == 'center') {
          this.$router.push({name: 'user_center'});
        }
      },
      getWebInfo: function() {
        let _this = this;
        _this.web_info = JSON.parse(localStorage.getItem('web_info'));
      },
      getUserInfo: function() {
        let _this = this;
        _this.user_info = JSON.parse(localStorage.getItem('user_info'));
        _this.loading = false
      },
      getUnreadMessage: function() {
        let _this = this;
        _this.$http({
          url: _this.$http.adornUrl(`/user/message/unread`),
          method: 'post',
          params: _this.$http.adornParams()
        }).then(({data}) => {
          if (data && data.status === 200) {
            _this.is_unread = data.data ? true : false;
          }
        })
      },
      handleLeftMenu: function(category_id) {console.log(category_id)
        this.$store.commit('menu/setIsShow', true);
        this.$store.commit('menu/setCategoryId', category_id);
      },
      clearCache: function() {
        let _this = this;
        _this.$http({
          url: _this.$http.adornUrl(`/clear`),
          method: 'post',
          params: _this.$http.adornParams()
        }).then(({data}) => {
          if (data && data.status === 200) {
            _this.$message.success(this.$t('common.finish_clear'));
          }
        })
      },
      initNavigation: function() {
        let _this = this;
        _this.$http({
          url: _this.$http.adornUrl(`/user/navigation`),
          method: 'get',
          params: _this.$http.adornParams()
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.menuList = data.data
          }
        })
      },
      logout: function() {
        let _this = this;
        _this.$http({
          url: _this.$http.adornUrl(`/logout`),
          method: 'get',
          params: _this.$http.adornParams()
        }).then(({data}) => {
          if (data && data.status === 200) {
            localStorage.removeItem('token');
            localStorage.setItem('menuList', '[]');
            localStorage.setItem('permissions', '[]');
            _this.$router.options.isAddDynamicMenuRoutes = false
            _this.$router.push({ name: "login" });
          }
        })
      },
    },
    created() {
      this.getWebInfo();
      this.initNavigation();
      this.getUserInfo();
      this.getUnreadMessage();
    }
  };
</script>
<style lang="scss" scoped>

  .logo {
    width: 15%;
    height: 60px;
    padding: 17px 0;
    font-size: 20px;
    text-align: center;
    color: #fff;
    background-color: #409EFF;
  }

  .top-menu {
    width: 72%;
    height: 60px;
    padding: 0 150px;
  }

  .user-center {
    width: 13%;
    height: 60px;
    .avatar {
      padding: 15px 0 0;
    }
    .list {
      padding: 20px 0 0 10px;
    }
    .clear {
      padding: 17px 0;
    }
    .message {
      padding: 17px 0;
    }
    i {
      font-size: 20px;
    }
  }
</style>
