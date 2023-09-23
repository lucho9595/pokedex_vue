import axios from "axios";

const BASE_URL = "https://pokeapi.co/api/v2/";

const pokemonList = async () => {
  try {
    const response = await axios.get(`${BASE_URL}pokemon/?limit=1126`);
    return response.data.results;
  } catch (error) {
    console.error("Error al obtener la lista de Pokémon:", error);
    throw error; // Puedes re-lanzar el error si es necesario
  }
}



export default pokemonList;