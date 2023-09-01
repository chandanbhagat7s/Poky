import "./PokL.css";
function PokL({ name, image }) {
  return (
    <>
      <div className="box">
        <div className="name">{name}</div>
        <div className="image">
          <img src={image} alt={`${name}'s image`} />
        </div>
      </div>
    </>
  );
}
export default PokL;
