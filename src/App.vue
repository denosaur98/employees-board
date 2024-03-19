<template>
  <v-app>
    <v-main class="home__page">
      <EmployeeList/>
      <EmployeeFilters/>
      <BaseDropdown/>
    </v-main>
  </v-app>
</template>

<script setup>
import EmployeeList from './components/EmployeeList.vue';
import EmployeeFilters from './components/EmployeeFilters.vue';
import BaseDropdown from './components/base/BaseDropdown.vue'
</script>

<style lang="scss" scoped>
.home__page {
  display: flex;
  justify-content: space-between;
  height: 100%;
  min-height: 100vh;
  padding: 41px;
  background: rgb(247, 248, 249);
  color: #000;
}
</style>