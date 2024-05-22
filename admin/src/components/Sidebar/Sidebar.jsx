import { NavLink } from 'react-router-dom'
import { assets } from '../../assets/assets'
import './Sidebar.css'
import ToggleButton from "../ToggleButton/ToggleButton";
import { useContext } from 'react';
import { ThemeContext } from '../../Context/ThemeContext';

const Sidebar = () => {
  const { theme } = useContext(ThemeContext); 
  const darkModeClass = theme === "dark" ? "dark" : "";
  return (
    <div className={`sidebar ${darkModeClass}`}>
      <div className="sidebar_options">
       <div className='Toggle_B'><ToggleButton/></div>
        <NavLink  to="/add" className="sidebar_option">
          <img src={assets.add_icon} alt="add" />
          <p>Add Items</p>
        </NavLink>
        <NavLink to="/list" className="sidebar_option">
          <img src={assets.order_icon} alt="list" />
          <p>List Items</p>
        </NavLink>
        <NavLink to="/orders" className="sidebar_option">
          <img src={assets.order_icon} alt="order" />
          <p>Orders</p>
        </NavLink>
       
      
      </div>

    </div>
  )
}

export default Sidebar