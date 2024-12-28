<template>
  <div class="xiecheng">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>{{ $t('organization.audit') }}</div>
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

          <el-form-item :label="$t('organization.title')">
            {{ dataForm.title }}
          </el-form-item>

          <el-form-item :label="$t('organization.head')">
            {{ dataForm.head }}
          </el-form-item>

          <el-form-item :label="$t('organization.home_address')">
            {{ dataForm.home_address }}
          </el-form-item>

          <el-form-item :label="$t('organization.audit_status')" prop="audit_status">
            <el-switch v-model="dataForm.audit_status" active-value="1" :active-text="$t('common.pass')" inactive-value="2" :inactive-text="$t('common.no_pass')">
            </el-switch>
          </el-form-item>

          <el-form-item :label="$t('organization.content')" prop="content">
            <el-input type="textarea" v-model="dataForm.content" :placeholder="$t('common.please_input')+$t('organization.content')"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button v-if="isAuth('module:organization:handle')" type="primary" @click="dataFormSubmit()">
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
        model: 'organization',
        dataForm:
        {
          id: 0,
          title: '',
          head: '',
          home_address: '',
          audit_status: '1',
          content: '',
        },
        dataRule: {}
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
              url: this.$http.adornUrl(`/organization/view/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.dataForm.title        = data.data.title
                this.dataForm.head         = data.data.head
                this.dataForm.home_address = data.data.home_address

                if(data.data.audit_status.value > 0) {
                  this.dataForm.audit_status = data.data.audit_status.value + ''
                }

                if(data.data.audit) {
                  this.dataForm.content      = data.data.audit.content
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
              url: this.$http.adornUrl(`/organization/audit`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id,
                'audit_status': this.dataForm.audit_status,
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
      }
    },
    created() {
      this.init();
    }
  };
</script>
