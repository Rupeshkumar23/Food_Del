import { useContext } from "react";
import { ThemeContext } from "../../Context/ThemeContext";
import "./Video.css";
import { assets } from "../../assets/assets";

const Video = () => {
  const { theme } = useContext(ThemeContext);
  const darkModeClass = theme === "dark" ? "dark" : "";
  return (
    <div className={`vid_1 ${darkModeClass}`}>
      <video autoPlay loop muted>
        <source src={assets.vid_1} type="video/mp4" />
      </video>
    </div>
  );
};

export default Video;
