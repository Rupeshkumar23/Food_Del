import { assets } from '../../assets/assets'
import './Video.css'

const Video = () => {
  return (
    <div className='vid_1'>
      <video src={assets.vid_1} autoPlay loop></video>
    </div>
  )
}

export default Video;
