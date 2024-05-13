import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import StoreContexProvider from "./Context/StoreContext.jsx";
import { ThemeProvider } from "./Context/ThemeContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
     <ThemeProvider>
    <StoreContexProvider>
      <App />
    </StoreContexProvider>
    </ThemeProvider>
  </BrowserRouter>
);
