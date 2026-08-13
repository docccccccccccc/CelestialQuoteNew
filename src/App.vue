<script setup lang="ts">
// Element Plus 配置
import { zhCn } from 'element-plus/es/locales.mjs'
import { ref } from 'vue'

import CelQuoteOptionsForm from './components/CelQuoteOptionsForm.vue'
import ColorSchemeSwitch from './components/ColorSchemeSwitch.vue'
import CelestialQuote from './components/CelestialQuote.vue'
import LegalInfoMain from './components/LegalInfoMain.vue'

import { useCelQuoteOptionsStore } from '@/stores/celQuoteOptionsStore'
import { exportOptionsTo } from './utils/exportOptions.ts'
import { importOptionsFrom } from './utils/importOptions.ts'
const celQuoteOptionsFormValue = useCelQuoteOptionsStore().value
const legalInfoVisible = ref<boolean>(false)
</script>

<template>
  <el-config-provider :locale="zhCn">
    <div class="celquoteoptions-wrapper" v-show="!celQuoteOptionsFormValue.generated">
      <el-card class="celquoteoptions-card">
        <template #header>
          <header class="celquoteoptions-header use-space-between">
            <el-text size="large" tag="h1">天神语录生成器</el-text>
            <ColorSchemeSwitch />
          </header>
        </template>
        <main class="celquoteoptions-main">
          <CelQuoteOptionsForm />
          <div class="use-space-between">
            <div>
              <el-button-group>
                <el-button @click="celQuoteOptionsFormValue.generated = true"> 生成 </el-button>
                <el-button @click="exportOptionsTo('clipboard')"> 导出到剪贴板 </el-button>
                <el-button @click="exportOptionsTo('file')"> 导出到文件 </el-button>
              </el-button-group>
            </div>
            <div>
              <el-button-group>
                <el-button @click="importOptionsFrom('clipboard')"> 从剪贴板导入 </el-button>
                <el-button @click="importOptionsFrom('file')"> 从文件导入 </el-button>
              </el-button-group>
            </div>
          </div>
        </main>
        <template #footer>
          <el-space spacer="|">
            <el-text>Made by doctypehtml</el-text>
            <el-link href="https://space.bilibili.com/3546694681626801">
              <font-awesome-icon icon="fab fa-bilibili" />
            </el-link>
            <el-link href="https://github.com/docccccccccccc/">
              <font-awesome-icon icon="fab fa-github" />
            </el-link>
            <el-link href="https://github.com/docccccccccccc/CelestialQuoteNew">仓库链接</el-link>
            <el-link href="https://doclovecelquotes-old.netlify.app">旧版生成器链接</el-link>
            <el-button link @click="legalInfoVisible = true">法律信息</el-button>
          </el-space>
        </template>
      </el-card>
    </div>
    <CelestialQuote v-if="celQuoteOptionsFormValue.generated" />
    <el-drawer direction="btt" size="50%" v-model="legalInfoVisible">
      <template #header>法律信息</template>
      <LegalInfoMain />
      <template #footer>
        <el-button @click="legalInfoVisible = false">我知道了</el-button>
      </template>
    </el-drawer>
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

  .use-space-between {
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
