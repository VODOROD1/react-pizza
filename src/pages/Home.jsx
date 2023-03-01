import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import qs from "qs";
import { useNavigate } from "react-router-dom";
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
import { fetchPizzas } from "../redux/pizzaSlice";

function Home() {
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const navigate = useNavigate();
  const categoryId = useSelector((state) => state?.filterReducer?.categoryId);
  const sortType = useSelector(
    (state) => state?.filterReducer?.sort.sortProperty
  );
  const currentPage = useSelector((state) => state?.filterReducer?.currentPage);
  const pizzaData = useSelector((state) => state?.pizzaReducer?.items);
  const status = useSelector((state) => state?.pizzaReducer?.status);
  const errorMessage = useSelector(
    (state) => state?.pizzaReducer?.errorMessage
  );
  const dispatch = useDispatch();
  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };
  const onSetCurrentPage = (number) => {
    dispatch(setCurrentPage(number));
  };
  // let [status, setIsPizzaLoading] = useState(true);
  // let [pizzaData, setPizzaData] = useState();
  // let [currentPage, setCurrentPage] = useState(1);
  let [searchValue] = React.useContext(SearchContext);

  // const setCurrentPageHandler = (page) => {
  //   setCurrentPage
  // }

  const fetchData = async () => {
    dispatch(
      fetchPizzas({
        currentPage,
        categoryId,
        sortType,
        searchValue,
      })
    );
    window.scrollTo(0, 0);
  };

  // Если был первый рендер, то запрашиваем пиццы
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      fetchData();
    }

    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage]);

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
      {status === "error" ? (
        <div className="content__error">
          <h2>
            Произошла ошибка! <icon>😕</icon>
          </h2>
          <p>{errorMessage}</p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading"
            ? [1, 2, 3, 4].map((elem, index) => <Skeleton key={index} />)
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
      )}

      <Pagination onChangePage={(number) => onSetCurrentPage(number)} />
    </div>
  );
}

export default Home;
