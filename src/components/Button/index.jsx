import "./style.css"

export const Button = (props) => {
  const disable = props.validation
  return (
    <button onClick={props.nameFunction} disabled={disable === true}>{props.nameButton}</button>
  );
}