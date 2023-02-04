import logo from "./logo.svg";
import "./scss/app.scss";
import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';
import PizzaData from './assets/pizza.json';

function App() {

  let pizzaBlocksArr = PizzaData.pizzas.map((elem) => {
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
    )
  })

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
            <div className="content__items">
              { pizzaBlocksArr }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
