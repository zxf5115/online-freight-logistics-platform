<template>
  <div class="xiecheng">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>{{ $t('organization.from') }}</div>
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
            {{ dataForm.title }}
          </el-form-item>

          <el-form-item :label="$t('organization.head')" prop="head">
            {{ dataForm.head }}
          </el-form-item>

          <el-form-item :label="$t('organization.home_address')" prop="home_address">
            {{ dataForm.home_address }}
          </el-form-item>

          <el-form-item :label="$t('organization.logo')" prop="logo">
            <el-upload class="avatar-uploader" :action="this.$http.adornUrl('/file/picture')" :show-file-list="false" :headers="upload_headers" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
              <img v-if="dataForm.logo" :src="dataForm.logo" class="avatar-upload">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item :label="$t('organization.head_mobile')" prop="head_mobile">
            <el-input v-model="dataForm.head_mobile" :disabled="is_money" :placeholder="$t('common.please_input')+$t('organization.head_mobile')"></el-input>
          </el-form-item>

          <el-form-item :label="$t('organization.contact')" prop="contact">
            <el-input v-model="dataForm.contact" :disabled="is_money" :placeholder="$t('common.please_input')+$t('organization.contact')"></el-input>
          </el-form-item>

          <el-form-item :label="$t('organization.contact_mobile')" prop="contact_mobile">
            <el-input v-model="dataForm.contact_mobile" :disabled="is_money" :placeholder="$t('common.please_input')+$t('organization.contact_mobile')"></el-input>
          </el-form-item>

          <el-form-item :label="$t('organization.email')" prop="email">
            <el-input v-model="dataForm.email" :disabled="is_money" :placeholder="$t('common.please_input')+$t('organization.email')"></el-input>
          </el-form-item>

          <el-form-item :label="$t('organization.weixin')" prop="weixin">
            <el-input v-model="dataForm.weixin" :disabled="is_money" :placeholder="$t('common.please_input')+$t('organization.weixin')"></el-input>
          </el-form-item>

          <el-form-item :label="$t('organization.qq')" prop="qq">
            <el-input v-model="dataForm.qq" :disabled="is_money" :placeholder="$t('common.please_input')+$t('organization.qq')"></el-input>
          </el-form-item>

          <el-form-item :label="$t('organization.address')" prop="address">
            <el-input type="textarea" :disabled="is_address" v-model="dataForm.address" :placeholder="$t('common.please_input')+$t('organization.address')"></el-input>
          </el-form-item>

          <el-form-item :label="$t('common.status')" prop="status">
            <el-switch v-model="dataForm.status" active-value="1" :active-text="$t('common.enable')" inactive-value="2" :inactive-text="$t('common.disable')">
            </el-switch>
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
        upload_headers:{},
        dataForm:
        {
          id: 0,
          logo: '',
          title : '',
          head: '',
          home_address: '',
          head_mobile: '',
          contact: '',
          contact_mobile: '',
          email: '',
          weixin: '',
          qq: '',
          address: '',
          status: '1',
        },
        dataRule:
        {
          logo: [
            { required: true, message: this.$t('organization.rules.logo.require'), trigger: 'blur' },
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
              url: this.$http.adornUrl(`/organization/view/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.dataForm.logo           = data.data.logo
                this.dataForm.title          = data.data.title
                this.dataForm.head           = data.data.head
                this.dataForm.head_mobile    = data.data.head_mobile
                this.dataForm.home_address   = data.data.home_address
                this.dataForm.contact        = data.data.contact
                this.dataForm.contact_mobile = data.data.contact_mobile
                this.dataForm.email          = data.data.email
                this.dataForm.weixin         = data.data.weixin
                this.dataForm.qq             = data.data.qq
                this.dataForm.address        = data.data.address
                this.dataForm.status         = data.data.status.value + ''
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
              url: this.$http.adornUrl(`/organization/handle`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'logo': this.dataForm.logo,
                'head_mobile': this.dataForm.head_mobile,
                'contact': this.dataForm.contact,
                'contact_mobile': this.dataForm.contact_mobile,
                'email': this.dataForm.email,
                'weixin': this.dataForm.weixin,
                'qq': this.dataForm.qq,
                'address': this.dataForm.address,
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
      resetForm:function()
      {
        this.$refs['dataForm'].resetFields();
      },
      handleAvatarSuccess(res, file) {
        this.dataForm.logo = res.data;
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
    },
    created() {
      this.init();

      // 要保证取到
      this.upload_headers.Authorization = 'Bearer ' + localStorage.getItem('token');
    }
  };
</script>
