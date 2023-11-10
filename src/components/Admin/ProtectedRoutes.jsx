import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedRoutes(props) {
    let cmp = props.cmp
    let navigate = useNavigate()
    useEffect(() => {
        if (!localStorage.getItem("user"))
        {
            navigate("/Dashboard");
        }
}, [])
    return (
        <div>
            <cmp />
        </div>
    )
}
export default ProtectedRoutes