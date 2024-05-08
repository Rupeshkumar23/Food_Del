import {  useState } from 'react'
import { assets } from '../../assets/assets'
import './Add.css'

const Add = () => {
  const [image,setImage] = useState(false);
  const [data,setData]=useState({
    name:"",
    description: "",
    price:"",
    category:"Salad"
  })
  const onChangeHandler = (event)=>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }




  return (
    <div className='add'>
        <form className='flex_col'>
        <div className="add_img_upload flex_col">
            <p>Upload Image</p>
            <label htmlFor="image">
                <img src={image?URL.createObjectURL(image):assets.upload_area} alt="upload" />
            </label>
            <input onChange={(e)=>{setImage(e.target.files[0])}} type="file" id='image' hidden required/>
        </div>
        <div className="add_product_name flex_col">
            <p>Product name</p>
            <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here' />
        </div>
        <div className="add_product_description flex_col">
            <p>Product description</p>
          <textarea  onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Write content here' required ></textarea>
        </div>
        <div className="add_category_price">
           <div className="add_category flex_col">
            <p>Product category</p>
            <select  onChange={onChangeHandler}  name="category">
                <option value="Salad">Salad</option>
                <option value="Rolls">Rolls</option>
                <option value="Deserts">Deserts</option>
                <option value="Sandwich">Sandwich</option>
                <option value="Cake">Cake</option>
                <option value="Pure Veg">Pure Veg</option>
                <option value="Pasta">Pasta</option>
                <option value="Noodles">Noodles</option>
            </select>
           </div>
           <div className="add_price flex_col">
            <p>Product price</p>
            <input  onChange={onChangeHandler} value={data.price} type="number" name='price' placeholder='$20' />
           </div>
        </div>
        <button type='submit' className='add_btn'>ADD</button>
        </form>
    </div>
  )
}

export default Add