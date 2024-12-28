<template>
  <div class="xiecheng">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            <router-link :to="{name: 'module_member_form'}">
              <el-button v-if="isAuth('module:member:form')" type="success" icon="el-icon-plus">
                {{ $t('common.create') }}
              </el-button>
            </router-link>
          </div>
        </div>
        <div class="admin_main_block_right">
          <div>
            <el-button v-if="isAuth('module:member:delete')" type="danger" icon="el-icon-delete" @click="deleteHandle()">
              {{ $t('common.batch_delete') }}
            </el-button>
          </div>
        </div>
      </div>

      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            <el-input v-model="dataForm.username" :placeholder="$t('common.please_input') + $t('member.username')" clearable>
            </el-input>
          </div>
          <div>
            <el-input v-model="dataForm.nickname" :placeholder="$t('common.please_input') + $t('member.nickname')" clearable>
            </el-input>
          </div>
          <div>
            <el-select v-model="dataForm.relevance_role_id" :placeholder="$t('common.please_select') + $t('member.role.title')" clearable>
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

          <el-table-column prop="username" :label="$t('member.username')">
          </el-table-column>

          <el-table-column :label="$t('member.info')" width="300px">
            <template slot-scope="scope">
              <dl class="table_dl">
                <dd class="table_dl_dd_all_30">
                  {{ $t('member.nickname') }}： {{ scope.row.nickname }}
                </dd>
                <dd class="table_dl_dd_all_16_gray">
                  {{ $t('member.create_time') }}： {{ scope.row.create_time }}
                </dd>
              </dl>
            </template>
          </el-table-column>

          <el-table-column :label="$t('member.role.title')">
            <template slot-scope="scope">
              <span class="module_member_list_roles">
                <el-tag v-for="(v,k) in scope.row.role" :key="k">{{v.title}}</el-tag>
              </span>
            </template>
          </el-table-column>

          <el-table-column :label="$t('organization.certification_status')">
            <template slot-scope="scope">
              <el-tag effect="dark" :type=" scope.row.certification_status.value == 1 ? 'success' : 'danger' ">
                {{ scope.row.certification_status.text }}
              </el-tag>
            </template>
          </el-table-column>

          <el-table-column :label="$t('member.status')">
            <template slot-scope="scope">
              <el-tag effect="dark" :type=" scope.row.status.value == 1 ? 'success' : 'danger' ">
                {{ scope.row.status.text }}
              </el-tag>
            </template>
          </el-table-column>

          <el-table-column :label="$t('common.handle')" fixed="right" width="650">
            <template slot-scope="scope">
              <el-button v-if="isAuth('module:member:view')" type="info" icon="el-icon-view" @click="$router.push({name: 'module_member_view', query: {id: scope.row.id}})">
                {{ $t('common.view') }}
              </el-button>

              <el-button v-if="isAuth('module:member:password:form')" type="warning" icon="el-icon-bank-card" @click="initHandle(scope.row.id)">
                {{ $t('member.initialization_password') }}
              </el-button>

              <el-button v-if="isAuth('module:member:form')" type="primary" icon="el-icon-edit" @click="$router.push({name: 'module_member_form', query: {id: scope.row.id}})">
                {{ $t('common.update') }}
              </el-button>

              <el-button v-if="isAuth('module:member:archive:form')" type="success" icon="el-icon-folder" @click="$router.push({name: 'module_member_archive_form', query: {id: scope.row.id}})">
                {{ $t('member.archive_info') }}
              </el-button>

              <el-button v-if="isAuth('module:member:comment:form')" type="warning" icon="el-icon-s-check" @click="$router.push({name: 'module_member_comment_form', query: {member_id: scope.row.id}})">
                {{ $t('member.comment_info') }}
              </el-button>

              <el-button v-if="isAuth('module:member:status')" type="warning" icon="el-icon-finished" @click="statusHandle(scope.row.id, scope.row.status.value)">
                <span v-if="1== scope.row.status.value">
                  {{ $t('common.enable') }}
                </span>
                <span v-else>
                  {{ $t('common.disable') }}
                </span>
              </el-button>

              <el-button v-if="isAuth('module:member:delete') && scope.row.id != 1" type="danger" icon="el-icon-delete" @click="deleteHandle(scope.row.id)">
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
        model: 'member',
        roleList: [],
        dataForm: [
          'username',
          'nickname',
          'relevance_role_id',
        ],
      };
    },
    methods: {
      // 初始化
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
          url: this.$http.adornUrl('/member/role/select'),
          method: 'get'
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.roleList = data.data
          } else {
            this.$message.error(this.$t(data.message))
          }
        })
      },
      // 改变状态
      statusHandle (id, status) {
        let message = '您确定要这么做吗？';
        this.$confirm(message, this.$t('common.prompt'), {
          confirmButtonText: this.$t('common.confirm'),
          cancelButtonText: this.$t('common.cancel'),
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/'+this.model+'/status'),
            method: 'post',
            data: {id: id, status: status}
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
<style lang="scss" scoped>
  .member_list_roles span{margin-right: 10px;}
  .member_list_roles span:last-child{margin-right: 0;}
</style>
