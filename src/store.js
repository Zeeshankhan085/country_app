import { createStore } from 'vuex';
import axios from 'axios';

// Create a new store instance.
const store = createStore({
  state() {
    return {
      countries: [],
      currencies: [],
      states: [],
    };
  },
  mutations: {
    set_countries(state, countries) {
      state.countries = countries;
    },
    set_currencies(state, currencies) {
      state.currencies = currencies;
    },
    set_states(state, states) {
      state.states = states;
    },
  },
  actions: {
    async getCountries({ commit }) {
      try {
        const res = await axios.get(
          'https://countriesnow.space/api/v0.1/countries/iso '
        );
        commit('set_countries', res.data.data);
      } catch (err) {
        console.log(err);
      }
    },
    async getCurrencies({ commit }) {
      await axios
        .get('https://countriesnow.space/api/v0.1/countries/currency')
        .then((res) => {
          commit('set_currencies', res.data.data);
        });
    },
    async getStates({ commit }) {
      await axios
        .get('https://countriesnow.space/api/v0.1/countries/states')
        .then((res) => {
          commit('set_states', res.data.data);
        });
    },
  },
});

export default store;
