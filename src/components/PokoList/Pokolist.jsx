// import { useEffect, useState } from "react";
import PokL from "../RenderList/PokL";
import "./Pokolist.css";
import usePokostate from "../Hook/usePokostate";

function Pokolist() {
  // const [list, setList] = useState([]);
  // const [load, setLoad] = useState(true);
  // const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon");
  // const [pre, setPre] = useState(null);
  // const [next, setNext] = useState(null);
  // const [pokoObjState, setPokoObjState] = useState({
  //   list: [],
  //   load: true,
  //   url: "https://pokeapi.co/api/v2/pokemon",
  //   pre: "",
  //   next: "",
  // });

  // useEffect(() => {
  //   // setLoad(true);
  //   // setPokoObjState({ ...pokoObjState, load: true });  // for multiple update this wont work

  //   // for multiple update we need to pass callback okk
  //   setPokoObjState(() => ({ ...pokoObjState, load: true }));

  //   async function getData() {
  //     let data = await fetch(pokoObjState.url);
  //     // result of getiing all the url of pokymon
  //     data = await data.json();

  //     // setPre(data.previous);
  //     // setNext(data.next);

  //     // setPokoObjState({ ...pokoObjState, pre: data.previous, next: data.next });
  //     console.log(data);

  //     // on the base of url making calls
  //     let arrayData = data.results;
  //     //   console.log(arrayData);

  //     //   now resolving the urls
  //     let listofPok = arrayData.map(async (point) => {
  //       let m = await fetch(point.url);
  //       return m.json();
  //     });

  //     let resolvedPok = await Promise.all(listofPok);
  //     // console.log(resolvedPok);
  //     // setLoad(false);
  //     // now settin the data into arrayv

  //     let totalList = resolvedPok.map((p) => {
  //       return {
  //         name: p.name,
  //         image: p.sprites.other.dream_world.front_default,
  //         id: p.id,
  //       };
  //     });

  //     // setList(totalList);
  //     setPokoObjState({
  //       ...pokoObjState,
  //       load: false,
  //       list: totalList,
  //       pre: data.previous,
  //       next: data.next,
  //     });
  //     console.log(pokoObjState);

  //     //   console.log(data);
  //   }
  //   getData();
  // }, [pokoObjState.url]);

  const [pokoObjState, setPokoObjState] = usePokostate();

  return (
    <>
      <div className="pokolists">
        {pokoObjState.load
          ? "loading"
          : pokoObjState.list.map((p) => {
              return (
                <PokL
                  name={p.name}
                  image={p.image}
                  key={p.name}
                  id={p.id}
                ></PokL>
              );
            })}
      </div>
      {/* {console.log(pokoObjState)} */}
      <div className="btn">
        <button
          disabled={pokoObjState.pre == null ? true : false}
          className="pre"
          onClick={() => {
            // setUrl(pre);
            setPokoObjState({ ...pokoObjState, url: pokoObjState.pre });
          }}
        >
          previous
        </button>
        <button
          disabled={pokoObjState.next == null ? true : false}
          className="next"
          onClick={() => {
            // setUrl(next);
            setPokoObjState({ ...pokoObjState, url: pokoObjState.next });
          }}
        >
          next
        </button>
      </div>
    </>
  );
}

export default Pokolist;
