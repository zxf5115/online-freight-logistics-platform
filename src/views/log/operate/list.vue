<template>
  <div class="xiecheng">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_right">
          <div>
            <el-button v-if="isAuth('log:operate:delete')" type="danger" icon="el-icon-delete" @click="deleteHandle()">
              {{ $t('common.batch_delete') }}
            </el-button>
          </div>
        </div>
      </div>

      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            <el-input v-model="dataForm.username" :placeholder="$t('common.please_input') + $t('user.nickname')" clearable>
            </el-input>
          </div>
          <div>
            <el-select v-model="dataForm.organization_id" :placeholder="$t('common.please_select') + $t('organization.title')" clearable>
              <el-option label="全部" value=""></el-option>
              <el-option v-for="(v,k) in organizationList" :label="v.title" :key="k" :value="v.id">
              </el-option>
            </el-select>
          </div>
          <div>
            <el-date-picker format="yyyy-MM-dd HH:mm" v-model="dataForm.create_time" type="daterange" :range-separator="$t('common.to')" :start-placeholder="$t('common.start_time')" :end-placeholder="$t('common.end_time')" clearable>
            </el-date-picker>
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

          <el-table-column prop="id" :label="$t('common.id')" width="70">
          </el-table-column>

          <el-table-column :label="$t('organization.title')" width="250">
            <template slot-scope="scope">
              <span v-if="scope.row.organization">
                {{ scope.row.organization.title }}
              </span>
            </template>
          </el-table-column>

          <el-table-column prop="username" :label="$t('log.operate.username')" width="100">
          </el-table-column>

          <el-table-column prop="operation" :label="$t('log.operate.operation')">
          </el-table-column>

          <el-table-column prop="address" :label="$t('log.operate.address')">
          </el-table-column>

          <el-table-column prop="create_time" :label="$t('log.operate.create_time')" width="150">
          </el-table-column>

          <el-table-column :label="$t('common.handle')" fixed="right" width="120">
            <template slot-scope="scope">
              <el-button v-if="isAuth('user:delete')" type="danger" icon="el-icon-delete" @click="deleteHandle(scope.row.id)">
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
            background layout="prev, pager, next, jumper, total">
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
        model: 'log/operate',
        organizationList: [],
        dataForm: [
          'username',
          'create_time',
          'organization_id'
        ],
      };
    },
    methods: {
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
      this.getDataList()
    },
    mounted () {
      this.loadOrganizationList();
    },
  };
</script>
