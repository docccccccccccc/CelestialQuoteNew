<script setup lang="ts">
// 颜色模式切换
import { useDark, useToggle } from '@vueuse/core'

// VueUse 文档是这么写的
const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <div>
    <el-tooltip placement="bottom-end" effect="dark" content="切换颜色模式">
      <el-button circle @click="toggleDark()">
        <font-awesome-icon :icon="isDark ? 'fas fa-moon' : 'fas fa-sun'" />
      </el-button>
    </el-tooltip>
  </div>
</template>
