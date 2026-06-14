/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */

import axios from "axios";
import { createContext, useEffect, useState } from "react";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  // const url = "http://localhost:4000";
  const url = "https://food-del-backend-n6zu.onrender.com";
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [loading, setLoading] = useState(false);
  const [foodList, setFoodList] = useState([]);
  const [user, setUser] = useState(null);

  const clearAuthState = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
    setCartItems({});
  };

  const handleAuthError = (error) => {
    const status = error?.response?.status;
    if (status === 401 || status === 404) {
      clearAuthState();
      return true;
    }
    return false;
  };

  const addToCart = async (itemId) => {
    try {
      const newCartItems = { ...cartItems };
      newCartItems[itemId] = newCartItems[itemId] ? newCartItems[itemId] + 1 : 1;
      setCartItems(newCartItems);

      if (token) {
        await axios.post(
          `${url}/api/cart/add`,
          { itemId },
          { headers: { token } }
        );
      }
    } catch (error) {
      if (!handleAuthError(error)) {
        console.error("Error adding item to cart:", error);
      }
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      const newCartItems = { ...cartItems };
      const currentQuantity = newCartItems[itemId] || 0;
      if (currentQuantity > 1) {
        newCartItems[itemId] = currentQuantity - 1;
      } else {
        delete newCartItems[itemId];
      }
      setCartItems(newCartItems);

      if (token) {
        await axios.post(
          `${url}/api/cart/remove`,
          { itemId },
          { headers: { token } }
        );
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = foodList.find((product) => product._id === item);
        if (itemInfo) { 
          totalAmount += itemInfo.price * cartItems[item];
        } 
      }
    }
    return totalAmount;
  };
  

  const fetchFoodList = async () => {
    setLoading(true); 
    try {
      const response = await axios.get(`${url}/api/food/list`);
      setFoodList(response.data.data);
    } catch (error) {
      console.error("Error fetching food list:", error);
    } finally {
      setLoading(false); 
    }
  };

  const loadCartData = async (token) => {
    try {
      const response = await axios.post(
        `${url}/api/cart/get`,
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setCartItems(response.data.cartData || {});
      } else {
        if (response.data.message === "User not found") {
          clearAuthState();
        } else {
          console.error("Error loading cart data:", response.data.message);
        }
      }
    } catch (error) {
      if (!handleAuthError(error)) {
        console.error("Error loading cart data:", error);
      }
    }
  };

  const fetchUserDetails = async (token) => {
    try {
      const response = await axios.get(
        `${url}/api/user/profile`,
        { headers: { token } }
      );
      if (response.data.success) {
        setUser(response.data.user);
      } else {
        if (response.data.message === "User not found") {
          clearAuthState();
        } else {
          console.error(response.data.message);
        }
      }
    } catch (error) {
      if (!handleAuthError(error)) {
        console.error("Error fetching user details:", error);
      }
    }
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (token) {
        await loadCartData(token);
        await fetchUserDetails(token);
      }
    }
    loadData();
  }, [token]);

  const contextValue = {
    foodList,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    loadCartData,
    setToken,
    user,
    loading,
    setLoading
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children && props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
