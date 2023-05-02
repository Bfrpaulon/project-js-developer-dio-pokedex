// Defina a URL base da API com a lista de Pokémon
const apiUrl = "https://pokeapi.co/api/v2/pokemon/";

// Defina a variável para armazenar todos os Pokémon
let allPokemon = [];

// Defina a função para obter os Pokémon de uma página
async function getPokemonFromPage(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

// Defina a função para obter todos os Pokémon
async function getAllPokemon() {
  let url = apiUrl;
  while (url) {
    const data = await getPokemonFromPage(url);
    allPokemon = allPokemon.concat(data.results);
    url = data.next;
  }
  return allPokemon;
}

// Selecione a lista de Pokémon na página
const pokemonList = document.querySelector(".pokemon-list");

// Defina a função para criar um card para um Pokémon
function createPokemonCard(pokemonData) {
  const card = document.createElement("div");
  card.classList.add("pokemon");
  card.innerHTML = `
    <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
    <div class="pokemon-info">
      <h2 class="pokemon-name">${pokemonData.name}</h2>
      <p class="pokemon-type">${pokemonData.types.map(type => type.type.name).join(", ")}</p>
      <p class="pokemon-number">#${pokemonData.id.toString().padStart(3, "0")}</p>
      <p class="pokemon-weight">Weight: ${pokemonData.weight} kg</p>
      <p class="pokemon-height">Height: ${pokemonData.height} m</p>
    </div>
  `;
  return card;
}


// Defina a função para exibir todos os Pokémon na página
async function displayAllPokemon() {
  const allPokemon = await getAllPokemon();
  allPokemon.forEach(async (pokemon) => {
    const pokemonData = await getPokemonFromPage(pokemon.url);
    const card = createPokemonCard(pokemonData);
    pokemonList.appendChild(card);
  });
}

// Chame a função para exibir todos os Pokémon na página
displayAllPokemon();