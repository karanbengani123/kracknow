import React, { useState, useEffect } from "react";
import '../CssFile/Student.css';
import { Link } from 'react-router-dom';
import Header from "./Header";
import SideNav from "./SideNav";
import Footer from "./Footer";
import icons8 from "../Images/icons8-exam-64.png";
import icons9 from "../Images/icons8-quiz-64.png";
import icons10 from "../Images/icons8-test-64.png";
import icons11 from "../Images/icons8-medal-64.png";
import ExamTheme from "../Images/ExamTheme.jpg";
import QuizTheme from "../Images/QuizTheme.jpg";
import TournamentTheme from "../Images/TournamentTheme.jpg";
import MocktestTheme from "../Images/MocktestTheme.jpg";
import loader from "../Images/loader.gif";
import { UserData } from "./Data";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import Environment from "./Environment";




function Dashboard() {
    const [examCount, setExamCount] = useState([])
    const [mockTestCount, setMockTestCount] = useState([])
    const [quizCount, setQuizCount] = useState([])
    const [tournamentCount, setTournamentCount] = useState([])
    const [studentCount, setStudentCount] = useState([])
    const [loading, setLoading] = useState(false)
    const [city, setCity] = useState([])
    const [cityUUID, setCityUUID] = useState('')
    const [cityFilter, setCityFilter] = useState("")
    // const [userData, setUserData] = useState({})


    // const chart = async (cityUUID) => {
    //     let studentcategoryName = []
    //     let studentCorrectAnswer = []
    //     let studentWrongAnswer = []
    //     // let result = []

    //     let result = await fetch(
    //         `${Environment.server_url}/dashboard/admin/studentAnalytics/${cityUUID}`,
    //         {
    //             method: "GET",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 Authorization: `Bearer ${localStorage.getItem("token")}`,
    //             },
    //         }
    //     );
    //     result = await result.json();
    //     // .then(res => {
    //     //     if(res.status === 200)
    //     //     {
    //     //         console.warn(res.data)
    //     //         studentCorrectAnswer.push(res.payload.response.map((item) => item.correctAnswer))
    //     //         studentcategoryName.push(res.payload.response.map((item) => item.categoryName))
    //     //         console.warn(studentCorrectAnswer, "Correct Answer")
    //     //         console.warn(studentcategoryName, "Correct Answer")
    //     //         return (res.json());
    //     //     }else{
    //     //         return (res.json());
    //     //     }

    //     // studentcategoryName.push(result.payload.response.map((item) => item.categoryName))
    //     // studentCorrectAnswer.push(result.payload.response.map((item) => item.correctAnswer))
    //     // studentWrongAnswer.push(result.payload.response.map((item) => item.incorrectAnswer))

    //     // console.warn(studentCorrectAnswer, "Correct Answer")
    //     // console.warn(studentcategoryName, "Category Name")
    //     // console.warn(studentWrongAnswer, "In-correct Answer")

    //     setUserData({
    //         labels: result.payload,
    //         datasets: [
    //             {
    //                 label: "Correct Answer",
    //                 data: result.payload,
    //                 backgroundColor: [
    //                     "rgba(75,192,192,1)",
    //                     "#ecf0f1",
    //                     "#50AF95",
    //                     // "#f3ba2f",
    //                     // "#2a71d0"
    //                 ],
    //                 borderColor: ["black"],
    //                 borderWidth: 1
    //             },
    //         ]
    //     });
    //     // })
    // }
    
    const [userData, setUserData] = useState({
        labels: [0],
        datasets: [
            {
                label: ["Year"],
                data: [0],
                backgroundColor: [
                    "rgba(75,192,192,1)",
                    "#ecf0f1",
                    "#50AF95",
                    "#f3ba2f",
                    "#2a71d0"
                ],
                borderColor: "black",
                borderWidth: 1
            }
        ]
    });
    useEffect(() => {
        getDashboardCount();
        getCities();
    }, [])


    const getDashboardCount = async (cityUUID) => {
        setLoading(true)
        let result = await fetch(`${Environment.server_url}/dashboard/admin?cityUUID=${cityFilter}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setStudentCount(result.payload.students);
        setLoading(false)
        setExamCount(result.payload.examsCount);
        setQuizCount(result.payload.quizCount);
        setTournamentCount(result.payload.tournaments);
        setMockTestCount(result.payload.mockTestCount);
        setUserData({
            labels: result.payload.chart.map((item) => item.year),
            datasets: [
                {
                    label:"year",
                    // label: [result.payload.chart.map((item) => item.year)],
                    data: result.payload.chart.map((item) => item.count),
                    backgroundColor: [
                        "rgba(75,192,192,1)",
                        "#ecf0f1",
                        "#50AF95",
                        "#f3ba2f",
                        "#2a71d0"
                    ],
                    borderColor: ["black"],
                    borderWidth: 1
                },
            ]
        });
    }

    const getCities = async (page) => {
        let result = await fetch(`${Environment.server_url}/common/cities`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setCity(result.payload.cities);
    }

    // const getStudentAnalytics = async (cityUUID) => {
    //     // setLoading(true)
    //     let result = await fetch(`${Environment.server_url}/dashboard/admin/studentAnalytics/${cityUUID}`, {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //             Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
    //         }
    //     });
    //     result = await result.json()
    //     // {
    //     //     cityUUID &&
    //     setExamCount(result.payload.exam);
    //     setQuizCount(result.payload.quiz);
    //     setTournamentCount(result.payload.tournaments);
    //     setMockTestCount(result.payload.mockTest);
    //     // }
    //     // setLoading(false)
    //     setUserData({
    //         labels: ["Hello"],
    //         datasets: [
    //             {
    //                 label: "Correct Answer",
    //                 data: "result.payload",
    //                 backgroundColor: [
    //                     "rgba(75,192,192,1)",
    //                     "#ecf0f1",
    //                     "#50AF95",
    //                     // "#f3ba2f",
    //                     // "#2a71d0"
    //                 ],
    //                 borderColor: ["black"],
    //                 borderWidth: 1
    //             },
    //         ]
    //     });
    // }

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
                                        <h4 className="mb-sm-0">Dashboard</h4>
                                        <div className="col-md-3">
                                            {/* <ol className="breadcrumb m-0">
                                                    <li className="breadcrumb-item"><a href="#">Learn And Earn</a></li>
                                                    <li className="breadcrumb-item active">Dashboard</li>
                                                </ol> */}
                                            <form className="City-form">
                                                {/* <p><b>Select City</b></p> */}
                                                <select class="form-control select2" placeholder="City" onClick={()=>getDashboardCount()} onChange={(e) => { setCityFilter(e.target.value);  }}>
                                                    <option value={""}>Select city</option>
                                                    {
                                                        city.map((item) =>
                                                            <>
                                                                <option value={item.uuid}>{item.city}</option>
                                                            </>
                                                        )
                                                    }
                                                </select>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* <div className="row mb-4">
                                    <div className="col-sm-12">
                                    <form className="col-md-4 float-right text-right">
                                        <p><b>Select City</b></p>
                                        <select class="form-control select2" placeholder="City">
                                            <option>Choose your city</option>
                                            {this.state.cities.map((e, key) => {
                                                return <option key={key}>{e}</option>;
                                            })}
                                        </select>
                                    </form>
                                    </div>
                                </div> */}
                            {
                                loading ? (
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
                                ) : (
                                    <>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <Link to="/Exam" className="card card-1">
                                                            <h1 className="colorcard mb-0">{examCount}</h1>
                                                            <img src={ExamTheme} alt="ExamBanner" />
                                                        </Link>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <Link to="/Quiz" className="card card-2">
                                                            <h1 className="colorcard mb-0">{quizCount}</h1>
                                                            <img src={QuizTheme} alt="QuizBanner" />
                                                        </Link>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <Link to="/Tournament" className="card card-3">
                                                            <h1 className="colorcard mb-0">{tournamentCount}</h1>
                                                            <img src={TournamentTheme} alt="TournamentBanner" />
                                                        </Link>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <Link to="/Mocktest" className="card card-4">
                                                            <h1 className="colorcard mb-0">{mockTestCount}</h1>
                                                            <img src={MocktestTheme} alt="MocktestBanner" />
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-xl-8">
                                                <div className="card">
                                                    <div className="card-body border-top text-center">
                                                        <h4 className="card-title mb-4">Student Analytics</h4>
                                                        <BarChart chartData={userData} />
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <div className="col-xl-4">
                                                <div className="card">
                                                    <div className="card-body">
                                                        <h4 className="card-title mb-4">Exam Analytics</h4>
                                                        <div id="donut-chart" class="apex-charts">
                                                            <PieChart chartData={userData} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> */}
                                        </div>
                                    </>
                                )
                            }


                            {/* <div className="row">
                                    <div className="col-xl-8">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="float-end d-none d-md-inline-block">
                                                    <div className="btn-group mb-2">
                                                        <button type="button" className="btn btn-sm btn-light">Today</button>
                                                        <button type="button" className="btn btn-sm btn-light active">Weekly</button>
                                                        <button type="button" className="btn btn-sm btn-light">Monthly</button>
                                                    </div>
                                                </div>
                                                <h4 className="card-title mb-4">Student Analytics</h4>
                                                <div>
                                                    <div id="line-column-chart" className="apex-charts" dir="ltr" />
                                                </div>
                                            </div>
                                            <div className="card-body border-top text-center">
                                                <div className="row">
                                                    <div className="col-sm-4">
                                                        <div className="d-inline-flex">
                                                            <h5 className="me-2">$12,253</h5>
                                                            <div className="text-success">
                                                                <i className="mdi mdi-menu-up font-size-14"> </i>2.2 %
                                                            </div>
                                                        </div>
                                                        <p className="text-muted text-truncate mb-0">This month</p>
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <div className="mt-4 mt-sm-0">
                                                            <p className="mb-2 text-muted text-truncate"><i className="mdi mdi-circle text-primary font-size-10 me-1" /> This Year :</p>
                                                            <div className="d-inline-flex">
                                                                <h5 className="mb-0 me-2">$ 34,254</h5>
                                                                <div className="text-success">
                                                                    <i className="mdi mdi-menu-up font-size-14"> </i>2.1 %
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <div className="mt-4 mt-sm-0">
                                                            <p className="mb-2 text-muted text-truncate"><i className="mdi mdi-circle text-success font-size-10 me-1" /> Previous Year :</p>
                                                            <div className="d-inline-flex">
                                                                <h5 className="mb-0">$ 32,695</h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-4">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="float-end">
                                                    <select className="form-select form-select-sm">
                                                        <option selected>Apr</option>
                                                        <option value={1}>Mar</option>
                                                        <option value={2}>Feb</option>
                                                        <option value={3}>Jan</option>
                                                    </select>
                                                </div>
                                                <h4 className="card-title mb-4">Student Analytics</h4>
                                                <div id="donut-chart" className="apex-charts" />
                                                <div className="row">
                                                    <div className="col-4">
                                                        <div className="text-center mt-4">
                                                            <p className="mb-2 text-truncate"><i className="mdi mdi-circle text-primary font-size-10 me-1" /> Product A</p>
                                                            <h5>42 %</h5>
                                                        </div>
                                                    </div>
                                                    <div className="col-4">
                                                        <div className="text-center mt-4">
                                                            <p className="mb-2 text-truncate"><i className="mdi mdi-circle text-success font-size-10 me-1" /> Product B</p>
                                                            <h5>26 %</h5>
                                                        </div>
                                                    </div>
                                                    <div className="col-4">
                                                        <div className="text-center mt-4">
                                                            <p className="mb-2 text-truncate"><i className="mdi mdi-circle text-warning font-size-10 me-1" /> Product C</p>
                                                            <h5>42 %</h5>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div> */}
                            {/* <div className="row">
                                    <div className="col-md-12">
                                        <div className="row">
                                            <div className="col-md-4">
                                                <div className="card card-1">
                                                    <div className="card-body">
                                                        <div className="d-flex">
                                                            <div className="flex-1 overflow-hidden">
                                                                <p className="text-truncate font-size-14 mb-2">Number of Mock Test</p>
                                                                <h4 className="mb-0">50</h4>
                                                            </div>
                                                            <div className="text-primary ms-auto">
                                                                <i className="nav-icon far fa-user font-size-24" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="card-body border-top py-3">
                                                        <div className="text-truncate">
                                                            <span className="badge badge-soft-success font-size-11"><i className="mdi mdi-menu-up"> </i> 2.4% </span>
                                                            <span className="text-muted ms-2">From previous period</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <Link to="/Tournament" className="card card-1">
                                                    <div className="card-body">
                                                        <div className="d-flex">
                                                            <div className="flex-1 overflow-hidden">
                                                                <p className="text-truncate font-size-14 mb-2">Number Of Tournament</p>
                                                                <h4 className="mb-0">100</h4>
                                                            </div>
                                                            <div className="text-primary ms-auto">
                                                                <i className="nav-icon fas fa-table font-size-24" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="card-body border-top py-3">
                                                        <div className="text-truncate">
                                                            <span className="badge badge-soft-success font-size-11"><i className="mdi mdi-menu-up"> </i> 2.4% </span>
                                                            <span className="text-muted ms-2">From previous period</span>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                        </div>
                    </div >
                </section >
            </div >
            <Footer />
        </>
    )
}
export default Dashboard



