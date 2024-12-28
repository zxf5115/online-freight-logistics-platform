<template>
  <div class="xiecheng">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            <el-button v-if="isAuth('module:education:course:point:question:form')" type="success" icon="el-icon-plus" @click="$router.push({name: 'module_education_course_point_question_form'})">
              {{ $t('common.create') }}
            </el-button>
          </div>
        </div>
        <div class="admin_main_block_right">
          <div>
            <el-button v-if="isAuth('module:education:course:point:question:delete')" type="danger" icon="el-icon-delete" @click="deleteHandle()">
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
            <el-input v-model="dataForm.title" :placeholder="$t('common.please_input') + $t('course.point.question.title')" clearable>
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
            <el-select v-model="dataForm.type" :placeholder="$t('common.please_select') + $t('course.point.question.type')" clearable>
              <el-option :label="$t('common.all')" value=""></el-option>
              <el-option v-for="(v,k) in typeList" :label="v.title" :key="k" :value="v.id">
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

          <el-table-column prop="id" :label="$t('common.id')" width="70">
          </el-table-column>

          <el-table-column :label="$t('course.point.question.type')" width="100">
            <template slot-scope="scope">
              {{ scope.row.type.text }}
            </template>
          </el-table-column>

          <el-table-column :label="$t('course.title')">
            <template slot-scope="scope" v-if="scope.row.course">
              {{ scope.row.course.title }}
            </template>
          </el-table-column>

          <el-table-column :label="$t('course.point.question.info')">
            <template slot-scope="scope">
              <dl class="table_dl">
                <dd class="table_dl_dd_all_30">
                  {{ $t('course.point.question.title') }}： {{ scope.row.title }}
                </dd>
                <dd class="table_dl_dd_all_16_gray">
                  {{ $t('course.point.question.create_time') }}： {{ scope.row.create_time }}
                </dd>
              </dl>
            </template>
          </el-table-column>

          <el-table-column prop="sort" :label="$t('common.sort')" width="100">
          </el-table-column>

          <el-table-column :label="$t('common.handle')" fixed="right" width="200">
            <template slot-scope="scope">
              <el-button v-if="isAuth('module:education:course:point:question:form')" type="primary" icon="el-icon-edit" @click="$router.push({name: 'module_education_course_point_question_form', query: {id : scope.row.id, type: scope.row.type.value}})">
                {{ $t('common.update') }}
              </el-button>

              <el-button v-if="isAuth('module:education:course:point:question:delete')" type="danger" icon="el-icon-delete" @click="deleteHandle(scope.row.id)">
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
        model: 'education/course/point/question',
        courseList: [],
        typeList: [
          {'id': 1, 'title': '选择题'},
          {'id': 2, 'title': '判断题'},
          {'id': 3, 'title': '计算题'},
          {'id': 4, 'title': '连线题'},
          {'id': 5, 'title': '多选题'},
          {'id': 6, 'title': '填空题'},
          {'id': 7, 'title': '名词解析题'},
          {'id': 8, 'title': '特殊题'},
        ],
        dataForm: [
          'title',
          'course_id',
          'type',
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
