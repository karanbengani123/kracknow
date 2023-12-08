import React, { useState, useEffect } from "react";
import '../CssFile/Student.css';
import { useParams, Link } from 'react-router-dom';
import SideNav from "./SideNav";
import Footer from "./Footer";
import Header from "./Header";
import { useForm } from "react-hook-form";
import { baseurlwallet } from "./BaseUrl";

function Leaderboard() {
    const { register, handleSubmit, formState: { errors }, } = useForm();

    const onSubmit = () => {
        console.log("data");
    }

    const params = useParams();
    const [leaderBoard, setLeaderBoard] = useState([]);
    const [studentName, setStudentName] = useState();
    const [studentMark, setStudentMark] = useState();


    useEffect(() => {
        viewLeaderboard();
    }, []);

    const viewLeaderboard = async () => {
        console.warn(params)
        let result = await fetch(`${baseurlwallet}/schedules/leaderBoard/${params.uuid}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
        result = await result.json();
        setLeaderBoard(result.payload.response);
    }
    // console.log(leaderBoard[0].participatedStudents.firstName)

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
                                        <h4 className="mb-sm-0">Leaderboard</h4>
                                        {/* <div className="page-title-right">
                                            <ol className="breadcrumb m-0">
                                                <Link to="/Completedtournament" className="breadcrumb-item">Completed Tournament</Link>
                                                <li className="breadcrumb-item active">Laederboard list</li>
                                            </ol>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="form">
                                                <form>
                                                    <div className="form-row mb-4">
                                                        <div className="col-12 col-sm-2">
                                                        </div>
                                                        {
                                                            leaderBoard.map((item, key) =>
                                                                <div className="col-12 col-sm-8" key={key}>
                                                                    <div className="option-section-1 ">
                                                                        <div className="row prize">
                                                                            <div className="col-2">
                                                                                <i className="nav-icon fas fa-trophy quizicon text-warning" />
                                                                            </div>
                                                                            <div className="col">
                                                                                <p><b>{item.participatedStudents.firstName}</b></p>
                                                                            </div>
                                                                            <div className="col">
                                                                                <p><b>{item.marks}</b></p>
                                                                            </div>
                                                                            <div className="col-3">
                                                                                <p className="text-warning"><i class="fa fa-inr"></i><b><i className="nav-icon fas fa-rupee-sign" /> 100</b></p>
                                                                            </div>
                                                                            <div className="col-2">
                                                                                <i className="fas fa-award quizicon text-warning" />
                                                                            </div>

                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            )
                                                        }

                                                        {/* <div className="col-12 col-sm-2">

                                                        </div> */}
                                                    </div>
                                                </form>
                                            </div>
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
    )
}
export default Leaderboard