import { Button } from "../Button";
import "./style.css"

export const Modal = (props) => {

  return (
    <div className="modal-wrapper" id={props.visibility}>
      <div className="bkg">
        <div className="msg">{props.msg}</div>
        <img src={props.img} alt=""/>
        <Button nameButton="Restart" nameFunction={props.action}/>
      </div>
    </div>
  );
}