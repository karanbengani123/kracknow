import '../CssFile/Student.css';
import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import Header from './Header';
import Footer from './Footer';
import SideNav from './SideNav';
import Environment from './Environment';
import Moment from 'react-moment';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import loader from '../Images/loader.gif';


function Studentview() {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [mobileNumber, setMobileNumber] = useState('')
    const [profilePic, setProfilePic] = useState('')
    const [idProof, setIdProof] = useState('')
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState('')
    const [createdAt, setCreatedAt] = useState('')
    const [city, setCity] = useState('')
    const [amount, setSendMoneyAmount] = useState()
    const [studentUUID, setStudentUUID] = useState()
    const [studentJoinedExam, setStudentJoinedExam] = useState([])
    const [show, setShow] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("")
    const [loading, setLoading] = useState(false)
    const params = useParams()



    useEffect(() => {
        viewStudentDetails();
        viewStudentJoineedExamDetails();
    }, []);

    const viewStudentDetails = async () => {
        let result = await fetch(`${Environment.server_url}/students/${params.uuid}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
        result = await result.json();
        // console.warn("view", result.payload.student)
        setFirstName(result.payload.student.firstName)
        setLastName(result.payload.student.lastName)
        setMobileNumber(result.payload.student.mobileNumber)
        setProfilePic(result.payload.student.profilePic)
        setIdProof(result.payload.student.idProof)
        setEmail(result.payload.student.email)
        setStatus(result.payload.student.status)
        setCreatedAt(result.payload.student.createdAt)
        setCity(result.payload.student.City_City.city)
    }

    //Api for get the indivisual student joined exam list.
    const viewStudentJoineedExamDetails = async () => {
        setLoading(true)
        let result = await fetch(`${Environment.server_url}/students/getstudentexams/${params.uuid}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
        result = await result.json();
        setLoading(false)
        setStudentJoinedExam(result.payload)
    }


    //URL For The Add-Category......
    const SendMoney = async () => {
        // console.warn(label, icon, status)
        const catdata = await fetch(`${Environment.server_url}/wallet/adminaddmoney`, {
            method: "POST",
            body: JSON.stringify({ amount, studentUUID: params.uuid }),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
            .then(catdata => {
                if (catdata.status === 200) {
                    setShowSuccess(true);
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

        // .then(catdata => {
        //     if (label !== '') {
        //         if (status !== '') {
        //             if (Response.status !== 400) {
        //                 toast.error(catdata.message)
        //                 if (Response.status == 200) {
        //                     navigate("/Category")
        //                 }
        //             }
        //             else {
        //                 toast.success(catdata.message);
        //             }
        //         } else {
        //             setStatusError(catdata.payload.status.message)
        //         }
        //     } else {
        //         setlabelError(catdata.payload.label.message)
        //     }
        // })
        // catdata = await catdata.json();
        // console.warn(catdata);
    }

    if (show === true) {
        setTimeout(() => setShow(false), 5000);
    }
    if (showSuccess === true) {
        setTimeout(() => setShowSuccess(false), 5000);
    }

    //TimeFormat Code Start
    const formatAMPM = (date) => {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    };

    const getDateTime = (dateString) => {
        if (!dateString) {
            return;
        }
        const d = dateString;
        const date = new Date(d);
        return [
            date.getDate(),
            date.toLocaleString('default', { month: 'long' }),
            date.getFullYear()
        ].join(' ') +
            ', ' +
            formatAMPM(date);
    };
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
                                        <h4 className="mb-sm-0">Student View</h4>
                                        <div className="page-title-right">
                                            <ol className="breadcrumb m-0">
                                                <Link to="/Studentlist" className="breadcrumb-item">Student List</Link>
                                                <li className="breadcrumb-item active">Student</li>
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
                                            <div className="row">
                                                <div className="col-sm-4">
                                                    <h6><b>Profile Pic</b></h6>
                                                    <Zoom><img className="viewprofile" src={profilePic || 'Placeholder.jpg'} alt="" /></Zoom>
                                                </div>
                                                <div className="col-sm-4">
                                                    <h6><b>Id Proof</b></h6>
                                                    <Zoom><img className="viewprofile" src={idProof || 'defaultID.jpeg'} alt="" /></Zoom>
                                                </div>
                                            </div>


                                            <div class="row mt-4">
                                                <div class="col-sm-4">
                                                    <h6><b>Name</b></h6>
                                                    <p>{firstName} {lastName}</p>
                                                </div>
                                                <div class="col-sm-4">
                                                    <h6><b>Email</b></h6>
                                                    <p>{email}</p>
                                                </div>
                                                <div class="col-sm-4">
                                                    <h6><b>Mobile</b></h6>
                                                    <p>{mobileNumber}</p>
                                                </div>
                                            </div>

                                            <div className='row mt-4'>
                                                <div className='col-sm-4'>
                                                    <h6><b>Status</b></h6>
                                                    <span >{status ? <span className="badge bg-success"> Active </span> : <span className="badge bg-danger"> Inactive </span>}</span>
                                                </div>
                                                <div className='col-sm-4'>
                                                    <h6><b>City</b></h6>
                                                    <p>{city}</p>
                                                </div>
                                                <div className='col-sm-4'>
                                                    <h6><b>Created at</b></h6>
                                                    <p>{getDateTime(createdAt)}</p>
                                                </div>
                                            </div>

                                            <div className='row mt-4'>
                                                <div className='col-sm-3'>
                                                    <h6><b>Send Money</b></h6>
                                                    <input
                                                        type={"number"}
                                                        placeholder={"Enter Amount"}
                                                        onChange={(e) => (setSendMoneyAmount(e.target.valueAsNumber || e.target.value))}
                                                        className="form-control">
                                                    </input>
                                                </div>
                                                <div className="col-sm-2  sendmoneybtn">
                                                    <button type="button" className="ml-2 btn btn-success sendMoneyButton" onClick={() => SendMoney()}>
                                                        Send
                                                    </button>
                                                </div>
                                                {
                                                    show &&
                                                    <strong className="ml-2 text-danger">{errorMessage}</strong>
                                                }
                                                {
                                                    showSuccess &&
                                                    <strong className="ml-2 text-success">{errorMessage}</strong>
                                                }
                                            </div>

                                            <div className="row mt-4">
                                                <h5><b>JOINED EXAMS</b></h5>
                                                <div class="col-sm-4">
                                                    <div class="search-box me-2 mb-2 d-inline-block">
                                                        <div class="position-relative">
                                                            <label for="search-bar-0" class="search-label"><span id="search-bar-0-label" class="sr-only">Search this table</span><input id="search-bar-0" type="text" aria-labelledby="search-bar-0-label" class="form-control" placeholder="Search" /></label>
                                                            <i class="bx bx-search-alt search-icon">
                                                            </i>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>


                                            <div className="table-responsive mt-3">
                                                <table className="table table-centered datatable dt-responsive nowrap" style={{ borderCollapse: 'collapse', borderSpacing: 0, width: '100%' }}>
                                                    <thead className="thead-light">
                                                        <tr>
                                                            <th>Sl.no</th>
                                                            <th>Title</th>
                                                            <th>Category</th>
                                                            <th>Start Time</th>
                                                            <th>End Time</th>
                                                            <th>Joining fees</th>
                                                            <th>Marks per question</th>
                                                            <th>Total questions</th>
                                                            <th>Status</th>
                                                            <th>Exam results</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            loading ?
                                                                (
                                                                    <tr
                                                                        className=""
                                                                        style={{ paddingBottom: "11%" }}
                                                                    >
                                                                        <td></td>
                                                                        <td></td>
                                                                        <td></td>
                                                                        <td></td>
                                                                        <td></td>
                                                                        <td className="">
                                                                            <img
                                                                                src={loader}
                                                                                alt={"loader"}
                                                                                className={"mx-auto d-block"}
                                                                            />
                                                                        </td>
                                                                        <td></td>
                                                                        <td></td>
                                                                        <td></td>
                                                                        <td></td>

                                                                    </tr>
                                                                )
                                                                :
                                                                (
                                                                    studentJoinedExam.length > 0 ? studentJoinedExam.map((item, index) =>
                                                                        <tr key={index}>
                                                                            <th>{index + 1}</th>
                                                                            <th>{item.title}</th>
                                                                            <th>{item.category}</th>
                                                                            <th>{getDateTime(item.startTime)}</th>
                                                                            <th>{getDateTime(item.endTime)}</th>
                                                                            <th>{item.joiningfee}</th>
                                                                            <th>{item.marksperquestion}</th>
                                                                            <th>{item.totalquestion}</th>
                                                                            {
                                                                                item.status === "REGISTERED" ?
                                                                                    <th><span className='badge bg-warning'>{item.status}</span></th>
                                                                                    :
                                                                                    <th><span className='badge bg-success'>{item.status}</span></th>
                                                                            }
                                                                            <th>{item.examResults}</th>
                                                                        </tr>
                                                                    )
                                                                        :
                                                                        <tr>
                                                                            <td></td>
                                                                            <td></td>
                                                                            <td></td>
                                                                            <td></td>
                                                                            <td>Student Details Not Found</td>
                                                                            <td></td>
                                                                            <td></td>
                                                                            <td></td>
                                                                            <td></td>
                                                                        </tr>
                                                                )
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>

                                            {/* <div className="row">
                                                <div className="col-10">
                                                    <div className="dataTables_info pr-5" id="DataTables_Table_0_info" role="status" aria-live="polite">Showing 1 to 2 of 2 entries</div>
                                                </div>
                                                <div className="col-2 ">
                                                    <div className="dataTables_paginate paging_simple_numbers" id="DataTables_Table_0_paginate">
                                                        <ul className="pagination pagination-rounded">
                                                            <li className="paginate_button page-item previous disabled" id="DataTables_Table_0_previous">
                                                                <a aria-controls="DataTables_Table_0" data-dt-idx={0} tabIndex={0} className="page-link">
                                                                    <i className="mdi mdi-chevron-left" />
                                                                </a>
                                                            </li>
                                                            <li className="paginate_button page-item active">
                                                                <a aria-controls="DataTables_Table_0" data-dt-idx={1} tabIndex={0} className="page-link">1</a>
                                                            </li>
                                                            <li className="paginate_button page-item ">
                                                                <a aria-controls="DataTables_Table_0" data-dt-idx={2} tabIndex={0} className="page-link">2</a>
                                                            </li>
                                                            <li className="paginate_button page-item next" id="DataTables_Table_0_next">
                                                                <a aria-controls="DataTables_Table_0" data-dt-idx={3} tabIndex={0} className="page-link"><i className="mdi mdi-chevron-right" /></a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div> */}
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

export default Studentview