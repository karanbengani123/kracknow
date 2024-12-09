// import React from "react";
import React, { useEffect, useState } from "react";
import '../CssFile/Student.css';
import '../CssFile/NewStudent.css';
import { Link, useNavigate } from 'react-router-dom';
import SideNav from "./SideNav";
import Footer from "./Footer";
import Header from "./Header";
import Environment from "./Environment";



function NewAdmin() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [icon, setIcon] = useState('')
    const [status, setStatus] = useState('')
    const [roleUUID, setRoles] = useState('')
    const [show, setShow] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("")
    const [startExamDisable, setStartExamDisable] = useState(false);
    const [showLoaderShow, setShowLoaderShow] = useState(false);
    const navigate = useNavigate()

    const [role, setRole] = useState([])
    const getRole = async (page) => {
        let result = await fetch(`${Environment.server_url}/sessions/roles/get`,{
        // let result = await fetch(`http://localhost:3000/sessions/roles/get`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setRole(result.payload.roles);
    }
    useEffect(() => {
        getRole();
    }, [])

    const Adduser = async () => {
        if (name === '') {
            document.getElementsByClassName('NameError')[0].innerText = "This field is required"
        }
        else {
            document.getElementsByClassName('NameError')[0].innerText = ""
        }

        if (email === '') {
            document.getElementsByClassName('EmailError')[0].innerText = "This field is required"
        }
        else {
            document.getElementsByClassName('EmailError')[0].innerText = ""
        }

        if (password === '') {
            document.getElementsByClassName('PasswordError')[0].innerText = "This field is required"
        }
        else {
            document.getElementsByClassName('PasswordError')[0].innerText = ""
        }

        if (roleUUID === '') {
            document.getElementsByClassName('RoleError')[0].innerText = "This field is required"
        }
        else {
            document.getElementsByClassName('RoleError')[0].innerText = ""
        }

        setStartExamDisable(true)
        setShowLoaderShow(true)
        setTimeout(() => {
            setStartExamDisable(false);
            setShowLoaderShow(false);
        }, 5000);

        // const catdata = await fetch(`${Environment.server_url}/sessions/user/create`, {
        const catdata = await fetch(`http://localhost:3000/sessions/user/create`, {
            method: "POST",
            body: JSON.stringify({ name, email, password, status,roleUUID }),
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

    const NameSelected = () => {
        document.getElementsByClassName('NameError')[0].innerText = ""
    }
    const EmailSelected = () => {
        document.getElementsByClassName('EmailError')[0].innerText = ""
    }
    const PasswordSelected = () => {
        document.getElementsByClassName('PasswordError')[0].innerText = ""
    }
    const categoryStatusSelected = () => {
        document.getElementsByClassName('EmailError')[0].innerText = ""
    }
    const RoleSelected = () => {
        document.getElementsByClassName('RoleError')[0].innerText = ""
    }
    return (
        <>
        <Header/>
        <div className="content-wrapper admin-body">
            <section className="content">
                <div className="container-fluid">
                    <div className="page-content">
                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                    <h4 className="mb-sm-0">Admin List</h4>
                                    <div className="page-title-right">
                                        <ol className="breadcrumb m-0">
                                           <Link to="/Admin" className="breadcrumb-item">Admin</Link>
                                            <li className="breadcrumb-item active">Admin list</li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="form">
                                            <form>
                                                <div className="form-row mb-4">
                                                    <div className="col-12 col-sm-4">
                                                        <p><b>Name</b><span class="required text-danger">*</span></p>
                                                        <input type="text" placeholder="Enter name" name="userName" value={name} onChange={(e) => { setName(e.target.value); NameSelected() }} className="form-control" />
                                                        <div><p className="NameError" style={{ color: "red", fontWeight: 'bold' }}></p></div>
                                                    </div>
                                                    <div className="col-12 col-sm-4">
                                                        <p><b>Email</b><span class="required text-danger">*</span></p>
                                                        <input type="text" placeholder="Enter email" name="userEmail" value={email} onChange={(e) => { setEmail(e.target.value); EmailSelected() }} className="form-control" />
                                                        <div><p className="EmailError" style={{ color: "red", fontWeight: 'bold' }}></p></div>
                                                    </div>
                                                    <div className="col-12 col-sm-4">
                                                        <p><b>Password</b><span class="required text-danger">*</span></p>
                                                        <input type="text" placeholder="Enter password" name="userPassword" value={password} onChange={(e) => { setPassword(e.target.value); PasswordSelected() }} className="form-control" />
                                                        <div><p className="PasswordError" style={{ color: "red", fontWeight: 'bold' }}></p></div>
                                                    </div>
                                                    <div className="col-12 col-sm-4">
                                                        <p><b>Roles</b><span class="required text-danger">*</span></p>
                                                        <select className="form-select form-select mb-2 form-control valid" aria-label="Default select example" onChange={(e) => { setRoles(e.target.value); RoleSelected() }}>
                                                        <option value={""}>Select Role</option>
                                                        {
                                                            role.map((item) =>
                                                                <option value={item.uuid}>{item.roleName}</option>
                                                            )
                                                        }
                                                        </select>
                                                        <div><p className="RoleError" style={{ color: "red", fontWeight: 'bold' }}></p></div>
                                                    </div>
                                                    <div className="col-12 col-sm-4">
                                                        <p><b>Icon</b></p>
                                                        <div className="choose-file">
                                                            <input type="file"  className="form-control form-control-prepended" id="exampleFormControlFile1" />
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-sm-4">
                                                        <p><b>Status<span className="required text-danger">*</span></b></p>
                                                        <select className="form-select form-select mb-2" aria-label="Default select example"
                                                            onChange={(e) => { setStatus(e.target.value); categoryStatusSelected() }}
                                                        >
                                                            <option>Select status</option>
                                                            <option value={true} >Active</option>
                                                            <option value={false} >Inactive</option>
                                                        </select>
                                                        <div><p className="categoryStatusError" style={{ color: "red", fontWeight: 'bold' }}></p></div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="button">
                                            {/* <button type="button" class="btn btn-success savebtn">Save</button> */}
                                            <button type="button" className="btn btn-success savebtn" onClick={() => { Adduser() }} disabled={startExamDisable}>
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
                                            <Link to="/Admin"> <button type="button" class="btn">Cancel</button></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        <SideNav/>
        <Footer/>
        </>
    )
}
export default NewAdmin