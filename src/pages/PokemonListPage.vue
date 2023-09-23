<template>
  <div class="container">
    <div class="search-container">
      <i class="bi bi-search"></i>
      <input type="text" placeholder="Search" class="form-control" v-model="searchTerm" @input="handleSearch" />
    </div>
    <!-- Mensaje cuando no se encuentra el Pokémon -->
    <div v-if="showNotFoundMessage">
      <h3>Uh-oh!</h3>
      <p>You look lost on your journey!</p>
      <button class="btn back" @click="resetSearch">Go back home</button>
    </div>
    <!--Lista de pokemons-->
    <ul class="pokemon-list">
      <li v-for="pokemon in filteredPokemonList" :key="pokemon.name" class="pokemon-item">
        {{ capitalizeFirstLetter(pokemon.name) }}
      </li>
    </ul>
    <div class="buttons-container">
      <div class="list">
        <i class="bi bi-list-ul" :style="{ backgroundColor: selectedTab === 'all' ? '#F22539' : '#BFBFBF' }"></i>
        <button class="btn text-white text" @click="selectTab('all')"
          :style="{ backgroundColor: selectedTab === 'all' ? '#F22539' : '#BFBFBF' }">
          All
        </button>
      </div>
      <div class="favs">
        <i class="bi bi-star-fill" :style="{ backgroundColor: selectedTab === 'favorites' ? '#F22539' : '#BFBFBF' }"></i>
        <button class="btn text-white text" @click="selectTab('favorites')"
          :style="{ backgroundColor: selectedTab === 'favorites' ? '#F22539' : '#BFBFBF' }">
          Favorites
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getData } from "@/api/pokeapi";
import { ref, onMounted } from "vue";

const pokemonList = ref([]); //Se almacenan todos los pokemons
const selectedTab = ref('all'); // Inicialmente, se selecciona "All"
const searchTerm = ref(''); // Variable reactiva para el término de búsqueda
const filteredPokemonList = ref([]); // Variable reactiva para la lista filtrada de Pokémon
const showNotFoundMessage = ref(false); // Variable reactiva para mostrar el mensaje

const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const selectTab = (tab) => {
  selectedTab.value = tab;
};

const handleSearch = () => {
  // Filtrar la lista de Pokémon en función del término de búsqueda
  const filteredList = pokemonList.value.filter(pokemon => {
    return pokemon.name.includes(searchTerm.value.toLowerCase());
  });
  // Actualizar la lista filtrada
  filteredPokemonList.value = filteredList;
  // Mostrar el mensaje si no se encontraron resultados
  showNotFoundMessage.value = filteredList.length === 0;
};

const resetSearch = () => {
  searchTerm.value = '';
  showNotFoundMessage.value = false;
  filteredPokemonList.value = pokemonList.value;
};
onMounted(async () => {
  pokemonList.value = await getData();

  // Inicialmente, la lista filtrada es la misma que la lista completa
  filteredPokemonList.value = pokemonList.value;
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
  font-family: 'Montserrat', sans-serif;
  width: 100%;
  color: #353535;
  font-size: 16px;
}

input::placeholder {
  color: #BFBFBF;
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
  font-family: 'Lato', sans-serif;
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
  background-color: #F22539;
  color: #FFFFFF;
  border-radius: 20px;
}

.back:hover {
  background-color: #C00E20;
  color: #FFFFFF;
}

.text {
  font-family: 'Montserrat', sans-serif;
    width: 100px; /* Ajusta el ancho según sea necesario */

}
.list, .favs {
  display: flex;
  flex-direction: column;
  align-items: center; /* Centra los elementos verticalmente */
}

/*Iconos*/
.bi-search {
  color: #BFBFBF;
  margin-left: 10px;
}
.bi-star-fill, .bi-list-ul{
  font-size: 24px; 
  color: white;
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