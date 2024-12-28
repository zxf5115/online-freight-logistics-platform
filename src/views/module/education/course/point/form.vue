<template>
  <div class="xiecheng">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>{{ $t('course.point.from') }}</div>
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
            <basic/>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
  import Basic from '@/components/Education/Course/Point/Basic'
  export default {
    components: { Basic },
    data() {
      return {
        step: '0',
        id: 0,
        course_id: 0,
        unit_id: 0,
      }
    },
    created() {
      let query = this.$route.query
      this.id = query.id
      this.course_id = query.course_id;
      this.unit_id = query.unit_id;
    }
  };
</script>
