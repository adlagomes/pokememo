import { useState, useEffect } from "react";
import { Card } from "./components/Card/Card";
import "./App.css";

function App() {
  const [wantedPokemon, setWantedPokemon] = useState()
  const [pokeList, setPokeList] = useState([]);

  const ramdonList = 

  useEffect(() => {
    async function pokeApi() {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon/")
      const data = await response.json();
      const pokeData = data.results
      pokeData.map(async ({ name, url }) => {
        const pokeNameList = name
        const pokeUrlList = url
        const pokeDataList = await fetch(pokeUrlList);
        const pokeInfos = await pokeDataList.json()
        const spritesPokemon = pokeInfos.sprites.front_default
        // console.log(spritesPokemon)
        setPokeList(rest => [...rest, {
          nome: pokeNameList,
          imagem: spritesPokemon
        }])

         

      })
    }

    pokeApi()

  }, [])

console.log(pokeList)

  return (
    <div className="App">
      <h1>Pokememo</h1>
      <p>Onde está o Pikachu?</p>
      <div className="table">
        {pokeList.map(({ nome, imagem }) => {
          return <Card key={imagem} name={nome} img={imagem} />;
        })}
      </div>
      <button>Start</button>
    </div>
  );
}

export default App;
