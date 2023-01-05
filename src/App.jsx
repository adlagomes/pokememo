import { useState, useEffect } from "react";
import { Card } from "./components/Card/Card";
import { Timer } from "./components/Timer";
import "./App.css";

function App() {
  const [pokeList, setPokeList] = useState([]);
  const [namePokemon, setNamePokemon] = useState();

  const [board, setBoard] = useState(false);
  const [message, setMessage] = useState(
    <h2>Clique em <span>Start</span> para começar</h2>
  );

  const [styleCard, setStyleCard] = useState("frontCard");
  
  const pokeApi = async () => {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/");
    const data = await response.json();
    const pokeData = data.results;

    pokeData.map(({ url, name }) => getPokeData(url, name));
  };

  const getPokeData = async (url, name) => {
    const response = await fetch(url);
    const pokeData = await response.json();

    setPokeList((rest) =>
      [
        ...rest,
        {
          id: pokeData.id,
          name: name,
          imagem: pokeData.sprites.front_default,
        },
      ].slice(0, 9)
    );
    
    setMessage(<Timer/>)
  };

  function ramdonId() {
    const idNumber = Math.floor(Math.random() * (10 - 1) + 0);
    return idNumber;
  }

  function boardOnOff() {
    if (pokeList[8]) {
      setStyleCard("backCard")
      setNamePokemon(pokeList[ramdonId()].name)
      setBoard(true)
    }
  }

  const getCardClicked = r => {
    const chosenCard = r
    console.log("pokemon: " + chosenCard)
    if (chosenCard === namePokemon) {
      console.log("you win")
    } else {
      console.log("loooose")
    }
  }

  useEffect(() => {
    const timer = setTimeout(boardOnOff, 6000);

    if (board) { clearTimeout(timer); }
      
  }, [pokeList[8]]);

  return (
    <div className="App">
      <h1 className="title">~Pokememo~</h1>
      <div>
        {
          board ? <h2>Onde está <span>{namePokemon}</span>?</h2> : message
        }
      </div>
      <div className="table">
        {pokeList[8] ? (
          pokeList.map(({id, name, imagem}) => {
            return <Card key={id} name={name} img={imagem} class={styleCard} takingTheCard={getCardClicked} />;
          })
        ) : (
          <></>
        )}
      </div>
      <button onClick={pokeApi}>Start</button>
    </div>
  );
}

export default App;