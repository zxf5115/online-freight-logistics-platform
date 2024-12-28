<template>
  <div class="footer">
    {{ web_info.copyright }}
  </div>
</template>

<script>
  export default {
    data() {
      return {
        web_info: {}, // 系统数据
      };
    },
    methods: {
      getWebInfo:function() {
        let _this = this;
        _this.web_info = JSON.parse(localStorage.getItem('web_info'));
      }
    },
    created() {
      this.getWebInfo();
    }
  };
</script>
<style lang="scss" scoped>
  .footer {
    height: 30px;
    padding: 21px 0 0;
    font-size: 13px;
    text-align: center;
  }
</style>
