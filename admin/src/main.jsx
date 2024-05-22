
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from "react-router-dom"
import { ThemeProvider } from "./Context/ThemeContext.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
<BrowserRouter>
<ThemeProvider>
<App/>
</ThemeProvider>
</BrowserRouter>
   
  
)
