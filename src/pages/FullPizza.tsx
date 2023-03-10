import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = useState<{
    imageUrl: string,
    name: string,
    price: number
  }>();

  const { id } = useParams();
  const navigate = useNavigate();
  debugger;

  useEffect(() => {
    async function getPizza() {
      try {
        let receivedItem = await axios.get(
          `https://63de507d9fa0d60060fc8e1c.mockapi.io/items/${id}`
        );
        debugger;
        setPizza(receivedItem.data);
      } catch (error) {
        debugger;
        console.log(error);
        navigate("/");
      }
    }
    getPizza();
  }, []);

  return (
    <div>
      {pizza ? (
        <div>
          <h2>
            <img src={pizza.imageUrl} alt="pizza"/>
          </h2>
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
