// import React,{useState} from "react";
// import '../CssFile/NewStudent.css';
// import '../CssFile/Student.css';
// import { Link } from 'react-router-dom';
// import SideNav from "./SideNav";
// import Footer from "./Footer";
// import Header from "./Header";
// import { useForm } from "react-hook-form";

// function StudentEdit() {
//     const { register, handleSubmit, formState: { errors }, } = useForm();

//     const onSubmit = () => {
//         console.log("data");
//     }
//     const [imgPreview, setImgPreview] = useState(null);
//     const [error, setError] = useState(false);

//     const [imgPreview1, setImgPreview1] = useState(null);
//     const [error1, setError1] = useState(false);

//     const handleImageChange = (e) => {
//         setError(false);
//         const selected = e.target.files[0];
//         const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg"];
//         if (selected && ALLOWED_TYPES.includes(selected.type)) {
//             let reader = new FileReader();
//             reader.onloadend = () => {
//                 setImgPreview(reader.result);
//             }
//             reader.readAsDataURL(selected);
//         } else {
//             setError(true);
//             console.log("File Not Supported");
//         }
//     };
//     const handleImageChange1 = (e) => {
//         setError(false);
//         const selected = e.target.files[0];
//         const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg"];
//         if (selected && ALLOWED_TYPES.includes(selected.type)) {
//             let reader = new FileReader();
//             reader.onloadend = () => {
//                 setImgPreview1(reader.result);
//             }
//             reader.readAsDataURL(selected);
//         } else {
//             setError1(true);
//             console.log("File Not Supported");
//         }
//     };
//     return (
//         <>
//             <Header />
//             <div className={"content-wrapper admin-body"}>
//                 <section className="content">
//                     <div className="container-fluid">
//                         <div className="page-content">
//                             <div className="row">
//                                 <div className="col-12">
//                                     <div className="page-title-box d-sm-flex align-items-center justify-content-between">
//                                         <h4 className="mb-sm-0">New Student</h4>
//                                         <div className="page-title-right">
//                                             <ol className="breadcrumb m-0">
//                                                 <Link to="/Studentlist" className="breadcrumb-item">Student List</Link>
//                                                 <li className="breadcrumb-item active">New Student</li>
//                                             </ol>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="row">
//                                 <div className="col-lg-12">
//                                     <div className="card">
//                                         <div className="card-body">
//                                             <div className="form">
//                                                 <form onSubmit={handleSubmit(onSubmit)}>
//                                                     <div className="form-row mb-4">
//                                                         <div className="col-12 col-sm-4">
//                                                             <p><b>First Name<span class="required text-danger">*</span></b></p>
//                                                             <input type="text" name="userName" className="form-control"
//                                                                 {...register("userName", { required: { value: true, message: "This field is required." } })} />
//                                                             {errors.userName && <p className="errorText">{errors.userName.message}</p>}
//                                                         </div>
//                                                         <div className="col-12 col-sm-4">
//                                                             <p><b>Last Name<span class="required text-danger">*</span></b></p>
//                                                             <input type="text" name="lastName" className="form-control"
//                                                                 {...register("lastName", { required: { value: true, message: "This field is required." } })} />
//                                                             {errors.lastName && <p className="errorText">{errors.lastName.message}</p>}
//                                                         </div>
//                                                         <div className="col-12 col-sm-4">
//                                                             <p><b>Email<span class="required text-danger">*</span></b></p>
//                                                             <input id="email" type="email" name="email" className="form-control form-control-prepended"
//                                                                 {...register("email", { required: { value: true, message: "We need your email address to contact you." } })} />
//                                                             {errors.email && <p className="errorText">{errors.email.message}</p>}
//                                                         </div>
//                                                     </div>
//                                                     <div className="form-row mb-4">
//                                                         <div className="col-12 col-sm-4 imgageupload">
//                                                             <p><b>Profile Picture</b></p>
//                                                             <div className="container-exam">
//                                                                 {error && <p className="errorMsg">File not supported</p>}
//                                                                 <div
//                                                                     className="imgPreview"
//                                                                     style={{
//                                                                         background: imgPreview ? `url("${imgPreview}") no-repeat center/cover`
//                                                                             : "#c2c7d0"
//                                                                     }}
//                                                                 >
//                                                                     {!imgPreview && (
//                                                                         <>
//                                                                             {/* <p>Add Profile Picture</p> */}
//                                                                             <label htmlFor="fileUpload" className="customFileUpload">
//                                                                                 Choose file
//                                                                             </label>
//                                                                             <input type="file" id="fileUpload" multiple onChange={handleImageChange} />

//                                                                         </>
//                                                                     )}
//                                                                 </div>
//                                                                 {imgPreview && (
//                                                                     <button className="btn-exam" onClick={() => setImgPreview(null)}>Remove</button>
//                                                                 )}
//                                                             </div>
//                                                         </div>
//                                                         <div className="col-12 col-sm-4 imgageupload">
//                                                             <p><b>ID Proof</b></p>
//                                                             <div className="container-exam">
//                                                                 {error1 && <p className="errorMsg">File not supported</p>}
//                                                                 <div
//                                                                     className="imgPreview"
//                                                                     style={{
//                                                                         background: imgPreview1 ? `url("${imgPreview1}") no-repeat center/cover`
//                                                                             : "#c2c7d0"
//                                                                     }}
//                                                                 >
//                                                                     {!imgPreview1 && (
//                                                                         <>
//                                                                             {/* <p>ID Proof</p> */}
//                                                                             <label htmlFor="fileUpload1" className="customFileUpload">
//                                                                                 Choose file
//                                                                             </label>
//                                                                             <input type="file" id="fileUpload1" onChange={handleImageChange1} />

//                                                                         </>
//                                                                     )}
//                                                                 </div>
//                                                                 {imgPreview1 && (
//                                                                     <button className="btn-exam" onClick={() => setImgPreview1(null)}>Remove</button>
//                                                                 )}
//                                                             </div>
//                                                         </div>


//                                                         <div className="col-sm-4">
//                                                             <div className="col-sm">
//                                                                 <p><b>Mobile<span class="required text-danger">*</span></b></p>
//                                                                 <input id="tel" type="tel" name="tel" className="form-control form-control-prepended"
//                                                                     {...register("tel", { required: { value: true, message: "This field is required." } })} />
//                                                                 {errors.tel && <p className="errorText">{errors.tel.message}</p>}
//                                                             </div>


//                                                         <div className="col-sm mt-5">
//                                                             <p><b>Status<span class="required text-danger">*</span></b></p>
//                                                             <select className="form-select form-select mb-2 form-control valid" aria-label="Default select example">
//                                                                 <option selected>Active</option>
//                                                                 <option value="1">In-Active</option>
//                                                             </select>
//                                                         </div>
//                                                         </div>
//                                                     </div>
//                                                     <div className="button">
//                                                         <button type="submit" className="btn btn-success savebtn">Save</button>
//                                                         <Link to="/Studentlist"><button type="button" className="btn">Cancel</button></Link>
//                                                     </div>
//                                                 </form>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </section>
//             </div>
//             <SideNav />
//             <Footer />
//         </>
//     );
// }
// export default StudentEdit;
import React, { useState, useEffect } from "react";
import '../CssFile/NewStudent.css';
import '../CssFile/Student.css';
import { Link, useParams, useNavigate } from 'react-router-dom';
import SideNav from "./SideNav";
import Footer from "./Footer";
import Header from "./Header";
import { useForm } from "react-hook-form";
import Environment from "./Environment";

function StudentEdit() {

    const [show, setShow] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("")
    const [startExamDisable, setStartExamDisable] = useState(false);
    const [showLoaderShow, setShowLoaderShow] = useState(false);

    const [imgPreview, setImgPreview] = useState(null);
    const [error, setError] = useState(false);

    const [imgPreview1, setImgPreview1] = useState(null);
    const [error1, setError1] = useState(false);

    const handleImageChange3 = (e) => {
        setError(false);
        const selected = e.target.files[0];
        const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg"];
        if (selected && ALLOWED_TYPES.includes(selected.type)) {
            let reader = new FileReader();
            reader.onloadend = () => {
                setImgPreview(reader.result);
            }
            reader.readAsDataURL(selected);
        } else {
            setError(true);
            console.log("File Not Supported");
        }
    };
    const handleImageChange4 = (e) => {
        setError(false);
        const selected = e.target.files[0];
        const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg"];
        if (selected && ALLOWED_TYPES.includes(selected.type)) {
            let reader = new FileReader();
            reader.onloadend = () => {
                setImgPreview1(reader.result);
            }
            reader.readAsDataURL(selected);
        } else {
            setError1(true);
            console.log("File Not Supported");
        }
    };


    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [profilePic, setProfilePic] = useState('')
    const [idProof, setIdProof] = useState('')
    const [mobileNumber, setMobileNumber] = useState('')
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState('')
    const [city, setCity] = useState([]);
    const [selectCity, setSelectCity] = useState('');


    const navigate = useNavigate()


    const params = useParams('')
    useEffect(() => {
        getCities();
        getStudentDetails()
    }, [])

    const getStudentDetails = async () => {
        // console.warn(params)
        let result = await fetch(`${Environment.server_url}/students/${params.uuid}`,
            {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
        result = await result.json();
        setFirstName(result.payload.student.firstName)
        setLastName(result.payload.student.lastName)
        setMobileNumber(result.payload.student.mobileNumber)
        setProfilePic(result.payload.student.profilePic)
        setIdProof(result.payload.student.idProof)
        setEmail(result.payload.student.email)
        setStatus(result.payload.student.status)
        setSelectCity(result.payload.student.cityUUID)
        setImgPreview(result.payload.student.profilePic)
        setImgPreview1(result.payload.student.idProof)
    }

    const updateStudent = async () => {
        if (firstName === '') {
            document.getElementsByClassName('firstNameError')[0].innerText = "This field is required"
        }
        else {
            document.getElementsByClassName('firstNameError')[0].innerText = ""
        }
        if (lastName === '') {
            document.getElementsByClassName('lastNameError')[0].innerText = "This field is required"
        }
        else {
            document.getElementsByClassName('lastNameError')[0].innerText = ""
        }
        if (mobileNumber === '') {
            document.getElementsByClassName('mobileNumberError')[0].innerText = "This field is required"
        }
        else {
            document.getElementsByClassName('mobileNumberError')[0].innerText = ""
        }
        if (email === '') {
            document.getElementsByClassName('emailError')[0].innerText = "This field is required"
        }
        else {
            document.getElementsByClassName('emailError')[0].innerText = ""
        }
        if (status === '') {
            document.getElementsByClassName('statusError')[0].innerText = "This field is required"
        }
        else {
            document.getElementsByClassName('statusError')[0].innerText = ""
        }
        if (selectCity === '') {
            document.getElementsByClassName('cityError')[0].innerText = "This field is required"
        }
        else {
            document.getElementsByClassName('cityError')[0].innerText = ""
        }
        setStartExamDisable(true)
        setShowLoaderShow(true)
        setTimeout(() => {
            setStartExamDisable(false);
            setShowLoaderShow(false);
        }, 5000);
        // console.warn(firstName, lastName, mobileNumber, profilePic, idProof, email, status, selectCity)
        let result = await fetch(`${Environment.server_url}/students/${params.uuid}`, {
            method: "PUT",
            body: JSON.stringify({ firstName, lastName, mobileNumber, profilePic, idProof, email, status, city: selectCity }),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        }).then(catdata => {
            if (catdata.status === 200) {
                setShowSuccess(true);
                setTimeout(() => {
                    navigate("/Studentlist")
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
            })
    }

    const firstNameSelected = () => {
        document.getElementsByClassName('firstNameError')[0].innerText = ""
    }
    const lastNameSelected = () => {
        document.getElementsByClassName('lastNameError')[0].innerText = ""
    }
    const mobileNumberSelected = () => {
        document.getElementsByClassName('mobileNumberError')[0].innerText = ""
    }
    const emailSelected = () => {
        document.getElementsByClassName('emailError')[0].innerText = ""
    }
    const statusSelected = () => {
        document.getElementsByClassName('statusError')[0].innerText = ""
    }
    const citySelected = () => {
        document.getElementsByClassName('cityError')[0].innerText = ""
    }

    useEffect(() => {
        getCities();
    }, [])

    const getCities = async () => {
        let result = await fetch(`${Environment.server_url}/common/cities`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setCity(result.payload.cities);
    }


    async function uploadProfile(file) {

        // try {
        const fileObj = file.target.files[0];
        const fileName = fileObj.name;
        const fileExtension = fileName.match(/[a-zA-Z]{2,4}$/)[0];
        console.log(fileName, fileExtension)
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

        setProfilePic(fileUrl);


        await fetch(signedUrl, {
            method: "PUT",
            // headers: {
            //     "Content-Type": "application/json",
            //     Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            // },
            body: fileObj,
        });
        console.log("file url", fileUrl)
        // } catch { }
    }

    async function uploadID(file) {

        // try {
        const fileObj = file.target.files[0];
        const fileName = fileObj.name;
        const fileExtension = fileName.match(/[a-zA-Z]{2,4}$/)[0];
        console.log(fileName, fileExtension)
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

        setIdProof(fileUrl);


        await fetch(signedUrl, {
            method: "PUT",
            // headers: {
            //     "Content-Type": "application/json",
            //     Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            // },
            body: fileObj,
        });
        console.log("file url", fileUrl)
        // } catch { }
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
            <div className={"content-wrapper admin-body"}>
                <section className="content">
                    <div className="container-fluid">
                        <div className="page-content">
                            <div className="row">
                                <div className="col-12">
                                    <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                        <h4 className="mb-sm-0">Update Student</h4>
                                        <div className="page-title-right">
                                            <ol className="breadcrumb m-0">
                                                <Link to="/Studentlist" className="breadcrumb-item">Student List</Link>
                                                <li className="breadcrumb-item active">Update Student</li>
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
                                                            <p><b>First Name<span class="required text-danger">*</span></b></p>
                                                            <input type="text" name="userName" className="form-control" value={firstName}
                                                                onChange={(e) => { setFirstName(e.target.value); firstNameSelected() }} />
                                                            <div><p className="firstNameError" style={{ color: "red", fontWeight: 'bold' }}></p></div>
                                                        </div>
                                                        <div className="col-12 col-sm-4">
                                                            <p><b>Last Name<span class="required text-danger">*</span></b></p>
                                                            <input type="text" name="lastName" className="form-control" value={lastName}
                                                                onChange={(e) => { setLastName(e.target.value); lastNameSelected() }} />
                                                            <div><p className="lastNameError" style={{ color: "red", fontWeight: 'bold' }}></p></div>
                                                        </div>
                                                        <div className="col-12 col-sm-4">
                                                            <p><b>Email<span class="required text-danger">*</span></b></p>
                                                            <input id="email" type="email" name="email" className="form-control form-control-prepended" value={email}
                                                                onChange={(e) => { setEmail(e.target.value); emailSelected() }} />
                                                            <div><p className="emailError" style={{ color: "red", fontWeight: 'bold' }}></p></div>
                                                        </div>
                                                    </div>
                                                    <div className="form-row mb-4">
                                                        <div className="col-12 col-sm-4">
                                                            <p><b>Mobile<span class="required text-danger">*</span></b></p>
                                                            <input id="tel" type="tel" name="tel" className="form-control form-control-prepended" value={mobileNumber}
                                                                onChange={(e) => { setMobileNumber(e.target.value); mobileNumberSelected() }} />
                                                            <div><p className="mobileNumberError" style={{ color: "red", fontWeight: 'bold' }}></p></div>
                                                        </div>
                                                        <div className="col-12 col-sm-4">
                                                            <p><b>Status<span class="required text-danger">*</span></b></p>
                                                            <select className="form-select form-select mb-2" aria-label="Default select example"
                                                                onChange={(e) => { setStatus(e.target.value); statusSelected() }} value={status}
                                                            >
                                                                {/* <option>Select</option> */}
                                                                <option value={true}>Active</option>
                                                                <option value={false}>In-Active</option>
                                                            </select>
                                                            <div><p className="statusError" style={{ color: "red", fontWeight: 'bold' }}></p></div>
                                                        </div>
                                                        <div className="col-12 col-sm-4">
                                                            <p><b>City<span class="required text-danger">*</span></b></p>
                                                            <select
                                                                className="form-select form-select mb-2"
                                                                aria-label="Default select example"
                                                                onChange={(e) => {
                                                                    setSelectCity(e.target.value); citySelected()
                                                                }}
                                                                value={selectCity}
                                                            >
                                                                <option value={''} key={''}>Select</option>
                                                                {
                                                                    city.map((item, key) =>
                                                                        <option value={item.uuid} key={key}>{item.city}</option>
                                                                    )
                                                                }
                                                            </select>
                                                            <div><p className="cityError" style={{ color: "red", fontWeight: 'bold' }}></p></div>
                                                        </div>
                                                    </div>
                                                    <div className="form-row mb-4">
                                                        <div className="col-12 col-sm-4 imgageupload">
                                                            <p><b>Profile Picture</b></p>
                                                            <div className="container-exam">
                                                                {error && <p className="errorMsg">File not supported</p>}
                                                                <div
                                                                    className="imgPreview"
                                                                    style={{
                                                                        background: imgPreview ? `url("${imgPreview}") no-repeat center/cover`
                                                                            : "#c2c7d0"
                                                                    }}
                                                                >
                                                                    {/* <label htmlFor="fleUpload" className="customFileUpload">
                                                                                select profile
                                                                            </label>
                                                                    <input type="file" onChange={(e)=>uploadProfile(e)} id={"fleUpload"}/> */}
                                                                    {!imgPreview && (
                                                                        <>
                                                                            {/* <p>Add Profile Picture</p> */}
                                                                            <label htmlFor="fileUpload" className="customFileUpload">
                                                                                Choose file
                                                                            </label>
                                                                            <input type="file"
                                                                                id="fileUpload"
                                                                                onChange={(e) => {
                                                                                    handleImageChange3(e);
                                                                                    uploadProfile(e);
                                                                                }}
                                                                            />
                                                                        </>
                                                                    )}
                                                                </div>
                                                                {imgPreview && (
                                                                    <button className="btn-exam" onClick={() => setImgPreview(null)}>Remove</button>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="col-12 col-sm-4 imgageupload">
                                                            <p><b>ID Proof</b></p>
                                                            <div className="container-exam">
                                                                {error1 && <p className="errorMsg">File not supported</p>}
                                                                <div
                                                                    className="imgPreview"
                                                                    style={{
                                                                        background: imgPreview1 ? `url("${imgPreview1}") no-repeat center/cover`
                                                                            : "#c2c7d0"
                                                                    }}
                                                                >
                                                                    {!imgPreview1 && (
                                                                        <>
                                                                            {/* <p>ID Proof</p> */}
                                                                            <label htmlFor="fileUpload1" className="customFileUpload">
                                                                                Choose file
                                                                            </label>
                                                                            <input type="file"
                                                                                id="fileUpload1"
                                                                                onChange={(e) => {
                                                                                    handleImageChange4(e);
                                                                                    uploadID(e);

                                                                                }}

                                                                            />

                                                                        </>
                                                                    )}
                                                                </div>
                                                                {imgPreview1 && (
                                                                    <button className="btn-exam" onClick={() => setImgPreview1(null)}>Remove</button>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="button">
                                                        <button type="button" onClick={updateStudent} className="btn btn-success savebtn">
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
                                                        <Link to="/Studentlist"><button type="button" className="btn">Cancel</button></Link>
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
    );
}
export default StudentEdit;
