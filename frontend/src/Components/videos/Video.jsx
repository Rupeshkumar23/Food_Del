import { useContext } from 'react';
import { ThemeContext } from '../../Context/ThemeContext';
import vid_1 from './vid_1.mp4'
import './Video.css'

const Video = () => {
  const { theme } = useContext(ThemeContext); 
  const darkModeClass = theme === "dark" ? "dark" : "";
  return (
    <div className={`vid_1 ${darkModeClass}`}>
      <video src={vid_1} autoPlay loop></video>
    </div>
  )
}

export default Video;
