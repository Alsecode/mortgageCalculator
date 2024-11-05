<template>
  <div class="select" v-click-outside="closeDropdown">
    <div class="select__selected-option" @click.stop="toggleDropdown">
      <div class="select__selected-option-info">
        <label class="select__main-label">{{ label }}</label>
        <span class="select__value">{{ selectedOption.label }}</span>
      </div>

      <div :class="['select__dropdown-icon', { 'select__dropdown-icon--open': isOpen }]">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="16px" height="16px" viewBox="0 0 16 16">
          <path d="M3.41 5.3A1 1 0 0 0 2 6.7L7.3 12a1 1 0 0 0 1.4 0L14 6.7a1 1 0 0 0-1.41-1.4L8.35 9.52a.5.5 0 0 1-.7 0L3.4 5.29z">
          </path>
        </svg>
      </div>
    </div>

    <div v-if="isOpen" class="select__dropdown">
      <div
        v-for="option in options"
        :key="option.value"
        :class="['select__dropdown-option', { 'select__dropdown-option--selected': option.value === modelValue }]"
        @click="selectOption(option)"
      >
        <span>{{ option.label }}</span>
        <span v-if="option.data" class="select__dropwond-option-meta">{{ option.data }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

// Лэйбл для селекта, опции селекта, modelValue
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  options: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

// Открыт ли селект
const isOpen = ref(false)

// Вычисляемое свойство для выбранного варианта на основе modelValue
const selectedOption = computed(() => {
  return props.options.find(option => option.value === props.modelValue) || {}
})

// Обработка открытия/закрытия селекта
const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

// Обработка закрытия селекта для клика снаружи
const closeDropdown = () => {
  isOpen.value = false
}

// Функция для выбора варианта
const selectOption = (option) => {
  // Обновление значения в родителе
  emit('update:modelValue', option.value)
}

// Наблюдение за изменениями modelValue
watch(() => props.modelValue, () => {
  toggleDropdown()
})

// Директива для закрытия селекта по клику снаружи
const vClickOutside = {
  beforeMount(el, binding) {
    el.clickOutsideEvent = function (event) {
      // Проверка местоположения элемента
      if (!(el === event.target || el.contains(event.target))) {
        // Вызываем метод после срабатывания клика снаружи
        binding.value(event)
      }
    };
    // Добавляем обработчик нажатия
    document.addEventListener("click", el.clickOutsideEvent)
  },
  unmounted(el) {
    // Удаляем обработчик при размонтировании
    document.removeEventListener("click", el.clickOutsideEvent)
  },
}

defineExpose({
  directives: {
    'click-outside': vClickOutside
  }
})
</script>

<style scoped>
.select {
  position: relative;
}

.select__selected-option {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  padding: 8px 16px;
  width: 100%;
  transition: 0.2s all ease;
  border-radius: 8px;
  cursor: pointer;
  background-color: var(--zircon);
  height: 56px;
}

.select__selected-option:hover {
  background: var(--fog);
}

.select__selected-option:hover .select__dropdown-icon {
  color: var(--big-stone);
}

.select__selected-option-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-weight: 500;
}

.select__main-label {
  font-size: 12px;
  color: var(--slate-gray);
  letter-spacing: -0.3px;
}

.select__value {
  letter-spacing: 0.3px;
}

.select__dropdown-icon {
  transition: 0.5s all ease;
  color: var(--slate-gray);
}

.select__dropdown-icon {
  width: 16px;
  height: 16px;
}

.select__dropdown-icon--open {
  transform: rotate(180deg);
}

.select__dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: var(--white);
  border-radius: 8px;
  margin-top: 5px;
  max-height: 265px;
  overflow-y: auto;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.05);
  z-index: 10;
  transition: 0.2s all ease;
}

.select__dropdown-option {
  padding: 16px;
  height: 48px;
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: 0.2s all ease;
}

.select__dropdown-option:hover {
  background: var(--athens-gray);
}

.select__dropdown-option--selected, .select__dropdown-option--selected:hover {
  background: var(--geyser);
}

.select__dropwond-option-meta {
  color: var(--picton-blue);
  font-size: 14px;
  font-weight: 500;
}

.select__dropdown-option--selected .select__dropwond-option-meta {
  color: var(--white);
}
</style>