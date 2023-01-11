import { useState, useEffect } from "react";
import { Button } from "./components/Button";
import { Card } from "./components/Card";
import { Timer } from "./components/Timer";
import { Statement } from "./components/Statement";
import { Modal } from "./components/Modal";
import "./App.css";

function App() {
  const [pokeList, setPokeList] = useState([]);
  const [namePokemon, setNamePokemon] = useState();

  const [board, setBoard] = useState(false);
  const [message, setMessage] = useState(<Statement />);

  const [showCard, setShowCard] = useState(true);

  const [buttonOnOff, setButtonOnOff] = useState(false);
  const [modalOnOff, setModalOnOff] = useState("invisible");

  const [victory, setVictory] = useState(0);
  const [defeat, setDefeat] = useState(0);
  const [closingMessage, setClosingMessage] = useState("");

  const [restart, setRestart] = useState(false);

  const pokeApi = async () => {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/");
    const data = await response.json();
    const pokeData = data.results;

    pokeData.map(({ url, name }) => getPokeData(url, name));

    setButtonOnOff(true); // desabilita o botão "Start"
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
    setMessage(<Timer />);
  };

  function ramdonId() {
    const idNumber = Math.floor(Math.random() * (10 - 1) + 0);
    return idNumber;
  }

  function boardOnOff() {
    if (pokeList[8]) {
      setShowCard(false);
      setNamePokemon(pokeList[ramdonId()].name);
      setBoard(true);
    }
  }

  const getCardClicked = (n) => {
    if (board) {
      if (n === namePokemon) {
        victoryPoints(1);
        setClosingMessage("Parabéns, você acertou!");
      } else {
        defeatPoints(1);
        setClosingMessage("A memória tá fraca, heim?");
      }
    } else {
      return;
    }
    setModalOnOff("");
    setButtonOnOff(true);
  };

  const victoryPoints = (n) => {
    setVictory(victory + n);
  };

  const defeatPoints = (n) => {
    setDefeat(defeat + n);
  };

  const Score = () => {
    return (
      <table className="score">
        <tbody>
          <tr>
            <td>Vitórias:</td>
            <td>{victory}</td>
          </tr>
          <tr>
            <td>Derrotas:</td>
            <td>{defeat}</td>
          </tr>
        </tbody>
      </table>
    );
  };

  function shufflePokeList(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function restartApp() {
    setModalOnOff("invisible");
    setShowCard(true);
    setBoard(false);
    setRestart(true);
    let newPokeList = pokeList;
    setPokeList(shufflePokeList(newPokeList));
  }

  useEffect(() => {
    setTimeout(boardOnOff, 6000);
  }, [pokeList[8], restart]);

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
                show={showCard}
                takingTheCard={getCardClicked}
              />
            );
          })
        ) : (
          <></>
        )}
      </div>
      <Modal msg={closingMessage} visibility={modalOnOff} action={restartApp} />
      <div className="footer">
        <Button
          nameFunction={pokeApi}
          nameButton="Start"
          validation={buttonOnOff}
        />
      </div>
    </div>
  );
}

export default App;
