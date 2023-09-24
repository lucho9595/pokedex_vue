<template>
  <div class="pokemon-detail">
    <div class="pokemon-info" v-if="pokemonData">
      <button class="close-button" @click="closePopup">Cerrar</button>
      <div class="pokemon-image">
        <img
          :src="
            pokemonData.sprites['other']['official-artwork']['front_default']
          "
          :alt="pokemonData.name"
        />
      </div>
      <p><strong>Name:</strong>{{ pokemonData.name }}</p>
      <p><strong>Height:</strong> {{ pokemonData.height }}</p>
      <p><strong>Weight:</strong> {{ pokemonData.weight }}</p>
      <p>
        <strong>Types:</strong>
        {{ pokemonData.types.map((type) => type.type.name).join(", ") }}
      </p>
      <div class="pokemon-footer">
        <button class="share-button">Share</button>
        <button class="favorite-button">Favorite</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from "vue";
import { getName } from "@/api/pokeapi";

const props = defineProps({ pokemonSelect: String });
const instance = getCurrentInstance();

const pokemonData = ref(null);

const closePopup = () => {
  instance.emit("close");
};

onMounted(async () => {
  pokemonData.value = await getName(props.pokemonSelect);
});
</script>

<style scoped>
.pokemon-detail {
  position: fixed;
  background: rgba(0, 0, 0, 0.6);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
}

.pokemon-image {
  background-image: url("../assets/bg-pokemon.png");
  background-size: cover;
  z-index: 1;
}

.pokemon-info {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  z-index: 2;
  text-align: center;
  flex-direction: column;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  font-weight: bold;
  z-index: 3;
}
</style>
