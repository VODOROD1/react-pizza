import logo from "./logo.svg";
import "./scss/app.scss";
import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import PizzaBlock from "./components/PizzaBlock";
// import PizzaData from './assets/pizza.json';
import { useEffect, useState } from "react";

function App() {
  useEffect(() => {
    fetch("https://63de507d9fa0d60060fc8e1c.mockapi.io/items")
    .then((data) => {
      return data.json();
    })
    .then((jsonData) => {
      // setPizzaData(data);
      debugger;
      createPizzaBlocksArr(jsonData);
    })
  });

  let [pizzaBlocksArr, setPizzaBlocksArr] = useState();

  function createPizzaBlocksArr(PizzaData) {
    debugger;
    let pizzaBlocksArr = PizzaData?.map((elem) => {
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
    });

    setPizzaBlocksArr(pizzaBlocksArr);
  }

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
            <div className="content__items">{pizzaBlocksArr}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
