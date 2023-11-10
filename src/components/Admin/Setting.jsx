import React, { useState, useEffect } from "react";
import '../CssFile/Student.css';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import SideNav from './SideNav';
import Environment from "./Environment";


function Setting() {
    const [amount, setAmount] = useState()
    const [show, setShow] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("")

    if (show === true) {
        setTimeout(() => setShow(false), 5000);
    }
    if (showSuccess === true) {
        setTimeout(() => setShowSuccess(false), 5000);
    }
    useEffect(() => {
        getStudent();
    }, [])

    const updateStudent = async () => {
        // setStartExamDisable(true)
        // setShowLoaderShow(true)
        // setTimeout(() => {
        //     setStartExamDisable(false);
        //     setShowLoaderShow(false);
        // }, 5000);

        let result = await fetch(`${Environment.server_url}/students/amount/initialamount`, {
            method: "PUT",
            body: JSON.stringify({ amount }),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
            .then(catdata => {
                if (catdata.status === 200) {
                    setShowSuccess(true);
                    setTimeout(() => {
                        getStudent();
                    }, 5000);
                    // navigate('../Exam');
                    return (catdata.json());
                }
                else {
                    setShow(true);
                    return (catdata.json());
                }
            })
            .then(catdata => {
                setErrorMessage(catdata.message)
            });
    }
    const getStudent = async () => {
        // setStartExamDisable(true)
        // setShowLoaderShow(true)
        // setTimeout(() => {
        //     setStartExamDisable(false);
        //     setShowLoaderShow(false);
        // }, 5000);

        let result = await fetch(`${Environment.server_url}/students/amount/initialamount`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        result = await result.json()
        setAmount(result.payload.intValue)
    }
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
                                        <h4 className="mb-sm-0">Configuration</h4>
                                        <div className="page-title-right">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {
                                show &&
                                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                    <strong className="text-danger">{errorMessage}</strong>
                                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setShow(false)}></button>
                                </div>
                            }
                            {
                                showSuccess &&
                                <div className="alert alert-success alert-dismissible fade show" role="alert">
                                    <strong className="text-success">{errorMessage}</strong>
                                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setShowSuccess(false)}></button>
                                </div>
                            }
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <div class="row">
                                                <div className='col-sm-3'>
                                                    <h6><b>Joining bonus (In Rupees)</b></h6>
                                                    <input type={"number"} placeholder={"Enter Amount"} value={amount} onChange={(e) => (setAmount(e.target.valueAsNumber || e.target.value))} className="form-control">
                                                    </input>
                                                </div>
                                                <div className="col-sm-3 sendmoneybtn">
                                                    <button type="button" className="ml-2 btn btn-success sendMoneyButton" onClick={() => updateStudent()}>
                                                        Save
                                                    </button>
                                                </div>
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
    );
}

export default Setting