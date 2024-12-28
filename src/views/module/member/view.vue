<template>
  <div class="xiecheng">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>{{ $t('member.archive_info') }}</div>
        </div>

        <div class="admin_main_block_right">
          <div>
            <el-button v-if="isAuth('module:member:export')" type="success" icon="el-icon-download" @click="exportHandle">
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
            <span>{{ $t('common.basic_info') }}</span>
          </div>
          <div class="text item">
            <el-form ref="form" :model="dataForm" label-width="80">
              <el-row>
                <el-col :span="6">
                  <el-form-item :label="$t('member.archive.realname')" label-width="80">
                    <span v-if="dataForm.archive">
                      {{ dataForm.archive.realname }}
                    </span>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :label="$t('member.username')" label-width="80">
                    {{ dataForm.username }}
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :label="$t('member.member_no')" label-width="80">
                    {{ dataForm.member_no }}
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :label="$t('member.archive.sex')" label-width="80">
                    <span v-if="dataForm.archive">
                      {{ dataForm.archive.sex.text }}
                    </span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item class="vertical" :label="$t('member.archive.id_card_no')" label-width="100">
                    <span v-if="dataForm.archive">
                      {{ dataForm.archive.id_card_no }}
                    </span>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- <el-row>
                <el-col :span="24">
                  <el-form-item class="vertical"label-width="0">
                    <span class="mr20" v-if="dataForm.archive">
                      <el-image :src="dataForm.archive.id_card_1" :lazy="true" width="380">
                        <div slot="error" class="image-slot">
                          <i class="el-icon-picture-outline"></i>
                        </div>
                      </el-image>
                    </span>
                    <span class="mr20" v-if="dataForm.archive">
                      <el-image :src="dataForm.archive.id_card_2" :lazy="true" width="380">
                        <div slot="error" class="image-slot">
                          <i class="el-icon-picture-outline"></i>
                        </div>
                      </el-image>
                    </span>
                  </el-form-item>
                </el-col>
              </el-row> -->
              <el-row>
                <el-col :span="6">
                  <el-form-item :label="$t('member.mobile')" label-width="80">
                    {{ dataForm.mobile }}
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :label="$t('member.email')" label-width="80">
                    {{ dataForm.email }}
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :label="$t('member.archive.weixin')" label-width="80">
                    <span v-if="dataForm.archive">
                      {{ dataForm.archive.weixin }}
                    </span>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :label="$t('member.archive.area')" label-width="80">
                    <span v-if="dataForm.archive">
                      {{ dataForm.archive.province_id.text }} {{ dataForm.archive.city_id.text }} {{ dataForm.archive.region_id.text }}
                    </span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item :label="$t('organization.title')" label-width="100">
                    <span v-if="dataForm.organization && dataForm.organization">
                      {{ dataForm.organization.title }}
                    </span>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-card>

        <el-card class="box-card mt10" shadow="never">
          <div slot="header" class="clearfix">
            <span>{{ $t('squad.list') }}</span>
          </div>
          <div class="text item">
            <el-table border :data="dataForm.squad" v-loading="dataListLoading">
              <el-table-column prop="squad_no" :label="$t('squad.squad_no')" width="140">
              </el-table-column>

              <el-table-column prop="title" :label="$t('squad.title')">
              </el-table-column>
            </el-table>
          </div>
        </el-card>

        <el-card class="box-card mt10" shadow="never">
          <div slot="header" class="clearfix">
            <span>{{ $t('member.comment.list') }}</span>
          </div>
          <div class="text item">
            <el-table border :data="dataForm.comment" v-loading="dataListLoading">
              <el-table-column prop="id" :label="$t('common.id')" width="70">
              </el-table-column>

              <el-table-column prop="content" :label="$t('member.comment.content')">
              </el-table-column>

              <el-table-column prop="score" :label="$t('member.comment.score')" width="80">
              </el-table-column>

              <el-table-column prop="score" :label="$t('member.comment.appraiser')" width="120">
                <template slot-scope="scope" v-if="scope.row.appraiser">
                  {{ scope.row.appraiser.nickname }}
                </template>
              </el-table-column>

              <el-table-column prop="create_time" :label="$t('common.create_time')" width="140">
              </el-table-column>
            </el-table>
          </div>
        </el-card>

        <el-card class="box-card mt10" shadow="never">
          <div slot="header" class="clearfix">
            <span>{{ $t('organization.course_info') }}</span>
          </div>
          <div class="text item">
            <el-table :data="dataForm.course" v-loading="dataListLoading" height="300">

              <el-table-column prop="title" :label="$t('course.title')" width="200">
              </el-table-column>

              <el-table-column prop="type" :label="$t('member.archive.study_type')" width="150">
                <template slot-scope="scope" v-if="scope.row.pivot">
                  {{ scope.row.pivot.type | studyDeviceType }}
                </template>
              </el-table-column>

              <el-table-column prop="start_time" :label="$t('member.archive.start_time')" width="150">
                <template slot-scope="scope" v-if="scope.row.pivot">
                  {{ scope.row.pivot.start_time | datetime }}
                </template>
              </el-table-column>

              <el-table-column prop="end_time" :label="$t('member.archive.end_time')" width="150">
                <template slot-scope="scope" v-if="scope.row.pivot">
                  {{ scope.row.pivot.end_time | datetime }}
                </template>
              </el-table-column>

              <el-table-column prop="time_length" :label="$t('member.archive.course_study_time')" width="150">
                <template slot-scope="scope" v-if="scope.row.pivot">
                  {{ scope.row.time_length | timeLength }}
                </template>
              </el-table-column>

              <el-table-column :label="$t('member.archive.cumulative_study_time')" width="150">
                <template slot-scope="scope" v-if="scope.row.pivot">
                  {{ scope.row.pivot.cumulative_study_time | timeLength }}
                </template>
              </el-table-column>

              <el-table-column :label="$t('member.archive.already_study_time')" width="150">
                <template slot-scope="scope" v-if="scope.row.pivot">
                  {{ scope.row.pivot.already_study_time | timeLength }}
                </template>
              </el-table-column>

              <el-table-column :label="$t('member.archive.wait_study_time')" width="150">
                <template slot-scope="scope" v-if="scope.row.pivot">
                  {{ scope.row.pivot.wait_study_time | timeLength }}
                </template>
              </el-table-column>

              <el-table-column :label="$t('member.archive.mobile_study_time')" width="150">
                <template slot-scope="scope" v-if="scope.row.pivot">
                  {{ scope.row.pivot.mobile_study_time | timeLength }}
                </template>
              </el-table-column>

              <el-table-column :label="$t('member.archive.pc_study_time')" width="150">
                <template slot-scope="scope" v-if="scope.row.pivot">
                  {{ scope.row.pivot.pc_study_time | timeLength }}
                </template>
              </el-table-column>

              <el-table-column :label="$t('member.archive.already_study_total')" width="150">
                <template slot-scope="scope" v-if="scope.row.pivot">
                  {{ scope.row.pivot.already_study_total }}
                </template>
              </el-table-column>

              <el-table-column :label="$t('member.archive.wait_study_total')" width="150">
                <template slot-scope="scope" v-if="scope.row.pivot">
                  {{ scope.row.pivot.wait_study_total }}
                </template>
              </el-table-column>

              <el-table-column prop="question_total" :label="$t('member.archive.question_total')"  width="150">
                <template slot-scope="scope" v-if="scope.row.pivot">
                  {{ scope.row.pivot.question_total }}
                </template>
              </el-table-column>

              <el-table-column :label="$t('member.archive.question_correct')" width="150">
                <template slot-scope="scope" v-if="scope.row.pivot">
                  {{ scope.row.pivot.question_correct }}
                </template>
              </el-table-column>

              <el-table-column :label="$t('member.archive.test_total')" width="150">
                <template slot-scope="scope" v-if="scope.row.pivot">
                  {{ scope.row.pivot.test_total }}
                </template>
              </el-table-column>

              <el-table-column :label="$t('member.archive.test_high')" width="150">
                <template slot-scope="scope" v-if="scope.row.pivot">
                  {{ scope.row.pivot.test_high }}
                </template>
              </el-table-column>

              <el-table-column :label="$t('member.archive.test_low')" width="150">
                <template slot-scope="scope" v-if="scope.row.pivot">
                  {{ scope.row.pivot.test_low }}
                </template>
              </el-table-column>

              <el-table-column :label="$t('member.archive.test_average')" width="150">
                <template slot-scope="scope" v-if="scope.row.pivot">
                  {{ scope.row.pivot.test_average }}
                </template>
              </el-table-column>

              <el-table-column :label="$t('member.archive.test_result')" width="150">
                <template slot-scope="scope" v-if="scope.row.pivot">
                  {{ scope.row.pivot.test_average | simulationExamResult }}
                </template>
              </el-table-column>

              <el-table-column :label="$t('member.archive.reality_practice_total')" width="150">
                <template slot-scope="scope" v-if="scope.row.pivot">
                  {{ scope.row.pivot.reality_practice_total }}
                </template>
              </el-table-column>

              <el-table-column :label="$t('member.archive.reality_practice_correct')" width="150">
                <template slot-scope="scope" v-if="scope.row.pivot">
                  {{ scope.row.pivot.reality_practice_correct }}
                </template>
              </el-table-column>

              <el-table-column :label="$t('member.archive.theory_practice_total')" width="150">
                <template slot-scope="scope" v-if="scope.row.pivot">
                  {{ scope.row.pivot.theory_practice_total }}
                </template>
              </el-table-column>

              <el-table-column :label="$t('member.archive.theory_practice_correct')" width="150">
                <template slot-scope="scope" v-if="scope.row.pivot">
                  {{ scope.row.pivot.theory_practice_correct }}
                </template>
              </el-table-column>

              <el-table-column :label="$t('member.archive.simulation_exam_total')" width="150">
                <template slot-scope="scope" v-if="scope.row.pivot">
                  {{ scope.row.pivot.simulation_exam_total }}
                </template>
              </el-table-column>

              <el-table-column :label="$t('member.archive.simulation_exam_high')" width="150">
                <template slot-scope="scope" v-if="scope.row.pivot">
                  {{ scope.row.pivot.simulation_exam_high }}
                </template>
              </el-table-column>

              <el-table-column :label="$t('member.archive.simulation_exam_low')" width="150">
                <template slot-scope="scope" v-if="scope.row.pivot">
                  {{ scope.row.pivot.simulation_exam_low }}
                </template>
              </el-table-column>

              <el-table-column :label="$t('member.archive.simulation_exam_average')" width="150">
                <template slot-scope="scope" v-if="scope.row.pivot">
                  {{ scope.row.pivot.simulation_exam_average }}
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
  import { studyDeviceType, simulationExamResult, timeLength, datetime } from '@/utils/format'
  export default
  {
    extends: common,
    data()
    {
      return {
        model: 'member',
        dataForm:
        {
          id: 0
        },
        dataRule: {}
      };
    },
    filters: {
      studyDeviceType: studyDeviceType,
      simulationExamResult: simulationExamResult,
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
              url: this.$http.adornUrl(`/member/view/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.dataForm   = data.data
              }
            })
          }
        })
      },
      exportHandle() {
        this.$http({
          url: this.$http.adornUrl(`/member/export`),
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
</style>
