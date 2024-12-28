<template>
  <div class="xiecheng">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>{{ $t('organization.view') }}</div>
        </div>

        <div class="admin_main_block_right">
          <div>
            <el-button v-if="isAuth('module:organization:export')" type="success" icon="el-icon-download" @click="exportHandle">
              {{ $t('common.export') }}
            </el-button>
          </div>
          <div class="mr10">
            <el-button icon="el-icon-back" @click="$router.go(-1)">
              {{ $t('common.return') }}
            </el-button>
          </div>
        </div>
      </div>

      <div class="admin_form_main">
        <el-card class="box-card" shadow="never">
          <div slot="header" class="clearfix">
            <span>{{ $t('common.basic_info') }}</span>
          </div>
          <div class="text item">
            <el-form ref="form" :model="dataForm" label-width="100" label-position="right" >
              <el-row>
                <el-col class="image" :span="6">
                  <el-image :src="dataForm.business_license" :lazy="true" width="380">
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                </el-col>
                <el-col :span="17" :offset="1">
                  <el-form-item :label="$t('organization.title')" label-width="80">
                    {{ dataForm.title }}
                  </el-form-item>

                  <el-form-item :label="$t('organization.home_address')" label-width="100">
                    {{ dataForm.home_address }}
                  </el-form-item>

                  <el-form-item :label="$t('organization.head')" label-width="100">
                    {{ dataForm.head }}
                  </el-form-item>

                  <el-form-item :label="$t('organization.head_mobile')" label-width="100">
                    {{ dataForm.head_mobile }}
                  </el-form-item>

                  <el-form-item :label="$t('organization.contact')" label-width="100">
                    {{ dataForm.contact }}
                  </el-form-item>

                  <el-form-item :label="$t('organization.contact_mobile')" label-width="100">
                    {{ dataForm.contact_mobile }}
                  </el-form-item>

                  <el-form-item :label="$t('organization.email')" label-width="100">
                    {{ dataForm.email }}
                  </el-form-item>

                  <el-form-item :label="$t('organization.weixin')" label-width="100">
                    {{ dataForm.weixin }}
                  </el-form-item>

                  <el-form-item :label="$t('organization.qq')" label-width="100">
                    {{ dataForm.qq }}
                  </el-form-item>

                  <el-form-item :label="$t('organization.address')" label-width="100">
                    {{ dataForm.address }}
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-card>
        <el-card class="box-card mt10" shadow="never">
          <div slot="header" class="clearfix">
            <span>{{ $t('organization.course_info') }}</span>
          </div>
          <div class="text item">
            <el-table :data="dataForm.course" v-loading="dataListLoading" height="300">
              <el-table-column prop="id" :label="$t('common.id')" width="70">
              </el-table-column>

              <el-table-column prop="title" :label="$t('course.title')" width="300">
              </el-table-column>

              <el-table-column prop="description" :label="$t('course.description')">
              </el-table-column>
            </el-table>
          </div>
        </el-card>
        <el-card class="box-card mt10" shadow="never">
          <div slot="header" class="clearfix">
            <span>{{ $t('organization.open_squad_info') }}</span>
          </div>
          <div class="text item">
            <el-table :data="dataForm.squad" v-loading="dataListLoading" height="300">
              <el-table-column prop="id" :label="$t('common.id')"  width="70">
              </el-table-column>

              <el-table-column :label="$t('squad.info')" width="300px">
                <template slot-scope="scope">
                  <dl class="table_dl">
                    <dd class="table_dl_dd_all_30">
                      {{ $t('squad.title') }}： {{ scope.row.title }}
                    </dd>
                    <dd class="table_dl_dd_all_16_gray">
                      {{ $t('squad.start_time') }}： {{ scope.row.start_time }}
                    </dd>
                    <dd class="table_dl_dd_all_16_gray mt10">
                      {{ $t('squad.end_time') }}： {{ scope.row.end_time }}
                    </dd>
                  </dl>
                </template>
              </el-table-column>

              <el-table-column prop="description" :label="$t('squad.description')">
                <template slot-scope="scope">
                  <el-popover placement="top-start"
                    width="800"
                    trigger="hover"
                    :content="scope.row.description">
                    <el-button type="warning" slot="reference">
                      {{ $t('squad.description') }}
                    </el-button>
                  </el-popover>
                </template>
              </el-table-column>

              <el-table-column prop="teacher_name" :label="$t('squad.teacher_name')">
              </el-table-column>

              <el-table-column prop="number" :label="$t('squad.number')">
              </el-table-column>

              <el-table-column prop="sort" :label="$t('common.sort')">
              </el-table-column>

              <el-table-column prop="create_time" :label="$t('common.create_time')">
              </el-table-column>

              <el-table-column :label="$t('common.handle')" fixed="right" width="280">
                <template slot-scope="scope">
                  <el-button v-if="isAuth('module:organization:squad:view')" type="info" icon="el-icon-view" @click="$router.push({name: 'module_organization_squad_view', query: {id : scope.row.id}})">
                    {{ $t('common.view') }}
                  </el-button>

                  <el-button v-if="isAuth('module:organization:squad:form')" type="primary" icon="el-icon-edit" @click="$router.push({name: 'module_organization_squad_form', query: {id : scope.row.id}})">
                    {{ $t('common.update') }}
                  </el-button>

                  <el-button v-if="isAuth('module:organization:squad:delete')" type="danger" icon="el-icon-delete" @click="deleteHandle(scope.row.id)">
                    <span class="delete">{{$t('common.delete')}}</span>
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>

        <el-card class="box-card mt10" shadow="never">
          <div slot="header" class="clearfix">
            <span>{{ $t('organization.graduation_squad_info') }}</span>
          </div>
          <div class="text item">
            <el-table :data="dataForm.graduation_squad" v-loading="dataListLoading" height="300">
              <el-table-column prop="id" :label="$t('common.id')"  width="70">
              </el-table-column>

              <el-table-column :label="$t('squad.info')" width="300px">
                <template slot-scope="scope">
                  <dl class="table_dl">
                    <dd class="table_dl_dd_all_30">
                      {{ $t('squad.title') }}： {{ scope.row.title }}
                    </dd>
                    <dd class="table_dl_dd_all_16_gray">
                      {{ $t('squad.start_time') }}： {{ scope.row.start_time }}
                    </dd>
                    <dd class="table_dl_dd_all_16_gray mt10">
                      {{ $t('squad.end_time') }}： {{ scope.row.end_time }}
                    </dd>
                  </dl>
                </template>
              </el-table-column>

              <el-table-column prop="description" :label="$t('squad.description')">
                <template slot-scope="scope">
                  <el-popover placement="top-start"
                    width="800"
                    trigger="hover"
                    :content="scope.row.description">
                    <el-button type="warning" slot="reference">
                      {{ $t('squad.description') }}
                    </el-button>
                  </el-popover>
                </template>
              </el-table-column>

              <el-table-column prop="teacher_name" :label="$t('squad.teacher_name')">
              </el-table-column>

              <el-table-column prop="number" :label="$t('squad.number')">
              </el-table-column>

              <el-table-column prop="sort" :label="$t('common.sort')">
              </el-table-column>

              <el-table-column prop="create_time" :label="$t('common.create_time')">
              </el-table-column>

              <el-table-column :label="$t('common.handle')" fixed="right" width="280">
                <template slot-scope="scope">
                  <el-button v-if="isAuth('module:organization:squad:view')" type="info" icon="el-icon-view" @click="$router.push({name: 'module_organization_squad_view', query: {id : scope.row.id}})">
                    {{ $t('common.view') }}
                  </el-button>

                  <el-button v-if="isAuth('module:organization:squad:form')" type="primary" icon="el-icon-edit" @click="$router.push({name: 'module_organization_squad_form', query: {id : scope.row.id}})">
                    {{ $t('common.update') }}
                  </el-button>

                  <el-button v-if="isAuth('module:organization:squad:delete')" type="danger" icon="el-icon-delete" @click="deleteHandle(scope.row.id)">
                    <span class="delete">{{$t('common.delete')}}</span>
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
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
        model: 'organization',
        src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
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
              url: this.$http.adornUrl(`/organization/view/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.dataForm   = data.data
              }
            })
          }
        })
      },
      exportHandle() {
        this.$http({
          url: this.$http.adornUrl(`/organization/export`),
          method: 'post',
          data: this.$http.adornData({
            'id': this.dataForm.id
          })
        }).then(({data}) => {
          if (data && data.status === 200) {
            window.open(data.data)
          } else {
            this.$message.error(this.$t(data.message))
          }
        })
      }
    },
    created(request)
    {
      this.init();
    }
  };
</script>


<style lang="scss" scoped>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .vertical >>> .el-form-item__label {
    float: none;
  }
  .el-image {
    width: 380px;
    height: 380px;
  }
  .image >>> .el-image__error, .el-image__inner, .el-image__placeholder {
    width: 380px;
  }
</style>
