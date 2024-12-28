<template>
  <div class="xiecheng">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>{{ $t('keyword.from') }}</div>
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

          <el-form-item :label="$t('keyword.title')" prop="title">
            <el-input :placeholder="$t('common.please_input')+$t('keyword.title')" v-model="dataForm.title"></el-input>
          </el-form-item>

          <el-form-item :label="$t('keyword.total')" prop="total">
            <el-input-number :placeholder="$t('common.please_input')+$t('keyword.total')" v-model="dataForm.total"></el-input-number>
          </el-form-item>

          <el-form-item :label="$t('common.status')" prop="status">
            <el-switch v-model="dataForm.status" active-value="1" :active-text="$t('common.enable')" inactive-value="2" :inactive-text="$t('common.disable')">
            </el-switch>
          </el-form-item>

          <el-form-item>
            <el-button v-if="isAuth('module:keyword:handle')" type="primary" @click="dataFormSubmit()">
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
        model: 'keyword',
        dataForm:
        {
          id: 0,
          title: '',
          total: 0,
          status: '1',
        },
        dataRule:
        {
          title: [
            { required: true, message: this.$t('keyword.rules.title.require'), trigger: 'blur' },
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
              url: this.$http.adornUrl(`/keyword/view/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.dataForm.title  = data.data.title
                this.dataForm.total  = data.data.total
                this.dataForm.status = data.data.status.value + ''
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {console.log(1);
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/keyword/handle`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'title': this.dataForm.title,
                'total': this.dataForm.total,
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
      }
    },
    created() {
      this.init();
    }
  };
</script>
