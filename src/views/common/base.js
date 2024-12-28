export default {
  inject: ['refresh'],
  data () {
    return {
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: []
    }
  },
  methods: {
    // 每页数
    sizeChangeHandle (val) {
      this.pageSize = val
      this.pageIndex = 1
      this.getDataList()
    },
    // 当前页
    currentChangeHandle (val) {
      this.pageIndex = val
      this.getDataList()
    },
    // 多选
    selectionChangeHandle (val) {
      this.dataListSelections = val
    },
    // 新增 / 修改
    addOrUpdateHandle (name, id) {
      router.push({name: name, params:{id: id}})
    },
    // 获取数据列表
    getDataList (is_search) {
      is_search = is_search || false

      if(is_search)
      {
        this.pageIndex = 1;
      }

      this.dataListLoading = true
      this.$http({
        url: this.$http.adornUrl('/'+this.model+'/list'),
        method: 'get',
        params: this.$http.adornParams({
          'is_search': is_search,
          'page': this.pageIndex,
          'limit': this.pageSize,
          'name': this.dataForm.name,
          'head': this.dataForm.head,
          'type': this.dataForm.type,
          'title': this.dataForm.title,
          'username': this.dataForm.username,
          'nickname': this.dataForm.nickname,
          'realname': this.dataForm.realname,
          'id_card_no': this.dataForm.id_card_no,
          'content': this.dataForm.content,
          'category': this.dataForm.category,
          'pid': this.dataForm.pid,
          'role_id': this.dataForm.role_id,
          'unit_id': this.dataForm.unit_id,
          'parent_id': this.dataForm.parent_id,
          'category_id': this.dataForm.category_id,
          'order_status': this.dataForm.order_status,
          'add_time': this.dataForm.add_time,
          'valid_time': this.dataForm.valid_time,
          'create_time': this.dataForm.create_time,
          'team_id': this.dataForm.team_id,
          'paper_id': this.dataForm.paper_id,
          'course_id': this.dataForm.course_id,
          'location_id': this.dataForm.location_id,
          'organization_id': this.dataForm.organization_id,
          'audit_status': this.dataForm.audit_status,
          'certification_status': this.dataForm.certification_status,
          'is_recommend': this.dataForm.is_recommend,
          'is_hidden': this.dataForm.is_hidden,
          'relevance_role_id': this.dataForm.relevance_role_id,
          'course_title': this.dataForm.course_title,
          'organization_title': this.dataForm.organization_title,
          'squad_title': this.dataForm.squad_title,
          'teacher_name': this.dataForm.teacher_name,

          'member_username': this.dataForm.member_username,
          'member_nickname': this.dataForm.member_nickname,
        })
      }).then(({data}) => {
        if (data && data.status === 200)
        {
          this.dataList = data.data.data
          this.totalPage = data.data.total
        }
        else
        {
          this.dataList = []
          this.totalPage = 0
          this.$message.error(data.message)
        }
        this.dataListLoading = false
      })
    },
    // 删除
    deleteHandle (id) {
      var ids = id ? [id] : this.dataListSelections.map(item => {
        return item.id
      })

      let message = this.$t('common.to_determine_the')
                    + this.$t('common.current_check')
                    + this.$t('common.for')
                    + `${id ? this.$t('common.delete') : this.$t('common.batch_delete')}`
                    + this.$t('common.handle')
                    + `?`

      if(this.message != undefined && this.message.error != undefined)
      {
        message = this.message.error
      }

      this.$confirm(message, this.$t('common.prompt'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(() => {
        this.$http({
          url: this.$http.adornUrl('/'+this.model+'/delete'),
          method: 'post',
          data: {id: this.$http.adornData(ids, false)}
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.$message({
              message: this.$t('common.handle_success'),
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.getDataList()
              }
            })
          } else {
            this.$message.error(this.$t(data.message))
          }
        })
      }).catch(() => {})
    }
  },
  filters: {
    formatMoney: function(value) {
      value = Number(value);
      return value.toFixed(2);
    }
  }
}
