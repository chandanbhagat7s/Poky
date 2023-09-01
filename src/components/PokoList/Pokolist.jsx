import { useEffect, useState } from "react";
import PokL from "../RenderList/PokL";
import "./Pokolist.css";
import ScrollButton from "./sc";
// let Urls = ;

function Pokolist() {
  const [list, setList] = useState([]);
  const [load, setLoad] = useState(true);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon");
  const [pre, setPre] = useState(null);
  const [next, setNext] = useState(null);

  useEffect(() => {
    setLoad(true);
    async function getData() {
      let data = await fetch(url);
      // result of getiing all the url of pokymon
      data = await data.json();
      setPre(data.previous);
      setNext(data.next);
      console.log(data);

      // on the base of url making calls
      let arrayData = data.results;
      //   console.log(arrayData);

      //   now resolving the urls
      let listofPok = arrayData.map(async (point) => {
        let m = await fetch(point.url);
        return m.json();
      });

      let resolvedPok = await Promise.all(listofPok);
      setLoad(false);
      // now settin the data into array
      let totalList = resolvedPok.map((p) => {
        return {
          name: p.name,
          image: p.sprites.other.dream_world.front_default,
          id: p.id,
        };
      });
      setList(totalList);

      //   console.log(data);
    }
    getData();
  }, [url]);

  return (
    <>
      <div className="pokolists">
        {load
          ? "loading"
          : list.map((p) => {
              return (
                <PokL name={p.name} image={p.image} key={p.id} id={p.id}></PokL>
              );
            })}
      </div>
      <div className="btn">
        <button
          disabled={pre == null ? true : false}
          className="pre"
          onClick={() => {
            setUrl(pre);
          }}
        >
          previous
        </button>
        <button
          disabled={next == null ? true : false}
          className="next"
          onClick={() => {
            setUrl(next);
          }}
        >
          next
        </button>
      </div>
    </>
  );
}

export default Pokolist;
