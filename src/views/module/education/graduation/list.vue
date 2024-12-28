<template>
  <div class="xiecheng">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_right">
          <div>
            <el-button v-if="isAuth('module:education:graduation:handle')" type="danger" icon="el-icon-zoom-in" @click="$router.push({name: 'module_education_graduation_form', query: {id : graduation_id}})">
              {{$t('common.audit')}}
            </el-button>
          </div>
        </div>
      </div>

      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            <el-input v-model="dataForm.organization_title" :placeholder="$t('common.please_input') + $t('organization.title')" clearable>
            </el-input>
          </div>
          <div>
            <el-input v-model="dataForm.squad_title" :placeholder="$t('common.please_input') + $t('squad.title')" clearable>
            </el-input>
          </div>
          <div>
            <el-date-picker format="yyyy-MM-dd HH:mm" v-model="dataForm.create_time" type="daterange" :range-separator="$t('common.to')" :start-placeholder="$t('common.start_time')" :end-placeholder="$t('common.end_time')" clearable>
            </el-date-picker>
          </div>
          <div>
            <el-button icon="el-icon-search" @click="getDataList(true)">
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

          <el-table-column :label="$t('graduation.graduation_status')">
            <template slot-scope="scope">
              <el-tag effect="dark" :type=" scope.row.graduation_status.value == 1 ? 'success' : 'danger' ">
                {{ scope.row.graduation_status.text }}
              </el-tag>
            </template>
          </el-table-column>

          <el-table-column :label="$t('common.handle')" fixed="right" width="200">
            <template slot-scope="scope">
              <el-button v-if="isAuth('module:education:graduation:view')" type="info" icon="el-icon-view" @click="$router.push({name: 'module_education_graduation_view', query: {id : scope.row.id}})">
                {{ $t('common.view') }}
              </el-button>

              <el-button v-if="isAuth('module:education:graduation:handle')" type="danger" icon="el-icon-zoom-in" @click="$router.push({name: 'module_education_graduation_form', query: {id : scope.row.id}})">
                {{$t('common.audit')}}
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
        model: 'education/graduation',
        graduation_id: [],
        dataForm: [
          'organization_title',
          'squad_title',
          'create_time',
        ]
      };
    },
    methods: {
      selectionChangeHandle (data) {
        let select_id = [];

        data.forEach(res=>{
          select_id.push(res.id);
        });

        this.graduation_id = select_id.join('_')
      },
    },
    created() {
      this.getDataList()
    }
  };
</script>
<style lang="scss" scoped>
  .mt10 {
    margin-top: 5px;
  }
</style>
