<template>
  <div class="xiecheng">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            {{ $t('statistical.online_info') }}
          </div>
        </div>
      </div>

      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            <el-input v-model="dataForm.member_username" :placeholder="$t('common.please_input') + $t('member.username')" clearable>
            </el-input>
          </div>
          <div>
            <el-input v-model="dataForm.member_nickname" :placeholder="$t('common.please_input') + $t('statistical.nickname')" clearable>
            </el-input>
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

          <el-table-column :label="$t('member.username')">
            <template slot-scope="scope" v-if="scope.row.member">
              {{ scope.row.member.username }}
            </template>
          </el-table-column>

          <el-table-column :label="$t('statistical.nickname')">
            <template slot-scope="scope" v-if="scope.row.member">
              {{ scope.row.member.nickname }}
            </template>
          </el-table-column>

          <el-table-column prop="create_time" :label="$t('statistical.create_time')">
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
        model: 'statistical/online',
        dataForm: [
          'member_username',
          'member_nickname',
        ],
      };
    },
    created() {
      this.getDataList()
    }
  };
</script>
