/* eslint-disable react/no-unescaped-entities */
import { assets } from '../../assets/assets'
import'./Footer.css'

const Footer = () => {
  return (
    <div className='footer' id="footer">
        <div className="footer_content">
            <div className="footer_content_left">
                <img width={280} src={assets.logo} alt="logo" />
                <p style={{textAlign:"justify"}}>At FreshBite, we believe great food brings people together. Our team curates a menu blending tradition and innovation, ensuring every meal delights. Whether it's a quick bite or a gourmet feast, we deliver exceptional taste and service right to your door. Thank you for choosing FreshBite for your dining journey.</p>
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