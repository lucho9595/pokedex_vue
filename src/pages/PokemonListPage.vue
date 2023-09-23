<template>
  <div>
    <input type="text" placeholder="Search" v-model="searchQuery">
    
    <ul>
      <li v-for="pokemon in filteredPokemonList" :key="pokemon.name">{{ pokemon.name }}</li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import pokemonList from '../components/pokemonApi';

const searchQuery = ref(''); // Variable reactiva para la consulta de búsqueda

// Filtra la lista de Pokémon según la consulta de búsqueda
const filteredPokemonList = computed(() => {
  return pokemonList.filter(pokemon => {
    return pokemon.name.toLowerCase().includes(searchQuery.value.toLowerCase());
  });
});
</script>