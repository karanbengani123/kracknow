import React from "react";
import "../CssFile/Student.css";
import { Link } from "react-router-dom";
import SideNav from "./SideNav";
import Footer from "./Footer";
import Header from "./Header";
import AnimatedText from 'react-animated-text-content';
import bellicon from '../images/icons8-bell-64.png';

function Notification() {
    return (
        <>
            <Header />
            <div className="content-wrapper admin-body">
                <section className="content">
                    <div className="container-fluid">
                        <div className="page-content">
                            <div className="row">
                                <div className="col-12">
                                    <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                        <h4 className="mb-sm-0">Notification</h4>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="row me-2 ml-2">
                                                <Link to={""} className="col-sm-12 notificationBox d-flex">
                                                    <div className="col-sm-1">
                                                        <div className="notificationImage">
                                                        <img src={bellicon} className="bellicon" />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-9">
                                                        <div className="notificationText">
                                                            <p>Thank You for registering for this exam</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-2 d-flex justify-content-between align-item-center">
                                                        <div className="notificationDate">
                                                            <p>22/07/2000</p>
                                                        </div>
                                                        <div className="notificationDate">
                                                            <p>05:30pm</p>
                                                        </div>
                                                    </div>
                                                </Link>
                                                <Link to={""} className="col-sm-12 notificationBox d-flex">
                                                    <div className="col-sm-1">
                                                        <div className="notificationImage">
                                                        <img src={bellicon} className="bellicon" />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-9">
                                                        <div className="notificationText">
                                                            <p>Your exam is starting in 15 mins</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-2 d-flex justify-content-between align-item-center">
                                                        <div className="notificationDate">
                                                            <p>22/07/2000</p>
                                                        </div>
                                                        <div className="notificationDate">
                                                            <p>05:30pm</p>
                                                        </div>
                                                    </div>
                                                </Link>
                                                <Link to={""} className="col-sm-12 notificationBox d-flex">
                                                    <div className="col-sm-1">
                                                        <div className="notificationImage">
                                                        <img src={bellicon} className="bellicon" />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-9">
                                                        <div className="notificationText">
                                                            <p>Exam is complete. Please check the leaderboard</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-2 d-flex justify-content-between align-item-center">
                                                        <div className="notificationDate">
                                                            <p>22/07/2000</p>
                                                        </div>
                                                        <div className="notificationDate">
                                                            <p>05:30pm</p>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <SideNav />
            <Footer />
        </>
    );
}
export default Notification;

