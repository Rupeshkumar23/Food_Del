import { useContext, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../Context/StoreContext";

const PlaceOrder = () => {
  const { getTotalCartAmount,token,food_list,cartItems,url } = useContext(StoreContext);

  const[data,setData]=useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })
  const onChangeHandler =(e)=>{
    const name = e.target.name;
    const value = e.target.value;
    setData(data=>({...data,[name]:value}))
  }

  return (
    <form className="place_order">
      <div className="place_order_left">
        <p className="title">Delivery Information</p>
        <div className="multi_fields">
          <input name="firstName" value={data.firstName} onChange={onChangeHandler} type="text" placeholder="First name" />
          <input name="lastName" value={data.lastName} onChange={onChangeHandler} type="text" placeholder="Last name" />
        </div>
        <input name="email" onChange={onChangeHandler} value={data.email} type="text" placeholder="Email address" />
        <input name="street" value={data.street} onChange={onChangeHandler} type="text" placeholder="Street" />
        <div className="multi_fields">
          <input name="city" onChange={onChangeHandler} value={data.city} type="text" placeholder="City" />
          <input name="state"value={data.state} onChange={onChangeHandler} type="text" placeholder="State" />
        </div>
        <div className="multi_fields">
          <input name="zipcode"value={data.zipcode} onChange={onChangeHandler} type="text" placeholder="Zip code" />
          <input onChange={onChangeHandler} value={data.country} name="country" type="text" placeholder="Country" />
        </div>
        <input name="phone" onChange={onChangeHandler} value={data.phone} type="text" placeholder="Phone" />
      </div>
      <div className="place_order_right">
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
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart_total_details">
              <b>Total</b>
              <b>
                ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
              </b>
            </div>
          </div>
          <button>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
