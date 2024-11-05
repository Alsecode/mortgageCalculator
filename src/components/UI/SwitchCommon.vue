<template>
  <label class="checkbox" :class="{ 'checkbox--checked': checked }">
    <span class="checkbox__label" v-if="label">{{ label }}</span>
    <div class="checkbox__switch">
      <input 
        type="checkbox" 
        class="checkbox__switch-input"
        v-model="checked"
      />
      <span class="checkbox__switch-slider"></span>
    </div>
  </label>
</template>

<script setup>
import { ref, watch } from 'vue'

// modelValue для изменения, лэйбл (опционален)
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    required: false,
  },
})

const emit = defineEmits(['update:modelValue'])

// Булевый флаг для отметки выбран или нет
const checked = ref(props.modelValue)

// Отслеживание изменений внутреннего состояния
watch(checked, (newVal) => {
  emit('update:modelValue', newVal)
})

// Синхронизация с внешними изменениями
watch(() => props.modelValue, (newVal) => {
  checked.value = newVal
})
</script>

<style scoped>
.checkbox {
  display: flex;
  align-items: center;
  gap: 25px;
  color: var(--oslo-gray);
  font-weight: 500;
}

.checkbox__switch {
  position: relative;
  width: 44px;
  height: 24px;
}

.checkbox__switch-input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.checkbox__switch-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--loblolly);
  border-radius: 1000px;
  transition: background-color 0.2s ease;
}

.checkbox__switch-slider::before {
  content: '';
  position: absolute;
  height: 18px;
  width: 18px;
  left: 2px;
  bottom: 3px;
  background-color: var(--white);
  border-radius: 50%;
  transition: transform 0.2s ease;
}

.checkbox__switch-slider:hover {
  background-color: var(--fog);
}

.checkbox--checked .checkbox__label {
  color: var(--picton-blue);
}

.checkbox--checked .checkbox__switch-slider {
  background-color: var(--picton-blue);
}

.checkbox--checked .checkbox__switch-slider::before {
  transform: translateX(20px);
}
</style>