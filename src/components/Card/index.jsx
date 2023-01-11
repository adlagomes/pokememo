import { useEffect, useState } from "react";
import "./styles.css";

export function Card(props) {
  const [showCard, setShowCard] = useState(props.show);
  const cardContentClassNames = ["card"];

  showCard !== true && cardContentClassNames.push("cardFlipped");

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
      onClick={() => {
        setShowCard(true)
        getCard();
      }}
    >
      <div className={cardContentClassNames.join(" ")}>
        <div className="cardFace frontCard">
          <img src={props.img} alt={props.name} />
          <span>{props.name}</span>
        </div>
        <div className="cardFace backCard" />
      </div>
    </div>
  );
}
