/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../Context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
import Loader from "../../Loader/Loader";
import { ThemeContext } from "../../Context/ThemeContext";

const FoodDisplay = ({ category }) => {
  const { foodList,setLoading,loading } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);
  const darkModeClass = theme === "dark" ? "dark" : "";

  useEffect(() => {
    setLoading(true); 
    const fetchData = async () => {
      try {
        // Fetch data and update foodList in context
      } catch (error) {
        console.error("Error fetching food data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [foodList, setLoading]);

  return (
    <div className={`food_display ${darkModeClass}`} id="food_display">
      <h2>Top dishes near you</h2>
      <div className="food_display_list">
        {loading ? (
          Array.from({ length: 10 }).map((_, index) => (
            <FoodItem key={index} isLoading={true} />
          ))
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
                  isLoading={false}
                />
              );
            }
            return null;
          })
        ) : (
          <div className="no_Dish">No dishes available...</div>
        )}
      </div>
    </div>
  );
};

export default FoodDisplay;
