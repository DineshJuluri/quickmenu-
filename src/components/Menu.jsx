import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Menu = () => {
  let { slug } = useParams();
  const [restaurant, setRestaurant] = useState({ menu: [] });
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    console.log(`https://quickmenu.onrender.com/restaurant/${slug}`);
    axios
      .get(`https://quickmenu.onrender.com/restaurant/${slug}`)
      .then((res) => {
        setRestaurant(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [slug]);

  const categoryClicked = (category) => {
    setSelectedCategory(category);
  };

  const getItemsForCategory = (category) => {
    return restaurant.menu.find((menuCategory) => menuCategory.category === category)?.items || [];
  };

  return (
    <div className="container flex justify-center flex-col">
      <div className="flex justify-center items-center h-10 font-semibold text-white mx-auto bg-violet-500 container">
        <h1 className="text-base">
          <i className="fa-solid fa-utensils"></i>&nbsp;&nbsp;{restaurant.name}&nbsp;&nbsp;
          <i className="fa-solid fa-utensils"></i>
        </h1>
      </div>
      <div className="flex h-auto overflow-x-auto my-2 p-1 rounded-md w-full container bg-white">
        {restaurant.menu && restaurant.menu.length > 0 ? (
          restaurant.menu.map((item) => (
            <button
              key={item.category}
              onClick={() => categoryClicked(item.category)}
              className={`mx-1 my-1 btn-active btn btn-sm btn-outline ${
                selectedCategory === item.category ? 'btn-primary' : ''
              }`}
            >
              {item.category}
            </button>
          ))
        ) : (
          <p>No menu items available</p>
        )}
      </div>
      <div className="flex justify-center items-center container flex-col rounded bg-white">
        {selectedCategory ? (
          <div>
            {getItemsForCategory(selectedCategory).map((item) => (
              <button
                key={item._id}
                className="mx-auto my-1 btn-sm w-96 bg-white btn flex justify-around p-2 items-center"
              >
                <p className="font-bold text-left w-80">{item.name}</p>
                <p className="font-bold">{item.cost}</p>
              </button>
            ))}
          </div>
        ) : (
          <p>Select a category to view items</p>
        )}
      </div>
    </div>
  );
};

export default Menu;
