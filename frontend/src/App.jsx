/* eslint-disable no-unused-vars */

import React, { useContext, useState } from 'react'
import Navbar from './Components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Cart from './Pages/Cart/Cart'
import PlaceOrder from './Pages/PlaceOrder/PlaceOrder'
import Footer from './Components/Footer/Footer'
import LoginPopUp from './Components/LoginPopUp/LoginPopUp'
import Verify from './Pages/Verify/Verify'
import MyOrders from './Pages/MyOrders/MyOrders'
import { ThemeContext } from './Context/ThemeContext'
import NotFound from './Components/NotFound/NotFound'


const App = () => {
  const [showLogin,setShowLogin]=useState(false);
  const { theme } = useContext(ThemeContext);
  return (
    <>
    <div className={theme}>
    {showLogin?<LoginPopUp setShowLogin={setShowLogin}/>:<></>}
    <div className='app'>
      <Navbar setShowLogin={setShowLogin}/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/order' element={<PlaceOrder/>}/>
        <Route path="/verify" element={<Verify/>}/>
        <Route path="/myorders" element={<MyOrders/>}/>
        <Route path='*' element={<NotFound/>} />
      </Routes>
    </div>
    <Footer/>
    </div>
    </>
  )
}

export default App