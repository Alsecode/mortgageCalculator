<template>
  <div class="input" :class="{'input--disabled': disabled}">
    <div class="input__content">
      <label class="input__label">{{ label }}</label>
      <input
        v-model="displayValue"
        @input="onInput"
        @blur="onBlur"
        class="input__control"
        inputmode="numeric"
        :disabled="disabled"
      />
    </div>
    <div v-if="data" class="input__data" :class="{'input__data--colored': isLabelColored}">{{ data }}</div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

// modelValue для обновления, лэйбл, нужен ли цвет лэйблу, минимальное значение, максимальное значение, шаг (опционален), доп данные (опционально)
const props = defineProps({
  modelValue: {
    type: Number,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  isLabelColored: {
    type: Boolean,
    required: false,
    default: false,
  },
  min: {
    type: Number,
    required: false,
  },
  max: {
    type: Number,
    required: false,
  },
  data: {
    type: [Number, String],
    required: false,
  },
  disabled: {
    type: Boolean,
    required: false,
  }
})

const emit = defineEmits(['update:modelValue'])

// Функция форматирования числа
const formatNumber = (value) => {
  if (value === null || value === undefined || isNaN(value)) return ''
  return new Intl.NumberFormat('ru-RU').format(value)
}

// Функция для парсинга числа из строки
const parseNumber = (value) => {
  // Убираем пробелы и преобразуем в число
  return Number(value.replace(/\D/g, ''))
}

// Локальная переменная для отображаемого значения
const displayValue = ref(formatNumber(props.modelValue))

// Отслеживание изменения modelValue
watch(() => props.modelValue, (newValue) => {
  displayValue.value = formatNumber(newValue)
})

// Обработчик события input
const onInput = (event) => {
  const rawValue = event.target.value

  // Форматирование отображаемого значения
  displayValue.value = formatNumber(parseNumber(rawValue))

  // Приведение к числу и отправка родителю
  const numericValue = parseNumber(rawValue)
  emit('update:modelValue', numericValue)
}

// Обработчик события blur
const onBlur = () => {
  let numericValue = parseNumber(displayValue.value)

  // Если меньше минимума или больше максимума, приведение к корректному значению
  if (numericValue < props.min) {
    numericValue = props.min
  }
  if (numericValue > props.max) {
    numericValue = props.max
  }

  // Обновление displayValue с отформатированным значением
  displayValue.value = formatNumber(numericValue)
}
</script>

<style scoped>
.input {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
  width: 100%;
  background-color: var(--zircon);
  padding: 8px 16px;
  border-radius: 8px;
  height: 54px;
  transition: 0.2s all ease;
  font-weight: 500;
  font-size: 16px;
}

.input:hover {
  background-color: var(--fog);
}

.input--disabled {
  opacity: 0.5;
}

.input--disabled:hover {
  background-color: var(--zircon);
}

.input:focus-within {
  background-color: var(--white);
  border: 1px solid var(--fog);
}

.input__content {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 16px;
  flex: 1;
  transition: 0.2s all ease;
  cursor: text;
}

.input__data {
  color: var(--slate-gray);
}

.input__data--colored {
  color: var(--picton-blue);
}

.input__label {
  font-size: 12px;
  color: var(--slate-gray);
  letter-spacing: -0.3px;
  cursor: text;
}

.input__control {
  letter-spacing: 0.3px;
  font-weight: 500;
}
</style>