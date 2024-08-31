import { Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import ProductPage from "./pages/ProductPage";
import MainPage from "./pages/MainPage";
import { store } from "./store/store";
import Header from "./components/Header";
import CreateProductPage from "./pages/CreateProductPage";
import "./App.css";

function App() {
  return (
    <>
      <Provider store={store}>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/:id" element={<ProductPage />} />
          <Route path="/create-product" element={<CreateProductPage />} />
        </Routes>
      </Provider>
    </>
  );
}

export default App;
