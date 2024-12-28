<template>
  <div class="xiecheng">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>{{ $t('course.experience.from') }}</div>
        </div>

        <div class="admin_main_block_right">
          <div>
            <el-button icon="el-icon-back" @click="$router.push({name: 'module_education_course_list'})">
              {{ $t('common.return') }}
            </el-button>
          </div>
        </div>
      </div>

      <div class="admin_form_main">
        <el-form label-width="100px" ref="dataForm" :model="dataForm" :rules="dataRule">

          <el-form-item :label="$t('course.title')" prop="title">
            {{ course.title }}
          </el-form-item>

          <el-form-item :label="$t('course.point.question.title')">
            <el-select v-model="dataForm.question_id" filterable :placeholder="$t('common.please_select')+$t('course.point.question.title')" @change="insertValue">
              <el-option v-for="(v,k) in questionList" :label="v.title" :key="k" :value="v.content">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item class="mavon" prop="content" :label="$t('course.experience.content')">
            <div id="vditor"></div>
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
      </div>
    </div>
  </div>
</template>

<script>
  import common from '@/views/common/base'
  import Vditor from "vditor"
  import "vditor/dist/index.css"
  export default
  {
    extends: common,
    components: {
      Vditor
    },
    data()
    {
      return {
        model: 'education/course/experience',
        questionList: [],
        contentEditor: '',
        dataForm:
        {
          id: 0,
          course_id: 0,
          content: '',
        },
        dataRule: {},
        course: {},

      };
    },
    methods:
    {
      init ()
      {
        this.dataForm.course_id = this.$route.query.course_id

        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.course_id) {
            this.$http({
              url: this.$http.adornUrl(`/education/course/experience/view/${this.dataForm.course_id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.status === 200) {
                if(data.data) {
                  this.dataForm.course_id   = data.data.course_id
                  this.contentEditor.setValue(data.data.content)
                }
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
              url: this.$http.adornUrl(`/education/course/experience/handle`),
              method: 'post',
              data: this.$http.adornData({
                'course_id': this.dataForm.course_id,
                'content': this.contentEditor.getValue(),
              })
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.$message.success(this.$t('common.handle_success'));
                this.$router.push({name: 'module_education_course_list'});
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
      loadCourseData () {
        this.$http({
          url: this.$http.adornUrl(`/education/course/view/${this.dataForm.course_id}`),
          method: 'get'
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.course = data.data
          } else {
            this.$message.error(this.$t(data.message))
          }
        })
      },
      loadQuestionList () {
        this.$http({
          url: this.$http.adornUrl('/education/course/point/question/select'),
          method: 'get',
          params: this.$http.adornParams({
            'course_id': this.dataForm.course_id
          })
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.questionList = data.data
          } else {
            this.$message.error(this.$t(data.message))
          }
        })
      },
      initVditor () {
        this.contentEditor = new Vditor("vditor",{
          multiple: false,
          height: 500,
          "mode": "sv",
          "preview": {
            "mode": "both"
          },
          toolbarConfig:{
            pin:true
          },
          cache:{
            enable:false
          },
          upload: {
            accept: 'image/*, .mp3, .wav, .mov, .mp4',
            token: 'test',
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            url: this.$http.adornUrl('/file/file')
          },
        })
      },
      insertValue(value) {
        this.contentEditor.insertValue(value);
      },
    },
    created(request)
    {
      this.init();

      this.loadCourseData();
      this.loadQuestionList();
    },
    mounted () {
      this.initVditor();
    },
  };
</script>

<style lang="scss" scoped>
  .mavon {
    width: 95% !important;
  }
</style>
