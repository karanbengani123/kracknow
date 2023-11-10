import React from "react";
import '../CssFile/Student.css';

const TabNavItem = ({ id, title, activeTab, setActiveTab }) => {
 
 const handleClick = () => {
   setActiveTab(id);
 };
 
return (
   <span onClick={handleClick} className={activeTab === id ? "active" : ""}>
     { title }
   </span>
 );
};
export default TabNavItem;