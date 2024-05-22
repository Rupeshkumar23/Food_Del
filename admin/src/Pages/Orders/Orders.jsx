/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import "./Orders.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { assets } from "../../assets/assets";
import { ThemeContext } from "../../Context/ThemeContext";

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const { theme } = useContext(ThemeContext); 
  const darkModeClass = theme === "dark" ? "dark" : "";

  const fetchAllOrders = async () => {
    const response = await axios.get(url + "/api/order/list");
    if (response.data.success) {
      setOrders(response.data.data);
      console.log(response.data.data);
    } else {
      toast.error("Error");
    }
  };
  const statusHandler = async(e,orderId)=>{
   const response =await axios.post(url+"/api/order/status",{
    orderId,
    status:e.target.value
   })
   if(response.data.success){
    await fetchAllOrders();
   }


  }
  useEffect(() => {
    fetchAllOrders();
  }, []);
  return (
    <div className={`order add ${darkModeClass}`}>
      <h3>Order Page</h3>
      <div className="order_list">
        {orders.map((order, index) => (
          <div key={index} className="order_item">
            <img src={assets.parcel_icon} alt="parcel" />
            <div>
              <p className="order_item_food dark_P">
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + "x" + item.quantity + ".";
                  } else {
                    return item.name + "x" + item.quantity + ",";
                  }
                })}
              </p>
              <p className="order_item_name dark_P">
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div className="order_item_address">
               <p className="dark_P"> {order.address.street + ","}</p>
                <p className="dark_P">
                  {order.address.city +
                    "," +
                    order.address.state +
                    ", " +
                    order.address.country +
                    ", " +
                    order.address.zipcode +
                    ", "}
                </p>
              </div>
              <p className="order_item_phone dark_P">{order.address.phone}</p>
            </div>
            <p className="dark_P">Items : {order.items.length}</p>
            <p className="dark_P">${order.amount}</p>
            <select onChange={(e)=>statusHandler(e,order._id)} value={order.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="Out of delivery">Out of delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
