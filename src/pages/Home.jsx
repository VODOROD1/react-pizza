import React from "react";
import { useEffect, useState } from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBLock/Skeleton";
import PizzaBlock from "../components/PizzaBLock/PizzaBlock";

function Home() {
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
        <>
        <div className="content__top">
            <Categories />
            <Sort />
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
        </>
    );
}

export default Home;