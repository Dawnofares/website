function dexsearch() {
    let userInput = document.getElementById('dexsearch-input').value;
    userInput = userInput.replace(/ +(?= )/g,'');
    userInput = userInput.replace(" ", "-")
    userInput = userInput.trim();
    userInput = userInput.toLowerCase();
    document.getElementById("pokemon-list").style.display = "block";
    let list = "";
    axios.get(`https://pokeapi.co/api/v2/pokemon/${userInput}`).then(response => {
      let pokemon = response.data;
      document.getElementById("pokemon-list").innerHTML += pokemon;
        list += insertdata(pokemon.name);
      document.getElementById("pokemon-list").innerHTML = list;
    })
    
}
function insertdata(pokemon) {
  console.log(pokemon);
  let data = `<button type="button" class="list-group-item list-group-item-action active" aria-current="true" id=${pokemon} onclick = "getdata(this.id)"> ${pokemon}
  </button>
`;
  return data;
}
function dexsearch2(target) {
  let userInput = document.getElementById('dexsearch-input').value;
  userInput = userInput.replace(/ +(?= )/g,'');
  userInput = userInput.replace(" ", "-")
  userInput = userInput.trim();
  userInput = userInput.toLowerCase();
  document.getElementById("pokemon-list").style.display = "block";
  let list = "";
  axios.get(`https://pokeapi.co/api/v2/${target}/${userInput}`).then(response => {
    
    if (target === "move") {
      let pokemon = response.data;
      for(let x  = 0; x<pokemon.learned_by_pokemon.length; x++){
        list += insertdata(pokemon.learned_by_pokemon[x].name);
      }
    }
    else if (target === "ability") {
      let pokemon = response.data.pokemon;
      for(let x  = 0; x<pokemon.length; x++){
        list += insertdata(pokemon[x].pokemon.name);
      }
    }
    
    document.getElementById("pokemon-list").innerHTML = list;
  })
  
}
function searchstat() {
  let userInput = document.getElementById('dexsearch-input').value;
  let stat = document.getElementById("statchoice");
  stat.onchange = function() {
    let statchoice = stat.options[stat.selectedIndex].value;
    console.log(stat);
  }
  userInput = userInput.replace(/ +(?= )/g,'');
  userInput = userInput.replace(" ", "-")
  userInput = userInput.trim();
  userInput = userInput.toLowerCase();
  document.getElementById("pokemon-list").style.display = "block";
  let list = "";
  
  axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=2000`).then(response => {
    let pokemonlist = response.data.results;
    for (let x = 0; x<pokemonlist.length; x++) {
      axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonlist[x].name}`).then(response => {
        let pokemon= response.data;
      })
    }

    
    document.getElementById("pokemon-list").innerHTML = list;
  })
  
}
function listall(target) {
  document.getElementById("pokemon-list").style.display = "block";
  let list = "";
  axios.get(`https://pokeapi.co/api/v2/${target}/?limit=2000`).then(response => {
    let pokemonlist = response.data.results;
    console.log(pokemonlist.count);
    for (let x = 0; x<pokemonlist.length; x++) {
      list +=  insertdata(pokemonlist[x].name);
    }

    
    document.getElementById("pokemon-list").innerHTML = list;
  })
}