import "./style.css"

export const Button = (props) => {
  const disable = props.validation

  return (
    <button onClick={props.nameFunction} disabled={disable === true} id={disable ? "visible" : ""}>{props.nameButton}</button>
  );
}