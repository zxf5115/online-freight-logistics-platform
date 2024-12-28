<template>
  <div class="xiecheng">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>{{ $t('graduation.audit') }}</div>
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
        <el-card class="box-card mt10" shadow="never">
          <div slot="header" class="clearfix">
            <span class="red">{{ $t('graduation.message') }}</span>
          </div>
          <div class="text item">
            <div>
              <el-table :data="dataList" v-loading="dataListLoading">
                <el-table-column prop="id" :label="$t('common.id')" width="70">
                </el-table-column>

                <el-table-column prop="organization_name" :label="$t('organization.title')">
                  <template slot-scope="scope" v-if="scope.row.organization">
                    {{ scope.row.organization.title }}
                  </template>
                </el-table-column>

                <el-table-column :label="$t('organization.squad.title')">
                  <template slot-scope="scope" v-if="scope.row.squad">
                    {{ scope.row.squad.title }}
                  </template>
                </el-table-column>

                <el-table-column prop="graduation_number" :label="$t('graduation.graduation_number')">
                </el-table-column>

                <el-table-column prop="ungraduation_number" :label="$t('graduation.ungraduation_number')">
                </el-table-column>

                <el-table-column :label="$t('squad.start_time')">
                  <template slot-scope="scope" v-if="scope.row.squad">
                    {{ scope.row.squad.start_time }}
                  </template>
                </el-table-column>

                <el-table-column :label="$t('squad.end_time')">
                  <template slot-scope="scope" v-if="scope.row.squad">
                    {{ scope.row.squad.end_time }}
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="mt20">
              <el-button type="primary" @click="agreeSubmit()">
                {{ $t('common.agree') }}
              </el-button>
              <el-button @click="rejectSubmit()">
                {{ $t('common.reject') }}
              </el-button>
            </div>
          </div>
        </el-card>
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
        model: 'education/graduation',
        dataForm:
        {
          id: 0
        },
        dataRule: {}
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
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/education/graduation/audit`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id
              })
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.dataList  = data.data
              }
            })
          }
        })
      },
      // 表单提交
      agreeSubmit () {
        this.$http({
          url: this.$http.adornUrl(`/education/graduation/handle`),
          method: 'post',
          data: this.$http.adornData({
            'id': this.dataForm.id,
            'graduation_status': 1,
            'audit_content': ''
          })
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.$message.success(this.$t('common.handle_success'));
            this.$router.go(-1);
          } else {
            this.$message.error(this.$t(data.message))
          }
        })
      },
      rejectSubmit:function()
      {
        this.$prompt(this.$t('graduation.reject'), this.$t('common.prompt'), {
          confirmButtonText: this.$t('common.confirm'),
          cancelButtonText: this.$t('common.cancel'),
          inputType: 'textarea'
        }).then(({ value }) => {
          this.$http({
            url: this.$http.adornUrl('/education/graduation/handle'),
            method: 'post',
            data: this.$http.adornData({
              'id': this.dataForm.id,
              'graduation_status': 2,
              'graduation_content': value
            })
          }).then(({data}) => {
            if (data && data.status === 200) {
              this.$message.success(this.$t('common.handle_success'));
              this.$router.go(-1);
            } else {
              this.$message.error(this.$t(data.message))
            }
          })
        }).catch(() => {})
      }
    },
    created(request)
    {
      this.init();
    }
  };
</script>
<style lang="scss" scoped>
  .mt20 {
    margin-top: 20px;
  }
</style>
