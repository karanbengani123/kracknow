import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import '../CssFile/Student.css';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import profileicon from '../images/guy-6.jpg';
import bellicon from '../images/icons8-bell-64.png';
import jwt_decode from "jwt-decode";
// import MagicBell, {FloatingNotificationInbox} from "@magicbell/magicbell-react";

function Header() {
    const [profilePic, setProfilePic] = useState("");
    const [walletBalance, setWalletBalance] = useState('');
    let navigate = useNavigate()
    // const [state, setState] = useState(false)
    // useEffect(() => {
    //     document.body.classList.toggle("sidebar-collapse", state);
    // }, [state])

    // const handleAllRead = () => console.warn("handleAllRead");
    // const[show,setShow] = useState()

    const [activate, setActivate] = useState(false);
    const AddClass = () => {
        activate ? setActivate(false) : setActivate(true);
    }
    const [change, setChange] = useState(false);
    const AddClasss = () => {
        change ? setChange(false) : setChange(true);
    }

    const mediaQuery = window.matchMedia('(max-width: 768px)')
    const [state, setState] = useState(false)
    useEffect(() => {
        setProfilePic(localStorage.getItem("ProfilePic"))
        document.body.classList.toggle("sidebar-collapse", state);
        if (mediaQuery.matches) {
            document.body.classList.remove("sidebar-collapse", state);
            document.body.classList.toggle("sidebar-open", state);
        } else {

        }
        // return()=>
        // {
        //     document.body.classList.remove("sidebar-collapse");
        // }
    }, [state])

    useEffect(() => {
        walletballance();
    }, [])

    let walletballance = async () => {
        let result = await fetch("http://localhost:3000/wallet/balance", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        if (result.status == 200) {
            const data = await result.json()
            setWalletBalance(data.payload.balance)
        } else {
            document.getElementsByClassName("statusError")[0].innerText =
                "Something Went Wrong , Try After Some Time";
            setTimeout(() => {
                document.getElementsByClassName("statusError")[0].innerText = "";
            }, 3000);
        }

    }

    function Logout() {
        localStorage.clear();
        navigate("/")
    }
    // var hours = 24; 
    // var now = new Date().getTime();
    // var setupTime = localStorage.getItem('token');
    // if (setupTime === null) {
    //     localStorage.setItem('setupTime', now)
    // } else {
    //     if (now - setupTime > hours * 60 * 60 * 1000) {
    //         localStorage.clear()
    //         localStorage.setItem('setupTime', now);
    //     }
    // }

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {

        } else {
            navigate("/")
        }

        const decode = jwt_decode(token);
        // setShow(decode.exp * 1000 < new Date());
        // console.warn(show)
        // console.log(decode.id,"student id")
        if (decode.exp * 1000 < new Date()) {
            console.warn()
            localStorage.clear();
            navigate("/");
        }
        // console.warn(decode.exp * 1000,"Expiray")

        return () => { };
    }, []);




    return (
        <div>
            <nav className="main-header navbar navbar-expand navbar-blue navbar-light">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" data-widget="pushmenu" role="button" ><i className="fas ri-menu-2-line header-toogle" onClick={() => setState(!state)} /></a>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                </ul>
                <ul className="navbar-nav ml-auto">
                    <div>
                        <Link to="/Wallet"><p className="text-gray mt-3 me-2">My Wallet: <i className="nav-icon fas fa-rupee-sign" /><b className="text-warning rupees">{walletBalance ? walletBalance : '0'}</b></p></Link>
                    </div>

                    <div className="dropdown d-inline-block">
                        <button type="button" className={change ? "btn header-item noti-icon waves-effect show" : "btn header-item noti-icon waves-effect"} id="page-header-notifications-dropdown" data-bs-toggle="dropdown" aria-expanded={change ? "true" : "false"}>
                            <img src={bellicon} className="bellicon" onClick={AddClasss} />
                            <span className="noti-dot" />
                        </button>
                        <div className={change ? "dropdown-menu dropdown-menu-lg dropdown-menu-end p-0 show" : "dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"} aria-labelledby="page-header-notifications-dropdown">
                            <div className="p-3">
                                <div className="row align-items-center">
                                    <div className="col">
                                        <h6 className="m-0">Notifications</h6>
                                    </div>
                                    <div className="col-auto">
                                        <Link to="/Notification" className="small">View all</Link>
                                    </div>
                                </div>
                            </div>
                            <div data-simplebar style={{ maxHeight: 230 }}>
                                <a href className="text-reset notification-item">
                                    <div className="d-flex">
                                        <Link to="/Register2"><div className="flex-1">
                                            <h6 className="mb-1">Kracknow exam will start in 30 minutes</h6>
                                            <div className="font-size-12 text-muted">
                                                <p className="mb-1">Register now for free.</p>
                                                <p className="mb-0"><i className="mdi mdi-clock-outline" /> 3 min ago</p>
                                            </div>
                                        </div></Link>
                                    </div>
                                </a>
                                <a href className="text-reset notification-item">
                                    <div className="d-flex">
                                        {/* <img src="assets/images/users/avatar-3.jpg" className="me-3 rounded-circle avatar-xs" alt="user-pic" /> */}
                                        <div className="flex-1">
                                            <h6 className="mb-1">GK Quiz will start on 15th April</h6>
                                            <div className="font-size-12 text-muted">
                                                <p className="mb-1">Register for exciting prizes.</p>
                                                <p className="mb-0"><i className="mdi mdi-clock-outline" /> 1 hours ago</p>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>

                    <li className={activate ? "nav-item dropdown show" : "nav-item"}>
                        <img src={profilePic || profileicon} className="rounded-circle header-img " data-toggle="dropdown" alt="" onClick={AddClass} />
                        <div className={activate ? "dropdown-menu dropdown-menu-sm dropdown-menu-right show" : "dropdown-menu dropdown-menu-sm dropdown-menu-right"}>
                            <Link to="/EditProfile" className="dropdown-item">
                                <i className="fas fa-user mr-2" />Edit Profile
                            </Link>
                            <div className="dropdown-divider" />
                            <a className="dropdown-item" onClick={Logout}><i className="fas fa-power-off mr-2" /> Sign Out</a>                        </div>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
export default Header