<template>
  <el-form label-width="100px" ref="dataForm" :model="dataForm" :rules="dataRule">
    <div class="admin_main_block_top">
      <div class="admin_main_block_left">
        <div>
          <el-input v-model="dataForm.title" :placeholder="$t('common.please_input') + $t('course.resource.title')" clearable>
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
      <el-table :data="dataList" v-loading="dataListLoading">
        <el-table-column prop="id" :label="$t('common.id')" width="70">
        </el-table-column>

        <el-table-column prop="title" :label="$t('course.resource.title')">
        </el-table-column>

        <el-table-column :label="$t('common.select')" fixed="right" width="120">
          <template slot-scope="scope">
            <el-button v-if="isAuth('module:education:course:resource:handle')" :type="isExistData(scope.row.id) ? 'danger' : 'success'" icon="el-icon-thumb" @click="dataFormSubmit(scope.row.id)">
              <span v-if="isExistData(scope.row.id)">
                {{ $t('common.cancel') }}
              </span>
              <span v-else>
                {{ $t('common.select') }}
              </span>
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
  </el-form>
</template>

<script>
  import common from '@/views/common/base'
  export default {
    extends: common,
    data() {
      return {
        model: 'education/course/resource',
        resourceList: [],
        dataForm:
        {
          id: 0,
          title: '',
        },
        dataRule: {}
      };
    },
    props: {
      id: Number,
      required: true
    },
    methods: {
      init ()
      {
        this.dataForm.id = this.id || 0
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/education/course/relevance/resource/list/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.resourceList = data.data
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit (resource_id) {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/education/course/relevance/resource/handle`),
              method: 'post',
              data: this.$http.adornData({
                'course_id': this.dataForm.id,
                'resource_id': resource_id,
              })
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.$message.success(this.$t('common.handle_success'));
                this.refresh();
              } else {
                this.$message.error(this.$t(data.message))
              }
            })
          }
        })
      },
      isExistData: function(id) {
        let response = false

        this.resourceList.forEach(course_id=>{
          if(course_id == id)
          {
            response = true
          }
        });

        return response
      }
    },
    created() {
      this.getDataList();

      this.init();
    }
  };
</script>
