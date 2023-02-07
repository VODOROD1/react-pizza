import logo from "./logo.svg";
import "./scss/app.scss";
import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import PizzaBlock from "./components/PizzaBLock/PizzaBlock";
import Skeleton from "./components/PizzaBLock/Skeleton";
import { useEffect, useState } from "react";

function App() {
  let [isPizzaLoading, setIsPizzaLoading] = useState(true);
  let [pizzaData, setPizzaData] = useState();

  useEffect(() => {
    fetch("https://63de507d9fa0d60060fc8e1c.mockapi.io/items")
      .then((data) => {
        return data.json();
      })
      .then((jsonData) => {
        setIsPizzaLoading(false);
        setPizzaData(jsonData);
      });
  },[]);

  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <div className="content__top">
              <Categories />
              <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">{
              isPizzaLoading ?
              [1,2,3,4,5,6].map((elem, index) =><Skeleton key={index} />) :
              pizzaData?.map((elem) => {
                return (
                  <PizzaBlock
                    key={elem.id}
                    imageUrl={elem.imageUrl}
                    name={elem.name}
                    types={elem.types}
                    sizes={elem.sizes}
                    price={elem.price}
                    category={elem.category}
                    rating={elem.rating}
                  />
                );
              })
            }</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
