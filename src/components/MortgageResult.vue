<template>
  <div class="mortgage-result">
    <div class="mortgage-result-blocks">
      <ResultInfoBlock class="mortgage-result-blocks-item" v-for="itemResult in resultItems" :key="itemResult.id" :name="itemResult.name"
        :value="itemResult.value" :measure="itemResult.measure" />
    </div>
    <ButtonCommon class="mortgage-result__button" @click="getApproval">
      <template v-slot>
        <span>Получить одобрение</span>
      </template>
    </ButtonCommon>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

import ResultInfoBlock from './ResultInfoBlock.vue'
import ButtonCommon from './UI/ButtonCommon.vue'

const store = useStore()

// Массив данных о результатах расчёта
const resultItems = computed(() => store.getters.resultItems)

// Функция для вывода в консоль данных
const getApproval = () => {
  const data = {
    interest_rate: store.getters.interestRate,
    loan_amount: store.getters.loanAmount,
    bank_customer: store.state.isSberSalary,
    loan_term: store.state.loanAge,
  };

  // Опциональные поля, зависящие от isUseMaternityCapital
  if (store.state.isUseMaternityCapital) {
    data.maternity_capital = store.state.maternityCapital
    data.personal_funds = store.state.personalFunds
  } else {
    data.initial_payment = store.state.initialPayment
  }

  console.log(data)
}
</script>

<style scoped>
.mortgage-result {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.mortgage-result-blocks {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.mortgage-result-blocks-item {
  width: calc(50% - 20px);
}

.mortgage-result__button {
  width: 100%;
}
</style>