import React, { useState, useEffect } from "react";
import '../CssFile/Student.css';
import { Link } from 'react-router-dom';
import Header from "./Header";
import SideNav from "./SideNav";
import Footer from "./Footer";
import picture2 from '../images/Web-Banner.jpg';
import Moment from "react-moment";



function Tournament() {
    // const [show, setShow] = useState(false)
    const [show1, setShow1] = useState(false)

    const [exam, setExam] = useState([])
    const [schexam, setSchexam] = useState([])


    const data = [
        {
            image: "../../images/Web-Banner.jpg",
            title: 'Title',
            date: '14/062022',
            time: '4:00'
        },
        {
            image: "../images/Web-Banner.jpg",
            title: 'Title',
            date: 'Date',
            time: 'Time'
        },
        {
            image: "../images/Web-Banner.jpg",
            title: 'Title',
            date: 'Date',
            time: 'Time'
        },
        {
            image: "../images/Web-Banner.jpg",
            title: 'Title',
            date: 'Date',
            time: 'Time'
        },
        {
            image: "../images/Web-Banner.jpg",
            title: 'Title',
            date: 'Date',
            time: 'Time'
        }

    ]


    useEffect(() => {
        getExam();
        getSchExam();
    }, [])

    const getExam = async (page) => {
        let result = await fetch(`https://zlasvmkyg1.execute-api.ap-south-1.amazonaws.com/dev/schedules/all/exam`, {
            method: "GET",
            headers: {
               
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });

        result = await result.json();
        setExam(result.payload.response);
    }
    console.warn("Examlist", exam);

    const getSchExam = async () => {
        let result = await fetch(`https://zlasvmkyg1.execute-api.ap-south-1.amazonaws.com/dev/schedules`, {
            method: "GET",
            headers: {
               
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });

        result = await result.json();
        setSchexam(result.payload.response);





    }
    console.warn("Examlist", schexam);

    return (
        <>
            <Header />
            <SideNav />
            <div className="content-wrapper admin-body">
                <section className="content">
                    <div className="container-fluid">
                        <div className="page-content">
                            <div className="row">
                                <div className="col-12">
                                    <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                        <h4 className="mb-sm-0">Exam</h4>
                                    </div>
                                </div>
                            </div>


                            <div class="row">
                                <p><b>Scheduled Exams</b></p>

                                <div className="col-md-12">
                                    <div className="row">
                                        {
                                            schexam.map((item) =>

                                                <div className="col-md-3">
                                                    <div className="card cards">
                                                        <img className="imageexam" src={item.examBanner.url} alt=""></img>
                                                        <div className="card-body examcardbody ">
                                                            <div className="titleexam">
                                                            <h6 className="text-truncate mb-1"><b>{item.title}</b></h6>
                                                            </div>
                                                            <div className="textttt-first">
                                                                <span className="spantext"><b>Joining Fee:</b> <span className="text-danger fee">{item.joinFee}</span></span>
                                                                <span className="spantext ml-3"><b>Student Limit:</b> <span className="text- fee">{item.studentLimit}</span></span>
                                                                {/* <span className="spantext ml-3">Start Time</span>
                                                                <span className="spantext ml-3">Winning Prize</span> */}
                                                            </div>
                                                            <div className="textttt-first">
                                                                <span className="spantext "><b>Winning Prize:</b>{item.totalWinningPrize}</span>
                                                            </div>
                                                            <div className="textttt">
                                                                {/* <span className="spantext">{item.joinFee}</span>
                                                                <span className="spantext ml-3">{item.studentLimit}</span> */}
                                                                <span className="spantext"><b>Start Time:</b> <Moment>{item.schedule[0].startTime}</Moment></span>
                                                                {/* <span className="spantext ml-3">{item.totalWinningPrize}</span> */}
                                                            </div>
                                                            <Link to={"/Register2/" + item.schedule[0].uuid}><a class="stretched-link"></a></Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>




                            <div class="row">
                                <p><b>Exams</b></p>

                                <div className="col-md-12">
                                    <div className="row">
                                        {
                                            exam.map((item) =>

                                                <div className="col-md-3">
                                                    <div className="card cards">
                                                        <img className="imageexam" src={item.examBanner.url} alt=""></img>
                                                        <div className="card-body examcardbody ">
                                                            <div className="titleexam">
                                                            <h6 className="text-truncate mb-1"><b>{item.title}</b></h6>
                                                            </div>
                                                            <div className="textttt-first">
                                                                <span className="spantext"><b>Joining Fee:</b> <span className="text-danger fee">{item.joinFee}</span></span>
                                                                <span className="spantext ml-3"><b>Student Limit:</b> <span className="text- fee">{item.studentLimit}</span></span>
                                                                {/* <span className="spantext ml-3">Start Time</span>
                                                                <span className="spantext ml-3">Winning Prize</span> */}
                                                            </div>
                                                            <div className="textttt-first">
                                                                <span className="spantext "><b>Winning Prize:</b>{item.totalWinningPrize}</span>
                                                            </div>
                                                            <div className="textttt">
                                                                {/* <span className="spantext">{item.joinFee}</span>
                                                                <span className="spantext ml-3">{item.studentLimit}</span> */}
                                                                <span className="spantext"><b>Start Time:</b> <Moment>{item.schedule[0].startTime}</Moment></span>
                                                                {/* <span className="spantext ml-3">{item.totalWinningPrize}</span> */}
                                                            </div>
                                                            <Link to={"/Register2/" + item.schedule[0].uuid}><a class="stretched-link"></a></Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>



                            <div class="row">
                                <p><b>Completed Exams</b></p>





                            </div>

                        </div>

                    </div>
                </section >
            </div>
            <Footer />
        </>
    )
};

export default Tournament