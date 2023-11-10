import { useState, useEffect, useRef } from "react";
import { flushSync } from "react-dom";
import '../CssFile/Quiz.css';
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import React from "react";
import Timer from "./Timer";

function Question({ question, totalQuestions, currentQuestion, setAnswer }) {
    const [selectedOption, setSelectedOption] = useState(null);
    const timer = useRef(null);
    const progressBar = useRef(null);



    function gotoNextQuestion() {
        if (timer.current) {
            clearTimeout(timer.current);
        }
        flushSync(() => {
            setAnswer(selectedOption);
        });
        setSelectedOption(null);
    }
    useEffect(() => {
        progressBar.current.classList.remove("active");
        setTimeout(() => {
            progressBar.current.classList.add("active");
        }, 0);
        timer.current = setTimeout(gotoNextQuestion, 1000 * 1000);
        return gotoNextQuestion;
    }, [question]);

    const renderTime = ({ remainingTime }) => {
        if (remainingTime === 0) {
            return gotoNextQuestion;
        }

        return (
            <div className="timer">
                <div className="text">Remaining</div>
                <div className="value">{remainingTime}</div>
                <div className="text">seconds</div>
            </div>
        );
    };
    return (
        <div className="question">
            <div className="progressbar" ref={progressBar}></div>
            <Timer />
            {/* <div className="timer-wrapper">
                <CountdownCircleTimer
                    isPlaying
                    duration={10}
                    colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                    colorsTime={[10, 6, 3, 0]}
                    onComplete={() => ({ shouldRepeat: true, delay: 0 })}
                >
                    {renderTime}
                </CountdownCircleTimer>
            </div> */}

            <div className="question-count">
                <b>{currentQuestion}</b>
                of
                <b>{totalQuestions}</b>
            </div>
            <div className="main">
                <div className="title">
                    <span>Question:</span>
                    <p>{
                        question.map((questions) => (
                            <span dangerouslySetInnerHTML={{ __html: questions.examQuestions.title }}></span>))
                    }</p>
                </div>
                <div className="options">

                    {
                        question.options.map((option, index) => {
                            return (
                                <div
                                    className={index === selectedOption ? "option active" : "option"}
                                    key={index}
                                    onClick={() => setSelectedOption(index)}
                                >
                                    {option}
                                </div>
                            );
                        })
                    }
                </div>
            </div>
            <div className="control">
                <button onClick={gotoNextQuestion}>Next</button>
            </div>
        </div>

    );
}

export default Question