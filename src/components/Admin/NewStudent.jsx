import React, { useState, useEffect } from "react";
import "../CssFile/NewStudent.css";
import "../CssFile/AddExam.css";
import "../CssFile/Student.css";
import { Link, useNavigate } from "react-router-dom";
import SideNav from "./SideNav";
import Footer from "./Footer";
import Header from "./Header";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Environment from "./Environment";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'

function NewStudent() {
  // const { register, handleSubmit, formState: { errors }, } = useForm();

  // const onSubmit = () => {
  //     console.log("data");
  // }

  // const notify = () => toast("Student Created Successfully!");

  // const {
  //     register,
  //     handleSubmit,
  //     formState: { errors },
  //     reset,
  //     trigger,
  // } = useForm();

  // const onSubmit = (data) => {
  //     console.log(data);
  //     reset();
  // };
  const [show, setShow] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [startExamDisable, setStartExamDisable] = useState(false);
  const [showLoaderShow, setShowLoaderShow] = useState(false);

  const [imgPreview, setImgPreview] = useState(null);
  const [imgPreviewId, setImgPreviewId] = useState(null);

  const [error, setError] = useState(false);
  const [error1, setError1] = useState(false);

  const handleImageChange = (e) => {
    setError(false);
    const selected = e.target.files[0];
    console.log(selected);
    const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg"];
    if (selected && ALLOWED_TYPES.includes(selected.type)) {
      let reader = new FileReader();
      reader.onloadend = () => {
        console.log(reader.result);
        setImgPreview(reader.result);
      };
      reader.readAsDataURL(selected);
    } else {
      setError(true);
      console.log("file not supported");
    }
  };
  const handleImageChangeId = (e) => {
    setError1(false);
    const selected = e.target.files[0];
    const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg"];
    if (selected && ALLOWED_TYPES.includes(selected.type)) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setImgPreviewId(reader.result);
      };
      reader.readAsDataURL(selected);
    } else {
      setError1(true);
      console.log("file not supported");
    }
  };

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profilePic, setProfilePic] = useState();
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [idProof, setIdProof] = useState();
  const [status, setStatus] = useState("");
  const [city, setCity] = useState([]);
  const [selectCity, setSelectCity] = useState("");
  const [id, setId] = useState();

  const navigate = useNavigate();

  const Addstudent = async () => {
    if (firstName === "") {
      document.getElementsByClassName("firstNameError")[0].innerText =
        "This field is required";
    } else {
      document.getElementsByClassName("firstNameError")[0].innerText = "";
    }
    if (lastName === "") {
      document.getElementsByClassName("lastNameError")[0].innerText =
        "This field is required";
    } else {
      document.getElementsByClassName("lastNameError")[0].innerText = "";
    }
    if (mobileNumber === "") {
      document.getElementsByClassName("mobileNumberError")[0].innerText =
        "This field is required";
    } else {
      document.getElementsByClassName("mobileNumberError")[0].innerText = "";
    }
    if (email === "") {
      document.getElementsByClassName("emailError")[0].innerText =
        "This field is required";
    } else {
      document.getElementsByClassName("emailError")[0].innerText = "";
    }
    if (status === "") {
      document.getElementsByClassName("statusError")[0].innerText =
        "This field is required";
    } else {
      document.getElementsByClassName("statusError")[0].innerText = "";
    }
    if (selectCity === "") {
      document.getElementsByClassName("cityError")[0].innerText =
        "This field is required";
    } else {
      document.getElementsByClassName("cityError")[0].innerText = "";
    }

    setStartExamDisable(true);
    setShowLoaderShow(true);
    setTimeout(() => {
      setStartExamDisable(false);
      setShowLoaderShow(false);
    }, 5000);
    // console.warn(firstName, lastName, profilePic, idProof, mobileNumber, email, status, selectCity);
    const catdata = await fetch(`${Environment.server_url}/students`, {
      method: "POST",
      body: JSON.stringify({
        firstName,
        lastName,
        profilePic,
        idProof,
        mobileNumber,
        email,
        status,
        city: selectCity || null,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    })
      .then((catdata) => {
        if (catdata.status === 200) {
          setShowSuccess(true);
          setTimeout(() => {
            navigate("/Studentlist");
          }, 5000);
          // navigate('../Exam');
          return catdata.json();
        } else {
          setShow(true);
          return catdata.json();
        }
      })
      .then((catdata) => {
        setErrorMessage(catdata.message);
      });
    // .then(catdata => {
    //     if (!firstName == '') {
    //         if (email !== '' || !mobileNumber == '' || !status == '' || !city == '' || !firstName == '' || !lastName == '') {

    //         } else {
    //             setStatusErr(catdata.payload.status.message);
    //         }
    //     } else {
    //         setFirstNameErr(catdata.payload.firstName.message)
    //     } if (!lastName == '') {

    //     } else {
    //         setLastNameErr(catdata.payload.lastName.message)
    //     }
    //     if (!email == '') {

    //     } else {
    //         setEmailErr(catdata.payload.email.message);
    //     }
    //     if (!mobileNumber == '') {
    //     } else {
    //         setMobileNumberErr(catdata.payload.mobileNumber.message)

    //     }
    //     if (!status == '') {
    //     } else {
    //         setStatusErr(catdata.payload.status.message);
    //     }
    //     if (!selectCity == '') {

    //     } else {
    //         setCityErr(catdata.payload.city.message)
    //     }
    // })
    // catdata = await catdata.json();
    // if (catdata.status === 200) {
    //     navigate('../Studentlist', { replace: true });
    // }
  };

  const firstNameSelected = () => {
    document.getElementsByClassName("firstNameError")[0].innerText = "";
  };
  const lastNameSelected = () => {
    document.getElementsByClassName("lastNameError")[0].innerText = "";
  };
  const mobileNumberSelected = () => {
    document.getElementsByClassName("mobileNumberError")[0].innerText = "";
  };
  const emailSelected = () => {
    document.getElementsByClassName("emailError")[0].innerText = "";
  };
  const statusSelected = () => {
    document.getElementsByClassName("statusError")[0].innerText = "";
  };
  const citySelected = () => {
    document.getElementsByClassName("cityError")[0].innerText = "";
  };

  useEffect(() => {
    getCities();
  }, []);

  const getCities = async () => {
    let result = await fetch(`${Environment.server_url}/common/cities`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    setCity(result.payload.cities);
  };

  async function uploadProfile(file) {
    // try {
    const fileObj = file.target.files[0];
    console.log(fileObj);
    const fileName = fileObj.name;
    const fileExtension = fileName.match(/[a-zA-Z]{2,4}$/)[0];
    console.log(fileName);
    console.log(fileExtension);
    const response = await fetch(
      `${Environment.server_url}/common/filesupload`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
        body: JSON.stringify({
          for: "Superadmin",
          files: [
            {
              extension: fileExtension,
              contentType: "image",
              fileName: fileName,
            },
          ],
        }),
      }
    );

    const result = await response.json();

    const { signedUrl, fileUrl } = result.payload.signedUrls[0];

    console.log(signedUrl);
    console.log(fileUrl);
    setProfilePic(fileUrl);

    // await fetch(signedUrl, {
    //   method: "PUT",
    //   // headers: {
    //   //     "Content-Type": "application/json",
    //   //     Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
    //   // },
    //   body: fileObj,
    // });
    // console.log("file url", fileUrl);
    // } catch { }
  }

  async function uploadID(file) {
    // try {
    const fileObj = file.target.files[0];
    const fileName = fileObj.name;
    const fileExtension = fileName.match(/[a-zA-Z]{2,4}$/)[0];
    console.log(fileName, fileExtension);
    const response = await fetch(
      `${Environment.server_url}/common/filesupload`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
        body: JSON.stringify({
          for: "Superadmin",
          files: [
            {
              extension: fileExtension,
              contentType: "image",
              fileName: fileName,
            },
          ],
        }),
      }
    );

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
    console.log("file url", fileUrl);
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
      <div className="content-wrapper admin-body">
        <section className="content">
          <div className="container-fluid">
            <div className="page-content">
              {/* <ToastContainer
                                position="top-center"
                                autoClose={5000}
                                hideProgressBar
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover
                            /> */}
              <div className="row">
                <div className="col-12">
                  <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                    <h4 className="mb-sm-0">New Student</h4>
                    <div className="page-title-right">
                      <ol className="breadcrumb m-0">
                        <Link to="/Studentlist" className="breadcrumb-item">
                          Student List
                        </Link>
                        <li className="breadcrumb-item active">New Student</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
              {show && (
                <div
                  className="alert alert-danger alert-dismissible fade show"
                  role="alert"
                >
                  <strong className="text-danger">{errorMessage}</strong>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                    onClick={() => setShow(false)}
                  ></button>
                </div>
              )}
              {showSuccess && (
                <div
                  className="alert alert-success alert-dismissible fade show"
                  role="alert"
                >
                  <strong className="text-success">{errorMessage}</strong>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                    onClick={() => setShowSuccess(false)}
                  ></button>
                </div>
              )}
              <div className="row">
                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-body">
                      <div className="form">
                        {/* onSubmit={() => navigate('../Studentlist', { replace: true })} */}
                        <form>
                          {/*  */}
                          <div className="form-row mb-4">
                            <div className="col-12 col-sm-4">
                              <p>
                                <b>
                                  First Name
                                  <span class="required text-danger">*</span>
                                </b>
                              </p>
                              <input
                                type="text"
                                placeholder="Enter first name"
                                value={firstName}
                                onChange={(e) => {
                                  setFirstName(e.target.value);
                                  firstNameSelected();
                                }}
                                name="firstName"
                                className="form-control"
                              />
                              {/* {...register("name", { required: "Name is Required" })}
                                                                onKeyUp={() => {
                                                                    trigger("name");
                                                                }}
                                                            {errors.name && (
                                                                <small className="text-danger">{errors.name.message}</small>
                                                            )} */}
                              <div>
                                <p
                                  className="firstNameError"
                                  style={{ color: "red", fontWeight: "bold" }}
                                ></p>
                              </div>
                            </div>
                            <div className="col-12 col-sm-4">
                              <p>
                                <b>
                                  Last Name
                                  <span class="required text-danger">*</span>
                                </b>
                              </p>
                              <input
                                type="text"
                                placeholder="Enter first name"
                                value={lastName}
                                onChange={(e) => {
                                  setLastName(e.target.value);
                                  lastNameSelected();
                                }}
                                name="lastName"
                                className="form-control"
                              />
                              <div>
                                <p
                                  className="lastNameError"
                                  style={{ color: "red", fontWeight: "bold" }}
                                ></p>
                              </div>
                            </div>
                            <div className="col-12 col-sm-4">
                              <p>
                                <b>
                                  Email
                                  <span class="required text-danger">*</span>
                                </b>
                              </p>
                              <input
                                id="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => {
                                  setEmail(e.target.value);
                                  emailSelected();
                                }}
                                type="email"
                                name="email"
                                className="form-control form-control-prepended"
                              />
                              <div>
                                <p
                                  className="emailError"
                                  style={{ color: "red", fontWeight: "bold" }}
                                ></p>
                              </div>
                            </div>
                          </div>
                          <div className="form-row mb-4">
                            <div className="col-12 col-sm-4">
                              <p>
                                <b>
                                  Mobile
                                  <span class="required text-danger">*</span>
                                </b>
                              </p>
                              <input
                                id="tel"
                                placeholder="Enter mobile number"
                                value={mobileNumber}
                                onChange={(e) => {
                                  setMobileNumber(e.target.value);
                                  mobileNumberSelected();
                                }}
                                type="tel"
                                name="tel"
                                className="form-control form-control-prepended"
                              />
                              <div>
                                <p
                                  className="mobileNumberError"
                                  style={{ color: "red", fontWeight: "bold" }}
                                ></p>
                              </div>
                            </div>
                            <div className="col-12 col-sm-4">
                              <p>
                                <b>
                                  Status
                                  <span class="required text-danger">*</span>
                                </b>
                              </p>
                              <select
                                className="form-select form-select mb-2 form-control valid"
                                aria-label="Default select example"
                                onChange={(e) => {
                                  setStatus(e.target.value);
                                  statusSelected();
                                }}
                              >
                                <option>Select status</option>
                                <option value={true}>Active</option>
                                <option value={false}>In-Active</option>
                              </select>
                              <div>
                                <p
                                  className="statusError"
                                  style={{ color: "red", fontWeight: "bold" }}
                                ></p>
                              </div>
                            </div>
                            <div className="col-12 col-sm-4">
                              <p>
                                <b>
                                  City
                                  <span class="required text-danger">*</span>
                                </b>
                              </p>
                              <select
                                className="form-select form-select mb-2"
                                aria-label="Default select example"
                                onChange={(e) => {
                                  setSelectCity(e.target.value);
                                  citySelected();
                                }}
                              >
                                <option value={""}>Select city</option>
                                {city.map((item, key) => (
                                  <option value={item.uuid} key={key}>
                                    {item.city}
                                  </option>
                                ))}
                              </select>
                              <div>
                                <p
                                  className="cityError"
                                  style={{ color: "red", fontWeight: "bold" }}
                                ></p>
                              </div>
                            </div>
                          </div>
                          <div className="form-row mb-4">
                            <div className="col-12 col-sm-4 imgageupload">
                              <p>
                                <b>Profile Picture</b>
                              </p>
                              <div className="container-exam">
                                {error && (
                                  <p className="errorMsg">File not supported</p>
                                )}
                                <div
                                  className="imgPreview"
                                  style={{
                                    background: imgPreview
                                      ? `url("${imgPreview}") no-repeat center/cover`
                                      : "#c2c7d0",
                                  }}
                                >
                                  {/* <label htmlFor="fleUpload" className="customFileUpload">
                                                                                select profile
                                                                            </label>
                                                                    <input type="file" onChange={(e)=>uploadProfile(e)} id={"fleUpload"}/> */}
                                  {!imgPreview && (
                                    <>
                                      {/* <p>Add Profile Picture</p> */}
                                      <label
                                        htmlFor="fileUpload"
                                        className="customFileUpload"
                                      >
                                        Choose file
                                      </label>
                                      <input
                                        type="file"
                                        id="fileUpload"
                                        onChange={(e) => {
                                          handleImageChange(e);
                                          uploadProfile(e);
                                        }}
                                      />
                                    </>
                                  )}
                                </div>
                                {imgPreview && (
                                  <button
                                    className="btn-exam"
                                    onClick={() => setImgPreview(null)}
                                  >
                                    Remove
                                  </button>
                                )}
                              </div>
                            </div>
                            <div className="col-12 col-sm-4 imgageupload">
                              <p>
                                <b>ID Proof</b>
                              </p>
                              <div className="container-exam">
                                {error1 && (
                                  <p className="errorMsg">File not supported</p>
                                )}
                                <div
                                  className="imgPreview"
                                  style={{
                                    background: imgPreviewId
                                      ? `url("${imgPreviewId}") no-repeat center/cover`
                                      : "#c2c7d0",
                                  }}
                                >
                                  {!imgPreviewId && (
                                    <>
                                      {/* <p>ID Proof</p> */}
                                      <label
                                        htmlFor="fileUpload1"
                                        className="customFileUpload"
                                      >
                                        Choose file
                                      </label>
                                      <input
                                        type="file"
                                        id="fileUpload1"
                                        onChange={(e) => {
                                          handleImageChangeId(e);
                                          uploadID(e);
                                        }}
                                      />
                                    </>
                                  )}
                                </div>
                                {imgPreviewId && (
                                  <button
                                    className="btn-exam"
                                    onClick={() => setImgPreviewId(null)}
                                  >
                                    Remove
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="button">
                            <button
                              type="button"
                              onClick={() => Addstudent()}
                              className="btn btn-success savebtn"
                              disabled={startExamDisable}
                            >
                              {showLoaderShow ? (
                                <span>
                                  <span
                                    class="spinner-border spinner-border-sm mr-1"
                                    role="status"
                                    aria-hidden="true"
                                  ></span>
                                  Saving...
                                </span>
                              ) : (
                                "Save"
                              )}
                            </button>
                            <Link to="/Studentlist">
                              <button type="button" className="btn">
                                Cancel
                              </button>
                            </Link>
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
export default NewStudent;
