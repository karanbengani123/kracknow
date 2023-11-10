import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../CssFile/Student.css';
import '../CssFile/Popup.css';
import { ToastContainer } from "react-bootstrap";
import jwt_decode from "jwt-decode";

function Header() {
    let navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState("");

    const mediaQuery = window.matchMedia('(max-width:768px)')
    const [state, setState] = useState(false)
    useEffect(() => {
        document.body.classList.toggle("sidebar-collapse", state);
        if (mediaQuery.matches) {
            document.body.classList.remove("sidebar-collapse", state);
            document.body.classList.toggle("sidebar-open", state);
            document.body.classList.toggle("sidebar-close", state);
        }
        else {

        }
        // return()=>
        // {
        //     document.body.classList.remove("sidebar-collapse");
        // }
    }, [state])
    // const sidebarclose= document.getElementsByClassName("sidebar-closed")



    const [show, setShow] = useState(false)
    const ShowHeader = () => {
        show ? setShow(false) : setShow(true);
    }

    function Logout() {
        localStorage.clear();
        navigate("/")
    }

    // const user = JSON.parse(localStorage.getItem('user-info'));
    // console.log(user)

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
        } else if (token === null) {
            navigate("/")
        }
        const decode = jwt_decode(token);
        // console.warn(decode.exp * 1000,"Decode times");
        if(decode.exp * 1000 < new Date())
        {
            localStorage.clear();
            navigate("/");
        }
        // console.warn(new Date(decode.exp *1000))
        return () => { };
    }, []);

    

    return (
        <div>
            <ToastContainer />
            <nav className="main-header navbar navbar-expand navbar-blue navbar-light">
                <ul className="navbar-nav">
                    
                    <li className="nav-item">
                        <a className="nav-link" data-widget="pushmenu" role="button" ><i className="fas ri-menu-2-line header-toogle" onClick={() => setState(!state)} /></a>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                    {/* <div className="name">
                        <span><h4>{user.message}</h4></span>
                    </div> */}
                    {/* <li className="nav-item dropdown">
                    <Popup trigger={<img src="./guy-6.jpg" className="rounded-circle header-img" alt="Sai And Ramit"/>} position="bottom right">
                        <Link to="/EditProfile"> <i className="fas fa-user mr-2" />Edit Profile</Link>
                        <br/>
                        <Link to="/"><i className="fas fa-power-off mr-2" />Logout</Link>
                    </Popup>
                   
                    </li> */}

                    <li className={show ? "nav-item dropdown show" : "nav-item dropdown"}>
                        <img src="./guy-6.jpg" className="rounded-circle header-img " data-toggle="dropdown" alt="" onClick={ShowHeader} />

                        <div className={show ? "dropdown-menu dropdown-menu-sm dropdown-menu-right show" : "dropdown-menu dropdown-menu-sm dropdown-menu-right"}>
                            <Link to="/EditProfile" className="dropdown-item">
                                <i className="fas fa-user mr-2" />Edit Profile
                            </Link>
                            <div className="dropdown-divider" />
                            <a className="dropdown-item" onClick={Logout}><i className="fas fa-power-off mr-2" /> Sign Out</a>
                        </div>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
export default Header