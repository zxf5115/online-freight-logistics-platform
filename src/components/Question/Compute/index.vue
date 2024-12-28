<template>
  <el-form label-width="100px" ref="dataForm" :model="dataForm" :rules="dataRule">
    <el-row>
      <el-col :span="20" :offset="2">
        <el-row>
          <el-col :span="24">
            <el-form-item class="title" :label="$t('course.point.question.title')" prop="title">
              <el-input type="textarea" v-model="dataForm.title"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item :label="$t('course.point.question.answer')" prop="answer">
              <el-input v-model="dataForm.answer"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('course.point.question.score')" prop="score">
              <el-input v-model="dataForm.score"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('course.point.question.level')" prop="level">
              <el-rate v-model="dataForm.level" :max="4" :texts="['简单', '一般', '略难', '非常难']" show-text/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item :label="$t('course.point.question.analysis')" prop="analysis" class="analysis-form-item">
              <el-input type="textarea" v-model="dataForm.analysis"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item>
            <el-button type="primary" @click="dataFormSubmit()">
              {{ $t('common.confirm') }}
            </el-button>
            <el-button @click="resetForm()">
              {{ $t('common.reset') }}
            </el-button>
          </el-form-item>
        </el-row>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import common from '@/views/common/base'
import { isNotEmpty } from '@/utils/validate'

  export default {
    extends: common,
    props: {
      model: String,
      required: true
    },
    data () {
      return {
        dataForm: {
          id: '',
          type: 3,
          title: '',
          level: 2,
          score: 5,
          answer: '',
          analysis: '',
        },
        dataRule:
        {
          title: [
            { required: true, message: this.$t('course.point.question.rules.title.require'), trigger: 'blur' },
          ],
          answer: [
            { required: true, message: this.$t('course.point.question.rules.answer.require'), trigger: 'blur' },
          ],
        }
      }
    },
    methods: {
      init ()
      {
        let query = this.$route.query
        let id = query.id

        this.dataForm.id = id || 0
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/${this.model}/view/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.dataForm.title    = data.data.title
                this.dataForm.level    = data.data.level
                this.dataForm.score    = data.data.score
                this.dataForm.answer   = data.data.answer
                this.dataForm.analysis = data.data.analysis
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
              url: this.$http.adornUrl(`/${this.model}/compute`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'type': this.dataForm.type,
                'title': this.dataForm.title,
                'level': this.dataForm.level,
                'score': this.dataForm.score,
                'answer': this.dataForm.answer,
                'analysis': this.dataForm.analysis
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
      }
    },
    created(request)
    {
      this.init();
    }
  }
</script>

<style lang="scss" scoped>
  .title {
    max-width: 1200px;
    min-width: 600px;
  }
  .editor-content{
    margin-top: 20px;
  }
  .el-rate {
    margin-top: 6px;
  }
</style>
