import "./scss/app.scss";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Backet from "./pages/Backet";
import NotFound from "./pages/NotFound";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <Routes>
              <Route element={<Home />} path="/home" />
              <Route element={<Backet />} path="/backet" />
              <Route element={<NotFound />} path="/*" />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
