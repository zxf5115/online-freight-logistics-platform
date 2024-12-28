<template>
  <el-form label-width="100px" ref="dataForm" :model="dataForm" :rules="dataRule">
    <el-row>
      <el-col :span="20" :offset="2">
        <el-row>
          <el-col :span="24">
            <el-form-item class="title" :label="$t('course.point.question.title')" prop="title">
              <el-input type="textarea" v-model="dataForm.title"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item :label="$t('course.point.question.url')" prop="url">
              <el-upload class="avatar-uploader" :action="this.$http.adornUrl('/file/picture')" :show-file-list="false" :headers="upload_headers" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                <img v-if="dataForm.url" :src="dataForm.url" class="avatar-upload">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item class="title" :label="$t('course.point.question.description')" prop="description">
              <el-input type="textarea" v-model="dataForm.description"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('course.point.question.score')" prop="score">
              <el-input v-model="dataForm.score"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('course.point.question.level')" prop="level">
              <el-rate v-model="dataForm.level" :max="4" :texts="['简单', '一般', '略难', '非常难']" show-text/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item :label="$t('course.point.question.answer')" prop="answer">
              <el-checkbox-group v-model="dataForm.answer">
                <el-checkbox v-for="(option) in dataForm.options" :label="option.title" :key="option.title" :name="option.title">
                  {{ option.title }}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20" :offset="2">
            <el-divider>选项列表</el-divider>
            <el-form-item v-for="(option, index) in dataForm.options" :label="option.title" :key="option.title" :prop="'options.' + index + '.value'" label-width="15px">
              <el-row :gutter="5">
                <el-col :span="3">
                  <el-input v-model="option.title"/>
                </el-col>
                <el-col :span="19">
                  <el-row :gutter="5">
                    <el-col :span="10">
                      <el-input :height="60" v-model="option.value"/>
                    </el-col>
                    <el-col :span="13">
                      <el-input :height="60" v-model="option.url"/>
                    </el-col>
                    <el-col :span="1">
                      <el-button @click.prevent="removeOption(option)">
                        {{ $t('common.delete') }}
                      </el-button>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </el-form-item>
            <el-button type="success" @click.prevent="addOption()" style="display:block;margin:0 auto">
              {{ $t('course.point.question.create_option') }}
            </el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item :label="$t('course.point.question.analysis')" prop="analysis" class="analysis-form-item">
              <el-input type="textarea" v-model="dataForm.analysis"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item>
            <el-button type="primary" @click="dataFormSubmit()">
              {{ $t('common.confirm') }}
            </el-button>
            <el-button @click="resetForm()">
              {{ $t('common.reset') }}
            </el-button>
          </el-form-item>
        </el-row>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import common from '@/views/common/base'
import { isNotEmpty } from '@/utils/validate'

  export default {
    extends: common,
    props: {
      model: String,
      required: true
    },
    data () {
      return {
        upload_headers:{},
        dataForm: {
          id: '',
          type: 5,
          title: '',
          url: '',
          description: '',
          level: 2,
          score: 5,
          options: [],
          answer: [],
          analysis: '',
        },
        dataRule:
        {
          title: [
            { required: true, message: this.$t('course.point.question.rules.title.require'), trigger: 'blur' },
          ],
          options: [
            { required: true, message: this.$t('course.point.question.rules.options.require'), trigger: 'blur' },
          ],
          answer: [
            { required: true, message: this.$t('course.point.question.rules.answer.require'), trigger: 'blur' },
          ],
        }
      }
    },
    methods: {
      init ()
      {
        let query = this.$route.query
        let id = query.id

        this.dataForm.id = id || 0
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/${this.model}/view/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.dataForm.title       = data.data.title
                this.dataForm.url         = data.data.url
                this.dataForm.description = data.data.description
                this.dataForm.level       = data.data.level
                this.dataForm.score       = data.data.score
                this.dataForm.options     = data.data.options
                this.dataForm.answer      = data.data.answer
                this.dataForm.analysis    = data.data.analysis
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/${this.model}/mchoices`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'type': this.dataForm.type,
                'title': this.dataForm.title,
                'url': this.dataForm.url,
                'description': this.dataForm.description,
                'level': this.dataForm.level,
                'score': this.dataForm.score,
                'options': this.dataForm.options,
                'answer': this.dataForm.answer,
                'analysis': this.dataForm.analysis
              })
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.$message.success(this.$t('common.handle_success'));
                this.$router.go(-1);
              } else {
                this.$message.error(this.$t(data.message))
              }
            })
          }
        })
      },
      resetForm:function()
      {
        this.$refs['dataForm'].resetFields();
      },
      addOption () {
        // 校验
        if (this.dataForm.options.length > 0) {
          let option = this.dataForm.options[this.dataForm.options.length - 1]
          if (!isNotEmpty(option.title)) {
            this.$message.error(this.$t('course.point.question.placeholder_input_option'));
            return
          }
          this.dataForm.options.push({ title: '', value: '', url: '' })
        } else {
          this.dataForm.options.push({ title: '', value: '', url: '' })
        }
      },
      removeOption (item) {
        let index = this.dataForm.options.indexOf(item)
        if (index !== -1) {
          this.dataForm.options.splice(index, 1)
        }
      },
      handleAvatarSuccess(res, file) {
        this.dataForm.url = res.data;
      },
      beforeAvatarUpload(file) {
        const isPicture = (file.type === 'image/jpeg' || file.type === 'image/png');
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isPicture) {
          var message = this.$t('common.rules.picture.picture_type');
          this.$message.error(this.$t(data.message))
        }
        if (!isLt2M) {
          var message = this.$t('common.rules.picture.picture_size');
          this.$message.error(this.$t(data.message))
        }

        return isPicture && isLt2M;
      }
    },
    created(request)
    {
      this.init();

      // 要保证取到
      this.upload_headers.Authorization = 'Bearer ' + localStorage.getItem('token');
    }
  }
</script>

<style lang="scss" scoped>
  .title {
    max-width: 1200px;
    min-width: 600px;
  }
  .editor-content{
    margin-top: 20px;
  }
  .el-rate {
    margin-top: 6px;
  }
</style>
