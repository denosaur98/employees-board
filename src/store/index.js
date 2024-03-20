import { createStore } from "vuex";
import rfFlag from "./../assets/images/flag-rf.svg";
import tjFlag from "./../assets/images/flag-tj.svg";
import uzFlag from "./../assets/images/flag-uz.svg";

const initialEmployees = [
  {
    id: 1,
    surname: "Константинопольский",
    name: "Константин",
    patronymic: "Константинович",
    inn: "1234567890",
    address: "Санкт-Петербург",
    date_birth: "23.06.2001",
    age: 22,
    type_contract: "СМЗ",
    gender: "Мужской",
    country: "RU",
    country_id: 4002571654,
    country_full: "Россия",
    position: "Промышленный альпинист",
    flag: rfFlag,
    description_cause: "Истекают все документы",
    type: "Критические",
  },
  {
    id: 2,
    surname: "Иванов",
    name: "Иван",
    patronymic: "Иванович",
    inn: "2231561890",
    address: "Москва",
    date_birth: "23.06.1998",
    age: 25,
    type_contract: "ТД",
    gender: "Мужской",
    country: "TJ",
    country_id: 404020262,
    country_full: "Таджикистан",
    position: "Промышленный альпинист",
    flag: tjFlag,
    description_cause: "Истекает патент",
    type: "Проблемные",
  },
  {
    id: 3,
    surname: "Смирнов",
    name: "Алексей",
    patronymic: "Алексеевич",
    inn: "223112212512",
    address: "Уфа",
    date_birth: "11.02.2000",
    age: 24,
    type_contract: "Кандидат",
    gender: "Мужской",
    country: "UZ",
    country_id: 4020258030,
    country_full: "Узбекистан",
    position: "Промышленный альпинист",
    flag: uzFlag,
    description_cause: "Пропустил медосмотр",
    type: "Есть замечания",
  },
  {
    id: 4,
    surname: "Сидоров",
    name: "Владимир",
    patronymic: "Владимирович",
    inn: "153182582512",
    address: "Казань",
    date_birth: "11.02.1999",
    age: 25,
    type_contract: "ГПХ",
    gender: "Мужской",
    country: "TJ",
    country_id: 404020262,
    country_full: "Таджикистан",
    position: "Токарь",
    flag: tjFlag,
    description_cause: "Прошел все процедуры",
    type: "Выполнено",
  },
  {
    id: 5,
    surname: "Васильев",
    name: "Василий",
    patronymic: "Васильевич",
    inn: "228212581012",
    address: "Москва",
    date_birth: "01.05.1999",
    age: 24,
    type_contract: "ГПХ",
    gender: "Мужской",
    country: "RU",
    country_id: 4002571654,
    country_full: "Россия",
    position: "Токарь",
    flag: rfFlag,
    description_cause: "Пропустил медосмотр",
    type: "Есть замечания",
  },
  {
    id: 6,
    surname: "Петров",
    name: "Петр",
    patronymic: "Петрович",
    inn: "22821111123",
    address: "Казань",
    date_birth: "22.10.2000",
    age: 24,
    type_contract: "ТД",
    gender: "Мужской",
    country: "UZ",
    country_id: 4020258030,
    country_full: "Узбекистан",
    position: "Промышленный альпинист",
    flag: uzFlag,
    description_cause: "Истекает патент",
    type: "Проблемные",
  },
  {
    id: 7,
    surname: "Овсянкин",
    name: "Игорь",
    patronymic: "Игоревич",
    inn: "1521008912",
    address: "Уфа",
    date_birth: "05.08.2002",
    age: 23,
    type_contract: "Кандидат",
    gender: "Мужской",
    country: "TJ",
    country_id: 404020262,
    country_full: "Таджикистан",
    position: "Пекарь",
    flag: tjFlag,
    description_cause: "Истекают все документы",
    type: "Критические",
  },
  {
    id: 8,
    surname: "Никитин",
    name: "Никита",
    patronymic: "Сергеевич",
    inn: "23142211290",
    address: "Санкт-Петербург",
    date_birth: "22.10.1998",
    age: 25,
    type_contract: "ТД",
    gender: "Мужской",
    country: "RU",
    country_id: 4002571654,
    country_full: "Россия",
    position: "Пекарь",
    flag: rfFlag,
    description_cause: "Прошел все процедуры",
    type: "Выполнено",
  },
];

const store = createStore({
  state() {
    return {
      employees: initialEmployees,
      filteredEmployees: JSON.parse(JSON.stringify(initialEmployees)),
      nationalitySelected: null,
      genderSelected: null,
      positionSelected: null,
      tdChecked: false,
      gphChecked: false,
      smzChecked: false,
      candidateChecked: false,
      countryData: ["Россия", "Таджикистан", "Узбекистан"],
      addressData: ["Санкт-Петербург", "Москва", "Уфа", "Казань"],
      genderData: ["Мужской", "Женский"],
      positionData: ["Промышленный альпинист", "Токарь", "Пекарь"],
      orderData: ["ТД", "ГПХ", "СМЗ", "Кандидат"],
      typeData: [
        "Истекают все документы",
        "Истекает патент",
        "Пропустил медосмотр",
        "Прошел все процедуры",
      ],
      typeСontractData: ["ТД", "ГПХ", "СМЗ", "Кандидат"],
      isModalOpen: false,
      filterType: null,
    };
  },
  mutations: {
    SET_FILTERED_EMPLOYEES(state, payload) {
      state.employees = payload;
    },
    SET_NATIONALITY_SELECTED(state, payload) {
      state.nationalitySelected = payload;
    },
    SET_GENDER_SELECTED(state, payload) {
      state.genderSelected = payload;
    },
    SET_POSITION_SELECTED(state, payload) {
      state.positionSelected = payload;
    },
    SET_TD_CHECKED(state, payload) {
      state.tdChecked = payload;
    },
    SET_GPH_CHECKED(state, payload) {
      state.gphChecked = payload;
    },
    SET_SMZ_CHECKED(state, payload) {
      state.smzChecked = payload;
    },
    SET_CANDIDATE_CHECKED(state, payload) {
      state.candidateChecked = payload;
    },
    ADD_EMPLOYEE(state, employee) {
      state.employees.unshift(employee);
    },
    setFilterType(state, type) {
      state.filterType = type;
    },
  },
  actions: {
    clearFilters({ commit, state }) {
      commit("SET_NATIONALITY_SELECTED", null);
      commit("SET_GENDER_SELECTED", null);
      commit("SET_POSITION_SELECTED", null);
      commit("SET_TD_CHECKED", false);
      commit("SET_GPH_CHECKED", false);
      commit("SET_SMZ_CHECKED", false);
      commit("SET_CANDIDATE_CHECKED", false);
      commit("SET_FILTERED_EMPLOYEES", state.filteredEmployees);
    },
    filterEmployees({ commit, state }) {
      let filteredEmployees = store.state.employees;
      if (state.nationalitySelected !== null) {
        filteredEmployees = filteredEmployees.filter(
          (e) => e.country_full === state.nationalitySelected
        );
      }
      if (state.genderSelected !== null) {
        filteredEmployees = filteredEmployees.filter(
          (e) => e.gender === state.genderSelected
        );
      }
      if (state.positionSelected !== null) {
        filteredEmployees = filteredEmployees.filter(
          (e) => e.position === state.positionSelected
        );
      }
      if (state.tdChecked) {
        filteredEmployees = filteredEmployees.filter(
          (e) => e.type_contract === "ТД"
        );
      }
      if (state.gphChecked) {
        filteredEmployees = filteredEmployees.filter(
          (e) => e.type_contract === "ГПХ"
        );
      }
      if (state.smzChecked) {
        filteredEmployees = filteredEmployees.filter(
          (e) => e.type_contract === "СМЗ"
        );
      }
      if (state.candidateChecked) {
        filteredEmployees = filteredEmployees.filter(
          (e) => e.type_contract === "Кандидат"
        );
      }
      commit("SET_FILTERED_EMPLOYEES", filteredEmployees);
    },
    createUser({ commit, state }, userData) {
      const userId = state.employees.length + 1;
      const newUser = {
        id: userId,
        surname: userData.surname,
        name: userData.name,
        patronymic: userData.patronymic,
        date_birth: userData.date_birth,
        country_full: userData.country_full,
        gender: userData.gender,
        position: userData.position,
        description_cause: userData.description_cause,
        inn: userData.inn,
        type_contract: userData.type_contract,
        address: userData.address,
        country: userData.country,
        flag: userData.flag,
        country_id: userData.country_id,
        age: userData.age,
        type: userData.type,
      };
      commit("ADD_EMPLOYEE", newUser);
    },
  },
});

export default store;
