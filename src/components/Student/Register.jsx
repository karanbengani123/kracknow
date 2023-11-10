import React, { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import SideNav from "./SideNav";
import { Link } from 'react-router-dom';
import '../CssFile/Student.css';


function Register() {
    const [show, setShow] = useState(false)

    return (<>
        <Header />
        <div className="content-wrapper admin-body">
            <section className="content">
                <div className="page-content">
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                <h4 className="mb-sm-0">Register exam</h4>
                                <div className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <Link to="/Exam" className="breadcrumb-item">Exam List</Link>
                                        <li className="breadcrumb-item active">Register exam</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">
                                    {/* <div className="row">
                                        <div className="col-md-12">
                                            <div className="card cards1">
                                                <div className="card-body">
                                                    <div className="d-flex bannerr">
                                                        banner

                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div> */}
                                    <div className="row">
                                        <div className="col-12 col-sm-4">
                                            <h5><b>Kracknow</b></h5>
                                            <p className='mt-3'><b>Exam ID:</b> KNkracknow251</p>
                                            <p><b>Start on:</b> 15 February 2022, 11:50 am</p>
                                            <p><b>Total 4 Questions (MCQs)</b></p>
                                        </div>

                                        <div className="col-12 col-sm-8">
                                            <div className="card cards3">
                                                <div className="card-body">
                                                    <div className="d-flex bannerr">
                                                        banner to be displayed here...
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* <div className="col-12 col-sm-3 registercol">
                                            <h5><b>Total Winnings</b></h5>
                                            <h6 className="text-warning registercol"> <i class="fa fa-inr"></i><b>Rs. 1000</b></h6>
                                        </div>
                                        <div className="col-12 col-sm-2 registercol">
                                            <h5><b>Total Seats</b></h5>
                                            <h6 className="text-warning registercol"><b>3/10</b></h6>
                                        </div>
                                        <div className="col-12 col-sm-3 registercol">
                                            <h5><b>Joining fee</b></h5>
                                            <h6 className="text-warning registercol"><b>FREE</b></h6>
                                        </div> */}
                                    </div>

                                    <div className="row mt-4">
                                        <div className="col-sm-4 registercol">
                                            <h5><b>Total Winnings</b></h5>
                                            <h6 className="text-warning registercol"><b>10</b></h6>


                                        </div>
                                        <div className="col-sm-4 registercol">
                                            <h5><b>Total Seats</b></h5>
                                            <h6 className="text-warning registercol">3/10</h6>

                                        </div>
                                        <div className="col-sm-4 registercol">
                                            <h5><b>Joining fee</b></h5>
                                            <h6 className="text-warning registercol"><b>FREE</b></h6>
                                        </div>
                                    </div>






                                    <div className="row mt-4">
                                        <div className="col-md-6">

                                            <div className="row mt-2">
                                                <div className="col">
                                                    <h5><b>Prizes</b></h5>
                                                </div>
                                                <div className="col">
                                                    <button class="btn btn-sm savebtn2" onClick={() => setShow(!show)}>Show {show ? "Less" : "More"}</button>
                                                </div>
                                            </div>

                                            <div className="col mt-2">
                                                <div className="option-section-1">
                                                    <div className="row prize">
                                                        <div className="col-2">
                                                            <i className="nav-icon fas fa-trophy quizicon text-warning" />
                                                        </div>
                                                        <div className="col">
                                                            <p><b>1st Prize winner</b></p>
                                                        </div>
                                                        <div className="col-3">
                                                            <p className="text-warning"><i class="fa fa-inr"></i><b>Rs. 100</b></p>
                                                        </div>
                                                        <div className="col-2">
                                                            <i className="fas fa-award quizicon text-warning" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {
                                                show ?
                                                    <>
                                                        <div className="col mt-2">
                                                            <div className="option-section-1">
                                                                <div className="row prize">
                                                                    <div className="col-2">
                                                                        <i className="nav-icon fas fa-trophy quizicon text-warning" />
                                                                    </div>
                                                                    <div className="col">
                                                                        <p><b>2nd Prize winner</b></p>
                                                                    </div>
                                                                    <div className="col-3">
                                                                        <p className="text-warning"><i class="fa fa-inr"></i><b>Rs. 100</b></p>
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
                                                                        <p><b>3rd Prize winner</b></p>
                                                                    </div>
                                                                    <div className="col-3">
                                                                        <p className="text-warning"><i class="fa fa-inr"></i><b>Rs. 100</b></p>
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
                                                                        <p><b>4th Prize winner</b></p>
                                                                    </div>
                                                                    <div className="col-3">
                                                                        <p className="text-warning"><i class="fa fa-inr"></i><b>Rs. 100</b></p>
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
                                                                        <p><b>5th Prize winner</b></p>
                                                                    </div>
                                                                    <div className="col-3">
                                                                        <p className="text-warning"><i class="fa fa-inr"></i><b>Rs. 100</b></p>
                                                                    </div>
                                                                    <div className="col-2">
                                                                        <i className="fas fa-award quizicon text-warning" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                    : null
                                            }


                                        </div>
                                        <div className="col-md-6 mt-2">
                                            <h5><b>Description</b></h5>
                                            <p>T1 exam scheduled for testing</p>
                                        </div>

                                    </div>
                                    <div className="row mt-4">
                                        <div className="col-sm-6 mt-2">
                                            <h5><b>Ranking factor</b></h5>
                                            <div className="option-section-1">
                                                <div className="row prize">
                                                    <div className="col-4">
                                                        <p><b>5 point</b></p>
                                                    </div>

                                                    <div className="col">
                                                        <p><b >If correct answer then:</b></p>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                        {/* <div className="col-sm-6 mt-2">
                                            <h5><b>Select Primary/Secondary</b></h5>
                                            <select className="form-select form-select mb-2" aria-label="Default select example">
                                                <option selected>Primary</option>
                                                <option value="1">Secondary</option>
                                            </select>
                                        </div> */}
                                    </div>
                                    <div className="row mt-4">
                                        {/* <div className="col-6">
                                            <p><b>Joining Fee</b> <b className="text-warning">FREE</b></p>
                                        </div> */}
                                        <div className="col">
                                            <Link to="/Quiz"><button type="submit" class="btn btn-success savebtn2">Start Quiz</button></Link>
                                            <button type="submit" class="btn btn-success savebtn2 me-1">Register</button>

                                        </div>

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

export default Register