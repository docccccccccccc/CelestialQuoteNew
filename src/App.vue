<script setup lang="ts"></script>

<template>
  <div class="celquoteoptions-wrapper">
    <el-card>
      <template #header> <el-text size="large">天神语录生成器</el-text> </template>
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
