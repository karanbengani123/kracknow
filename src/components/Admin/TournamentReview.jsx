import React, { useState, useEffect } from "react";
import '../CssFile/Student.css';
import { Link, useParams } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import SideNav from './SideNav';
import Environment from "./Environment";


function TournamentReview() {
    const params = useParams();
    const [examReview, setExamReview] = useState([]);
    const [studentDetails, setStudentDetails] = useState([]);
    const [studentKeywords, setStudentKeywords] = useState([]);
    const [studentQuestions, setStudentQuestions] = useState([]);
    const [isFeatured, setIsFeatured] = useState();
    const [studentTournamentQuestions, setStudentTournamentQuestions] = useState([]);

    useEffect(() => {
        getStudentExamReviewDetails();
    }, [])

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

    const getStudentExamReviewDetails = async () => {
        let result = await fetch(`${Environment.server_url}/tournaments/schedule/${params.tournamentScheduleUUID}/student/${params.studentUUID}/review`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
        result = await result.json();
        // var item = result.payload.response
        setStudentQuestions(result.payload.response);
        setStudentDetails(result.payload.response.tournamentSchedule[0].tournamentScheduleTournamentPriceDistribution);
        setStudentKeywords(result.payload.response.tournamentSchedule);
        setIsFeatured(result.payload.response.tournamentSchedule[0].tournament.isFeatured);
        setStudentTournamentQuestions(result.payload.response.tournamentExamParticipationQuestion)
    }
    // console.warn(studentKeywords[0]?.tournament.isFeatured)
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
                                        <h4 className="mb-sm-0">Review</h4>
                                        {/* <div className="page-title-right">
                                            <ol className="breadcrumb m-0">
                                                <Link to="/Examview" className="breadcrumb-item">Examview</Link>
                                                <li className="breadcrumb-item active">Exam Review</li>
                                            </ol>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="card">
                                        <div className="card-body">
                                            {/* <div class="row">
                                                <div class="col-sm-4">

                                                </div>
                                                <div class="col-sm-8">
                                                    <div class="text-sm-end">
                                                        <Link to="/CategoryEdit" button type="button" class="btn mb-2 me-2 btn btn-success">Edit</Link>
                                                    </div>
                                                </div>
                                            </div> */}

                                            <div className="row">
                                                <div className="col-sm-7">
                                                    <div className="row">
                                                        <div className="col-sm-6">
                                                            <h6><b>Student</b></h6>
                                                            <p>{studentDetails[0]?.name}</p>
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <h6><b>Tournament Title</b></h6>
                                                            <p>{studentKeywords[0]?.tournament.title}</p>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-sm-6">
                                                            <h6><b>Start Time </b></h6>
                                                            <p>{getDateTime(studentKeywords[0]?.startTime)}</p>
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <h6><b>End Time</b></h6>
                                                            <p>{getDateTime(studentKeywords[0]?.endTime)}</p>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-sm-6">
                                                            <h6><b>Student Limit</b></h6>
                                                            <p><span className='badge bg-danger'>{studentKeywords[0]?.tournament.studentLimit}</span></p>
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <h6><b>Marks Per Question</b></h6>
                                                            <p><span>{studentKeywords[0]?.tournament.marksPerQuestion}</span></p>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-sm-6">
                                                            <h6><b>Joining Fees</b></h6>
                                                            <p><span>{studentKeywords[0]?.tournament.joinFee}</span></p>
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <h6><b>Time Limit</b></h6>
                                                            <p><span>{studentKeywords[0]?.tournament.timePerQuestion}</span></p>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-sm-6">
                                                            <h6><b>Status</b></h6>
                                                            <p><span className='badge bg-blue'>{studentQuestions.status}</span></p>
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <h6><b>Is Featured Exam?</b></h6>
                                                            {
                                                                isFeatured === true ?
                                                                    <p><span className='badge bg-success'>Yes</span></p>
                                                                    :
                                                                    <p><span className='badge bg-danger'>No</span></p>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-sm-6">
                                                            <h6><b>Tournament Keywords</b></h6>
                                                            <p>
                                                                {
                                                                    studentKeywords[0]?.tournament.tournamentKeywords.map((item) =>
                                                                        <span className='badge bg-blue me-1'>
                                                                            {item.attribute}
                                                                        </span>
                                                                    )
                                                                }
                                                            </p>
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <h6><b>Question Result</b></h6>
                                                            <div className="row">
                                                                <div className="col-sm-4">
                                                                    <p><span className='badge bg-blue'>Marks: <span className='ml-1'>{studentQuestions.marks}</span></span></p>
                                                                </div>
                                                                <div className="col-sm-4">
                                                                    <p><span className='badge bg-success'>Correct Answer: <span className='ml-1'>{studentDetails[0]?.correct}</span></span></p>
                                                                </div>
                                                                <div className="col-sm-4">
                                                                    <p><span className='badge bg-danger'>Wrong Answers: <span className='mr-1'> {studentDetails[0]?.incorrect}</span></span></p>
                                                                </div>
                                                                <div className="col-sm-4">
                                                                    <p><span className='badge bg-orange'>Skipped: <span className='ml-1'>{studentDetails[0]?.skipped}</span></span></p>
                                                                </div>
                                                                <div className="col-sm-4">
                                                                    <p><span className='badge bg-cyan'>Timeout: <span className='ml-1'>{studentDetails[0]?.timeout}</span></span></p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row mt-3 mb-2">
                                                        <div className="col-sm">
                                                            <h6><b>Description</b></h6>
                                                            <p>{studentKeywords[0]?.tournament.description}</p>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="table-responsive mt-3">
                                                <div className="col">
                                                    <div className="col-sm">
                                                        <div className="search-box me-2 mb-2 d-inline-block">
                                                            {/* <div className="position-relative">
                                                                <label for="search-bar-0" className="search-label"><span id="search-bar-0-label" className="sr-only">Search this table</span><input id="search-bar-0"  type="text" aria-labelledby="search-bar-0-label" className="form-control" placeholder="Search" /></label>
                                                                <i className="bx bx-search-alt search-icon">
                                                                </i>
                                                            </div> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <div className="col-sm-5 "> */}
                                            <h6><b>Review Answers</b></h6>
                                            <table className='table table-bordered'>
                                                <thead className="thead-light">
                                                    <th><b>Questions</b></th>
                                                    <th><b>Options</b></th>
                                                    <th><b>Student's Answer</b></th>
                                                    <th><b>Correct Answer</b></th>
                                                </thead>
                                                <tbody>
                                                    {
                                                        studentTournamentQuestions.map((item) =>
                                                            <tr>
                                                                <td dangerouslySetInnerHTML={{ __html: item.title }}></td>
                                                                <td>
                                                                    {
                                                                        item.tournamentExamParticipationQuestionOption.map((options) => 
                                                                        {
                                                                        return options.correctAnswer ?
                                                                                <span className="badge bg-success me-1 mr-1">{options.key}.{options.text}<br></br>
                                                                                    {
                                                                                        options.image && <img src={options.image} className="OptionsImage"></img>
                                                                                    }
                                                                                </span>
                                                                                :
                                                                                <span className="badge bg-dark me-1 mr-1">{options.key}.{options.text}<br></br>
                                                                                    {
                                                                                        options.image && <img src={options.image} className="OptionsImage"></img>
                                                                                    }
                                                                                </span>
                                                                        })
                                                                        // options.correctAnswer ? 
                                                                        // <span className="badge bg-success me-1 mr-1">{options.key}.{options.text}</span> 
                                                                        // : 
                                                                        // <span className="badge bg-dark me-1 mr-1">{options.key}.{options.text}</span>
                                                                        // )
                                                                    }
                                                                </td>
                                                                {
                                                                    item.isCorrect ?
                                                                        <td><span className="badge bg-success">{item.givenAnswer}</span></td>
                                                                        :
                                                                        <td><span className="badge bg-danger">{item.givenAnswer}</span></td>
                                                                }
                                                                {/* <td><span className="badge bg-success">{item.isCorrect}</span></td> */}
                                                                <td>
                                                                    {
                                                                        item.tournamentExamParticipationQuestionOption.map((options) => 
                                                                        {
                                                                            return options.correctAnswer &&
                                                                                <span className="badge bg-success me-1 mr-1">{options.text}<br></br>
                                                                                    {
                                                                                        options.image && <img src={options.image} className="Questionimage"></img>
                                                                                    }
                                                                                </span>
                                                                        })
                                                                        // options.correctAnswer &&
                                                                        // <span className="badge bg-success me-1 mr-1">{options.text}</span>
                                                                        // )
                                                                    }
                                                                    </td>
                                                            </tr>
                                                        )
                                                    }
                                                </tbody>
                                            </table>
                                            {/* </div> */}
                                        </div>
                                    </div>
                                </div>
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

export default TournamentReview