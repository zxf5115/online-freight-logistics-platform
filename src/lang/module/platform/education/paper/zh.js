export const paper = {
  list: '试卷列表',
  from: '试卷操作',
  view: '试卷详情',
  statistical: '统计',

  title: '试卷名称',
  description: '试卷描述',
  test_time: '考试时长(分钟)',
  paper_question: '试卷试题',
  organization_total: '机构数量',
  user_total: '用户数量',

  rules: {
    title: {
      require: '试卷标题不能为空',
    },
    test_time: {
      require: '考试时长不能为空',
    },
  },

  question: {
    list: '试题列表',
    from: '试题操作',
    view: '查看试题',
    create: '新建试题',

    info: '试题信息',
    title: '试题标题',
    description: '试题描述',
    url: '试题资源',
    type: '试题类型',
    content: '试题内容',
    answer: '试题答案',
    status: '试题状态',
    create_time: '添加时间',

    type: '类型',
    level: '难度',
    score: '分值',
    content: '题目内容',
    category: '分类',
    optionA: '选项A',
    optionB: '选项B',
    optionC: '选项C',
    optionD: '选项D',
    optionE: '选项E',
    optionF: '选项F',
    answer: '参考答案',
    analysis: '解析',
    placeholder_input_option: '请先输入选项再添加',
    create_option: '新增选项',

    choices: '选择题',
    judgement: '判断题',
    compute: '计算题',
    multiple_choices: '多选题',
    connection: '连线题',
    special: '特殊题',
    correct: '正确',
    error: '错误',

    rules: {
      title: {
        require: '试题标题不能为空',
      },
      options: {
        require: '试题内容不能为空',
      },
      answer: {
        require: '试题答案不能为空',
      },
    }
  },
}
