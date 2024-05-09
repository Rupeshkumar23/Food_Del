/* eslint-disable react/prop-types */
import { useState } from "react";
import "./Orders.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { assets } from "../../assets/assets";

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

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
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order_list">
        {orders.map((order, index) => (
          <div key={index} className="order_item">
            <img src={assets.parcel_icon} alt="parcel" />
            <div>
              <p className="order_item_food">
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + "x" + item.quantity + ".";
                  } else {
                    return item.name + "x" + item.quantity + ",";
                  }
                })}
              </p>
              <p className="order_item_name">
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div className="order_item_address">
                {order.address.street + ","}
                <p>
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
              <p className="order_item_phone">{order.address.phone}</p>
            </div>
            <p>Items : {order.items.length}</p>
            <p>${order.amount}</p>
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
