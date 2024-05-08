import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar/Navbar"
import Sidebar from "./components/Sidebar/Sidebar"
import Add from "./Pages/Add/Add"
import Orders from "./Pages/Orders/Orders"
import List from "./Pages/List/List"


const App = () => {
  return (
    <div>
      <Navbar/>
      <hr />
      <div className="app_content">
        <Sidebar/>
        <Routes>
          <Route path="/add" element={<Add/>}/>
          <Route path="/list" element={<List/>}/>
          <Route path="/orders" element={<Orders/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App