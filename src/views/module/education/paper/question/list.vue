<template>
  <div class="xiecheng">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            <el-button v-if="isAuth('module:education:paper:question:form')" type="success" icon="el-icon-plus" @click="$router.push({name: 'module_education_paper_question_form', query: {paper_id: dataForm.paper_id}})">
              {{ $t('common.create') }}
            </el-button>
          </div>
        </div>
        <div class="admin_main_block_right">
          <div>
            <el-button v-if="isAuth('module:education:paper:question:delete')" type="danger" icon="el-icon-delete" @click="deleteHandle()">
              {{ $t('common.batch_delete') }}
            </el-button>
          </div>
        </div>
      </div>

      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            <el-input v-model="dataForm.title" :placeholder="$t('common.please_input') + $t('paper.question.title')" clearable>
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
        <el-table :data="dataList" v-loading="dataListLoading" @selection-change="selectionChangeHandle">
          <el-table-column type="selection" header-align="center" align="center">
          </el-table-column>

          <el-table-column prop="id" :label="$t('common.id')" width="70">
          </el-table-column>

          <el-table-column :label="$t('paper.question.type')" width="100">
            <template slot-scope="scope">
              {{ scope.row.type.text }}
            </template>
          </el-table-column>

          <el-table-column :label="$t('paper.question.info')">
            <template slot-scope="scope">
              <dl class="table_dl">
                <dd class="table_dl_dd_all_30">
                  {{ $t('paper.question.title') }}： {{ scope.row.title }}
                </dd>
                <dd class="table_dl_dd_all_16_gray">
                  {{ $t('paper.question.create_time') }}： {{ scope.row.create_time }}
                </dd>
              </dl>
            </template>
          </el-table-column>

          <el-table-column prop="sort" :label="$t('common.sort')" width="100">
          </el-table-column>

          <el-table-column :label="$t('common.handle')" fixed="right" width="200">
            <template slot-scope="scope">
              <el-button v-if="isAuth('module:education:paper:question:form')" type="primary" icon="el-icon-edit" @click="$router.push({name: 'module_education_paper_question_form', query: {id : scope.row.id, type: scope.row.type.value, paper_id: dataForm.paper_id}})">
                {{ $t('common.update') }}
              </el-button>

              <el-button v-if="isAuth('module:education:paper:question:delete')" type="danger" icon="el-icon-delete" @click="deleteHandle(scope.row.id)">
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
        model: 'education/paper/question',
        dataForm: [
          'title',
          'paper_id'
        ]
      };
    },
    methods:
    {
      init ()
      {
        let query = this.$route.query
        this.dataForm.paper_id = query.paper_id
      },
    },
    created() {
      this.init()
      this.getDataList()
    }
  };
</script>
