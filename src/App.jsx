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
  const [image, setImage] = useState();
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
          imagem: pokeData.sprites.front_default
        },
      ]
        .sort(() => Math.random() - 0.5)
        .slice(0, 9)
    );
    
    setMessage(<Timer />);
  };

  const cardsFaceDown = () => {
    if (initialPokeList[8]) {
      setShowCard(false);
      setNamePokemon(initialPokeList[randomId()].name);
      setBoard(true);
    }
  };

  const handleCardClick = (n) => {
    if (board) {
      if (n === namePokemon) {
        setVictory(victory + 1);
        setClosingMessage("Parabéns, você acertou!");
        setImage("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/25.gif")
      } else {
        setDefeat(defeat + 1);
        setClosingMessage("A memória tá ruim, heim?");
        setImage("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/54.gif")
      }
    } else return;
    setShowModal("");
    setShowButton(true);
  };

  const shufflePokeList = (arr) => {
    return arr.sort(() => Math.random() - 0.5);
  };

  const restartGame = () => {
    setShowModal("invisible");
    setShowCard(true);
    setBoard(false);
    setRestart(true);
    let newPokeList = initialPokeList;
    shufflePokeList(newPokeList);
  };

  useEffect(() => {
    setRestart(false);
    setTimeout(cardsFaceDown, 6000);
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
      <Modal msg={closingMessage} img={image} visibility={showModal} action={restartGame} />
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
