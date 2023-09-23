<template>
  <div class="container">
    <div class="search-container">
      <i class="bi bi-search"></i>
      <input type="text" placeholder="Search" class="form-control" />
    </div>
    <ul class="pokemon-list">
      <li v-for="pokemon in pokemonList" :key="pokemon.name" class="pokemon-item">
        {{ capitalizeFirstLetter(pokemon.name) }}
      </li>
    </ul>
    <div class="buttons-container">
      <i class="bi bi-list-ul"></i>
      <button class="btn text-white" :class="{ 'active': selectedTab === 'all' }" @click="selectTab('all')"
        :style="{ backgroundColor: selectedTab === 'all' ? '#F22539' : '#BFBFBF' }">
        All
      </button>
      <i class="bi bi-star-fill"></i>
      <button class="btn text-white" :class="{ 'active': selectedTab === 'favorites' }" @click="selectTab('favorites')"
        :style="{ backgroundColor: selectedTab === 'favorites' ? '#F22539' : '#BFBFBF' }">
        Favorites
      </button>
    </div>
  </div>
</template>

<script setup>
import { getData } from "@/api/pokeapi";
import { ref, onMounted } from "vue";

const pokemonList = ref([]);
const selectedTab = ref('all'); // Inicialmente, se selecciona "All"

const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const selectTab = (tab) => {
  selectedTab.value = tab;
};

onMounted(async () => {
  pokemonList.value = await getData();
});
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  text-align: center;
}

.search-container {
  display: flex;
  align-items: center;
  margin-bottom: 50px;
  border-radius: 5px;
  background-color: white;
  box-shadow: 0 0.1px 3px rgba(0, 0, 0, 0.1);
}

.form-control {
  border: none;
  font-family: 'Montserrat', sans-serif;
  width: 570px;
}

.bi-search {
  color: #333;
  margin-left: 10px;
}

.pokemon-list {
  list-style: none;
  padding: 0;
}

.pokemon-item {
  background-color: white;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 10px;
  width: 100%;
}

.buttons-container {
  font-family: 'Montserrat', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: white;
  padding: 10px;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
}

/* Estilo para botón activo */
.btn.active {
  background-color: #F22539 !important;
}
</style>