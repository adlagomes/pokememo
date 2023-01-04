import { useState, useEffect } from "react";
import { Card } from "./components/Card/Card";
import "./App.css";

function App() {
  const [pokeList, setPokeList] = useState([]);
  const [board, setBoard] = useState(false);

  const [cardClicked, setCardClicked] = useState()
  const [message, setMessage] = useState(
    <h2>Clique em <span>Start</span> para começar</h2>
  );

  const [styleCard, setStyleCard] = useState("frontCard");
  

  const pokeApi = async () => {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/");
    const data = await response.json();
    const pokeData = data.results; // array de objetos

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
    setMessage(<h2>contando...</h2>)
  };

  function ramdonId() {
    const idNumber = Math.floor(Math.random() * (10 - 1) + 0);
    return idNumber;
  }

  function boardOnOff() {
    if (pokeList[8]) {
      setStyleCard("backCard")
      setBoard(true)
    }
  }

    function ramdonId() {
    const idNumber = Math.floor(Math.random() * (10 - 1) + 0);
    return idNumber;
  }

  const getCardClicked = r => {
    const cardTaked = r
    console.log("testeDoResultado: " + cardTaked)
    if (cardTaked === "bulbasaur") {
      console.log("you win")
    } else {
      console.log("loooose")
    }
  }

  // se a carta na qual cliquei tiver o mesmo nome que aparece na question.. então eu acertei. se nao... eu errei.

  useEffect(() => {
    const timer = setTimeout(boardOnOff, 5000);

    if(board){clearTimeout(timer);}
  
  }, [pokeList[8]]);

  return (
    <div className="App">
      <h1 className="title">~Pokememo~</h1>
      <div className="question_bar">
        {
          board ? <h2>Onde está <span>{pokeList[ramdonId()].name}</span>?</h2> : message
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
