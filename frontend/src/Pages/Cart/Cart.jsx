/* eslint-disable no-unused-vars */
import { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../Context/StoreContext";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../Context/ThemeContext";

const Cart = () => {
  const { cartItems, foodList,url, removeFromCart,getTotalCartAmount } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);
  const darkModeClass = theme === 'dark' ? 'dark' : '';
  const navigate =useNavigate();

  return (
    <div className={`cart ${darkModeClass}`}>
      <div className="cart_items">
        <div className="cart_items_title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {foodList.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <>
                <div key={index} className="cart_items_title cart_items_item">
                  <img src={url+"/images/"+item.image} alt="img" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${item.price * cartItems[item._id]}</p>
                  <p onClick={() => removeFromCart(item._id)} className="cross">
                    x
                  </p>
                </div>
                <hr />
              </>
            );
          }
        })}
      </div>
      <div className="cart_bottom">
        <div className="cart_total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart_total_details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart_total_details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr />
            <div className="cart_total_details">
              <b>Total</b>
              <b>${ getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
            </div>
          </div>
          <button onClick={()=>navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart_promocode">
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className="cart_promocode_input">
          <input type="text" placeholder="Promo code" />
          <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
