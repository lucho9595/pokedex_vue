import { createStore } from "vuex";
import favoritosModule from "./favorites";

export default createStore({
  modules: {
    favoritos: favoritosModule,
  },
});
