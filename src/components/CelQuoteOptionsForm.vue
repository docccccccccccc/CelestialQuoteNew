<script setup lang="ts">
// 颜色预设和符号预设
import { PREDEFINE_COLORS } from '@/consts/predefineColors'
import { SYMBOLS_FOR_BG } from '@/consts/bgPresets'

// 表单值的 Store
import { useCelQuoteOptionsStore } from '@/stores/celQuoteOptionsStore'
const celQuoteOptionsFormValue = useCelQuoteOptionsStore().value

import { ElMessage } from 'element-plus'
import {
  formatListForAcceptProp,
  formatListTextForTooltip,
  ACCEPTED_BG_IMG_FORMATS,
} from '@/consts/acceptedBgImgFormats'
import ApplySymbolPresetBtn from './ApplySymbolPresetBtn.vue'

import { onMounted, ref } from 'vue'
const imgUploaderElement = ref<HTMLInputElement>()

onMounted(() => {
  imgUploaderElement.value = document.getElementById('img-uploader') as HTMLInputElement

  imgUploaderElement?.value.addEventListener('change', (event) => {
    const target = event.target as HTMLInputElement
    // 这里判断一下是否有文件
    if (target.files && target.files.length > 0) {
      const imgFile = target.files[0] as File

      // 检测图片格式是否被允许
      const imgFileFormatIsValid = ACCEPTED_BG_IMG_FORMATS.some(
        // 每个都测一遍
        (format) => imgFile.name.toUpperCase().endsWith(`.${format}`),
      )
      const imgFileSizeIsValid = imgFile.size <= 512000 // 大小也要注意

      if (imgFileFormatIsValid && imgFileSizeIsValid) {
        const reader = new FileReader()

        reader.addEventListener('load', () => {
          try {
            // 死了都要 try~
            // 其实是怕发生意外情况，try 的话如果 catch 到错误了好处理
            celQuoteOptionsFormValue.bg.img = reader.result as string
          } catch (error) {
            console.log('上传时出错了：', error)
            ElMessage.error('出错了，打开控制台查看详细信息')
          }
        })

        reader.addEventListener('error', (error) => {
          console.log('出错了：', error)
          ElMessage.error('出错了，打开控制台查看详细信息')
        })

        reader.readAsDataURL(imgFile)
      } else {
        if (!imgFileFormatIsValid) {
          ElMessage.error('文件格式错误！')
        }
        if (!imgFileSizeIsValid) {
          ElMessage.error(
            `文件过大！（${Math.floor((imgFile.size / 1024) * 100) / 100} KB ≥ 500 KB）`,
          ) // 这里取个整
        }
      }
    }
  })
})
const handleUpload = () => {
  if (imgUploaderElement.value) {
    imgUploaderElement.value.value = '' // 清空（什么鬼两个 .value）（其实第一个 value 是元素的 ref ，第二个 value 是元素本身的 value）
    imgUploaderElement.value?.click() // 点一下
  }
}
</script>

<template>
  <el-form>
    <el-form-item label="天神名称">
      <el-input v-model="celQuoteOptionsFormValue.name" />
    </el-form-item>
    <el-form-item label="天神主题色">
      <el-color-picker v-model="celQuoteOptionsFormValue.color" :predefine="PREDEFINE_COLORS" />
    </el-form-item>
    <el-form-item label="语录内容">
      <el-input
        type="textarea"
        maxlength="308"
        :rows="6"
        v-model="celQuoteOptionsFormValue.content"
        show-word-limit
        resize="none"
      />
    </el-form-item>
    <el-form-item label="背景类型">
      <el-radio-group v-model="celQuoteOptionsFormValue.bgType">
        <el-radio-button label="字符" value="symbol" />
        <el-radio-button label="Font Awesome 图标" value="icon" />
        <el-radio-button label="图片" value="img" />
      </el-radio-group>
    </el-form-item>
    <el-form-item v-show="celQuoteOptionsFormValue.bgType === 'symbol'" label="字符（仅支持单个）">
      <el-input maxlength="1" v-model="celQuoteOptionsFormValue.bg.symbol" />
    </el-form-item>
    <el-form-item v-show="celQuoteOptionsFormValue.bgType === 'symbol'" label="字符预设-天神">
      <el-space wrap>
        <ApplySymbolPresetBtn
          v-for="celSymbol in SYMBOLS_FOR_BG.cels"
          :key="celSymbol"
          :applied-symbol="celSymbol"
        />
      </el-space>
    </el-form-item>
    <el-form-item v-show="celQuoteOptionsFormValue.bgType === 'symbol'" label="字符预设-符文">
      <el-space wrap>
        <ApplySymbolPresetBtn
          v-for="glyphSymbol in SYMBOLS_FOR_BG.glyphs"
          :key="glyphSymbol"
          :applied-symbol="glyphSymbol"
        />
      </el-space>
    </el-form-item>
    <el-form-item v-show="celQuoteOptionsFormValue.bgType === 'symbol'" label="字符预设-符文炼金">
      <el-space wrap>
        <ApplySymbolPresetBtn
          v-for="resSymbol in SYMBOLS_FOR_BG.alchemyRes"
          :key="resSymbol"
          :applied-symbol="resSymbol"
        />
      </el-space>
    </el-form-item>
    <el-form-item v-show="celQuoteOptionsFormValue.bgType === 'icon'" label="Font Awesome 图标类名">
      <el-input
        maxlength="100"
        v-model="celQuoteOptionsFormValue.bg.icon"
        placeholder="输入类名，注意仅支持免费图标"
      />
    </el-form-item>
    <el-form-item v-show="celQuoteOptionsFormValue.bgType === 'img'" label="图片">
      <el-tooltip placement="right">
        <template #content>
          允许大小 500 KB 以下的 {{ formatListTextForTooltip }} 图片，
          <br />
          注意，比例非 1:1 的图片会被拉伸
        </template>
        <el-button type="primary" @click="handleUpload">上传文件</el-button>
      </el-tooltip>
      <!-- Element Plus 的上传组件我不会用喵，所以把原生上传拉进来了 -->
      <input
        type="file"
        style="display: none"
        id="img-uploader"
        :accept="formatListForAcceptProp"
      />
    </el-form-item>
    <el-form-item v-show="celQuoteOptionsFormValue.bgType === 'img'" label="图片预览">
      <el-text v-if="celQuoteOptionsFormValue.bg.img === ''">无图片</el-text>
      <el-image v-else :src="celQuoteOptionsFormValue.bg.img" style="width: 160px; height: 160px" />
    </el-form-item>
    <el-form-item label="按钮位置">
      <el-radio-group v-model="celQuoteOptionsFormValue.buttons.position">
        <el-radio-button label="外侧" value="outer" />
        <el-radio-button label="内侧" value="inner" />
      </el-radio-group>
    </el-form-item>
    <el-form-item
      label="外侧按钮选项"
      v-show="celQuoteOptionsFormValue.buttons.position === 'outer'"
    >
      <el-checkbox-group v-model="celQuoteOptionsFormValue.buttons.outer">
        <el-checkbox label="左侧按钮" value="left" />
        <el-checkbox label="右侧按钮" value="right" />
        <el-checkbox label="上方按钮" value="up" />
        <el-checkbox label="下方按钮" value="down" />
      </el-checkbox-group>
    </el-form-item>
    <el-form-item
      label="内侧按钮选项"
      v-show="celQuoteOptionsFormValue.buttons.position === 'inner'"
    >
      <el-checkbox-group v-model="celQuoteOptionsFormValue.buttons.inner">
        <el-checkbox label="左侧按钮" value="left" />
        <el-checkbox label="右侧按钮" value="right" />
        <el-checkbox label="确认按钮" value="confirm" />
      </el-checkbox-group>
    </el-form-item>
  </el-form>
</template>
