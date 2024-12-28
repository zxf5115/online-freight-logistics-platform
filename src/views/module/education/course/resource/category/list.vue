<template>
  <div class="xiecheng">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            <el-button v-if="isAuth('module:education:course:resource:category:form')" type="success" icon="el-icon-plus" @click="$router.push({name: 'module_education_course_resource_category_form', query: {course_id: dataForm.course_id}})">
              {{ $t('common.create') }}
            </el-button>
          </div>
        </div>
        <div class="admin_main_block_right">
          <div>
            <el-button v-if="isAuth('module:education:course:resource:category:delete')" type="danger" icon="el-icon-delete" @click="deleteHandle()">
              {{ $t('common.batch_delete') }}
            </el-button>
          </div>
          <div class="mr10">
            <el-button icon="el-icon-back" @click="$router.push({name: 'module_education_course_list'})">
              {{ $t('common.return') }}
            </el-button>
          </div>
        </div>
      </div>

      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            <el-input v-model="dataForm.title" :placeholder="$t('common.please_input') + $t('course.resource.category.title')" clearable>
            </el-input>
          </div>
          <div>
            <el-button icon="el-icon-search" @click="getDataList(true)">
              {{ $t('common.search') }}
            </el-button>
          </div>
        </div>
      </div>

      <div class="admin_table_main">
        <el-table :data="dataList" row-key="id" v-loading="dataListLoading">

          <el-table-column :label="$t('common.spread_pack')"  width="120">
          </el-table-column>

          <el-table-column :label="$t('course.title')">
            <template slot-scope="scope">
              <span v-if="scope.row.course">
                {{ scope.row.course.title }}
              </span>
            </template>
          </el-table-column>

          <el-table-column prop="title" :label="$t('course.resource.category.title')">
          </el-table-column>

          <el-table-column prop="sort" :label="$t('common.sort')">
          </el-table-column>

          <el-table-column prop="create_time" :label="$t('common.create_time')">
          </el-table-column>

          <el-table-column :label="$t('common.handle')" fixed="right" width="320">
            <template slot-scope="scope">
              <el-button v-if="isAuth('module:education:course:resource:category:form')" type="primary" icon="el-icon-edit" @click="$router.push({name: 'module_education_course_resource_category_form', query: {id : scope.row.id, course_id: dataForm.course_id}})">
                {{ $t('common.update') }}
              </el-button>

              <el-button v-if="isAuth('module:education:course:resource:list')" icon="el-icon-price-tag" @click="$router.push({name: 'module_education_course_resource_list', query: {course_id: dataForm.course_id, category_id: scope.row.id}})">
                {{ $t('course.course_resource') }}
              </el-button>

              <el-button v-if="isAuth('module:education:course:resource:category:delete')" type="danger" icon="el-icon-delete" @click="deleteHandle(scope.row.id)">
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
        model: 'education/course/resource/category',
        dataForm: [
          'course_id',
          'title'
        ]
      };
    },
    methods:
    {
      init ()
      {
	      let query = this.$route.query
        this.dataForm.course_id = query.course_id
      }
    },
    created() {
      this.init()
      this.getDataList()
    }
  };
</script>
