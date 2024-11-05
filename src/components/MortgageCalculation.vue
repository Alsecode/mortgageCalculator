<template>
  <section class="calculation">
    <SelectCommon class="calculation__select" label="Цель кредита" :options="purposeOptions" v-model="selectedPurpose" />
    <div class="calculation__tarifs">
      <TarifOffer v-for="tarif in tarifs" :key="tarif.id" :name="tarif.name" :percent="tarif.percent" v-model="selectedTarif" />
    </div>
    <div class="calculation__sber-salary">
      <span class="calculation__sber-salary-label">Получаю зарплату на Сбер</span>
      <SwitchCommon label="- 0,5%" v-model="isSberSalary" />
    </div>
    <CalculationInput class="calculation__input" v-model="propertyValue" label="Стоимость недвижимости" :min="minPropertyValue" :max="maxPropertyValue" sliderData="₽" />
    <CalculationInput class="calculation__input" v-model="initialPayment" label="Первоначальный взнос" :data="numberToPercent(paymentPercentage)" :min="minInitialPayment"
      :max="maxInitialPayment" :disabled="isUseMaternityCapital" sliderData="₽" />
  
    <div class="calculation__maternity-capital">
      <div class="calculation__maternity-capital-switcher">
        <span>Использовать материнский капитал</span>
        <SwitchCommon v-model="isUseMaternityCapital" />
      </div>
      <div v-show="isUseMaternityCapital" class="calculation__maternity-capital-inputs">
        <InputNumber v-model="maternityCapital" label="Мат. капитал" :min="minMaternityCapital" :max="maxMaternityCapital" data="₽" />
        <InputNumber v-model="personalFunds" label="Личные средства" :min="minPersonalFunds" :max="maxPersonalFunds" data="₽" />
      </div>
    </div>

    <CalculationInput class="calculation__input" v-model="loanAge" label="Срок кредита" :min="minLoanAge" :max="maxLoanAge" />
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'

import InputNumber from './UI/InputNumber.vue'
import SelectCommon from './UI/SelectCommon.vue'
import SwitchCommon from './UI/SwitchCommon.vue'

import TarifOffer from './TarifOffer.vue'
import CalculationInput from './CalculationInput.vue'

import { numberToPercent } from '../js/formatFunctions'

const store = useStore()

// Массив целей для селекта целей
const purposeOptions = store.state.purposeOptions
// Выбранная цель
const selectedPurpose = ref(store.state.selectedPurpose)

// Доступные тарифы
const tarifs = store.state.tarifs
// Выбранный тариф
const selectedTarif = computed({
  get: () => store.state.selectedTarif,
  set: (value) => store.commit('SET_SELECTED_TARIF', value)
})

// Получение зарплаты в Сбере
const isSberSalary = computed({
  get: () => store.state.isSberSalary,
  set: (value) => store.commit('SET_IS_SBER_SALARY', value)
})

// Выбранная стоимость недвижимости
const propertyValue = computed({
  get: () => store.state.propertyValue,
  set: (value) => store.commit('SET_PROPERTY_VALUE', value),
});
// Минимальная стоимость недвижимости
const minPropertyValue = computed(() => store.state.minPropertyValue)
// Максимальная стоимость недвижимости
const maxPropertyValue = computed(() => store.state.maxPropertyValue)

// Выбранный первоначальный взнос
const initialPayment = computed({
  get: () => store.state.initialPayment,
  set: (value) => store.commit('SET_INITIAL_PAYMENT', value)
})
// Минимальный первоначальный взнос (не менее 10.1% от стоимости недвижимости)
const minInitialPayment = computed(() => store.getters.minInitialPayment)
// Максимальный первоначальный взнос (если меньше миллиона - то 10.1% от стоимости, если больше, то 99.7%)
const maxInitialPayment = computed(() => store.getters.maxInitialPayment)
// Процент взноса от общей стоимости недвижимости
const paymentPercentage = computed(() => store.getters.paymentPercentage)

// Использовать ли материнский капитал
const isUseMaternityCapital = computed({
  get: () => store.state.isUseMaternityCapital,
  set: (value) => store.commit('SET_IS_USE_MATERNITY_CAPITAL', value),
})
// Выбарнный материнский капитал
const maternityCapital = computed({
  get: () => store.state.maternityCapital,
  set: (value) => store.commit('SET_MATERNITY_CAPITAL', value)
})
// Минимальный материнский капитал
const minMaternityCapital = computed(() => store.state.minMaternityCapital)
// Максимальный материнский капитал
const maxMaternityCapital  = computed(() => store.getters.maxMaternityCapital)

// Выбранные личные средства
const personalFunds = computed({
  get: () => store.state.personalFunds,
  set: (value) => store.commit('SET_PERSONAL_FUNDS', value)
})
// Минимальные личные средства
const minPersonalFunds = computed(() => store.getters.minPersonalFunds)
// Максимальные личные средства
const maxPersonalFunds  = computed(() => store.getters.maxPersonalFunds)

// Выбранный срок кредита
const loanAge = computed({
  get: () => store.state.loanAge,
  set: (value) => store.commit('SET_LOAN_AGE', value)
})
// Минимальный срок кредита
const minLoanAge = computed(() => store.state.minLoanAge)
// Максимальный срок кредита
const maxLoanAge  = computed(() => store.state.maxLoanAge)
</script>

<style scoped>
.calculation__select {
  margin-bottom: 20px;
}

.calculation__tarifs {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 20px 0;
}

.calculation__sber-salary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 25px 0;
}

.calculation__sber-salary-label {
  font-weight: 500;
  letter-spacing: -0.3px
}

.calculation__input {
  margin: 20px 0;
}

.calculation__maternity-capital {
  margin: 30px 0;
}

.calculation__maternity-capital-switcher {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 500;
}

.calculation__maternity-capital-inputs {
  margin: 15px 0;
  display: flex;
  gap: 15px;
  width: 100%;
}
</style>