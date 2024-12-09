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
    setStartExamDisable(true);
    setShowLoaderShow(true);

    // Clear previous error messages
    setEmailerr('');
    setPasserr('');
    setErrorMessage('');

    let hasError = false;

    if (email === '') {
        setEmailerr("Email is required");
        hasError = true; // Set error flag
    }

    if (password === '') {
        setPasserr("Password is required");
        hasError = true; // Set error flag
    }

    if (hasError) {
        setShowLoaderShow(false);
        setStartExamDisable(false);
        return; // Stop execution if there are errors
    }

    // Proceed with the login API call if both fields are filled
    let result = await fetch(`${Environment.server_url}/sessions/admin/auth`, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
    });

    if (result.status === 200) {
        const data = await result.json();
        setShowSuccess(true);
        localStorage.setItem("user", JSON.stringify(email));
        localStorage.setItem("token", JSON.stringify(data.payload.token));
        localStorage.setItem("role", JSON.stringify(data.payload.role));

        // localStorage.setItem("role",JSON.stringify(data.payload))
        dispatch({ type: "setRole", value: data.payload.role });
        // navigate(data.payload.role === "SUPER_ADMIN" || data.payload.role === "ADMIN" ? "/Dashboard" : "/Exam");
        navigate(
          data.payload.role === "SUPER_ADMIN" || data.payload.role === "ADMIN" 
            ? "/Dashboard" 
            : data.payload.role === "QUESTION_CREATOR" 
              ? "/Question" 
              : "/Exam"
        );
        
    } else {
        setShow(true);
        const errorData = await result.json();
        setErrorMessage(errorData.message);
        if (errorData.payload.password) {
          setPasserr(errorData.payload.password.message); // Set password error message
        }
    }

    setShowLoaderShow(false);
    setStartExamDisable(false);
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
                        <form onSubmit={(e) => { e.preventDefault(); Login(); }}>
                          <div className="auth-form-group-custom">
                              <i className="ri-user-2-line auti-custom-input-icon"></i>
                              <input
                                  type="text"
                                  className="form-control"
                                  name="userName"
                                  id="username"
                                  placeholder="Enter email"
                                  onChange={(e) => { setEmail(e.target.value); setEmailerr(''); }}
                              />
                          </div>
                          <p className="emailError" style={{ color: "red", fontWeight: 'bold' }}>{emailerr}</p>

                          <div className="auth-form-group-custom">
                              <i className="ri-lock-2-line auti-custom-input-icon"></i>
                              <i
                                  className={passwordShown ? "fas fa-eye-slash" : "fa fa-eye"}
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
                              <input
                                  type={passwordShown ? "text" : "password"}
                                  className="form-control"
                                  name="password"
                                  id="userpassword"
                                  placeholder="Enter password"
                                  onChange={(e) => { setPassword(e.target.value); setPasserr(''); }}
                              />
                          </div>
                          <p className="passError" style={{ color: "red", fontWeight: 'bold' }}>{passerr}</p>

                          <div className="mt-4 text-center">
                              <button
                                  className="btn btn-primary w-md waves-effect waves-light"
                                  type="submit"
                                  disabled={startExamDisable}
                              >
                                  {showLoaderShow ? (
                                      <span className="btn-primary">
                                          <span className="spinner-border spinner-border-sm mr-1" role="status" aria-hidden="true"></span>
                                          Loading...
                                      </span>
                                  ) : (
                                      "Login"
                                  )}
                              </button>
                          </div>
                          <div className="mt-4 text-center">
                              <Link to="/ForgotPassword" className="text-muted">
                                  <i className="mdi mdi-lock me-1"></i> Forgot your password?
                              </Link>
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
