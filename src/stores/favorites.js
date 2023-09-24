// store/favoritos.js
const state = {
  favoritePokemon: [],
};

const mutations = {
  addToFavorites(state, pokemon) {
    state.favoritePokemon.push(pokemon);
  },
  removeFromFavorites(state, pokemon) {
    state.favoritePokemon = state.favoritePokemon.filter(
      (p) => p.name !== pokemon.name
    );
  },
};

const actions = {
  addPokemonToFavorites({ commit }, pokemon) {
    commit("addToFavorites", pokemon);
  },
  removePokemonFromFavorites({ commit }, pokemon) {
    commit("removeFromFavorites", pokemon);
  },
};

const getters = {
  getFavoritePokemon(state) {
    return state.favoritePokemon;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
