import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from 'react-router-dom';
import '../CssFile/Sidebarrr.css';


function SideNav() {
    const isAdmin = useSelector((state) => state.roleName);
    // console.warn("The Role is",isAdmin)

    const [activate, setActivate] = useState(false);
    const AddClass = () => {
        activate ? setActivate(false) : setActivate(true);
    }
    return (
        <div>
            <aside className="main-sidebar sidebar-dark-primary elevation-0 Sidebarrr">
                <a className="brand-link">
                    <img src="./logo1.png" className="brand-image  elevation-3" />
                    <span className="brand-text">KRACKNOW</span>
                </a>
                <div className="sidebar">
                    <div className="form-inline">
                    </div>
                    <nav className="mt-2">
                        {
                            isAdmin === "SUPER_ADMIN" &&
                            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/Dashboard"><i className="nav-icon fas fa-columns" /><p>Dashboard</p></NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/Studentlist"><i className="nav-icon far fa-user" /><p>Student</p></NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/Category" className="nav-link"><i className="nav-icon fas fa-layer-group" /><p>Category</p></NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/Question"><i className="nav-icon fas fa-file-alt" /><p>Questions</p></NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/Keywords" className="nav-link"><i className="nav-icon fas fa-file" /><p>Keywords</p></NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/Exam" className="nav-link"><i className="nav-icon fas fa-table" /><p>Exam</p></NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/Quiz" className="nav-link"><i className="nav-icon fas fa-question" /><p>Quiz</p></NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/Mocktest" className="nav-link"><i className="nav-icon fas fa-clock" /><p>Mocktest</p></NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/Tournament" className="nav-link"><i className="nav-icon fas fa-medal" /><p>Tournament</p></NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/Banner" className="nav-link"><i className="nav-icon fas fa-image" /><p>Banner</p></NavLink>
                                </li>
                                <li className={activate ? "nav-item menu-is-opening menu-open" : "nav-item"}>
                                    <a className="nav-link" onClick={AddClass}>
                                        <i className="nav-icon fas fa-shield-alt" />
                                        <p>
                                            Administration
                                            <i className="fas fa-angle-left right arrow" />
                                        </p>
                                    </a>
                                    <ul className="nav nav-treeview">
                                        <li className="nav-item">
                                            <Link to="/Admin" className="nav-link">
                                                <i className="far fa-circle nav-icon" /><p>Admin</p>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/Cashfree" className="nav-link">
                                                <i className="far fa-circle nav-icon" /><p>Bank Transaction</p>
                                            </Link>

                                            {/* <Link to="/bank-transaction" className="nav-link">
                                                <i className="far fa-circle nav-icon" /><p>Bank Transaction</p>
                                            </Link> */}
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/payoutrequest" className="nav-link">
                                                <i className="far fa-circle nav-icon" />
                                                <p>Deposit Request </p>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/Withdraw" className="nav-link">
                                                <i className="far fa-circle nav-icon" />
                                                <p>Withdraw Request</p>
                                            </Link>
                                        </li>

                                        <li className="nav-item">
                                            <Link to="/Setting" className="nav-link">
                                                <i className="far fa-circle nav-icon" /> <p>Settings</p>
                                            </Link>
                                        </li>
                                        {/* <li className="nav-item">
                                        <a className="nav-link">
                                        <i className="far fa-circle nav-icon" />  <p>Manage Roles</p>
                                        </a>
                                    </li> */}
                                    </ul>
                                </li>
                            </ul>
                        }
                        {
                            isAdmin === "ADMIN" &&
                            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/Dashboard"><i className="nav-icon fas fa-columns" /><p>Dashboard</p></NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/Studentlist"><i className="nav-icon far fa-user" /><p>Student</p></NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/Category" className="nav-link"><i className="nav-icon fas fa-layer-group" /><p>Category</p></NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/Question"><i className="nav-icon fas fa-file-alt" /><p>Questions</p></NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/Keywords" className="nav-link"><i className="nav-icon fas fa-file" /><p>Keywords</p></NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/Exam" className="nav-link"><i className="nav-icon fas fa-table" /><p>Exam</p></NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/Quiz" className="nav-link"><i className="nav-icon fas fa-question" /><p>Quiz</p></NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/Mocktest" className="nav-link"><i className="nav-icon fas fa-clock" /><p>Mocktest</p></NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/Tournament" className="nav-link"><i className="nav-icon fas fa-medal" /><p>Tournament</p></NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/Banner" className="nav-link"><i className="nav-icon fas fa-image" /><p>Banner</p></NavLink>
                                </li>
                                <li className={activate ? "nav-item menu-is-opening menu-open" : "nav-item"}>
                                    <a className="nav-link" onClick={AddClass}>
                                        <i className="nav-icon fas fa-shield-alt" />
                                        <p>
                                            Administration
                                            <i className="fas fa-angle-left right arrow" />
                                        </p>
                                    </a>
                                    <ul className="nav nav-treeview">
                                        <li className="nav-item">
                                            <Link to="/Admin" className="nav-link">
                                                <i className="far fa-circle nav-icon" /><p>Admin</p>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/Cashfree" className="nav-link">
                                                <i className="far fa-circle nav-icon" /><p>Cashfree Transaction</p>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/Withdraw" className="nav-link">
                                                <i className="far fa-circle nav-icon" />
                                                <p>Withdraw Request</p>
                                            </Link>
                                        </li>
                                        {/* <li className="nav-item">
                                        <Link to="/Feedback" className="nav-link">
                                            <i className="far fa-circle nav-icon" />
                                            <p>Feedback & Queries </p>
                                        </Link>
                                    </li> */}

                                        <li className="nav-item">
                                            <Link to="/Setting" className="nav-link">
                                                <i className="far fa-circle nav-icon" /> <p>Settings</p>
                                            </Link>
                                        </li>
                                        {/* <li className="nav-item">
                                        <a className="nav-link">
                                        <i className="far fa-circle nav-icon" />  <p>Manage Roles</p>
                                        </a>
                                    </li> */}
                                    </ul>
                                </li>
                            </ul>
                        }
                        {
                            isAdmin === "EXAM_CREATOR" &&
                            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                                {/* <li className="nav-item">
                                    <NavLink className="nav-link" to="/Dashboard"><i className="nav-icon fas fa-columns" /><p>Dashboard</p></NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/Studentlist"><i className="nav-icon far fa-user" /><p>Student</p></NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/Category" className="nav-link"><i className="nav-icon fas fa-layer-group" /><p>Category</p></NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/Question"><i className="nav-icon fas fa-file-alt" /><p>Questions</p></NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/Keywords" className="nav-link"><i className="nav-icon fas fa-file" /><p>Keywords</p></NavLink>
                                </li> */}
                                <li className="nav-item">
                                    <NavLink to="/Exam" className="nav-link"><i className="nav-icon fas fa-table" /><p>Exam</p></NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/Quiz" className="nav-link"><i className="nav-icon fas fa-question" /><p>Quiz</p></NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/Mocktest" className="nav-link"><i className="nav-icon fas fa-clock" /><p>Mocktest</p></NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/Tournament" className="nav-link"><i className="nav-icon fas fa-medal" /><p>Tournament</p></NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/Banner" className="nav-link"><i className="nav-icon fas fa-image" /><p>Banner</p></NavLink>
                                </li>
                                <li className={activate ? "nav-item menu-is-opening menu-open" : "nav-item"}>
                                    <a className="nav-link" onClick={AddClass}>
                                        <i className="nav-icon fas fa-shield-alt" />
                                        <p>
                                            Administration
                                            <i className="fas fa-angle-left right arrow" />
                                        </p>
                                    </a>
                                    <ul className="nav nav-treeview">
                                        {/* <li className="nav-item">
                                            <Link to="/Admin" className="nav-link">
                                                <i className="far fa-circle nav-icon" /><p>Admin</p>
                                            </Link>
                                        </li> */}
                                        <li className="nav-item">
                                            <Link to="/Cashfree" className="nav-link">
                                                <i className="far fa-circle nav-icon" /><p>Cashfree Transaction</p>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/Withdraw" className="nav-link">
                                                <i className="far fa-circle nav-icon" />
                                                <p>Withdraw Request</p>
                                            </Link>
                                        </li>
                                        {/* <li className="nav-item">
                                            <Link to="/Setting" className="nav-link">
                                                <i className="far fa-circle nav-icon" /> <p>Settings</p>
                                            </Link>
                                        </li> */}
                                    </ul>
                                </li>
                            </ul>
                        }
                        {
                            isAdmin === "QUESTION_CREATOR" &&
                            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                                {/* <li className="nav-item">
                                    <NavLink className="nav-link" to="/Dashboard"><i className="nav-icon fas fa-columns" /><p>Dashboard</p></NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/Studentlist"><i className="nav-icon far fa-user" /><p>Student</p></NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/Category" className="nav-link"><i className="nav-icon fas fa-layer-group" /><p>Category</p></NavLink>
                                </li> */}
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/Question"><i className="nav-icon fas fa-file-alt" /><p>Questions</p></NavLink>
                                </li>
                                {/* <li className="nav-item">
                                    <NavLink to="/Keywords" className="nav-link"><i className="nav-icon fas fa-file" /><p>Keywords</p></NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/Exam" className="nav-link"><i className="nav-icon fas fa-table" /><p>Exam</p></NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/Quiz" className="nav-link"><i className="nav-icon fas fa-question" /><p>Quiz</p></NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/Mocktest" className="nav-link"><i className="nav-icon fas fa-clock" /><p>Mocktest</p></NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/Tournament" className="nav-link"><i className="nav-icon fas fa-medal" /><p>Tournament</p></NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/Banner" className="nav-link"><i className="nav-icon fas fa-image" /><p>Banner</p></NavLink>
                                </li> */}
                                {/* <li className={activate ? "nav-item menu-is-opening menu-open" : "nav-item"}>
                                    <a className="nav-link" onClick={AddClass}>
                                        <i className="nav-icon fas fa-shield-alt" />
                                        <p>
                                            Administration
                                            <i className="fas fa-angle-left right arrow" />
                                        </p>
                                    </a>
                                    <ul className="nav nav-treeview">
                                        <li className="nav-item">
                                            <Link to="/Admin" className="nav-link">
                                                <i className="far fa-circle nav-icon" /><p>Admin</p>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/Cashfree" className="nav-link">
                                                <i className="far fa-circle nav-icon" /><p>Cashfree Transaction</p>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/Withdraw" className="nav-link">
                                                <i className="far fa-circle nav-icon" />
                                                <p>Withdraw Request</p>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/Setting" className="nav-link">
                                                <i className="far fa-circle nav-icon" /> <p>Settings</p>
                                            </Link>
                                        </li>
                                    </ul>
                                </li> */}
                            </ul>
                        }
                    </nav>
                </div>
            </aside>
        </div >
    )
}
export default SideNav