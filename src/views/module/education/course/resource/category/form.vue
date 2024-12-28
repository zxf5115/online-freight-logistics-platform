<template>
  <div class="xiecheng">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>{{ $t('course.resource.category.from') }}</div>
        </div>

        <div class="admin_main_block_right">
          <div>
            <el-button icon="el-icon-back" @click="$router.push({name: 'module_education_course_resource_category_list', query: {course_id: dataForm.course_id}})">
              {{ $t('common.return') }}
            </el-button>
          </div>
        </div>
      </div>

      <div class="admin_form_main">
        <el-form label-width="100px" ref="dataForm" :model="dataForm" :rules="dataRule">

          <el-form-item :label="$t('course.resource.category.title')" prop="title">
            <el-input :placeholder="$t('course.resource.category.title')" v-model="dataForm.title"></el-input>
          </el-form-item>

          <el-form-item :label="$t('course.resource.category.parent_title')" prop="parent_id">
            <el-cascader v-model="dataForm.parent_id" :placeholder="$t('common.please_select')+$t('course.resource.category.parent_title')" :show-all-levels="false" :options="level" :props="levelProps" clearable></el-cascader>
          </el-form-item>

          <el-form-item :label="$t('course.resource.category.picture')" prop="picture">
            <el-upload class="avatar-uploader" :action="this.$http.adornUrl('/file/picture')" :show-file-list="false" :headers="upload_headers" :on-success="handleResourceSuccess" :before-upload="beforeResourceUpload">
              <img v-if="dataForm.picture" :src="dataForm.picture" class="avatar-upload">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item :label="$t('course.resource.category.description')" prop="description">
            <el-input type="textarea" :placeholder="$t('common.please_input')+$t('course.resource.category.description')" maxlength="200" show-word-limit v-model="dataForm.description"></el-input>
          </el-form-item>

          <el-form-item :label="$t('course.resource.category.depth')" prop="depth">
            <el-input-number :placeholder="$t('common.please_input')+$t('course.resource.category.depth')"  v-model="dataForm.depth"></el-input-number>
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
        model: 'education/course/resource/category',
        level: [],
        upload_headers:{},
        levelProps: {
          label: 'title',
          value: 'id',
          checkStrictly: true
        },
        dataForm:
        {
          id: 0,
          parent_id: 0,
          course_id: 0,
          title: '',
          picture: '',
          description: '',
          depth: 0,
          sort: 0,
        },
        dataRule:
        {
          title: [
            { required: true, message: this.$t('course.unit.rules.title.require'), trigger: 'blur' }
          ]
        }
      };
    },
    methods:
    {
      init ()
      {
        let query = this.$route.query
        let id = query.id
        let course_id = query.course_id

        this.dataForm.id = id || 0
        this.dataForm.course_id = course_id || 0

        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/education/course/resource/category/view/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams({
                'course_id': this.dataForm.course_id
              })
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.dataForm.parent_id   = data.data.parent_id
                this.dataForm.course_id   = data.data.course_id
                this.dataForm.title       = data.data.title
                this.dataForm.description = data.data.description
                this.dataForm.picture     = data.data.picture
                this.dataForm.depth       = data.data.depth
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
              url: this.$http.adornUrl(`/education/course/resource/category/handle`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'parent_id': this.dataForm.parent_id,
                'course_id': this.dataForm.course_id,
                'title': this.dataForm.title,
                'description': this.dataForm.description,
                'picture': this.dataForm.picture,
                'depth': this.dataForm.depth,
                'sort': this.dataForm.sort,
              })
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.$message.success(this.$t('common.handle_success'));
                this.$router.push({name: 'module_education_course_resource_category_list', query: {course_id: this.dataForm.course_id}});
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
      loadCategoryList () {
        this.$http({
          url: this.$http.adornUrl('/education/course/resource/category/select'),
          method: 'get',
          params: this.$http.adornParams({
            'course_id': this.dataForm.course_id
          })
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.level = data.data
          } else {
            this.$message.error(this.$t(data.message))
          }
        })
      },
      handleResourceSuccess(res, file) {
        this.dataForm.picture = res.data;
      },
      beforeResourceUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 20;
        if (!isLt2M) {
          var message = this.$t('common.rules.picture.picture_size');
          this.$message.error(this.$t(data.message))
        }
        return isLt2M;
      },
    },
    created(request)
    {
      this.init();

      // 要保证取到
      this.upload_headers.Authorization = 'Bearer ' + localStorage.getItem('token');
    },
    mounted () {
      this.loadCategoryList();
    },
  };
</script>
