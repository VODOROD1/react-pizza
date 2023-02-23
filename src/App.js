import "./scss/app.scss";
import React from 'react';
import Header from "./components/Header";
import { useState } from "react";
import Home from "./pages/Home";
import Backet from "./pages/Cart";
import NotFound from "./pages/NotFound";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

export const SearchContext = React.createContext();

function App() {
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();

  return (
    <div className="App">
      <SearchContext.Provider value={[searchValue, setSearchValue]}>
        <div className="wrapper">
          {/* <Header
            searchValue={searchValue}
            setSearchValue={(newValue) => setSearchValue(newValue)}
          /> */}
          <Header />
          <div className="content">
            <Routes>
              <Route element={<Home />} path="/home" />
              <Route element={<Backet />} path="/cart" />
              <Route element={<NotFound />} path="/*" />
            </Routes>
          </div>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
