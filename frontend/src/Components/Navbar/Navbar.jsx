/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";
import arrow from "../../assets/icons8-up.gif";
import ToggleButton from "../ToggleButton/ToggleButton";
import { ThemeContext } from "../../Context/ThemeContext";

const Navbar = ({ setShowLogin }) => {
  const { theme } = useContext(ThemeContext);
  const profileIconSrc =
    theme === "dark" ? assets.profile_icon_dark : assets.profile_icon_light;
  const shopCartIconSrc =
    theme === "dark" ? assets.shop_cart_dark : assets.shop_cart_light;
  const darkModeClass = theme === "dark" ? "dark" : "";
  const [menu, setMenu] = useState("menu");
  const [clicked, setClicked] = useState(false);
  const { getTotalCartAmount, token, setToken, user, loading } = useContext(StoreContext);
  const navigate = useNavigate();
  const [showScrollTop, setShowScrollTop] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setShowScrollTop(true);
    } else {
      setShowScrollTop(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };
  const handleClick = () => {
    setClicked(!clicked);
  };
  return (
    <div className={`navbar ${darkModeClass}`}>
      <Link to="/">
        {" "}
        <img src={assets.logo} alt="logo" className="logo" />
      </Link>
      <ul className={clicked ? "navbar_menu active" : "navbar_menu"}>
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          home
        </Link>
        <a
          href="#explore_menu"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          menu
        </a>
        <a
          href="#app_download"
          onClick={() => setMenu("mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
        >
          mobile-app
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          contact us
        </a>
      </ul>
      <div className="navbar_right">
        <div className="group">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="icon">
            <g>
              <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
            </g>
          </svg>
          <input className="input" type="search" placeholder="Search" />
        </div>
        <ToggleButton />
        <div className="navbar_search_icon">
          <Link to="/cart">
            {" "}
            <img
              width={27}
              style={{ paddingTop: "8px" }}
              src={shopCartIconSrc}
              alt="basket_icon"
            />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {!token && loading ? (

          <div className="load">
            <li className="ball"></li>
            <li className="ball"></li>
            <li className="ball"></li>
          </div>

        ) : !token ? (
          <button onClick={() => setShowLogin(true)}>Sign in</button>
        ) : (
          <div className="navbar_profile">
            <img width={27} src={profileIconSrc} alt="profile" />
            <ul className="nav_profile_dropdown">
              <li onClick={() => navigate("/")}>
                <img src={assets.user} alt="user_profile" />
                <p>{user.name}</p>
              </li>
              <hr />
              <li onClick={() => navigate("/myorders")}>
                <img src={assets.bag_icon} alt="bag_icon" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="logout_icon" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
      <div id="mobile">
        <i
          id="bar"
          className={clicked ? "fas fa-times" : "fas fa-bars"}
          onClick={handleClick}
        ></i>
      </div>
      {/* Scroll Top button */}
      {showScrollTop && (
        <div className="scrollTop" onClick={scrollTop}>
          <img width={25} src={arrow} alt="img" />
        </div>
      )}
    </div>
  );
};

export default Navbar;
