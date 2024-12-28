<template>
  <div class="xiecheng">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_right">
          <div>
            <el-button v-if="isAuth('module:organization:delete')" type="danger" icon="el-icon-delete" @click="deleteHandle()">
              {{ $t('common.batch_delete') }}
            </el-button>
          </div>
        </div>
      </div>

      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            <el-input v-model="dataForm.title" :placeholder="$t('common.please_input') + $t('organization.title')" clearable>
            </el-input>
          </div>
          <div>
            <el-input v-model="dataForm.head" :placeholder="$t('common.please_input') + $t('organization.head')" clearable>
            </el-input>
          </div>
          <div>
            <el-select v-model="dataForm.certification_status" :placeholder="$t('common.please_select') + $t('common.certification_status')" clearable>
              <el-option :label="$t('common.all')" value=""></el-option>
              <el-option :label="$t('common.wait_certification')" value="0"></el-option>
              <el-option :label="$t('common.already_certification')" value="1"></el-option>
            </el-select>
          </div>
          <div>
            <el-select v-model="dataForm.audit_status" :placeholder="$t('common.please_select') + $t('common.audit_status')" clearable>
              <el-option :label="$t('common.all')" value=""></el-option>
              <el-option :label="$t('common.wait_pass')" value="0"></el-option>
              <el-option :label="$t('common.pass')" value="1"></el-option>
              <el-option :label="$t('common.no_pass')" value="2"></el-option>
            </el-select>
          </div>
          <div>
            <el-button icon="el-icon-search" @click="getDataList()">
              {{ $t('common.search') }}
            </el-button>
          </div>
        </div>
      </div>
      <div class="admin_table_main">
        <el-table :data="dataList" v-loading="dataListLoading" @selection-change="selectionChangeHandle">
          <el-table-column type="selection" header-align="center" align="center">
          </el-table-column>

          <el-table-column prop="id" :label="$t('common.id')"  width="70px">
          </el-table-column>

          <el-table-column :label="$t('organization.info')" width="300">
            <template slot-scope="scope">
              <dl class="table_dl">
                <dt>
                  <el-image :src="scope.row.logo" style="width:45px;height:45px;">
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                </dt>
                <dd class="table_dl_dd_all_30">
                  {{ $t('organization.title') }}： {{ scope.row.title }}
                </dd>
                <dd class="table_dl_dd_all_16_gray">
                  {{ $t('organization.create_time') }}： {{ scope.row.create_time }}
                </dd>
              </dl>
            </template>
          </el-table-column>

          <el-table-column prop="head" :label="$t('organization.head')">
          </el-table-column>

          <el-table-column prop="squad_total" :label="$t('organization.squad_total')">
          </el-table-column>

          <el-table-column prop="member_total" :label="$t('organization.member_total')">
          </el-table-column>

          <el-table-column prop="course_total" :label="$t('organization.course_total')">
          </el-table-column>

          <el-table-column :label="$t('organization.certification_status')">
            <template slot-scope="scope">
              <el-tag effect="dark" :type=" scope.row.certification_status.value == 1 ? 'success' : 'danger' ">
                {{ scope.row.certification_status.text }}
              </el-tag>
            </template>
          </el-table-column>

          <el-table-column :label="$t('organization.audit_status')">
            <template slot-scope="scope">
              <el-tag effect="dark" :type=" scope.row.audit_status.value == 1 ? 'success' : 'danger' ">
                {{ scope.row.audit_status.text }}
              </el-tag>
            </template>
          </el-table-column>

          <el-table-column :label="$t('common.handle')" fixed="right" width="580">
            <template slot-scope="scope">
              <el-button v-if="isAuth('module:organization:view')" type="info" icon="el-icon-view" @click="$router.push({name: 'module_organization_view', query: {id: scope.row.id}})">
                {{ $t('common.view') }}
              </el-button>

              <el-button v-if="isAuth('module:organization:course:list')" type="warning" icon="el-icon-reading" @click="$router.push({name: 'module_organization_course_list', query: {organization_id: scope.row.id}})">
                {{ $t('organization.course_info') }}
              </el-button>

              <el-button v-if="isAuth('module:organization:certification') && scope.row.certification_status.value != 1" type="warning" icon="el-icon-check" @click="$router.push({name: 'module_organization_certification', query: {id: scope.row.id}})">
                {{ $t('common.certification') }}
              </el-button>

              <el-button v-if="isAuth('module:organization:audit') && scope.row.audit_status.value != 1" type="success" icon="el-icon-check" @click="$router.push({name: 'module_organization_audit', query: {id: scope.row.id}})">
                {{ $t('common.audit') }}
              </el-button>

              <el-button v-if="isAuth('module:organization:form')" type="primary" icon="el-icon-edit" @click="$router.push({name: 'module_organization_form', query: {id: scope.row.id}})">
                {{ $t('common.update') }}
              </el-button>

              <el-button v-if="isAuth('module:organization:delete')" type="danger" icon="el-icon-delete" @click="deleteHandle(scope.row.id)">
                {{ $t('common.delete') }}
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
        model: 'organization',
        roleList: [],
        dataForm: [
          'title',
          'head',
          'certification_status',
          'audit_status',
        ],
      };
    },
    created() {
      this.getDataList()
    }
  };
</script>
