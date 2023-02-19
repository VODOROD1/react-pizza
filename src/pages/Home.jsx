import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBLock/Skeleton";
import PizzaBlock from "../components/PizzaBLock/PizzaBlock";
import Pagination from "../components/Pagination/Pagination";
import { SearchContext } from "../App";
import { setCategoryId } from "../redux/filterSlice";

function Home() {
  const categoryId = useSelector((state) => state?.filterReducer?.categoryId);
  const dispatch = useDispatch();
  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };
  // const setCategoryId = () => {

  // }

  let [isPizzaLoading, setIsPizzaLoading] = useState(true);
  let [pizzaData, setPizzaData] = useState();
  // let [categoryId, setCategoryId] = useState(0);
  let [choicenSort, choiceSort] = useState({
    name: "популярности",
    sortProperty: "rating",
  });
  let [currentPage, setCurrentPage] = useState(1);
  let [searchValue] = React.useContext(SearchContext);

  // function onSetCategoryId(value) {
  //   setCategoryId(value);
  // }

  function onChoiceSort(obj) {
    choiceSort(obj);
  }

  useEffect(() => {
    setIsPizzaLoading(true);
    fetch(
      `https://63de507d9fa0d60060fc8e1c.mockapi.io/items?page=${currentPage}&limit=4&${
        categoryId > 0 ? `category=${categoryId}` : ""
      }&sortBy=${choicenSort.sortProperty}&order=desc&filter=${searchValue}`
    )
      .then((data) => {
        return data.json();
      })
      .then((jsonData) => {
        debugger;
        setIsPizzaLoading(false);
        setPizzaData(jsonData);
      });
    window.scrollTo(0, 0);
  }, [categoryId, choicenSort, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          categoryId={categoryId}
          onSetCategoryId={onChangeCategory}
        />
        <Sort choicenSort={choicenSort} onChoiceSort={onChoiceSort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isPizzaLoading
          ? [1, 2, 3, 4, 5, 6].map((elem, index) => <Skeleton key={index} />)
          : pizzaData
              ?.filter((elem) => {
                if (
                  elem.name.toLowerCase().includes(searchValue.toLowerCase())
                ) {
                  return true;
                } else {
                  return false;
                }
              })
              .map((elem) => {
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
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
}

export default Home;
