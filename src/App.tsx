import "./App.css";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import PokedexPage from "./pages/PokedexPage";
import PokemonDetailPage from "./pages/PokemonDetailPage";

function App() {
  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 py-4">
      <Header />
      <Routes>
        <Route path="/" element={<PokedexPage />} />
        <Route path="/pokemon/:id" element={<PokemonDetailPage />} />
      </Routes>
    </div>
  );
}

export default App;
