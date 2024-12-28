<template>
  <div class="xiecheng">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>{{ $t('notice.from') }}</div>
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

          <el-form-item :label="$t('notice.title')" prop="title">
            <el-input :placeholder="$t('common.please_input')+$t('notice.title')" v-model="dataForm.title"></el-input>
          </el-form-item>

          <el-form-item :label="$t('organization.title')" prop="organization_id">
            <el-select v-model="dataForm.organization_id" :placeholder="$t('common.please_select')+$t('organization.title')">
              <el-option label="全部" value="-1"></el-option>
              <el-option :key="item.id" :label="item.title" :value="item.id" v-for="item in organizationList" />
            </el-select>
          </el-form-item>

          <el-form-item prop="content" :label="$t('notice.content')">
            <el-input type="textarea" :placeholder="$t('common.please_input')+$t('notice.content')" v-model="dataForm.content"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button v-if="isAuth('module:message:handle')" type="primary" @click="dataFormSubmit()">
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
        model: 'notice',
        organizationList: [],
        dataForm:
        {
          id: 0,
          organization_id: '',
          title: '',
          content: '',
        },
        dataRule:
        {
          title: [
            { required: true, message: this.$t('notice.rules.title.require'), trigger: 'blur' },
            { min: 1, max: 100, message: this.$t('notice.rules.title.length'), trigger: 'blur' }
          ],
          content: [
            { required: true, message: this.$t('notice.rules.content.require'), trigger: 'blur' },
            { min: 1, max: 1000, message: this.$t('notice.rules.content.require'), trigger: 'blur' }
          ]
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
              url: this.$http.adornUrl(`/notice/view/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.dataForm.title   = data.data.title
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
              url: this.$http.adornUrl(`/notice/handle`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'organization_id': this.dataForm.organization_id,
                'title': this.dataForm.title,
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
      loadOrganizationList () {
        this.$http({
          url: this.$http.adornUrl('/organization/select'),
          method: 'get'
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.organizationList = data.data
          } else {
            this.$message.error(this.$t(data.message))
          }
        })
      }
    },
    created() {
      this.init();
    },
    mounted () {
      this.loadOrganizationList()
    },
  };
</script>
<style>
  .mavon {
    width: 800px;
  }
  .v-note-op {
    padding: 0 !important;
  }
</style>
