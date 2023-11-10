import React,{useState,useEffect} from "react";
import { Link, NavLink } from 'react-router-dom';
import '../CssFile/Sidebarrr.css';
import logo from '../images/logo1.png'


function SideNav() {
  

    return (
        <div>
            <aside className="main-sidebar sidebar-dark-primary elevation-0 Sidebarrr">
                <Link to="/Dashboard"><a className="brand-link">
                    <img src={logo} className="brand-image  elevation-3"/>
                    <span className="brand-text">LEARN AND EARN</span>
                </a></Link>
                <div className="sidebar">
                    <div className="form-inline">
                    </div>
                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/Dashboard"><i className="nav-icon fas fa-columns" /><p>Dashboard</p></NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/Exam" className="nav-link"><i className="nav-icon fas fa-book-open" /><p>Exam</p></NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/Quizpage" className="nav-link"><i className="nav-icon fas fa-table" /><p>Quiz</p></NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/Mocktest" className="nav-link"><i className="nav-icon fas fa-chalkboard" /><p>Mock-Test</p></NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/Tournament" className="nav-link"><i className="nav-icon fas fa-medal" /><p>Tournament</p></NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/Howtoplay" className="nav-link"><i className="nav-icon fas fa-question" /><p>How to play</p></NavLink>
                            </li>
                            
                        </ul>
                        </nav>
                </div>
            </aside>
        </div >
    )
}
export default SideNav

