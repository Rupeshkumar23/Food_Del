import { assets } from '../../assets/assets'
import'./Footer.css'

const Footer = () => {
  return (
    <div className='footer' id="footer">
        <div className="footer_content">
            <div className="footer_content_left">
                <img width={280} src={assets.logo} alt="logo" />
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor, dicta deleniti, quos vel, odio officia quasi unde laborum eos facilis porro quidem non beatae dolores molestias optio ea doloremque sint!</p>
                <div className="footer_social_icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>
            </div>
            <div className="footer_content_center">
             <h2>COMPANY</h2>
             <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
             </ul>
            </div>
            <div className="footer_content_right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+1-2121-345-3456</li>
                    <li>contact@freshbite.com</li>
                </ul>
            </div>
        </div>
        <hr/>
        <p className="footer_copyright">Copyright {new Date().getFullYear()} &copy; freshbite.com - All Right Reserved</p>
    </div>
  )
}

export default Footer