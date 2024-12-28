<template>
  <div class="xiecheng">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>{{ $t('course.from') }}</div>
        </div>

        <div class="admin_main_block_right">
          <div>
            <el-button icon="el-icon-back" @click="$router.go(-1)">
              {{ $t('common.return') }}
            </el-button>
          </div>
        </div>
      </div>

      <div class="admin_form_main">
        <el-tabs type="border-card">
          <el-tab-pane :label="$t('course.basic_info')">
            <basic />
          </el-tab-pane>
          <!-- <el-tab-pane v-if="id > 0" :label="$t('course.resource_info')" :lazy="true">
            <resource :id="id"/>
          </el-tab-pane> -->
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
  import Basic from '@/components/Education/Course/Basic'
  import Resource from '@/components/Education/Course/Resource'
  export default {
    components: { Basic, Resource },
    data() {
      return {
        step: '0',
        id: 0,
      }
    },
    created() {
      let query = this.$route.query
      this.id = query.id
    }
  };
</script>
