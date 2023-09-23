import axios from "axios";

const BASE_URL = "https://pokeapi.co/api/v2/";

export const getData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}pokemon/?limit=1126`);
    console.log(response.data.results)
    return response.data.results;
  } catch (error) {
    console.error("Error al obtener la lista de Pokémon:", error);
  }
};

export const pokemonName = async (name) => {
  try {
    const response = await axios.get(`${BASE_URL}pokemon/${name}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el Pokémon:", error);
  }
};