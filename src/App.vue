<template>
  <main class="main">
    <MortgageCalculation />
    <MortgageResult />
  </main>
</template>

<script setup>
import MortgageResult from './components/MortgageResult.vue'
import MortgageCalculation from './components/MortgageCalculation.vue'
</script>

<style>
body {
  font-size: 14px;
	font-family: "Montserrat", sans-serif;
  color: var(--big-stone);
}

:root {
  --picton-blue: #24ADED;
  --denim: #108EC9;
  --white: #FFFFFF;
  --zircon: #F3F6FF;
  --fog: #DAE3FF;
  --athens-gray: #F0F1F4;
  --geyser: #E0E4E7;
  --loblolly: #C2C9D2;
  --oslo-gray: #93989D;
  --regent-gray: #8593A5;
  --slate-gray: #738295;
  --big-stone: #15203D;
}

@font-face {
  font-family: "Montserrat";
  src: url("./assets/fonts/Montserrat/Montserrat-Regular.ttf"), Verdana, sans-serif;
}

@font-face {
  font-family: "Montserrat";
  src: url("./assets/fonts/Montserrat/Montserrat-Medium.ttf"), Verdana, sans-serif;
  font-weight: 500;
}

@font-face {
  font-family: "Montserrat";
  src: url(".//assets/fonts/Montserrat/Montserrat-SemiBold.ttf"), Verdana, sans-serif;
  font-weight: 600;
}

@font-face {
  font-family: "Montserrat";
  src: url("./assets/fonts/Montserrat/Montserrat-Bold.ttf"), Verdana, sans-serif;
  font-weight: 700;
}

.main {
  width: 100%;
  max-width: 1300px;
  margin: 30px auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 50px;
}

@media screen and (max-width: 800px) {
  .main {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}
</style>
