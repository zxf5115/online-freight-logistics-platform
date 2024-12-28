<template>
  <el-form label-width="100px" ref="dataForm" :model="dataForm" :rules="dataRule">

    <el-form-item :label="$t('course.intensify.title')" prop="title">
      <el-input :placeholder="$t('course.intensify.title')" v-model="dataForm.title"></el-input>
    </el-form-item>

    <el-form-item :label="$t('course.intensify.intensify_question')" prop="question_id">
      <el-select v-model="dataForm.question_id" multiple collapse-tags filterable clearable>
        <el-option v-for="(v,k) in questionList" :label="v.title" :key="k" :value="v.id">
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item :label="$t('common.sort')" prop="sort">
      <el-input-number :placeholder="$t('common.please_input')+$t('common.sort')" v-model="dataForm.sort"></el-input-number>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="dataFormSubmit()">
        {{ $t('common.confirm') }}
      </el-button>
      <el-button @click="resetForm()">
        {{ $t('common.reset') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import common from '@/views/common/base'
  export default
  {
    extends: common,
    data()
    {
      return {
        model: 'education/course/intensify',
        questionList: [],
        dataForm:
        {
          id: 0,
          type: '2',
          course_id: '',
          category_id: '',
          title: '',
          question_id: '',
          sort: 0,
        },
        dataRule:
        {
          title: [
            { required: true, message: this.$t('course.intensify.rules.title.require'), trigger: 'blur' }
          ]
        }
      };
    },
    methods:
    {
      init ()
      {
        let query = this.$route.query

        this.dataForm.id          = query.id || 0
        this.dataForm.course_id   = query.course_id || 0
        this.dataForm.category_id = query.category_id || 0

        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/education/course/intensify/view/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.dataForm.course_id   = data.data.course_id
                this.dataForm.category_id = data.data.category_id
                this.dataForm.title       = data.data.title
                this.dataForm.sort        = data.data.sort
              }
            }).then(() => {
              this.$http({
                url: this.$http.adornUrl(`/education/course/intensify/question/${this.dataForm.id}`),
                method: 'get',
                params: this.$http.adornParams()
              }).then(({data}) => {
                if (data && data.status === 200) {
                  this.dataForm.question_id = data.data
                }
              })
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/education/course/intensify/handle`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'type': this.dataForm.type,
                'course_id': this.dataForm.course_id,
                'category_id': this.dataForm.category_id,
                'title': this.dataForm.title,
                'question_id': this.dataForm.question_id,
                'sort': this.dataForm.sort,
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
      handleSuccess(res, file) {
        this.dataForm.url = res.data;
      },
      resetForm:function()
      {
        this.$refs['dataForm'].resetFields();
      },
      loadQuestionList () {
        this.$http({
          url: this.$http.adornUrl('/education/course/intensify/question/select'),
          method: 'get',
          params: this.$http.adornParams({})
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.questionList = data.data
          } else {
            this.$message.error(this.$t(data.message))
          }
        })
      },
    },
    created(request)
    {
      this.init();

      this.loadQuestionList();
    }
  };
</script>
<style lang="scss" scoped>
  .mavon {
    width: 800px;
  }
  .v-note-op {
    padding: 0 !important;
  }
</style>
