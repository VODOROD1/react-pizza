import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSort } from "../redux/filterSlice";

export const sortGlossary = [
  {
    name: "популярности",
    sortProperty: "rating",
  },
  {
    name: "цене",
    sortProperty: "price",
  },
  {
    name: "алфавиту",
    sortProperty: "title",
  },
];

function Sort() {
  let choicenSort = useSelector((state) => state.filterReducer.sort);
  const dispatch = useDispatch();
  let [open, openClose] = useState();
  const sortRef = React.useRef();

  function choiceSortHandler(obj) {
    debugger;
    openClose(false);
    dispatch(setSort(obj));
  }

  // const onBlur = (e) => {
  //   debugger;
  //   if (e.target.tagName !== "LI" && e.target.tagName !== "SPAN") {
  //     openClose(false);
  //   }

  //   if (e.target.tagName === "SPAN" && open) {
  //     openClose(false);
  //   }
  // };

  React.useEffect(() => {
    const handleClickOutside = (e) => {
      debugger;
      if (e.target.tagName !== "LI" && e.target.tagName !== "SPAN") {
        openClose(false);
        console.log("Click outside!");
      }

      if (e.target.tagName === "SPAN" && open) {
        openClose(false);
        console.log("Click outside!");
      }
    };

    document.body.addEventListener("click", handleClickOutside);
    // document.body.addEventListener("click", onBlur);
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => openClose(!open)}>{choicenSort.name}</span>
      </div>
      {open && (
        <div
          className="sort__popup"
          onBlur={(_) => console.log`ФОКУС потеряли O_o`}
        >
          <ul>
            {sortGlossary.map((obj, index) => {
              return (
                <li
                  onClick={() => choiceSortHandler(obj)}
                  className={
                    choicenSort.sortProperty == obj.sortProperty ? "active" : ""
                  }
                  key={index}
                >
                  {obj.name}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Sort;
