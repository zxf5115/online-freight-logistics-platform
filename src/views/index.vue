<template>
  <div class="xiecheng">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>基础数据</span>
      </div>
      <div class="text item text-center">
        <el-row :gutter="20">
          <el-col :span="6" class="default_block_col">
            <el-card shadow="never">
              <div class="default_day_sale">
                <div>用户总数</div>
                <div class="blue mt10">
                  <b>{{ statistical.member_total || 0 }}</b>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6" class="default_block_col">
            <el-card shadow="never">
              <div class="default_day_sale">
                <div>课程总数</div>
                <div class="blue mt10">
                  <b>{{ statistical.course_total || 0 }}</b>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6" class="default_block_col">
            <el-card shadow="never">
              <div class="default_day_sale">
                <div>知识点总数</div>
                <div class="blue mt10">
                  <b>{{ statistical.point_total || 0 }}</b>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6" class="default_block_col">
            <el-card shadow="never">
              <div class="default_day_sale">
                <div>课时总时长</div>
                <div class="blue mt10">
                  <b>{{ statistical.time_length_total || 0 }}</b>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </el-card>

    <el-row :gutter="20" class="mt10">
      <el-col :span="24" class="default_block_col">
        <el-card shadow="hover" class="m-l-10-p-20">
          用户统计
          <div class="unline"></div>
          <div class="default_total">
            <ve-histogram :data="userData"></ve-histogram>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12" class="default_block_col">
        <el-card shadow="hover" class="m-l-10-p-20">
          课程统计
          <div class="unline"></div>
          <div class="default_total">
            <ve-pie :data="courseData"></ve-pie>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12" class="default_block_col">
        <el-card shadow="hover" class="m-l-10-p-20">
          学习设备统计
          <div class="unline"></div>
          <div class="default_total">
            <ve-ring :data="equipmentData"></ve-ring>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12" class="default_block_col">
        <el-card shadow="hover" class="m-l-10-p-20">
          试题统计
          <div class="unline"></div>
          <div class="default_total">
            <ve-funnel :data="questionData" :settings="questionSettings"></ve-funnel>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12" class="default_block_col">
        <el-card shadow="hover" class="m-l-10-p-20">
          热门关键字
          <div class="unline"></div>
          <div class="default_total">
            <ve-ring :data="keywordData" :settings="keywordSettings"></ve-ring>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="24" class="default_block_col">
        <el-card shadow="hover" class="m-l-10-p-20">
          学习时长统计
          <div class="unline"></div>
          <!-- 图表 -->
          <ve-line :data="studyData" :settings="studySettings"></ve-line>
        </el-card>
      </el-col>
    </el-row>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>课程数据</span>
      </div>
      <div class="text item text-center">
        <el-row :gutter="20">
          <el-col :span="6" class="default_block_col" v-for="(v,k) in courseList" :key="k">
            <el-card shadow="never">
              <div class="default_day_sale">
                <div>{{ v.title }}</div>
                <div class="blue mt10 fs14">
                  学习人数： <b>{{ v.member_total }}</b>
                </div>
                <div class="blue mt10 fs14">
                  知识点数量： <b>{{ v.point_total }}</b>
                </div>
                <div class="blue mt10 fs14">
                  图文数量： <b>{{ v.question_total }}</b>
                </div>
                <div class="blue mt10 fs14">
                  视频数量： <b>{{ v.video_total }}</b>
                </div>
                <div class="blue mt10 fs14">
                  总题数数量： <b>{{ v.question_total }}</b>
                </div>
                <div class="blue mt10 fs14">
                  交互题数量： <b>{{ v.video_total }}</b>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
  import VeHistogram from 'v-charts/lib/histogram.common'
  import VePie from 'v-charts/lib/pie.common'
  import VeBar from 'v-charts/lib/bar.common'
  import VeRing from 'v-charts/lib/ring.common'
  import VeLine from 'v-charts/lib/line.common'
  import VeFunnel from 'v-charts/lib/funnel.common'
  export default {
    components: {
      VeHistogram,
      VePie,
      VeBar,
      VeRing,
      VeLine,
      VeFunnel,
    },
    data() {
      return {
        statistical: {
          member_total: 0,
          course_total: 0,
          point_total: 0,
          time_length_total: 0,
        },
        courseList: {},
        courseData: {
          columns: ['title', 'value'],
          rows: []
        },

        userColors: ['#00978b','#ff6600'],
        userData: {
          columns: ['title', '会员数', '机构数'],
          rows: []
        },

        keywordSettings: {
          roseType: 'radius'
        },
        keywordData: {
          columns: ['title', 'value'],
          rows: []
        },

        equipmentData: {
          columns: ['title', 'value'],
          rows: []
        },

        questionSettings: {
          useDefaultOrder: true,
          filterZero: true
        },
        questionData: {
          columns: ['title', 'value'],
          rows: []
        },

        studySettings: {
          area: true
        },
        studyColors: ['#ff2211'],
        studyData: {
          columns: ['title', '学习人数'],
          rows: []
        }
      };
    },
    methods: {
      getTotalData () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/index/total'),
          method: 'post',
          params: this.$http.adornParams({})
        }).then(({data}) => {
          if (data && data.status === 200)
          {
            this.statistical = data.data
          }
        })
      },
      getCourseData () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/index/data'),
          method: 'post',
          params: this.$http.adornParams({})
        }).then(({data}) => {
          if (data && data.status === 200)
          {
            this.courseList = data.data
          }
        })
      },
      getUserDataData () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/index/user'),
          method: 'post',
          params: this.$http.adornParams({})
        }).then(({data}) => {
          if (data && data.status === 200)
          {
            this.userData.rows = data.data
          }
        })
      },
      getCourseDataData () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/index/course'),
          method: 'post',
          params: this.$http.adornParams({})
        }).then(({data}) => {
          if (data && data.status === 200)
          {
            this.courseData.rows = data.data
          }
        })
      },
      getKeywordDataData () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/index/keyword'),
          method: 'post',
          params: this.$http.adornParams({})
        }).then(({data}) => {
          if (data && data.status === 200)
          {
            this.keywordData.rows = data.data
          }
        })
      },
      getEquipmentData () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/index/equipment'),
          method: 'post',
          params: this.$http.adornParams({})
        }).then(({data}) => {
          if (data && data.status === 200)
          {
            this.equipmentData.rows  = data.data
          }
        })
      },
      getQuestionData () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/index/question'),
          method: 'post',
          params: this.$http.adornParams({})
        }).then(({data}) => {
          if (data && data.status === 200)
          {
            this.questionData.rows  = data.data
          }
        })
      },
      getStudyData () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/index/study'),
          method: 'post',
          params: this.$http.adornParams({})
        }).then(({data}) => {
          if (data && data.status === 200)
          {
            this.studyData.rows  = data.data
          }
        })
      },

    },
    mounted(){
      this.getTotalData();
      this.getCourseData();
      this.getUserDataData();
      this.getCourseDataData();
      this.getKeywordDataData();
      this.getEquipmentData();
      this.getQuestionData();
      this.getStudyData();
    }
  };
</script>
<style lang="scss" scoped>
  .unline {
    margin: 15px 0;
  }
  .default_program {
    text-align: center;
    width: 100%;
  }
  .default_program ul li {
    float: left;
    width: 22%;
    background: #f9f9f9;
    margin-right: 4%;
    margin-bottom: 10px;
  }
  .default_program ul li:nth-child(4n) {
    margin-right: 0;
  }
  .default_program ul li:hover {
    background: #f1f1f1;
  }
  .default_program2 ul li {
    float: left;
    width: 48%;
    background: #f9f9f9;
    margin-right: 4%;
    margin-bottom: 18px;
    height: 82px;
    padding: 10px;
    box-sizing: border-box;
    font-size: 12px;
    color: #999;
  }
  .default_program2 ul li:nth-child(2n) {
    margin-right: 0;
  }
  .default_program2 ul li:nth-child(3) {
    width: 100%;
  }
  .default_program2 ul li:hover {
    background: #f3f3f3;
  }
  .default_program .i_backgraounds {
    text-align: center;
    margin: 0 auto;
    display: block;
    padding: 5px 0;
  }
  .default_program2 p {
    line-height: 55px;
    font-size: 22px;
    color: #303133;
  }
  .i_backgraounds i {
    font-size: 28px;
  }
  .default_program p {
    text-align: center;
    background: #fff;
    line-height: 30px;
    font-size: 12px;
    clear: both;
  }
  .default_block_col {
    margin-bottom: 20px;
  }
  .default_copyright ul li {
    line-height: 66px;
    border-bottom: 1px solid #efefef;
  }
  .default_copyright ul li:nth-child(3) {
    border-bottom: none;
  }
  .default_copyright ul li span {
    margin-right: 60px;
  }
  .default_tongbi_left {
    float: left;
  }
  .default_tongbi_right {
    float: left;
    margin-left: 40px;
  }
  .default_tongbi:after {
    clear: both;
    content: "";
    display: block;
  }
  .default_total:after {
    clear: both;
    content: "";
    display: block;
  }
  .default_tongbi {
    margin-top: 20px;
  }
  .default_day_sale {
    margin-top: 30px;
    margin-bottom: 45px;
  }
  .default_tubiao {
    width: 100%;
    margin-bottom: 20px;
  }
  .default_hot_goods ul li {
    margin-top: 20px;
    overflow: hidden;
  }
  .default_hot_goods ul li span {
    border-radius: 50%;
    background: #f5f5f5;
    width: 20px;
    height: 20px;
    text-align: center;
    display: block;
    float: left;
    margin-right: 8px;
  }
  .default_hot_goods ul li:nth-child(1) span {
    background: #314659;
    color: #fff;
  }
  .default_hot_goods ul li:nth-child(2) span {
    background: #314659;
    color: #fff;
  }
  .default_hot_goods ul li:nth-child(3) span {
    background: #314659;
    color: #fff;
  }
</style>
