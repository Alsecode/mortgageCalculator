<template>
  <div class="slider" :class="{'slider--active': isActive, 'slider--disabled': disabled}" @mousedown="activateThumb" @mouseup="deactivateThumb">
    <input
      type="range"
      v-model="internalValue"
      :min="min"
      :max="max"
      class="slider__range"
      @input="handleInput"
      :disabled="disabled"
    />
    <div class="slider__values">
      <span v-if="data" class="slider__value slider__value--min">{{ numberToReadableRubles(min) }}</span>
      <span v-if="data" class="slider__value slider__value--max">{{ numberToReadableRubles(max) }}</span>
      <span v-if="!data" class="slider__value slider__value--min">{{ min }}</span>
      <span v-if="!data" class="slider__value slider__value--max">{{ max }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

import { numberToReadableRubles } from '../../js/formatFunctions';

// modelValue для изменения, минимум, максимум, disabled или нет, доп данные
const props = defineProps({
  modelValue: {
    type: Number,
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
  disabled: {
    type: Boolean,
    required: false,
  },
  data: {
    type: String,
    required: false,
  }
})

const emit = defineEmits(['update:modelValue'])

// Внутреннее значение modelValue
const internalValue = ref(props.modelValue)

// Отслеживание изменения состояния
watch(() => props.modelValue, (newVal) => {
    internalValue.value = newVal
  }
)

// Обработка изменения значения
const handleInput = () => {
  emit('update:modelValue', internalValue.value)
}

// Активен ли ползунок
const isActive = ref(false)
// Активировать
const activateThumb = () => {
  isActive.value = true
}
// Деактивировать
const deactivateThumb = () => {
  isActive.value = false
}
</script>

<style scoped>
.slider {
  width: 100%;
}

.slider--disabled {
  opacity: 0.5;
}

.slider__range {
  appearance: none;
  width: 100%;
  height: 1px;
  background: var(--loblolly);
  border-radius: 8px;
  outline: none;
  cursor: e-resize;
}

.slider__range::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 13px;
  height: 13px;
  background-color: var(--picton-blue);
  border: 2px solid var(--white);
  border-radius: 50%;
}

.slider--active .slider__range::-webkit-slider-thumb {
  box-shadow: 0 0 0 5px rgba(103, 168, 238, 0.4);
}

.slider--active .slider__range::-webkit-slider-thumb:active,
.slider--active .slider__range::-webkit-slider-thumb:focus {
  box-shadow: 0 0 0 5px rgba(81, 176, 205, 0.4);
}

.slider__values {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  font-size: 13px;
  color: var(--oslo-gray);
}

.slider__value--min, .slider__value--max {
  position: relative;
}

.slider__value::before {
  position: absolute;
  top: -8px;
  content: '';
  height: 7px;
  width: 2px;
  border-radius: 2px;
  background: var(--oslo-gray);
}

.slider__value--min::before {
  left: 0px;
}

.slider__value--max::before {
  right: 0px;
}
</style>