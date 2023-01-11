import { useEffect, useState } from "react";
import { BackCard } from "../BackCard";
import { FrontCard } from "../FrontCard";
import "./styles.css";

export function Board(props) {
  const [showCard, setShowCard] = useState(props.show);

  const getCard = () => {
    let cardName = props.name; //tentando pegar a carta clicada
    if (props.takingTheCard) {
      props.takingTheCard(cardName);
    }
  };

  useEffect(() => {
    setShowCard(props.show);
  }, [props.show]);

  return (
    <div
      className="card"
      onClick={() => {
        getCard();
        setShowCard(!showCard);
      }}
    >
      <div className="card__content">
        {showCard ? <FrontCard img={props.img} name={props.name} /> : <BackCard/>}
      </div>
    </div>
  );
}
