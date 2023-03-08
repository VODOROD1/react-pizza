import React from "react";

type CategoryProps = {
    categoryId: number,
    onSetCategoryId: any
}

const Categories: React.FC<CategoryProps> = ({ categoryId, onSetCategoryId }) => {
    // let [activeIndex, setActiveIndex] = useState(0);
    const categoriesData = [
        'Все',
        'Мясные',
        'Вегетарианская',
        'Гриль',
        'Острые',
        'Закрытые'
    ]

    function onActive(newActiveIndex) {
        onSetCategoryId(newActiveIndex);
    }

    return (
        <div className="categories">
        <ul>
            {
                categoriesData.map((categoryName, index) => {
                    return (
                        <li onClick={() => onActive(index)} className={categoryId == index ? 'active' : ''} key={index}>{categoryName}</li>
                    )
                })
            }
        </ul>
        </div>
    );
}

export default Categories;
