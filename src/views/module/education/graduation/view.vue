<template>
  <div class="xiecheng">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>{{ $t('graduation.view') }}</div>
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

          <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
              <span>{{ $t('graduation.graduation') }}</span>
            </div>
            <div class="text item">
              <el-table :data="dataForm.graduation" v-loading="dataListLoading" height="500">
                <el-table-column prop="id" :label="$t('common.id')"  width="70">
                </el-table-column>

                <el-table-column prop="member_no" :label="$t('member.member_no')">
                </el-table-column>

                <el-table-column prop="realname" :label="$t('member.archive.realname')">
                  <template slot-scope="scope" v-if="scope.row.archive">
                    {{ scope.row.archive.realname }}
                  </template>
                </el-table-column>

                <el-table-column prop="sex" :label="$t('member.archive.sex')">
                  <template slot-scope="scope" v-if="scope.row.archive">
                    {{ scope.row.archive.sex.text }}
                  </template>
                </el-table-column>

                <el-table-column prop="mobile" :label="$t('member.mobile')">
                </el-table-column>

                <el-table-column prop="email" :label="$t('member.email')">
                </el-table-column>

                <el-table-column :label="$t('common.handle')" fixed="right" width="120">
                  <template slot-scope="scope">
                    <el-button v-if="isAuth('module:member:view')" type="info" icon="el-icon-view" @click="$router.push({name: 'module_member_view', query: {id: scope.row.id}})">
                      {{ $t('common.view') }}
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-card>

          <el-card class="box-card mt10" shadow="never">
            <div slot="header" class="clearfix">
              <span>{{ $t('graduation.ungraduation') }}</span>
            </div>
            <div class="text item">
              <el-table :data="dataForm.ungraduation" v-loading="dataListLoading" height="300">
                <el-table-column prop="id" :label="$t('common.id')"  width="70">
                </el-table-column>

                <el-table-column prop="member_no" :label="$t('member.member_no')">
                </el-table-column>

                <el-table-column prop="realname" :label="$t('member.archive.realname')">
                  <template slot-scope="scope" v-if="scope.row.archive">
                    {{ scope.row.archive.realname }}
                  </template>
                </el-table-column>

                <el-table-column prop="sex" :label="$t('member.archive.sex')">
                  <template slot-scope="scope" v-if="scope.row.archive">
                    {{ scope.row.archive.sex.text }}
                  </template>
                </el-table-column>

                <el-table-column prop="mobile" :label="$t('member.mobile')">
                </el-table-column>

                <el-table-column prop="email" :label="$t('member.email')">
                </el-table-column>

                <el-table-column :label="$t('common.handle')" fixed="right" width="120">
                  <template slot-scope="scope">
                    <el-button v-if="isAuth('module:member:view')" type="info" icon="el-icon-view" @click="$router.push({name: 'module_member_view', query: {id: scope.row.id}})">
                      {{ $t('common.view') }}
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-card>

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
        model: 'education/graduation',
        dataForm:
        {
          id: 0,
          graduation: [],
          ungraduation: []
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
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/education/graduation/view/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.dataForm.graduation   = data.data.graduation
                this.dataForm.ungraduation = data.data.ungraduation
              }
            })
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

  .mt10 {
    margin-top: 10px;
  }
</style>
