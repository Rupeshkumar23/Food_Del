/* eslint-disable no-unused-vars */
import { useSearchParams } from 'react-router-dom'
import './Verify.css'
import { useContext } from 'react';
import { StoreContext } from '../../Context/StoreContext';
const Verify = () => {

    const [searchParams,setSearchParams]= useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
  const {url}=useContext(StoreContext);
  return (
    <div className='verify'>
     {/* <div className="spinner"></div> */}
    <div className="loader"></div>
     </div>
  )
}

export default Verify