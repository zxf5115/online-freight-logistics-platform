<template>
  <div class="xiecheng">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>{{ $t('squad.from') }}</div>
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

          <el-form-item :label="$t('squad.title')" prop="title">
            <el-input :placeholder="$t('squad.title')" v-model="dataForm.title"></el-input>
          </el-form-item>

          <el-form-item :label="$t('squad.teacher_name')" prop="teacher_id">
            <el-select v-model="dataForm.teacher_id" filterable clearable>
              <el-option v-for="(v,k) in teacherList" :label="v.nickname" :key="k" :value="v.id">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item :label="$t('squad.description')" prop="description">
            <el-input type="textarea" :placeholder="$t('common.please_input')+$t('squad.description')" :rows="5" maxlength="2000" show-word-limit v-model="dataForm.description"></el-input>
          </el-form-item>

          <el-form-item :label="$t('squad.start_stop_time')" prop="valid_time">
            <el-date-picker format="yyyy-MM-dd" v-model="dataForm.valid_time" type="daterange" :range-separator="$t('common.to')" :start-placeholder="$t('squad.start_time')" :end-placeholder="$t('squad.end_time')"></el-date-picker>
          </el-form-item>

          <el-form-item :label="$t('squad.number')" prop="number">
            <el-input-number :placeholder="$t('common.please_input')+$t('squad.number')" v-model="dataForm.number" :min="1"></el-input-number>
          </el-form-item>

          <el-form-item :label="$t('common.sort')" prop="sort">
            <el-input-number :placeholder="$t('common.please_input')+$t('common.sort')" v-model="dataForm.sort" :min="0"></el-input-number>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="dataFormSubmit()">
              {{ $t('common.confirm') }}
            </el-button>
            <el-button @click="resetForm()">
              {{ $t('common.reset') }}
            </el-button>
          </el-form-item>

        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import common from '@/views/common/base'
  export default
  {
    extends: common,
    data()
    {
      return {
        model: 'organization/squad',
        teacherList: [],
        dataForm:
        {
          id: 0,
          teacher_id: 0,
          title: '',
          description: '',
          valid_time: '',
          number: 1,
          sort: 0,
        },
        dataRule:
        {
          title: [
            { required: true, message: this.$t('squad.rules.title.require'), trigger: 'blur' },
          ],
          valid_time: [
            { required: true, message: this.$t('squad.rules.valid_time.require'), trigger: 'blur' },
          ],
          description: [
            { required: true, message: this.$t('squad.rules.description.require'), trigger: 'blur' },
          ],
          number: [
            { required: true, message: this.$t('squad.rules.number.require'), trigger: 'blur' },
          ],
        }
      };
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
              url: this.$http.adornUrl(`/organization/squad/view/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.dataForm.teacher_id  = data.data.teacher_id
                this.dataForm.title       = data.data.title
                this.dataForm.description = data.data.description
                this.dataForm.valid_time  = data.data.valid_time
                this.dataForm.number      = data.data.number
                this.dataForm.sort        = data.data.sort
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
              url: this.$http.adornUrl(`/organization/squad/handle`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'teacher_id': this.dataForm.teacher_id,
                'title': this.dataForm.title,
                'description': this.dataForm.description,
                'valid_time': this.dataForm.valid_time,
                'number': this.dataForm.number,
                'sort': this.dataForm.sort,
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
      loadTeacherList () {
        this.$http({
          url: this.$http.adornUrl('/member/select'),
          method: 'get',
          params: this.$http.adornParams({
            role_id: 2
          })
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.teacherList = data.data
          } else {
            this.$message.error(this.$t(data.message))
          }
        })
      },
    },
    created(request)
    {
      this.init();
    },
    mounted () {
      this.loadTeacherList();
    },
  };
</script>
