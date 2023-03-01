import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const FullPizza = () => {
  const { id } = useParams();
  const [item, setItem] = useState(undefined);
  debugger;

  useEffect(() => {
    async function getItem() {
      return await axios.get(
        `https://63de507d9fa0d60060fc8e1c.mockapi.io/items/5`
      );
    }
    let receivedItem = getItem();
    setItem(receivedItem);
  });

  return (
    <div>
      {item ? (
        <div>
          <img src="" />
          <h2>{item.id}</h2>
          <p>{item.name}</p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sapiente
            reprehenderit provident facere veniam cumque aliquam consectetur.
            Maiores beatae nemo officiis harum, unde rerum totam aperiam,
            recusandae mollitia praesentium saepe inventore!
          </p>
          <h4>350 Р</h4>
        </div>
      ) : (
        <div>Загрузка...</div>
      )}
    </div>
  );
};

export default FullPizza;
