<template>
  <div class="employee__list">
    <div class="list__search">
      <input class="search" placeholder="Поиск сотрудника" v-model="searchItems">
      <p class="search__prompt">Например: Иванов Иван</p>
    </div>
    <div class="list__items">
      <h1 class="items__title">Список сотрудников</h1>
      <div class="items__buttons">
        <button class="buttons__filter grey" @click="setFilterType(null)">Весь список</button>
        <button class="buttons__filter yellow" @click="setFilterType('Проблемные')">Проблемные</button>
        <button class="buttons__filter red" @click="setFilterType('Критические')">Критические</button>
        <button class="buttons__filter blue" @click="setFilterType('Есть замечания')">Есть замечания</button>
        <button class="buttons__filter green" @click="setFilterType('Выполнено')">Выполнено</button>
      </div>
      <EmployeeItem :searchedItems="visibleSearchedItems"/>
    </div>
    <div class="list__show-more" v-if="showMoreButton">
      <button class="show-more" @click="showMoreEmployees">Показать еще</button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import EmployeeItem from './EmployeeItem.vue';
import store from '../store/index';

const searchItems = ref('')
const visibleItemCount = ref(4)
const searchedItems = computed(() => {
  const filterType = store.state.filterType
  return store.state.employees.filter(item => {
      if (filterType && item.type !== filterType) return false
      return item.surname.toLowerCase().includes(searchItems.value.toLowerCase()) || item.name.toLowerCase().includes(searchItems.value.toLowerCase()) || item.patronymic.toLowerCase().includes(searchItems.value.toLowerCase())}).slice(0, visibleItemCount.value)
})

const visibleSearchedItems = computed(() => searchedItems.value)
function setFilterType(type) {
  store.commit('setFilterType', type)
}

const showMoreButton = computed(() => visibleSearchedItems.value.length < store.state.employees.length)
function showMoreEmployees() {
  visibleItemCount.value += 4
}
</script>

<style lang="scss" scoped>
.employee__list {
  display: flex;
  flex-direction: column;
  background: #fff;
  width: 1203px;
  height: 100%;

  .list__search {
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid rgb(219, 228, 237);
    padding: 30px;
    gap: 10px;

    .search {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      padding: 12px 16px 12px 16px;
      border-radius: 4px;
      background: rgb(232, 241, 244);
      border: none;
      outline: none;
      color: rgb(132, 144, 155);
      font-size: 15px;
      line-height: 120%;
    }

    .search__prompt {
      color: rgb(176, 188, 199);
      font-size: 13px;
      font-weight: 400;
      line-height: 120%;
    }
  }

  .list__items {
    display: flex;
    flex-direction: column;
    padding: 40px 30px;
    gap: 15px;

    .items__title {
      font-family: 'MontserratBold';
      color: rgb(4, 20, 35);
      font-size: 26px;
      font-weight: 600;
      line-height: 120%;
    }

    .items__buttons {
      display: flex;
      gap: 10px;
      align-items: center;
      margin-top: 20px;
      margin-bottom: 20px;

      .buttons__filter {
        cursor: pointer;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 8px 15px;
        font-size: 14px;
        font-weight: 400;
        line-height: 120%;
        background: none;
        border: none;
        border-radius: 30px;
      }

      .grey {
        background: rgb(176, 188, 199);
        color: #fff;
      }
      .yellow {
        border-bottom: 1px solid rgb(226, 189, 6);
        border-top: 1px solid rgb(226, 189, 6);
        background: rgb(255, 253, 241);
        color: rgb(226, 189, 6);
      }
      .red {
        border-bottom: 1px solid rgb(229, 46, 46);
        border-top: 1px solid rgb(229, 46, 46);
        background: rgb(255, 248, 248);
        color: rgb(229, 46, 46);
      }
      .blue {
        border-bottom: 1px solid rgb(0, 182, 237);
        border-top: 1px solid rgb(0, 182, 237);
        background: rgb(243, 252, 255);
        color: rgb(0, 182, 237);
      }
      .green {
        border-bottom: 1px solid rgb(0, 174, 91);
        border-top: 1px solid rgb(0, 174, 91);
        background: rgb(242, 255, 249);
        color: rgb(0, 174, 91);
      }
    }
  }

  .list__show-more {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;

    .show-more {
      cursor: pointer;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      padding: 14px 24px;
      border: 1px solid rgb(42, 53, 140);
      border-radius: 4px;
      box-shadow: 0px 10px 20px 0px rgba(42, 53, 140, 0.2);
      background: none;
      width: 186px;
      color: rgb(42, 53, 140);
      font-size: 15px;
      font-weight: 500;
      line-height: 120%;
      font-family: 'MontserratBold';
    }
  }
}
</style>