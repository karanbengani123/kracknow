import '../CssFile/Quiz.css';
import React from "react";

function JoinScreen({start}) {
    return(
        <div className="join-screen">
            <h2>Start Exam</h2>
            <button onClick={start}>Start</button>
        </div>
    )

}

export default JoinScreen