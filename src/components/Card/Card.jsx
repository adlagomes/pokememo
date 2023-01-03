import { useState } from "react";
import "./styles.css"

export function Card(props) {
  // const [styleCard, setStyleCard] = useState("frontCard") // tentando mudar o estilo da carta pra "de frente" e "de costas"



  return (
    <div className={props.class} onClick={(e) => {
      let cardName = props.name // tentando pegar a carta clicada
      console.log(cardName)
    }}>
      <img src={props.img} alt="" />
      <span>{props.name}</span>
    </div>
  );
}
