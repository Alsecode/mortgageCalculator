import { createStore } from 'vuex'

const store = createStore({
  state: {
    purposeOptions: [
      { label: 'Квартира на вторичном рынке', data: 'от 24.9%', value: 'secondary_apart' },
      { label: 'Квартира в новостройке', data: 'от 6%', value: 'new_apart' },
      { label: 'Купить дом', data: 'от 6%', value: 'buy_house' },
      { label: 'Построить дом', data: 'от 6%', value: 'build_house' },
      { label: 'Купить землю или дачный дом', data: 'от 25.2%', value: 'buy_land' },
      { label: 'Рефинансирование', data: 'от 6%', value: 'refinancing' },
      { label: 'Гараж, машино-место или кладовая', data: 'от 6%', value: 'garage' },
      { label: 'Наличные под залог жилья', data: 'от 6%', value: 'cash' },
      { label: 'Коммерческая недвижимость', data: 'от 6%', value: 'commertial' },
    ],
    selectedPurpose: 'secondary_apart',
    tarifs: [
      { name: 'Базовая', percent: 24.9, id: 1 },
      { name: 'Военная', percent: 23.6, id: 2 },
      { name: 'Без первого взноса', percent: 25.7, id: 3 },
    ],
    selectedTarif: 'Базовая',
    isSberSalary: false,
    minPropertyValue: 334000,
    maxPropertyValue: 100000000,
    propertyValue: 100000000,
    initialPayment: 100000000 * 0.101,
    isUseMaternityCapital: false,
    minMaternityCapital: 0,
    maternityCapital: 833024,
    personalFunds: 100000000 * 0.101 - 833024,
    maxLoanAge: 30,
    minLoanAge: 1,
    loanAge: 30,
  },
  getters: {
    minInitialPayment: (state) => state.propertyValue * 0.101,
    maxInitialPayment: (state) =>
      state.propertyValue < 1000000 ? state.propertyValue * 0.101 : state.propertyValue * 0.997,
    paymentPercentage: (state) => (state.initialPayment / state.propertyValue) * 100,
    maxMaternityCapital: (state) => state.propertyValue * 0.997,
    minPersonalFunds: (state, getters) => getters.minInitialPayment - state.maternityCapital,
    maxPersonalFunds: (state, getters) => {
      if (state.maternityCapital + getters.maxPersonalFunds >= state.propertyValue * 0.997) {
        return 0
      }
        return state.propertyValue * 0.997 - state.maternityCapital
    },
    loanAmount: (state) => {
      if (state.isUseMaternityCapital) {
        return state.propertyValue - state.maternityCapital - state.personalFunds
      } else {
        return state.propertyValue - state.initialPayment
      }
    },
    monthlyPayment: (state, getters) => {
      const rate = store.getters.interestRate / 12 / 100
      const months = state.loanAge * 12
      return getters.loanAmount * (rate / (1 - Math.pow(1 + rate, -months)))
    },
    resultItems: (state, getters) => [
      { name: 'Процентная ставка', value: getters.interestRate, id: 1, measure: 'percent' },
      { name: 'Ежемесячный платёж', value: getters.monthlyPayment, id: 2, measure: 'rubles' },
      { name: 'Сумма кредита', value: getters.loanAmount, id: 3, measure: 'rubles' },
    ],
    interestRate: (state) => {
      let baseRate
      switch (state.selectedTarif) {
        case 'Базовая':
          baseRate = 27.2
          break
        case 'Военная':
          baseRate = 26.5
          break
        case 'Без первого взноса':
          baseRate = 27
          break
        default:
          baseRate = 27.2
      }
      return state.isSberSalary ? baseRate - 0.5 : baseRate
    },
  },
  mutations: {
    SET_SELECTED_PURPOSE(state, payload) {
      state.selectedPurpose = payload
    },
    SET_SELECTED_TARIF(state, payload) {
      state.selectedTarif = payload
    },
    SET_IS_SBER_SALARY(state, payload) {
      state.isSberSalary = payload
    },
    SET_PROPERTY_VALUE(state, payload) {
      state.propertyValue = payload

      const minInitialPayment = state.propertyValue * 0.101
      const maxInitialPayment = state.propertyValue < 1000000
        ? state.propertyValue * 0.101
        : state.propertyValue * 0.997
    
      if (state.initialPayment < minInitialPayment) {
        state.initialPayment = minInitialPayment
      } else if (state.initialPayment > maxInitialPayment) {
        state.initialPayment = maxInitialPayment
      }
    
      const maxMaternityCapital = state.propertyValue * 0.997
      if (state.maternityCapital > maxMaternityCapital) {
        state.maternityCapital = maxMaternityCapital
      }
    
      state.personalFunds = state.initialPayment - (state.isUseMaternityCapital ? state.maternityCapital : 0)
      if (state.personalFunds < 0) {
        state.personalFunds = 0
      }
    },
    SET_INITIAL_PAYMENT(state, payload) {
      const minInitialPayment = state.propertyValue * 0.101
      const maxInitialPayment = state.propertyValue < 1000000
        ? state.propertyValue * 0.101
        : state.propertyValue * 0.997
    
      state.initialPayment = Math.max(minInitialPayment, Math.min(payload, maxInitialPayment))
      state.personalFunds = state.initialPayment - state.maternityCapital
      if (state.personalFunds < 0) {
        state.personalFunds = 0
      }
    },
    SET_IS_USE_MATERNITY_CAPITAL(state, payload) {
      state.isUseMaternityCapital = payload
    },
    SET_MATERNITY_CAPITAL(state, payload) {
      const maxMaternityCapital = state.propertyValue * 0.997
      const newMaternityCapital = Math.min(payload, maxMaternityCapital)
    
      if (newMaternityCapital <= state.maternityCapital) {
        state.maternityCapital = newMaternityCapital
        state.personalFunds = 0
      } else {
        state.maternityCapital = newMaternityCapital
        state.personalFunds = state.initialPayment - state.maternityCapital
        if (state.personalFunds < 0) {
          state.personalFunds = 0
        }
      }
    },
    SET_PERSONAL_FUNDS(state, payload) {
      if (state.propertyValue * 0.997 <= state.maternityCapital + payload) {
        state.personalFunds = 0
      } else {
        state.personalFunds = payload
      }
    },
    SET_LOAN_AGE(state, payload) {
      state.loanAge = payload
    },
  },
  actions: {
    updateSelectedPurpose({ commit }, payload) {
      commit('SET_SELECTED_PURPOSE', payload)
    },
    updateSelectedTarif({ commit }, payload) {
      commit('SET_SELECTED_TARIF', payload)
    },
    updateIsSberSalary({ commit }, payload) {
      commit('SET_IS_SBER_SALARY', payload)
    },
    updatePropertyValue({ commit }, payload) {
      commit('SET_PROPERTY_VALUE', payload)
    },
    updateInitialPayment({ commit }, payload) {
      commit('SET_INITIAL_PAYMENT', payload)
    },
    updateIsUseMaternityCapital({ commit }, payload) {
      commit('SET_IS_USE_MATERNITY_CAPITAL', payload)
    },
    updateMaternityCapital({ commit }, payload) {
      commit('SET_MATERNITY_CAPITAL', payload)
    },
    updatePersonalFunds({ commit }, payload) {
      commit('SET_PERSONAL_FUNDS', payload)
    },
    updateLoanAge({ commit }, payload) {
      commit('SET_LOAN_AGE', payload)
    },
  },
})

export default store