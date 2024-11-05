<template>
  <div class="result-info">
    <span class="result-info__name">{{ name }}</span>
    <span class="result-info__value">{{ measure === 'rubles' ? numberToRubles(value) : numberToPercent(value) }}</span>
  </div>
</template>

<script setup>
import { numberToRubles, numberToPercent } from '../js/formatFunctions';
// Название поля результата, значение, единица измерения
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: [Number, String],
    required: true,
  },
  measure: {
    type: String,
    required: true,
  }
})
</script>

<style scoped>
.result-info {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.result-info__name {
  color: var(--oslo-gray);
}

.result-info__value {
  font-size: 20px;
  font-weight: 600;
}
</style>