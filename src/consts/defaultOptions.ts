import { type CelQuoteOptionsForm } from '@/stores/celQuoteOptionsStore'

export const DEFAULT_CEL_QUOTE_OPTIONS: CelQuoteOptionsForm = {
  name: 'Teresa',
  color: '#5151EC',
  content: 'We have been observing you.',
  bgType: 'symbol',
  bg: {
    symbol: 'Ϟ',
    img: '',
    icon: '',
  },
  buttons: {
    position: 'outer',
  },
}
