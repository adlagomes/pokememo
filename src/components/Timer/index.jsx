import { useEffect, useState } from "react";
import "./style.css"

export const Timer = () => {
  const [totalTimeInSeconds, setTotalTimeInSeconds] = useState(5 % 60);

  const seconds = totalTimeInSeconds % 60

  const temporizador = () => {
    if (totalTimeInSeconds >= 1) {
      setTimeout(() => {
        setTotalTimeInSeconds(totalTimeInSeconds - 1)
      }, 1000)
    } else {
      return
    }
  }

  useEffect(() => {

    temporizador()

  }, [totalTimeInSeconds])

  return (
    <div className="timer">
      <span>{ seconds.toString().padStart(1, "0")}</span>
    </div>
  );
}