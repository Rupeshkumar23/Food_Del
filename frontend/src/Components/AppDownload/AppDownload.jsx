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
    <div className={`app_download_container ${darkModeClass}`} id="app_download">
      <div className="app_download_content">
        <p>For Better Experience Download <br/>FreshBite App</p>
        <img className='img_mobile' src={mobile} width={200} alt="mobile" />
        <div className="app_download_platforms">
          <img src={assets.play_store} alt="play" />
          <img src={assets.app_store} alt="app" />
        </div>
      </div>
      <div className="app_download_video">
        <video autoPlay loop muted width="100%">
          <source src={assets.vid_1} type="video/mp4" />
        </video>
      </div>
    </div>
  )
}

export default AppDownload;
