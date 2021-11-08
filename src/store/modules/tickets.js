import { airlines, flights } from "../data/results.json";
export default {
  namespaced: true,
  state: {
    airlines: [],
    tariffs: [
      { id: 1, label: "Только прямые", checked: false },
      { id: 2, label: "Только с багажом", checked: false },
      { id: 3, label: "Только возвратные", checked: false },
    ],
    tickets: flights,
    allTickets: [],
  },
  getters: {
    getAirlines: (state) => state.airlines,
    getTariffs: (state) => state.tariffs,
    getTickets: (state) => state.tickets,
  },
  mutations: {
    setAirlinesFilters(state, value) {
      state.airlines = [
        {
          label: "Все",
          checked: true,
        },
        ...value,
      ];
    },
    setTickets(state, value) {
      state.tickets = [...value];
    },
    setCheckedAirlines(state, { label }) {
      if (label !== "Все") {
        const airline = state.airlines.findIndex(
          (item) => item.label === label
        );
        state.airlines[airline].checked = !state.airlines[airline].checked;
        state.airlines.find((item) => item.label === "Все").checked = false;
        const test = state.airlines
          .filter((item) => item.checked)
          .map((item) => item.iata);
        state.tickets = flights.filter((item) =>
          test.includes(item.validating_carrier)
        );
      } else {
        state.airlines.forEach((item) => {
          item.checked = false;
        });
        state.airlines.find((item) => item.label === "Все").checked = true;
        state.tickets = flights;
      }
    },
    setCheckedTariff(state, { label }) {
      state.tariffs.forEach((item) => {
        item.checked = item.label === label;
      });
      const checked = state.tariffs.find((item) => item.checked);
      if (checked.id === 1) {
        state.tickets = flights.filter(
          (item) => item.itineraries[0][0].segments.length === 2
        );
      } else if (checked.id === 2) {
        state.tickets = flights.filter(
          (item) =>
            item.itineraries[0][0].segments[0].services.alt_text !== "0 PC"
        );
      } else {
        state.tickets = flights.filter((item) => !item.refundable);
      }
    },
  },
  actions: {
    modifyAirlines({ commit }) {
      const airlinesModified = [];
      for (let key in airlines) {
        const obj = {};
        obj.iata = key;
        obj.label = airlines[key];
        obj.checked = false;
        airlinesModified.push(obj);
      }
      commit("setAirlinesFilters", airlinesModified);
    },
  },
};
