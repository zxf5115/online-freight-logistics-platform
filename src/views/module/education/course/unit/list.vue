<template>
  <div class="xiecheng">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            <el-button v-if="isAuth('module:education:course:unit:form')" type="success" icon="el-icon-plus" @click="$router.push({name: 'module_education_course_unit_form', query: {course_id: dataForm.course_id}})">
              {{ $t('common.create') }}
            </el-button>
          </div>
        </div>
        <div class="admin_main_block_right">
          <div>
            <el-button v-if="isAuth('module:education:course:unit:delete')" type="danger" icon="el-icon-delete" @click="deleteHandle()">
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
            <el-input v-model="dataForm.title" :placeholder="$t('common.please_input') + $t('course.unit.title')" clearable>
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
        <el-table :data="dataList" row-key="id" v-loading="dataListLoading" lazy :load="load" :tree-props="{children: 'children', hasChildren: 'hasChildren'}">

          <el-table-column :label="$t('common.spread_pack')"  width="120">
          </el-table-column>

          <el-table-column prop="title" :label="$t('course.unit.title')">
          </el-table-column>

          <el-table-column :label="$t('course.title')">
            <template slot-scope="scope" v-if="scope.row.course">
              {{ scope.row.course.title }}
            </template>
          </el-table-column>

          <el-table-column prop="sort" :label="$t('common.sort')">
          </el-table-column>

          <el-table-column prop="create_time" :label="$t('common.create_time')">
          </el-table-column>

          <el-table-column :label="$t('common.handle')" fixed="right" width="480">
            <template slot-scope="scope">
              <el-button v-if="isAuth('module:education:course:unit:form')" type="primary" icon="el-icon-edit" @click="$router.push({name: 'module_education_course_unit_form', query: {id : scope.row.id, course_id: dataForm.course_id}})">
                {{ $t('common.update') }}
              </el-button>

              <el-button v-if="isAuth('module:education:course:point:list')" type="info" icon="el-icon-search" @click="$router.push({name: 'module_education_course_point_list', query: {unit_id: scope.row.id, course_id: dataForm.course_id}})">
                {{ $t('course.point.view') }}
              </el-button>

              <el-button v-if="isAuth('module:education:course:point:form')" type="success" icon="el-icon-plus" @click="$router.push({name: 'module_education_course_point_form', query: {unit_id: scope.row.id, course_id: dataForm.course_id}})" >
                {{ $t('course.point.create') }}
              </el-button>

              <el-button v-if="isAuth('module:education:course:unit:delete')" type="danger" icon="el-icon-delete" @click="deleteHandle(scope.row.id)">
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
        model: 'education/course/unit',
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
      },
      load(tree, treeNode, resolve) {console.log(tree);
        this.$http({
          url: this.$http.adornUrl('/education/course/unit/select'),
          method: 'get',
          params: this.$http.adornParams({
            'course_id': tree.course_id,
            'parent_id': tree.id,
          })
        }).then(({data}) => {
          if (data && data.status === 200) {
            let response = data.data
            resolve(response)
          } else {
            this.$message.error(this.$t(data.message))
          }
        })
      }
    },
    created() {
      this.init()
      this.getDataList()
    }
  };
</script>
