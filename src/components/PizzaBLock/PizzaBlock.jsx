import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../redux/cartSlice";
import { NavLink } from "react-router-dom";

let typesGlossary = ["тонкое", "традиционное"];

function PizzaBlock({ id, imageUrl, name, types, sizes, price }) {
  let [activeType, setActiveType] = useState(0);
  let [activeSize, setActiveSize] = useState(0);
  const dispatch = useDispatch();
  const currentPizza = useSelector((state) => {
    debugger;
    return state.cartReducer.items.find((obj) => obj.id === id);
  });

  // const count = currentPizza?.count ? currentPizza.count : 0;

  let onAdd = () => {
    // setCount((prevCount) => prevCount + 1);
    const item = {
      id,
      name,
      price,
      imageUrl,
      type: typesGlossary[activeType],
      size: sizes[activeSize],
      count: 0,
    };

    dispatch(addItem(item));
  };

  return (
    <div className="pizza-block">
      <NavLink to={`/pizza/${id}`}>
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        <h4 className="pizza-block__title">{name}</h4>
      </NavLink>
      <div className="pizza-block__selector">
        <ul>
          {types.map((typeId) => {
            return (
              <li
                key={typeId}
                className={activeType == typeId ? "active" : ""}
                onClick={() => {
                  setActiveType(typeId);
                }}
              >
                {typesGlossary[typeId]}
              </li>
            );
          })}
        </ul>
        <ul>
          {sizes.map((size, index) => {
            return (
              <li
                key={index}
                className={activeSize == index ? "active" : ""}
                onClick={() => {
                  setActiveSize(index);
                }}
              >
                {size}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {price} ₽</div>
        <button className="button button--outline button--add" onClick={onAdd}>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          {currentPizza?.count > 0 && <i>{currentPizza.count}</i>}
        </button>
      </div>
    </div>
  );
}

export default PizzaBlock;
