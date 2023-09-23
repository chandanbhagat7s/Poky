import { useEffect, useState } from "react";
import { Link, redirect, useParams } from "react-router-dom";
import "./IndPok.css";

export default function IndPok() {
  // usePokostate();
  const { id } = useParams();
  const [data, setData] = useState({});

  let url = `https://pokeapi.co/api/v2/pokemon/${id}/`;

  // console.log(url);
  async function details() {
    // console.log(id);
    const d = await fetch(url);
    const resData = await d.json();
    if (resData.types) {
      console.log(resData);
      let sdata = await fetch(
        ` https://pokeapi.co/api/v2/type/${resData.types[0].type.name}`
      );

      const simdata = await sdata.json();
      // console.log(simdata);
      setData((data) => ({
        ...data,
        name: resData.name,
        image: resData.sprites.other.dream_world.front_default,
        types: resData.types
          ? resData.types.map((t) => {
              // console.log(t);
              return t.type.name;
            })
          : "",
        sdata: simdata.pokemon.slice(0, 5),
      }));
    }
    !resData.types.length &&
      setData((data) => ({
        ...data,
        name: resData.name,
        image: resData.sprites.other.dream_world.front_default,
        types: resData.types
          ? resData.types.map((t) => {
              // console.log(t);
              return t.type.name;
            })
          : "",
      }));
    console.log(data);
  }

  useEffect(() => {
    details();
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
        <Link to={"/"}>
          <button className="cross"> &times;</button>
        </Link>
      </div>
      <div className="details">
        <div className="ind-container">
          <h1>{data.name}</h1>
          {<img src={data.image} alt="" />}
          <br />
          {/* {console.log(data.types)} */}
          types :{data.types ? data.types.map((e) => e + "  ") : ""}
          <div className="types"></div>
        </div>

        {/* rasising similer types */}
        <div className="simillar_container">
          {data.types && (
            <ul>
              {data.sdata.map((el) => {
                return <li key={el.pokemon.name}>{el.pokemon.name}</li>;
              })}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
