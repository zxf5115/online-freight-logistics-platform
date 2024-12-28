<template>
  <div class="xiecheng">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>{{ $t('squad.view') }}</div>
        </div>

        <div class="admin_main_block_right">
          <div>
            <el-button v-if="isAuth('module:organization:squad:export')" type="success" icon="el-icon-download" @click="exportHandle()">
              {{ $t('common.export') }}
            </el-button>
          </div>
          <div class="mr10">
            <el-button icon="el-icon-back" @click="$router.go(-1)">
              {{ $t('common.return') }}
            </el-button>
          </div>
        </div>
      </div>

      <div class="admin_form_main">
        <el-card class="box-card" shadow="never">
          <div slot="header" class="clearfix">
            <span>{{ $t('squad.organization_info') }}</span>
          </div>
          <div class="text item">
            <el-form ref="form" :model="dataForm" label-width="100" label-position="right" >
              <el-row>
                <el-col :span="6">
                  <el-image v-if="dataForm.organization" :src="dataForm.organization.business_license" :lazy="true" width="380">
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                </el-col>
                <el-col :span="17" :offset="1">
                  <el-form-item v-if="dataForm.organization" :label="$t('organization.title')" label-width="80">
                    {{ dataForm.organization.title }}
                  </el-form-item>

                  <el-form-item v-if="dataForm.organization" :label="$t('organization.home_address')" label-width="100">
                    {{ dataForm.organization.home_address }}
                  </el-form-item>

                  <el-form-item v-if="dataForm.organization" :label="$t('organization.head')" label-width="100">
                    {{ dataForm.organization.head }}
                  </el-form-item>

                  <el-form-item v-if="dataForm.organization" :label="$t('organization.head_mobile')" label-width="100">
                    {{ dataForm.organization.head_mobile }}
                  </el-form-item>

                  <el-form-item v-if="dataForm.organization" :label="$t('organization.contact')" label-width="100">
                    {{ dataForm.organization.contact }}
                  </el-form-item>

                  <el-form-item v-if="dataForm.organization" :label="$t('organization.contact_mobile')" label-width="100">
                    {{ dataForm.organization.contact_mobile }}
                  </el-form-item>

                  <el-form-item v-if="dataForm.organization" :label="$t('organization.email')" label-width="100">
                    {{ dataForm.organization.email }}
                  </el-form-item>

                  <el-form-item v-if="dataForm.organization" :label="$t('organization.weixin')" label-width="100">
                    {{ dataForm.organization.weixin }}
                  </el-form-item>

                  <el-form-item v-if="dataForm.organization" :label="$t('organization.qq')" label-width="100">
                    {{ dataForm.organization.qq }}
                  </el-form-item>

                  <el-form-item v-if="dataForm.organization" :label="$t('organization.address')" label-width="100">
                    {{ dataForm.organization.address }}
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-card>
        <el-card class="box-card mt10" shadow="never">
          <div slot="header" class="clearfix">
            <span>{{ $t('squad.squad_info') }}</span>
          </div>
          <div class="text item">
            <el-form ref="form" :model="dataForm" label-width="80">
              <el-row>
                <el-col :span="4">
                  <el-form-item prop="title" label-width="0">
                    {{ dataForm.title }}
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item prop="squad_no" :label="$t('squad.squad_no')" label-width="80">
                    {{ dataForm.squad_no }}
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item :label="$t('squad.teacher_name')" label-width="80">
                    {{ dataForm.teacher_name }}
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :label="$t('common.start_stop_time')" label-width="80">
                    {{ dataForm.start_time }} {{ $t('common.to') }} {{ dataForm.end_time }}
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item :label="$t('squad.number')" label-width="80">
                    {{ dataForm.number }}
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item class="vertical" :label="$t('squad.description')" label-width="100">
                    {{ dataForm.description }}
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item class="vertical" :label="$t('squad.course_list')" label-width="100">
                    <span class="mr20" v-if="dataForm.course" v-for="item in dataForm.course">
                      {{ item.title }}
                    </span>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-card>

        <el-card class="box-card mt10" shadow="never">
          <div slot="header" class="clearfix">
            <span>{{ $t('squad.name_list') }}</span>
          </div>
          <div class="text item">
            <el-table :data="dataForm.roster" v-loading="dataListLoading" height="500">

              <el-table-column prop="member_no" :label="$t('member.member_no')" width="120">
              </el-table-column>

              <el-table-column prop="realname" :label="$t('member.archive.realname')">
              </el-table-column>

              <el-table-column prop="start_time" :label="$t('member.archive.start_time')" width="150">
              </el-table-column>

              <el-table-column prop="end_time" :label="$t('member.archive.end_time')" width="150">
              </el-table-column>

              <el-table-column prop="course_time" :label="$t('member.archive.course_study_time')" width="150">
                <template slot-scope="scope">
                  {{ scope.row.course_time | timeLength }}
                </template>
              </el-table-column>

              <el-table-column prop="cumulative_study_time" :label="$t('member.archive.cumulative_study_time')" width="150">
                <template slot-scope="scope">
                  {{ scope.row.cumulative_study_time | timeLength }}
                </template>
              </el-table-column>

              <el-table-column :label="$t('member.archive.already_study_time')" width="150">
                <template slot-scope="scope">
                  {{ scope.row.already_study_time | timeLength }}
                </template>
              </el-table-column>

              <el-table-column :label="$t('member.archive.wait_study_time')" width="150">
                <template slot-scope="scope">
                  {{ scope.row.wait_study_time | timeLength }}
                </template>
              </el-table-column>

              <el-table-column prop="question_total" :label="$t('member.archive.question_total')"  width="150">
              </el-table-column>

              <el-table-column prop="question_accuracy" :label="$t('member.archive.question_correct')" width="100">
              </el-table-column>

              <el-table-column prop="reality_practice_total" :label="$t('member.archive.reality_practice_total')" width="150">
              </el-table-column>

              <el-table-column prop="reality_practice_correct" :label="$t('member.archive.reality_practice_correct')" width="150">
              </el-table-column>

              <el-table-column prop="theory_practice_total" :label="$t('member.archive.theory_practice_total')" width="150">
              </el-table-column>

              <el-table-column prop="theory_practice_correct" :label="$t('member.archive.theory_practice_correct')" width="150">
              </el-table-column>

              <el-table-column prop="simulation_exam_total" :label="$t('member.archive.simulation_exam_total')" width="150">
              </el-table-column>

              <el-table-column prop="simulation_exam_high" :label="$t('member.archive.simulation_exam_high')" width="150">
              </el-table-column>

              <el-table-column prop="simulation_exam_low" :label="$t('member.archive.simulation_exam_low')" width="150">
              </el-table-column>

              <el-table-column prop="simulation_exam_average" :label="$t('member.archive.simulation_exam_average')" width="150">
              </el-table-column>

              <el-table-column :label="$t('common.handle')" fixed="right" width="100">
                <template slot-scope="scope">
                  <el-button v-if="isAuth('module:member:view') && dataForm.audit_status.value == 1" type="info" icon="el-icon-view" @click="$router.push({name: 'module_member_view', query: {id: scope.row.id}})">
                    {{ $t('common.view') }}
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>


      </div>
    </div>
  </div>
</template>

<script>
  import common from '@/views/common/base'
  import { timeLength, datetime } from '@/utils/format'
  export default
  {
    extends: common,
    data()
    {
      return {
        model: 'organization/squad',
        dataForm:
        {
          id: 0
        },
        dataRule: {}
      };
    },
    filters: {
      timeLength: timeLength,
      datetime: datetime,
    },
    methods:
    {
      init ()
      {
        let query = this.$route.query
        let id = query.id

        this.dataForm.id = id || 0
        this.$nextTick(() => {
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/organization/squad/view/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.dataForm   = data.data
                this.dataForm.squad_no   = data.data.squad_no
              }
            })
          }
        })
      },
      exportHandle() {
        this.$http({
          url: this.$http.adornUrl(`/organization/squad/export`),
          method: 'post',
          data: this.$http.adornData({
            'id': this.dataForm.id
          })
        }).then(({data}) => {
          if (data && data.status === 200) {
            window.open(data.data)
          } else {
            this.$message.error(this.$t(data.message))
          }
        })
      }
    },
    created(request)
    {
      this.init();
    }
  };
</script>


<style lang="scss" scoped>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .vertical >>> .el-form-item__label {
    float: none;
  }
  .el-image {
    width: 380px;
    height: 380px;
  }
  .image >>> .el-image__error, .el-image__inner, .el-image__placeholder {
    width: 380px;
  }
</style>
