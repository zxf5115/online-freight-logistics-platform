<template>
  <div class="xiecheng">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>{{ $t('paper.from') }}</div>
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
        <el-form label-width="120px" ref="dataForm" :model="dataForm" :rules="dataRule">
          <el-form-item :label="$t('course.title')" prop="course_id">
            <el-select v-model="dataForm.course_id" filterable clearable>
              <el-option v-for="(v,k) in courseList" :label="v.title" :key="k" :value="v.id">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item :label="$t('paper.title')" prop="title">
            <el-input :placeholder="$t('paper.title')" v-model="dataForm.title"></el-input>
          </el-form-item>

          <el-form-item :label="$t('paper.description')" prop="description">
            <el-input type="textarea" :placeholder="$t('paper.description')" v-model="dataForm.description"></el-input>
          </el-form-item>

          <el-form-item :label="$t('paper.test_time')" prop="test_time">
            <el-input-number :min="0" :max="120" :placeholder="$t('paper.test_time')" v-model="dataForm.test_time"></el-input-number>
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
      </div>
    </div>
  </div>
</template>

<script>
  import common from '@/views/common/base'
  export default
  {
    extends: common,
    data()
    {
      return {
        model: 'education/paper',
        courseList: [],
        dataForm:
        {
          id: 0,
          course_id: '',
          title: '',
          description: '',
          test_time: 0,
          sort: 0,
        },
        dataRule:
        {
          title: [
            { required: true, message: this.$t('paper.rules.title.require'), trigger: 'blur' }
          ],
          test_time: [
            { required: true, message: this.$t('paper.rules.test_time.require'), trigger: 'blur' }
          ],
        }
      };
    },
    methods:
    {
      init ()
      {
        let query = this.$route.query
        let id = query.id

        this.dataForm.id = id || 0
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/education/paper/view/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.dataForm.course_id   = data.data.course_id
                this.dataForm.title       = data.data.title
                this.dataForm.description = data.data.description
                this.dataForm.test_time   = data.data.test_time
                this.dataForm.sort        = data.data.sort
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
              url: this.$http.adornUrl(`/education/paper/handle`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'course_id': this.dataForm.course_id,
                'title': this.dataForm.title,
                'description': this.dataForm.description,
                'test_time': this.dataForm.test_time,
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
      resetForm:function()
      {
        this.$refs['dataForm'].resetFields();
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
    },
    created(request)
    {
      this.init();
    },
    mounted () {
      this.loadCourseList();
    },
  };
</script>
