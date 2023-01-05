import { useState } from "react";
import "./styles.css"

export function Card(props) {

  const getCard = (e) => {
    e.preventDefault();
    let cardName = props.name //tentando pegar a carta clicada
    // console.log("nome da carta: " + cardName)
    props.takingTheCard(cardName)
  }

  return (
    <div className={props.class} onClick={getCard}>
      <img src={props.img} alt="" />
      <span>{props.name}</span>
    </div>
  );
}
