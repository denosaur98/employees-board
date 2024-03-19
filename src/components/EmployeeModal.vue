<template>
  <div class="employee__modal" @click="closeDropdowns" v-if="store.state.isModalOpen">
    <div class="modal__form">
      <div class="form__item">
        <h1 class="item__title">Фио</h1>
        <input class="item__input" placeholder="Введите фамилию:" v-model="userSurname">
        <div class="form__short">
          <div class="form__item">
            <input class="item__input" placeholder="Введите имя:" v-model="userName">
          </div>
          <div class="form__item">
            <input class="item__input" placeholder="Введите отчество:" v-model="userPatronymic">
          </div>
        </div>
      </div>
      <div class="form__item">
        <h1 class="item__title">Дата рождения</h1>
        <input class="item__input short" ref="dateInput" placeholder="Введите дату:" @input="updateDateBirth"/>
      </div>
      <div class="form__short">
        <div class="form__item">
          <h1 class="item__title">Гражданство</h1>
          <div class="item__dropdown" @click="toggleDropDown('nationality')">
            <p>{{ nationalitySelected }}</p>
            <img src="../assets/images/arrow.svg" class="title__arrow">
          </div>
          <ul class="dropdown__points" v-if="isNationalityOpen">
            <li class="point" v-for="country in store.state.countryData" @click="selectedPoints('nationality', country)">{{ country }}</li>
          </ul>
        </div>
        <div class="form__item">
          <h1 class="item__title">Город</h1>
          <div class="item__dropdown" @click="toggleDropDown('address')">
            <p>{{ addressSelected }}</p>
            <img src="../assets/images/arrow.svg" class="title__arrow">
          </div>
          <ul class="dropdown__points" v-if="isAddressOpen">
            <li class="point" v-for="address in store.state.addressData" @click="selectedPoints('address', address)">{{ address }}</li>
          </ul>
        </div>
      </div>
      <div class="form__short">
        <div class="form__item">
          <h1 class="item__title">Пол</h1>
          <div class="item__dropdown" @click="toggleDropDown('gender')">
            <p>{{ genderSelected }}</p>
            <img src="../assets/images/arrow.svg" class="title__arrow">
          </div>
          <ul class="dropdown__points" v-if="isGenderOpen">
            <li class="point" v-for="gender in store.state.genderData" @click="selectedPoints('gender', gender)">{{ gender }}</li>
          </ul>
        </div>
        <div class="form__item">
          <h1 class="item__title">Должность</h1>
          <div class="item__dropdown" @click="toggleDropDown('position')">
            <p>{{ positionSelected }}</p>
            <img src="../assets/images/arrow.svg" class="title__arrow">
          </div>
          <ul class="dropdown__points" v-if="isPositionOpen">
            <li class="point" v-for="position in store.state.positionData" @click="selectedPoints('position', position)">{{ position }}</li>
          </ul>
        </div>
      </div>
      <div class="form__short">
        <div class="form__item">
          <h1 class="item__title">Документы</h1>
          <div class="item__dropdown" @click="toggleDropDown('type')">
            <p>{{ typeSelected }}</p>
            <img src="../assets/images/arrow.svg" class="title__arrow">
          </div>
          <ul class="dropdown__points" v-if="isTypeOpen">
            <li class="point" v-for="type in store.state.typeData" @click="selectedPoints('type', type)">{{ type }}</li>
          </ul>
        </div>
        <div class="form__item">
          <h1 class="item__title">Тип договора</h1>
          <div class="item__dropdown" @click="toggleDropDown('typeContract')">
            <p>{{ typeContractSelected }}</p>
            <img src="../assets/images/arrow.svg" class="title__arrow">
          </div>
          <ul class="dropdown__points" v-if="isTypeContractOpen">
            <li class="point" v-for="typeContract in store.state.typeСontractData" @click="selectedPoints('typeContract', typeContract)">{{ typeContract }}</li>
          </ul>
        </div>
      </div>
      <div class="form__item">
        <h1 class="item__title">Инн</h1>
        <input class="item__input" placeholder="Введите инн:" type="number" v-model="userInn">
      </div>
    </div>
    <button class="employee__add" :disabled="!pointsValidation" :class="{ 'employee__disabled': !pointsValidation }" @click="createUser">Добавить</button>
  </div>
  <div class="employee__overlay" v-if="store.state.isModalOpen" @click="closeModal"></div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import store from '../store/index';
import IMask from 'imask';
import rfFlag from '../assets/images/flag-rf.svg';
import tjFlag from '../assets/images/flag-tj.svg';
import uzFlag from '../assets/images/flag-uz.svg';

const dateInput = ref(null)
onMounted(() => {
  const maskOptions = {
    mask: Date,
    min: new Date(1950, 0, 1),
    max: new Date(),
    lazy: false,
    pattern: 'd.m.Y',
    placeholderChar: '_'
  }
  const mask = IMask(dateInput.value, maskOptions)
  watch(userDateBirth, (newValue) => {
    mask.value = newValue
  })

  let scrollPosition = 0
  scrollPosition = window.pageYOffset || document.documentElement.scrollTop
  document.body.style.overflow = 'hidden'
})
function updateDateBirth(event) {
  userDateBirth.value = event.target.value.slice(0, 10)
}

const isNationalityOpen = ref(false)
const isAddressOpen = ref(false)
const isGenderOpen = ref(false)
const isPositionOpen = ref(false)
const isTypeOpen = ref(false)
const isTypeContractOpen = ref(false)
function toggleDropDown(dropdown) {
  if(dropdown === 'nationality') {
    isNationalityOpen.value = !isNationalityOpen.value
    isGenderOpen.value = false
    isPositionOpen.value = false
    isTypeOpen.value = false
    isTypeContractOpen.value = false
    isAddressOpen.value = false
  } else if(dropdown === 'gender') {
    isGenderOpen.value = !isGenderOpen.value
    isNationalityOpen.value = false
    isPositionOpen.value = false
    isTypeOpen.value = false
    isTypeContractOpen.value = false
    isAddressOpen.value = false
  } else if(dropdown === 'position'){
    isPositionOpen.value = !isPositionOpen.value
    isNationalityOpen.value = false
    isGenderOpen.value = false
    isTypeOpen.value = false
    isTypeContractOpen.value = false
    isAddressOpen.value = false
  } else if(dropdown === 'type') {
    isTypeOpen.value = !isTypeOpen.value
    isNationalityOpen.value = false
    isGenderOpen.value = false
    isPositionOpen.value = false
    isTypeContractOpen.value = false
    isAddressOpen.value = false
  } else if(dropdown === 'typeContract') {
    isTypeContractOpen.value = !isTypeContractOpen.value
    isNationalityOpen.value = false
    isGenderOpen.value = false
    isPositionOpen.value = false
    isTypeOpen.value = false
    isAddressOpen.value = false
  } else {
    isAddressOpen.value = !isAddressOpen.value
    isTypeContractOpen.value = false
    isNationalityOpen.value = false
    isGenderOpen.value = false
    isPositionOpen.value = false
    isTypeOpen.value = false
  }
}
function closeDropdowns(e) {
  if(!e.target.closest('.item__dropdown')) {
    isNationalityOpen.value = false
    isGenderOpen.value = false
    isPositionOpen.value = false
    isTypeOpen.value = false
    isTypeContractOpen.value = false
    isAddressOpen.value = false
  }
}

const nationalitySelected = ref('Все страны')
const addressSelected = ref('Все города')
const genderSelected = ref('Без разницы')
const positionSelected = ref('Все должности')
const typeSelected = ref('Весь список')
const typeContractSelected = ref('Весь список')
function selectedPoints(dropdown, value) {
  if(dropdown === 'nationality') {
    nationalitySelected.value = value
  } else if(dropdown === 'gender') {
    genderSelected.value = value
  } else if(dropdown === 'position') {
    positionSelected.value = value
  } else if(dropdown === 'type') {
    typeSelected.value = value
  } else if(dropdown === 'typeContract') {
    typeContractSelected.value = value
  } else {
    addressSelected.value = value
  }
}

const userSurname = ref('')
const userName = ref('')
const userPatronymic = ref('')
const userDateBirth = ref('')
const userInn = ref('')
const pointsValidation = computed(() => {
  return (
    userSurname.value !== '' &&
    userName.value !== '' &&
    userPatronymic.value !== '' &&
    userDateBirth.value !== '' &&
    userInn.value !== '' &&
    nationalitySelected.value !== 'Все страны' &&
    addressSelected.value !== 'Все города' &&
    genderSelected.value !== 'Без разницы' &&
    positionSelected.value !== 'Все должности' &&
    typeSelected.value !== 'Весь список' &&
    typeContractSelected.value !== 'Весь список'
  )
})
function createUser() {
  const userId = store.state.employees.length + 1
  const user = {
    id: userId,
    surname: userSurname.value,
    name: userName.value,
    patronymic: userPatronymic.value,
    date_birth: userDateBirth.value,
    country_full: nationalitySelected.value,
    gender: genderSelected.value,
    position: positionSelected.value,
    description_cause: typeSelected.value,
    inn: userInn.value,
    type_contract: typeContractSelected.value,
    address: addressSelected.value
  }
  
  if(nationalitySelected.value === 'Россия') {
    user.flag = rfFlag
    user.country = 'RU'
    user.country_id = 4002571654
  } else if(nationalitySelected.value === 'Таджикистан') {
    user.flag = tjFlag
    user.country = 'TJ'
    user.country_id = 404020262
  } else if(nationalitySelected.value === 'Узбекистан') {
    user.flag = uzFlag
    user.country = 'UZ'
    user.country_id = 4020258030
  }

  if(typeSelected.value === 'Истекают все документы') {
    user.type = 'Критические'
  } else if(typeSelected.value === 'Истекает патент') {
    user.type = 'Проблемные'
  } else if(typeSelected.value === 'Пропустил медосмотр') {
    user.type = 'Есть замечания'
  } else if(typeSelected.value === 'Прошел все процедуры') {
    user.type = 'Выполнено'
  }
  
  const dateParts = userDateBirth.value.split('.')
  const birthDate = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`)
  const ageDifMs = new Date() - birthDate
  const ageDate = new Date(ageDifMs)
  user.age = Math.abs(ageDate.getUTCFullYear() - 1970)

  store.dispatch('createUser', user)
  store.state.isModalOpen = false
  document.body.style.removeProperty('overflow')
  window.scrollTo(0, 0)
}

function closeModal() {
  store.state.isModalOpen = !store.state.isModalOpen
  document.body.style.removeProperty('overflow')
  window.scrollTo(0, scrollPosition)
}
</script>

<style lang="scss" scoped>
.employee__modal {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 30px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  width: 600px;
  min-height: 620px;
  background: #fff;
  border-radius: 10px;

  .modal__form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    
    .form__item {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
      width: 100%;

      .item__title {
        font-family: 'MontserratBold';
        color: rgb(4, 20, 35);
        font-size: 15px;
        font-weight: 500;
        line-height: 120%;
      }

      .item__input {
        outline: none;
        width: 100%;
        padding: 12px 16px;
        border: none;
        border-radius: 4px;
        background: rgb(232, 241, 244);
        font-size: 15px;
        color: rgb(132, 144, 155);
      }

      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
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
    }

    .form__short {
      display: flex;
      flex-direction: row;
      gap: 20px;
      width: 100%;
    }
  }

  .employee__add {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgb(0, 182, 237);
    border: none;
    color: rgb(255, 255, 255);
    font-size: 17px;
    font-weight: 500;
    line-height: 120%;
    border-radius: 4px;
    box-shadow: 0px 10px 20px 0px rgba(0, 182, 237, 0.2);
    background: rgb(0, 182, 237);
    width: 200px;
    height: 45px;
    margin-top: 30px;
  }

  .employee__disabled {
    cursor: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #757575;
    box-shadow: 0px 10px 20px 0px rgba(110, 110, 110, 0.2);
    border: none;
    color: rgb(255, 255, 255);
    font-size: 17px;
    font-weight: 500;
    line-height: 120%;
    border-radius: 4px;
    width: 200px;
    height: 45px;
    margin-top: 30px;
  }
}

.employee__overlay {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  transform: translate(-50%, -50%);
  background: rgb(4, 20, 35, 0.5);
  z-index: 888;
}
</style>