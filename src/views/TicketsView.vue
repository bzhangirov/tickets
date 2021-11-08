<template>
  <div class="tickets">
    <div class="tickets-container">
      <div class="tickets-container-filters">
        <Filters
          class="tariffs"
          filterTitle="Опции тарифа"
          :filterData="getTariffs"
          key="tariffs"
          @filter="setCheckedTariff($event)"
        />
        <Filters
          filterTitle="Авиакомпании"
          key="airlines"
          :filterData="getAirlines"
          @filter="setCheckedAirlines($event)"
        />
      </div>
      <TicketsList />
    </div>
  </div>
</template>

<script>
import TicketsList from "../components/TicketsList.vue";
import Filters from "../components/Filters";
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  name: "TicketsView",
  components: {
    TicketsList,
    Filters,
  },
  data: () => ({}),
  created() {
    this.modifyAirlines();
  },
  computed: {
    ...mapGetters("Tickets", ["getAirlines", "getTariffs"]),
  },
  methods: {
    ...mapMutations("Tickets", ["setCheckedAirlines", "setCheckedTariff"]),
    ...mapActions("Tickets", ["modifyAirlines"]),
  },
};
</script>

<style scoped lang="scss">
.tickets {
  padding: 50px 150px;
  background: #d7d7d7;
  @media screen and (max-width: 1400px) {
    padding: 50px 85px;
  }
  @media screen and (max-width: 1265px) {
    padding: 50px 25px;
  }
  @media screen and (max-width: 560px) {
    padding: 50px 10px;
  }
  &-container {
    display: grid;
    grid-template-columns: 0.25fr 0.75fr;
    @media screen and (max-width: 1165px) {
      grid-template-columns: 0.25fr 0.9fr;
    }
    @media screen and (max-width: 1110px) {
      grid-template-columns: 1fr;
    }
    @media screen and (max-width: 850px) {
      display: flex;
      width: 100%;
    }
    &-filters {
      @media screen and (max-width: 1110px) {
        display: none;
      }
    }
    & .tariffs {
      margin-bottom: 12px;
    }
  }
}
</style>
