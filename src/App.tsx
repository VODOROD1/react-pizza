import "./scss/app.scss";
// import React from "react";
import Home from "./pages/Home";
import Cart from "./pages/Cart/Cart";
import NotFound from "./pages/NotFound";
import { Routes, Route } from "react-router-dom";
import FullPizza from "./pages/FullPizza";
import MainLayout from "./layouts/MainLayout";

// export const SearchContext = React.createContext();

function App() {

  return (
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route element={<Home />} path="" />
          <Route element={<Cart />} path="cart" />
          <Route element={<FullPizza />} path="pizza/:id" />
          <Route element={<NotFound />} path="*" />
        </Route>
      </Routes>
  );
}

export default App;
