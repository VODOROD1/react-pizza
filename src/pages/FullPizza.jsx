import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const FullPizza = () => {
  const [pizza, setPizza] = useState(undefined);
  const { id } = useParams();
  debugger;

  useEffect(() => {
    try {
      async function getPizza() {
        let receivedItem = await axios.get(
          `https://63de507d9fa0d60060fc8e1c.mockapi.io/items/${id}`
        );
        debugger;
        setPizza(receivedItem.data);
      }
      getPizza();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div>
      {pizza ? (
        <div>
          <img src="" />
          <h2><img src={pizza.imageUrl} /></h2>
          <h2>{pizza.name}</h2>
          <p>{pizza.price} Р</p>
        </div>
      ) : (
        <div>Загрузка...</div>
      )}
    </div>
  );
};

export default FullPizza;
