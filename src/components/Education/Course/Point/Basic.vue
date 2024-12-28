<template>
  <el-form label-width="100px" ref="dataForm" :model="dataForm" :rules="dataRule">

    <el-form-item :label="$t('course.type')" prop="type">
      <el-select v-model="dataForm.type"  :placeholder="$t('common.please_select')+$t('course.type')">
        <el-option v-for="(v,k) in typeList" :label="v.title" :key="k" :value="v.id">
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item :label="$t('course.point.title')" prop="title">
      <el-input v-model="dataForm.title" :placeholder="$t('common.please_input')+$t('course.title')"></el-input>
    </el-form-item>

    <el-form-item :label="$t('course.title')" prop="course_id">
      <el-select v-model="dataForm.course_id"  :placeholder="$t('common.please_select')+$t('course.title')" @change="loadUnitList">
        <el-option v-for="(v,k) in courseList" :label="v.title" :key="k" :value="v.id">
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item :label="$t('course.course_unit')" prop="unit_id">
      <el-cascader :key="isResouceShow" v-model="dataForm.unit_id" @change="loadQuestionList" :placeholder="$t('common.please_select')+$t('course.course_unit')" :show-all-levels="false" :options="level" :props="levelProps" clearable></el-cascader>
    </el-form-item>

    <el-form-item :label="$t('course.point.picture')" prop="picture">
      <el-upload class="avatar-uploader" :action="this.$http.adornUrl('/file/picture')" :show-file-list="false" :headers="upload_headers" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
        <img v-if="dataForm.picture" :src="dataForm.picture" class="avatar-upload">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>

    <el-form-item :label="$t('course.point.description')" prop="description">
      <el-input type="textarea" rows="5" v-model="dataForm.description" :placeholder="$t('common.please_input')+$t('course.description')"></el-input>
    </el-form-item>

    <el-form-item :label="$t('course.point.question.title')">
      <el-select v-model="dataForm.question_id" filterable :placeholder="$t('common.please_select')+$t('course.point.question.title')" @change="insertValue">
        <el-option v-for="(v,k) in questionList" :label="v.title" :key="k" :value="v.content">
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item class="mavon" prop="content" :label="$t('course.point.content')">
      <div id="vditor"></div>
    </el-form-item>

    <el-form-item :label="$t('course.point.money')" prop="money">
      <el-input-number :precision="2" v-model="dataForm.money" :min="0"></el-input-number>
    </el-form-item>

    <el-form-item :label="$t('course.time_length')" prop="time_length">
      <el-input-number v-model="dataForm.time_length" :min="0"></el-input-number>
    </el-form-item>

    <el-form-item :label="$t('common.sort')" prop="sort">
      <el-input-number :placeholder="$t('common.please_input')+$t('common.sort')" v-model="dataForm.sort"></el-input-number>
    </el-form-item>

    <el-form-item :label="$t('course.is_skill')" prop="is_skill">
      <el-switch v-model="dataForm.is_skill" active-value="1" :active-text="$t('common.yes')" inactive-value="0" :inactive-text="$t('common.no')">
      </el-switch>
    </el-form-item>

    <el-form-item :label="$t('course.is_recommend')" prop="is_recommend">
      <el-switch v-model="dataForm.is_recommend" active-value="1" :active-text="$t('course.enable')" inactive-value="0" :inactive-text="$t('course.disable')">
      </el-switch>
    </el-form-item>

    <el-form-item :label="$t('common.status')" prop="status">
      <el-switch v-model="dataForm.status" active-value="1" :active-text="$t('common.enable')" inactive-value="2" :inactive-text="$t('common.disable')">
      </el-switch>
    </el-form-item>

    <el-form-item>
      <el-button v-if="isAuth('module:member:handle')" type="primary" @click="dataFormSubmit()">
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
  import { isNotEmpty } from '@/utils/validate'
  import Vditor from "vditor"
  import "vditor/dist/index.css"
  export default {
    extends: common,
    components: {
      Vditor
    },
    data() {
      return {
        model: 'education/course/point',
        contentEditor: '',
        upload_headers:{},
        level: [],
        isResouceShow: 0,
        typeList: [
          {id: 1, title: '分步学习'},
          {id: 2, title: '全流程学习'},
        ],
        courseList: [],
        questionList: [],
        levelProps: {
          label: 'title',
          value: 'id',
          checkStrictly: true
        },
        dataForm:
        {
          id: 0,
          type : 1,
          course_id : '',
          unit_id : '',
          question_id : '',
          title: '',
          picture: '',
          description: '',
          content: '',
          money: 0,
          time_length: '',
          sort: '',
          is_recommend: '0',
          is_skill: '0',
          status: '1',
        },
        dataRule:
        {
          title: [
            { required: true, message: this.$t('course.rules.title.require'), trigger: 'blur' },
          ],
          picture: [
            { required: true, message: this.$t('course.rules.picture.require'), trigger: 'blur' },
          ],
        }
      };
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
              url: this.$http.adornUrl(`/education/course/point/view/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.dataForm.type         = data.data.type.value
                this.dataForm.course_id    = data.data.course_id
                this.dataForm.unit_id      = data.data.unit_id
                this.dataForm.title        = data.data.title
                this.dataForm.picture      = data.data.picture
                this.dataForm.description  = data.data.description
                this.dataForm.money        = data.data.money
                this.dataForm.time_length  = data.data.time_length
                this.dataForm.sort         = data.data.sort
                this.dataForm.is_recommend = data.data.is_recommend.value + ''
                this.dataForm.is_skill     = data.data.is_skill.value + ''
                this.dataForm.status       = data.data.status.value + ''

                this.contentEditor.setValue(data.data.content)
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
              url: this.$http.adornUrl(`/education/course/point/handle`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'type': this.dataForm.type,
                'course_id': this.dataForm.course_id,
                'unit_id': this.dataForm.unit_id,
                'title': this.dataForm.title,
                'picture': this.dataForm.picture,
                'description': this.dataForm.description,
                'content': this.contentEditor.getValue(),
                'money': this.dataForm.money,
                'time_length': this.dataForm.time_length,
                'sort': this.dataForm.sort,
                'is_recommend': this.dataForm.is_recommend,
                'is_skill': this.dataForm.is_skill,
                'status': this.dataForm.status,
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
      loadCourseList () {
        this.$http({
          url: this.$http.adornUrl('/education/course/select'),
          method: 'get'
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.courseList = data.data
          } else {
            this.$message.error(this.$t(data.message))
          }
        })
      },
      loadUnitList () {
        this.$http({
          url: this.$http.adornUrl('/education/course/unit/level'),
          method: 'get',
          params: this.$http.adornParams({
            'course_id': this.dataForm.course_id
          })
        }).then(({data}) => {
          if (data && data.status === 200) {
            ++this.isResouceShow
            this.dataForm.category_id = ''
            this.level = data.data
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
            'course_id': this.dataForm.course_id,
            'unit_id': this.dataForm.unit_id
          })
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.questionList = data.data
          } else {
            this.$message.error(this.$t(data.message))
          }
        })
      },
      resetForm:function()
      {
        this.$refs['dataForm'].resetFields();
      },
      handleAvatarSuccess(res, file) {
        this.dataForm.picture = res.data;
      },
      beforeAvatarUpload(file) {
        const isPicture = (file.type === 'image/jpeg' || file.type === 'image/png');
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isPicture) {
          var message = this.$t('common.rules.picture.picture_type');
          this.$message.error(this.$t(data.message))
        }
        if (!isLt2M) {
          var message = this.$t('common.rules.picture.picture_size');
          this.$message.error(this.$t(data.message))
        }

        return isPicture && isLt2M;
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
    created() {
      this.init();

      let query = this.$route.query

      this.dataForm.course_id = query.course_id ? parseInt(query.course_id) : ''
      this.dataForm.unit_id   = query.unit_id || ''

      this.loadCourseList();
      this.loadUnitList();
      this.loadQuestionList();

      // 要保证取到
      this.upload_headers.Authorization = 'Bearer ' + localStorage.getItem('token');
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
