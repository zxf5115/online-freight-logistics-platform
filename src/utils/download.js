/*
 * @author: zhangxiaofei 1326336909@qq.com
 * @dateTime:   2020-12-23 16:11:22
 */
// 使用iframe框架下载文件 -兼容性考虑
export function downloadUrl(res, name)
{
  const blob = new Blob([res], { type: 'application/vnd.ms-excel' })

  // for IE
  if (window.navigator && window.navigator.msSaveOrOpenBlob)
  {
    const fileName = name + '.xlsx'

    window.navigator.msSaveOrOpenBlob(blob, fileName)
  }
  // for Non-IE (chrome, firefox etc.)
  else
  {
    const fileName = name + '.xlsx'

    const elink = document.createElement('a')

    elink.download = fileName

    elink.style.display = 'none'

    elink.href = URL.createObjectURL(blob)

    document.body.appendChild(elink)

    elink.click()

    URL.revokeObjectURL(elink.href)

    document.body.removeChild(elink)
  }
}
