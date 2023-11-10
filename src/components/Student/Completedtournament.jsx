import React, { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import SideNav from "./SideNav";
import { Link } from 'react-router-dom';
import '../CssFile/Student.css';
import picture4 from '../images/Web-Banner.jpg';


function Tournamentregister() {
    const [show, setShow] = useState(false)
    const [show1, setShow1] = useState(false)

    return (<>
        <Header />
        <div className="content-wrapper admin-body">
            <section className="content">
                <div className="page-content">
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                <h4 className="mb-sm-0">Completed Tournament</h4>
                                <div className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <Link to="/Tournament" className="breadcrumb-item">Tournament</Link>
                                        <li className="breadcrumb-item active">Completed Tournament</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-12">
                            <div className="row">
                                <div className="col-md-8">
                                    <div className="card cards">
                                        <img src={picture4} className="bannerr1"></img>

                                    </div>                                    

                                </div>
                                <div className="col-12 col-sm-4">
                                <div className="row mt-2">
                                        <div className="col">
                                            <h5 className="leaderboard"><b>Leaderboard</b></h5>
                                        </div>

                                    </div>
                                    <div className="col mt-2">
                                        <div className="option-section-1">
                                            <div className="row prize">
                                                <div className="col-2">
                                                    <i className="nav-icon fas fa-trophy quizicon text-warning" />
                                                </div>
                                                <div className="col">
                                                    <p><b>Student-1</b></p>
                                                </div>
                                                <div className="col-3">
                                                    <p className="text-warning"><i class="fa fa-inr"></i><b><i className="nav-icon fas fa-rupee-sign" /> 100</b></p>
                                                </div>
                                                <div className="col-2">
                                                    <i className="fas fa-award quizicon text-warning" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col mt-2">
                                        <div className="option-section-1">
                                            <div className="row prize">
                                                <div className="col-2">
                                                    <i className="nav-icon fas fa-trophy quizicon text-warning" />
                                                </div>
                                                <div className="col">
                                                    <p><b>Student-2</b></p>
                                                </div>
                                                <div className="col-3">
                                                    <p className="text-warning"><i class="fa fa-inr"></i><b><i className="nav-icon fas fa-rupee-sign" /> 100</b></p>
                                                </div>
                                                <div className="col-2">
                                                    <i className="fas fa-award quizicon text-warning" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col mt-2">
                                        <div className="option-section-1">
                                            <div className="row prize">
                                                <div className="col-2">
                                                    <i className="nav-icon fas fa-trophy quizicon text-warning" />
                                                </div>
                                                <div className="col">
                                                    <p><b>Student-3</b></p>
                                                </div>
                                                <div className="col-3">
                                                    <p className="text-warning"><i class="fa fa-inr"></i><b><i className="nav-icon fas fa-rupee-sign" /> 100</b></p>
                                                </div>
                                                <div className="col-2">
                                                    <i className="fas fa-award quizicon text-warning" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col mt-2">
                                        <div className="option-section-1">
                                            <div className="row prize">
                                                <div className="col-2">
                                                    <i className="nav-icon fas fa-trophy quizicon text-warning" />
                                                </div>
                                                <div className="col">
                                                    <p><b>Student-4</b></p>
                                                </div>
                                                <div className="col-3">
                                                    <p className="text-warning"><i class="fa fa-inr"></i><b><i className="nav-icon fas fa-rupee-sign" /> 100</b></p>
                                                </div>
                                                <div className="col-2">
                                                    <i className="fas fa-award quizicon text-warning" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col mt-2">
                                        <div className="option-section-1">
                                            <div className="row prize">
                                                <div className="col-2">
                                                    <i className="nav-icon fas fa-trophy quizicon text-warning" />
                                                </div>
                                                <div className="col">
                                                    <p><b>Student-5</b></p>
                                                </div>
                                                <div className="col-3">
                                                    <p className="text-warning"><i class="fa fa-inr"></i><b><i className="nav-icon fas fa-rupee-sign" /> 100</b></p>
                                                </div>
                                                <div className="col-2">
                                                    <i className="fas fa-award quizicon text-warning" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col mt-2">
                                        <Link to="/Leaderboard"><button className="btn-sm savebtn3">Show More</button></Link>
                                    </div>
                                    
                                </div>

                            </div>


                           

                        </div>
                    </div>
                </div>

            </section>
        </div >
        <SideNav />
        <Footer />
    </>
    )

}

export default Tournamentregister