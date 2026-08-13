<script setup lang="ts">
// Element Plus 配置
import { zhCn } from 'element-plus/es/locales.mjs'

import CelQuoteOptionsForm from './components/CelQuoteOptionsForm.vue'
import ColorSchemeSwitch from './components/ColorSchemeSwitch.vue'
</script>

<template>
  <el-config-provider :locale="zhCn">
    <div class="celquoteoptions-wrapper">
      <el-card class="celquoteoptions-card">
        <template #header>
          <header class="celquoteoptions-header">
            <el-text size="large" tag="h1">天神语录生成器</el-text>
            <ColorSchemeSwitch />
          </header>
        </template>
        <main class="celquoteoptions-main">
          <CelQuoteOptionsForm />
        </main>
        <template #footer>
          <el-text size="large">本应用使用了 MiSans 字体 </el-text>
        </template>
      </el-card>
    </div>
  </el-config-provider>
</template>

<style scoped lang="scss">
.celquoteoptions-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 100svh;
  .celquoteoptions-card {
    max-width: 1080px;
  }

  .celquoteoptions-header {
    display: flex;
    justify-content: space-between;
  }

  .celquoteoptions-main {
    overflow: hidden;
  }
}

@media screen and (min-width: 720px) {
  .celquoteoptions-card {
    min-width: 720px;
  }
}

@media screen and (max-width: 720px) {
  .celquoteoptions-card {
    min-width: 100%;
    max-width: 100%;
    width: 100%;
    height: 100%;
  }
}
</style>
