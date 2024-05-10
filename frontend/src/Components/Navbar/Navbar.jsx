/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import  { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";
import arrow from "../../assets/icons8-up.gif";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("menu");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
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
  return (
    <div className="navbar">
      <Link to="/">
        {" "}
        <img src={assets.logo} alt="logo" className="logo" />
      </Link>
      <ul className="navbar_menu">
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
        <img src={assets.search_icon} alt="search_icon" />
        <div className="navbar_search_icon">
          <Link to="/cart">
            {" "}
            <img src={assets.basket_icon} alt="basket_icon" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {!token ? (
          <button onClick={() => setShowLogin(true)}>sign in</button>
        ) : (
          <div className="navbar_profile">
            <img src={assets.profile_icon} alt="profile" />
            <ul className="nav_profile_dropdown">
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
