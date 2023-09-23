import { useState, useEffect } from "react";

function usePokostate() {

    const [pokoObjState, setPokoObjState] = useState({
        list: [],
        load: true,
        url: "https://pokeapi.co/api/v2/pokemon",
        pre: "",
        next: "",
    });

    useEffect(() => {
        // setLoad(true);
        // setPokoObjState({ ...pokoObjState, load: true });  // for multiple update this wont work

        // for multiple update we need to pass callback okk
        setPokoObjState(() => ({ ...pokoObjState, load: true }));

        async function getData() {
            let data = await fetch(pokoObjState.url);
            // result of getiing all the url of pokymon
            data = await data.json();

            // setPre(data.previous);
            // setNext(data.next);

            // setPokoObjState({ ...pokoObjState, pre: data.previous, next: data.next });
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
            // console.log(resolvedPok);
            // setLoad(false);
            // now settin the data into arrayv

            let totalList = resolvedPok.map((p) => {
                return {
                    name: p.name,
                    image: p.sprites.other.dream_world.front_default,
                    id: p.id,
                };
            });

            // setList(totalList);
            setPokoObjState({
                ...pokoObjState,
                load: false,
                list: totalList,
                pre: data.previous,
                next: data.next,
            });
            console.log(pokoObjState);

            //   console.log(data);
        }
        getData();
    }, [pokoObjState.url]);


    return [pokoObjState, setPokoObjState];


}

export default usePokostate;