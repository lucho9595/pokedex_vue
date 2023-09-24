<template>
  <div class="container">
    <div class="search-container">
      <i class="bi bi-search"></i>
      <input type="text" placeholder="Search" class="form-control" v-model="searchTerm" @input="handleSearch" />
    </div>
    <div v-if="showNotFoundMessage">
      <h3>Uh-oh!</h3>
      <p>You look lost on your journey!</p>
      <button class="btn back" @click="resetSearch">Go back home</button>
    </div>
    <ul class="pokemon-list">
      <li v-for="pokemon in filteredPokemonList" :key="pokemon.name" class="pokemon-item">
        <div @click="openPokemon(pokemon)">
          {{ capitalizeFirstLetter(pokemon.name) }}
        </div>
        <img class="star" v-if="!isFavorite(pokemon)" @click="changeFavorite(pokemon)" src="@/assets/favd.png"
          alt="Add to Favorites" />
        <img class="star" v-else @click="changeFavorite(pokemon)" src="@/assets/fava.png" alt="Remove from Favorites" />
      </li>
    </ul>
     <!-- Pop-up para mostrar los detalles del Pokémon -->
    <div v-if="isPopupOpen">
      <PokemonDetail :pokemonSelect="selectedPokemon" @close="closePokemon" />
    </div>
    <div class="buttons-container">
      <div class="list">
        <i class="bi bi-list-ul" :style="{
          backgroundColor: selectedTab === 'all' ? '#F22539' : '#BFBFBF',
        }"></i>
        <button class="btn text-white text" @click="selectTab('all')" :style="{
          backgroundColor: selectedTab === 'all' ? '#F22539' : '#BFBFBF',
        }">
          All
        </button>
      </div>
      <div class="favs">
        <i class="bi bi-star-fill" :style="{
          backgroundColor:
            selectedTab === 'favorites' ? '#F22539' : '#BFBFBF',
        }"></i>
        <button class="btn text-white text" @click="selectTab('favorites')" :style="{
          backgroundColor:
            selectedTab === 'favorites' ? '#F22539' : '#BFBFBF',
        }">
          Favorites
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getData } from "@/api/pokeapi";
import { ref, onMounted, computed, watch  } from "vue";
import PokemonDetail from "../components/PokeDetail.vue";
import { useStore } from 'vuex';


const pokemonList = ref([]); //Se almacenan todos los pokemons
const selectedTab = ref("all"); // Inicialmente, se selecciona "All"
const searchTerm = ref(""); // Variable reactiva para el término de búsqueda
const filteredPokemonList = ref([]); // Variable reactiva para la lista filtrada de Pokémon
const showNotFoundMessage = ref(false); // Variable reactiva para mostrar el mensaje
const isPopupOpen = ref(false); // Variable para controlar la visibilidad del popup
const selectedPokemon = ref(null); // Variable para almacenar los datos del Pokémon seleccionado

const store = useStore(); // Accede al store de Vuex

const isFavorite = (pokemon) => {
  const favoritePokemon = computed(() => store.getters.getFavoritePokemon);
  return favoritePokemon.value.some((p) => p.name === pokemon.name);
};

const changeFavorite = (pokemon) => {
  if (!isFavorite(pokemon)) {
    store.dispatch('addPokemonToFavorites', pokemon);
  } else {
    store.dispatch('removePokemonFromFavorites', pokemon);
  }
};

const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const selectTab = (tab) => {
  selectedTab.value = tab;
};

const handleSearch = () => {
  const filteredList = pokemonList.value.filter((pokemon) => {
    return pokemon.name.includes(searchTerm.value.toLowerCase());
  });
  filteredPokemonList.value = filteredList;
  showNotFoundMessage.value = filteredList.length === 0;
};

const resetSearch = () => {
  searchTerm.value = "";
  showNotFoundMessage.value = false;
  filteredPokemonList.value = pokemonList.value;
};

const openPokemon = (pokemon) => {
  selectedPokemon.value = pokemon.name;
  isPopupOpen.value = true;
};

const closePokemon = () => {
  isPopupOpen.value = false;
};

// Escucha cambios en selectedTab
watch(selectedTab, (newTab) => {
  if (newTab === 'favorites') {
    // Si se selecciona 'favorites', filtra la lista para mostrar solo los favoritos
    filteredPokemonList.value = pokemonList.value.filter((pokemon) =>
      isFavorite(pokemon)
    );
  } else {
    // Si se selecciona otra pestaña, muestra todos los Pokémon
    filteredPokemonList.value = pokemonList.value;
  }
});

onMounted(async () => {
  const allPokemon = await getData();
  pokemonList.value = allPokemon;

  // Verifica si la pestaña actual es "Favorites"
  if (selectedTab.value === 'favorites') {
    // Filtra la lista de Pokémon para mostrar solo los favoritos
    filteredPokemonList.value = allPokemon.filter((pokemon) =>
      isFavorite(pokemon)
    );
  } else {
    // Muestra todos los Pokémon
    filteredPokemonList.value = allPokemon;
  }
});
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  text-align: center;
}

/*--input--*/
.search-container {
  display: flex;
  align-items: center;
  margin-bottom: 50px;
  border-radius: 5px;
  background-color: white;
  box-shadow: 0 0.1px 3px rgba(0, 0, 0, 0.1);
  width: 60%;
}

.form-control {
  border: none;
  font-family: "Montserrat", sans-serif;
  width: 100%;
  color: #353535;
  font-size: 16px;
}

input::placeholder {
  color: #bfbfbf;
}

input.form-control:focus {
  outline: none !important;
  outline-width: 0 !important;
  box-shadow: none;
  -moz-box-shadow: none;
  -webkit-box-shadow: none;
}

/*--List pokemons--*/
.pokemon-list {
  list-style: none;
  padding: 0;
  width: 60%;
}

.pokemon-item {
  font-family: "Lato", sans-serif;
  background-color: white;
  padding: 12px;
  border-radius: 5px;
  margin-bottom: 10px;
  width: 100%;
  color: #353535;
  font-size: 22px;
  display: flex;
}

/*--Buttons--*/
.buttons-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: white;
  padding: 10px;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
}

.back {
  background-color: #f22539;
  color: #ffffff;
  border-radius: 20px;
}

.back:hover {
  background-color: #c00e20;
  color: #ffffff;
}

.text {
  font-family: "Montserrat", sans-serif;
  width: 100px;
  /* Ajusta el ancho según sea necesario */
}

.list,
.favs {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* Centra los elementos verticalmente */
}

/*Iconos*/
.bi-search {
  color: #bfbfbf;
  margin-left: 10px;
}

.bi-star-fill,
.bi-list-ul {
  font-size: 24px;
  color: white;
}

.star{
  width: 50px;
}

/* Media query para pantallas más pequeñas */
@media screen and (max-width: 768px) {
  .search-container {
    width: 100%;
  }

  .pokemon-list {
    width: 100%;
  }
}
</style>
