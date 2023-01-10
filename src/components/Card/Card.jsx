import { useEffect, useState } from "react";
import { BackCard } from "../BackCard/BackCard"
import "./styles.css";

export function Card(props) {
  const [showCard, setShowCard] = useState(props.showCardAll)

  const getCard = (e) => {
    e.preventDefault();
    let cardName = props.name; //tentando pegar a carta clicada
    props.takingTheCard(cardName);
  };

  useEffect(() => {
    setShowCard(props.showCardAll)
  }, [props.showCardAll])

  return (
    <div onClick={(e) => {
      setShowCard(!showCard)
      getCard(e)
    }}>
      {
        showCard ?
          <div className="frontCard">
            <img src={props.img} alt="" />
            <span>{props.name}</span>
          </div> :
          <BackCard></BackCard>
      }
    </div>
  );
}
