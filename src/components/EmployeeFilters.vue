<template>
  <div class="employee__filters" @click="closeDropdowns">
    <div class="filters__add">
      <button class="add__btn" @click="openModal">Добавить нового сотрудника</button>
    </div>
    <div class="filters__list">
      <h1 class="list__title">Фильтр</h1>
      <div class="list__dropdown">
        <div class="dropdown__item">
          <h1 class="item__title">Гражданство</h1>
          <v-autocomplete label="Все страны" :items="store.state.countryData" variant="solo" density="comfortable"
            v-model="store.state.nationalitySelected" />
        </div>
        <div class="dropdown__item">
          <h1 class="item__title">Пол</h1>
          <v-autocomplete label="Без разницы" :items="store.state.genderData" variant="solo" density="comfortable"
            v-model="store.state.genderSelected" />
        </div>
      </div>
      <div class="list__dropdown">
        <div class="dropdown__item" style="width: 100%;">
          <h1 class="item__title">Должность</h1>
          <v-autocomplete label="Все должности " :items="store.state.positionData" variant="solo" density="comfortable"
            v-model="store.state.positionSelected" />
        </div>
      </div>
      <div class="list__dropdown">
        <div class="dropdown__item" style="width: 100%;">
          <h1 class="item__title">Тип договора</h1>
          <div class="item__checkbox">
            <v-checkbox label="ТД" v-model="store.state.tdChecked" />
            <v-checkbox label="ГПХ" v-model="store.state.gphChecked" />
            <v-checkbox label="СМЗ" v-model="store.state.smzChecked" />
            <v-checkbox label="Кандидат" v-model="store.state.candidateChecked" />
          </div>
        </div>
      </div>
      <div class="list__button">
        <button class="button__btn button__submit" @click="filterEmployees">Применить</button>
        <button class="button__btn button__clear" @click="clearFilters">Очистить</button>
      </div>
    </div>
    <EmployeeModal v-if="store.state.isModalOpen" />
  </div>
</template>

<script setup>
import EmployeeModal from './EmployeeModal.vue';
import store from './../store/index';

function filterEmployees() {
  store.dispatch('filterEmployees')
}
function clearFilters() {
  store.dispatch('clearFilters')
}
function openModal() {
  store.state.isModalOpen = !store.state.isModalOpen
}
</script>

<style lang="scss" scoped>
.employee__filters {
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 10px;
  width: 587px;
  height: 785px;

  .filters__add {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px;
    border-bottom: 1px solid rgb(219, 228, 237);

    .add__btn {
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      background: rgb(0, 182, 237);
      border: none;
      color: rgb(255, 255, 255);
      font-size: 20px;
      font-weight: 500;
      line-height: 120%;
      border-radius: 4px;
      box-shadow: 0px 10px 20px 0px rgba(0, 182, 237, 0.2);
      background: rgb(0, 182, 237);
      width: 100%;
      height: 68px;
    }
  }

  .filters__list {
    display: flex;
    flex-direction: column;
    padding: 30px;

    .list__title {
      font-family: 'MontserratBold';
      color: rgb(4, 20, 35);
      font-size: 26px;
      font-weight: 600;
      line-height: 120%;
    }

    .list__dropdown {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      margin-top: 20px;

      .dropdown__item {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        width: 254px;
        gap: 10px;

        .item__title {
          font-family: 'MontserratBold';
          color: rgb(4, 20, 35);
          font-size: 15px;
          font-weight: 500;
          line-height: 120%;
        }

        .item__checkbox {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          border-bottom: 1px solid rgb(219, 228, 237);
          padding-bottom: 20px;
        }
      }
    }

    .list__button {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      margin-top: 30px;
      gap: 20px;

      .button__btn {
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 14px 24px;
        border-radius: 4px;
        background: none;
        color: rgb(255, 255, 255);
        font-size: 15px;
        font-weight: 500;
        line-height: 120%;
        border: none;
        width: 100%;
      }

      .button__submit {background: rgb(0, 174, 91); box-shadow: 0px 10px 20px 0px rgba(0, 174, 91, 0.2);}
      .button__clear {background: rgb(132, 144, 155); box-shadow: 0px 10px 20px 0px rgba(106, 117, 128, 0.2);}
    }
  }
}
</style>