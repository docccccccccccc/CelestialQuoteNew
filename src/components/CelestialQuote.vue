<script setup lang="ts">
import { InnerButtons, useCelQuoteOptionsStore } from '@/stores/celQuoteOptionsStore'
import { computed, onMounted, ref, toRefs } from 'vue'
import { OuterButtons } from '@/stores/celQuoteOptionsStore'
import { useCssVar } from '@vueuse/core'

// 先扒出来整个配置
const celQuoteOptionsFormValue = useCelQuoteOptionsStore().value

const bgType = ref(celQuoteOptionsFormValue.bgType) // 对话框背景类型
const { symbol, img, icon } = toRefs(celQuoteOptionsFormValue.bg) // 符号、图片和 Font Awesome 图标
const celQuoteBtnPosition = ref(celQuoteOptionsFormValue.buttons.position) // 按钮位置

const celQuoteOuterBtn = computed(() => {
  // 外部按钮列表
  const outerBtns = celQuoteOptionsFormValue.buttons.outer
  const outerBtnsIsEnabled = celQuoteBtnPosition.value === 'outer'

  // 获取每个按钮的状态
  const left = outerBtns?.includes(OuterButtons.Left) && outerBtnsIsEnabled
  const right = outerBtns?.includes(OuterButtons.Right) && outerBtnsIsEnabled
  const up = outerBtns?.includes(OuterButtons.Up) && outerBtnsIsEnabled
  const down = outerBtns?.includes(OuterButtons.Down) && outerBtnsIsEnabled

  // 然后一并返回
  return { left, right, up, down }
})

// 如法炮制
const celQuoteInnerBtn = computed(() => {
  const innerBtns = celQuoteOptionsFormValue.buttons.inner
  const innerBtnsIsEnabled = celQuoteBtnPosition.value === 'inner'

  const left = innerBtns?.includes(InnerButtons.Left) && innerBtnsIsEnabled
  const right = innerBtns?.includes(InnerButtons.Right) && innerBtnsIsEnabled
  const confirm = innerBtns?.includes(InnerButtons.Confirm) && innerBtnsIsEnabled

  return { left, right, confirm }
})

onMounted(() => {
  const customColorCSSVar = useCssVar('--custom-color', document.body)
  customColorCSSVar.value = celQuoteOptionsFormValue.color
})
</script>

<template>
  <div class="celquote-container">
    <p style="text-align: center">
      你现在正在预览生成效果.
      <el-button type="primary" @click="celQuoteOptionsFormValue.generated = false">退出</el-button>
    </p>
    <span class="celquote-close" v-show="celQuoteBtnPosition === 'outer'">
      <font-awesome-icon icon="fas fa-circle-xmark" />
    </span>
    <div class="celquote-main">
      <span class="celquote-bg">
        <span class="celquote-bg-symbol custom-color" v-if="bgType === 'symbol'">{{ symbol }}</span>
        <img
          class="celquote-bg-img"
          width="200px"
          height="200px"
          :src="img"
          v-if="bgType === 'img'"
        />
        <!-- 以防有人不填类名 -->
        <font-awesome-icon
          :icon="icon !== '' ? icon : 'fas fa-question'"
          v-if="bgType === 'icon'"
          class="custom-color"
        />
      </span>
      <span class="celquote-shadow custom-color"> </span>
      <span class="celquote-content">
        <span class="cel-name custom-color">{{ celQuoteOptionsFormValue.name }}</span>
        <span
          class="celquote-inner-btn celquote-left-btn custom-color"
          v-show="celQuoteInnerBtn.left"
        >
          <font-awesome-icon icon="fas fa-chevron-circle-left" />
        </span>
        <p class="celquote custom-color">{{ celQuoteOptionsFormValue.content }}</p>
        <span
          class="celquote-inner-btn celquote-right-btn custom-color"
          v-show="celQuoteInnerBtn.right"
        >
          <font-awesome-icon icon="fas fa-chevron-circle-right" />
        </span>
        <span
          class="celquote-inner-btn celquote-confirm-btn custom-color"
          v-show="celQuoteInnerBtn.confirm"
        >
          <font-awesome-icon icon="fas fa-check-circle" />
        </span>
      </span>
    </div>
    <div>
      <span
        class="celquote-outer-btn celquote-outer-up-btn"
        :class="{ 'celquote-btn-disabled': !celQuoteOuterBtn.up }"
      >
        <font-awesome-icon icon="fas fa-chevron-circle-up" />
      </span>
      <span
        class="celquote-outer-btn celquote-outer-down-btn"
        :class="{ 'celquote-btn-disabled': !celQuoteOuterBtn.down }"
      >
        <font-awesome-icon icon="fas fa-chevron-circle-down" />
      </span>
      <span
        class="celquote-outer-btn celquote-outer-left-btn"
        :class="{ 'celquote-btn-disabled': !celQuoteOuterBtn.left }"
      >
        <font-awesome-icon icon="fas fa-chevron-circle-left" />
      </span>
      <span
        class="celquote-outer-btn celquote-outer-right-btn"
        :class="{ 'celquote-btn-disabled': !celQuoteOuterBtn.right }"
      >
        <font-awesome-icon icon="fas fa-chevron-circle-right" />
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.custom-color {
  color: var(--custom-color);
}

.celquote-container {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(30, 30, 50, 0.7);
  color: white;
  z-index: 9999;
}

.celquote-main {
  width: 300px;
  height: 300px;
  /* top: calc(0rem + 50vh); */
  /* transform: translate(-50%, -50%) scale(1); */
  opacity: 1;
  visibility: visible;
  z-index: 0;
  font-size: 14px;
  /* padding: 10px; */
  display: flex;
  position: absolute;
  align-items: center;
  flex-direction: row;
  top: 50vh;
  left: 50vw;
  justify-content: space-between;
  transform: translate(-50%, -50%) scale(1);
  background-color: rgb(0, 0, 0);
}

.celquote-bg {
  opacity: 0.2;
  z-index: 1;
  font-size: 250px;
  text-shadow: 0 0 2em;
  user-select: none;
}

.celquote-shadow {
  color: white;
  box-shadow:
    0 0 15px 1px var(--custom-color),
    inset 0 0 10px 1px var(--custom-color);
  opacity: 1;
}

.celquote-bg-symbol {
  font-size: 250px;
  opacity: 1;
  text-shadow: 0px 0px 20px;
}

.celquote {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  white-space: pre-line;
  text-align: center;
}

.celquote-main > span {
  width: 100%;
  height: 100%;
  left: 0px;
  justify-content: center;
  border-radius: 10px;
  display: flex;
  position: absolute;
  align-items: center;
}

.cel-name {
  position: absolute;
  top: 10px;
  right: 0px;
  left: 0px;
  font-weight: 700;
  text-align: center;
}

.celquote-inner-btn {
  font-size: 150%;
  cursor: pointer;
  margin: 5px;
}

.celquote-left-btn,
.celquote-right-btn {
  position: absolute;
}

.celquote-left-btn {
  left: 10px;
}

.celquote-right-btn {
  right: 10px;
}

.celquote-close {
  color: white;
  position: absolute;
  bottom: calc(50% + 160px);
  left: calc(50% + 160px);
  z-index: 1;
  font-size: 25px;
  cursor: pointer;
}

.celquote-outer-btn {
  color: white;
  position: absolute;
  z-index: 1;
  font-size: 25px;
  cursor: pointer;
}

.celquote-outer-up-btn {
  bottom: calc(50% + 160px);
  left: 50%;
  transform: translateX(-50%);
}

.celquote-outer-down-btn {
  top: calc(50% + 160px);
  left: 50%;
  transform: translateX(-50%);
}

.celquote-outer-left-btn {
  top: 50%;
  right: calc(50% + 160px);
  transform: translateY(-50%);
}

.celquote-outer-right-btn {
  top: 50%;
  left: calc(50% + 160px);
  transform: translateY(-50%);
}

.celquote-btn-disabled {
  opacity: 0.4;
  cursor: default;
}

.celquote-confirm-btn {
  position: absolute;
  bottom: 15px;
  left: calc(50% - 10px);
  font-size: 150%;
  cursor: pointer;
}
</style>
