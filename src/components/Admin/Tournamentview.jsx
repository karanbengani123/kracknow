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



function Tournamentview() {
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
    const [tournamentExam, setTournamentExam] = useState([])
    const [priceRatio, setPriceRatio] = useState([])

    const [startTime, setStartTime] = useState("")
    const [startDate, setStartDate] = useState("")
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
    const [cityUUID, setCityUUID] = useState([])
    const [tournamentUUID, setTournamentUUID] = useState()
    const [getTournamentscheudleDetails, setgetTournamentscheudleDetails] = useState()

    const [examScheduleUUID, setExamScheduleUUID] = useState()
    const [examUUID, setExamUUID] = useState()
    const [tournamentSchedule, setTournamentExamSchedule] = useState([])

    const [exam, setExam] = useState([])
    const [scheduleExam, setScheduleExam] = useState([])
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
        getReviewExamStudentDetails();
        // getScheduleExamDetails();
        // getReviewExamDetails();
    }, []);

    const viewExamDetails = async () => {
        // console.warn(params);

        let result = await fetch(`${Environment.server_url}/tournaments/${params.uuid}`,
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
        setStudentLimit(result.payload.response.studentLimit)
        setJoiningFees(result.payload.response.joinFee)
        setIsFeatured(result.payload.response.isFeatured)
        setDescription(result.payload.response.description)
        setKeywords(result.payload.response.tournamentKeywords)
        setPriceRatio(result.payload.response.tournamentPrize)
        setCityUUID(result.payload.response.tournamentCities)
        setProfilePic(result.payload.response.webBanner)
        setTournamentExam(result.payload.response.tournamentExamSchedule)
        setRankingFactor(result.payload.response.tournamentRankingFactor)
        setCategory(result.payload.response.category.label)
        setMarksperQuestion(result.payload.response.marksPerQuestion)
        setJoinDelay(result.payload.response.joinDelay)
        settimeperQuestion(result.payload.response.timePerQuestion)
        setTournamentUUID(result.payload.response.uuid)

        setTournamentExamSchedule(result.payload.response.tournamentExamSchedule.map((data) => {
            return (
                setExamUUID(data.examUUID),
                setExamScheduleUUID(data.uuid)
            )
        }
        ))

        setExam(result.payload.response.tournamentExamSchedule.map((data) => {
            return {
                startTime: null,
                endTime: null,
                examTime: null,
                examUUID: data.examUUID,
                examScheduleUUID: data.uuid
            }
        }
        ))

    }



    const schedule = () => {
        setShowModal(true)
        setStartDate("");
        setStartTime("");
        setExamTime("");
        setEndTime("");
    }

    const updateschedule = (startTime, endTime, examTime, uuid) => {
        console.warn(examTime, startTime, endTime, uuid)
        // console.warn(getEndTime.filter(items => items.uuid === uuid)[0].tournamentSchedule_TournamentScheduledExam,"***Data***")
        setgetTournamentscheudleDetails(getEndTime.filter(items => items.uuid === uuid)[0].tournamentSchedule_TournamentScheduledExam)
        setStartTime(startTime);
        setEndTime(endTime);
        setExamTime(examTime);
        setTakeUUID(uuid);
        setShowUpdateModal(true)
    }
    // console.warn(getTournamentscheudleDetails,"Aste set the tournament schedule")


    function closeModal() {
        setShowModal(false);
        // getScheduleExamDetails();
        viewExamDetails();
        getReviewExamStudentDetails();
    }

    function closeupdateModal() {
        setShowUpdateModal(false);
        // getScheduleExamDetails();
        getReviewExamStudentDetails();
    }

    const onSubmit = () => {
        // closeModal();
    };
    // console.warn(getstartTime, "Getstarttime")

    const ScheduleExam = async () => {
        exam.map((item, index) => {
            if (item.startTime === null) {
                document.getElementsByClassName('starttimeError')[index].innerText = "This field is required"
            } else {
                document.getElementsByClassName('starttimeError')[index].innerText = ""
            }
            if (item.endTime === null) {
                document.getElementsByClassName('endtimeError')[index].innerText = "This field is required"
            } else {
                document.getElementsByClassName('endtimeError')[index].innerText = ""
            }
        })
        // if (startTime === '' && exam.map(item => item.startTime === null)) {
        //     document.getElementsByClassName('starttimeError')[0].innerText = "This field is required"
        // }
        // else {
        //     document.getElementsByClassName('starttimeError')[0].innerText = ""
        // }
        // if (endTime === '' && exam.map(item => item.endTime === null)) {
        //     document.getElementsByClassName('endtimeError')[1].innerText = "This field is required"
        // }
        // else {
        //     document.getElementsByClassName('endtimeError')[1].innerText = ""
        // }

        if (examTime === '') {
            document.getElementsByClassName('examtimeError')[0].innerText = "This field is required"
        }
        else {
            document.getElementsByClassName('examtimeError')[0].innerText = ""
        }

        let result = await fetch(`${Environment.server_url}/tournaments/schedule/${params.uuid}`,
            {
                method: "POST",
                body: JSON.stringify({
                    exam,
                    timeZone
                }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            })
            .then(catdata => {
                if (catdata.status === 200) {
                    closeModal();
                    setShowSuccess(true);
                    return catdata.json();
                } else {
                    setShow(true)
                    return catdata.json();
                }
            })
            .then(catdata => {
                setErrorMessage(catdata.message)
            })
    }

    const onChangeStartDate = (date) => {
        const minDate = new Date(date).toISOString().slice(0, 16);
        setMinDate(minDate);
    }

    const starttimeSelected = (index) => {
        document.getElementsByClassName('starttimeError')[index].innerText = ""
    }
    const endtimeSelected = (index) => {
        document.getElementsByClassName('endtimeError')[index].innerText = ""
    }
    const examtimeSelected = () => {
        document.getElementsByClassName('examtimeError')[0].innerText = ""
    }

    // const getScheduleExamDetails = async () => {

    //     let result = await fetch(`${Environment.server_url}/exams/allSchedule/${params.uuid}`,
    //         {
    //             method: "GET",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
    //             }
    //         });
    //     result = await result.json();
    //     setGetEndTime(result.payload);
    //     setGetExamDate(result.payload[0].identifier)
    //     {
    //         getEndTime.map((item, key) =>
    //             item.schedule.map((obj) =>
    //                 setGetExamTime(obj.examTime)
    //             ))
    //     }
    // }
    // console.warn("Repopulate ExamList#################", getExamTime)


    const UpdateScheduleExam = async (uuid) => {
        // if (startTime === '') {
        //     document.getElementsByClassName('starttimeError')[0].innerText = "This field is required"
        // }
        // else {
        //     document.getElementsByClassName('starttimeError')[0].innerText = ""
        // }
        // if (endTime === '') {
        //     document.getElementsByClassName('endtimeError')[0].innerText = "This field is required"
        // }
        // else {
        //     document.getElementsByClassName('endtimeError')[0].innerText = ""
        // }


        let result = await fetch(`${Environment.server_url}/tournaments/schedule/${uuid}`,
            {
                method: "PUT",
                body: JSON.stringify({
                    exam,
                    timeZone

                }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            })
            .then(catdata => {
                if (catdata.status === 200) {
                    closeupdateModal();
                    setShowSuccess(true)
                    return catdata.json();
                } else {
                    setShow(true)
                    return catdata.json()
                }
            })
            .then(catdata => {
                setErrorMessage(catdata.message)
            })
    }

    //Student Exam Get Date Dropdown..........
    // const getReviewExamDetails = async () => {
    //     let result = await fetch(`${Environment.server_url}/exams/all/schedule/${params.uuid}`,
    //         {
    //             method: "GET",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
    //             }
    //         });
    //     result = await result.json();
    //     setExamReviewDetail(result.payload)
    // }

    //Studetn Exam Completion Table List........
    const getReviewExamStudentDetails = async () => {
        let result = await fetch(`${Environment.server_url}/tournaments/scheduled/${params.uuid}/list`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
        result = await result.json();
        // setStudentDetails(result.payload.response);
        setGetEndTime(result.payload.response)
        setStatus(result.payload.response[0].status)

        result.payload.response.forEach((data) => {
            setScheduleExam(data.TournamentSchedule_TournamentScheduledExam.map(innerData => {
                return {
                    startTime: innerData.startTime,
                    endTime: innerData.endTime,
                    examTime: innerData.examTime,
                    examUUID: innerData.examUUID,
                    examScheduleUUID: innerData.tournamentExamScheduleUUID
                }
            })
            )
        }
        )
    }
    // console.warn("dataa", scheduleExam)

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
                                        <h4 className="mb-sm-0">Tournament View</h4>
                                        {/* <ToastContainer /> */}
                                        <div className="page-title-right">
                                            <ol className="breadcrumb m-0">
                                                <Link to="/Tournament" className="breadcrumb-item">Tournament</Link>
                                                <li className="breadcrumb-item active">Tournament View</li>
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
                                                        <button type="button" className="btn btn-success filterbtn"
                                                            onClick={() => schedule()}
                                                        >Schedule</button>
                                                        <Modal
                                                            isOpen={showModal}
                                                            style={{
                                                                content: {
                                                                    // top: '50%',
                                                                    // left: '50%',
                                                                    // right: 'auto',
                                                                    // bottom: 'auto',
                                                                    // marginRight: '-50%',
                                                                    // transform: 'translate(-50%, -50%)',
                                                                    // top: '50%',
                                                                    left: '50%',
                                                                    top: '50%',
                                                                    // right: 'auto',
                                                                    // bottom: 'auto',
                                                                    position: "absolute",
                                                                    backgroundColor: "#FFF",
                                                                    padding: "15px",
                                                                    zIndex: "1000",
                                                                    width: "50%",
                                                                    borderRadius: ".5em",
                                                                    transform: 'translate(-50%, -50%)',

                                                                    // zIndex: "1000",
                                                                    // position: "absolute",

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

                                                            <div className="row mb-2">
                                                                <div className="col-sm-4">
                                                                    <p className='mb-0'><b>Tournament Time</b><span className="required text-danger">*</span></p>
                                                                    <select className="form-control"
                                                                        onChange={(e) => {
                                                                            setExamTime(e.target.value);
                                                                            // examtimeSelected() 
                                                                            setExam(exam.map(o => {
                                                                                return { ...o, examTime: e.target.value }
                                                                            }))
                                                                            examtimeSelected();
                                                                        }}>
                                                                        <option value={""}>Select</option>
                                                                        <option value={"FULL_DAY"}>FULL_DAY</option>
                                                                        <option value={"BASED_ON_TIME"}>BASED_ON_TIME</option>
                                                                    </select>
                                                                    <div><p className="examtimeError" style={{ color: "red", fontWeight: 'bold' }}></p></div>
                                                                </div>
                                                                <div className='col-sm-4'>
                                                                    {
                                                                        examTime === "FULL_DAY" &&
                                                                        <>
                                                                            <p className='mb-0'><b>Select Date</b><span className="required text-danger">*</span></p>
                                                                            <input type="date"
                                                                                placeholder="YYYY-MM-DD"
                                                                                min={minDate}
                                                                                name="date"
                                                                                className="form-control"
                                                                                onChange={(e) => {
                                                                                    setStartDate(moment(e.target.value).set({ hour: 23, minute: 59 }).format('YYYY-MM-DD HH:mm'));
                                                                                    starttimeSelected()
                                                                                    // starttimeSelected();
                                                                                    // onChangeStartDate(e.target.value);
                                                                                    // console.log(setStartDate(moment((e.target.value)).format('YYYY-MM-DD')), "DATAEEEE")
                                                                                    // console.log(moment(e.target.value).set({ hour: 23, minute: 59 }).format('YYYY-MM-DD HH:mm'), "DATAEEEE")
                                                                                }} />

                                                                            <div>
                                                                                <p className="starttimeError" style={{ color: "red", fontWeight: 'bold' }}></p>
                                                                            </div>
                                                                        </>
                                                                    }
                                                                </div>
                                                                <div className='col-sm-4'></div>
                                                            </div>

                                                            <div className="row d-flex flex-row justify-content-center align-items-center">
                                                                {/* {
                                                                    examTime === "FULL_DAY" ?
                                                                        <>
                                                                            <div className="col-sm-6">
                                                                                <p className='mb-0'><b>Start Time</b><span className="required text-danger">*</span></p>
                                                                                <input type="date"
                                                                                    placeholder="YYYY-MM-DD"
                                                                                    min={minDate}
                                                                                    name="time"
                                                                                    className="form-control timezone"
                                                                                    onChange={(e) => {
                                                                                        setStartTime(moment((e.target.value)).set({ hour: 0, minute: 0 }).format('YYYY-MM-DD HH:mm'));
                                                                                        // starttimeSelected();
                                                                                        onChangeStartDate(e.target.value)
                                                                                    }}
                                                                                />
                                                                                <div><p className="starttimeError" style={{ color: "red", fontWeight: 'bold' }}></p></div>
                                                                            </div>

                                                                            <div className="col-sm-6">
                                                                                <p className='mb-0'><b>End Time</b><span className="required text-danger">*</span></p>
                                                                                <input type="date"
                                                                                    placeholder="YYYY-MM-DD"
                                                                                    min={minDate}
                                                                                    className="form-control"
                                                                                    onChange={(e) => {
                                                                                        setEndTime(moment((e.target.value)).set({ hour: 23, minute: 59 }).format('YYYY-MM-DD HH:mm'));
                                                                                        // endtimeSelected() 
                                                                                    }}
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
                                                                } */}
                                                                {/* <div className="col text-center mt-2">
                                                                    <input type="button" className="btn btn-sm btn-success mt-2" onClick={() => ScheduleExam()} value="Submit" />
                                                                </div> */}
                                                                <div className="table-responsive">
                                                                    <table className="table table-bordered datatable dt-responsive nowrap" style={{ borderCollapse: 'collapse', borderSpacing: 0, width: '100%' }}>
                                                                        <thead className="thead-light">
                                                                            <tr>
                                                                                <th>Sl.no</th>
                                                                                <th>Exam Title</th>
                                                                                <th>Action</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {
                                                                                tournamentExam.length > 0 ? tournamentExam.map((item, index) =>
                                                                                    <tr>
                                                                                        <td>{index + 1}</td>
                                                                                        {
                                                                                            item.tournamentExamDetails ?
                                                                                                <td>{item.tournamentExamDetails.title}</td>
                                                                                                :
                                                                                                <td>---</td>
                                                                                        }
                                                                                        <td>
                                                                                            {
                                                                                                examTime === "FULL_DAY" ?
                                                                                                    <>
                                                                                                        <div className='row'>
                                                                                                            <div className="col-sm-6">
                                                                                                                <p className='mb-0'><b>Start Time</b><span className="required text-danger">*</span></p>
                                                                                                                {/* <input type="time"
                                                                                                                    // placeholder="YYYY-MM-DD"
                                                                                                                    min={minDate}
                                                                                                                    // name="time"
                                                                                                                    // value='now'
                                                                                                                    className="form-control"
                                                                                                                    onChange={(e) => {
                                                                                                                        setEndTime(moment(setStartDate).set({ hour: 13, minute: 15 }).format('YYYY-MM-DD HH:mm'));
                                                                                                                        // starttimeSelected();
                                                                                                                        // onChangeStartDate(e.target.value)

                                                                                                                        console.log(moment(setStartDate).set({ hour: 13, minute: 15 }).format('YYYY-MM-DD HH:mm'), "time")
                                                                                                                    }}
                                                                                                                /> */}
                                                                                                                <input type="datetime-local"
                                                                                                                    placeholder="YYYY-MM-DD"
                                                                                                                    // min={minDate}
                                                                                                                    // min={startDate}
                                                                                                                    // max={startDate}
                                                                                                                    min={startDate}
                                                                                                                    max={startDate}
                                                                                                                    // value={startDate}
                                                                                                                    className="form-control"
                                                                                                                    disabled={!startDate}
                                                                                                                    onChange={(e) => {
                                                                                                                        // let selectedIndex = 0
                                                                                                                        // selectedIndex = index
                                                                                                                        setExam(exam.map((o, id) => {
                                                                                                                            if (id === index) {
                                                                                                                                o.startTime = moment((e.target.value)).format('YYYY-MM-DD HH:mm')
                                                                                                                                starttimeSelected(index)
                                                                                                                            }
                                                                                                                            return o
                                                                                                                        }))

                                                                                                                    }}
                                                                                                                // setStartTime(moment((e.target.value)).format('YYYY-MM-DD HH:mm')); starttimeSelected() }}
                                                                                                                // required
                                                                                                                />
                                                                                                                <div><p className="starttimeError" style={{ color: "red", fontWeight: 'bold' }}></p></div>
                                                                                                            </div>

                                                                                                            <div className="col-sm-6">
                                                                                                                <p className='mb-0'><b>End Time</b><span className="required text-danger">*</span></p>
                                                                                                                {/* <input type="time"
                                                                                                                    // placeholder="YYYY-MM-DD"
                                                                                                                    // min={minDate}
                                                                                                                    className="form-control"
                                                                                                                    onChange={(e) => {
                                                                                                                        setEndTime(moment((e.target.value)).set(setStartDate).format('HH:mm'));
                                                                                                                        // endtimeSelected() 
                                                                                                                    }}
                                                                                                                    disabled={!startTime}
                                                                                                                /> */}
                                                                                                                <input type="datetime-local"
                                                                                                                    placeholder="YYYY-MM-DD"
                                                                                                                    // min={minDate}
                                                                                                                    // min={startDate}
                                                                                                                    // max={startDate}
                                                                                                                    min={startDate}
                                                                                                                    max={startDate}
                                                                                                                    className="form-control"
                                                                                                                    // onChange={(e) => { setEndTime(moment((e.target.value)).format('YYYY-MM-DD HH:mm:ss')); endtimeSelected() }}
                                                                                                                    onChange={(e) => {
                                                                                                                        setExam(exam.map((o, id) => {
                                                                                                                            if (id === index) {
                                                                                                                                o.endTime = moment((e.target.value)).format('YYYY-MM-DD HH:mm')
                                                                                                                            }
                                                                                                                            return o
                                                                                                                        }))
                                                                                                                        endtimeSelected()
                                                                                                                    }}
                                                                                                                    disabled={!startDate}
                                                                                                                // required
                                                                                                                />
                                                                                                                <div>
                                                                                                                    <p className="endtimeError" style={{ color: "red", fontWeight: 'bold' }}></p>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </>
                                                                                                    :
                                                                                                    <>
                                                                                                        <div className='row'>
                                                                                                            <div className="col-sm-6">
                                                                                                                <p className='mb-0'><b>Start Time</b><span className="required text-danger">*</span></p>
                                                                                                                <input type="datetime-local"
                                                                                                                    placeholder="YYYY-MM-DD"
                                                                                                                    min={minDate}
                                                                                                                    name="time"
                                                                                                                    className="form-control timezone"
                                                                                                                    // onChange={(e) => { setStartTime(moment((e.target.value)).format('YYYY-MM-DD HH:mm')); starttimeSelected(); onChangeStartDate(e.target.value) }}
                                                                                                                    onChange={(e) => {
                                                                                                                        setExam(exam.map((o, id) => {
                                                                                                                            if (id === index) {
                                                                                                                                o.startTime = moment((e.target.value)).format('YYYY-MM-DD HH:mm')
                                                                                                                                starttimeSelected(index)
                                                                                                                            }
                                                                                                                            return o
                                                                                                                        }))
                                                                                                                    }}
                                                                                                                />
                                                                                                                <div><p className="starttimeError" style={{ color: "red", fontWeight: 'bold' }}></p></div>
                                                                                                            </div>

                                                                                                            <div className="col-sm-6">
                                                                                                                <p className='mb-0'><b>End Time</b><span className="required text-danger">*</span></p>
                                                                                                                <input type="datetime-local"
                                                                                                                    placeholder="YYYY-MM-DD"
                                                                                                                    min={minDate}
                                                                                                                    className="form-control"
                                                                                                                    // onChange={(e) => { setEndTime(moment((e.target.value)).format('YYYY-MM-DD HH:mm')); endtimeSelected() }}
                                                                                                                    onChange={(e) => {
                                                                                                                        setExam(exam.map((o, id) => {
                                                                                                                            if (id === index) {
                                                                                                                                o.endTime = moment((e.target.value)).format('YYYY-MM-DD HH:mm')
                                                                                                                                endtimeSelected(index)
                                                                                                                            }
                                                                                                                            return o
                                                                                                                        }))
                                                                                                                    }}
                                                                                                                // disabled={!startTime}
                                                                                                                />
                                                                                                                <div>
                                                                                                                    <p className="endtimeError" style={{ color: "red", fontWeight: 'bold' }}></p>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </>
                                                                                            }
                                                                                        </td>
                                                                                    </tr>
                                                                                )
                                                                                    :
                                                                                    <tr>
                                                                                        <td></td>
                                                                                        <td>No-Records_found</td>
                                                                                    </tr>
                                                                            }
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </div>
                                                            <div className="col text-center mt-2">
                                                                <input type="button" className="btn btn-sm btn-success mt-2" onClick={() => ScheduleExam()} value="Submit" />
                                                            </div>
                                                        </Modal>
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
                                                                getEndTime.length === 0 ?
                                                                    <p>Unscheduled</p>
                                                                    :
                                                                    <p>
                                                                        {getDateTime(getEndTime[0]?.startTime)}
                                                                    </p>
                                                            }
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <h6><b>End Time</b></h6>
                                                            {
                                                                getEndTime.length === 0 ?
                                                                    <p>Unscheduled</p>
                                                                    :
                                                                    <p>
                                                                        {getDateTime(getEndTime[0]?.endTime)}
                                                                    </p>
                                                            }
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
                                                            <p><span className='badge bg-warning'>
                                                                {marksperQuestion}
                                                            </span></p>
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <h6><b>Joining Fees</b></h6>
                                                            <p><span className='badge bg-primary'>{joiningFees}</span></p>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-sm-6">
                                                            <h6><b>Time Limit (per question)</b></h6>
                                                            <p><span className='badge bg-primary'>{timeperQuestion} seconds</span></p>
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <h6><b>Status</b></h6>
                                                            {
                                                                status === "COMPLETED" ?
                                                                    <p><span className='badge bg-success'>{status}</span></p>
                                                                    :
                                                                    <p><span className='badge bg-warning'>{status}</span></p>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-sm-6">
                                                            <h6><b>Is Featured Exam</b></h6>
                                                            <p><span >{isFeatured ? <span className="badge bg-success"> Yes </span> : <span className="badge bg-danger"> No </span>}</span></p>
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <h6><b>Tournament Apt Keywords</b></h6>
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
                                                        <div className="col-sm-6">
                                                            <h6><b>Tournament city</b></h6>
                                                            <p>
                                                            {
                                                                cityUUID.map((item) => 
                                                                    item.citiesTournament === null ?
                                                                    <span className='badge bg-primary mr-1'>----</span>
                                                                    :
                                                                   <span className='badge bg-success mr-1'>{item.citiesTournament.city}</span>
                                                                )
                                                            }
                                                            </p>
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
                                                <p><b>Exams</b></p>
                                                <div className="table-responsive">
                                                    <table className="table table-bordered datatable dt-responsive nowrap" style={{ borderCollapse: 'collapse', borderSpacing: 0, width: '100%' }}>
                                                        <thead className="thead-light">
                                                            <tr>
                                                                <th>Sl.no</th>
                                                                <th>Exam Title</th>
                                                                <th>Start time</th>
                                                                <th>End time</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                tournamentExam.length > 0 ? tournamentExam.map((item, index) =>
                                                                    <tr>
                                                                        <td>{index + 1}</td>
                                                                        {
                                                                            item.tournamentExamDetails ?
                                                                                <td>{item.tournamentExamDetails.title}</td>
                                                                                :
                                                                                <td>---</td>
                                                                        }
                                                                        {
                                                                            item.tournamentExamDetails.exam_TournamentScheduledExam.length ?
                                                                                <td>{getDateTime(item.tournamentExamDetails.exam_TournamentScheduledExam[0].startTime)}</td>
                                                                                :
                                                                                <td>Unscheduled</td>
                                                                        }
                                                                        {
                                                                            item.tournamentExamDetails.exam_TournamentScheduledExam.length ?
                                                                                <td>{getDateTime(item.tournamentExamDetails.exam_TournamentScheduledExam[0].endTime)}</td>
                                                                                :
                                                                                <td>Unscheduled</td>
                                                                        }
                                                                    </tr>
                                                                )
                                                                    :
                                                                    <tr>
                                                                        <td></td>
                                                                        <td>No-Records_found</td>
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
                                                                    {/* <label for="search-bar-0" class="search-label"><span id="search-bar-0-label" class="sr-only">Search this table</span><input id="search-bar-0" type="text" aria-labelledby="search-bar-0-label" class="form-control" placeholder="Search" /></label>
                                                                    <i class="bx bx-search-alt search-icon">
                                                                    </i> */}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-4"></div>

                                                        <div className="col-sm-4">
                                                            <p><b>Scheduled Exam</b></p>
                                                            <select className="form-select form-select mb-2" aria-label="Default select example"
                                                                //  onClick={getReviewExamStudentDetails}
                                                                onChange={(e) => { setGetScheduleUUID(e.target.value) }}
                                                            >
                                                                <option>Select</option>
                                                                {
                                                                    getEndTime.map((item, index) =>
                                                                        <option value={item.uuid}>{getDateTime(item.startTime)}</option>
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
                                                                {/* <th>uuid</th> */}
                                                                <th>Points</th>
                                                                <th>Tournament Result</th>
                                                                <th>Action</th>
                                                            </thead>
                                                            <tbody>
                                                                {
                                                                    getEndTime.filter((item) => item.uuid === getScheduleUUID).map((items) =>
                                                                        items.tournamentPriceDistribution.sort((a,b)=>a.rank - b.rank).map((items) =>
                                                                            <tr>
                                                                                <td>{items.name}</td>
                                                                                <td>{items.rank}</td>
                                                                                <td>{items.marks}</td>
                                                                                <td>
                                                                                    <span className="badge bg-success mr-1">Correct answers: <span>{items.correct}</span></span>
                                                                                    <span className="badge bg-danger mr-1">Wrong Answers: <span>{items.incorrect}</span></span>
                                                                                    <span className="badge bg-indigo mr-1">Skipped: <span>{items.skipped}</span></span>
                                                                                    <span className="badge bg-blue">Timeout: <span>{items.timeout}</span></span>
                                                                                </td>
                                                                                <td>
                                                                                    <Link to={"/TournamentReview/" + items.tournamentScheduleUUID + "/" + items.studentUUID} className='badge bg-success ReviewBtn'>Review</Link>
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
                                                                    <th>Rewards (in paisa)</th>
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
                                                        {/* <th>Id</th> */}
                                                        <th>Tournament time</th>
                                                        <th>Start Date</th>
                                                        <th>End Date</th>
                                                        <th>Participant Count</th>
                                                        <th>Status</th>
                                                        <th>Action</th>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            getEndTime.map((item, key) =>
                                                                <tr key={key}>
                                                                    {
                                                                        item.tournamentTime === "FULL_DAY" ?
                                                                            <td>{(item.tournamentTime) && (item.tournamentTime).replace((item.tournamentTime), "Full day")}</td>
                                                                            :
                                                                            <td>{(item.tournamentTime) && (item.tournamentTime).replace((item.tournamentTime), "Time Based")}</td>
                                                                    }
                                                                    {
                                                                        item.tournamentTime === "FULL_DAY" ?
                                                                            <td>
                                                                                {gateOnlyDate(item.startTime)}
                                                                            </td>
                                                                            :
                                                                            <td>
                                                                                {getDateTime(item.startTime)}
                                                                            </td>
                                                                    }
                                                                    {
                                                                        item.tournamentTime === "FULL_DAY" ?
                                                                            <td>
                                                                                {gateOnlyDate(item.endTime)}
                                                                            </td>
                                                                            :
                                                                            <td>
                                                                                {getDateTime(item.endTime)}
                                                                            </td>
                                                                    }
                                                                    <td>{item.joined}</td>
                                                                    <td>
                                                                        <span className="badge bg-success mr-1">{item.status}</span>
                                                                    </td>
                                                                    <td>
                                                                        <span type="button" className="me-2 text-primary" data-bs-container="#tooltip-container1" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit" onClick={() => updateschedule(item.startTime, item.endTime, item.tournamentTime, item.uuid)}><i className="mdi mdi-pencil font-size-18" /></span>
                                                                        <Modal
                                                                            isOpen={showupdateModal}
                                                                            style={{
                                                                                content: {
                                                                                    left: '50%',
                                                                                    top: '50%',
                                                                                    position: "absolute",
                                                                                    backgroundColor: "#FFF",
                                                                                    padding: "15px",
                                                                                    zIndex: "1000",
                                                                                    width: "50%",
                                                                                    borderRadius: ".5em",
                                                                                    transform: 'translate(-50%, -50%)',
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

                                                                            <div className="row mb-2">
                                                                                <div className="col-sm-4">
                                                                                    <p className='mb-0'><b>Tournament Time</b><span className="required text-danger">*</span></p>
                                                                                    <select className="form-control"
                                                                                        value={examTime}
                                                                                        onChange={(e) => {
                                                                                            setExamTime(e.target.value);
                                                                                            // examtimeSelected() 
                                                                                            setExam(exam.map(o => {
                                                                                                return { ...o, examTime: e.target.value }

                                                                                            }))
                                                                                        }}>
                                                                                        <option value={""}>Select</option>
                                                                                        <option value={"FULL_DAY"}>FULL_DAY</option>
                                                                                        <option value={"BASED_ON_TIME"}>BASED_ON_TIME</option>
                                                                                    </select>
                                                                                    <div><p className="examtimeError" style={{ color: "red", fontWeight: 'bold' }}></p></div>
                                                                                </div>
                                                                                <div className='col-sm-4'>
                                                                                    {
                                                                                        examTime === "FULL_DAY" &&
                                                                                        <>
                                                                                            <p className='mb-0'><b>Select Date</b><span className="required text-danger">*</span></p>
                                                                                            <input type="date"
                                                                                                placeholder="YYYY-MM-DD"
                                                                                                min={minDate}
                                                                                                name="date"
                                                                                                className="form-control"
                                                                                                value={moment(startTime).local().format('YYYY-MM-DD hh:mm')}
                                                                                                onChange={(e) => {
                                                                                                    setStartDate(moment(e.target.value).set({ hour: 23, minute: 59 }).format('YYYY-MM-DD HH:mm'));
                                                                                                    // starttimeSelected();
                                                                                                    // onChangeStartDate(e.target.value);
                                                                                                    // console.log(setStartDate(moment((e.target.value)).format('YYYY-MM-DD')), "DATAEEEE")
                                                                                                    console.log(moment(e.target.value).set({ hour: 23, minute: 59 }).format('YYYY-MM-DD HH:mm'), "DATAEEEE")
                                                                                                }} />

                                                                                            <div>
                                                                                                <p className="endtimeError" style={{ color: "red", fontWeight: 'bold' }}></p>
                                                                                            </div>
                                                                                        </>
                                                                                    }
                                                                                </div>
                                                                                <div className='col-sm-4'></div>
                                                                            </div>

                                                                            <div className="row d-flex flex-row justify-content-center align-items-center">


                                                                                <div className="table-responsive">
                                                                                    <table className="table table-bordered datatable dt-responsive nowrap" style={{ borderCollapse: 'collapse', borderSpacing: 0, width: '100%' }}>
                                                                                        <thead className="thead-light">
                                                                                            <tr>
                                                                                                <th>Sl.no</th>
                                                                                                <th>Exam Title</th>
                                                                                                <th>Action</th>
                                                                                            </tr>
                                                                                        </thead>
                                                                                        <tbody>
                                                                                            {
                                                                                                tournamentExam.length > 0 ? tournamentExam.map((item, index) =>
                                                                                                    <tr>
                                                                                                        <td>{index + 1}</td>
                                                                                                        {
                                                                                                            item.tournamentExamDetails ?
                                                                                                                <td>{item.tournamentExamDetails.title}</td>
                                                                                                                :
                                                                                                                <td>---</td>
                                                                                                        }
                                                                                                        <td>
                                                                                                            {
                                                                                                                examTime === "FULL_DAY" ?
                                                                                                                    <>
                                                                                                                        <div className='row'>
                                                                                                                            <div className="col-sm-6">
                                                                                                                                <p className='mb-0'><b>Start Time</b><span className="required text-danger">*</span></p>

                                                                                                                                <input type="datetime-local"
                                                                                                                                    placeholder="YYYY-MM-DD"
                                                                                                                                    // min={minDate}
                                                                                                                                    // min={startDate}
                                                                                                                                    // max={startDate}
                                                                                                                                    min={startDate}
                                                                                                                                    max={startDate}
                                                                                                                                    // value={startDate}
                                                                                                                                    className="form-control"
                                                                                                                                    disabled={!startDate}
                                                                                                                                    value={moment(startTime).local().format('YYYY-MM-DD hh:mm')}
                                                                                                                                    onChange={(e) => {
                                                                                                                                        setExam(exam.map((o, id) => {
                                                                                                                                            if (id === index) {
                                                                                                                                                o.startTime = moment((e.target.value)).format('YYYY-MM-DD HH:mm')
                                                                                                                                            }
                                                                                                                                            return o
                                                                                                                                        }))
                                                                                                                                    }}

                                                                                                                                />
                                                                                                                                <div><p className="starttimeError" style={{ color: "red", fontWeight: 'bold' }}></p></div>
                                                                                                                            </div>

                                                                                                                            <div className="col-sm-6">
                                                                                                                                <p className='mb-0'><b>End Time</b><span className="required text-danger">*</span></p>

                                                                                                                                <input type="datetime-local"
                                                                                                                                    placeholder="YYYY-MM-DD"
                                                                                                                                    // min={minDate}
                                                                                                                                    // min={startDate}
                                                                                                                                    // max={startDate}
                                                                                                                                    min={startDate}
                                                                                                                                    max={startDate}
                                                                                                                                    value={moment(endTime).local().format('YYYY-MM-DD hh:mm')}
                                                                                                                                    className="form-control"
                                                                                                                                    // onChange={(e) => { setEndTime(moment((e.target.value)).format('YYYY-MM-DD HH:mm:ss')); endtimeSelected() }}
                                                                                                                                    onChange={(e) => {
                                                                                                                                        setExam(exam.map((o, id) => {
                                                                                                                                            if (id === index) {
                                                                                                                                                o.endTime = moment((e.target.value)).format('YYYY-MM-DD HH:mm')
                                                                                                                                            }
                                                                                                                                            return o
                                                                                                                                        }))
                                                                                                                                    }}
                                                                                                                                    disabled={!startDate}
                                                                                                                                // required
                                                                                                                                />
                                                                                                                                <div>
                                                                                                                                    <p className="endtimeError" style={{ color: "red", fontWeight: 'bold' }}></p>
                                                                                                                                </div>
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                    </>
                                                                                                                    :
                                                                                                                    <>
                                                                                                                        <div className='row'>
                                                                                                                            {
                                                                                                                                getTournamentscheudleDetails &&
                                                                                                                                <div className="col-sm-6">
                                                                                                                                    <p className='mb-0'><b>Start Time</b><span className="required text-danger">*</span></p>
                                                                                                                                    <input type="datetime-local"
                                                                                                                                        placeholder="YYYY-MM-DD"
                                                                                                                                        min={minDate}
                                                                                                                                        name="time"
                                                                                                                                        className="form-control timezone"
                                                                                                                                        value={
                                                                                                                                            moment(
                                                                                                                                                getTournamentscheudleDetails.find((item, ind) => ind === index).startTime
                                                                                                                                            ).local().format('YYYY-MM-DD hh:mm')
                                                                                                                                        }
                                                                                                                                        // onChange={(e) => { setStartTime(moment((e.target.value)).format('YYYY-MM-DD HH:mm')); starttimeSelected(); onChangeStartDate(e.target.value) }}
                                                                                                                                        onChange={(e) => {
                                                                                                                                            setExam(exam.map((o, id) => {
                                                                                                                                                if (id === index) {
                                                                                                                                                    o.startTime = moment((e.target.value)).format('YYYY-MM-DD HH:mm')
                                                                                                                                                }
                                                                                                                                                return o
                                                                                                                                            }))
                                                                                                                                        }}
                                                                                                                                    />
                                                                                                                                    <div><p className="starttimeError" style={{ color: "red", fontWeight: 'bold' }}></p></div>
                                                                                                                                </div>
                                                                                                                            }

                                                                                                                            {
                                                                                                                                getTournamentscheudleDetails &&
                                                                                                                                <div className="col-sm-6">
                                                                                                                                    <p className='mb-0'><b>End Time</b><span className="required text-danger">*</span></p>
                                                                                                                                    <input type="datetime-local"
                                                                                                                                        placeholder="YYYY-MM-DD"
                                                                                                                                        min={minDate}
                                                                                                                                        className="form-control"
                                                                                                                                        value={moment(getTournamentscheudleDetails.find((item, ind) => ind === index).endTime).local().format('YYYY-MM-DD hh:mm')}
                                                                                                                                        // onChange={(e) => { setEndTime(moment((e.target.value)).format('YYYY-MM-DD HH:mm')); endtimeSelected() }}
                                                                                                                                        onChange={(e) => {
                                                                                                                                            setExam(exam.map((o, id) => {
                                                                                                                                                if (id === index) {
                                                                                                                                                    o.endTime = moment((e.target.value)).format('YYYY-MM-DD HH:mm')
                                                                                                                                                }
                                                                                                                                                return o
                                                                                                                                            }))
                                                                                                                                        }}
                                                                                                                                    // disabled={!startTime}
                                                                                                                                    />
                                                                                                                                    <div>
                                                                                                                                        <p className="endtimeError" style={{ color: "red", fontWeight: 'bold' }}></p>
                                                                                                                                    </div>
                                                                                                                                </div>
                                                                                                                            }

                                                                                                                        </div>
                                                                                                                    </>
                                                                                                            }
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                )
                                                                                                    :
                                                                                                    <tr>
                                                                                                        <td></td>
                                                                                                        <td>No-Records_found</td>
                                                                                                    </tr>
                                                                                            }
                                                                                        </tbody>
                                                                                    </table>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col text-center mt-2">
                                                                                <input type="button" className="btn btn-sm btn-success mt-2" onClick={() => UpdateScheduleExam(item.uuid)} value="Submit" />
                                                                            </div>
                                                                        </Modal>
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
                                                                                    <p className='mb-0'><b>Tournament Time</b><span className="required text-danger">*</span></p>
                                                                                    <select value={item.examTime} onChange={(e) => { setExamTime(e.target.value); examtimeSelected() }}>
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
                                                                                    <input type="datetime-local" placeholder="YYYY-MM-DD" min={minDate} className="form-control" value={moment(item.startTime).local().format('YYYY-MM-DD hh:mm')} onChange={(e) => { setStartTime(moment((e.target.value)).format('YYYY-MM-DD HH:mm')); starttimeSelected() }} />
                                                                                    <div><p className="starttimeError" style={{ color: "red", fontWeight: 'bold' }}></p></div>
                                                                                </div>
                                                                                <div className="col-sm-6">
                                                                                    <p className='mb-0'><b>End Time</b><span className="required text-danger">*</span></p>
                                                                                    <input type="datetime-local" placeholder="MM-DD-YYYY" min={minDate} className="form-control" value={moment.utc(item.endTime).local().format('YYYY-MM-DD hh:mm')} onChange={(e) => { setEndTime(moment((e.target.value)).format('YYYY-MM-DD HH:mm')); endtimeSelected() }} />
                                                                                    <div><p className="endtimeError" style={{ color: "red", fontWeight: 'bold' }}></p></div>
                                                                                </div>

                                                                                <div className="col text-center mt-2">
                                                                                    <input type="button" className="btn btn-sm btn-success mt-2" onClick={() => UpdateScheduleExam(item.uuid)} value="Submit" />
                                                                                    </div>
                                                                            </div>
                                                                        </Modal> */}

                                                                        {/* <div className="col text-center mt-2">
                                                                            <input type="button" className="btn btn-sm btn-success mt-2" onClick={() => UpdateScheduleExam(item.uuid)} value="Submit" />
                                                                        </div> */}
                                                                    </td>
                                                                </tr>
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

export default Tournamentview