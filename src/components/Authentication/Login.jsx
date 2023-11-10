import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../CssFile/Student.css';
import logo from '../Images/logo1.png';
import { useForm } from "react-hook-form";
import Environment from "../Admin/Environment";
import { useDispatch } from "react-redux";


function Login() {
  const [passwordShown, setPasswordShown] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailerr, setEmailerr] = useState('');
  const [passerr, setPasserr] = useState('');

  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState("")
  const [showSuccess, setShowSuccess] = useState(false);
  const [startExamDisable, setStartExamDisable] = useState(false)
  const [showLoaderShow, setShowLoaderShow] = useState(false)

  const dispatch = useDispatch();

  const togglePassword = (e) => {
    setPasswordShown(!passwordShown);
    e.preventDefault();
  };

  // const handleUsernameChange = (e) => {
  //   setUsererr('');
  //   setUsername(e.target.value);
  // }

  // const handlePasswordChange = (e) => {
  //   setPasserr('');
  //   setPassword(e.target.value);
  // }

  // const {register,handleSubmit,formState:{errors},}=useForm();
  let navigate = useNavigate()


  async function Login() {
    setStartExamDisable(true)
    setShowLoaderShow(true)
    setTimeout(() => {
      setStartExamDisable(false);
      setShowLoaderShow(false);
    }, 5000);

    if (email === '') {
      document.getElementsByClassName('emailError')[0].innerText = "Email is required"
      document.getElementsByClassName('statusError')[0].innerText = ""
    }
    else {
      document.getElementsByClassName('emailError')[0].innerText = ""
    }

    if (password === '') {
      document.getElementsByClassName('passError')[0].innerText = "Password is required"
      document.getElementsByClassName('statusError')[0].innerText = ""
    }
    else {
      document.getElementsByClassName('passError')[0].innerText = ""
    }

    // let item = { email, password }
    if (email !== "" && password !== "") {
      let result = await fetch(`${Environment.server_url}/sessions/admin/auth`, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
      })
        .then((result) => {
          if (result.status === 200) {
            setShowSuccess(true);
            return (result.json());
          }
          else {
            setShow(true);
            document.getElementsByClassName('statusError')[0].innerText = "Username or password is incorrect"
            return (result.json());
          }
        }).then((result) => {
          setErrorMessage(result.message)
          localStorage.setItem("user", JSON.stringify(email))
          localStorage.setItem("token", JSON.stringify(result.payload.token))
          dispatch({ type: "setRole", value: result.payload.role });
          {
            result.payload.role === "SUPER_ADMIN" &&
            setTimeout(() => {
              navigate("/Dashboard")
            }, 1000);
          }
          {
            result.payload.role === "ADMIN" &&
            setTimeout(() => {
              navigate("/Dashboard")
            }, 1000);
          }
          {
            result.payload.role === "EXAM_CREATOR" &&
            setTimeout(() => {
              navigate("/Exam")
            }, 1000);
          }
          {
            result.payload.role === "QUESTION_CREATOR" &&
            setTimeout(() => {
              navigate("/Question")
            }, 1000);
          }
          
        })

      // result = await result.json();
      // console.warn("Login Result", result)





      // if (email !== '') {
      //   //check other conditions
      //   if (email === 'admin@gmail.com') {
      //     if (password === 'admin123') {
      //       localStorage.setItem("user", JSON.stringify(item))
      //       localStorage.setItem("token", JSON.stringify(result.payload.token))
      //       navigate("/Dashboard")
      //     } else {
      //       setPasserr(emailerr)
      //     }
      //   } else {
      //     setEmailerr("email or password is incorrect")
      //   }
      // } else {
      //   setEmailerr(result.payload.email.message)
      // }

      // if (password !== '') {
      //   if (password.length < 4) {
      //     console.warn(password.length)
      //     setPasserr = "Password must be more than 4 characters";
      //   } else if (password.length > 10) {
      //     setPasserr = "Password cannot exceed more than 10 characters";
      //   }
      // } else {
      //   setEmailerr("useremail or password is incorrect")
      // }
    }
  }

  const emailSelected = () => {
    document.getElementsByClassName('emailError')[0].innerText = ""
    document.getElementsByClassName('statusError')[0].innerText = ""

  }

  const passSelected = () => {
    document.getElementsByClassName('passError')[0].innerText = ""
    document.getElementsByClassName('statusError')[0].innerText = ""

  }

  const onFormSubmit = (e) => {
    e.preventDefault();
    // const { name, email } = this.state;
    // send to server with e.g. `window.fetch`
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
    } else if (token === null) {
      navigate("/")
    }
    return () => { };
  }, []);


  if (show === true) {
    setTimeout(() => setShow(false), 5000);
  }
  if (showSuccess === true) {
    setTimeout(() => setShowSuccess(false), 5000);
  }

  return (
    <div>
      <div className="container-fluid p-0">
        <div className="row g-0">
          <div className="col-lg-4">
            <div className="authentication-page-content p-4 d-flex align-items-center min-vh-100">
              <div className="w-100">
                <div className="row justify-content-center">
                  <div className="col-lg-9">
                    <div>
                      <div className="text-center">
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
                        <div>
                          <img src={logo} className="auth-logo logo-dark mx-auto" height="160"></img>
                          <h4 className="font-size-18 mt-4">Welcome Back !</h4>
                          <p className="text-muted">Sign in to continue</p>
                        </div>
                        <div className="p-2 mt-2">
                          <form onSubmit={onFormSubmit}>
                            <div className="mb-3 auth-form-group-custom mb-4">
                              <i className="ri-user-2-line auti-custom-input-icon"></i>
                              <input type="text" class="form-control" name="userName" id="username" placeHolder="Enter email" onChange={(e) => { setEmail(e.target.value); emailSelected() }}
                              />
                            </div>
                            <div><p className="emailError" style={{ color: "red", fontWeight: 'bold' }}></p></div>
                            {/* {emailerr && <div className="validation">{emailerr}</div>} */}
                            <div className="auth-form-group-custom">
                              <i className="ri-lock-2-line auti-custom-input-icon"></i>
                              <i
                                className={
                                  passwordShown ? "fas fa-eye-slash" : "fa fa-eye"
                                }
                                onClick={togglePassword}
                                style={{
                                  position: "absolute",
                                  right: "30px",
                                  top: "10px",
                                  color: "#ced4da",
                                  fontSize: "20px",
                                  cursor: "pointer",
                                }}
                              />
                              <input type={passwordShown ? "text" : "password"} class="form-control" name="password" id="userpassword" placeHolder="Enter password" onChange={(e) => { setPassword(e.target.value); passSelected() }}
                              />
                            </div>
                            <div><p className="passError" style={{ color: "red", fontWeight: 'bold' }}></p></div>
                            {/* {passerr && <div className="validation1">{passerr}</div>} */}
                            <div className="mt-5 text-center">
                              <button class="btn btn-primary w-md waves-effect waves-light" type="submit" onClick={Login} disabled={startExamDisable}>
                                {showLoaderShow ?
                                  (
                                    <span class="btn-primary">
                                      <span class="spinner-border spinner-border-sm mr-1" role="status" aria-hidden="true"></span>
                                      Loading...
                                    </span>
                                    // <span style={{textAlign:"center"}}>Loading<span className="spinner-border spinner-border-sm spinnerLoader ml-1 mr-1" style={{ width: "0.9rem", height: "0.9rem",textAlign:"center" }} role="status" aria-hidden="true"></span></span>
                                  )
                                  :
                                  (
                                    "Login"
                                  )
                                }
                              </button>
                              {/* <input class="submit_on_enter" type="text" name="q" placeholder="Search..."></input> */}
                            </div>
                            <div className="mt-4 text-center">
                              <Link to="/ForgotPassword"><a href="auth-recoverpw.html" className="text-muted"><i class="mdi mdi-lock me-1"></i> Forgot your password?</a></Link>
                            </div>
                          </form>
                        </div>
                        {/* <div className="mt-3 text-center">
                          <p>Don't have an account ? <Link to="/Signup"><a href="auth-register.html" className="fw-medium text-primary"> Register </a></Link> </p>

                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div class="authentication-bg">
              <div class="bg-overlay"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Login
