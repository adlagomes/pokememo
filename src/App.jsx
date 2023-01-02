import { useState, useEffect } from "react";
import { Card } from "./components/Card/Card";
// import { CardBlank } from "./components/Card_blank/CardBlank";
import "./App.css";

function App() {
  const [pokeList, setPokeList] = useState([]);
  const [pokeNameList, setPokeNameList] = useState();

  const [question, setQuestion] = useState();
  const [clicks, setClicks] = useState(false);

  function ramdonId() {
    const idNumber = Math.floor(Math.random() * (10 - 1) + 0);
    console.log(idNumber)
    return idNumber;
  }

  const getPokeData = async (url, name) => {
    const response = await fetch(url);
    const pokeData = await response.json();

    setPokeList((rest) =>
      [...rest, {
        id: pokeData.id,
        name: name,
        imagem: pokeData.sprites.front_default,
      }].slice(0, 9)
    );
  }

  const pokeApi = async () => {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/");
    const data = await response.json();
    const pokeData = data.results; // array de objetos

    pokeData.map(({ url, name }) => getPokeData(url, name));
  }

  function iniciar() {
    setClicks(true)
    console.log("clique mudou!")
  }

  useEffect(() => {
    pokeApi();
    setClicks(false);
  }, [clicks]);

  return (
    <div className="App">
      <h1>~Pokememo~</h1>
      <h2>Clique em Start para começar</h2>
      <p>{question}</p>
      <div className="table">
        {pokeList[8] ? pokeList.map(({ id, name, imagem }) => { return <Card key={id} name={name} img={imagem} /> }) : <></>}
        {pokeList[8] ? <h1>{pokeList[ramdonId()].name}</h1> : <></>}
      </div>
      <button onClick={iniciar}>Start</button>
    </div >
  );
}

export default App;