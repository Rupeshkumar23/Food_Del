/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from 'react'
import './List.css'
import axios from "axios";
import { toast } from "react-toastify";
import Loader from '../../Loader/Loader'
import { ThemeContext } from '../../Context/ThemeContext';

const List = ({ url }) => {
  const [List, setList] = useState([]);
  const [loading, setLoading] = useState(true); 
  const { theme } = useContext(ThemeContext); 
  const darkModeClass = theme === "dark" ? "dark" : "";

  const fetchList = async () => {
    setLoading(true); 
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        setLoading(true); 
        toast.error("Error");
      }
    } catch (error) {
      toast.error("Error");
    } finally {
      setLoading(false); 
    }
  };

  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
      await fetchList();
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error("Error");
      }
    } catch (error) {
      toast.error("Error");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className={`list add flex_col ${darkModeClass}`}>
      <p>All Foods List</p>
      <div className="list_table">
        <div className="list_table_format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {loading ? (
          <Loader/> 
        ) : (
          List.map((item, index) => (
            <div key={index} className='list_table_format'>
              <img src={`${url}/images/${item.image}`} alt="img" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p onClick={() => { removeFood(item._id) }} className='cursor'>x</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default List;
