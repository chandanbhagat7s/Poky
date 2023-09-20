import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./IndPok.css";
import usePokostate from "../Hook/usePokostate";

export default function IndPok() {
  usePokostate();
  const { id } = useParams();
  const [data, setData] = useState({});
  const [lod, setLod] = useState(false);

  let url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
  console.log(url);
  async function details() {
    console.log(id);
    const data = await fetch(url);
    const resData = await data.json();
    setData({
      name: resData.name,
      image: resData.sprites.other.dream_world.front_default,
      types: resData.types.map((t) => {
        return t.type.name;
      }),
    });
  }
  useEffect(() => {
    details();
    setLod(true);
  }, []);

  // const position = 500; // Change this value to your desired position

  // // Use the window.scrollTo() method to scroll to the specified position
  // window.scrollTo({
  //   top: position,
  //   behavior: "smooth", // Optional: Add smooth scrolling behavior
  // });
  return (
    <>
      <div className="details-container"></div>
      <div className="cross">
        {lod ? (
          <Link to={"/"}>
            <button className="cross"> &times;</button>
          </Link>
        ) : (
          ""
        )}
      </div>
      <div className="details">
        {{ lod } ? (
          <div className="ind-container">
            <h1>{data.name}</h1>
            {<img src={data.image} alt="" />}
            <br />
            {/* {console.log(data.types)} */}
            types : {data.types ? data.types.map((p) => p) : ""}
          </div>
        ) : (
          "loading"
        )}

        {/* rasising similer types */}
      </div>
    </>
  );
}
