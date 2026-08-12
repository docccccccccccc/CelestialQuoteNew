<script setup lang="ts">
import { toggleDark, currentSchemeForFAIcon } from '@/utils/useDarkMode'
</script>

<template>
  <div class="celquoteoptions-wrapper">
    <el-card>
      <template #header>
        <header class="celquoteoptions-header">
          <el-text size="large" tag="h1">天神语录生成器</el-text>
          <div>
            <el-tooltip placement="bottom-end" effect="dark" content="切换颜色模式">
              <el-button circle @click="toggleDark()">
                <font-awesome-icon :icon="currentSchemeForFAIcon" />
              </el-button>
            </el-tooltip>
          </div>
        </header>
      </template>
      <main class="celquoteoptions-main">
        <el-text>
          1234 Test 测试
          loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong
        </el-text>
      </main>
      <template #footer> <el-text size="large">本应用使用了 MiSans 字体</el-text> </template>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.celquoteoptions-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 100svh;
  .el-card {
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

@media screen and (max-width: 720px) {
  .el-card {
    width: 100%;
    height: 100%;
  }
}
</style>
