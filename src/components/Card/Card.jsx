import { useState } from "react";
import "./styles.css"

export function Card(props) {
  const [style, setStyle] = useState("")
  const [flag, setFlag] = useState(false)

  const getCard = (e) => {
    e.preventDefault();
    let cardName = props.name //tentando pegar a carta clicada
    props.takingTheCard(cardName)
    if (props.class !== "frontCard" && !flag) {
      setStyle("virar")
    }else {
      return
    }
  }
  return (
    <div className={props.class} onClick={getCard} id={style}>
      <img src={props.img} alt="" />
      <span>{props.name}</span>
    </div>
  );
}
