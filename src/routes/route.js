import { createRouter, createWebHistory } from "vue-router";

// Importa los componentes de las páginas
import LandingPage from "../pages/LandingPage.vue";
import PokemonListPage from "../pages/PokemonListPage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: LandingPage },
    { path: "/home", component: PokemonListPage },
    // Define otras rutas según sea necesario.
  ],
});

export default router;
