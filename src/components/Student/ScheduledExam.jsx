import React, { useState, useEffect } from "react";
import '../CssFile/Student.css';
import { Link } from 'react-router-dom';
import Header from "./Header";
import SideNav from "./SideNav";
import Footer from "./Footer";
import loader from '../images/loader.gif';
import Moment from "react-moment";




function ScheduledExam() {
    const [schexam, setSchexam] = useState([]);
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        getSchExam();
    }, [])
    // console.warn("Examlist", exam);

    const getSchExam = async () => {
        setLoading(true)
        let result = await fetch(`https://zlasvmkyg1.execute-api.ap-south-1.amazonaws.com/dev/schedules`, {
            method: "GET",
            headers: {

                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });

        result = await result.json();
        setSchexam(result.payload.response);
        setLoading(false)
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
        const date = new Date(dateString);
        return [
            date.getDate(),
            date.toLocaleString('default', { month: 'long' }),
            date.getFullYear()
        ].join(' ') +
            ', ' +
            formatAMPM(date);
    };
    //Time Format Code End

    return (
        <>
            {
                loading ? (
                    <div
                        className="row h-100"
                        style={{ paddingBottom: "11%"}}
                    >
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
                        <div className="col-md-12">
                            <div className="row">
                                {
                                    schexam.length > 0 ? schexam.map((item) =>
                                        <div className="col-md-3">
                                            <div className="card cards">
                                                <img className="card-img imageHeight" src={item.examBanner.url} alt="ExamBanner" />
                                                <h4 className="card-title text-white overlay3"><span className="overLaysss">Prize:{item.totalWinningPrize}</span></h4>
                                                <h4 className="card-title text-white overlay2"><span className="overLayss">Fee:{item.joinFee}</span></h4>
                                                {/* <div className="card-img-overlay overlay3 text-white d-flex flex-column justify-content-center">
                                            <span className="card-link text-warning overLaysss">Winning prize:{item.totalWinningPrize}</span>

                                            <div className="link d-flex">
                                                    <span className="card-link text-warning">Winning prize:{item.totalWinningPrize}</span>
                                                    <span className="card-link text-warning">Join fee:{item.joinFee}</span>
                                                </div>
                                        </div> */}
                                                <div className="card-body examcardbody">
                                                    <div className="titleexam">
                                                        <h6 className="text-truncate ExamCardTitle mt-1"><span>{item.title}</span></h6>
                                                    </div>
                                                    <div className="textttt mb-2">
                                                        <span className="spantext ExamCardContent">Student limit:<span className="text-fee">{item.studentLimit}</span></span>
                                                    </div>
                                                    <div className="textttt mb-1">
                                                        <span className="spantext ExamCardContent">Start:{getDateTime(item.schedule[0].startTime)}</span>
                                                    </div>
                                                    <Link to={"/Register2/" + item.schedule[0].uuid}><a className="stretched-link"></a></Link>
                                                </div>
                                            </div>
                                        </div>

                                    )
                                        :
                                        <div className="row mt-3">
                                            <div className="col-sm-4">
                                            </div>
                                            <div className="col-sm-4 text-center ml-3">
                                                <b>No-Scheduled Exam Found</b>
                                            </div>
                                            <div className="col-sm-4">
                                            </div>
                                        </div>
                                }
                            </div>
                        </div >
                    </div >
                )
            }

        </>
    )
};

export default ScheduledExam;