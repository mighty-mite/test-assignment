import { Route, Routes } from "react-router-dom";
import ProductPage from "./pages/ProductPage";
import MainPage from "./pages/MainPage";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/:id" element={<ProductPage />} />
      </Routes>
    </>
  );
}

export default App;
