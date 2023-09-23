import "./App.css";
import Search from "./components/Search/Search";
import Pokedex from "./components/pokedex/Pokedex";
import Routpath from "./components/routes/Routpath";

function App() {
  return (
    <div className="mainContainer">
      <Pokedex></Pokedex>
      <Search />
      <Routpath />
    </div>
  );
}

export default App;
