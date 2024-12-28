<template>
  <div class="xiecheng">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>{{ $t('organization.from') }}</div>
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

          <el-form-item :label="$t('member.username')" prop="username">
            <el-input v-model="dataForm.username" :placeholder="$t('organization.please_mobile')"></el-input>
          </el-form-item>

          <el-form-item :label="$t('common.default_password')">
            <el-tag type="danger">123456</el-tag>
          </el-form-item>

          <el-form-item :label="$t('common.sms_notification')" prop="sms_notification">
            <el-checkbox v-model="dataForm.sms_notification">
              {{ $t('common.send_sms_notification') }}
            </el-checkbox>
          </el-form-item>

          <el-form-item :label="$t('member.nickname')" prop="nickname">
            <el-input v-model="dataForm.nickname" :placeholder="$t('common.please_input')+$t('member.nickname')"></el-input>
          </el-form-item>

          <el-form-item porp="role_id" :label="$t('member.role.title')" class="width_auto">
            <el-checkbox-group v-model="dataForm.role_id" :max=1>
              <el-checkbox v-for="(v,k) in rolelist" :key="k" :label="v.id">
                {{v.title}}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item :label="$t('member.team_id')" prop="team_id" class="team_id">
            <el-select v-model="dataForm.team_id" :disabled="is_team_id" :placeholder="$t('common.please_input') + $t('member.team_id')">
              <el-option v-for="(v,k) in teamlist" :label="v.title" :key="k" :value="v.id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item :label="$t('member.money')" prop="money">
            <el-input v-model="dataForm.money" :disabled="is_money" :placeholder="$t('common.please_input')+$t('member.money')"></el-input>
          </el-form-item>

          <el-form-item :label="$t('member.address')" prop="address">
            <el-input type="textarea" :disabled="is_address" v-model="dataForm.address" :placeholder="$t('common.please_input')+$t('member.address')"></el-input>
          </el-form-item>

          <el-form-item :label="$t('member.status')" prop="status">
            <el-switch v-model="dataForm.status" active-value="1" :active-text="$t('common.enable')" inactive-value="2" :inactive-text="$t('common.disable')">
            </el-switch>
          </el-form-item>

          <el-form-item>
            <el-button v-if="isAuth('module:organization:handle')" type="primary" @click="dataFormSubmit()">
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
  export default {
    extends: common,
    data() {
      return {
        model: 'organization',
        rolelist: [],
        teamlist: [],
        is_team_id: true,
        is_address: true,
        is_money: true,
        dataForm:
        {
          id: 0,
          role_id : [],
          team_id : '',
          username: '',
          nickname: '',
          money: '',
          address: '',
          status: '1',
          sms_notification: true,
        },
        dataRule:
        {
          username: [
            { required: true, message: this.$t('organization.rules.username.require'), trigger: 'blur' },
          ],
          nickname: [
            { required: true, message: this.$t('organization.rules.nickname.require'), trigger: 'blur' },
          ],
          role_id: [
            { required: true, message: this.$t('organization.rules.role.require'), trigger: 'blur' },
          ],
        }
      };
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
              url: this.$http.adornUrl(`/organization/view/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.dataForm.team_id  = data.data.team_id
                this.dataForm.username = data.data.username
                this.dataForm.nickname = data.data.nickname
                this.dataForm.money    = data.data.money
                this.dataForm.address  = data.data.address
                this.dataForm.status   = data.data.status.value + ''

                if(data.data.role)
                {
                  let role = data.data.role



                  role.forEach(res=>{
                    this.dataForm.role_id.push(res.id);

                    if(res.id == 1 || res.id == 2)
                    {
                      this.is_team_id = false;
                    }
                    else if(res.id == 5 || res.id == 6)
                    {
                      this.is_address = false
                    }
                    if(res.id == 2)
                    {
                      this.is_money = false
                    }
                  });
                }
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
              url: this.$http.adornUrl(`/organization/handle`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'role_id': this.dataForm.role_id,
                'team_id': this.dataForm.team_id,
                'username': this.dataForm.username,
                'nickname': this.dataForm.nickname,
                'money': this.dataForm.money,
                'address': this.dataForm.address,
                'status': this.dataForm.status,
                'sms_notification': this.dataForm.sms_notification,
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
      loadRoleList () {
        this.$http({
          url: this.$http.adornUrl('/organization/role/select'),
          method: 'get'
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.rolelist = data.data
          } else {
            this.$message.error(this.$t(data.message))
          }
        })
      },
      resetForm:function()
      {
        this.$refs['dataForm'].resetFields();
      }
    },
    created() {
      this.init();
    },
    mounted () {
      this.loadRoleList();
    },
  };
</script>
