/* eslint-disable react/prop-types */
import { useContext } from "react";
import { assets } from "../../assets/assets";
import "./FoodItem.css";
import { StoreContext } from "../../Context/StoreContext";
import { ThemeContext } from "../../Context/ThemeContext";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const FoodItem = ({ id, name, price, description, image, isLoading }) => {
  const { cartItems, addToCart, removeFromCart, url, } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext); 
  const darkModeClass = theme === 'dark' ? 'dark' : '';
  return (
    <div className={`food_item ${darkModeClass}`}>
      <div className="food_item_img_container">
        {isLoading ? (
          <div className="skeleton skeleton-image"></div>
        ) : (
          <LazyLoadImage  effect='blur' className="food_item_image" src={url+"/images/"+image} alt="food_item_image" />
        )}
        {!isLoading && (!cartItems[id] ? (
          <img
            className="add"
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
            alt="plus_img"
          />
        ) : (
          <div className="food_item_counter">
            <img
              src={assets.remove_icon_red}
              alt="remove"
              onClick={() => removeFromCart(id)}
            />
            <p className="no_id">{cartItems[id]}</p>
            <img
              src={assets.add_icon_green}
              alt="add"
              onClick={() => addToCart(id)}
            />
          </div>
        ))}
      </div>
      <div className="food_item_info">
        <div className="food_item_name_rating">
          {isLoading ? (
            <div className="skeleton skeleton-text skeleton-name"></div>
          ) : (
            <>
              <p>{name}</p>
              <img src={assets.rating_starts} alt="rating" />
            </>
          )}
        </div>
        {isLoading ? (
          <div className="skeleton skeleton-text skeleton-desc"></div>
        ) : (
          <p className="food_item_desc">{description}</p>
        )}
        {isLoading ? (
          <div className="skeleton skeleton-text skeleton-price"></div>
        ) : (
          <p className="food_item_price">${price}</p>
        )}
      </div>
    </div>
  );
};

export default FoodItem;
