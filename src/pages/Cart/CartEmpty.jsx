import React from "react";
import { NavLink } from "react-router-dom";

const CartEmpty = () => {
  return (
    <div class="content">
      <div class="container container--cart">
        <div class="cart cart--empty">
          <h2>
            Корзина пустая <icon>😕</icon>
          </h2>
          <p>
            Вероятней всего, вы не заказывали ещё пиццу.
            <br />
            Для того, чтобы заказать пиццу, перейди на главную страницу.
          </p>
          <img src="/img/empty-cart.png" alt="Empty cart" />
          <NavLink to="/home">
            <span class="button button--black">Вернуться назад</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default CartEmpty;
