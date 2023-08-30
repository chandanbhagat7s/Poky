import { useEffect, useState } from "react";
import PokL from "../RenderList/PokL";
let Urls = "https://pokeapi.co/api/v2/pokemon";

function Pokolist() {
  const [list, setList] = useState([]);
  const [load, setLoad] = useState(true);
  const [clicke, setClicked] = useState(true);

  async function clickedNext() {
    let data = await fetch(Urls);
    // result of getiing all the url of pokymon
    data = await data.json();
    console.log(data);
    Urls = data.next;
    setClicked(clicke ? false : true);
  }

  async function clickedPre() {
    let data = await fetch(Urls);
    // result of getiing all the url of pokymon
    data = await data.json();
    console.log(data);
    Urls = data.previous;
    setClicked(clicke ? false : true);
  }

  useEffect(() => {
    async function getData() {
      let data = await fetch(Urls);
      // result of getiing all the url of pokymon
      data = await data.json();

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
  }, [clicke]);

  return (
    <>
      <div className="pokolists"></div>
      {load
        ? "loading"
        : list.map((p) => {
            return <PokL name={p.name} image={p.image} key={p.id}></PokL>;
          })}

      <div className="btn">
        <button className="next" onClick={clickedPre}>
          Pre
        </button>
        <button className="pre" onClick={clickedNext}>
          Next
        </button>
      </div>
    </>
  );
}

export default Pokolist;
