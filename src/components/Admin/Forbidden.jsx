// Forbidden.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import SideNav from "./SideNav";
import Footer from "./Footer";
import Header from "./Header";

function Forbidden() {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); // Goes back to the previous page
    };

    return (
        <>
        <Header />
        <div className="content-wrapper admin-body">
        <section className="content">
            <div style={{ textAlign: 'center', marginTop: '100px',alignItems:'center' }}>
                <h1>403 - Forbidden</h1>
                <p>You do not have permission to access this page.</p>
            </div>
            </section>
        </div>
        <SideNav />
        </>
    );
}

export default Forbidden;
