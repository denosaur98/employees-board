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
          <div class="item__dropdown" @click="toggleDropDown('nationality')">
            <p>{{ store.state.nationalitySelected }}</p>
            <img src="../assets/images/arrow.svg" class="title__arrow">
          </div>
          <ul class="dropdown__points" v-if="isNationalityOpen">
            <li class="point" v-for="nationality in store.state.countryData" :key="nationality" @click="toggleDropDownSelected('nationality', nationality)">{{ nationality }}</li>
          </ul>
        </div>
        <div class="dropdown__item">
          <h1 class="item__title">Пол</h1>
          <div class="item__dropdown" @click="toggleDropDown('gender')">
            <p>{{ store.state.genderSelected }}</p>
            <img src="../assets/images/arrow.svg" class="title__arrow">
          </div>
          <ul class="dropdown__points" v-if="isGenderOpen">
            <li class="point" v-for="gender in store.state.genderData" :key="gender" @click="toggleDropDownSelected('gender', gender)">{{ gender }}</li>
          </ul>
        </div>
      </div>
      <div class="list__dropdown">
        <div class="dropdown__item" style="width: 100%;">
          <h1 class="item__title">Должность</h1>
          <div class="item__dropdown" @click="toggleDropDown('position')">
            <p>{{ store.state.positionSelected }}</p>
            <img src="../assets/images/arrow.svg" class="title__arrow">
          </div>
          <ul class="dropdown__points" v-if="isPositionOpen" style="width: 527px;">
            <li class="point" v-for="position in store.state.positionData" :key="position" @click="toggleDropDownSelected('position', position)">{{ position }}</li>
          </ul>
        </div>
      </div>
      <div class="list__dropdown">
        <div class="dropdown__item" style="width: 100%;">
          <h1 class="item__title">Тип договора</h1>
          <div class="item__checkbox">
            <div class="checkbox" @click="toggleCheckbox('td')">
              <img src="../assets/images/arrow.svg" class="checkbox__arrow" v-if="tdChecked">
            </div>
            <p>ТД</p>
          </div>
          <div class="item__checkbox">
            <div class="checkbox" @click="toggleCheckbox('gph')">
              <img src="../assets/images/arrow.svg" class="checkbox__arrow" v-if="gphChecked">
            </div>
            <p>ГПХ</p>
          </div>
          <div class="item__checkbox">
            <div class="checkbox" @click="toggleCheckbox('smz')">
              <img src="../assets/images/arrow.svg" class="checkbox__arrow" v-if="smzChecked">
            </div>
            <p>СМЗ</p>
          </div>
          <div class="item__checkbox">
            <div class="checkbox" @click="toggleCheckbox('candidate')">
              <img src="../assets/images/arrow.svg" class="checkbox__arrow" v-if="candidateChecked">
            </div>
            <p>Кандидат</p>
          </div>
        </div>
      </div>
      <div class="list__button">
        <button class="button__btn button__submit" @click="filterEmployees">Применить</button>
        <button class="button__btn button__clear" @click="clearFilters">Очистить</button>
      </div>
    </div>
    <EmployeeModal v-if="store.state.isModalOpen"/>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import EmployeeModal from './EmployeeModal.vue';
import store from './../store/index';

const isNationalityOpen = ref(false)
const isGenderOpen = ref(false)
const isPositionOpen = ref(false)
function toggleDropDown(dropdown) {
  if(dropdown === 'nationality') {
    isNationalityOpen.value = !isNationalityOpen.value
    isGenderOpen.value = false
    isPositionOpen.value = false
  } else if(dropdown === 'gender') {
    isGenderOpen.value = !isGenderOpen.value
    isNationalityOpen.value = false
    isPositionOpen.value = false
  } else {
    isPositionOpen.value = !isPositionOpen.value
    isNationalityOpen.value = false
    isGenderOpen.value = false
  }
}
function closeDropdowns(e) {
  if(!e.target.closest('.dropdown__item')) {
    isNationalityOpen.value = false
    isGenderOpen.value = false
    isPositionOpen.value = false
  }
}

function toggleDropDownSelected(dropdown, value) {
  if(dropdown === 'nationality') {
    store.commit('SET_NATIONALITY_SELECTED', value)
    isNationalityOpen.value = false
  } else if(dropdown === 'gender') {
    store.commit('SET_GENDER_SELECTED', value)
    isGenderOpen.value = false
  } else if(dropdown === 'position') {
    store.commit('SET_POSITION_SELECTED', value)
    isPositionOpen.value = false
  }
}
const tdChecked = computed(() => store.state.tdChecked)
const gphChecked = computed(() => store.state.gphChecked)
const smzChecked = computed(() => store.state.smzChecked)
const candidateChecked = computed(() => store.state.candidateChecked)
function toggleCheckbox(checkbox) {
  if(checkbox === 'td') {
    store.commit('SET_TD_CHECKED', !tdChecked.value)
  } else if(checkbox === 'gph') {
    store.commit('SET_GPH_CHECKED', !gphChecked.value)
  } else if(checkbox === 'smz') {
    store.commit('SET_SMZ_CHECKED', !smzChecked.value)
  } else {
    store.commit('SET_CANDIDATE_CHECKED', !candidateChecked.value)
  }
}

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
  height: 100%;

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

        .item__title {
          font-family: 'MontserratBold';
          color: rgb(4, 20, 35);
          font-size: 15px;
          font-weight: 500;
          line-height: 120%;
        }

        .item__dropdown {
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 12px 16px;
          border: none;
          border-radius: 4px;
          background: rgb(232, 241, 244);
          margin-top: 10px;

          p {
            color: rgb(132, 144, 155);
            font-size: 15px;
            font-weight: 400;
            line-height: 120%;
          }

          .dropdown__arrow {
            width: 10px;
            height: 10px;
          }
        }

        .dropdown__points {
          display: flex;
          flex-direction: column;
          width: 254px;
          box-shadow: 1px 1px 10px 1px rgb(132, 144, 155);
          background: #fff;
          position: absolute;
          list-style-type: none;
          min-height: 29px;
          margin-top: 75px;
          border-radius: 5px;
          overflow: hidden;

          .point {
            cursor: pointer;
            width: 100%;
            padding: 5px;

            &:hover {
              background: rgb(232, 241, 244);
            }
          }
        }

        .item__checkbox {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 10px;

          .checkbox {
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 20px;
            height: 20px;
            border: 1px solid rgb(220, 220, 220);
            border-radius: 4px;
            background: rgb(255, 255, 255);

            .checkbox__arrow {
              width: 70%;
              height: 70%;
            }
          }
        }
      }

      &:last-child {
        border-bottom: 1px solid rgb(219, 228, 237);
        padding-bottom: 20px;
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