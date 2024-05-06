import { assets } from '../../assets/assets'
import './AppDownload.css'

const AppDownload = () => {
  return (
    <div className='app_download' id="app_download">
        <p>For Better Experience Download <br/>Tomato App</p>
    <div className="app_download_platforms">
        <img src={assets.play_store} alt="play" />
        <img src={assets.app_store} alt="app" />
    </div>
    </div>
  )
}

export default AppDownload