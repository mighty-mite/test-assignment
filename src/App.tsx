import { Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import ProductPage from "./pages/ProductPage";
import MainPage from "./pages/MainPage";
import { store } from "./store/store";
import "./App.css";
import TestPage from "./pages/TestPage";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Provider store={store}>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/:id" element={<ProductPage />} />
          <Route path="/test" element={<TestPage />} />
        </Routes>
      </Provider>
    </>
  );
}

export default App;
