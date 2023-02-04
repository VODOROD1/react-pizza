import React, { useState } from "react";

function Categories() {
    let [activeIndex, setActiveIndex] = useState(0);
    const categoriesData = [
        'Все',
        'Мясные',
        'Вегетарианская',
        'Гриль',
        'Острые',
        'Закрытые'
    ]

    function onActive(newActiveIndex) {
        setActiveIndex(newActiveIndex);
    }

    return (
        <div className="categories">
        <ul>
            {
                categoriesData.map((categoryName, index) => {
                    return (
                        <li onClick={() => onActive(index)} className={activeIndex == index ? 'active' : ''} key={index}>{categoryName}</li>
                    )
                })
            }
        </ul>
        </div>
    );
}

export default Categories;
