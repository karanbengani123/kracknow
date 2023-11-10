import React from "react";
import '../CssFile/Student.css';

const TabContent = ({id, activeTab, children}) => {
 return (
   activeTab === id ? <div className="TabContent">
     { children }
   </div>
   : null
 );
};
 
export default TabContent;