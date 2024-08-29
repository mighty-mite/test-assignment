import { Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import ProductPage from "./pages/ProductPage";
import MainPage from "./pages/MainPage";
import { store } from "./store/store";
import "./App.css";

function App() {
  return (
    <>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/:id" element={<ProductPage />} />
        </Routes>
      </Provider>
    </>
  );
}

export default App;
