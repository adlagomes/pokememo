import { useEffect, useState } from "react";
import "./style.css"

export const Timer = () => {
  const [timeSeconds, setTimeSeconds] = useState(5 % 60);

  const seconds = timeSeconds % 60

  const temporizador = () => {
    if (timeSeconds >= 1) {
      setTimeout(() => {
        setTimeSeconds(timeSeconds - 1)
      }, 1000)
    } else {
      return
    }
  }

  useEffect(() => {

    temporizador()

  }, [timeSeconds])

  return (
    <div className="timer">
      <span>{ seconds.toString().padStart(1, "0")}</span>
    </div>
  );
}