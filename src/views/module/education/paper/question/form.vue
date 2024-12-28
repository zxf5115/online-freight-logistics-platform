<template>
  <div class="xiecheng">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>{{ $t('paper.question.from') }}</div>
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
          <el-tab-pane v-if="type == 0 || (id != 0 && type == 1) " name="1" :label="$t('paper.question.choices')" :lazy="true">
            <choices :model="model"/>
          </el-tab-pane>
          <!-- <el-tab-pane v-if="type == 0 || (id != 0 && type == 5) " name="5" :label="$t('paper.question.multiple_choices')" :lazy="true">
            <multiple-choices :model="model"/>
          </el-tab-pane> -->
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
  import common from '@/views/common/base'
  import Choices from '@/components/Education/Paper/Question/Choices'
  import MultipleChoices from '@/components/Education/Paper/Question/MultipleChoices'

  export default {
    extends: common,
    components: {
      Choices, MultipleChoices
    },
    data() {
      return {
        model: 'education/paper/question',
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
