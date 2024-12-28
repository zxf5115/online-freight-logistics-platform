<template>
  <div class="xiecheng">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            <el-button v-if="isAuth('module:education:course:point:form')" type="success" icon="el-icon-plus" @click="$router.push({name: 'module_education_course_point_form', query: {course_id: dataForm.course_id}})">
              {{ $t('common.create') }}
            </el-button>
          </div>
        </div>
        <div class="admin_main_block_right">
          <div>
            <el-button v-if="isAuth('module:education:course:point:delete')" type="danger" icon="el-icon-delete" @click="deleteHandle()">
              {{ $t('common.batch_delete') }}
            </el-button>
          </div>
          <div class="mr10">
            <el-button icon="el-icon-back" @click="$router.go(-1)">
              {{ $t('common.return') }}
            </el-button>
          </div>
        </div>
      </div>

      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            <el-input v-model="dataForm.title" :placeholder="$t('common.please_input') + $t('course.point.title')" clearable>
            </el-input>
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

          <el-table-column :label="$t('course.title')" width="150">
            <template slot-scope="scope" v-if="scope.row.course">
              {{ scope.row.course.title }}
            </template>
          </el-table-column>

          <el-table-column :label="$t('course.course_unit')" width="250">
            <template slot-scope="scope">
              {{ scope.row.complete_name }}
            </template>
          </el-table-column>

          <el-table-column :label="$t('course.point.info')" width="300">
            <template slot-scope="scope">
              <dl class="table_dl">
                <dt>
                  <el-avatar shape="square" :size="45" :src="scope.row.picture">
                    <img src="@/assets/images/default/square.png"/>
                  </el-avatar>
                </dt>
                <dd class="table_dl_dd_all_30">
                  {{ $t('course.title') }}：
                  {{ scope.row.title }}
                </dd>
                <dd class="table_dl_dd_all_16_gray">
                  {{ $t('course.create_time') }}：
                  {{ scope.row.create_time }}
                </dd>
              </dl>
            </template>
          </el-table-column>

          <el-table-column prop="description" :label="$t('course.point.description')">
          </el-table-column>

          <el-table-column prop="sort" :label="$t('common.sort')">
          </el-table-column>

          <el-table-column :label="$t('course.point.status')">
            <template slot-scope="scope">
              <el-tag effect="dark" :type=" scope.row.status.value == 1 ? 'success' : 'danger' ">
                {{ scope.row.status.text }}
              </el-tag>
            </template>
          </el-table-column>

          <el-table-column :label="$t('common.handle')" fixed="right" width="200px">
            <template slot-scope="scope">
              <el-button v-if="isAuth('module:education:course:point:form')" type="primary" icon="el-icon-edit" @click="$router.push({name: 'module_education_course_point_form', query: {id: scope.row.id, course_id: dataForm.course_id}})">
                {{ $t('common.update') }}
              </el-button>

              <el-button v-if="isAuth('module:education:course:point:delete')" type="danger" icon="el-icon-delete" @click="deleteHandle(scope.row.id)">
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
        model: 'education/course/point',
        course_id: 0,
        unit_id: 0,
        dataForm: [
          'title',
          'course_id',
          'unit_id',
          'create_time',
        ],
      };
    },
    created() {
      let query = this.$route.query
      this.dataForm.course_id = query.course_id;
      this.dataForm.unit_id = query.unit_id;

      this.getDataList()
    }
  };
</script>
