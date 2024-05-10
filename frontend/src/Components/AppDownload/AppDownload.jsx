import { assets } from '../../assets/assets'
import './AppDownload.css'
import mobile from '../../assets/mobile-dynamic-color.png'

const AppDownload = () => {
  return (
    <div className='app_download' id="app_download">
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