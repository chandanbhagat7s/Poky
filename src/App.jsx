import "./App.css";
import Pokolist from "./components/PokoList/Pokolist";
import Search from "./components/Search/Search";
import Pokedex from "./components/pokedex/Pokedex";

function App() {
  return (
    <div className="mainContainer">
      <Pokedex></Pokedex>
      <Search />
      <Pokolist />
    </div>
  );
}

export default App;
