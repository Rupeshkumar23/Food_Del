/* eslint-disable no-unused-vars */
// ToggleButton.js
import  { useContext } from 'react';
import { ThemeContext } from '../../Context/ThemeContext';
import './ToggleButton.css'
import '../../index.css'


const ToggleButton = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const darkModeClass = theme === 'dark' ? 'dark' : '';
  const handleChange = () => {
    toggleTheme();
  };
  const getTitle = () => {
    return theme === 'dark' ? '🌞' : '🌜';
    // return theme === 'dark' ? 'Switch to🌞Light mode' : 'Switch to🌜Dark mode';
  };
 
  

  return (
    <div className={`toggle-switch ${darkModeClass}`}>
    <label title={getTitle()} className="switch-label">
      <input  type="checkbox" className="checkbox" checked={theme==="dark"} onChange={handleChange} />
      <span className="slider"></span>
    </label>
  </div>  
  );
};

export default ToggleButton;
