<template>
  <div class="xiecheng">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            <router-link :to="{name: 'module_organization_form'}">
              <el-button v-if="isAuth('module:organization:form')" type="success" icon="el-icon-plus">
                {{ $t('common.create') }}
              </el-button>
            </router-link>
          </div>
        </div>
        <div class="admin_main_block_right">
          <div>
            <el-button v-if="isAuth('module:organization:delete')" type="danger" icon="el-icon-delete" @click="deleteHandle()">
              {{ $t('common.batch_delete') }}
            </el-button>
          </div>
        </div>
      </div>

      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            <el-input v-model="dataForm.username" :placeholder="$t('common.please_input') + $t('organization.username')" clearable>
            </el-input>
          </div>
          <div>
            <el-input v-model="dataForm.nickname" :placeholder="$t('common.please_input') + $t('organization.nickname')" clearable>
            </el-input>
          </div>
          <div>
            <el-select v-model="dataForm.relevance_role_id" :placeholder="$t('common.please_select') + $t('organization.role.title')" clearable>
              <el-option label="全部" value=""></el-option>
              <el-option v-for="(v,k) in roleList" :label="v.title" :key="k" :value="v.id">
              </el-option>
            </el-select>
          </div>
          <div>
            <el-button icon="el-icon-search" @click="getDataList()">
              {{ $t('common.search') }}
            </el-button>
          </div>
        </div>
      </div>
      <div class="admin_table_main">
        <el-table :data="dataList" v-loading="dataListLoading" @selection-change="selectionChangeHandle">
          <el-table-column type="selection" header-align="center" align="center">
          </el-table-column>

          <el-table-column prop="id" :label="$t('common.id')"  width="70px">
          </el-table-column>

          <el-table-column prop="nickname" :label="$t('organization.nickname')" width="300px">
            <template slot-scope="scope">
              <dl class="table_dl">
                <dt>
                  <el-avatar shape="square" :size="45" :src="scope.row.avatar">
                    <img src="@/assets/images/default/square.png"/>
                  </el-avatar>
                </dt>
                <dd class="table_dl_dd_all_30">
                  {{ $t('organization.nickname') }}： {{ scope.row.nickname }}
                </dd>
                <dd class="table_dl_dd_all_16_gray">
                  {{ $t('organization.create_time') }}： {{ scope.row.create_time }}
                </dd>
              </dl>
            </template>
          </el-table-column>

          <el-table-column prop="username" :label="$t('organization.username')">
          </el-table-column>

          <el-table-column :label="$t('organization.role.title')">
            <template slot-scope="scope">
              <span class="module_member_list_roles">
                <el-tag v-for="(v,k) in scope.row.role" :key="k">{{v.title}}</el-tag>
              </span>
            </template>
          </el-table-column>

          <el-table-column :label="$t('organization.status')">
            <template slot-scope="scope">
              <el-tag effect="dark" :type=" scope.row.status.value == 1 ? 'success' : 'danger' ">
                {{ scope.row.status.text }}
              </el-tag>
            </template>
          </el-table-column>

          <el-table-column :label="$t('common.handle')" fixed="right" width="320px">
            <template slot-scope="scope">
              <el-button v-if="isAuth('module:organization:password:form')" type="warning" icon="el-icon-bank-card" @click="initHandle(scope.row.id)">
                {{ $t('common.initialization_password') }}
              </el-button>

              <el-button v-if="isAuth('module:organization:form')" type="primary" icon="el-icon-edit" @click="$router.push({name: 'module_organization_form', query: {id: scope.row.id}})">
                {{ $t('common.update') }}
              </el-button>

              <el-button v-if="isAuth('module:organization:delete')" type="danger" icon="el-icon-delete" @click="deleteHandle(scope.row.id)">
                {{ $t('common.delete') }}
              </el-button>
            </template>
          </el-table-column>

        </el-table>
        <div class="admin_table_main_pagination">
          <el-pagination
            @size-change="sizeChangeHandle"
            @current-change="currentChangeHandle"
            :page-size="pageSize"
            :total="totalPage"
            :current-page="pageIndex"
            background layout="prev, pager, next,jumper,total">
          </el-pagination>
        </div>
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
        roleList: [],
        dataForm: [
          'username',
          'nickname',
          'relevance_role_id',
        ],
      };
    },
    methods: {
      // 删除
      initHandle (id) {
        let message = '您确定要初始化当前用户的登录密码？'

        this.$confirm(message, this.$t('common.prompt'), {
          confirmButtonText: this.$t('common.confirm'),
          cancelButtonText: this.$t('common.cancel'),
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/'+this.model+'/password'),
            method: 'post',
            data: {id: id}
          }).then(({data}) => {
            if (data && data.status === 200) {
              this.$message({
                message: this.$t('common.handle_success'),
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.getDataList()
                }
              })
            } else {
              this.$message.error(this.$t(data.message))
            }
          })
        }).catch(() => {})
      },
      loadRoleList () {
        this.$http({
          url: this.$http.adornUrl('/organization/role/select'),
          method: 'get'
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.roleList = data.data
          } else {
            this.$message.error(this.$t(data.message))
          }
        })
      }
    },
    created() {
      this.getDataList()
    },
    mounted () {
      this.loadRoleList();
    },
  };
</script>
