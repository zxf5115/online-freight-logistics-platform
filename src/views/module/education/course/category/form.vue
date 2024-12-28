<template>
  <div class="xiecheng">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>{{ $t('course.category.from') }}</div>
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

          <el-form-item :label="$t('course.category.title')" prop="title">
            <el-input :placeholder="$t('course.category.title')" v-model="dataForm.title"></el-input>
          </el-form-item>

          <el-form-item :label="$t('course.category.parent_title')" prop="parent_id">
            <el-cascader v-model="dataForm.parent_id" :placeholder="$t('common.please_select')+$t('course.category.parent_title')" :show-all-levels="false" :options="level" :props="levelProps" clearable></el-cascader>
          </el-form-item>

          <el-form-item :label="$t('course.category.description')" prop="description">
            <el-input type="textarea" :placeholder="$t('common.please_input')+$t('course.category.description')" maxlength="200" show-word-limit v-model="dataForm.description"></el-input>
          </el-form-item>

          <el-form-item :label="$t('course.category.depth')" prop="depth">
            <el-input-number :placeholder="$t('common.please_input')+$t('course.category.depth')"  v-model="dataForm.depth"></el-input-number>
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
        model: 'education/course/category',
        level: [],
        levelProps: {
          label: 'title',
          value: 'id',
          checkStrictly: true
        },
        dataForm:
        {
          id: 0,
          parent_id: 0,
          title: '',
          description: '',
          depth: 0,
          sort: 0,
        },
        dataRule:
        {
          title: [
            { required: true, message: this.$t('course.category.rules.title.require'), trigger: 'blur' },
            { min: 1, max: 50, message: this.$t('course.category.rules.title.length'), trigger: 'blur' }
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

        this.dataForm.id = id || 0
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/education/course/category/view/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.dataForm.parent_id   = data.data.parent_id
                this.dataForm.title       = data.data.title
                this.dataForm.description = data.data.description
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
              url: this.$http.adornUrl(`/education/course/category/handle`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'parent_id': this.dataForm.parent_id,
                'title': this.dataForm.title,
                'description': this.dataForm.description,
                'depth': this.dataForm.depth,
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
      loadCategoryList () {
        this.$http({
          url: this.$http.adornUrl('/education/course/category/select'),
          method: 'get'
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.level = data.data
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
      this.loadCategoryList();
    },
  };
</script>
