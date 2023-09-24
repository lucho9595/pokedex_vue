import { createStore } from "vuex";

export default createStore({
  state: {
    favoritePokemon: [],
  },
  mutations: {
      addToFavorites(state, value) {
        state.favoritePokemon.push(value);
      },
      removeFromFavorites(state, value) {
        state.favoritePokemon = state.favoritePokemon.filter(
          (p) => p.name !== value.name
        );
      },
  },
  actions: {
    addPokemonToFavorites({ commit }, value) {
      commit("addToFavorites", value);
    },
    removePokemonFromFavorites({ commit }, value) {
      commit("removeFromFavorites", value);
    },
  },
  getters: {
    getFavoritePokemon(state) {
      return state.favoritePokemon;
    },
  },
});