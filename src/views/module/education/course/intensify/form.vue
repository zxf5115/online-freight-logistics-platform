<template>
  <div class="xiecheng">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>{{ $t('course.intensify.from') }}</div>
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
        <el-tabs v-model="activeName" type="border-card">
          <el-tab-pane v-if="type == 0 || (id != 0 && type == 1) " name="1" :label="$t('course.intensify.graphic_content')">
            <basic />
          </el-tab-pane>
          <el-tab-pane v-if="type == 0 || (id != 0 && type == 2) " name="2" :label="$t('course.intensify.question_content')" :lazy="true">
            <question/>
          </el-tab-pane>
          <el-tab-pane v-if="type == 0 || (id != 0 && type == 3) "  name="3" :label="$t('course.intensify.paper_content')" :lazy="true">
            <paper/>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
  import Basic from '@/components/Education/Course/Intensify/Basic'
  import Question from '@/components/Education/Course/Intensify/Question'
  import Paper from '@/components/Education/Course/Intensify/Paper'
  export default {
    components: { Basic, Question, Paper },
    data() {
      return {
        model: 'education/course/intensify',
        id: 0,
        type: 0,
      }
    },
    created() {
      let query       = this.$route.query
      this.id         = query.id
      this.type       = query.type || 0
      this.activeName = query.type ? query.type + '' : '1'
    }
  };
</script>
