import { useState, useEffect } from "react";
import { api } from "./services/api";

import { Button } from "./components/Button";
import { Card } from "./components/Card";
import { Timer } from "./components/Timer";
import { Modal } from "./components/Modal";

import { Statement } from "./utils/Statement";
import { randomId } from "./utils/randomId";
import { Score } from "./utils/Score/Score";

import "./App.css";

function App() {
  const [initialPokeList, setInitialPokeList] = useState([]);
  const [namePokemon, setNamePokemon] = useState();
  const [board, setBoard] = useState(false);
  const [message, setMessage] = useState(<Statement />);
  const [showCard, setShowCard] = useState(true);
  const [showButton, setShowButton] = useState(false);
  const [showModal, setShowModal] = useState("invisible");
  const [victory, setVictory] = useState(0);
  const [defeat, setDefeat] = useState(0);
  const [closingMessage, setClosingMessage] = useState("");
  const [restart, setRestart] = useState(false);

  const pokeApi = async () => {
    const response = await api;
    const data = await response.json();
    const pokeData = data.results;

    pokeData.map(({ url, name }) => getPokeData(url, name));

    setShowButton(true);
  };
  
  const getPokeData = async (url, name) => {
    const response = await fetch(url);
    const pokeData = await response.json();

    setInitialPokeList((rest) =>
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

// rever essa função, verificar se posso fazer esses comando de outro modo.
  const boardOnOff = () => {
    if (initialPokeList[8]) {
      setShowCard(false);
      setNamePokemon(initialPokeList[randomId()].name);
      setBoard(true);
    }
  }

  const handleCardClick = (n) => {
    if (board) {
      if (n === namePokemon) {
        setVictory(victory + 1);
        setClosingMessage("Parabéns, você acertou!");
      } else {
        setDefeat(defeat + 1);
        setClosingMessage("A memória tá fraca, heim?");
      }
    } else return;
    setShowModal("");
    setShowButton(true);
  };

  const shufflePokeList = (arr) => {
    return arr.sort(() => Math.random() - 0.5);
  }

  // verificar se consigo enviar pra utils
  const restartApp = () => {
    setShowModal("invisible");
    setShowCard(true);
    setBoard(false);
    setRestart(true);
    let newPokeList = initialPokeList;
    shufflePokeList(newPokeList);
  }

  useEffect(() => {
    setTimeout(boardOnOff, 6000);
  }, [initialPokeList[8], restart]);

  return (
    <div className="App">
      <div className="header">
        <h1 className="title">~Pokememo~</h1>
      </div>
      <div className="subtitle">
        {board ? (
          <h2>
            Onde está <span>{namePokemon}</span>?
          </h2>
        ) : (
          message
        )}
      </div>
      <div className="board">
        {initialPokeList[8] ? (
          initialPokeList.map(({ id, name, imagem }) => {
            return (
              <Card
                key={id}
                name={name}
                img={imagem}
                show={showCard}
                takingTheCard={handleCardClick}
              />
            );
          })
        ) : (
          <></>
        )}
      </div>
      {showButton ? <Score w={victory} d={defeat} /> : <></>}
      <Modal msg={closingMessage} visibility={showModal} action={restartApp} />
      <div className="footer">
        <Button
          nameFunction={pokeApi}
          nameButton="Start"
          validation={showButton}
        />
      </div>
    </div>
  );
}

export default App;
