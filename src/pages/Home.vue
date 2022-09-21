<template>
  <div style="display: flex; flex-direction: column; align-items: center">
    <h1>Country Detail App</h1>
    <!-- <input v-model="country" /> -->
    <div v-if="countries.length">
      <div style="display: flex">
        <div style="margin-right: 80px">
          <select name="countries" id="countries" v-model="country.name">
            <option
              v-for="country in countries"
              :value="country.name"
              :key="country.key"
            >
              {{ country.name }}
            </option>
          </select>
          <br />
          <input placeholder="Name Input" v-model="userName" />
        </div>
        <div>
          <span>Country Information by {{ country.name }}</span>
          <br />
          <span>ISO code: {{ country.Iso2 }}</span>
          <br />
          <span>Currency: {{ currency }}</span>
        </div>
      </div>
    </div>
    <div v-if="filteredStates.length">
      <div style="margin: 60px 0 30px 0">
        <input placeholder="State Name Search" v-model="stateSearch" />
        {{ stateSearch }}
      </div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>State Name</th>
            <th>Code</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(state, i) in filteredStates" :key="i">
            <th>{{ i + 1 }}</th>
            <td>{{ state.name }}</td>
            <td>{{ state.state_code }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
  name: 'Home',
  components: {},
  data() {
    return {
      country: '',
      stateSearch: '',
      userName: '',
    };
  },
  computed: {
    ...mapState(['countries', 'currencies', 'states']),
    filteredStates() {
      if (this.stateSearch === '') {
        return this.countryStates;
      }
      return this.countryStates?.filter((item) =>
        item.name.includes(this.stateSearch.toLowerCase())
      );
    },
    countryStates() {
      if (this.currencies.length) {
        const findItem = this.states.find(
          (item) => item.name === this.country.name
        );
        return findItem?.states;
      }
      return [];
    },
    currency() {
      if (this.currencies.length) {
        const findItem = this.currencies.find(
          (item) => item.name === this.country.name
        );
        return findItem.currency;
      }
      return null;
    },
  },
  methods: {
    ...mapActions(['getCountries', 'getCurrencies', 'getStates']),
  },
  updated() {
    document.title = this.userName;
  },
  async mounted() {
    await this.getCountries();
    this.country = this.countries[0];
    // console.log(this.country, '-------------');

    await this.getCurrencies();
    await this.getStates();
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
