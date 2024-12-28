export const member = {
  list: '学员列表',
  from: '学员操作',
  info: '学员信息',
  view: '学员详情',
  delete: '删除学员',
  export: '导出学员',
  archive_info: '档案',
  comment_info: '评论',
  initialization_password: '初始化',

  member_no: '学员ID',
  avatar: '学员头像',
  username: '登录账户',
  mobile: '手机',
  email: '邮箱',
  nickname: '学员昵称',
  status: '账号状态',
  last_login_time: '最后登录时间',
  create_time: '注册时间',

  role: {
    list: '身份列表',
    from: '身份操作',
    title: '身份名称',
    content: '身份描述',
    distribution: '分配身份',

    menu: '菜单权限',
    interface: '接口权限',

    rules: {
      title: {
        require: '身份名称不能为空',
        length: '长度在 1 到 50 个字符',
      },
    },
  },

  password: {
    from: '密码修改',

    old_password: '当前密码',
    password: '新密码',
    password_confirmation: '确认密码',
    please_old_password: '请输入当前登录密码',
    rules: {
      old_password: {
        require: '当前登录密码不能为空',
        length: '长度在 1 到 32 个字符',
      },
      password: {
        require: '新密码不能为空',
        length: '长度在 1 到 32 个字符',
      },
      password_confirmation: {
        require: '确认密码不能为空',
        length: '长度在 1 到 32 个字符',
      },
    }
  },

  archive: {
    list: '档案列表',
    from: '档案操作',
    view: '档案详情',
    info: '学员档案',

    sex: '性别',
    age: '年龄',
    weixin: '微信号',
    id_card_no: '身份证号',
    realname: '真实姓名',
    national: '民族',
    area: '地区',
    address: '详细地址',
    work_address: '工作地址',
    education: '学历',
    remark: '档案备注',
    create_time: '建档时间',

    computer: '电脑端',
    mobile: '移动端',

    study_type: '学习类型',
    start_time: '开始学习时间',
    end_time: '结束学习时间',
    course_study_time: '课程学习时间',
    cumulative_study_time: '累加学习时间',
    already_study_time: '已学完时长',
    wait_study_time: '未学完时长',
    mobile_study_time: '移动端学习时间',
    pc_study_time: 'PC端学习时间',
    already_study_total: '已学完课件数',
    wait_study_total: '待学完课件数',
    question_total: '练习总题数',

    question_correct: '练习题正确率',
    test_total: '测评总次数',
    test_high: '测评最高分',
    test_low: '测评最低分',
    test_average: '测试平均分',
    test_result: '测评结果',
    reality_practice_total: '实操练习总题数',
    reality_practice_correct: '实操练习正确率',
    theory_practice_total: '理论练习总题数',
    theory_practice_correct: '理论练习正确率',
    simulation_exam_total: '模拟考试总次数',
    simulation_exam_high: '模拟考试最高分',
    simulation_exam_low: '模拟考试最低分',
    simulation_exam_average: '模拟考试平均分',
    open_squad_period: '公开班期',
    money: '费用',

    rules: {
      member_id: {
        require: '学员昵称不能为空',
      },
      realname: {
        require: '真实姓名不能为空',
      },
      id_card_no: {
        require: '身份证号不能为空',
      },
    },
  },

  comment: {
    list: '评价列表',
    from: '评价操作',
    view: '评价详情',

    score: '评价分数',
    content: '评价内容',
    appraiser: '评价人',

    rules: {
      score: {
        require: '评价分数不能为空',
      },
      content: {
        require: '评价内容不能为空',
      }
    },
  },

  homework: {
    'answer_time': '完成时间',
    'answer_content': '学员答案',
    'answer_result': '老师批复',
    'answer_remark': '老师建议',
  },
}
