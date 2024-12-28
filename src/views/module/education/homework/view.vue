<template>
  <div class="xiecheng">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>{{ $t('homework.view') }}</div>
        </div>

        <div class="admin_main_block_right">
          <div>
            <el-button icon="el-icon-back" @click="$router.go(-1)">
              {{ $t('common.return') }}
            </el-button>
          </div>
        </div>
      </div>

      <div class="admin_form_main">
        <el-form label-width="100px" ref="dataForm" :model="dataForm" :rules="dataRule">

          <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
              <span>{{ $t('common.basic_info') }}</span>
            </div>
            <div class="text item">
              {{ dataForm.content }}
            </div>
          </el-card>

          <el-card class="box-card mt10" shadow="never">
            <div slot="header" class="clearfix">
              <span>{{ $t('homework.resource_info') }}</span>
            </div>
            <div class="text item">
              <span class="ml10" v-if="dataForm.resource" v-for="(item, key) in dataForm.resource" :key="key">
                <el-link v-if="isPicture(item.url)" type="primary" :href="item.url" target="_blank" icon="el-icon-picture">
                  {{ $t('common.picture_info') }}
                </el-link>
                <el-link v-else-if="isFile(item.url)" type="success" :href="item.url" target="_blank" icon="el-icon-tickets">
                  {{ $t('common.file_info') }}
                </el-link>
                <el-link v-else-if="isAudio(item.url)" type="warning" :href="item.url" target="_blank" icon="el-icon-microphone">
                  {{ $t('common.audio_info') }}
                </el-link>
                <el-link v-else-if="isVideo(item.url)" type="danger" :href="item.url" target="_blank" icon="el-icon-video-play">
                  {{ $t('common.video_info') }}
                </el-link>
              </span>
            </div>
          </el-card>

          <el-card class="box-card mt10" shadow="never">
            <div slot="header" class="clearfix">
              <span>{{ $t('homework.answer_info') }}</span>
            </div>
            <div class="text item">
              <el-table :data="dataForm.answer" v-loading="dataListLoading"  @selection-change="selectionChangeHandle" border :empty-text="$t('common.empty_data')">
                <el-table-column prop="nickname" :label="$t('member.nickname')" width="180">
                </el-table-column>

                <el-table-column :label="$t('member.homework.answer_content')">
                  <template slot-scope="scope" v-if="scope.row.pivot">
                    {{scope.row.pivot.answer}}
                  </template>
                </el-table-column>

                <el-table-column :label="$t('member.homework.answer_result')">
                  <template slot-scope="scope" v-if="scope.row.pivot">
                    {{ scope.row.pivot.result | homeworkResult }}
                  </template>
                </el-table-column>

                <el-table-column :label="$t('member.homework.answer_remark')">
                  <template slot-scope="scope" v-if="scope.row.pivot">
                    {{scope.row.pivot.remark}}
                  </template>
                </el-table-column>


                <el-table-column prop="create_time" :label="$t('member.homework.answer_time')" width="180">
                </el-table-column>
              </el-table>
            </div>
          </el-card>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import common from '@/views/common/base'
  import { homeworkResult } from '@/utils/format'
  export default
  {
    extends: common,
    data()
    {
      return {
        model: 'education/homework',
        teacherList: [],
        dataForm:
        {
          id: 0,
          title: '',
          content: '',
          answer: [],
          resource: [],
        },
        dataRule: {}
      };
    },
    filters: {
      homeworkResult: homeworkResult
    },
    methods:
    {
      init ()
      {
        let query = this.$route.query
        let id = query.id

        this.dataForm.id = id || 0
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/education/homework/view/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.dataForm.title    = data.data.title
                this.dataForm.content  = data.data.content
                this.dataForm.answer   = data.data.answer
                this.dataForm.resource = data.data.resource
              }
            })
          }
        })
      },

      isPicture(value) {
        return /(.png|.jpg|.jpeg)/.test(value)
      },
      isFile (value) {
        return /(.doc|.pdf)/.test(value)
      },
      isAudio (value) {
        return /(.mp3)/.test(value)
      },
      isVideo (value) {
        return /(.mp4)/.test(value)
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

  .mt10 {
    margin-top: 10px;
  }
</style>
