<template>
  <div class="employee__item" v-for="employee in props.searchedItems">
    <div class="item__titles">
      <a href="#" class="titles__name">{{ employee.surname }} {{ employee.name }} {{ employee.patronymic }}</a>
      <div class="titles__inn">ИНН {{ employee.inn }}</div>
      <div class="titles__status">
        <div class="status__icon">{{ employee.type_contract }}</div>
        <p class="status__title">{{ employee.position }}</p>
      </div>
    </div>
    <div class="item__description">
      <a href="#" class="description__link">
        <img :src="employee.flag">
        <p>{{ employee.country }} {{ employee.country_id }}</p>
      </a>
      <a href="#" class="description__link">г. {{ employee.address }}</a>
      <a href="#" class="description__link">Дата рождения: {{ employee.date_birth }}</a>
      <a href="#" class="description__link">Возраст: {{ employee.age }} {{ getYearWord(employee.age) }}</a>
      <a href="#" class="description__link">Пол: {{ employee.gender }}</a>
    </div>
    <div class="item__status" :class="getStatusClass(employee.description_cause)">{{ employee.description_cause }}</div>
  </div>
</template>

<script setup>
import { defineProps, watch } from 'vue';

const props = defineProps(['searchedItems'])
watch(() => {
  return props.searchedItems
})

function getStatusClass(description) {
  switch(description) {
    case 'Истекают все документы':
      return 'status__red'
    case 'Истекает патент':
      return 'status__yellow'
    case 'Пропустил медосмотр':
      return 'status__blue'
    case 'Прошел все процедуры':
      return 'status__green'
    default:
      return ''
  }
}

function getYearWord(age) {
  const lastDigit = age % 10
  const lastTwoDigits = age % 100
  if(lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return 'лет'
  } else if(lastDigit === 1) {
    return 'год'
  } else if(lastDigit >= 2 && lastDigit <= 4) {
    return 'года'
  } else {
    return 'лет'
  }
}
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}
.employee__item {
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  background: rgb(231, 243, 255);
  padding: 25px;
  min-height: 150px;

  .item__titles {
    display: flex;
    align-items: center;
    gap: 25px;

    .titles__name {
      color: rgb(42, 53, 140);
      font-size: 18px;
      font-weight: 600;
      line-height: 120%;
    }

    .titles__inn {
      border-radius: 4px;
      background: rgb(255, 255, 255);
      color: rgb(132, 144, 155);
      font-size: 13px;
      font-weight: 500;
      line-height: 120%;
      padding: 4px 8px;
    }

    .titles__status {
      display: flex;
      align-items: center;
      gap: 10px;

      .status__icon {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 4px;
        border-radius: 4px;
        background: rgb(0, 174, 91);
        color: rgb(255, 255, 255);
        font-size: 13px;
        font-weight: 600;
        line-height: 120%;
        text-transform: uppercase;
      }

      .status__title {
        color: rgb(4, 20, 35);
        font-size: 14px;
        font-weight: 400;
        line-height: 120%;
      }
    }
  }

  .item__description {
    display: flex;
    align-items: center;
    margin-top: 16px;
    
    .description__link {
      display: flex;
      align-items: center;
      gap: 15px;
      color: rgb(4, 20, 35);
      font-size: 14px;
      font-weight: 400;
      line-height: 130%;
      border-right: 1px solid rgb(206, 218, 230);
      padding-right: 15px;
      padding-left: 15px;
      min-width: 180px;

      &:first-child {
        padding-left: 0;
      }

      &:last-child {
        border-right: none;
      }
    }
  }

  .item__status {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 4px 8px;
    border-radius: 4px;
    color: rgb(255, 255, 255);
    font-size: 14px;
    font-weight: 500;
    line-height: 120%;
    margin-top: auto;
  }

  .status__red {background: rgb(229, 46, 46); width: 200px;}
  .status__yellow {background: rgb(226, 189, 6); width: 136px;}
  .status__blue {background: rgb(0, 182, 237); width: 184px;}
  .status__green {background: rgb(0, 174, 91); width: 195px;}
}
</style>