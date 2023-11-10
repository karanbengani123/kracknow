import React, { useState, useEffect } from "react";
import '../CssFile/Student.css';
import { Link } from 'react-router-dom';
import Header from "./Header";
import SideNav from "./SideNav";
import Footer from "./Footer";
import picture2 from '../images/Web-Banner.jpg';
import Moment from "react-moment";
import TabNavItem from "./TabNavItem";
import TabContent from "./TabContent";
import Allquiz from "./Allquiz";
import Scheduledquiz from "./Scheduledquiz";
import Completedquiz from "./Completedquiz";
// import { TabContent } from "react-bootstrap";





function Quizpage() {
    // const [show, setShow] = useState(false)
    const [show1, setShow1] = useState(false)

    const [exam, setExam] = useState([])
    const [schexam, setSchexam] = useState([])
    const [completedExam, setCompletedExam] = useState([])



    useEffect(() => {
        getSchExam();
        getCompletedExam();
    }, [])
    // console.warn("Examlist", exam);

    const getSchExam = async () => {
        let result = await fetch(`https://zlasvmkyg1.execute-api.ap-south-1.amazonaws.com/dev/schedules`, {
            method: "GET",
            headers: {

                Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });

        result = await result.json();
        setSchexam(result.payload.response);
    }

    const getCompletedExam = async (page) => {
        let result = await fetch(`https://zlasvmkyg1.execute-api.ap-south-1.amazonaws.com/dev/schedules/completed/exams`, {
            method: "GET",
            headers: {

                Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });

        result = await result.json();
        setCompletedExam(result.payload.response);
    }


    // console.warn("Examlist", schexam);
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
    //Time Format Code End

    const [activeTab, setActiveTab] = useState("tab1");
    //  Functions to handle Tab Switching

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
                                        <h4 className="mb-sm-0">Quiz</h4>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 tabContent mb-3">
                                    <div className="col-sm-4 tabArea">
                                        <TabNavItem title="Quiz" id="tab1" activeTab={activeTab} setActiveTab={setActiveTab}/>
                                    </div>
                                    <div className="col-sm-4 tabArea ml">
                                        <TabNavItem title="Scheduled Quiz" id="tab2" activeTab={activeTab} setActiveTab={setActiveTab} />
                                    </div>
                                    <div className="col-sm-4 tabArea">
                                        <TabNavItem title="Completed Quiz" id="tab3" activeTab={activeTab} setActiveTab={setActiveTab} />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <TabContent id="tab1" activeTab={activeTab}>
                                    <Allquiz />
                                </TabContent>
                                <TabContent id="tab2" activeTab={activeTab}>
                                    <Scheduledquiz />
                                </TabContent>
                                <TabContent id="tab3" activeTab={activeTab}>
                                    <Completedquiz />
                                </TabContent>
                                {/* {activeTab === "tab1" ? <Allexam /> : <ScheduledExam />} */}
                            </div>


                            {/* <div className="row">
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
                                                                <h6 className="text-truncate mb-1 mt-1"><b className="mb-1">{item.title}</b></h6>
                                                                <span className="spantext "><b>Winning Prize:</b>{item.totalWinningPrize}</span>
                                                            </div>
                                                            <div className="textttt-first">
                                                                <span className="spantext"><b>Joining Fee:{item.joinFee}</b> <span className="text-danger fee"></span></span>
                                                                <span className="spantext ml-3"><b>Student Limit:{item.studentLimit}</b> <span className="text- fee"></span></span>
                                                            </div>
                                                            <div className="textttt">
                                                                <span className="spantext"><b>Start Time:</b> {getDateTime(item.schedule[0].startTime)}</span>
                                                            </div>
                                                            <Link to={"/Register2/" + item.schedule[0].uuid}><a className="stretched-link"></a></Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div> */}

                            {/* <div className="row">
                                <p><b>Completed Exams</b></p>
                                <div className="col-md-12">
                                    <div className="row">
                                        {
                                            completedExam.map((item) =>
                                                <div className="col-md-3">
                                                    <div className="card cards">
                                                        <img className="imageexam" src={item.examBanner.url} alt=""></img>
                                                        <div className="card-body examcardbody ">
                                                            <div className="titleexam">
                                                                <h6 className="text-truncate mb-1 mt-1"><b className="mb-1">{item.title}</b></h6>
                                                                <span className="spantext "><b>Winning Prize:</b>{item.totalWinningPrize}</span>
                                                            </div>
                                                            <div className="textttt-first">
                                                                <span className="spantext"><b>Joining Fee:{item.joinFee}</b> <span className="text-danger fee"></span></span>
                                                                <span className="spantext ml-3"><b>Student Limit:{item.studentLimit}</b> <span className="text- fee"></span></span>
                                                            </div>
                                                            <Link to={"/CompletedExamReview/" + item.schedule[0].uuid}><a className="stretched-link"></a></Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </section >
            </div>
            <Footer />
        </>
    )
};

export default Quizpage;