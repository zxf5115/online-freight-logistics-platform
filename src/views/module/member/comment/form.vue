<template>
  <div class="xiecheng">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>{{ $t('member.comment.from') }}</div>
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
        <el-form label-width="100px" ref="dataForm" :model="dataForm" :rules="dataRule">

          <el-form-item :label="$t('member.comment.score')" prop="score">
            <el-input-number v-model="dataForm.score" :placeholder="$t('common.please_input') + $t('member.comment.score')" :min="1" :max="5"></el-input-number>
          </el-form-item>

          <el-form-item :label="$t('member.comment.content')" prop="content">
            <el-input v-model="dataForm.content" :placeholder="$t('common.please_input') + $t('member.comment.content')"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button v-if="isAuth('module:member:comment:handle')" type="primary" @click="dataFormSubmit()">
              {{ $t('common.confirm') }}
            </el-button>
            <el-button @click="resetForm()">
              {{ $t('common.reset') }}
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import common from '@/views/common/base'
  export default {
    extends: common,
    data() {
      return {
        model: 'member/comment',
        dataForm:
        {
          id: 0,
          member_id: 0,
          score: 5,
          content: '',
        },
        dataRule:
        {
          score: [
            { required: true, message: this.$t('member.comment.rules.score.require'), trigger: 'blur' },
          ],
          content: [
            { required: true, message: this.$t('member.comment.rules.content.require'), trigger: 'blur' },
          ],
        }
      };
    },
    methods: {
      init ()
      {
        let query = this.$route.query
        let member_id = query.member_id

        this.dataForm.member_id = member_id || 0
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/member/score/view/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.dataForm.score   = data.data.score
                this.dataForm.content = data.data.content
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/member/comment/handle`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'member_id': this.dataForm.member_id,
                'score': this.dataForm.score,
                'content': this.dataForm.content,
              })
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.$message.success(this.$t('common.handle_success'));
                this.$router.go(-1);
              } else {
                this.$message.error(this.$t(data.message))
              }
            })
          }
        })
      },
      resetForm:function()
      {
        this.$refs['dataForm'].resetFields();
      },
    },
    created() {
      this.init();
    }
  };
</script>
