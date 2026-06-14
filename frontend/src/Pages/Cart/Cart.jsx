/* eslint-disable no-unused-vars */
import { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../Context/StoreContext";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../Context/ThemeContext";

const Cart = () => {
  const { cartItems, foodList, url, removeFromCart, getTotalCartAmount } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);
  const darkModeClass = theme === 'dark' ? 'dark' : '';
  const navigate = useNavigate();
  const subtotal = getTotalCartAmount();
  const deliveryFee = subtotal > 0 ? 2 : 0;
  const total = subtotal + deliveryFee;

  const getImageUrl = (image) => {
    if (!image) return undefined;
    if (image.startsWith("http://") || image.startsWith("https://")) return image;
    if (image.startsWith("/uploads/") || image.startsWith("/images/")) return `${url}${image}`;
    if (image.startsWith("uploads/") || image.startsWith("images/")) return `${url}/${image}`;
    return `${url}/uploads/${image}`;
  };

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
        {foodList
          .filter((item) => cartItems[item._id] > 0)
          .map((item) => {
            const itemImageUrl = getImageUrl(item.image);
            return (
              <div key={item._id}>
                <div className="cart_items_title cart_items_item">
                  <img src={itemImageUrl} alt="img" />
                  <p>{item.name}</p>
                  <p>₹{item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>₹{item.price * cartItems[item._id]}</p>
                  <p onClick={() => removeFromCart(item._id)} className="cross">
                    x
                  </p>
                </div>
                <hr />
              </div>
            );
          })}
      </div>
      <div className="cart_bottom">
        <div className="cart_total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart_total_details">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart_total_details">
              <p>Delivery Fee</p>
              <p>₹{deliveryFee}</p>
            </div>
            <hr />
            <div className="cart_total_details">
              <b>Total</b>
              <b>₹{total}</b>
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
