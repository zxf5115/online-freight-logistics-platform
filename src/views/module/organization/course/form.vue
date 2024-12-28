<template>
  <div class="xiecheng">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>{{ $t('organization.course.from') }}</div>
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

          <el-form-item :label="$t('organization.title')" prop="title">
            <span>
              {{ dataForm.organization_title }}
            </span>
          </el-form-item>

          <el-form-item :label="$t('course.title')" prop="course_id">
            <el-select v-model="dataForm.course_id" filterable clearable>
              <el-option v-for="(v,k) in courseList" :label="v.title" :key="k" :value="v.id">
              </el-option>
            </el-select>
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
        model: 'organization/course',
        courseList: [],
        dataForm:
        {
          id: 0,
          organization_title: '',
          organization_id: '',
          course_id: '',
        },
        dataRule:
        {
          course_id: [
            { required: true, message: this.$t('organization.course.rules.course_id.require'), trigger: 'blur' },
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
              url: this.$http.adornUrl(`/organization/course/view/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.dataForm.course_id  = data.data.course_id + ''
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
              url: this.$http.adornUrl(`/organization/course/handle`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'organization_id': this.dataForm.organization_id,
                'course_id': this.dataForm.course_id,
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
          url: this.$http.adornUrl('/organization/course/course'),
          method: 'get',
          params: this.$http.adornParams({
            'organization_id': this.dataForm.organization_id
          })
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.courseList = data.data
          } else {
            this.$message.error(this.$t(data.message))
          }
        })
      },
      loadOrganizationView () {
        this.$http({
          url: this.$http.adornUrl(`/organization/view/${this.dataForm.organization_id}`),
          method: 'get',
          params: this.$http.adornParams({})
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.dataForm.organization_title = data.data.title
          } else {
            this.$message.error(this.$t(data.message))
          }
        })
      },
    },
    created(request)
    {
      this.dataForm.organization_id = this.$route.query.organization_id;
      this.init();
    },
    mounted () {
      this.loadOrganizationView();
      this.loadCourseList();
    },
  };
</script>
