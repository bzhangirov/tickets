import Vue from "vue";
import VueRouter from "vue-router";
import TicketsView from "../views/TicketsView";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "TicketsPage",
    component: TicketsView,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
