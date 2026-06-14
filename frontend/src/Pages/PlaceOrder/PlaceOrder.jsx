import { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, foodList, cartItems, url } =
    useContext(StoreContext);
  const [paymentMethod, setPaymentMethod] = useState("ONLINE");
  const [isProcessing, setIsProcessing] = useState(false);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const navigate = useNavigate();

  const placeOrder = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    const orderItems = foodList
      .filter((item) => cartItems[item._id] > 0)
      .map((item) => ({
        _id: item._id,
        name: item.name,
        price: item.price,
        quantity: cartItems[item._id],
      }));
    
    const subtotal = getTotalCartAmount();
    const orderData = {
      address: data,
      items: orderItems,
      amount: subtotal + 2,
      paymentMethod,
    };
    
    try {
      let response = await axios.post(url + "/api/order/place", orderData, {
        headers: { token },
      });
      
      if (response.data.success) {
        if (paymentMethod === "COD") {
          // For COD, navigate to success page directly
          toast.success("Order placed successfully with Cash on Delivery!");
          navigate(`/verify?success=true&orderId=${response.data.orderId}`);
        } else {
          // For online payment, redirect to payment gateway
          const { session_url } = response.data;
          window.location.replace(session_url);
        }
      } else {
        toast.error("Error in placing the Order");
        setIsProcessing(false);
      }
    } catch (error) {
      console.error("Order placement error:", error);
      toast.error("Failed to place order. Please try again.");
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    if (!token || getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, [getTotalCartAmount, navigate, token]);

  return (
    <form onSubmit={placeOrder} className="place_order">
      <div className="place_order_left">
        <p className="title">Delivery Information</p>
        <div className="multi_fields">
          <input
            required
            name="firstName"
            value={data.firstName}
            onChange={onChangeHandler}
            type="text"
            placeholder="First name"
          />
          <input
            required
            name="lastName"
            value={data.lastName}
            onChange={onChangeHandler}
            type="text"
            placeholder="Last name"
          />
        </div>
        <input
          required
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          type="text"
          placeholder="Email address"
        />
        <input
          required
          name="street"
          value={data.street}
          onChange={onChangeHandler}
          type="text"
          placeholder="Street"
        />
        <div className="multi_fields">
          <input
            required
            name="city"
            onChange={onChangeHandler}
            value={data.city}
            type="text"
            placeholder="City"
          />
          <input
            required
            name="state"
            value={data.state}
            onChange={onChangeHandler}
            type="text"
            placeholder="State"
          />
        </div>
        <div className="multi_fields">
          <input
            required
            name="zipcode"
            value={data.zipcode}
            onChange={onChangeHandler}
            type="text"
            placeholder="Zip code"
          />
          <input
            onChange={onChangeHandler}
            value={data.country}
            name="country"
            type="text"
            placeholder="Country"
            required
          />
        </div>
        <input
          required
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
          type="text"
          placeholder="Phone"
        />
      </div>
      <div className="place_order_right">
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
              <p>₹{getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart_total_details">
              <b>Total</b>
              <b>
                ₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
              </b>
            </div>
          </div>
          
          <div className="payment_method_selection">
            <h3>Select Payment Method</h3>
            <div className="payment_options">
              <div className="payment_option">
                <input 
                  type="radio" 
                  id="online" 
                  name="paymentMethod" 
                  value="ONLINE"
                  checked={paymentMethod === "ONLINE"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label htmlFor="online">Online Payment</label>
              </div>
              <div className="payment_option">
                <input 
                  type="radio" 
                  id="cod" 
                  name="paymentMethod" 
                  value="COD"
                  checked={paymentMethod === "COD"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label htmlFor="cod">Cash on Delivery</label>
              </div>
            </div>
          </div>
          
          <button type="submit" disabled={isProcessing}>
            {isProcessing ? "PROCESSING..." : paymentMethod === "ONLINE" ? "PROCEED TO PAYMENT" : "PLACE ORDER"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
