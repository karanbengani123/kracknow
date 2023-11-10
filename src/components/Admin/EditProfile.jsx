import React, { useState } from "react";
import '../CssFile/NewStudent.css';
import '../CssFile/NewSubCategory.css';
import { Link,useNavigate } from 'react-router-dom';
import SideNav from "./SideNav";
import Footer from "./Footer";
import Header from "./Header";
import Environment from "./Environment";

function EditProfile() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [profilepic, setProfilepic] = useState('')
    const [show, setShow] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("")
    const [startExamDisable, setStartExamDisable] = useState(false);
    const [showLoaderShow, setShowLoaderShow] = useState(false);

    const navigate = useNavigate()

    const updateCategory = async () => {
        setStartExamDisable(true)
        setShowLoaderShow(true)
        setTimeout(() => {
            setStartExamDisable(false);
            setShowLoaderShow(false);
        }, 5000);

        let result = await fetch(`${Environment.server_url}/sessions/updateAdmin`, {
            method: "PUT",
            body: JSON.stringify({ name, profilepic, email }),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
            .then(catdata => {
                if (catdata.status === 200) {
                    setShowSuccess(true);
                    setTimeout(() => {
                        navigate("/Dashboard")
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

        setProfilepic(fileUrl);


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
                                        <h4 className="mb-sm-0">Edit Profile</h4>
                                        <div className="page-title-right">
                                            <ol className="breadcrumb m-0">
                                                <Link to="/Dashboard" className="breadcrumb-item"><a>Dashboard</a></Link>
                                                <li className="breadcrumb-item active">Edit Profile</li>
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
                                                        {/* <div className="col-12 col-sm-4">
                                                        <p><b>Category</b></p>
                                                        <select className="form-select form-select mb-2" aria-label="Default select example">
                                                            <option selected>Select category</option>
                                                            <option value="1">GENERAL KNOWLEDGE</option>
                                                            <option value="2">CAT APTITUDE</option>
                                                            <option value="3">JEE MAIN</option>
                                                            <option value="4">UPSC</option>
                                                        </select>
                                                    </div> */}
                                                        <div className="col-12 col-sm-4">
                                                            <p><b>First Name<span className="required text-danger">*</span></b></p>
                                                            <input type="name" className="form-control" onChange={(e) => { setName(e.target.value) }} />
                                                        </div>
                                                        <div className="col-12 col-sm-4">
                                                            <p><b>Last Name<span className="required text-danger">*</span></b></p>
                                                            <input type="name" className="form-control" />
                                                        </div>
                                                        <div className="col-12 col-sm-4">
                                                            <p><b>Profile Photo</b></p>
                                                            <div className="choose-file">
                                                                <input type="file" required className="form-control form-control-prepended" id="exampleFormControlFile1" onChange={(e) => { uploadProfile(e) }} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                                <form>
                                                    <div className="form-row">
                                                        <div className="col-12 col-sm-4">
                                                            <p><b>Email<span className="required text-danger">*</span></b></p>
                                                            <input type="email" className="form-control" onChange={(e) => { setEmail(e.target.value) }} />
                                                        </div>
                                                        <div className="col-12 col-sm-4">
                                                            <p><b>Mobile<span className="required text-danger">*</span></b></p>
                                                            <input type="tel" className="form-control" />
                                                        </div>
                                                        <div className="col-12 col-sm-4">
                                                            <p><b>Status<span className="required text-danger">*</span></b></p>
                                                            <select className="form-select form-select mb-2" aria-label="Default select example">
                                                                <option selected>Active</option>
                                                                <option value="1">In-Active</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="button">
                                                <button type="button" className="btn btn-success savebtn" disabled={startExamDisable} onClick={()=>updateCategory()}>
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
                                                <Link to="/Dashboard"><button type="button" className="btn">Cancel</button></Link>
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
export default EditProfile