<script setup lang="ts">
const props = defineProps<{
  appliedSymbol: string
}>()

import { useCelQuoteOptionsStore } from '@/stores/celQuoteOptionsStore'
const celQuoteOptionsFormValue = useCelQuoteOptionsStore().value

const applyPreset = () => {
  celQuoteOptionsFormValue.bg.symbol = props.appliedSymbol
}
</script>

<template>
  <el-button plain @click="applyPreset">{{ appliedSymbol }}</el-button>
</template>
