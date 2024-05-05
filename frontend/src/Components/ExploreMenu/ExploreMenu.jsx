import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'

const ExploreMenu = () => {
  return (
    <div className='explore_menu' id="explore_menu">
        <h1>Explore our menu</h1>
        <p className='explore_menu_text'>Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time. </p>
    <div className="explore_menu_list">
        {menu_list.map((item,index)=>{
            return(
                <div key={index} className="explore_menu_list_item">
                    <img src={item.menu_image} alt="items" />
                    <p>{item.menu_name}</p>
                </div>
            )
        })}
    </div>
    <hr/>
    </div>
  )
}

export default ExploreMenu