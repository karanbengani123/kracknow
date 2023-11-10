import React from "react";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import QuestionList from "../data/questions.json";
import Question from "./Question.jsx";
import QuizResult from "./QuizResult.jsx";
import '../CssFile/Quiz.css';



function QuizScreen() {
    const timer = useRef(null);
    const progressBar = useRef(null);

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [markedAnswers, setMarkedAnswers] = useState(new Array(QuestionList.length));
    // const isQuestionEnd = currentQuestionIndex === QuestionList.length;

    const [showTimer, setShowTimer] = useState()
    const [counter, setCounter] = useState();
    const [counterState, setCounterState] = useState();
    const params = useParams();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setshowScore] = useState(false);
    const [getOptions, setGetOptions] = useState([]);
    const [qnperpage, setqnperpage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [items, setItems] = useState([]);
    const [indivisualQuestion, setIndivisualQuestion] = useState([])
    const [isRecord, setIsRecord] = useState("");
    const [isLaastRecord, setIsLaastRecord] = useState("");
    const [isLastRecord, setIsLastRecord] = useState("");
    const [optionList, setOptionList] = useState("");
    const [selectedOption, setSelectedOption] = useState(null);
    const [questionUUID, setQuestionUUID] = useState();
    const [title, setTitle] = useState();
    const [givenAnswer, setGivenAnswer] = useState();
    const [options, setOptions] = useState([]);
    const [examUUID, setExamUUID] = useState();
    const [description, setDescription] = useState("");
    const [answeredTime, setAnsweredTime] = useState(20);
    const [categoryType, setCategoryType] = useState();
    const [time, setTime] = useState();
    const [status, setStatus] = useState("");
    const [disable, setDisable] = useState(false);

    console.log("counter ", counter)

    //Page change when we click on the next if we selected one option..........
    const handlePageChange = async (page) => {
        // setOptionList(null)
        setOptionList("")
        if (isLaastRecord.isLastRecord) {
            setIsRecord(true)
        }

        if (Object.keys(optionList).length) {
            TakeExamAnswer("ANSWERED");
        }
        // else {
        //     TakeExamAnswer("SKIPPED");
        // }
        // TakeExamAnswer("ANSWERED");

        setCurrentPage(page + 1);
        const examFromServer = await getExamQuestion(page + 1);

        // if (page === getQuestion[0].examQuestions.options.length)
        // if(isLastRecord.isLastRecord)

        // setIsRecord(true)
        setItems(examFromServer);
        setSelectedOption(null)

        // if (Object.keys(optionList).length) {
        //     TakeExamAnswer("ANSWERED");
        // }
        // else {
        //     console.log("Status not answered")
        //     setStatus("NOT-ANSWERED")
        //     TakeExamAnswer("NOT-ANSWERED");
        // }
    }

    //Page change when we click on the next if there is selection of option..........
    const handlePageSkip = async (page) => {
        setOptionList("")
        if (isLaastRecord.isLastRecord) {
            setIsRecord(true)
        }

        TakeExamAnswer("SKIPPED");
        setCurrentPage(page + 1);
        const examFromServer = await getExamQuestion(page + 1);

        setItems(examFromServer);
        setSelectedOption(null)
        // setOptionList("")
    }

    const [getQuestion, setGetQuestion] = useState([]);
    useEffect(() => {
        getExamQuestion(currentPage);
    }, [])
    // console.log("questions   ",getQuestion)
    //Get All questions starts............
    const getExamQuestion = async (page) => {
        let result = await fetch(`https://zlasvmkyg1.execute-api.ap-south-1.amazonaws.com/dev/schedules/${params.uuid}/live/status/${params.examParticipantUUID}/?limit=${qnperpage}&page=${page}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        result = await result.json();
        setGetQuestion(result.payload.response)
        setCounter(result.payload.timePerQuestion.timePerQuestion)
        setCounterState(result.payload.timePerQuestion.timePerQuestion)
        setExamUUID(result.payload.response[0].examUUID)
        setQuestionUUID(result.payload.response[0].examQuestions.uuid)
        setTitle(result.payload.response[0].examQuestions.title)
        setDescription(result.payload.response[0].examQuestions.description)
        setOptions(result.payload.response[0].examQuestions.options)
        setIsLaastRecord(result.payload)
        setIsLastRecord(result.payload.isLastRecord)
        setTime(result.payload.time)
        setCategoryType(result.payload.categoryType)
        setShowTimer(result.payload.timePerQuestion.timePerQuestion)
    }

    //Taking Answer in the Exam Starts.................
    const TakeExamAnswer = async (status) => {
        let result = await fetch(`https://zlasvmkyg1.execute-api.ap-south-1.amazonaws.com/dev/schedules/${params.examParticipantUUID}/live/answer`, {
            method: "POST",
            body: JSON.stringify({ questionUUID, givenAnswer: optionList, options, description, answeredTime, examUUID, categoryType, time, isLastRecord, status }),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(result => {
            if (result.status === 200) {
            }
            if (result.response === 200) {
                return (result.json()
                )
            } else {
                throw new Error(result);
            }

        })
    }

    //Taking Response And send them in Body............
    const handleAnswerResponse = (isCorrect, index) => {
        setOptionList(isCorrect.text)
        if (isCorrect.isCorrect) {
            setScore(score + 1)
        }
        setSelectedOption(index)
    }

    //On Given Time Question will Change.........
    // useEffect(() => {
    //     const timer =
    //         counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    //     if (counter === 0 && counterState) {
    //         TakeExamAnswer("TIME_OUT")
    //         handlePageChange(currentPage);
    //     }
    //     return () => clearInterval(timer);

    // }, [counter]);

    useEffect(() => {
        const timer =
            counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        // if (isLastRecord === false)
        if (counter === 0 && counterState) {
            handlePageChange(currentPage);
            // TakeExamAnswer("TIME_OUT")
        }
        return () => clearInterval(timer);
    }, [counter]);
    // console.log(counter)


    return (
        <div className="quiz-screen">
            <div className="question">
                {
                    isRecord ?
                        (
                            <QuizResult />
                        )
                        :
                        (
                            <div className="main">
                                {
                                    showTimer === 0 ?
                                        <div className="col-sm-12 questionNumber">
                                            <div className="col-sm-3"></div>
                                            <div className="col-sm-3"></div>
                                            <div className="col-sm-5"></div>
                                            <div className="col-sm-1"></div>
                                        </div>
                                        :
                                        <div className="col-sm-12 questionNumber">
                                            <div className="col-sm-3"></div>
                                            <div className="col-sm-3"></div>
                                            <div className="col-sm-5"></div>
                                            <div className="col-sm-1">00:{counter}</div>
                                        </div>

                                }

                                <div className="title" >
                                    <span>Questions:<b>{currentPage}</b></span>
                                    <p>{getQuestion.map((question) => (
                                        <div>
                                            <span dangerouslySetInnerHTML={{ __html: question.examQuestions.title }} />
                                        </div>
                                    ))}</p>
                                </div>
                                <div className="options">
                                    {
                                        getQuestion.map((option) => (
                                            <>{option.examQuestions.options.map((item, index) =>
                                                <div
                                                    className={index === selectedOption ? "option active" : "option"} onClick={() => { handleAnswerResponse(item, index) }}>
                                                    <b>{item.key}</b>.<span style={{ marginLeft: "2px" }}>{item.text}</span>
                                                    <img className="optionsImage" src={item.image}></img>
                                                </div>
                                            )}
                                            </>
                                        ))
                                    }
                                </div>
                                <div className="row">
                                    <div className="control">
                                        <div className="col-sm-6 text-start">
                                            <button onClick={() => handlePageSkip(currentPage)}>Skip</button>
                                        </div>
                                        <div className="col-sm-6 text-end">
                                            <button onClick={() => handlePageChange(currentPage)} disabled={disable}>Next</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                }
            </div>
        </div>
    );

}

export default QuizScreen