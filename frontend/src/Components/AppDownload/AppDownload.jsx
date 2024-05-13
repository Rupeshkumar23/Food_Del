/* eslint-disable no-unused-vars */
import { assets } from '../../assets/assets'
import './AppDownload.css'
import mobile from '../../assets/mobile-dynamic-color.png'
import { ThemeContext } from '../../Context/ThemeContext';
import { useContext } from 'react';

const AppDownload = () => {
  const { theme } = useContext(ThemeContext);
  const darkModeClass = theme === 'dark' ? 'dark' : '';
  return (
    <div className={`app_download ${darkModeClass}`} id="app_download">
        <p>For Better Experience Download <br/>Tomato App</p>
        <img className='img_mobile' src={mobile} width={200} alt="mobile" />
    <div className="app_download_platforms">
        <img src={assets.play_store} alt="play" />
        <img src={assets.app_store} alt="app" />
    </div>
    </div>
  )
}

export default AppDownload