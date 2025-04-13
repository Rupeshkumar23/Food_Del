/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useNavigate, useSearchParams } from 'react-router-dom'
import './Verify.css'
import { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../Context/StoreContext';
import Loader from '../../Loader/Loader'
import axios from 'axios';
import { toast } from 'react-toastify';

const Verify = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const { url, setCartItems } = useContext(StoreContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  
  const verifyPayment = async () => {
    try {
      const response = await axios.post(url+"/api/order/verify", {
        success,
        orderId
      });
      
      if(response.data.success) {
        setCartItems({});
        
        setIsLoading(false);
        toast.success("Your order was placed successfully!");
        setTimeout(() => {
          navigate("/myorders");
        }, 2000);
      } else {
        setIsLoading(false);
        toast.error("Your order could not be completed");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      console.error("Payment verification error:", error);
      setIsLoading(false);
      toast.error("An error occurred. Please try again later.");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }
  
  useEffect(() => {
    verifyPayment();
  }, []);
  
  return (
    <div className='verify'>
      {isLoading ? (
        <Loader />
      ) : success === "true" ? (
        <div className="verify_success">
          <div className="verify_icon success"></div>
          <h2>Order Placed Successfully!</h2>
          <p>Redirecting to your orders...</p>
        </div>
      ) : (
        <div className="verify_failed">
          <div className="verify_icon failed"></div>
          <h2>Payment Failed</h2>
          <p>Redirecting to home page...</p>
        </div>
      )}
    </div>
  )
}

export default Verify