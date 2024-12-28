<template>
  <el-form label-width="100px" ref="dataForm" :model="dataForm" :rules="dataRule">
    <div class="admin_table_main">
      <el-table :data="dataList" v-loading="dataListLoading">
        <el-table-column prop="id" :label="$t('common.id')" width="70">
        </el-table-column>

        <el-table-column :label="$t('course.point.emphasis.info')">
          <template slot-scope="scope">
            <dl class="table_dl">
              <dd class="table_dl_dd_all_30">
                {{ $t('course.point.emphasis.title') }}：
                {{ scope.row.title }}
              </dd>
              <dd class="table_dl_dd_all_30">
                {{ $t('course.point.emphasis.content') }}：
                {{ scope.row.content }}
              </dd>
            </dl>
          </template>
        </el-table-column>

      </el-table>
    </div>
  </el-form>
</template>

<script>
  import common from '@/views/common/base'
  export default {
    extends: common,
    data() {
      return {
        model: 'education/course/point/emphasis',
        dataForm:
        {
          id: 0
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
              url: this.$http.adornUrl(`/education/course/point/emphasis/list/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.dataList = data.data
              }
            })
          }
        })
      }
    },
    created() {
      this.init();
    }
  };
</script>
