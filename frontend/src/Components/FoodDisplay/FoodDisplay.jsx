/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../Context/StoreContext";
import { useContext } from "react";
import FoodItem from "../FoodItem/FoodItem";
import Loader from "../../Loader/Loader";
import { ThemeContext } from "../../Context/ThemeContext";

const FoodDisplay = ({ category }) => {
  const { foodList } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);
  const darkModeClass = theme === "dark" ? "dark" : "";

  return (
    <div className={`food_display ${darkModeClass}`} id="food_display">
      <h2>Top dishes near you</h2>
      <div className="food_display_list">
        {foodList ? (
          foodList.length > 0 ? (
            foodList.map((item, index) => {
              if (category === "All" || category === item.category) {
                return (
                  <FoodItem
                    key={index}
                    id={item._id}
                    name={item.name}
                    description={item.description}
                    price={item.price}
                    image={item.image}
                  />
                );
              }
              return null;
            })
          ) : (
            <Loader />
          )
        ) : (
          <div className="no_Dish">No dishes available...</div>
        )}
      </div>
    </div>
  );
};

export default FoodDisplay;
