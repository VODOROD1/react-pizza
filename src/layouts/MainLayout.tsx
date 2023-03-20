import React, { useState } from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

export const SearchContext = React.createContext<any>("");

const MainLayout: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");

  return (
    <div className="wrapper">
      <SearchContext.Provider value={[searchValue, setSearchValue]}>
        <Header />
        <div className="content">
            <Outlet />
        </div>
      </SearchContext.Provider>
    </div>
  );
};

export default MainLayout;
