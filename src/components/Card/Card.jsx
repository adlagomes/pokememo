import { useEffect, useState } from "react";
import "./styles.css";

export function Card(props) {
  const [style, setStyle] = useState();
  
  const getCard = (e) => {
    e.preventDefault();
    let cardName = props.name; //tentando pegar a carta clicada
    props.takingTheCard(cardName);
    if (style !== "backCard") {
      setStyle("virar");
    } else {
      return;
    }
  };

  return (
    <div className={props.class} onClick={getCard}>
      <img src={props.img} alt="" />
      <span>{props.name}</span>
    </div>
  );
}
