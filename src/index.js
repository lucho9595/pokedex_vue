import Vue from "vue";
import VueRouter from "vue-router";

import Home from "./pages/Home.vue";
import Landingpage from "./pages/LandingPage.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
    },
    {
        path: "/",
        name: "landingpage",
        component: Landingpage,
    },
];

const router = new VueRouter({
    mode: "history",
    routes,
});

export default router;