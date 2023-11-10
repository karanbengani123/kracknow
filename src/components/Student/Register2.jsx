import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import SideNav from "./SideNav";
import { Link, useParams, useNavigate } from 'react-router-dom';
import "../CssFile/Popup.css";
import '../CssFile/Student.css';
import Modal from 'react-modal';
import loader from '../images/loader.gif';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from "moment-timezone";





function Register2() {
    const [show, setShow] = useState(false);
    const [startExamDisable, setStartExamDisable] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showLoaderShow, setShowLoaderShow] = useState(false);
    const [isStudentAppeared, setIsStudentAppeared] = useState("");
    const navigate = useNavigate();

    const [exam, setExam] = useState([])
    const [url, setBanner] = useState('')
    const [identifier, setIdentifier] = useState('')
    const [title, settitle] = useState('')
    const [totalWinningPrize, settotalWinningPrize] = useState('')
    const [totalQuestions, settotalQuestions] = useState('')
    const [studentLimit, setstudentLimit] = useState('')
    const [joinDelay, setjoinDelay] = useState('')
    const [description, setdescription] = useState('')
    const [startTime, setStartTime] = useState()
    const [examTime, setexamTime] = useState()
    const [joiningFee, setJoiningFee] = useState()

    const [getstartTime, setGetStartTime] = useState()
    const [getendTime, setGetEndTime] = useState()

    const [examUUID, setexamUUID] = useState()
    const [scheduled, setScheduled] = useState(true);
    const [examRankingFactor, setExamRankingFactor] = useState([]);

    const [examParticipantUUID, setExamParticipantUUID] = useState();
    const [examScheduleUUID, setExamScheduleUUID] = useState();
    const [isPrimary, setIsPrimary] = useState();
    const [showModal, setShowModal] = useState(false);
    const [primarySubcategory, setPrimarySubcategory] = useState("");
    const [getprimarySubcategory, setgetPrimarySubcategory] = useState([]);
    const [secondarySubcategory, setsecondarySubcategory] = useState("");
    const [getsecondarySubcategory, setgetsecondarySubcategory] = useState("");
    const [enableStartExam, setEnableStartExam] = useState(false)
    const [unregisterDisableExam, setunregisterDisableExam] = useState(false)
    const [registerDisableExam, setregisterDisableExam] = useState(false)
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [currentTime, setCurrentTime] = useState(moment().utcOffset('+05:30').format('YYYY-MM-DD hh:mm:ss a'));
    const [enableJoinDelayTime, setEnableJoinDelayTime] = useState("");

    const params = useParams()
    // const notify = () => toast(errorMessage);
    // setShow(false)



    useEffect(() => {
        // const timeout = setTimeout(() => {
        // }, 2000)
        // return () => clearTimeout(timeout)
        // getQuestionSubCategory();
        getExam();
    }, [])


    const getExam = async () => {
        setLoading(true)
        let result = await fetch(`https://zlasvmkyg1.execute-api.ap-south-1.amazonaws.com/dev/schedules/${params.uuid}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });

        result = await result.json();
        setExam(result.payload.response);
        setregisterDisableExam((new Date(result.payload.response.schedule[0].startTime) <= new Date()));
        setLoading(false)

        setIdentifier(result.payload.response.identifier)
        settitle(result.payload.response.title)
        setexamUUID(result.payload.response.schedule[0].examUUID)
        settotalWinningPrize(result.payload.response.totalWinningPrize)
        setExamRankingFactor(result.payload.response.examRankingFactor)
        setJoiningFee(result.payload.response.joinFee)

        settotalQuestions(result.payload.response.totalQuestions)
        setstudentLimit(result.payload.response.studentLimit)
        setjoinDelay(result.payload.response.joinDelay)
        setdescription(result.payload.response.description)
        setBanner(result.payload.response.examBanner.url)
        setIsPrimary(result.payload.response.allowPrimarySelection)
        setStartTime(result.payload.response.schedule[0].startTime)
        setexamTime(result.payload.response.schedule[0].examTime)



        // setScheduled(result.payload.response.schedule[0].studentExam && true)
        setScheduled(result.payload.examStudent && true)
        setExamParticipantUUID(result.payload.response.schedule[0].studentExam.uuid)
        setExamScheduleUUID(result.payload.response.schedule[0].uuid)

        setIsStudentAppeared(result.payload.response.schedule[0].studentExam.status)

        // setGetStartTime()
        // setGetEndTime()


        setEnableStartExam((new Date(result.payload.response.schedule[0].startTime) <= new Date()) && (new Date() <= new Date(result.payload.response.schedule[0].endTime)));
        setunregisterDisableExam((new Date(result.payload.response.schedule[0].startTime) <= new Date()));
        // setregisterDisableExam((new Date(result.payload.response.schedule[0].startTime.slice(0, -1)) <= new Date()));



        // var now = new Date(result.payload.response.schedule[0].startTime);
        // var sec = now.getSeconds();
        // var delay = now.setSeconds(sec + joinDelay);
        // setEnableJoinDelayTime(new Date(delay) <= new Date())
        // console.log(enableJoinDelayTime,"joindelayy")



        // var start;
        // var end;
        //
        // if ((start = new Date(getstartTime) >= new Date()) && (end = new Date("2022-07-02T18:20:00.000Z") >= new Date())) {
        //     if (start === true && end === true) {
        //         console.warn("I am inside")
        //         setDisable(false)
        //     }
        // }
        // if (new Date(getstartTime).toISOString().slice(0, -1) <= new Date().toISOString().slice(0, -1) && new Date(getendTime).toISOString().slice(0, -1) <= new Date().toISOString().slice(0, -1)) {
        //     setDisable(true)
        // }
        // else {
        //     setDisable(false)
        // }

        // if (new Date(getstartTime).toLocaleTimeString() <= new Date().toLocaleTimeString()) {
        //     if (new Date(getendTime).toLocaleTimeString() <= new Date().toLocaleTimeString()) {
        //         setDisable(true)
        //     }
        //     else {
        //     }
        // }
        // else {
        //     setDisable(false)
        // }


        //
        // if (new Date(getstartTime) <= new Date()) {
        //     setDisable1(true)
        // } else {
        //     setDisable1(false)
        // }
    }

    // console.warn(enableStartExam, "Enablle");
    // console.warn(unregisterDisableExam, "unregister")

    // console.warn("$$$$$$$$$$$$",date)
    // console.warn("ExamStartTime", getstartTime, "ExamEndTime", getendTime);

    const getQuestionSubCategory = async () => {
        let result = await fetch(`https://zlasvmkyg1.execute-api.ap-south-1.amazonaws.com/dev/schedules/subcategory/${examUUID}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });

        result = await result.json();
        setgetPrimarySubcategory(result.payload.response)
    }

    function closeModal() {
        setShowModal(false);
        setPrimarySubcategory("");
        setsecondarySubcategory("");
    }

    const onSubmit = () => {
        registerAPI();
        closeModal();
    };


    const register = () => {
        if (isPrimary) {
            setCurrentTime(moment().utcOffset('+05:30').format('YYYY-MM-DD hh:mm:ss a'));
            setShowModal(true);
            getQuestionSubCategory();
        } else {
            registerAPI();
            // setCurrentTime(moment().utcOffset('+05:30').format('YYYY-MM-DD hh:mm:ss a'));
        }

    }
    // console.warn(currentTime)

    const registerAPI = async () => {
        const catdata = await fetch(`https://zlasvmkyg1.execute-api.ap-south-1.amazonaws.com/dev/schedules/${params.uuid}/join`, {
            method: "POST",
            body: JSON.stringify({ examUUID: exam.uuid, primarySubcategory, secondarySubcategory, currentTime }),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(catdata => {
                getExam();
                if (catdata.status === 200) {
                    setScheduled(true)
                    // notify();
                    setShowSuccess(true)
                    return (catdata.json());
                } else {
                    // notify();
                    setShow(true)
                    return (catdata.json());
                    // throw new Error(catdata);
                }
            })
            .then(catdata => {
                setErrorMessage(catdata.message)
            })
        // setErrorMessage(catdata.message)
    };

    // console.warn(errorMessage, "************")

    const unregister = async () => {
        if (window.confirm("Are you sure you want to unregister!") === true) {
            let result = await fetch(`https://zlasvmkyg1.execute-api.ap-south-1.amazonaws.com/dev/schedules/${exam.schedule[0].studentExam.uuid}/disjoin`, {
                method: "Delete",
                // body: JSON.stringify({ examUUID:exam.uuid}),
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(result => {
                    if (result.status === 200) {
                        setShowSuccess(true)
                        setScheduled(false)
                        return (result.json());
                    } else {
                        setShow(true)
                        // notify();
                        return (result.json());
                    }
                })
                .then(result => {
                    setErrorMessage(result.message)
                })
        }
    }

    const startExamcheck = async () => {
        setStartExamDisable(true)
        setShowLoaderShow(true)
        setTimeout(() => {
            setStartExamDisable(false);
            setShowLoaderShow(false);
        }, 5000);
        setCurrentTime(moment().utcOffset('+05:30').format('YYYY-MM-DD hh:mm:ss a'))
        let result = await fetch(`https://zlasvmkyg1.execute-api.ap-south-1.amazonaws.com/dev/schedules/${exam.schedule[0].studentExam.uuid}/start/Exam/student`, {
            method: "PUT",
            body: JSON.stringify({ examUUID: exam.uuid, examScheduleUUID, currentTime }),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(result => {
                if (result.status === 200) {
                    navigate("/Quiz/" + exam.uuid + "/" + examParticipantUUID + "/" + examScheduleUUID)
                    return (result.json());
                } else {
                    setShow(true)
                    // notify();
                    return (result.json());
                }
            })
            .then(result => {
                setErrorMessage(result.message)
            })
    }

    if (show === true) {
        setTimeout(() => setShow(false), 5000);
    }
    if (showSuccess === true) {
        setTimeout(() => setShowSuccess(false), 5000);
    }


    //TimeFormat Code Start
    const formatAMPM = (date) => {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    };

    const getDateTime = (dateString) => {
        if (!dateString) {
            return;
        }
        const d = dateString;
        const date = new Date(d);
        return [
            date.getDate(),
            date.toLocaleString('default', { month: 'long' }),
            date.getFullYear()
        ].join(' ') +
            ', ' +
            formatAMPM(date);
    };

    const gateOnlyDate = (dateString) => {
        if (!dateString) {
            return;
        }
        const d = dateString;
        const date = new Date(d);
        return [
            date.getDate(),
            date.toLocaleString('default', { month: 'long' }),
            date.getFullYear()
        ].join(' ')
    }
    // console.warn(gateOnlyDate(startTime), "getsnew Date");
    //Time Format Code End
    // setCurrentTime();
    // setCurrentTime(date);

    // console.warn(currentTime)

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
                                        <h4 className="mb-sm-0">Register exam</h4>
                                        {/* <ToastContainer /> */}
                                        {/* <Alert variant="success"  dismissible >
                                            <Alert.Heading>Ooops! an error occured!</Alert.Heading>
                                            <p>
                                                Update your setting and run again</p>
                                        </Alert> */}


                                        <div className="page-title-right">
                                            <ol className="breadcrumb m-0">
                                                <Link to="/Exam" className="breadcrumb-item">Exam</Link>
                                                <li className="breadcrumb-item active">Register exam</li>
                                            </ol>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {
                                show &&
                                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                    <strong className="text-danger">{errorMessage}</strong>
                                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setShow(false)}></button>
                                </div>
                            }
                            {
                                showSuccess &&
                                <div className="alert alert-success alert-dismissible fade show" role="alert">
                                    <strong className="text-success">{errorMessage}</strong>
                                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setShowSuccess(false)}></button>
                                </div>
                            }
                            {
                                loading ?
                                    (
                                        <div
                                            className="row h-100"
                                            style={{ paddingBottom: "11%" }}
                                        >
                                            <div className="col-sm-12 my-auto">
                                                <img
                                                    src={loader}
                                                    alt={"loader"}
                                                    className={"mx-auto d-block"}
                                                />
                                            </div>
                                        </div>
                                    )
                                    :
                                    (
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="card">
                                                    <div className="card-body">
                                                        <div className="row">
                                                            <div className="col-md-7">
                                                                <div className="card cards">
                                                                    <img className="viewTournament" src={url || ''} alt="Banner" />
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-5">
                                                                {/* <p className="mb-0"><b>Exam Details</b></p> */}

                                                                <div className="row">
                                                                    <div className="col-sm-12">
                                                                        <h6 className='mb-0'><b>Title</b></h6>
                                                                        <p>{title}</p>
                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-sm-6">
                                                                        <h6 className='mb-0'><b>Exam id</b></h6>
                                                                        <p>{identifier}</p>
                                                                    </div>
                                                                    <div className="col-sm-6">
                                                                        <h6 className='mb-0'><b>Total Questions</b></h6>
                                                                        <p><span className='badge bg-danger'>{totalQuestions}</span></p>
                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-sm-6">
                                                                        <h6 className='mb-0'><b>Start time</b></h6>
                                                                        {
                                                                            examTime === "FULL_DAY" ?
                                                                                <p>
                                                                                    {gateOnlyDate(startTime)}
                                                                                </p>
                                                                                :
                                                                                <p>{getDateTime(startTime)}</p>
                                                                        }

                                                                    </div>
                                                                    <div className="col-sm-6">
                                                                        <h6 className='mb-0'><b>Total winning prize</b></h6>
                                                                        <p><span className='badge bg-warning'>{totalWinningPrize}</span></p>
                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-sm-6">
                                                                        <h6 className='mb-0'><b>Student limit</b></h6>
                                                                        <p><span className='badge bg-danger'>{studentLimit}</span></p>
                                                                    </div>
                                                                    <div className="col-sm-6">
                                                                        <h6 className='mb-0'><b>Joining fees</b></h6>
                                                                        <p><span className='badge bg-primary'>{joiningFee}</span></p>
                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-sm-6">
                                                                        <h6 className='mb-0'><b>Join Delay</b></h6>
                                                                        <p><span className='badge bg-danger'>{joinDelay}</span></p>
                                                                    </div>
                                                                    {
                                                                        examTime === "FULL_DAY" ?
                                                                            <div className="col-sm-6">
                                                                                <h6 className='mb-0'><b>Exam Type</b></h6>
                                                                                <p><span className='badge bg-danger'>{examTime}</span></p>
                                                                            </div>
                                                                            :
                                                                            <div></div>
                                                                    }

                                                                </div>

                                                                {/* <h5><span>{title}</span></h5>
                                                                <p className='mt-1 mb-0'><b>Exam ID:</b> {identifier}</p>
                                                                <p className='mb-0'><b>Starts on:</b>{getDateTime(startTime)}</p>
                                                                <p className='mb-0'><b>Total Questions:</b> {totalQuestions}</p>
                                                                <p className='mb-0'><b>Total Winning:</b> {totalWinningPrize}</p>
                                                                <p className='mb-0'><b>Total Seats:</b> {studentLimit}</p>
                                                                <p className='mb-0'><b>Joining fee:</b> Free</p>
                                                                <p className="mb-0"><b>Description:</b> {description}</p> */}
                                                            </div>
                                                        </div>

                                                        {/* <div className="col-sm-6">
                                                            <p className="mb-0"><b>Exam Details</b></p>
                                                            <div className="card">
                                                                <div className="card-body">
                                                                    <h5><span>{title}</span></h5>
                                                                    <p className='mt-1 mb-0'><b>Exam ID:</b> {identifier}</p>
                                                                    <p className='mb-0'><b>Starts on:</b>{getDateTime(startTime)}</p>
                                                                    <p className='mb-0'><b>Total Questions:</b> {totalQuestions}</p>
                                                                    <p className='mb-0'><b>Total Winning:</b> {totalWinningPrize}</p>
                                                                    <p className='mb-0'><b>Total Seats:</b> {studentLimit}</p>
                                                                    <p className='mb-0'><b>Joining fee:</b> Free</p>
                                                                    <p className="mb-0"><b>Description:</b> {description}</p>
                                                                </div>
                                                            </div>
                                                        </div> */}
                                                        {
                                                            description &&
                                                            <div className="row">
                                                                <div className="col-sm-12">
                                                                    <h6 className='mb-0'><b>Description</b></h6>
                                                                    <p>{description}</p>
                                                                </div>
                                                            </div>
                                                        }


                                                        {
                                                            examRankingFactor[0] &&
                                                            <div className="row">
                                                                <div className="col-sm-12">
                                                                    <p className=""><b>Ranking Factor</b></p>
                                                                    <div className="table-responsive">
                                                                        <table className="table table-centered datatable dt-responsive nowrap" style={{ borderCollapse: 'collapse', borderSpacing: 0, width: '100%' }}>
                                                                            <thead className="thead-light">

                                                                                <tr>
                                                                                    <th><b>Title</b></th>
                                                                                    {/* <th><b>Type</b></th> */}
                                                                                    <th><b>Time</b></th>
                                                                                    <th><b>Points</b></th>
                                                                                </tr>

                                                                            </thead>

                                                                            <tbody>
                                                                                {
                                                                                    examRankingFactor.map((item) =>
                                                                                        <tr>
                                                                                            <td>{item.title}</td>
                                                                                            {/* <td>{item.type}</td> */}
                                                                                            <td>{item.time}</td>
                                                                                            <td>{item.points}</td>
                                                                                        </tr>
                                                                                    )
                                                                                }
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        }


                                                        {/* <div className="card">
                                                            <div className="card-body">
                                                                <span className='mb-0'><b>Ranking factor:</b></span>
                                                                <div className="option-section-1 mt-0">
                                                                    {
                                                                        examRankingFactor.map((item) =>
                                                                            <div className="row prize">
                                                                                <div className="col-sm">
                                                                                    <h6><b>Title</b></h6>
                                                                                    <p>{item.title}</p>
                                                                                </div>
                                                                                <div className="col-sm">
                                                                                    <h6><b>Type</b></h6>
                                                                                    <p>{item.type}</p>
                                                                                </div>
                                                                                <div className="col-sm">
                                                                                    <h6><b>Time</b></h6>
                                                                                    <p>{item.time}</p>
                                                                                </div>
                                                                                <div className="col-sm">
                                                                                    <h6><b>Points</b></h6>
                                                                                    <p>{item.points}</p>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div> */}


                                                        <Modal
                                                            isOpen={isPrimary && showModal}

                                                            style={{
                                                                content: {
                                                                    top: '50%',
                                                                    left: '50%',
                                                                    right: 'auto',
                                                                    bottom: 'auto',
                                                                    marginRight: '-50%',
                                                                    height: '310px',
                                                                    width: '500px',
                                                                    transform: 'translate(-50%, -50%)'
                                                                }
                                                            }}
                                                        >
                                                            <div className="col-sm-12 coloseButton">
                                                                <div className="col-sm-4"></div>
                                                                <div className="col-sm-4"></div>
                                                                <div className="col-sm-3"></div>
                                                                <div className="col-sm-1">
                                                                    <span onClick={closeModal} className="closeBtn">X</span>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-12 mb-3">
                                                                <p className="mb-0"><b>Demo Text:</b></p>
                                                                <span>Once again you selected your exam, you will have to assign a primary and secondary subject for your exam.The Primary will give you 2x points for every correct answer you give.The secondary will give you 1.5x points scored by you in the given exam </span>
                                                            </div>
                                                            <div className="row d-flex flex-row justify-content-center align-items-center">
                                                                <div className="col-sm-6">
                                                                    <p className="mb-0"><b>Primary</b></p>
                                                                    <select className="form-select form-select mb-2" aria-label="Default select example" onChange={(e) => setPrimarySubcategory(e.target.value)}>
                                                                        <option>Select primary</option>
                                                                        {
                                                                            getprimarySubcategory.map((item, key) => {
                                                                                if (item.label && item.uuid === secondarySubcategory)
                                                                                    return null
                                                                                return <option value={item.uuid}>{item.label}</option>
                                                                            }
                                                                            )
                                                                        }
                                                                    </select>
                                                                </div>
                                                                <div className="col-sm-6">
                                                                    <p className="mb-0"><b>Secondary</b></p>
                                                                    <select className="form-select form-select mb-2" aria-label="Default select example" onChange={(e) => setsecondarySubcategory(e.target.value)}>
                                                                        <option>Select secondary</option>
                                                                        {
                                                                            getprimarySubcategory.map((item, key) => {
                                                                                if (item.label && item.uuid === primarySubcategory)
                                                                                    return null
                                                                                return <option value={item.uuid}>{item.label}</option>
                                                                            }
                                                                            )
                                                                        }
                                                                    </select>
                                                                </div>
                                                                <div className="col text-center mt-2">
                                                                    <input type="button" className="btn btn-sm btn-success mt-2" value="Submit" onClick={onSubmit} /></div>
                                                            </div>
                                                        </Modal>

                                                        {/* {
                                                            <Popup
                                                                position="right bottom"
                                                                closeOnDocumentClick
                                                            >
                                                                <div className="row d-flex flex-row justify-content-center align-items-center">
                                                                    <div className="col-sm-6">
                                                                        <p><b>Primary</b></p>
                                                                        <select className="form-select form-select mb-2" aria-label="Default select example" onChange={(e) => setPrimarySubcategory(e.target.value)}>
                                                                            <option>Select</option>
                                                                            {
                                                                                getprimarySubcategory.map((item, key) =>
                                                                                    <option value={item.uuid}>{item.label}</option>
                                                                                )
                                                                            }
                                                                        </select>
                                                                    </div>
                                                                    <div className="col-sm-6">
                                                                        <p><b>Secondary</b></p>
                                                                        <select className="form-select form-select mb-2" aria-label="Default select example" onChange={(e) => setsecondarySubcategory(e.target.value)}>
                                                                            <option>Select</option>
                                                                            {
                                                                                getprimarySubcategory.map((item, key) =>
                                                                                    <option value={item.uuid}>{item.label}</option>
                                                                                )
                                                                            }
                                                                        </select>
                                                                    </div>
                                                                    <div className="col text-center mt-2">
                                                                        <input type="button" className="btn btn-sm btn-success mt-2" value="Submit" /></div>
                                                                </div>
                                                            </Popup>
                                                        } */}


                                                        <div className="row mt-4">
                                                            <div className="col">
                                                                {
                                                                    isStudentAppeared === "APPEARED" || isStudentAppeared === "COMPLETED" ?
                                                                        <div>
                                                                            <p style={{ color: "red", fontSize: "15px", textAlign: "end", lineHeight: "2", fontWeight: "700" }}>You have alredy appeared the exam, please check the result</p>
                                                                        </div>
                                                                        :
                                                                        <>
                                                                            {
                                                                                scheduled ?
                                                                                    // <Link to={"/Quiz/" + exam.uuid + "/" + examParticipantUUID + "/" + examScheduleUUID} >
                                                                                    <button className="btn btn-outline-success savebtn3" onClick={() => startExamcheck()} disabled={startExamDisable}>
                                                                                        {showLoaderShow ?
                                                                                            (
                                                                                                <span className="spinner-border spinner-border-sm spinnerLoader mr-1" style={{ width: "0.9rem", height: "0.9rem" }} role="status" aria-hidden="true"></span>
                                                                                            )
                                                                                            :
                                                                                            (
                                                                                                ""
                                                                                            )
                                                                                        }
                                                                                        Start Exam
                                                                                    </button>
                                                                                    // </Link>
                                                                                    :
                                                                                    <></>
                                                                            }
                                                                            {
                                                                                scheduled ?
                                                                                    <button type="submit" className="btn btn-success savebtn3 me-1" onClick={() => unregister()}>
                                                                                        Unregister
                                                                                    </button>
                                                                                    :
                                                                                    <button type="submit" className="btn btn-success savebtn3 me-1" onClick={() => register()} >
                                                                                        Register
                                                                                    </button>
                                                                            }
                                                                        </>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                            }

                        </div>
                    </div>
                </section>
            </div >
            <SideNav />
            <Footer />
        </>
    )

}

export default Register2