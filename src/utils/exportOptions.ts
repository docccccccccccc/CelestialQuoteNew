import { useCelQuoteOptionsStore } from '@/stores/celQuoteOptionsStore'
import { useBase64 } from '@vueuse/core'
import { ElMessage } from 'element-plus'
const celQuoteOptionsFormValue = useCelQuoteOptionsStore().value

export const exportOptionsTo = (to: 'clipboard' | 'file') => {
  const { base64 } = useBase64(celQuoteOptionsFormValue, { dataUrl: false })
  const exportedOptionsText = `CelestialQuoteOptionDataFormatVersion2${base64.value}EndOfCelestialQuoteOptionData` // 这里模仿的就是 AD 的存档格式

  // 导出到剪贴板
  if (to === 'clipboard') {
    navigator.clipboard
      .writeText(exportedOptionsText)
      .then(() => {
        ElMessage.success('成功复制选项到剪贴板！')
      })
      .catch((e) => {
        ElMessage.error('复制失败！打开控制台查看详细信息')
        console.error('复制时出错', e)
      })
  }

  if (to === 'file') {
    // 先创建一个文字 Blob（当然不是 AD 里面表情那个 Blob）
    const optionsBlob = new Blob([exportedOptionsText], { type: 'text/plain' })

    // 然后是一个链接
    const downloadLink = document.createElement('a')

    // 然后把链接定到刚刚的 Blob
    downloadLink.href = URL.createObjectURL(optionsBlob)

    // 然后设置文件名，这里学 AD 用时间 + 日期了
    const today = new Date()
    downloadLink.download = `CelQuoteData_${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate() + 1}_${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}.txt`

    // 点一下（没错没放到页面上也能点，模拟点击操作）
    downloadLink.click()

    // 最后释放 URL 对象，点完就跑（
    setTimeout(() => {
      URL.revokeObjectURL(downloadLink.href)
    }, 100)
  }
}
