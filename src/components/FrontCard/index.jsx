export const FrontCard = ({ img, name }) => {
  return (
    <div className="card__face card__face--front">
      <img src={img} alt="" />
      <span>{name}</span>
    </div>
  );
};
