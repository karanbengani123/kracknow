import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import '../CssFile/Student.css';
import logo from '../images/logo1.png';
import jwt_decode from "jwt-decode";


function Login() {
  const [passwordShown, setPasswordShown] = useState(false);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [startExamDisable, setStartExamDisable] = useState(false)
  const [showLoaderShow, setShowLoaderShow] = useState(false)
  const [profilePic, setProfilePic] = useState("");
  const { register } = useForm();
  const navigate = useNavigate()


  const Login = async () => {
    setStartExamDisable(true)
    setShowLoaderShow(true)
    setTimeout(() => {
      setStartExamDisable(false);
      setShowLoaderShow(false);
    }, 5000);
    if (email === '') {
      // console.log('emai')
      document.getElementsByClassName('emailError')[0].innerText = "Email is required"
      document.getElementsByClassName('statusError')[0].innerText = ""
    }
    else {
      document.getElementsByClassName('emailError')[0].innerText = ""
    }

    if (password === '') {
      // console.log('emai')
      document.getElementsByClassName('passError')[0].innerText = "Password is required"
      document.getElementsByClassName('statusError')[0].innerText = ""
    }
    else {
      document.getElementsByClassName('passError')[0].innerText = ""
    }


    const viewStudentDetails = async (tokens) => {
      // const tokens = localStorage.getItem("token");
      const decoder = jwt_decode(tokens);
      // let result = await fetch(`https://zlasvmkyg1.execute-api.ap-south-1.amazonaws.com/dev/students/${decoder.id}`,
      let result = await fetch(`http://localhost:3000/students/${decoder.id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
      result = await result.json();
      setProfilePic(result.payload.student.profilePic);
      localStorage.setItem("ProfilePic", result.payload.student.profilePic);
      // console.warn(result.payload.student.profilePic, "profilePIc")
    }

    // let item = { email, password }
    if (email !== "" && password !== "") {
      // let result = await fetch('https://zlasvmkyg1.execute-api.ap-south-1.amazonaws.com/dev/sessions/student/auth', {
      let result = await fetch('http://localhost:3000/sessions/student/auth', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
      })
        .then((result) => {
          // console.warn(result)
          // console.log('tokenn', result)
          if (result.status === 200) {
            return result.json();
          }
          else {
            document.getElementsByClassName('statusError')[0].innerText = "Username or password is incorrect"
          }
          throw result
        }).then((data) => {
          localStorage.setItem("token", data.payload.token)
          viewStudentDetails(data.payload.token);
          
          navigate("/Dashboard")

        })
      result = await result.json();
      console.warn("Login Result", result)
    }

  }

  // toggle the password view to hide or show
  const togglePassword = (e) => {
    setPasswordShown(!passwordShown);
    e.preventDefault();
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    // const { name, email } = this.state;
    // send to server with e.g. `window.fetch`
  }

  const emailSelected = () => {
    document.getElementsByClassName('emailError')[0].innerText = ""
    document.getElementsByClassName('statusError')[0].innerText = ""
  }

  const passSelected = () => {
    document.getElementsByClassName('passError')[0].innerText = ""
    document.getElementsByClassName('statusError')[0].innerText = ""

  }
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
    } else if (token === null) {
        // navigate("/")
    }
    return () => { };
  }, []);

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
                        {/* <div className="loginlogo">
                          <img src="/logo1.png"></img>
                        </div> */}
                        <div>
                          <img src={logo} className="auth-logo logo-dark mx-auto" height="160"></img>
                          <h4 className="font-size-18 mt-4">Welcome Back !</h4>
                          <p className="text-muted">Sign in to continue</p>
                        </div>

                        <div className="p-2 mt-2">
                          <form onSubmit={onFormSubmit}>

                            <div>
                              <div className="auth-form-group-custom">
                                <i className="ri-user-2-line auti-custom-input-icon"></i>
                                <input type="text" class="form-control" id="username" placeHolder="Enter mail" value={email} onChange={(e) => { setEmail(e.target.value); emailSelected() }} />

                              </div>
                              <div><p className="emailError" style={{ color: "red", fontWeight: 'bold' }}></p></div>

                            </div>


                            <div className="auth-form-group-custom mt-3">
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

                              <input type={passwordShown ? "text" : "password"}
                                // placeholder={"Password"}
                                class="form-control" placeHolder="Enter password" value={password} onChange={(e) => { setPassword(e.target.value); passSelected() }} />
                            </div>
                            <div><p className="passError" style={{ color: "red", fontWeight: 'bold' }}></p></div>
                            <div><p className="statusError" style={{ color: "red", fontWeight: 'bold' }}></p></div>

                            {/* {passerr && <div className="validation1">{passerr}</div>} */}
                            <div className="mt-4 text-center">
                              <button className="btn btn-primary w-md waves-effect waves-light" type="submit" onClick={() => Login()} disabled={startExamDisable}>

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
                                    "Log In"
                                  )
                                }
                              </button>
                            </div>

                            <div className="mt-4 text-center">
                              <Link to="/ForgotPassword"><a href="auth-recoverpw.html" className="text-muted"><i class="mdi mdi-lock me-1"></i>Forgot your password?</a></Link>
                            </div>
                          </form>
                        </div>
                        <div className="mt-3 text-center">
                          <p>Don't have an account ? <Link to="/Signup"><a href="auth-register.html" className="fw-medium text-primary">Register</a></Link> </p>

                        </div>
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