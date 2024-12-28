export const course = {
  list: '课程列表',
  from: '课程操作',
  view: '查看课程',
  create: '新建课程',

  basic_info: '基本信息',
  question_info: '课程练习题',
  resource_info: '课程资料',
  emphasis_info: '课程重点',

  info: '课程信息',
  type: '课程类型',
  title: '课程标题',
  structure: '结构',
  course_structure: '课程结构',
  course_point: '知识点',
  course_unit: '单元',
  course_experience: '体验',
  course_label: '课程标签',
  course_resource: '课程资料',
  course_intensify: '考前强化',
  picture: '课程封面',
  time_length: '课程学习课时',
  money: '课程费用',
  description: '课程介绍',
  create_time: '添加时间',
  is_recommend: '首页推荐',
  is_skill: '是否技能',
  is_hidden: '是否显示',
  status: '课程状态',
  member_total: '学习人数',
  organization_total: '订购机构',
  video_total: '视频数量',
  interaction_total: '交互题数量',
  teacher_name: '老师姓名',
  teacher_position: '老师职称',
  teacher_specialty: '学术研究',
  teacher_record: '老师履历',
  teacher_remark: '老师备注',
  outline: '培训大纲',

  enable: '已推荐',
  disable: '未推荐',

  rules: {
    title: {
      require: '课程标题不能为空',
    },
    picture: {
      require: '课程封面不能为空',
    },
    money: {
      require: '课程费用不能为空',
    },
  },

  unit: {
    list: '单元列表',
    from: '单元操作',
    view: '查看单元',

    title: '单元标题',
    parent_title: '上级标题',
    picture: '单元图片',
    description: '单元介绍',
    depth: '单元层级',
    is_column: '单元栏目',

    rules: {
      title: {
        require: '单元标题不能为空',
        length: '单元标题最大长度为50',
      },
      picture: {
        require: '单元封面不能为空',
      },
    }
  },

  point: {
    list: '知识点列表',
    from: '知识点操作',
    view: '查看知识点',
    create: '新建知识点',

    basic_info: '基本信息',
    question_info: '练习题',
    resource_info: '课程资料',
    emphasis_info: '课程重点',

    info: '知识点信息',
    type: '知识点类型',
    title: '知识点标题',
    picture: '知识点封面',
    money: '知识点费用',
    description: '知识点介绍',
    content: '知识点内容',
    money: '知识点费用',
    create_time: '添加时间',
    is_recommend: '首页推荐',
    status: '知识点状态',

    rules: {
      title: {
        require: '知识点标题不能为空',
      },
      picture: {
        require: '知识点封面不能为空',
      },
      money: {
        require: '知识点费用不能为空',
      },
    },

    question: {
      list: '练习题列表',
      from: '练习题操作',
      view: '查看练习题',
      create: '新建练习题',

      info: '练习题信息',
      title: '练习题标题',
      description: '练习题描述',
      url: '练习题资源',
      type: '练习题类型',
      content: '练习题内容',
      answer: '练习题答案',
      status: '练习题状态',
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
      fill_in_blank: '填空题',
      explain: '名词解析题',
      connection: '连线题',
      special: '特殊题',
      correct: '正确',
      error: '错误',

      rules: {
        title: {
          require: '练习题标题不能为空',
        },
        options: {
          require: '练习题内容不能为空',
        },
        answer: {
          require: '练习题答案不能为空',
        },
      }
    },

    emphasis: {
      info: '重点信息',

      title: '重点标题',
      content: '重点内容',
    }
  },

  label: {
    list: '标签列表',
    from: '标签操作',
    view: '标签详情',

    title: '标签标题',

    rules: {
      title: {
        require: '标签标题不能为空',
        length: '标签标题最大长度为50',
      },
    }
  },

  resource: {
    list: '资料列表',
    from: '资料操作',
    view: '资料详情',

    resource_category: '资料',

    title: '资料标题',
    content: '资料内容',
    url: '资料文件',

    rules: {
      title: {
        require: '资料标题不能为空',
        length: '标签标题最大长度为200',
      },
      content: {
        require: '资料内容不能为空',
      },
    },

    category: {
      list: '分类列表',
      from: '分类操作',
      view: '分类详情',

      title: '分类标题',
      parent_title: '上级标题',
      picture: '分类图片',
      description: '分类介绍',
      depth: '分类层级',

      rules: {
        title: {
          require: '分类标题不能为空',
          length: '分类标题最大长度为50',
        },
        picture: {
          require: '分类封面不能为空',
        },
      }
    }
  },

  intensify: {
    list: '强化列表',
    from: '强化操作',
    view: '强化详情',

    graphic_content: '图文内容',
    question_content: '强化题内容',
    paper_content: '试卷内容',
    intensify_category: '强化',

    title: '强化标题',
    content: '强化内容',
    url: '强化文件',
    intensify_question: '试题标题',

    rules: {
      title: {
        require: '强化标题不能为空',
        length: '标签标题最大长度为200',
      },
      content: {
        require: '强化内容不能为空',
      },
    },

    category: {
      list: '分类列表',
      from: '分类操作',
      view: '分类详情',

      title: '分类标题',
      parent_title: '上级标题',
      picture: '分类图片',
      description: '分类介绍',
      depth: '分类层级',

      rules: {
        title: {
          require: '分类标题不能为空',
          length: '分类标题最大长度为50',
        },
        picture: {
          require: '分类封面不能为空',
        },
      }
    },

    question: {
      list: '强化题列表',
      from: '强化题操作',
      view: '查看强化题',
      create: '新建强化题',

      info: '强化题信息',
      title: '强化题标题',
      description: '强化题描述',
      url: '强化题资源',
      type: '强化题类型',
      content: '强化题内容',
      answer: '强化题答案',
      status: '强化题状态',
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
  },


  emphasis: {
    info: '重点信息',

    title: '重点标题',
    content: '重点内容',
  },

  experience: {
    from: '课程体验',
    content: '体验内容',

  },
}
