<script setup lang="ts">
// Element Plus 配置
import { zhCn } from 'element-plus/es/locales.mjs'

import CelQuoteOptionsForm from './components/CelQuoteOptionsForm.vue'
import ColorSchemeSwitch from './components/ColorSchemeSwitch.vue'
import CelestialQuote from './components/CelestialQuote.vue'

import { useCelQuoteOptionsStore } from '@/stores/celQuoteOptionsStore'
const celQuoteOptionsFormValue = useCelQuoteOptionsStore().value
</script>

<template>
  <el-config-provider :locale="zhCn">
    <div class="celquoteoptions-wrapper" v-show="!celQuoteOptionsFormValue.generated">
      <el-card class="celquoteoptions-card">
        <template #header>
          <header class="celquoteoptions-header">
            <el-text size="large" tag="h1">天神语录生成器</el-text>
            <ColorSchemeSwitch />
          </header>
        </template>
        <main class="celquoteoptions-main">
          <CelQuoteOptionsForm />
          <el-button @click="celQuoteOptionsFormValue.generated = true" type="primary"
            >生成</el-button
          >
        </main>
        <template #footer>
          <el-text size="large">
            本应用使用了 MiSans 字体和 MonospaceTypewriter 字体。请注意，对于 MonospaceTypewriter
            字体，由于字体本身的许可证要求，应用本身并未提供。
            如果你需要此字体以获得更还原的视觉体验，请自行下载并安装此字体。
          </el-text>
        </template>
      </el-card>
    </div>
    <CelestialQuote v-if="celQuoteOptionsFormValue.generated" />
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
