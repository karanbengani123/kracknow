import { useState, useEffect } from "react";
import QuizScreen from "./QuizScreen.jsx";
import JoinScreen from "./JoinScreen.jsx";
// import QuizNavbar from "./QuizNavbar.jsx";
import '../CssFile/Quiz.css';
import React from "react";
import Header from "./Header";
import SideNav from "./SideNav";
import Footer from "./Footer";
import { useParams } from "react-router-dom";


function Quiz({data}) {
    const params = useParams()
    const [isQuizStarted, setIsQuizStarted] = useState(false);
    
    
    return (
        <>
            {/* <QuizNavbar/> */}
            <Header />
            <SideNav />
            <div className="content-wrapper admin-body">
                <section className="content">
                    <div className="container-fluid">
                        <div className="page-content">
                            <div className="row">
                                <div className="quiz-container">
                                    {
                                        isQuizStarted ? (
                                            <QuizScreen retry={() => setIsQuizStarted(false)} />
                                        ) : (
                                            <JoinScreen start={() => setIsQuizStarted(true)} />
                                        )
                                    }
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

export default Quiz