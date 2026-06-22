import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home.jsx";
import { CoverSearch } from "./pages/CoverSearch.jsx";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/capas" element={<CoverSearch />} />
    </Routes>
  );
};
