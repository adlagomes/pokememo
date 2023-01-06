import { useState } from "react";
import "./styles.css"

export function Card(props) {
  const [style, setStyle] = useState("")
  // const [flag, setFlag] = useState(false) // tentando criar uma flag pra impedir que outra carta seja virada

  const getCard = (e) => {
    e.preventDefault();
    let cardName = props.name //tentando pegar a carta clicada
    props.takingTheCard(cardName)
    if (props.class !== "frontCard") {
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
