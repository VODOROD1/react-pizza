import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import { sortGlossary } from "../components/Sort";
import Skeleton from "../components/PizzaBLock/Skeleton";
import PizzaBlock from "../components/PizzaBLock/PizzaBlock";
import Pagination from "../components/Pagination/Pagination";
import { SearchContext } from "../App";
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/filterSlice";
import { setPizzasItems } from "../redux/pizzaSlice";

function Home() {
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const navigate = useNavigate();
  const categoryId = useSelector((state) => state?.filterReducer?.categoryId);
  const sortType = useSelector(
    (state) => state?.filterReducer?.sort.sortProperty
  );
  const currentPage = useSelector((state) => state?.filterReducer?.currentPage);
  const pizzaData = useSelector(state => state.pizzasReducer.items);
  const dispatch = useDispatch();
  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };
  const onSetCurrentPage = (number) => {
    dispatch(setCurrentPage(number));
  };
  let [isPizzaLoading, setIsPizzaLoading] = useState(true);
  // let [pizzaData, setPizzaData] = useState();
  // let [currentPage, setCurrentPage] = useState(1);
  let [searchValue] = React.useContext(SearchContext);

  // const setCurrentPageHandler = (page) => {
  //   setCurrentPage
  // }

  const fetchData = async () => {
    setIsPizzaLoading(true);
    try {
      const res = await axios.get(
        `https://63de507d9fa0d60060fc8e1c.mockapi.io/items?page=${currentPage}&limit=4&${
          categoryId > 0 ? `category=${categoryId}` : ""
        }&sortBy=${sortType}&order=desc&filter=${searchValue}`
      );
      debugger;
      dispatch(setPizzasItems(res.data));
    } catch (error) {
      debugger;
      alert("Ошибка при получении пицц!");
      console.log("ERROR", error);
    } finally {
      setIsPizzaLoading(false);
    }

    window.scrollTo(0, 0);
  };

  // Если изменили параметры и был первый рендер
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortType,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, searchValue, currentPage]);

  // Если был первый рендер, то проверяем URL-параметры и сохраняем в redux
  useEffect(() => {
    if (window.location.search) {
      let params = qs.parse(window.location.search.substring(1));
      const sort = sortGlossary.find(
        (obj) => obj.sortProperty === params.sortProperty
      );

      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      isSearch.current = false;
    }
  }, []);

  // Если был первый рендер, то запрашиваем пиццы
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      fetchData();
    }

    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          categoryId={categoryId}
          onSetCategoryId={onChangeCategory}
        />
        <Sort />
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
                    id={elem.id}
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
      <Pagination onChangePage={(number) => onSetCurrentPage(number)} />
    </div>
  );
}

export default Home;
