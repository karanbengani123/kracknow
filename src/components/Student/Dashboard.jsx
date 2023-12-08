import React, { useState, useEffect } from "react";
import "../CssFile/Student.css";
import { Link } from "react-router-dom";
import Header from "./Header";
import SideNav from "./SideNav";
import Footer from "./Footer";
import logo1 from "../images/icons8-exam-64.png";
import logo2 from "../images/icons8-quiz-64.png";
import logo3 from "../images/icons8-test-64.png";
import logo4 from "../images/icons8-medal-64.png";
import loader from "../images/loader.gif";
import Popup from "reactjs-popup";
import "../CssFile/Popup.css";
import SimpleImageSlider from "react-simple-image-slider";
import { baseurlwallet } from "./BaseUrl";

function Dashboard() {
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);

  const [exam, setExam] = useState([]);
  const [recommendedExam, setRecommendedExam] = useState([]);
  const [examUUID, setExamUUID] = useState([]);
  const [examCount, setExamCount] = useState([]);
  const [mockTestCount, setMockTestCount] = useState([]);
  const [quizCount, setQuizCount] = useState([]);
  const [tournamentCount, setTournamentCount] = useState([]);
  const [loading, setLoading] = useState(false);

  const [banner, setBanner] = useState([]);

  useEffect(() => {
    getBanner();
    getExam();
    getRecommendedExam();
    getDashboardCount();
  }, []);

  const getDashboardCount = async () => {
    setLoading(true);
    let result = await fetch(
      `${baseurlwallet}/dashboard`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    result = await result.json();
    setExamCount(result.payload.examCount);
    setTournamentCount(result.payload.tournamentCount);
    setQuizCount(result.payload.quizCount);
    setMockTestCount(result.payload.mockTestCount);
    setLoading(false);
  };

  //Get All Schedule Exam Start....
  const getExam = async (page) => {
    let result = await fetch(
      `${baseurlwallet}/schedules/all/exam?type=UPCOMING`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    result = await result.json();
    setExam(result.payload.response);
    result.payload.response.map((item) => (
      <span>{setExamUUID(item.uuid)}</span>
    ));
  };
  //Get All Schedule Exam Start....
  const getRecommendedExam = async (page) => {
    let result = await fetch(
      `${baseurlwallet}/schedules/all/exam?type=RECOMENDED`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    result = await result.json();
    setRecommendedExam(result.payload.response);
    result.payload.response.map((item) => (
      <span>{setExamUUID(item.uuid)}</span>
    ));
  };
  // console.warn("$$$$$$$$$$$$$", examUUID)

  //TimeFormat Code Start
  const formatAMPM = (date) => {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  };

  const getDateTime = (dateString) => {
    if (!dateString) {
      return;
    }
    const d = dateString;
    const date = new Date(d);
    return (
      [
        date.getDate(),
        date.toLocaleString("default", { month: "long" }),
        date.getFullYear(),
      ].join(" ") +
      ", " +
      formatAMPM(date)
    );
  };
  //Time Format Code End

  const images = [
    { url: "https://source.unsplash.com/1024x768/?nature" },
    { url: "https://source.unsplash.com/1024x768/?water" },
    { url: "https://source.unsplash.com/1024x768/?girl" },
    { url: "https://source.unsplash.com/1024x768/?tree" },
  ];

  const getBanner = async () => {
    let result = await fetch(
      `${baseurlwallet}/Banner/All`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    result = await result.json();
    if(result.payload.lists.rows.length)
    setBanner(
      result.payload.lists.rows
        .filter((data) => data.tag === "WEB")
        .map((url) => ({ url: url.url }))
    );
    console.log(banner,"Banner")
  };

  return (
    <>
      <Header />
      <SideNav />
      <div className="content-wrapper admin-body">
        <section className="content">
          <div className="container-fluid">
            <div className="page-content">
              <div className="row">
                <div className="col-md-12">
                  <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                    <h5 className="mb-sm-0">DASHBOARD</h5>
                  </div>
                </div>
              </div>
              <div className="col-md-12 mb-5">
                <SimpleImageSlider
                  // startIndex={1}
                  width={"100%"}
                  height={300}
                  images={banner}
                  showBullets={true}
                  showNavs={true}
                  slideDuration={1}
                  autoPlay={true}
                  loop={true}
                  startIndex={"3"}
                />
              </div>
              {loading ? (
                <div className="row h-100" style={{ paddingBottom: "11%" }}>
                  <div className="col-sm-12 my-auto">
                    <img
                      src={loader}
                      alt={"loader"}
                      className={"mx-auto d-block"}
                    />
                  </div>
                </div>
              ) : (
                <>
                  <div className="row ">
                    <div className="col-md-12">
                      <div className="row">
                        <div className="col-md-3">
                          <Link to="/Exam" className="card card-8">
                            <div className="card-body">
                              <div className="d-flex">
                                <div className="flex-1 overflow-hidden">
                                  <h5 className="colorcard mb-3">Exams</h5>
                                  <h1 className="colorcard">{examCount}</h1>
                                </div>
                                <div className="text-primary ms-auto">
                                  <img className="dashimage" src={logo1}></img>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </div>
                        <div className="col-md-3">
                          <Link to="/Quizpage" className="card card-7">
                            <div className="card-body">
                              <div className="d-flex">
                                <div className="flex-1 overflow-hidden">
                                  <h5 className="colorcard mb-3">Quizzes</h5>
                                  <h1 className="colorcard">{quizCount}</h1>
                                </div>
                                <div className="text-primary ms-auto">
                                  <img src={logo2}></img>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </div>
                        <div className="col-md-3">
                          <Link to="/Mocktest" className="card card-6">
                            <div className="card-body">
                              <div className="d-flex">
                                <div className="flex-1">
                                  <h5 className="colorcard mb-3">Mock-Tests</h5>
                                  <h1 className="colorcard">{mockTestCount}</h1>
                                </div>
                                <div className="text-primary ms-auto">
                                  <img src={logo3}></img>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </div>
                        <div className="col-md-3">
                          <Link to="/Tournament" className="card card-5">
                            <div className="card-body">
                              <div className="d-flex">
                                <div className="flex-1">
                                  <h5 className="colorcard mb-3">
                                    Tournaments
                                  </h5>
                                  <h1 className="colorcard">
                                    {tournamentCount}
                                  </h1>
                                </div>
                                <div className="text-primary ms-auto">
                                  <img src={logo4}></img>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-12">
                      <div className="row">
                        {/* <div className="col-md-6"> */}
                        <div className="row">
                          <div className="col">
                            <p className="headingFont">
                              <b>Upcoming Exams</b>
                            </p>
                          </div>
                        </div>

                        {/* <div className="col-sm-12"> */}
                        {/* <div className="row"> */}
                        {exam.length ? (
                          exam.slice(0, 4).map((item) => (
                            <div className="col-md-3">
                              <div className="card cards">
                                <img
                                  className="card-img imageHeight"
                                  src={item.examBanner.url}
                                  alt="ExamBanner"
                                />
                                <h4 className="card-title text-white overlay3">
                                  <span className="overLaysss">
                                    Prize:{item.totalWinningPrize}
                                  </span>
                                </h4>
                                <h4 className="card-title text-white overlay2">
                                  <span className="overLayss">
                                    Fee:{item.joinFee}
                                  </span>
                                </h4>
                                {/* <div className="card-img-overlay overlay3 text-white d-flex flex-column justify-content-center">
                                    <span className="card-link text-warning overLaysss">Winning prize:{item.totalWinningPrize}</span>

                                    <div className="link d-flex">
                                      <span className="card-link text-warning">Winning prize:{item.totalWinningPrize}</span>
                                      <span className="card-link text-warning">Join fee:{item.joinFee}</span>
                                    </div>
                                  </div> */}
                                <div className="card-body examcardbody">
                                  <div className="titleexam">
                                    <h6 className="text-truncate ExamCardTitle mt-1">
                                      <span>{item.title}</span>
                                    </h6>
                                  </div>
                                  <div className="textttt mb-2">
                                    <span className="spantext ExamCardContent">
                                      Student limit:
                                      <span className="text-fee">
                                        {item.studentLimit}
                                      </span>
                                    </span>
                                  </div>
                                  <div className="textttt mb-1">
                                    <span className="spantext ExamCardContent">
                                      Start:
                                      {getDateTime(item.schedule[0].startTime)}
                                    </span>
                                  </div>
                                  <Link
                                    to={"/Register2/" + item.schedule[0].uuid}
                                  >
                                    <a className="stretched-link"></a>
                                  </Link>
                                </div>
                              </div>
                              {/* <img className="examSchdeuleImage" src={item.examBanner.url}></img>
                          <div className="card-body examcardbody">
                            <div className="titleexam">
                              <h6 className="text-truncate mb-1 mt-1"><b>{item.title}</b></h6>
                            </div>
                            <div className="textttt-first">
                              <span className="spantext "><b>Winning prize:</b>{item.totalWinningPrize}</span>
                            </div>
                            <div className="textttt-first">
                              <span className="spantext"><b>Joining fee:</b> <span className="text-danger fee">{item.joinFee}</span></span>
                            </div>
                            <div className="textttt">
                              <span className="spantext"><b>Student limit:</b> <span className="text-fee">{item.studentLimit}</span></span>
                            </div>
                            <div className="textttt">
                              <span className="spantext"><b>Start time:</b> {getDateTime(item.schedule[0].startTime)}</span>
                            </div>
                            <Link to={"/Register2/" + item.schedule[0].uuid}><a className="stretched-link"></a></Link>
                          </div> */}
                            </div>
                          ))
                        ) : (
                          <div className="row text-center">
                            <span>No Upcominng Exams Found</span>
                          </div>
                        )}
                        {/* </div>
                </div>
              </div> */}
                        {exam.length >= 4 ? (
                          <div className="text-end">
                            <span>
                              <Link to={"/Exam"}>View all exam</Link>
                            </span>
                          </div>
                        ) : (
                          <div className="text-end">
                            {/* <span>No exam</span> */}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="row">
                        {/* <div className="col-md-6"> */}
                        <div className="row">
                          <div className="col">
                            <p className="headingFont">
                              <b>Recommended Exams</b>
                            </p>
                          </div>
                        </div>

                        {/* <div className="col-sm-12"> */}
                        {/* <div className="row"> */}
                        {recommendedExam.length ? (
                          exam.slice(0, 4).map((item) => (
                            <div className="col-md-3">
                              <div className="card cards">
                                <img
                                  className="card-img imageHeight"
                                  src={item.examBanner.url}
                                  alt="ExamBanner"
                                />
                                <h4 className="card-title text-white overlay3">
                                  <span className="overLaysss">
                                    Prize:{item.totalWinningPrize}
                                  </span>
                                </h4>
                                <h4 className="card-title text-white overlay2">
                                  <span className="overLayss">
                                    Fee:{item.joinFee}
                                  </span>
                                </h4>
                                {/* <div className="card-img-overlay overlay3 text-white d-flex flex-column justify-content-center">
                                    <span className="card-link text-warning overLaysss">Winning prize:{item.totalWinningPrize}</span>

                                    <div className="link d-flex">
                                      <span className="card-link text-warning">Winning prize:{item.totalWinningPrize}</span>
                                      <span className="card-link text-warning">Join fee:{item.joinFee}</span>
                                    </div>
                                  </div> */}
                                <div className="card-body examcardbody">
                                  <div className="titleexam">
                                    <h6 className="text-truncate ExamCardTitle mt-1">
                                      <span>{item.title}</span>
                                    </h6>
                                  </div>
                                  <div className="textttt mb-2">
                                    <span className="spantext ExamCardContent">
                                      Student limit:
                                      <span className="text-fee">
                                        {item.studentLimit}
                                      </span>
                                    </span>
                                  </div>
                                  <div className="textttt mb-1">
                                    <span className="spantext ExamCardContent">
                                      Start:
                                      {getDateTime(item.schedule[0].startTime)}
                                    </span>
                                  </div>
                                  <Link
                                    to={"/Register2/" + item.schedule[0].uuid}
                                  >
                                    <a className="stretched-link"></a>
                                  </Link>
                                </div>
                              </div>
                              {/* <img className="examSchdeuleImage" src={item.examBanner.url}></img>
                          <div className="card-body examcardbody">
                            <div className="titleexam">
                              <h6 className="text-truncate mb-1 mt-1"><b>{item.title}</b></h6>
                            </div>
                            <div className="textttt-first">
                              <span className="spantext "><b>Winning prize:</b>{item.totalWinningPrize}</span>
                            </div>
                            <div className="textttt-first">
                              <span className="spantext"><b>Joining fee:</b> <span className="text-danger fee">{item.joinFee}</span></span>
                            </div>
                            <div className="textttt">
                              <span className="spantext"><b>Student limit:</b> <span className="text-fee">{item.studentLimit}</span></span>
                            </div>
                            <div className="textttt">
                              <span className="spantext"><b>Start time:</b> {getDateTime(item.schedule[0].startTime)}</span>
                            </div>
                            <Link to={"/Register2/" + item.schedule[0].uuid}><a className="stretched-link"></a></Link>
                          </div> */}
                            </div>
                          ))
                        ) : (
                          <div className="row text-center">
                            <span>No Recomended Exams Found</span>
                          </div>
                        )}
                        {/* </div>
                </div>
              </div> */}
                        {exam.length >= 4 ? (
                          <div className="text-end">
                            <span>
                              <Link to={"/Exam"}>View all exam</Link>
                            </span>
                          </div>
                        ) : (
                          <div className="text-end">
                            {/* <span>No exam</span> */}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="row">
                        {/* <div className="col-md-6"> */}
                        <div className="row">
                          <div className="col">
                            <p className="headingFont">
                              <b>Upcoming Quizzes</b>
                            </p>
                          </div>
                        </div>

                        {/* <div className="col-sm-12"> */}
                        {/* <div className="row"> */}
                        {recommendedExam.length ? (
                          exam.slice(0, 4).map((item) => (
                            <div className="col-md-3">
                              <div className="card cards">
                                <img
                                  className="card-img imageHeight"
                                  src={item.examBanner.url}
                                  alt="ExamBanner"
                                />
                                <h4 className="card-title text-white overlay3">
                                  <span className="overLaysss">
                                    Prize:{item.totalWinningPrize}
                                  </span>
                                </h4>
                                <h4 className="card-title text-white overlay2">
                                  <span className="overLayss">
                                    Fee:{item.joinFee}
                                  </span>
                                </h4>
                                {/* <div className="card-img-overlay overlay3 text-white d-flex flex-column justify-content-center">
                                    <span className="card-link text-warning overLaysss">Winning prize:{item.totalWinningPrize}</span>

                                    <div className="link d-flex">
                                      <span className="card-link text-warning">Winning prize:{item.totalWinningPrize}</span>
                                      <span className="card-link text-warning">Join fee:{item.joinFee}</span>
                                    </div>
                                  </div> */}
                                <div className="card-body examcardbody">
                                  <div className="titleexam">
                                    <h6 className="text-truncate ExamCardTitle mt-1">
                                      <span>{item.title}</span>
                                    </h6>
                                  </div>
                                  <div className="textttt mb-2">
                                    <span className="spantext ExamCardContent">
                                      Student limit:
                                      <span className="text-fee">
                                        {item.studentLimit}
                                      </span>
                                    </span>
                                  </div>
                                  <div className="textttt mb-1">
                                    <span className="spantext ExamCardContent">
                                      Start:
                                      {getDateTime(item.schedule[0].startTime)}
                                    </span>
                                  </div>
                                  <Link
                                    to={"/Register2/" + item.schedule[0].uuid}
                                  >
                                    <a className="stretched-link"></a>
                                  </Link>
                                </div>
                              </div>
                              {/* <img className="examSchdeuleImage" src={item.examBanner.url}></img>
                          <div className="card-body examcardbody">
                            <div className="titleexam">
                              <h6 className="text-truncate mb-1 mt-1"><b>{item.title}</b></h6>
                            </div>
                            <div className="textttt-first">
                              <span className="spantext "><b>Winning prize:</b>{item.totalWinningPrize}</span>
                            </div>
                            <div className="textttt-first">
                              <span className="spantext"><b>Joining fee:</b> <span className="text-danger fee">{item.joinFee}</span></span>
                            </div>
                            <div className="textttt">
                              <span className="spantext"><b>Student limit:</b> <span className="text-fee">{item.studentLimit}</span></span>
                            </div>
                            <div className="textttt">
                              <span className="spantext"><b>Start time:</b> {getDateTime(item.schedule[0].startTime)}</span>
                            </div>
                            <Link to={"/Register2/" + item.schedule[0].uuid}><a className="stretched-link"></a></Link>
                          </div> */}
                            </div>
                          ))
                        ) : (
                          <div className="row text-center">
                            <span>No Upcoming Quizes Found</span>
                          </div>
                        )}
                        {/* </div>
                </div>
              </div> */}
                        {exam.length >= 4 ? (
                          <div className="text-end">
                            <span>
                              <Link to={"/Exam"}>View all exam</Link>
                            </span>
                          </div>
                        ) : (
                          <div className="text-end">
                            {/* <span>No exam</span> */}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="row">
                        {/* <div className="col-md-6"> */}
                        <div className="row">
                          <div className="col">
                            <p className="headingFont">
                              <b>Upcoming Mocktests</b>
                            </p>
                          </div>
                        </div>

                        {/* <div className="col-sm-12"> */}
                        {/* <div className="row"> */}
                        {recommendedExam.length ? (
                          exam.slice(0, 4).map((item) => (
                            <div className="col-md-3">
                              <div className="card cards">
                                <img
                                  className="card-img imageHeight"
                                  src={item.examBanner.url}
                                  alt="ExamBanner"
                                />
                                <h4 className="card-title text-white overlay3">
                                  <span className="overLaysss">
                                    Prize:{item.totalWinningPrize}
                                  </span>
                                </h4>
                                <h4 className="card-title text-white overlay2">
                                  <span className="overLayss">
                                    Fee:{item.joinFee}
                                  </span>
                                </h4>
                                {/* <div className="card-img-overlay overlay3 text-white d-flex flex-column justify-content-center">
                                    <span className="card-link text-warning overLaysss">Winning prize:{item.totalWinningPrize}</span>

                                    <div className="link d-flex">
                                      <span className="card-link text-warning">Winning prize:{item.totalWinningPrize}</span>
                                      <span className="card-link text-warning">Join fee:{item.joinFee}</span>
                                    </div>
                                  </div> */}
                                <div className="card-body examcardbody">
                                  <div className="titleexam">
                                    <h6 className="text-truncate ExamCardTitle mt-1">
                                      <span>{item.title}</span>
                                    </h6>
                                  </div>
                                  <div className="textttt mb-2">
                                    <span className="spantext ExamCardContent">
                                      Student limit:
                                      <span className="text-fee">
                                        {item.studentLimit}
                                      </span>
                                    </span>
                                  </div>
                                  <div className="textttt mb-1">
                                    <span className="spantext ExamCardContent">
                                      Start:
                                      {getDateTime(item.schedule[0].startTime)}
                                    </span>
                                  </div>
                                  <Link
                                    to={"/Register2/" + item.schedule[0].uuid}
                                  >
                                    <a className="stretched-link"></a>
                                  </Link>
                                </div>
                              </div>
                              {/* <img className="examSchdeuleImage" src={item.examBanner.url}></img>
                          <div className="card-body examcardbody">
                            <div className="titleexam">
                              <h6 className="text-truncate mb-1 mt-1"><b>{item.title}</b></h6>
                            </div>
                            <div className="textttt-first">
                              <span className="spantext "><b>Winning prize:</b>{item.totalWinningPrize}</span>
                            </div>
                            <div className="textttt-first">
                              <span className="spantext"><b>Joining fee:</b> <span className="text-danger fee">{item.joinFee}</span></span>
                            </div>
                            <div className="textttt">
                              <span className="spantext"><b>Student limit:</b> <span className="text-fee">{item.studentLimit}</span></span>
                            </div>
                            <div className="textttt">
                              <span className="spantext"><b>Start time:</b> {getDateTime(item.schedule[0].startTime)}</span>
                            </div>
                            <Link to={"/Register2/" + item.schedule[0].uuid}><a className="stretched-link"></a></Link>
                          </div> */}
                            </div>
                          ))
                        ) : (
                          <div className="row text-center">
                            <span>No Upcoming Mocktest Found</span>
                          </div>
                        )}
                        {/* </div>
                </div>
              </div> */}
                        {exam.length >= 4 ? (
                          <div className="text-end">
                            <span>
                              <Link to={"/Exam"}>View all exam</Link>
                            </span>
                          </div>
                        ) : (
                          <div className="text-end">
                            {/* <span>No exam</span> */}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="row">
                        {/* <div className="col-md-6"> */}
                        <div className="row">
                          <div className="col">
                            <p className="headingFont">
                              <b>Upcoming Tournament</b>
                            </p>
                          </div>
                        </div>

                        {/* <div className="col-sm-12"> */}
                        {/* <div className="row"> */}
                        {recommendedExam.length ? (
                          exam.slice(0, 4).map((item) => (
                            <div className="col-md-3">
                              <div className="card cards">
                                <img
                                  className="card-img imageHeight"
                                  src={item.examBanner.url}
                                  alt="ExamBanner"
                                />
                                <h4 className="card-title text-white overlay3">
                                  <span className="overLaysss">
                                    Prize:{item.totalWinningPrize}
                                  </span>
                                </h4>
                                <h4 className="card-title text-white overlay2">
                                  <span className="overLayss">
                                    Fee:{item.joinFee}
                                  </span>
                                </h4>
                                {/* <div className="card-img-overlay overlay3 text-white d-flex flex-column justify-content-center">
                                    <span className="card-link text-warning overLaysss">Winning prize:{item.totalWinningPrize}</span>

                                    <div className="link d-flex">
                                      <span className="card-link text-warning">Winning prize:{item.totalWinningPrize}</span>
                                      <span className="card-link text-warning">Join fee:{item.joinFee}</span>
                                    </div>
                                  </div> */}
                                <div className="card-body examcardbody">
                                  <div className="titleexam">
                                    <h6 className="text-truncate ExamCardTitle mt-1">
                                      <span>{item.title}</span>
                                    </h6>
                                  </div>
                                  <div className="textttt mb-2">
                                    <span className="spantext ExamCardContent">
                                      Student limit:
                                      <span className="text-fee">
                                        {item.studentLimit}
                                      </span>
                                    </span>
                                  </div>
                                  <div className="textttt mb-1">
                                    <span className="spantext ExamCardContent">
                                      Start:
                                      {getDateTime(item.schedule[0].startTime)}
                                    </span>
                                  </div>
                                  <Link
                                    to={"/Register2/" + item.schedule[0].uuid}
                                  >
                                    <a className="stretched-link"></a>
                                  </Link>
                                </div>
                              </div>
                              {/* <img className="examSchdeuleImage" src={item.examBanner.url}></img>
                          <div className="card-body examcardbody">
                            <div className="titleexam">
                              <h6 className="text-truncate mb-1 mt-1"><b>{item.title}</b></h6>
                            </div>
                            <div className="textttt-first">
                              <span className="spantext "><b>Winning prize:</b>{item.totalWinningPrize}</span>
                            </div>
                            <div className="textttt-first">
                              <span className="spantext"><b>Joining fee:</b> <span className="text-danger fee">{item.joinFee}</span></span>
                            </div>
                            <div className="textttt">
                              <span className="spantext"><b>Student limit:</b> <span className="text-fee">{item.studentLimit}</span></span>
                            </div>
                            <div className="textttt">
                              <span className="spantext"><b>Start time:</b> {getDateTime(item.schedule[0].startTime)}</span>
                            </div>
                            <Link to={"/Register2/" + item.schedule[0].uuid}><a className="stretched-link"></a></Link>
                          </div> */}
                            </div>
                          ))
                        ) : (
                          <div className="row text-center">
                            <span>No Upcoming Tournament Found</span>
                          </div>
                        )}
                        {/* </div>
                </div>
              </div> */}
                        {exam.length >= 4 ? (
                          <div className="text-end">
                            <span>
                              <Link to={"/Exam"}>View all exam</Link>
                            </span>
                          </div>
                        ) : (
                          <div className="text-end">
                            {/* <span>No exam</span> */}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default Dashboard;
