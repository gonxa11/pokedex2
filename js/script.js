const searchInput = document.getElementById("searchInput");
const pokemonList = document.getElementById("pokemonList");

// Función para buscar Pokémon
function searchPokemon() {
  const searchTerm = searchInput.value.toLowerCase();

  fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`)
    .then((response) => response.json())
    .then((data) => {
      // Mostrar los detalles del Pokémon encontrado
      displayPokemonDetails(data);
    })
    .catch((error) => {
      console.log("Error:", error);
      pokemonList.innerHTML = "No se encontró el Pokémon.";
    });
}

// Función para mostrar los detalles del Pokémon
function displayPokemonDetails(pokemon) {
  const typeColors = {
    normal: "#A8A878",
    fire: "#F08030",
    water: "#6890F0",
    electric: "#F8D030",
    grass: "#78C850",
    ice: "#98D8D8",
    fighting: "#C03028",
    poison: "#A040A0",
    ground: "#E0C068",
    flying: "#A890F0",
    psychic: "#F85888",
    bug: "#A8B820",
    rock: "#B8A038",
    ghost: "#705898",
    dragon: "#7038F8",
    dark: "#705848",
    steel: "#B8B8D0",
    fairy: "#EE99AC"
  };

  const typeElements = pokemon.types.map(type => {
    const typeColor = typeColors[type.type.name];
    return `<span class="type" style="background-color: ${typeColor};">${type.type.name}</span>`;
  }).join(" ");

  const backgroundImageColor = typeColors[pokemon.types[0].type.name];

  pokemonList.innerHTML = `
    <div class="info">
      <h2>${pokemon.name}</h2>
      <h2>#${pokemon.id}</h2>
    </div>
    <div class="image-container" style="background-color: ${backgroundImageColor};">
      <img src="${pokemon.sprites.other.home.front_default}" alt="${pokemon.name}" class="img">
    </div>
    <div class="info-type">
      <p>${typeElements}</p>
    </div>
    <div class="info-poke">
      <p>${pokemon.height}M</p>
      <p>${pokemon.weight}kg</p>
    </div>
    <div class="info-poke">
      <p>Height</p>
      <p>Weight</p>
    </div>
    <p>Base Stats <br> ${pokemon.stats.map(stat => `${stat.stat.name}: ${stat.base_stat}`).join("<br>")}</p>
  `;
}


// Evento para buscar Pokémon al presionar Enter
searchInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    searchPokemon();
  }
});
