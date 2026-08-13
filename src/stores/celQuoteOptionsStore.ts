import { DEFAULT_CEL_QUOTE_OPTIONS } from '@/consts/defaultOptions'
import { reactive } from 'vue'

export enum InnerButtons {
  Left = 'left',
  Right = 'right',
  Confirm = 'confirm',
}

export enum OuterButtons {
  Left = 'left',
  Right = 'right',
  Up = 'up',
  Down = 'down',
}

// 定义语录生成选项的接口
export interface CelQuoteOptionsFormInterface {
  name: string
  color: string
  content: string
  bgType: 'symbol' | 'icon' | 'img'
  bg: {
    symbol: string
    img: string
    icon: string
  }
  buttons: {
    position: 'inner' | 'outer'
    inner?: InnerButtons[]
    outer?: OuterButtons[]
  }
  generated: boolean
}

export const useCelQuoteOptionsStore = () => {
  const value = reactive<CelQuoteOptionsFormInterface>(DEFAULT_CEL_QUOTE_OPTIONS)

  return { value }
}
