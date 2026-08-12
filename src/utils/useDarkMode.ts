import { useDark, useToggle } from '@vueuse/core'
import { computed } from 'vue'

// VueUse 文档是这么写的
const isDark = useDark()
export const toggleDark = useToggle(isDark)

// 深浅色模式对应的图标
export const currentSchemeForFAIcon = computed(() => {
  return isDark ? 'fas fa-moon' : 'fas fa-sun'
})
