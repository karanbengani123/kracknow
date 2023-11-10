import React, { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import SideNav from "./SideNav";
import { Link } from "react-router-dom";
import "../CssFile/Student.css";
import picture4 from "../images/Web-Banner.jpg";

function Tournamentregister() {
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);

  return (
    <>
      <Header />
      <div className="content-wrapper admin-body">
        <section className="content">
          <div className="page-content">
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                  <h4 className="mb-sm-0">Register Tournament</h4>
                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <Link to="/Tournament" className="breadcrumb-item">
                        Tournament
                      </Link>
                      <li className="breadcrumb-item active">
                        Register Tournament
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="row">
                  <div className="col-md-8">
                    <div className="card cards">
                      <img src={picture4} className="bannerr1"></img>
                    </div>
                    <div className="row mt-4">
                      <div className="col">
                        <h5>
                          <b>On-going Exam</b>
                        </h5>
                      </div>
                    </div>
                    <div className="option-section-1">
                      <div className="row prize2">
                        <div className="col">
                          <p>Exam-1</p>
                        </div>
                        <div className="col">
                          <p>28/3/2022</p>
                        </div>
                        <div className="col">11:00 am</div>
                        <div className="col">
                          <Link to="/Quiz">
                            <button
                              type="submit"
                              class="btn btn-sm btn-outline-success savebtn3"
                            >
                              Start Exam
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="row mt-4">
                      <div className="col">
                        <h5>
                          <b>Exam list</b>
                        </h5>
                      </div>
                    </div>

                    <div className="col mt-2">
                      <div className="option-section-1">
                        <div className="row prize">
                          <div className="col">
                            <p>Exam-1</p>
                          </div>
                          <div className="col">
                            <p>28/3/2022</p>
                          </div>
                          <div className="col">11:00 am</div>
                        </div>
                      </div>
                      <div className="option-section-1 mt-2">
                        <div className="row prize">
                          <div className="col">
                            <p>Exam-2</p>
                          </div>
                          <div className="col">
                            <p>29/3/2022</p>
                          </div>
                          <div className="col">11:00 am</div>
                        </div>
                      </div>
                      <div className="option-section-1 mt-2">
                        <div className="row prize">
                          <div className="col">
                            <p>Exam-3</p>
                          </div>
                          <div className="col">
                            <p>30/3/2022</p>
                          </div>
                          <div className="col">11:00 am</div>
                        </div>
                      </div>
                    </div>

                    {/* <div className="col mt-2">
                                        <div className="option-section-1">
                                            <div className="row prize">
                                                <div className="col-2">
                                                    <i className="nav-icon fas fa-trophy quizicon text-warning" />
                                                </div>
                                                <div className="col">
                                                    <p><b>1st Prize winner</b></p>
                                                </div>
                                                <div className="col-3">
                                                    <p className="text-warning"><i class="fa fa-inr"></i><b> <i className="nav-icon fas fa-rupee-sign" /> 100</b></p>
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
                                                                <p className="text-warning"><i class="fa fa-inr"></i><b> <i className="nav-icon fas fa-rupee-sign" /> 100</b></p>
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
                                                                <p className="text-warning"><i class="fa fa-inr"></i><b> <i className="nav-icon fas fa-rupee-sign" /> 100</b></p>
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
                                                                <p className="text-warning"><i class="fa fa-inr"></i><b> <i className="nav-icon fas fa-rupee-sign" /> 100</b></p>
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
                                                                <p className="text-warning"><i class="fa fa-inr"></i><b> <i className="nav-icon fas fa-rupee-sign" /> 100</b></p>
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
                                    <div className="col">
                                        <button class="btn btn-sm savebtn2" onClick={() => setShow(!show)}>Show {show ? "Less" : "More"}</button>
                                    </div> */}
                  </div>
                  <div className="col-12 col-sm-4">
                    <div className="card">
                      <div className="card-body">
                        <h5>
                          <b>Tournament</b>
                        </h5>
                        <p className="mt-1 mb-0">
                          <b>Tournament ID:</b> Tournament251
                        </p>
                        <p className="mb-0">
                          <b>Start on:</b> 15 February 2022, 11:50 am
                        </p>
                        <p className="mb-0">
                          <b>Total Questions</b>4 MCQs
                        </p>
                        <p className="mb-0">
                          <b>Total Winning:</b> 10
                        </p>
                        <p className="mb-0">
                          <b>Total Seats:</b> 3/10
                        </p>
                        <p className="mb-0">
                          <b>Joining fee:</b> Free
                        </p>
                        <p className="mb-0">
                          <b>Ranking factor:</b>
                        </p>
                        <div className="option-section-1 mt-0">
                          <div className="row prize">
                            <div className="col-4">
                              <p>
                                <b>5 point</b>
                              </p>
                            </div>
                            <div className="col">
                              <p>
                                <b>If correct answer then:</b>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col">
                      <div className=" d-sm-flex align-items-center justify-content-center">
                        <Link to="/Leaderboard">
                          <h5 className="text-primary">Leaderboard</h5>
                        </Link>
                      </div>
                    </div>

                    {/* <div className="col mt-2">
                                        <div className="option-section-1">
                                            <div className="row prize">
                                                <div className="col-2">
                                                    <i className="nav-icon fas fa-trophy quizicon text-warning" />
                                                </div>
                                                <div className="col">
                                                    <p>1st Prize winner</p>
                                                </div>
                                                <div className="col-3">
                                                    <p className="text-warning"><i class="fa fa-inr"></i><b> <i className="nav-icon fas fa-rupee-sign" /> 100</b></p>
                                                </div>
                                                <div className="col-2">
                                                    <i className="fas fa-award quizicon text-warning" />
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}

                    {show1 ? (
                      <>
                        <div className="col mt-2">
                          <div className="option-section-1">
                            <div className="row prize">
                              <div className="col-2">
                                <i className="nav-icon fas fa-trophy quizicon text-warning" />
                              </div>
                              <div className="col">
                                <p>1st Prize winner</p>
                              </div>
                              <div className="col-3">
                                <p className="text-warning">
                                  <i class="fa fa-inr"></i>
                                  <b> <i className="nav-icon fas fa-rupee-sign" /> 100</b>
                                </p>
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
                                <p>2nd Prize winner</p>
                              </div>
                              <div className="col-3">
                                <p className="text-warning">
                                  <i class="fa fa-inr"></i>
                                  <b> <i className="nav-icon fas fa-rupee-sign" /> 100</b>
                                </p>
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
                                <p>3rd Prize winner</p>
                              </div>
                              <div className="col-3">
                                <p className="text-warning">
                                  <i class="fa fa-inr"></i>
                                  <b> <i className="nav-icon fas fa-rupee-sign" /> 100</b>
                                </p>
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
                                <p>4th Prize winner</p>
                              </div>
                              <div className="col-3">
                                <p className="text-warning">
                                  <i class="fa fa-inr"></i>
                                  <b> <i className="nav-icon fas fa-rupee-sign" /> 100</b>
                                </p>
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
                                <p>5th Prize winner</p>
                              </div>
                              <div className="col-3">
                                <p className="text-warning">
                                  <i class="fa fa-inr"></i>
                                  <b> <i className="nav-icon fas fa-rupee-sign" /> 100</b>
                                </p>
                              </div>
                              <div className="col-2">
                                <i className="fas fa-award quizicon text-warning" />
                              </div>
                            </div>
                          </div>
                          {show ? (
                            <>
                              <div className="col mt-2">
                                <div className="option-section-1">
                                  <div className="row prize">
                                    <div className="col-2">
                                      <i className="nav-icon fas fa-trophy quizicon text-warning" />
                                    </div>
                                    <div className="col">
                                      <p>6th Prize winner</p>
                                    </div>
                                    <div className="col-3">
                                      <p className="text-warning">
                                        <i class="fa fa-inr"></i>
                                        <b> <i className="nav-icon fas fa-rupee-sign" /> 100</b>
                                      </p>
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
                                      <p>7th Prize winner</p>
                                    </div>
                                    <div className="col-3">
                                      <p className="text-warning">
                                        <i class="fa fa-inr"></i>
                                        <b> <i className="nav-icon fas fa-rupee-sign" /> 100</b>
                                      </p>
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
                                      <p>8th Prize winner</p>
                                    </div>
                                    <div className="col-3">
                                      <p className="text-warning">
                                        <i class="fa fa-inr"></i>
                                        <b> <i className="nav-icon fas fa-rupee-sign" /> 100</b>
                                      </p>
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
                                      <p>9th Prize winner</p>
                                    </div>
                                    <div className="col-3">
                                      <p className="text-warning">
                                        <i class="fa fa-inr"></i>
                                        <b> <i className="nav-icon fas fa-rupee-sign" /> 100</b>
                                      </p>
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
                                      <p>10th Prize winner</p>
                                    </div>
                                    <div className="col-3">
                                      <p className="text-warning">
                                        <i class="fa fa-inr"></i>
                                        <b> <i className="nav-icon fas fa-rupee-sign" /> 100</b>
                                      </p>
                                    </div>
                                    <div className="col-2">
                                      <i className="fas fa-award quizicon text-warning" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          ) : null}
                          <div className="col">
                            <button
                              class="btn btn-sm savebtn2"
                              onClick={() => setShow(!show)}
                            >
                              Show {show ? "Less" : "More"}
                            </button>
                          </div>
                        </div>
                      </>
                    ) : null}
                    {/* <div className="col">
                                        <button class="btn btn-sm savebtn2" onClick={() => setShow(!show)}>Show {show ? "Less" : "More"}</button>
                                    </div> */}
                    <div className="row mt-5">
                      <div className="col">
                        <div className=" d-sm-flex align-items-center justify-content-center">
                          <button
                            type="submit"
                            class="btn btn-success "
                            onClick={() => setShow1(!show1)}
                          >
                            {show1 ? "Unregister" : "Register"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <div className="row mt-4">
                                <div className="col">
                                    <Link to="/Quiz"><button type="submit" class="btn btn-outline-success savebtn2">Start Quiz</button></Link>
                                    <button type="submit" class="btn btn-success savebtn2 me-1" onClick={() => setShow1(!show1)}>{show1 ? "Register" : "Unregister"}</button>

                                </div>

                            </div> */}
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

export default Tournamentregister;
