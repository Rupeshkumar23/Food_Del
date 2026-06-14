/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../Context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
import Loader from "../../Loader/Loader";
import { ThemeContext } from "../../Context/ThemeContext";

const FoodDisplay = ({ category }) => {
  const { foodList, loading } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);
  const darkModeClass = theme === "dark" ? "dark" : "";

  return (
    <div className={`food_display ${darkModeClass}`} id="food_display">
      <h2>Top dishes near you</h2>
      <div className="food_display_list">
        {loading ? (
          Array.from({ length: 10 }).map((_, index) => (
            <FoodItem key={index} isLoading={true} />
          ))
        ) : foodList && foodList.length > 0 ? (
          foodList
            .filter((item) => category === "All" || category === item.category)
            .map((item) => (
              <FoodItem
                key={item._id}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
                isLoading={false}
              />
            ))
        ) : (
          <div className="no_Dish">No dishes available...</div>
        )}
      </div>
    </div>
  );
};

export default FoodDisplay;
