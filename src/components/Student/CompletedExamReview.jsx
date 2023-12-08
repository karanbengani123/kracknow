import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import SideNav from "./SideNav";
import { Link, useParams } from "react-router-dom";
import "../CssFile/Popup.css";
import "../CssFile/Student.css";
import loader from "../images/loader.gif";
import Popup from "reactjs-popup";
import Modal from "react-modal";
import { baseurlwallet } from "./BaseUrl";

function CompletedExamReview() {
    const [loading, setLoading] = useState(false);
    const [show1, setShow1] = useState(false);

    const [exam, setExam] = useState([]);
    const [examTime, setExamTime] = useState("");
    const [url, setBanner] = useState("");
    const [identifier, setIdentifier] = useState("");
    const [title, settitle] = useState("");
    const [totalWinningPrize, settotalWinningPrize] = useState("");
    const [totalQuestions, settotalQuestions] = useState("");
    const [status, setStatus] = useState("");
    const [studentLimit, setstudentLimit] = useState("");
    const [description, setdescription] = useState("");
    const [startTime, setStartTime] = useState();
    const [joiningFee, setJoiningFee] = useState();

    const [getstartTime, setGetStartTime] = useState();
    const [getendTime, setGetEndTime] = useState();

    const [examUUID, setexamUUID] = useState();
    const [scheduled, setScheduled] = useState(true);

    const [examParticipantUUID, setExamParticipantUUID] = useState();
    const [examScheduleUUID, setExamScheduleUUID] = useState();
    const [isPrimary, setIsPrimary] = useState();
    const [showModal, setShowModal] = useState(false);
    const [primarySubcategory, setPrimarySubcategory] = useState("null");
    const [getprimarySubcategory, setgetPrimarySubcategory] = useState([]);
    const [secondarySubcategory, setsecondarySubcategory] = useState("null");
    const [getsecondarySubcategory, setgetsecondarySubcategory] = useState("");
    const [disable, setDisable] = useState(false);
    const [getReview, setGetReview] = useState([]);
    const [leaderBoard, setLeaderBoard] = useState([]);
    const params = useParams();

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

    useEffect(() => {
        getExam();
        viewLeaderboard();
        getReviewList();
    }, []);

    const getExam = async () => {
        setLoading(true);
        let result = await fetch(
            `${baseurlwallet}/schedules/${params.uuid}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );

        result = await result.json();
        setExam(result.payload.response);
        setLoading(false);
        // setBanner(result.payload.response.examBanner.url)
        setIdentifier(result.payload.response.identifier);
        settitle(result.payload.response.title);
        setStatus(result.payload.response.schedule[0].status);
        setexamUUID(result.payload.response.schedule[0].examUUID);
        settotalWinningPrize(result.payload.response.totalWinningPrize);

        settotalQuestions(result.payload.response.totalQuestions);
        setstudentLimit(result.payload.response.studentLimit);
        setdescription(result.payload.response.description);
        setBanner(result.payload.response.examBanner.url);
        setIsPrimary(result.payload.response.allowPrimarySelection);
        setJoiningFee(result.payload.response.joinFee);
        setExamTime(result.payload.response.schedule[0].examTime);

        setScheduled(result.payload.response.schedule[0].studentExam && true);
        setExamParticipantUUID(result.payload.response.schedule[0].studentExam.uuid);
        setExamScheduleUUID(result.payload.response.schedule[0].uuid);

        setStartTime(result.payload.response.schedule[0].startTime);
        setGetStartTime(result.payload.response.schedule[0].startTime);
        setGetEndTime(result.payload.response.schedule[0].endTime);
    };

    //get view Leaderboard for student.........
    const viewLeaderboard = async () => {
        console.warn(params);
        let result = await fetch(
            `${baseurlwallet}/schedules/leaderBoard/${params.uuid}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        result = await result.json();
        setLeaderBoard(result.payload.response);
    };

    //Get Review List OF student..........
    const getReviewList = async () => {
        let result = await fetch(
            `${baseurlwallet}/schedules/review/answer/${params.uuid}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        result = await result.json();
        setGetReview(result.payload.respose);
    };
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
                                        <h4 className="mb-sm-0">Completed exam</h4>
                                        <div className="page-title-right">
                                            <ol className="breadcrumb m-0">
                                                <Link to="/Exam" className="breadcrumb-item">
                                                    Exam
                                                </Link>
                                                <li className="breadcrumb-item active">
                                                    Completed exam
                                                </li>
                                            </ol>
                                        </div>
                                    </div>
                                </div>
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
                                <div className="row">
                                    <div className="col-12">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-7">
                                                        <div className="card cards">
                                                            <img
                                                                className="viewTournament"
                                                                src={url || ""}
                                                                alt="Banner"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-5">
                                                        <div className="row">
                                                            <div className="col-sm-12">
                                                                <h6 className="mb-0">
                                                                    <b>Title</b>
                                                                </h6>
                                                                <p>{title}</p>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-sm-6">
                                                                <h6 className="mb-0">
                                                                    <b>Exam id</b>
                                                                </h6>
                                                                <p>{identifier}</p>
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <h6 className="mb-0">
                                                                    <b>Total Questions</b>
                                                                </h6>
                                                                <p>
                                                                    <span className="badge bg-danger">
                                                                        {totalQuestions}
                                                                    </span>
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-sm-6">
                                                                <h6 className="mb-0">
                                                                    <b>Start time</b>
                                                                </h6>
                                                                <p>{getDateTime(startTime)}</p>
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <h6 className="mb-0">
                                                                    <b>Total winning prize</b>
                                                                </h6>
                                                                <p>
                                                                    <span className="badge bg-warning">
                                                                        {totalWinningPrize}
                                                                    </span>
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-sm-6">
                                                                <h6 className="mb-0">
                                                                    <b>Student limit</b>
                                                                </h6>
                                                                <p>
                                                                    <span className="badge bg-danger">
                                                                        {studentLimit}
                                                                    </span>
                                                                </p>
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <h6 className="mb-0">
                                                                    <b>Joining fees</b>
                                                                </h6>
                                                                <p>
                                                                    <span className="badge bg-primary">
                                                                        {joiningFee}
                                                                    </span>
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-sm-6">
                                                                <h6 className="mb-0">
                                                                    <b>Exam Type</b>
                                                                </h6>
                                                                {
                                                                    examTime === "FULL_DAY" ?
                                                                        <p>
                                                                            <span className="badge bg-danger">
                                                                                {examTime.replace((examTime), "Full Day")}
                                                                            </span>
                                                                        </p>
                                                                        :
                                                                        <p>
                                                                            <span className="badge bg-danger">
                                                                                {examTime.replace((examTime), "Time Based")}
                                                                            </span>
                                                                        </p>
                                                                }

                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* <div className="col-sm-12">
                                                <div className="card">
                                                    <div className="card-body">
                                                        <h5><b>{title}</b></h5>
                                                        <p className='mt-1 mb-0'><b>Exam ID:</b> {identifier}</p>
                                                        <p className='mb-0'><b>Start on:</b>{getDateTime(startTime)}</p>
                                                        <p className='mb-0'><b>Total Questions:</b> {totalQuestions}</p>
                                                        <p className='mb-0'><b>Total Winning:</b> {totalWinningPrize}</p>
                                                        <p className='mb-0'><b>Total Seats:</b> {studentLimit}</p>
                                                        <p className='mb-0'><b>Joining fee:</b> Free</p>
                                                        <p className="mb-0"><b>Description:</b> {description}</p>
                                                        <p className='mb-0'><b>Ranking factor:</b></p>
                                                    </div>
                                                </div>
                                            </div> */}
                                                    {status === "COMPLETED" ? (
                                                        <div className="row mt-3">
                                                            {/* <div className="col-lg-12"> */}
                                                            <span className="mb-1">
                                                                <b>Review</b>
                                                            </span>
                                                            {/* <div className="card mt-1"> */}
                                                            {/* <div className="card-body"> */}
                                                            {/* <div className="title mt-5"></div> */}
                                                            <div className="table-responsive mt-0">
                                                                <table
                                                                    className="table table-bordered datatable dt-responsive nowrap"
                                                                    style={{
                                                                        borderCollapse: "collapse",
                                                                        borderSpacing: 0,
                                                                        width: "100%",
                                                                    }}
                                                                >
                                                                    <thead className="thead-light">
                                                                        <tr>
                                                                            {/* <th>Qn.No</th> */}
                                                                            <th>Question</th>
                                                                            <th>Given answer</th>
                                                                            <th>Correct answer</th>
                                                                            <th>Marks</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {getReview.map((data, index) => (
                                                                            <tr key={index}>
                                                                                {/* <td>{index + 1}</td> */}
                                                                                <td>
                                                                                    <div
                                                                                        dangerouslySetInnerHTML={{
                                                                                            __html: data.title,
                                                                                        }}
                                                                                    ></div>
                                                                                </td>
                                                                                <td>
                                                                                    <b>
                                                                                        {data.isCorrect ? (
                                                                                            <span className="text-success">
                                                                                                {data.givenAnswer}
                                                                                            </span>
                                                                                        ) : (
                                                                                            <span className="text-danger">
                                                                                                {data.givenAnswer}
                                                                                            </span>
                                                                                        )}
                                                                                    </b>
                                                                                </td>
                                                                                <td>
                                                                                    <b>{data.correctAnswer}</b>
                                                                                </td>
                                                                                <td>{data.mark}</td>
                                                                            </tr>
                                                                        ))}
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                            {/* </div> */}
                                                            {/* </div> */}
                                                            {/* </div> */}
                                                        </div>
                                                    ) : (
                                                        <div>
                                                            <div>
                                                                <p>
                                                                    <b>
                                                                        Review answer will be published after{" "}
                                                                        {getDateTime(getendTime)}
                                                                    </b>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {/* {status === "COMPLETED" ? ( */}
                                                        <div className="row mt-3">
                                                            {/* <div className="col-lg-12"> */}
                                                            <span className="mb-1">
                                                                <b>Leaderboard</b>
                                                            </span>
                                                            <div className="table-responsive mt-0">
                                                                <table
                                                                    className="table table-bordered datatable dt-responsive nowrap"
                                                                    style={{
                                                                        borderCollapse: "collapse",
                                                                        borderSpacing: 0,
                                                                        width: "100%",
                                                                    }}
                                                                >
                                                                    <thead className="thead-light">
                                                                        <tr>
                                                                            <th>Rank</th>
                                                                            <th>Name</th>
                                                                            <th>Mark</th>
                                                                            <th>Amount</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {leaderBoard.map((item, index) => (
                                                                            <tr key={index}>
                                                                                <td>{item.rank}</td>
                                                                                <td>{item.studentName}</td>
                                                                                <td>{item.marks}</td>
                                                                                <td>{item.prizeAmount}</td>
                                                                            </tr>
                                                                        ))}
                                                                    </tbody>
                                                                </table>
                                                            </div>

                                                            {/* <div className="card mt-1">
                                                                <div className="card-body">
                                                                    <div className="form">
                                                                        <form>
                                                                            <div className="form-row mb-4">
                                                                                <div className="col-12 col-sm-2">
                                                                                </div>
                                                                            </div>
                                                                        </form>
                                                                    </div>
                                                                </div>
                                                            </div> */}

                                                            {/* {leaderBoard.map((item, key) => (
                                                                <div className="col-sm-12" key={key}>
                                                                    <div className="row prize">
                                                                        <div className="col-2">
                                                                            <i className="nav-icon fas fa-trophy quizicon text-warning" />
                                                                        </div>
                                                                        <div className="col">
                                                                            <p>
                                                                                <b>
                                                                                    {
                                                                                        item.participatedStudents.firstName
                                                                                    }
                                                                                </b>
                                                                            </p>
                                                                        </div>
                                                                        <div className="col">
                                                                            <p>
                                                                                <b>{item.marks}</b>
                                                                            </p>
                                                                        </div>
                                                                        <div className="col-3">
                                                                            <p className="text-warning">
                                                                                <i class="fa fa-inr"></i>
                                                                                <b><i className="nav-icon fas fa-rupee-sign" /> 100</b>
                                                                            </p>
                                                                        </div>
                                                                        <div className="col-2">
                                                                            <i className="fas fa-award quizicon text-warning" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))} */}
                                                        {/* </div> */}
                                                        </div>
                                                    {/* ) : (
                                                        <div>
                                                            <div>
                                                                <p>
                                                                    <b>
                                                                        leaderboard will be published after {" "}
                                                                        {getDateTime(getendTime)}
                                                                    </b>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    )} */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </div>
            <SideNav />
            <Footer />
        </>
    );
}

export default CompletedExamReview;
