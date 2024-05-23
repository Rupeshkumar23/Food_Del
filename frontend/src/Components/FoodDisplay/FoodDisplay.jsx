/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../Context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
import Loader from "../../Loader/Loader";
import { ThemeContext } from "../../Context/ThemeContext";

const FoodDisplay = ({ category }) => {
  const { foodList } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);
  const darkModeClass = theme === "dark" ? "dark" : "";
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (foodList) {
      setLoading(false);
    }
  }, [foodList]);

  return (
    <div className={`food_display ${darkModeClass}`} id="food_display">
      <h2>Top dishes near you</h2>
      <div className="food_display_list">
        {loading ? (
          <div className="no_Dish">No dishes available...</div>
        ) : foodList && foodList.length > 0 ? (
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
        )}
      </div>
    </div>
  );
};

export default FoodDisplay;
