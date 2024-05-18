/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import './FoodDisplay.css'
import { StoreContext } from '../../Context/StoreContext'
import { useContext } from 'react'
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({category}) => {
  const {foodList} = useContext(StoreContext);
  return (
    <div className='food_display' id='food_display'>
      <h2>Top dishes near you</h2>
      <div className="food_display_list">
        {foodList && foodList.map((item,index)=>{
          if(category==="All"|| category===item.category){
          return <FoodItem key={index} id={item._id} name={item.name}description={item.description}price={item.price}image={item.image}/>
          }
        })}
      </div>
      </div>
  )
}

export default FoodDisplay