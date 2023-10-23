import Vue from "vue";
import Router from "vue-router";
import Home from "./pages/Home.vue";
import Form from "./pages/Form.vue";
import Result from "./pages/Result.vue";
import Builder from "./pages/Builder.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/form",
      component: Form,
    },
    {
      path: "/result",
      component: Result,
    },
    {
      path: "/builder",
      component: Builder,
    },
  ],
});
