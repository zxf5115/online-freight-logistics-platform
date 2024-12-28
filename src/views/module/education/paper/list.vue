<template>
  <div class="xiecheng">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            <el-button v-if="isAuth('module:education:paper:form')" type="success" icon="el-icon-plus" @click="$router.push({name: 'module_education_paper_form'})">
              {{ $t('common.create') }}
            </el-button>
          </div>
        </div>
        <div class="admin_main_block_right">
          <div>
            <el-button v-if="isAuth('module:education:paper:delete')" type="danger" icon="el-icon-delete" @click="deleteHandle()">
              {{ $t('common.batch_delete') }}
            </el-button>
          </div>
        </div>
      </div>

      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            <el-input v-model="dataForm.title" :placeholder="$t('common.please_input') + $t('paper.title')" clearable>
            </el-input>
          </div>
          <div>
            <el-select v-model="dataForm.course_id" :placeholder="$t('common.please_select') + $t('course.title')" clearable>
              <el-option :label="$t('common.all')" value=""></el-option>
              <el-option v-for="(v,k) in courseList" :label="v.title" :key="k" :value="v.id">
              </el-option>
            </el-select>
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

          <el-table-column prop="id" :label="$t('common.id')"  width="70px">
          </el-table-column>

          <el-table-column :label="$t('course.title')" width="200">
            <template slot-scope="scope" v-if="scope.row.course">
              {{ scope.row.course.title }}
            </template>
          </el-table-column>

          <el-table-column prop="title" :label="$t('paper.title')">
          </el-table-column>

          <el-table-column prop="description" :label="$t('paper.description')">
          </el-table-column>

          <el-table-column prop="test_time" :label="$t('paper.test_time')">
          </el-table-column>

          <el-table-column prop="sort" :label="$t('common.sort')">
          </el-table-column>

          <el-table-column prop="create_time" :label="$t('common.create_time')">
          </el-table-column>

          <el-table-column :label="$t('common.handle')" fixed="right" width="400">
            <template slot-scope="scope">
              <el-button v-if="isAuth('module:education:paper:statistical')" type="info" icon="el-icon-view" @click="$router.push({name: 'module_education_paper_statistical', query: {id : scope.row.id}})">
                {{ $t('paper.statistical') }}
              </el-button>

              <el-button v-if="isAuth('module:education:paper:form')" type="primary" icon="el-icon-edit" @click="$router.push({name: 'module_education_paper_form', query: {id : scope.row.id}})">
                {{ $t('common.update') }}
              </el-button>

              <el-button v-if="isAuth('module:education:paper:question:list')" icon="el-icon-copy-document" @click="$router.push({name: 'module_education_paper_question_list', query: {paper_id : scope.row.id}})">
                {{ $t('paper.paper_question') }}
              </el-button>

              <el-button v-if="isAuth('module:education:paper:delete')" type="danger" icon="el-icon-delete" @click="deleteHandle(scope.row.id)">
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
        model: 'education/paper',
        courseList: [],
        dataForm: [
          'course_id',
          'title'
        ]
      };
    },
    created() {
      this.getDataList()
    },
    methods: {
      loadCourseList () {
        this.$http({
          url: this.$http.adornUrl('/education/course/select'),
          method: 'get'
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.courseList = data.data
          } else {
            this.$message.error(this.$t(data.message))
          }
        })
      }
    },
    mounted () {
      this.loadCourseList();
    },
  };
</script>
