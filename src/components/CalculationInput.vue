<template>
  <div class="calculation">
    <InputNumber v-model="internalValue" :label="label" :isLabelColored="true" :min="min" :max="max" :data="data" :disabled="disabled" />
    <SliderCommon v-model="internalValue" :min="min" :max="max" class="calculation__slider" :disabled="disabled" :data="sliderData" />
  </div>
</template>

<script setup>
import { computed } from 'vue'

import InputNumber from './UI/InputNumber.vue'
import SliderCommon from './UI/SliderCommon.vue'

// modelValue, лэйбл, минимальное значение, максимальное значение, доп данные для инпута, доп данные для слайдера, disabled или нет
const props = defineProps({
  modelValue: {
    type: Number,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  min: {
    type: Number,
    required: true,
  },
  max: {
    type: Number,
    required: true,
  },
  data: {
    type: [Number, String],
    required: false,
  },
  sliderData: {
    type: String,
    required: false,
  },
  disabled: {
    type: Boolean,
    required: false,
  }
})

const emit = defineEmits(['update:modelValue'])

// Внутреннее значение для изменения
const internalValue = computed({
  get: () => props.modelValue,
  set: (newValue) => emit('update:modelValue', Number(newValue)),
})
</script>

<style scoped>
.calculation__slider {
  padding: 10px;
  margin-top: -23px;
  z-index: 100;
}
</style>