<template>
  <div class="list">
    <div v-for="(item, index) in getTickets" :key="index">
      <TicketsListItem :item="item" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import TicketsListItem from "./TicketsListItem";
export default {
  name: "TicketsList",
  components: {
    TicketsListItem,
  },
  computed: {
    ...mapGetters("Tickets", ["getTickets"]),
  },
};
</script>

<style scoped lang="scss">
.list {
  @media screen and (max-width: 850px) {
    width: 100%;
  }
}
</style>
