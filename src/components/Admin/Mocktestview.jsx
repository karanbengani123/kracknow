import '../CssFile/Student.css';
import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import Header from './Header';
import Footer from './Footer';
import SideNav from './SideNav';
import Popup from 'reactjs-popup';
import Moment from 'react-moment';
import moment from "moment-timezone";
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import Environment from './Environment';



function Mocktestview() {
    const [formValues, setFormValues] = useState([{ type: "", titile: "", time: "", point: "" }])
    let handleChange = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
    }

    let addFormFields = () => {
        setFormValues([...formValues, { type: "", title: "", time: "", point: "" }])
    }

    let removeFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues);
        alert("Wants To Delete");
    }
    let handleSubmit = (event) => {
        event.preventDefault();
        alert(JSON.stringify(formValues));
    }
    const [show, setShow] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)
    const [errorMessage, setErrorMessage] = useState()

    const date = new Date();

    const [title, setTitle] = useState('')
    const [joinDelay, setJoinDelay] = useState('')
    const [getstartTime, setgetStartTime] = useState('')
    const [getendTime, setgetEndTime] = useState('')
    const [category, setCategory] = useState('')
    const [studentLimit, setStudentLimit] = useState('')
    const [marksperQuestion, setMarksperQuestion] = useState('')
    const [joiningFees, setJoiningFees] = useState('')
    const [status, setStatus] = useState('')
    const [isFeatured, setIsFeatured] = useState('')
    const [description, setDescription] = useState('')
    const [keywords, setKeywords] = useState([])
    const [profilePic, setProfilePic] = useState('')
    const [rankingFactor, setRankingFactor] = useState([])
    const [questions, setQuestions] = useState([])
    const [priceRatio, setPriceRatio] = useState([])

    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")
    const [minDate, setMinDate] = useState(new Date().toISOString().slice(0, 16))

    const [getStartTime, setGetStartTime] = useState();
    const [getEndTime, setGetEndTime] = useState([]);
    const [getJoined, setGetJoined] = useState();
    const [getExamDate, setGetExamDate] = useState([]);
    const [timeperQuestion, settimeperQuestion] = useState();

    const [showModal, setShowModal] = useState(false);
    const [showupdateModal, setShowUpdateModal] = useState(false);
    const [startTimeError, setStartTimeError] = useState("")
    const [endTimeError, setEndTimeError] = useState("")

    const [studentDetails, setStudentDetails] = useState([]);
    const [scheduleUUID, setScheduleUUID] = useState();
    const [studentUUID, setStudentUUID] = useState();

    const [examReviewDetail, setExamReviewDetail] = useState([])
    const [getDropDate, setGetDropDate] = useState([])

    const [getScheduleUUID, setGetScheduleUUID] = useState();
    const [examTime, setExamTime] = useState('')
    const [getExamTime, setGetExamTime] = useState('')

    const [takeUUID, setTakeUUID] = useState("");


    const params = useParams()
    const notify = () => toast("Successfully Created");

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
    //Time Format Code End

    //Timezone Code Start//
    const timeZone = moment.tz.guess()
    // console.warn(timezone);
    //TimeZone code End//

    useEffect(() => {
        viewExamDetails();
        getScheduleExamDetails();
        getReviewExamDetails();
        getReviewExamStudentDetails();
    }, []);

    const viewExamDetails = async () => {
        // console.warn(params);

        let result = await fetch(`${Environment.server_url}/exams/${params.uuid}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
        result = await result.json();
        // console.warn("view", result.payload.response)

        setTitle(result.payload.response.title)
        setgetStartTime(result.payload.response.startTime)
        setgetEndTime(result.payload.response.endTime)
        setCategory(result.payload.response.category)
        setStudentLimit(result.payload.response.studentLimit)
        setMarksperQuestion(result.payload.response.marksperQuestion)
        setJoiningFees(result.payload.response.joiningFees)
        setStatus(result.payload.response.status)
        setIsFeatured(result.payload.response.isFeatured)
        setDescription(result.payload.response.description)
        setKeywords(result.payload.response.keywords)
        setProfilePic(result.payload.response.banner)
        setRankingFactor(result.payload.response.rankingFactor)
        setQuestions(result.payload.response.questions)
        setPriceRatio(result.payload.response.priceRatio)
        settimeperQuestion(result.payload.response.timePerQuestion)
        setJoinDelay(result.payload.response.joinDelay)
    }

    // /exams/schedule/{examUUID}


    const schedule = () => {
        setShowModal(true)
        setStartTime("");
        setExamTime("");
        setEndTime("");
    }

    const updateschedule = (startTime, endTime, examTime, uuid) => {
        setStartTime(startTime);
        setEndTime(endTime);
        setExamTime(examTime);
        setTakeUUID(uuid);
        setShowUpdateModal(true)
    }


    function closeModal() {
        setShowModal(false);
        getScheduleExamDetails();
        viewExamDetails();
    }

    function closeupdateModal() {
        setShowUpdateModal(false);
        getScheduleExamDetails();
    }

    const onSubmit = () => {
        // closeModal();
    };
    // console.warn(getstartTime, "Getstarttime")

    const ScheduleExam = async () => {
        // console.warn(params);
        if (startTime === '') {
            document.getElementsByClassName('starttimeError')[0].innerText = "This field is required"
        }
        else {
            document.getElementsByClassName('starttimeError')[0].innerText = ""
        }
        if (endTime === '') {
            document.getElementsByClassName('endtimeError')[0].innerText = "This field is required"
        }
        else {
            document.getElementsByClassName('endtimeError')[0].innerText = ""
        }
        if (examTime === '') {
            document.getElementsByClassName('examtimeError')[0].innerText = "This field is required"
        }
        else {
            document.getElementsByClassName('examtimeError')[0].innerText = ""
        }


        let result = await fetch(`${Environment.server_url}/exams/schedule/${params.uuid}`,
            {
                method: "POST",
                body: JSON.stringify({ startTime, endTime, examTime, timeZone, type: "MOCK_TEST" }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            })
            // result = await result.json();
            .then(catdata => {
                // console.warn(catdata)
                if (catdata.status === 200) {
                    closeModal();
                    // notify();
                    setShowSuccess(true);
                    return catdata.json();
                } else {
                    setShow(true)
                    return catdata.json();
                }
                // if (Response.catdata = 200) {
                //     return catdata.json();

                // } else {
                //     throw new Error(catdata);
                // }
            })
            .then(catdata => {
                setErrorMessage(catdata.message)
            })

        // console.warn("view", result.payload.response)

        // if (startTime === ! "" && endTime === ! "") {

        // } else {
        //     setStartTimeError(result.payload.startTime.message)
        //     setEndTimeError(result.payload.endTime.message)
        // }
    }

    const onChangeStartDate = (date) => {
        const minDate = new Date(date).toISOString().slice(0, 16);
        setMinDate(minDate);
    }

    const starttimeSelected = () => {
        document.getElementsByClassName('starttimeError')[0].innerText = ""
    }
    const endtimeSelected = () => {
        document.getElementsByClassName('endtimeError')[0].innerText = ""
    }
    const examtimeSelected = () => {
        document.getElementsByClassName('examtimeError')[0].innerText = ""
    }

    const getScheduleExamDetails = async () => {
        // console.warn(params);

        let result = await fetch(`${Environment.server_url}/exams/allSchedule/${params.uuid}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
        result = await result.json();
        setGetEndTime(result.payload);
        setGetExamDate(result.payload[0].identifier)
        {
            getEndTime.map((item, key) =>
                item.schedule.map((obj) =>
                    setGetExamTime(obj.examTime)
                ))
        }
    }
    // console.warn("Repopulate ExamList#################", getExamTime)


    const UpdateScheduleExam = async (uuid) => {
        // console.warn(params);
        if (startTime === '') {
            document.getElementsByClassName('starttimeError')[0].innerText = "This field is required"
        }
        else {
            document.getElementsByClassName('starttimeError')[0].innerText = ""
        }
        if (endTime === '') {
            document.getElementsByClassName('endtimeError')[0].innerText = "This field is required"
        }
        else {
            document.getElementsByClassName('endtimeError')[0].innerText = ""
        }
        if (examTime === '') {
            document.getElementsByClassName('examtimeError')[0].innerText = "This field is required"
        }
        else {
            document.getElementsByClassName('examtimeError')[0].innerText = ""
        }

        let result = await fetch(`${Environment.server_url}/exams/schedule/${uuid}`,
            {
                method: "PUT",
                body: JSON.stringify({ startTime: moment(startTime), endTime: moment(endTime), examTime }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            })
            .then(catdata => {
                // console.warn(catdata)
                if (catdata.status === 200) {
                    closeupdateModal();
                    // notify();
                    setShowSuccess(true)
                    return catdata.json();
                } else {
                    setShow(true)
                    return catdata.json()
                }

                // if (Response.catdata = 200) {
                //     return catdata.json();

                // } else {
                //     throw new Error(catdata);
                // }
            })
            .then(catdata => {
                setErrorMessage(catdata.message)
            })
        // result = await result.json();
        // if (startTime === !"" && endTime === !"") {
        //     closeupdateModal();
        // } else {
        //     setStartTimeError(result.payload.startTime.message)
        //     setEndTimeError(result.payload.endTime.message)
        // }
    }

    //Student Exam Get Date Dropdown..........
    const getReviewExamDetails = async () => {
        let result = await fetch(`${Environment.server_url}/exams/all/schedule/${params.uuid}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
        result = await result.json();
        setExamReviewDetail(result.payload)
    }

    //Studetn Exam Completion Table List........
    const getReviewExamStudentDetails = async () => {
        let result = await fetch(`${Environment.server_url}/exams/attended/students/${getScheduleUUID}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
        result = await result.json();
        setStudentDetails(result.payload.response);
        result.payload.response.map((item) =>
            <>
                <span>{setStudentUUID(item.studentUUID)}</span>
                <span>{setScheduleUUID(item.scheduleUUID)}</span>
            </>
        )
    }
    // const disableFutureDate = () => {
    //     const today = new Date();
    //     const mm = String(today.getMonth() + 1).padStart(2, "0");
    //     const yyyy = today.getFullYear();
    //     return yyyy + "-" + mm;
    // };
    // var max = new Date().toISOString().slice(0, 16);
    // today = document.getElementsByName("time")[0].min;
    // console.log(today, "***************")
    // console.warn("$$$$$$$$$", studentUUID, "%%%%%%", scheduleUUID)

    if (show === true) {
        setTimeout(() => setShow(false), 4000);
    }
    if (showSuccess === true) {
        setTimeout(() => setShowSuccess(false), 4000);
    }

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
                                        <h4 className="mb-sm-0">Mocktest View</h4>
                                        {/* <ToastContainer /> */}
                                        <div className="page-title-right">
                                            <ol className="breadcrumb m-0">
                                                <Link to="/Mocktest" className="breadcrumb-item">Moctest</Link>
                                                <li className="breadcrumb-item active">Mocktest View</li>
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
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-sm-4">

                                                </div>
                                                <form className="col-sm-8">
                                                    <div className="text-sm-end">
                                                        <button type="button" className="btn btn-success filterbtn" onClick={() => schedule()}>Schedule</button>
                                                        <Modal
                                                            isOpen={showModal}
                                                            style={{
                                                                content: {
                                                                    top: '50%',
                                                                    left: '50%',
                                                                    right: 'auto',
                                                                    bottom: 'auto',
                                                                    marginRight: '-50%',
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

                                                            <div className="row mb-3">
                                                                <div className="col-sm-6">
                                                                    <p className='mb-0'><b>Mocktest Time</b><span className="required text-danger">*</span></p>
                                                                    <select onChange={(e) => { setExamTime(e.target.value); examtimeSelected() }}>
                                                                        <option value={""}>Select</option>
                                                                        <option value={"FULL_DAY"}>FULL_DAY</option>
                                                                        <option value={"BASED_ON_TIME"}>BASED_ON_TIME</option>
                                                                    </select>
                                                                    {/* {<div><p className='ErrorMessage'>{examTime === '' ? (examTimeErr) : ('')}</p></div>} */}
                                                                    <div><p className="examtimeError" style={{ color: "red", fontWeight: 'bold' }}></p></div>
                                                                </div>
                                                            </div>

                                                            <div className="row d-flex flex-row justify-content-center align-items-center">
                                                                {
                                                                    examTime === "FULL_DAY" ?
                                                                        <>
                                                                            <div className="col-sm-6">
                                                                                <p className='mb-0'><b>Start Time</b><span className="required text-danger">*</span></p>
                                                                                <input type="date"
                                                                                    placeholder="YYYY-MM-DD"
                                                                                    min={minDate}
                                                                                    name="time"
                                                                                    className="form-control timezone"
                                                                                    onChange={(e) => { setStartTime(moment((e.target.value)).set({ hour: 0, minute: 0 }).format('YYYY-MM-DD HH:mm')); starttimeSelected(); onChangeStartDate(e.target.value) }}
                                                                                />
                                                                                <div><p className="starttimeError" style={{ color: "red", fontWeight: 'bold' }}></p></div>
                                                                            </div>

                                                                            <div className="col-sm-6">
                                                                                <p className='mb-0'><b>End Time</b><span className="required text-danger">*</span></p>
                                                                                <input type="date"
                                                                                    placeholder="YYYY-MM-DD"
                                                                                    min={minDate}
                                                                                    className="form-control"
                                                                                    onChange={(e) => { setEndTime(moment((e.target.value)).set({ hour: 23, minute: 59 }).format('YYYY-MM-DD HH:mm')); endtimeSelected() }}
                                                                                    disabled={!startTime}
                                                                                />
                                                                                <div>
                                                                                    <p className="endtimeError" style={{ color: "red", fontWeight: 'bold' }}></p>
                                                                                </div>
                                                                            </div>
                                                                        </>
                                                                        :
                                                                        <>
                                                                            <div className="col-sm-6">
                                                                                <p className='mb-0'><b>Start Time</b><span className="required text-danger">*</span></p>
                                                                                <input type="datetime-local"
                                                                                    placeholder="YYYY-MM-DD"
                                                                                    min={minDate}
                                                                                    name="time"
                                                                                    className="form-control timezone"
                                                                                    onChange={(e) => { setStartTime(moment((e.target.value)).format('YYYY-MM-DD HH:mm')); starttimeSelected(); onChangeStartDate(e.target.value) }}
                                                                                />
                                                                                <div><p className="starttimeError" style={{ color: "red", fontWeight: 'bold' }}></p></div>
                                                                            </div>

                                                                            <div className="col-sm-6">
                                                                                <p className='mb-0'><b>End Time</b><span className="required text-danger">*</span></p>
                                                                                <input type="datetime-local"
                                                                                    placeholder="YYYY-MM-DD"
                                                                                    min={minDate}
                                                                                    className="form-control"
                                                                                    onChange={(e) => { setEndTime(moment((e.target.value)).format('YYYY-MM-DD HH:mm')); endtimeSelected() }}
                                                                                    disabled={!startTime}
                                                                                />
                                                                                <div>
                                                                                    <p className="endtimeError" style={{ color: "red", fontWeight: 'bold' }}></p>
                                                                                </div>
                                                                            </div>
                                                                        </>
                                                                }
                                                                <div className="col text-center mt-2">
                                                                    <input type="button" className="btn btn-sm btn-success mt-2" onClick={() => ScheduleExam()} value="Submit" /></div>
                                                            </div>
                                                        </Modal>
                                                        {/* <Popup trigger={<button type="button" className="btn btn-success filterbtn">Schdeule</button>}
                                                            position="left top"
                                                            closeOnDocumentClick
                                                        >
                                                            <div className="row d-flex flex-row justify-content-center align-items-center">
                                                                <div className="col-sm-6">
                                                                    <p><b>Start Time</b></p>
                                                                    <input type="datetime-local" placeholder="YYYY-MM-DD" name="time" className="form-control" onChange={(e) => { setStartTime(e.target.value) }} />
                                                                </div>
                                                                <div className="col-sm-6">
                                                                    <p><b>End Time</b></p>
                                                                    <input type="datetime-local" placeholder="YYYY-MM-DD" name="time" className="form-control" onChange={(e) => { setEndTime(e.target.value) }} />
                                                                </div>

                                                                <div className="col text-center mt-2">
                                                                    <input type="button" className="btn btn-sm btn-success mt-2" onClick={() => ScheduleExam()} value="Submit" /></div>
                                                            </div>
                                                        </Popup> */}
                                                    </div>
                                                </form>

                                                {/* <div className="col-sm-1">
                                                    <div className="text-sm-end">
                                                        <Link to="" button type="button" className="btn mb-2  btn btn-success">Edit</Link>
                                                    </div>
                                                </div> */}
                                            </div>

                                            <div className="row">
                                                <div className="col-sm-7 ">
                                                    <div className="card cards examimage">
                                                        <img src={profilePic || 'Placeholder.jpg'} alt="" className='sizeofbanner' />
                                                    </div>
                                                </div>
                                                <div className="col-sm-5">
                                                    <div className="row">
                                                        <div className="col-sm">
                                                            <h6 className='mb-0'><b>Title</b></h6>
                                                            <p>{title}</p>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-sm-6">
                                                            <h6><b>Start Time</b></h6>

                                                            {
                                                                getstartTime === null ?
                                                                    <p>Unscheduled</p>
                                                                    :
                                                                    <p>
                                                                        {getDateTime(getstartTime)}
                                                                    </p>
                                                            }


                                                        </div>
                                                        <div className="col-sm-6">
                                                            <h6><b>End Time</b></h6>
                                                            {
                                                                getstartTime === null ?
                                                                    <p>Unscheduled</p>
                                                                    :
                                                                    <p>
                                                                        {getDateTime(getendTime)}
                                                                    </p>
                                                            }
                                                            {/* <p>{getendTime}</p> */}
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-sm-6">
                                                            <h6><b>Category</b></h6>
                                                            <p><span className='badge bg-primary'>{category}</span></p>
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <h6><b>Student Limit</b></h6>
                                                            <p><span className='badge bg-danger'>{studentLimit}</span></p>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-sm-6">
                                                            <h6><b>Marks Per Question</b></h6>
                                                            <p><span className='badge bg-warning'>{marksperQuestion}</span></p>
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <h6><b>Joining Fees</b></h6>
                                                            <p><span className='badge bg-primary'>{joiningFees}</span></p>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-sm-6">
                                                            <h6><b>Time Limit</b></h6>
                                                            <p><span className='badge bg-primary'>{timeperQuestion} seconds</span></p>
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <h6><b>Status</b></h6>
                                                            <p><span className='badge bg-primary'>{status}</span></p>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-sm-6">
                                                            <h6><b>Is Featured Exam</b></h6>
                                                            <p><span >{isFeatured ? <span className="badge bg-success"> Yes </span> : <span className="badge bg-danger"> No </span>}</span></p>
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <h6><b>Mocktest Apt Keywords</b></h6>
                                                            <p>
                                                                {
                                                                    keywords.map(item =>
                                                                        <span className='badge bg-primary mr-1'>{item.attribute}</span>
                                                                    )
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-sm-6">
                                                            <h6><b>join Delay</b></h6>
                                                            <p><span className='badge bg-primary'>{joinDelay} seconds</span></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row mt-3 mb-2">
                                                <div className="col-sm">
                                                    <h6><b>Description</b></h6>
                                                    <p>{description}</p>
                                                </div>
                                            </div>
                                            <div className="row mt-3 mb-2">
                                                <p><b>Questions</b></p>
                                                <div className="table-responsive">
                                                    <table className="table table-bordered datatable dt-responsive nowrap" style={{ borderCollapse: 'collapse', borderSpacing: 0, width: '100%' }}>
                                                        <thead className="thead-light">
                                                            <tr>
                                                                <th><b>Questions</b></th>
                                                                <th><b>Options</b></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                questions.length > 0 ? questions.map((item, keys) =>
                                                                    <tr key={keys}>
                                                                        <td><span dangerouslySetInnerHTML={{ __html: item.title }}></span></td>
                                                                        <td>
                                                                            {
                                                                                item.options.map(opt => {
                                                                                    return opt.isCorrect ? <span className="badge bg-success me-1 mr-1">{opt.key}.{opt.text}</span>
                                                                                        :
                                                                                        <span className="badge bg-dark me-1 mr-1">{opt.key}.{opt.text}</span>
                                                                                }
                                                                                )
                                                                            }
                                                                        </td>
                                                                    </tr>
                                                                )
                                                                    :
                                                                    <tr>
                                                                        <td>No-Records_found</td>
                                                                        <td></td>
                                                                    </tr>
                                                            }
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>

                                            <div className="row mt-3 mb-2">
                                                <div className="col-sm-12">
                                                    <div className="row">
                                                        <p><b>Joined Or Submitted Students</b></p>
                                                        <div class="col-sm-4">
                                                            <div class="search-box me-2 mb-2 d-inline-block">
                                                                <div class="position-relative">
                                                                    <label for="search-bar-0" class="search-label"><span id="search-bar-0-label" class="sr-only">Search this table</span><input id="search-bar-0" type="text" aria-labelledby="search-bar-0-label" class="form-control" placeholder="Search" /></label>
                                                                    <i class="bx bx-search-alt search-icon">
                                                                    </i>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-4"></div>

                                                        <div className="col-sm-4">
                                                            <p><b>Scheduled Exam</b></p>
                                                            <select className="form-select form-select mb-2" aria-label="Default select example" onClick={getReviewExamStudentDetails} onChange={(e) => { setGetScheduleUUID(e.target.value) }}>
                                                                <option>Select</option>
                                                                {
                                                                    examReviewDetail.map((item) =>
                                                                        <option value={item.uuid} >{getDateTime(item.startTime)}</option>
                                                                    )
                                                                }
                                                            </select>
                                                        </div>

                                                    </div>
                                                    <div className="table-responsive">
                                                        <table className="table table-bordered datatable dt-responsive nowrap" style={{ borderCollapse: 'collapse', borderSpacing: 0, width: '100%' }}>
                                                            <thead className="thead-light">
                                                                <th>Student</th>
                                                                <th>Rank</th>
                                                                <th>Points</th>
                                                                <th>Mocktest Result</th>
                                                                <th>Action</th>
                                                            </thead>
                                                            <tbody>
                                                                {
                                                                    studentDetails.map((item, index) =>
                                                                        <tr>
                                                                            <td>{item.firstName}{item.lastName}</td>
                                                                            <td>{item.rank}</td>
                                                                            <td>{item.marks}</td>
                                                                            <td>
                                                                                <span className="badge bg-success mr-1">Correct answers:- <span>{item.correctAnswerCount}</span></span>
                                                                                <span className="badge bg-danger mr-1">Wrong Answers:- <span>{item.inCorrectAnswerCount}</span></span>
                                                                                <span className="badge bg-indigo mr-1">Skipped:- <span>{item.skipped}</span></span>
                                                                                <span className="badge bg-blue">Timeout:- <span>{item.timeOut}</span></span>
                                                                            </td>
                                                                            <td>
                                                                                <Link to={"/ExamReview/" + getScheduleUUID + "/" + item.studentUUID} className='badge bg-success ReviewBtn'>Review</Link>
                                                                            </td>
                                                                        </tr>)
                                                                }

                                                                {/* <tr>
                                                                    <td>Ramit Karmakar</td>
                                                                    <td></td>
                                                                    <td></td>
                                                                    <td>
                                                                        <span className="badge bg-dark mr-1">Skipped</span>
                                                                        <span className="badge bg-success mr-1">Timeout</span>
                                                                        <span className="badge bg-dark mr-1">Not Attempted</span>
                                                                        <span className="badge bg-dark mr-1">Wrong Answers</span>
                                                                        <span className="badge bg-dark">Correct Answers</span>
                                                                    </td>
                                                                    <td></td>
                                                                    <td>
                                                                        <Link to="/ExamReview" className='badge bg-success'>Review</Link>
                                                                    </td>
                                                                </tr> */}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row mt-3 mb-2">
                                                <div className="col-sm-12">
                                                    <div className="row">
                                                        <p><b>Winning Price</b></p>
                                                        <div className="table-responsive">
                                                            <table className="table table-bordered datatable dt-responsive nowrap" style={{ borderCollapse: 'collapse', borderSpacing: 0, width: '100%' }}>
                                                                <thead className="thead-light">
                                                                    <th>Rank</th>
                                                                    <th>Price</th>
                                                                </thead>
                                                                <tbody>
                                                                    {
                                                                        priceRatio.map((item) =>
                                                                            item.toValue <= 9 &&
                                                                            <tr>
                                                                                <td>{item.toValue}</td>
                                                                                <td>{item.amount}</td>
                                                                            </tr>
                                                                        )
                                                                    }
                                                                </tbody>
                                                            </table>
                                                            <table className="table table-bordered datatable dt-responsive nowrap" style={{ borderCollapse: 'collapse', borderSpacing: 0, width: '100%' }}>
                                                                <thead className="thead-light">
                                                                    <tr>
                                                                        <th>Rank from</th>
                                                                        <th>Rank to</th>
                                                                        <th>Price</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {
                                                                        priceRatio.map((item, key) =>
                                                                            item.toValue > 9 &&
                                                                            <tr key={key}>
                                                                                <td>{item.fromValue}</td>
                                                                                <td>{item.toValue}</td>
                                                                                <td>{item.amount}</td>
                                                                            </tr>
                                                                        )
                                                                    }
                                                                </tbody>
                                                            </table>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row mt-3 mb-2">
                                                <div className="col-sm-12">
                                                    <div className="row">
                                                        <p><b>Ranking Factor</b></p>
                                                        <div className="table-responsive">
                                                            <table className="table table-centered datatable dt-responsive nowrap" style={{ borderCollapse: 'collapse', borderSpacing: 0, width: '100%' }}>
                                                                <thead className="thead-light">
                                                                    <th>Type</th>
                                                                    <th>Title</th>
                                                                    <th>Time</th>
                                                                    <th>Points</th>
                                                                    <th>Rewards</th>
                                                                </thead>
                                                                <tbody>
                                                                    {
                                                                        rankingFactor.length > 0 ? rankingFactor.map((item, key) =>
                                                                            <tr key={key}>
                                                                                <td>{item.type}</td>
                                                                                <td>{item.title}</td>
                                                                                <td>{item.time}</td>
                                                                                <td>{item.points}</td>
                                                                                <td>{item.coins}</td>
                                                                            </tr>
                                                                        )
                                                                            :
                                                                            <tr>
                                                                                <td></td>
                                                                                <td></td>
                                                                                <td>No-Records-Found</td>
                                                                                <td></td>
                                                                                <td></td>
                                                                            </tr>
                                                                    }
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="table-responsive">
                                                <table className="table table-centered datatable dt-responsive nowrap" style={{ borderCollapse: 'collapse', borderSpacing: 0, width: '100%' }}>
                                                    <thead className="thead-light">
                                                        <th>Id</th>
                                                        <th>Mocktesttime</th>
                                                        <th>Start Date</th>
                                                        <th>End Date</th>
                                                        <th>Participant Count</th>
                                                        <th>Status</th>
                                                        <th>Action</th>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            getEndTime.map((item, key) =>
                                                                item.schedule.map((obj, key) =>
                                                                    <tr key={key}>
                                                                        <td>{item.identifier}</td>
                                                                        {
                                                                            obj.examTime === "FULL_DAY" ?
                                                                                <td>{(obj.examTime).replace((obj.examTime), "Full day")}</td>
                                                                                :
                                                                                <td>{(obj.examTime).replace((obj.examTime), "Time Based")}</td>
                                                                        }
                                                                        {
                                                                            obj.examTime === "FULL_DAY" ?
                                                                                <td>
                                                                                    {gateOnlyDate(obj.startTime)}
                                                                                </td>
                                                                                :
                                                                                <td>
                                                                                    {getDateTime(obj.startTime)}
                                                                                </td>
                                                                        }
                                                                        {
                                                                            obj.examTime === "FULL_DAY" ?
                                                                                <td>
                                                                                    {gateOnlyDate(obj.endTime)}
                                                                                </td>
                                                                                :
                                                                                <td>
                                                                                    {getDateTime(obj.endTime)}
                                                                                </td>
                                                                        }
                                                                        {/* <td>{getDateTime(obj.endTime)}</td> */}
                                                                        <td>{obj.joined}</td>
                                                                        <td>
                                                                            {item.status ? <span className="badge bg-success mr-1">Active</span> : <span className="badge bg-danger mr-1">In-active</span>}
                                                                        </td>
                                                                        <td>
                                                                            <span type="button" className="me-2 text-primary" data-bs-container="#tooltip-container1" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit" onClick={() => updateschedule(obj.startTime, obj.endTime, obj.examTime, obj.uuid)}><i className="mdi mdi-pencil font-size-18" /></span>
                                                                            {/* <button type="button" className="btn btn-success filterbtn" >Schdeule</button> */}
                                                                            {/* <Modal
                                                                                isOpen={showupdateModal}
                                                                                style={{
                                                                                    content: {
                                                                                        top: '50%',
                                                                                        left: '50%',
                                                                                        right: 'auto',
                                                                                        bottom: 'auto',
                                                                                        marginRight: '-50%',
                                                                                        transform: 'translate(-50%, -50%)'
                                                                                    }
                                                                                }}
                                                                            >
                                                                                <div className="col-sm-12 coloseButton">
                                                                                    <div className="col-sm-4"></div>
                                                                                    <div className="col-sm-4"></div>
                                                                                    <div className="col-sm-3"></div>
                                                                                    <div className="col-sm-1">
                                                                                        <span onClick={closeupdateModal} className="closeBtn">X</span>
                                                                                    </div>
                                                                                </div>

                                                                                <div className="row mb-3">
                                                                                    <div className="col-sm-6">
                                                                                        <p className='mb-0'><b>Mocktest Time</b><span className="required text-danger">*</span></p>
                                                                                        <select value={obj.examTime} onChange={(e) => { setExamTime(e.target.value); examtimeSelected() }}>
                                                                                            <option value={""}>Select</option>
                                                                                            <option value={"FULL_DAY"}>FULL_DAY</option>
                                                                                            <option value={"BASED_ON_TIME"}>BASED_ON_TIME</option>
                                                                                        </select>
                                                                                       
                                                                                        <div><p className="examtimeError" style={{ color: "red", fontWeight: 'bold' }}></p></div>
                                                                                    </div>
                                                                                </div>

                                                                                <div className="row d-flex flex-row justify-content-center align-items-center">
                                                                                    <div className="col-sm-6">
                                                                                        <p className='mb-0'><b>Start Time</b><span className="required text-danger">*</span></p>
                                                                                        <input type="datetime-local" placeholder="YYYY-MM-DD" min={minDate} className="form-control" value={moment(obj.startTime).local().format('YYYY-MM-DD hh:mm')} onChange={(e) => { setStartTime(moment((e.target.value)).format('YYYY-MM-DD HH:mm')); starttimeSelected() }} />
                                                                                        
                                                                                        <div><p className="starttimeError" style={{ color: "red", fontWeight: 'bold' }}></p></div>
                                                                                    </div>
                                                                                    <div className="col-sm-6">
                                                                                        <p className='mb-0'><b>End Time</b><span className="required text-danger">*</span></p>
                                                                                        <input type="datetime-local" placeholder="MM-DD-YYYY" min={minDate} className="form-control" value={moment.utc(obj.endTime).local().format('YYYY-MM-DD hh:mm')} onChange={(e) => { setEndTime(moment((e.target.value)).format('YYYY-MM-DD HH:mm')); endtimeSelected() }} />
                                                                                        <div><p className="endtimeError" style={{ color: "red", fontWeight: 'bold' }}></p></div>
                                                                                    </div>

                                                                                    <div className="col text-center mt-2">
                                                                                        <input type="button" className="btn btn-sm btn-success mt-2" onClick={() => UpdateScheduleExam(obj.uuid)} value="Submit" /></div>
                                                                                </div>
                                                                            </Modal> */}
                                                                            <Modal
                                                                                isOpen={showupdateModal}
                                                                                style={{
                                                                                    content: {
                                                                                        top: '50%',
                                                                                        left: '50%',
                                                                                        right: 'auto',
                                                                                        bottom: 'auto',
                                                                                        marginRight: '-50%',
                                                                                        transform: 'translate(-50%, -50%)'
                                                                                    }
                                                                                }}
                                                                            >
                                                                                <div className="col-sm-12 coloseButton">
                                                                                    <div className="col-sm-4"></div>
                                                                                    <div className="col-sm-4"></div>
                                                                                    <div className="col-sm-3"></div>
                                                                                    <div className="col-sm-1">
                                                                                        <span onClick={closeupdateModal} className="closeBtn">X</span>
                                                                                    </div>
                                                                                </div>


                                                                                <div className="row mb-3">
                                                                                    <div className="col-sm-6">
                                                                                        <p className='mb-0'><b>Exam Time</b><span className="required text-danger">*</span></p>
                                                                                        <select value={examTime} onChange={(e) => { setExamTime(e.target.value); examtimeSelected() }}>
                                                                                            <option value={""}>Select</option>
                                                                                            <option value={"FULL_DAY"}>FULL_DAY</option>
                                                                                            <option value={"BASED_ON_TIME"}>BASED_ON_TIME</option>
                                                                                        </select>
                                                                                        {/* {<div><p className='ErrorMessage'>{examTime === '' ? (examTimeErr) : ('')}</p></div>} */}
                                                                                        <div><p className="examtimeError" style={{ color: "red", fontWeight: 'bold' }}></p></div>
                                                                                    </div>
                                                                                </div>

                                                                                <div className="row d-flex flex-row justify-content-center align-items-center">
                                                                                    <div className="col-sm-6">
                                                                                        <p className='mb-0'><b>Start Time</b><span className="required text-danger">*</span></p>
                                                                                        <input type="datetime-local" placeholder="YYYY-MM-DD" min={minDate} className="form-control" value={moment(startTime).local().format('YYYY-MM-DD hh:mm')} onChange={(e) => { setStartTime(moment((e.target.value)).format('YYYY-MM-DD HH:mm')); starttimeSelected() }} />
                                                                                        {/* {<div className="text-danger">{startTimeError}</div>} */}
                                                                                        <div><p className="starttimeError" style={{ color: "red", fontWeight: 'bold' }}></p></div>
                                                                                    </div>
                                                                                    <div className="col-sm-6">
                                                                                        <p className='mb-0'><b>End Time</b><span className="required text-danger">*</span></p>
                                                                                        <input type="datetime-local" placeholder="MM-DD-YYYY" min={minDate} className="form-control" value={moment(endTime).local().format('YYYY-MM-DD hh:mm')} onChange={(e) => { setEndTime(moment((e.target.value)).format('YYYY-MM-DD HH:mm')); endtimeSelected() }} />
                                                                                        <div><p className="endtimeError" style={{ color: "red", fontWeight: 'bold' }}></p></div>
                                                                                    </div>

                                                                                    <div className="col text-center mt-2">
                                                                                        <input type="button" className="btn btn-sm btn-success mt-2"
                                                                                            onClick={() => UpdateScheduleExam(takeUUID)}
                                                                                            value="Submit" /></div>
                                                                                </div>
                                                                            </Modal>
                                                                            {/* <Popup trigger={<span type="button" className="me-2 text-primary" data-bs-container="#tooltip-container1" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit"><i className="mdi mdi-pencil font-size-18" /></span>}
                                                                                position="left bottom"
                                                                                closeOnDocumentClick
                                                                            >
                                                                                <div className="row d-flex flex-row justify-content-center align-items-center">
                                                                                    <div className="col-sm-6">
                                                                                        <p><b>Start Time</b></p>
                                                                                        <input type="datetime-local" placeholder="YYYY-MM-DD" name="time" value={moment.utc(obj.startTime).local().format('YYYY-MM-DDThh:mm')} onChange={(e) => { setStartTime(e.target.value) }} className="form-control" />
                                                                                    </div>
                                                                                    <div className="col-sm-6">
                                                                                        <p><b>End Time</b></p>
                                                                                        <input type="datetime-local" placeholder="YYYY-MM-DD" value={moment.utc(obj.endTime).local().format('YYYY-MM-DDThh:mm')} onChange={(e) => { setEndTime(e.target.value) }} name="time" className="form-control" />
                                                                                    </div>
                                                                                    <div className="col text-center mt-2">
                                                                                        <input type="button" className="btn btn-sm btn-success mt-2" value="Submit" onClick={() => UpdateScheduleExam(obj.uuid)} /></div>
                                                                                </div>
                                                                            </Popup> */}
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            )
                                                        }
                                                    </tbody>
                                                </table>
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
    );
}

export default Mocktestview