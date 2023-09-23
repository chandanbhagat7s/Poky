import "./PokL.css";
import { Link } from "react-router-dom";
function PokL({ name, image, id }) {
  return (
    <>
      <div className="box">
        <Link to={`/pokemon/${id}`}>
          <div className="name">{name}</div>
          <div className="image">
            <img src={image} alt={`${name}'s image`} />
          </div>
        </Link>
      </div>
    </>
  );
}
export default PokL;
