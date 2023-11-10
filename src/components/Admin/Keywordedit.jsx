import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from 'react-router-dom';
import SideNav from "./SideNav";
import Footer from "./Footer";
import Header from "./Header";
import { useForm } from "react-hook-form";
import Environment from "./Environment";


function Keywordedit() {
    const [attribute, setAttribute] = useState('')
    const [status, setStatus] = useState('')
    const [show, setShow] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("")
    const [startExamDisable, setStartExamDisable] = useState(false);
    const [showLoaderShow, setShowLoaderShow] = useState(false);

    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        getKeywordDetails()
    }, [])

    const getKeywordDetails = async (attribute) => {
        // console.warn(params)
        let result = await fetch(`${Environment.server_url}/keywords/${params.attribute}`,
            {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
        result = await result.json();
        setAttribute(result.attribute)
        setStatus(result.status)
    }

    const updateKeyword = async (attribute) => {
        if (attribute === '') {
            document.getElementsByClassName('keywordNameError')[0].innerText = "This field is required"
        }
        else {
            document.getElementsByClassName('keywordNameError')[0].innerText = ""
        }

        if (status === '') {
            document.getElementsByClassName('keywordStatusError')[0].innerText = "This field is required"
        }
        else {
            document.getElementsByClassName('keywordStatusError')[0].innerText = ""
        }

        setStartExamDisable(true)
        setShowLoaderShow(true)
        setTimeout(() => {
            setStartExamDisable(false);
            setShowLoaderShow(false);
        }, 5000);
        let result = await fetch(`${Environment.server_url}/keywords/${params.attribute}`, {
            method: "PUT",
            body: JSON.stringify({ attribute, status }),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        }).then(catdata => {
            if (catdata.status === 200) {
                setShowSuccess(true);
                setTimeout(() => {
                    navigate("/Keywords");
                }, 5000);
                return (catdata.json());
            }
            else {
                setShow(true);
                return (catdata.json());
            }
        })
            .then(catdata => {
                setErrorMessage(catdata.message)
            })
    }

    const keywordNameSelected = () => {
        document.getElementsByClassName('keywordNameError')[0].innerText = ""
    }
    const keywordStatusSelected = () => {
        document.getElementsByClassName('keywordStatusError')[0].innerText = ""
    }

    if (show === true) {
        setTimeout(() => setShow(false), 5000);
    }
    if (showSuccess === true) {
        setTimeout(() => setShowSuccess(false), 5000);
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
                                        <h4 className="mb-sm-0">Update Keyword</h4>
                                        <div className="page-title-right">
                                            <ol className="breadcrumb m-0">
                                                <Link to="/Keywords" className="breadcrumb-item">Keyword</Link>
                                                <li className="breadcrumb-item active">Update Keyword</li>
                                            </ol>
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
                                            <div className="form">
                                                <form>
                                                    <div className="form-row mb-4">
                                                        <div className="col-12 col-sm-4">
                                                            <p><b>Name<span className="required text-danger">*</span></b></p>
                                                            <input type="text" name="userName" className="form-control" value={attribute} onChange={(e) => { setAttribute(e.target.value); keywordNameSelected() }} />
                                                            <div><p className="keywordNameError" style={{ color: "red", fontWeight: 'bold' }}></p></div>
                                                        </div>
                                                        <div className="col-12 col-sm-4">
                                                            <p><b>Status<span className="required text-danger">*</span></b></p>
                                                            <select onChange={(e) => { setStatus(e.target.value); keywordStatusSelected() }} className="form-select form-select mb-2 form-control valid" aria-label="Default select example">
                                                                <option>Select</option>
                                                                <option value={true}>Active</option>
                                                                <option value={false}>In-Active</option>
                                                            </select>
                                                            <div><p className="keywordStatusError" style={{ color: "red", fontWeight: 'bold' }}></p></div>
                                                        </div>
                                                    </div>

                                                    <div className="button">
                                                        <button onClick={updateKeyword} type="button" className="btn btn-success savebtn" disabled={startExamDisable}>
                                                            {
                                                                showLoaderShow ?
                                                                    (
                                                                        <span >
                                                                            <span class="spinner-border spinner-border-sm mr-1" role="status" aria-hidden="true"></span>
                                                                            Saving...
                                                                        </span>
                                                                    )
                                                                    :
                                                                    (
                                                                        "Save"
                                                                    )
                                                            }
                                                        </button>
                                                        <Link to="/Keywords"><button type="button" className="btn">Cancel</button></Link>
                                                    </div>
                                                </form>
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
    )
}
export default Keywordedit