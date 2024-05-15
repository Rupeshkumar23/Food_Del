import { assets } from '../../assets/assets'
import './NotFound.css'

const NotFound = () => {
  return (
    <div className='gif_img'>
        <img src={assets.page_404} alt="404_page" />
    </div>
  )
}

export default NotFound