import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar/Navbar"
import Sidebar from "./components/Sidebar/Sidebar"
import Add from "./Pages/Add/Add"
import Orders from "./Pages/Orders/Orders"
import List from "./Pages/List/List"
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {

  const url ="http://localhost:4000";
  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <hr />
      <div className="app_content">
        <Sidebar/>
        <Routes>
          <Route path="/add" element={<Add  url={url}/>}/>
          <Route path="/list" element={<List url={url} />}/>
          <Route path="/orders" element={<Orders url={url}/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App