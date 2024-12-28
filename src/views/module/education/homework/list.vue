<template>
  <div class="xiecheng">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_right">
          <div>
            <el-button v-if="isAuth('module:education:homework:delete')" type="danger" icon="el-icon-delete" @click="deleteHandle()">
              {{ $t('common.batch_delete') }}
            </el-button>
          </div>
        </div>
      </div>

      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            <el-input v-model="dataForm.course_title" :placeholder="$t('common.please_input') + $t('course.title')" clearable>
            </el-input>
          </div>
          <div>
            <el-input v-model="dataForm.squad_title" :placeholder="$t('common.please_input') + $t('squad.title')" clearable>
            </el-input>
          </div>
          <div>
            <el-input v-model="dataForm.content" :placeholder="$t('common.please_input') + $t('homework.content')" clearable>
            </el-input>
          </div>
          <div>
            <el-date-picker format="yyyy-MM-dd" v-model="dataForm.create_time" type="daterange" :range-separator="$t('common.to')" :start-placeholder="$t('common.start_time')" :end-placeholder="$t('common.end_time')" clearable>
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

          <el-table-column :label="$t('course.title')" width="200">
            <template slot-scope="scope" v-if="scope.row.course">
              {{ scope.row.course.title }}
            </template>
          </el-table-column>

          <el-table-column prop="content" :label="$t('homework.content')" width="350">
          </el-table-column>

          <el-table-column :label="$t('squad.title')">
            <template slot-scope="scope">
              <div v-if="scope.row.squad">
                <el-tag class="ml10 mt10" v-for="(v,k) in scope.row.squad" :key="k">{{v.title}}</el-tag>
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="create_time" :label="$t('homework.create_time')" width="150">
          </el-table-column>

          <el-table-column :label="$t('common.handle')" fixed="right" width="200">
            <template slot-scope="scope">
              <el-button v-if="isAuth('module:education:homework:view')" type="info" icon="el-icon-view" @click="$router.push({name: 'module_education_homework_view', query: {id : scope.row.id}})">
                {{ $t('common.view') }}
              </el-button>

              <el-button v-if="isAuth('module:education:homework:delete')" type="danger" icon="el-icon-delete" @click="deleteHandle(scope.row.id)">
                <span class="delete">{{$t('common.delete')}}</span>
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
        model: 'education/homework',
        dataForm: [
          'course_title',
          'squad_title',
          'content',
          'create_time',
        ]
      };
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
