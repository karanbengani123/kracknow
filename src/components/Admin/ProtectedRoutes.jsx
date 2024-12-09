import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedRoutes({ cmp: Component, allowedRoles }) {
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user")); // Get user data
        const role = JSON.parse(localStorage.getItem("role"));
        if (!user) {
            navigate("/Login"); // Redirect if no user data
        } else if (!allowedRoles.includes(role)) {
            navigate("/Forbidden"); // Redirect if user does not have the correct role
        }
    }, [allowedRoles, navigate]);

    return <div>{Component && <Component />}</div>; // Render the component if authorized
}

export default ProtectedRoutes;
