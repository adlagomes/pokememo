import "./styles.css"

export function Card(props) {
  // console.log(props)
  return (
    <div className="Card">
      <img src={props.img} alt="" />
      <span>{props.name}</span>
    </div>
  );
}
