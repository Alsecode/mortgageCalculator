<template>
  <button class="tarif" :class="{'tarif--selected': isSelected}" @click="selectTarif">
    {{ name }} <span class="tarif__percent">от {{ percent }}%</span>
  </button>
</template>

<script setup>
import { computed } from 'vue';

// ModelValue для изменения, название тарифа, процентная ставка
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  percent: {
    type: Number,
    required: true,
  }
})

const emit = defineEmits(['update:modelValue'])

// Выбран ли тариф
const isSelected = computed(() => props.name === props.modelValue)

// Функция выбора тарифа
const selectTarif = () => {
  emit('update:modelValue', props.name)
}
</script>

<style scoped>
.tarif {
  height: 40px;
  padding: 0 12px;
  outline: 1px solid var(--oslo-gray);
  border-radius: 8px;
  background: var(--white);
  transition: background-color 0.2s ease;
  font-weight: 500;
}

.tarif--selected {
  outline: 2px solid var(--picton-blue);
}

.tarif:hover {
  background: var(--fog);
}

.tarif__percent {
  color: var(--picton-blue);
  font-weight: 500;
}
</style>