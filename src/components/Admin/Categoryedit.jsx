import React, { useState, useEffect } from "react";
import '../CssFile/Student.css';
import '../CssFile/NewStudent.css';
import { Link, useParams, useNavigate } from 'react-router-dom';
import SideNav from "./SideNav";
import Footer from "./Footer";
import Header from "./Header";
import { useForm } from "react-hook-form";
import Environment from "./Environment";

function Categoryedit() {
    const [label, setLabel] = useState('')
    const [icon, setIcon] = useState('')
    const [status, setStatus] = useState('')

    const [show, setShow] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("")
    const [startExamDisable, setStartExamDisable] = useState(false);
    const [showLoaderShow, setShowLoaderShow] = useState(false);

    const navigate = useNavigate()
    const params = useParams('')

    useEffect(() => {
        getCategoryDetails()
    }, [])

    const getCategoryDetails = async () => {
        let result = await fetch(`${Environment.server_url}/categories/category/${params.uuid}`,
            {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
        result = await result.json();
        setLabel(result.payload.category.label);
        // setIcon(result.payload.category.icon);
        setStatus(result.payload.category.status);

    }

    const updateCategory = async () => {
        if (label === '') {
            document.getElementsByClassName('categoryNameError')[0].innerText = "This field is required"
        }
        else {
            document.getElementsByClassName('categoryNameError')[0].innerText = ""
        }

        if (status === '') {
            document.getElementsByClassName('categoryStatusError')[0].innerText = "This field is required"
        }
        else {
            document.getElementsByClassName('categoryStatusError')[0].innerText = ""
        }

        setStartExamDisable(true)
        setShowLoaderShow(true)
        setTimeout(() => {
            setStartExamDisable(false);
            setShowLoaderShow(false);
        }, 5000);

        let result = await fetch(`${Environment.server_url}/categories/${params.uuid}`, {
            method: "PUT",
            body: JSON.stringify({ label, icon, status }),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
            .then(catdata => {
                if (catdata.status === 200) {
                    setShowSuccess(true);
                    setTimeout(() => {
                        navigate("/Category")
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

    const categoryNameSelected = () => {
        document.getElementsByClassName('categoryNameError')[0].innerText = ""
    }
    const categoryStatusSelected = () => {
        document.getElementsByClassName('categoryStatusError')[0].innerText = ""
    }

    if (show === true) {
        setTimeout(() => setShow(false), 5000);
    }
    if (showSuccess === true) {
        setTimeout(() => setShowSuccess(false), 5000);
    }

    async function uploadProfile(file) {

        // try {
        const fileObj = file.target.files[0];
        const fileName = fileObj.name;
        const fileExtension = fileName.match(/[a-zA-Z]{2,4}$/)[0];
        const response = await fetch(`${Environment.server_url}/common/filesupload`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            },
            body: JSON.stringify({
                "for": "Superadmin",
                "files": [
                    {
                        "extension": fileExtension,
                        "contentType": "image",
                        "fileName": fileName
                    }
                ]
            })

        });

        const result = await response.json();

        const { signedUrl, fileUrl } = result.payload.signedUrls[0];

        setIcon(fileUrl);


        await fetch(signedUrl, {
            method: "PUT",
            // headers: {
            //     "Content-Type": "application/json",
            //     Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            // },
            body: fileObj,
        });
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
                                        <h4 className="mb-sm-0">Update Category</h4>
                                        <div className="page-title-right">
                                            <ol className="breadcrumb m-0">
                                                <Link to="/Category" className="breadcrumb-item">Category</Link>
                                                <li className="breadcrumb-item active">Update Category</li>
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
                                                            <input type="text" name="userName" className="form-control"
                                                                value={label}
                                                                onChange={(e) => { setLabel(e.target.value); categoryNameSelected() }}
                                                            />
                                                            <div><p className="categoryNameError" style={{ color: "red", fontWeight: 'bold' }}></p></div>
                                                        </div>
                                                        <div className="col-12 col-sm-4">
                                                            <p><b>Icon</b></p>
                                                            <div className="choose-file">
                                                                <input type="file" className="form-control form-control-prepended" id="exampleFormControlFile1"
                                                                    onChange={(e) => { uploadProfile(e) }}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-12 col-sm-4">
                                                            <p><b>Status<span className="required text-danger">*</span></b></p>
                                                            <select className="form-select form-select mb-2" aria-label="Default select example"
                                                                onChange={(e) => { setStatus(e.target.value); categoryStatusSelected() }} value={status}
                                                            >
                                                                <option>Select</option>
                                                                <option value={true}>Active</option>
                                                                <option value={false}>Inactive</option>
                                                            </select>
                                                            <div><p className="categoryStatusError" style={{ color: "red", fontWeight: 'bold' }}></p></div>
                                                        </div>
                                                    </div>
                                                    <div className="button">
                                                        <button type="submit" onClick={() => updateCategory()} className="btn btn-success savebtn" disabled={startExamDisable}>
                                                            {showLoaderShow ?
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
                                                        <Link to="/Category"> <button type="button" className="btn">Cancel</button></Link>
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
export default Categoryedit