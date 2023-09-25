<template>
  <div class="pokemon-detail">
    <div class="pokemon-info" v-if="pokemonData">
      <i class="bi bi-x-circle-fill close-button text-white bi-ul" @click="closePopup"></i>
      <div class="pokemon-image">
        <img class="poke" :src="pokemonData.sprites['other']['official-artwork']['front_default']
          " :alt="pokemonData.name" />
      </div>
      <div class="poke-contain">
        <p><strong>Name:</strong> {{ pokemonData.name }}</p>
        <hr />
        <p><strong>Height:</strong> {{ pokemonData.height }}</p>
        <hr />
        <p><strong>Weight:</strong> {{ pokemonData.weight }}</p>
        <hr />
        <p><strong>Types:</strong> {{ pokemonData.types.map((type) => type.type.name).join(", ") }}</p>
        <hr />
        <div class="pokemon-footer">
          <div class="share">
            <button class="share-button" @click="copyTextToClipboard(textToCopy)">Share to my friends</button>
          </div>
          <div class="stars">
            <img class="star" v-if="!isFavorite(pokemonData)" @click="changeFavorite(pokemonData)" src="@/assets/favd.png"
              alt="Add to Favorites" />
            <img class="star" v-else @click="changeFavorite(pokemonData)" src="@/assets/fava.png"
              alt="Remove from Favorites" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance, computed } from "vue";
import { getName } from "@/api/pokeapi";
import { useStore } from 'vuex';

const props = defineProps({ pokemonSelect: String });
const instance = getCurrentInstance();
const pokemonData = ref(null);
const store = useStore();

const closePopup = () => {
  instance.emit("close");
};

//verificar los cambios en el estado de favoritos
const isFavorite = (pokemon) => {
  const favoritePokemon = computed(() => store.getters.getFavoritePokemon);
  return favoritePokemon.value.some((p) => p.name === pokemon.name);
};
//logica para almacenar favoritos
const changeFavorite = (pokemon) => {
  if (!isFavorite(pokemon)) {
    store.dispatch('addPokemonToFavorites', pokemon);
  } else {
    store.dispatch('removePokemonFromFavorites', pokemon);
  }
};
//guardar en un componente la info
const textToCopy = computed(() => {
  return `${pokemonData.value.name}, Height: ${pokemonData.value.height}, Weight: ${pokemonData.value.weight}, Types: ${pokemonData.value.types.map(type => type.type.name).join(', ')}`;
});
//logica para copiado de texto
const copyTextToClipboard = (text) => {
  const tempInput = document.createElement('textarea');
  tempInput.value = text;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand('copy');
  document.body.removeChild(tempInput);

  alert('Texto copiado al portapapeles');
};
//montar el detalle
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
  height: 47%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.poke {
  height: 79%;
}

.pokemon-info {
  position: relative;
  background-color: white;
  border-radius: 10px;
  text-align: center;
  width: 44%;
  height: 80%;
}

.poke-contain {
  padding: 17px;
  margin: 0px auto;
  width: 92%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

hr {
  border: 0.5px solid #ccc;
  width: 100%;
}

.poke-contain p {
  margin-top: 0;
  margin-bottom: 0rem;
  font-family: 'Lato', sans-serif;
}

.close-button {
  position: absolute;
  right: 10px;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  font-weight: bold;
  z-index: 3;
  font-size: 25px;
}

.star {
  width: 50px;
  ;
}

.pokemon-footer {
  display: flex;
  justify-content: space-between;
  /* Esto separará los elementos al máximo */
  align-items: center;
  /* Esto alinea verticalmente los elementos al centro */
}

.share-button {
  border-radius: 20px;
  /* padding: 7px; */
  border: none;
  background-color: #f22539;
  color: #ffffff;
  font-family: 'Lato', sans-serif;
  width: Hug (195px);
  height: Hug (44px);
  top: 442px;
  left: 30px;
  padding: 11px, 20px, 11px, 20px;
  border-radius: 60px;
  gap: 10px;
}

.stars {
  display: flex;
  gap: 10px;
  /* Espacio entre las estrellas */
}
</style>
