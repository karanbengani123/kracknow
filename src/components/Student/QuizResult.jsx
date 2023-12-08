import '../CssFile/Quiz.css';
import React,{useState,useEffect} from "react";
import { useParams,Link } from "react-router-dom";
import { baseurlwallet } from './BaseUrl';

function QuizResult({retry}){
    const params = useParams()
    const [totalMarks,setTotalMarks] = useState()
    const [totalResults,setTotalResults] = useState()

    // useEffect(() => {
    //     viewExamDetails();
    // }, []);
    


    useEffect(() => {

    }, []);
    const [show, setShow] = useState(false);

    useEffect(() => {
            setTimeout(() => {
                // setShow(true),  
                viewExamDetails();
            },3000);
            // this will clear Timeout
            // when component unmount like in willComponentUnmount
            // and show will not change to true
            // return () => {
            //     clearTimeout(timer1);
            // };
        },
        // useEffect will run only one time with empty []
        // if you pass a value to array,
        // like this - [data]
        // than clearTimeout will run every time
        // this value changes (useEffect re-run)
        []
    );

    const viewExamDetails = async () => {
        console.warn(params)
        let result = await fetch(`${baseurlwallet}/schedules/marks/${params.examParticipantUUID}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
        result = await result.json();
        setTotalMarks(result.payload.response.marks)
        setTotalResults(result.payload.response)
    }
    return(
        <div className="result-screen">
            <h2>Total Marks:{totalMarks}</h2>
            {/* <span className='badge bg-success'>Correct count:{totalResults.correctCount}</span>
            <span className='badge bg-danger'>In-Correct count:{totalResults.inCorrectCount}</span>
            <span className='badge bg-black'>Marks:{totalResults.marks}</span>
            <span className='badge bg-warning'>Skipped:{totalResults.skipped}</span>
            <span className='badge bg-danger'>Timeout:{totalResults.timeOut}</span> */}
            {/* <p>Selected {result.correct} correct options out of 4 questions</p> */}
            <div className="actionbutton">
            {/* <Link to={"/Leaderboard/"+ params.examScheduleUUID} className={"ActionButton"}>Leaderboard</Link> */}
            {/* <Link to={"/Review/"+params.examScheduleUUID} className={"ActionButton"}>Review Answers</Link> */}
            <Link to={"/Dashboard"} className={"ActionButton"}>Return To Dashboard</Link>
            </div>
        </div>
    )

}

export default QuizResult