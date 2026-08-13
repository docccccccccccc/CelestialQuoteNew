import {
  InnerButtons,
  OuterButtons,
  useCelQuoteOptionsStore,
  type CelQuoteOptionsFormInterface,
} from '@/stores/celQuoteOptionsStore'
import { ElMessageBox, ElMessage } from 'element-plus'
import { toByteArray } from 'base64-js'
import { OPTIONS_DATA_FORMAT, IMPORTED_OPTION_COMPAT_REGEXP } from '@/consts/optionsDataFormat'
const celQuoteOptionsFormValue = useCelQuoteOptionsStore().value

const readFromClipboard = async () => {
  const { value } = await ElMessageBox.prompt('将选项文本粘贴到下面的输入框中', '从剪贴板导入', {
    confirmButtonText: '导入',
    cancelButtonText: '取消导入',
    inputPattern: IMPORTED_OPTION_COMPAT_REGEXP,
    inputErrorMessage: '不合法的格式或文件已损坏！',
  })
  return value
}

const readFromFile = async () => {
  const fileContent = await new Promise<string>((resolve, reject) => {
    // 先创建一个输入元素
    const importBtn = document.createElement('input')

    // 然后设置类型为文件，设置接受的文件类型为 TXT
    importBtn.type = 'file'
    importBtn.accept = '.txt'

    importBtn.addEventListener(
      'change',
      async (event: Event) => {
        const target = event.target as HTMLInputElement

        // 这里判断一下是否有文件
        if (target.files && target.files.length > 0) {
          try {
            const text = await (async (file: File | undefined): Promise<string> => {
              return new Promise((resolve, reject) => {
                if (!file) {
                  reject('无文件！')
                } else {
                  const reader = new FileReader()
                  reader.onload = () => resolve(reader.result as string)
                  reader.onerror = () => reject(reader.error)
                  reader.readAsText(file)
                }
              })
            })(target.files[0])

            if (IMPORTED_OPTION_COMPAT_REGEXP.test(text)) {
              resolve(text)
            } else {
              ElMessage.error('不合法的格式或文件已损坏！')
              reject(new Error('不合法的格式或文件已损坏！'))
            }
          } catch (error) {
            console.log('上传时出错了：', error)
            ElMessage.error('出错了，打开控制台查看详细信息')
            reject(error)
          } finally {
            importBtn.remove()
          }
        }
      },
      { once: true },
    )

    importBtn.click()
  })

  return fileContent
}
export const importOptionsFrom = async (from: 'clipboard' | 'file') => {
  let importedOptions: string = ''

  // 先读取
  if (from === 'clipboard') {
    // 从剪贴板读取
    importedOptions = await readFromClipboard()
  } else {
    // 剩下的当然是从文件读取喵~
    importedOptions = await readFromFile()
  }

  if (!importedOptions) return

  // 可以后续处理了

  // 如果是新版数据
  if (importedOptions.startsWith(OPTIONS_DATA_FORMAT.PREFIX)) {
    // 切出 Base 64 部分
    const cutCelQuoteBase64 = importedOptions.slice(
      OPTIONS_DATA_FORMAT.PREFIX.length,
      -OPTIONS_DATA_FORMAT.SUFFIX.length,
    )

    // 为什么要 try 呢
    // 因为可能有损坏的数据
    try {
      // 然后先创建一个 decoder 用来解码
      const decoder = new TextDecoder()

      // 得到一个 UInt8Array
      const uInt8ArrayOfOptionsData = toByteArray(cutCelQuoteBase64)

      // 再拿 decoder 解码这个 UInt8Array
      const celQuoteOptionsJSON = decoder.decode(uInt8ArrayOfOptionsData)

      // 接下来就是解析得到的 JSON
      // （我前面明明已经在 exportOptions.ts 里对导出的数据 JSON.stringify 了的说~）
      const parsedCelQuoteOptions = JSON.parse(celQuoteOptionsJSON)

      // 新版的话只要对得上直接 Object.assign
      Object.assign(celQuoteOptionsFormValue, parsedCelQuoteOptions)
      ElMessage.success('导入成功！')
    } catch (error) {
      console.error('解码时出错了：', error)
      ElMessage.error('解码出错！导入的数据可能损坏')
    }
  } else {
    // 如果是旧版数据
    const cutCelQuoteBase64 = importedOptions.slice(
      OPTIONS_DATA_FORMAT.PREFIX_OLD.length,
      -OPTIONS_DATA_FORMAT.SUFFIX.length,
    )

    try {
      // 然后先创建一个 decoder 用来解码
      const decoder = new TextDecoder()

      // 得到一个 UInt8Array
      const uInt8ArrayOfOptionsData = toByteArray(cutCelQuoteBase64)

      // 再拿 decoder 解码这个 UInt8Array
      const celQuoteOptionsJSON = decoder.decode(uInt8ArrayOfOptionsData)

      // 接下来就是解析得到的 JSON
      // （我前面明明已经在 exportOptions.ts 里对导出的数据 JSON.stringify 了的说~）
      const parsedCelQuoteOptions = JSON.parse(celQuoteOptionsJSON)

      // 旧版的需要做点转换
      // 首先是转换按钮信息，这个很麻烦
      const oldCelQuoteBtnOptions: {
        inner: InnerButtons[]
        outer: OuterButtons[]
      } = {
        inner: [],
        outer: [],
      }

      // 内部按钮的信息转换
      if (parsedCelQuoteOptions.button.inner.celleftbtninner) {
        oldCelQuoteBtnOptions.inner.push(InnerButtons.Left)
      }
      if (parsedCelQuoteOptions.button.inner.celrightbtninner) {
        oldCelQuoteBtnOptions.inner.push(InnerButtons.Right)
      }
      if (parsedCelQuoteOptions.button.inner.celokbtn) {
        oldCelQuoteBtnOptions.inner.push(InnerButtons.Confirm)
      }

      // 外部按钮的信息转换
      if (parsedCelQuoteOptions.button.outer.celupbtn) {
        oldCelQuoteBtnOptions.outer.push(OuterButtons.Up)
      }
      if (parsedCelQuoteOptions.button.outer.celdownbtn) {
        oldCelQuoteBtnOptions.outer.push(OuterButtons.Down)
      }
      if (parsedCelQuoteOptions.button.outer.celleftbtn) {
        oldCelQuoteBtnOptions.outer.push(OuterButtons.Left)
      }
      if (parsedCelQuoteOptions.button.outer.celrightbtn) {
        oldCelQuoteBtnOptions.outer.push(OuterButtons.Right)
      }

      const convertedCelQuoteOptions: CelQuoteOptionsFormInterface = {
        name: parsedCelQuoteOptions.content.celname,
        color: parsedCelQuoteOptions.style.celcolor,
        content: parsedCelQuoteOptions.content.celquote,
        bgType: parsedCelQuoteOptions.style.celcharbg ? 'symbol' : 'img',
        bg: {
          symbol: parsedCelQuoteOptions.style.celchar,
          img: parsedCelQuoteOptions.style.celimguri,
          icon: '',
        },
        buttons: {
          position: parsedCelQuoteOptions.button.celinner ? 'inner' : 'outer',
          ...oldCelQuoteBtnOptions,
        },
        generated: false,
      }

      Object.assign(celQuoteOptionsFormValue, convertedCelQuoteOptions)
      ElMessage.success('导入成功！')
    } catch (error) {
      console.error('解码时出错了：', error)
      ElMessage.error('解码出错！导入的数据可能损坏')
    }
  }
}
