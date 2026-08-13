// 所有支持的文件格式
export const ACCEPTED_BG_IMG_FORMATS: string[] = ['PNG', 'JPG', 'WEBP', 'GIF', 'JPEG']

// 给用户看到的提示用的
export const formatListTextForTooltip = ACCEPTED_BG_IMG_FORMATS.join('、')

// 给 input 的 accept 用的
export const formatListForAcceptProp = ACCEPTED_BG_IMG_FORMATS.map(
  (format) => `.${format.toLowerCase()}`,
) // 先转成小写，得到形如 .xxx 的格式
  .join(',') // 再合在一起
