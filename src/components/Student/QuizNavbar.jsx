import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Footer from './Footer';
import SideNav from './SideNav';
import Header from './Header';
import '../CssFile/Quiz.css';
import { baseurlwallet } from "./BaseUrl";


function QuizNavbar() {

    const params = useParams();
    const [leaderBoard, setLeaderBoard] = useState()

    useEffect(() => {
        viewLeaderboard();
    }, []);

    const viewLeaderboard = async () => {
        console.warn(params)
        let result = await fetch(`${baseurlwallet}/schedules/marks/${params.uuid}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
        result = await result.json();
        setLeaderBoard(result.payload.response.marks)
    }
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
                                        <h5 className="mb-sm-0">Leaderboard</h5>
                                    </div>
                                </div>
                                <div className="quiz-container">
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );

}

export default QuizNavbar