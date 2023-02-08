import React from "react";
import { useEffect, useState } from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBLock/Skeleton";
import PizzaBlock from "../components/PizzaBLock/PizzaBlock";
import Search from "../components/Search/Search";

function Home() {
  let [isPizzaLoading, setIsPizzaLoading] = useState(true);
  let [pizzaData, setPizzaData] = useState();

  let [categoryId, setCategoryId] = useState(0);
  let [choicenSort, choiceSort] = useState({
    name: "популярности",
    sortProperty: "rating",
  });

  function onSetCategoryId(value) {
    setCategoryId(value);
  }

  function onChoiceSort(obj) {
    choiceSort(obj);
  }

  useEffect(() => {
    setIsPizzaLoading(true);
    fetch(
      `https://63de507d9fa0d60060fc8e1c.mockapi.io/items?${
        categoryId > 0 ? `category=${categoryId}` : ""
      }&sortBy=${choicenSort.sortProperty}&order=desc`
    )
      .then((data) => {
        return data.json();
      })
      .then((jsonData) => {
        setIsPizzaLoading(false);
        setPizzaData(jsonData);
      });
    window.scrollTo(0, 0);
  }, [categoryId, choicenSort]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryId={categoryId} onSetCategoryId={onSetCategoryId} />
        <Sort choicenSort={choicenSort} onChoiceSort={onChoiceSort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isPizzaLoading
          ? [1, 2, 3, 4, 5, 6].map((elem, index) => <Skeleton key={index} />)
          : pizzaData?.map((elem) => {
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
            })}
      </div>
    </div>
  );
}

export default Home;
