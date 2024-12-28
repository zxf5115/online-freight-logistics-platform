<template>
  <div class="xiecheng">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>{{ $t('course.point.question.from') }}</div>
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
          <el-tab-pane v-if="type == 0 || (id != 0 && type == 1) " name="1" :label="$t('course.point.question.choices')" :lazy="true">
            <choices :model="model"/>
          </el-tab-pane>
          <el-tab-pane v-if="type == 0 || (id != 0 && type == 2) " name="2" :label="$t('course.point.question.judgement')" :lazy="true">
            <judgement :model="model"/>
          </el-tab-pane>
          <el-tab-pane v-if="type == 0 || (id != 0 && type == 3) " name="3" :label="$t('course.point.question.compute')" :lazy="true">
            <compute :model="model"/>
          </el-tab-pane>
          <el-tab-pane v-if="type == 0 || (id != 0 && type == 4) " name="4" :label="$t('course.point.question.connection')" :lazy="true">
            <connection :model="model"/>
          </el-tab-pane>
          <el-tab-pane v-if="type == 0 || (id != 0 && type == 5) " name="5" :label="$t('course.point.question.multiple_choices')" :lazy="true">
            <multiple-choices :model="model"/>
          </el-tab-pane>

          <el-tab-pane v-if="type == 0 || (id != 0 && type == 6) " name="6" :label="$t('course.point.question.fill_in_blank')" :lazy="true">
            <fill-in-blank :model="model"/>
          </el-tab-pane>

          <el-tab-pane v-if="type == 0 || (id != 0 && type == 7) " name="7" :label="$t('course.point.question.explain')" :lazy="true">
            <explain :model="model"/>
          </el-tab-pane>

          <el-tab-pane v-if="type == 0 || (id != 0 && type == 8) " name="8" :label="$t('course.point.question.special')" :lazy="true">
            <special :model="model"/>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
  import common from '@/views/common/base'
  import Choices from '@/components/Education/Course/Point/Question/Choices'
  import MultipleChoices from '@/components/Education/Course/Point/Question/MultipleChoices'
  import Compute from '@/components/Education/Course/Point/Question/Compute'
  import Connection from '@/components/Education/Course/Point/Question/Connection'
  import Special from '@/components/Education/Course/Point/Question/Special'
  import Judgement from '@/components/Education/Course/Point/Question/Judgement'
  import FillInBlank from '@/components/Education/Course/Point/Question/FillInBlank'
  import Explain from '@/components/Education/Course/Point/Question/Explain'

  export default {
    extends: common,
    components: {
      Choices, MultipleChoices, Special, Compute, Judgement, Connection, FillInBlank, Explain
    },
    data() {
      return {
        model: 'education/course/point/question',
        activeName: '1',
        id: 0,
        type: 0,
      }
    },
    created() {
      let query = this.$route.query
      this.id = query.id || 0
      this.type = query.type || 0
      this.activeName = query.type ? query.type + '' : '1'
    }
  };
</script>
