<template>
  <div>
    <input type="text" placeholder="Search" />
  </div>
  <div>
    <ul>
      <li v-for="pokemon in pokemonList" :key="pokemon.name">
        {{ pokemon.name }}
      </li>
    </ul>
  </div>
  <div>
    <button>All</button>
    <button>Favourites</button>
  </div>
</template>

<script setup>
import { getData } from "@/api/pokeapi";
import { ref, onMounted } from "vue";

// Define una referencia reactiva para almacenar la lista de nombres de Pokémon
const pokemonList = ref([]);

// Llama a la función para obtener la lista de nombres de Pokémon al montar el componente
onMounted(async () => {
  pokemonList.value = await getData();
});
</script>
