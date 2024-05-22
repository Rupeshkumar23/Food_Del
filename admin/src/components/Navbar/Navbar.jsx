import './Navbar.css'
import {useContext} from "react";
import {assets} from '../../assets/assets'
import { ThemeContext } from '../../Context/ThemeContext';

const Navbar = () => {
  const { theme } = useContext(ThemeContext); 
  const darkModeClass = theme === "dark" ? "dark" : "";
  return (
    <div className={`navbar ${darkModeClass}`}>
        <img className='logo' src={assets.logo} alt="logo" />
        <h3><i className="fa-solid fa-user-tie" style={{color: "#ff6347",marginRight:"5px"}}></i>Admin panel</h3>
        <img className='profile' src={assets.profile_image} alt="profile" />
    </div>
  )
}

export default Navbar