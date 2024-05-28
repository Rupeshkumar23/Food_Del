/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import "./MyOrders.css";
import { useContext } from "react";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/assets";
import { ThemeContext } from "../../Context/ThemeContext";
import Loader from "../../Loader/Loader";

const MyOrders = () => {
  const { url, token, loading, setLoading } = useContext(StoreContext);
  const [data, setData] = useState([]);
  const { theme } = useContext(ThemeContext);
  const darkModeClass = theme === 'dark' ? 'dark' : '';

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        url + "/api/order/userorders",
        {},
        { headers: { token } }
      );
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className={`my_orders ${darkModeClass}`}>
      <h2>My Orders</h2>
      {loading && <Loader />}
      <div className="container">
        {data.length > 0 ? (
          data.map((order, index) => (
            <div key={index} className="my_orders_order">
              <img src={assets.parcel_icon} alt="parcel" />
              <p>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity + ".";
                  } else {
                    return item.name + " x " + item.quantity + ", ";
                  }
                })}
              </p>
              <p>${order.amount}.00</p>
              <p>Items: {order.items.length}</p>
              <p>
                <span>&#x25CF;</span>
                <b>{order.status}</b>
              </p>
              <button onClick={fetchOrders}>Track Order</button>
            </div>
          ))
        ) : (
          !loading && <p>No orders found</p>
      )}
      </div>
    </div>
  );
};

export default MyOrders;
