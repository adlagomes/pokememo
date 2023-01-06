import { useState, useEffect } from "react";
import { Button } from "./components/Button";
import { Card } from "./components/Card/Card";
import { Timer } from "./components/Timer";
import { Statement } from "./components/Statement";
import "./App.css";

function App() {
  const [pokeList, setPokeList] = useState([]);
  const [namePokemon, setNamePokemon] = useState();

  const [board, setBoard] = useState(false);
  const [message, setMessage] = useState(<Statement />);

  const [styleCard, setStyleCard] = useState("frontCard");
  const [renameButton, setRenameButton] = useState("Start");
  const [aFunction, setAFunction] = useState();

  const [onOff, setOnOff] = useState(false)

  const [victory, setVictory] = useState(0);
  const [defeat, setDefeat] = useState(0);

  const pokeApi = async () => {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/");
    const data = await response.json();
    const pokeData = data.results;

    pokeData.map(({ url, name }) => getPokeData(url, name));
    setOnOff(true)
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

    // setAFunction(getPokeData)
    setMessage(<Timer />);
  };

  function ramdonId() {
    const idNumber = Math.floor(Math.random() * (10 - 1) + 0);
    return idNumber;
  }

  function boardOnOff() {
    if (pokeList[8]) {
      setStyleCard("backCard");
      setNamePokemon(pokeList[ramdonId()].name);
      setBoard(true);
    setRenameButton("Restart");

    }
  }

  const getCardClicked = (r) => {
    const chosenCard = r;
    console.log("pokemon: " + chosenCard);
    if (chosenCard === namePokemon) {
      console.log("you win");
      victoryPoints(1);
    } else {
      console.log("loooose");
      defeatPoints(1);
    }
    setOnOff(false)
  };

  const victoryPoints = (n) => {
    const point = n;
    setVictory(victory + n);
  };

  const defeatPoints = (n) => {
    const point = n;
    setDefeat(defeat + n);
  };

  const Score = () => {
    return (
      <table className="score">
        <tbody>
          <tr>
            <td>Vitória</td>
            <td>{victory}</td>
          </tr>
          <tr>
            <td>Derrota</td>
            <td>{defeat}</td>
          </tr>
        </tbody>
      </table>
    );
  };

  useEffect(() => {
    const timer = setTimeout(boardOnOff, 6000);

    if (board) {
      clearTimeout(timer);
    }
  }, [pokeList[8]]);

  return (
    <div className="App">
      <div className="header">
        <h1 className="title">~Pokememo~</h1>
        <Score />
      </div>
      <div>
        {board ? (
          <h2>
            Onde está <span>{namePokemon}</span>?
          </h2>
        ) : (
          message
        )}
      </div>
      <div className="table">
        {pokeList[8] ? (
          pokeList.map(({ id, name, imagem }) => {
            return (
              <Card
                key={id}
                name={name}
                img={imagem}
                class={styleCard}
                takingTheCard={getCardClicked}
              />
            );
          })
        ) : (
          <></>
        )}
      </div>
      <div className="footer">
        <Button nameFunction={pokeApi} nameButton={renameButton} validation={onOff} />
      </div>
    </div>
  );
}

export default App;
