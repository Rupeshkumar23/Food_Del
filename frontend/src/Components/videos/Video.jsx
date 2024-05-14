import { useContext } from 'react';
import { ThemeContext } from '../../Context/ThemeContext';
import { assets } from '../../assets/assets'
import './Video.css'

const Video = () => {
  const { theme } = useContext(ThemeContext); 
  const darkModeClass = theme === "dark" ? "dark" : "";
  return (
    <div className={`vid_1 ${darkModeClass}`}>
      <video src={assets.vid_1} autoPlay loop></video>
    </div>
  )
}

export default Video;
