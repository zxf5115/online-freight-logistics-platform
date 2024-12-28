export const notice = {
  list: '公告列表',
  from: '公告操作',
  title: '公告标题',
  content: '公告内容',

  rules: {
    title: {
      require: '标题不能为空',
      length: '长度在 1 到 100 个字符',
    },
    content: {
      require: '内容不能为空',
      length: '长度在 1 到 1000 个字符',
    },
  },
}
