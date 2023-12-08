import React, { useState, useEffect } from "react";

import Select from 'react-select';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { baseurlwallet } from "../Student/BaseUrl";


// const cities = [
//   { label: 'Kolkata', value: 'Kolkata' },
//   { label: 'Bhubaneswar', value: 'Bhubaneswar' },
//   { label: 'Bangalore', value: 'Bangalore' },
//   { label: 'Gujrat', value: 'Gujrat' },
//   { label: 'Mumbai', value: 'Mumbai' },
//   { label: 'Pune', value: 'Pune' },
// ];

function Signup() {

  const [city, setCity] = useState([]);
  const [selectCity, setSelectCity] = useState('');

  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [profilePic, setProfilePic] = useState()
  const [password, setPassword] = useState()
  const [mobileNumber, setMobileNumber] = useState()
  const [email, setEmail] = useState()
  const [idProof, setIdProof] = useState()
  const [id, setId] = useState()

  const [firstnameErr, setFirstNameErr] = useState('')
  const [lastnameErr, setLastNameErr] = useState('')
  const [MobileNumberErr, setMobileNumberErr] = useState('')
  const [emailErr, setEmailErr] = useState('')
  const [cityErr, setCityErr] = useState('')
  const [passwordErr, setPasswordErr] = useState('')

  useEffect(() => {
    getCities();
  }, [])


  const getCities = async () => {
    let result = await fetch(`${baseurlwallet}/sessions/cities`, {
    // let result = await fetch(`http://localhost:3000/sessions/cities`, {
      method: "GET",
      // headers: {
      //   "Content-Type": "application/json",
      //   Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      // }
    });
    result = await result.json();
    setCity(result.payload.cities);

  }


  const navigate = useNavigate()

  const Signup = async () => {
    console.warn(firstName, lastName, profilePic, idProof, mobileNumber, email, password, selectCity);

    // const catdata = await fetch("http://localhost:3000/sessions/student/register", {
    const catdata = await fetch(`${baseurlwallet}/sessions/student/register`, {

      method: "POST",
      body: JSON.stringify({ firstName, lastName, profilePic, idProof, mobileNumber, email, password, city: selectCity || null }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(catdata => {
        console.warn(catdata)
        if (catdata.status === 200) {
          // toast.success("created successfully")
          navigate("/Login")
        }
        if (catdata.response = 200) {
          return catdata.json();

        } else {
          throw new Error(catdata);
        }

      })
      .then(catdata => {
        if (!firstName == '') {
          if (email !== '' || !mobileNumber == '' || !password == '' || !city == '' || !firstName == '' || !lastName == '') {

          }
        } else {
          setFirstNameErr(catdata.payload.firstName.message)
        } if (!lastName == '') {

        } else {
          setLastNameErr(catdata.payload.lastName.message)
        }
        if (!email == '') {

        } else {
          setEmailErr(catdata.payload.email.message);
        }
        if (!mobileNumber == '') {
        } else {
          setMobileNumberErr(catdata.payload.mobileNumber.message)

        }
        if (!password == '') {
        } else {
          setPasswordErr(catdata.payload.password.message);
        }
        if (!selectCity == '') {

        } else {
          setCityErr(catdata.payload.city.message)
        }

      })
  }

  const [passwordShown, setPasswordShown] = useState(false);
  const {
    register,
  } = useForm();


  const passwordOne = register("passwordone", {
    required: "Please Fill The Password",
    minLength: {
      value: 6,
      message: "Password must have at least 6 characters",
    },
  });

  const togglePassword = (e) => {
    // toggle the password view to hide or show
    setPasswordShown(!passwordShown);
    e.preventDefault();
  };

  return (
    <div className="container-fluid p-0">
      <div className="row g-0">
        <div className="col-lg-4">
          <div className="authentication-page-content p-4 d-flex align-items-center min-vh-100">
            <div className="w-100">
              <div className="row justify-content-center">
                <div className="col-lg-9">
                  <div>
                    <div className="text-center">
                      <div>
                        <h4 className="font-size-18 mb-4">Register Account</h4>

                      </div>

                      <div className="p-2 mt-0">
                        <form >

                          <div className="auth-form-group-custom ">
                            <i className="ri-user-2-line auti-custom-input-icon"></i>

                            <input type="text" name="UserName" class="form-control" id="username" placeHolder="Enter firstname"
                              value={firstName} onChange={(e) => { setFirstName(e.target.value) }} />
                          </div>
                          <div className="mt-0">

                            {<div><p className="ErrorMessage">{firstnameErr}</p></div>}
                          </div>

                          <div className="auth-form-group-custom mt-4">
                            <i className="ri-user-2-line auti-custom-input-icon"></i>

                            <input type="text" name="UserName" class="form-control" id="username" placeHolder="Enter lastname"
                              value={lastName} onChange={(e) => { setLastName(e.target.value) }} />
                          </div>
                          {<div><p className="ErrorMessage">{lastnameErr}</p></div>}
                          <div className="auth-form-group-custom mt-4">
                            <i className="ri-mail-line auti-custom-input-icon"></i>

                            <input type="email" name="FirstName" class="form-control" placeHolder="Enter email"
                              value={email} onChange={(e) => { setEmail(e.target.value) }} />
                          </div>
                          {<div><p className="ErrorMessage">{emailErr}</p></div>}

                          <div className="auth-form-group-custom mt-4">
                            <i className="ri-smartphone-line auti-custom-input-icon"></i>

                            <input type="tel" name="Phone" class="form-control" id="userpassword" placeHolder="Enter mobile number"
                              value={mobileNumber} onChange={(e) => { setMobileNumber(e.target.value) }} />
                          </div>
                          {<div><p className="ErrorMessage">{MobileNumberErr}</p></div>}
                          <div className="auth-form-group-custom mt-4">
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
                            <input
                              type={passwordShown ? "text" : "password"}
                              // placeholder={"Password"}

                              {...passwordOne} name="Pass" class="form-control" id="userpassword" placeHolder="Enter password"
                              value={password} onChange={(e) => { setPassword(e.target.value) }} />
                          </div>
                          {<div><p className="ErrorMessage">{passwordErr}</p></div>}
                          {/* <div className="auth-form-group-custom mb-4">
                            <i className="ri-lock-2-line auti-custom-input-icon"></i>

                            <input type="password" name="CPass" class="form-control" id="userpassword" placeHolder="Confirm password"
                              />
                          </div> */}
                          {/* <div className="auth-form-group-custom mb-4">
                            
                            <Select
                            placeholder="Enter your city"
                              options={cities}
                               />
                            
                          </div> */}
                          <div className="auth-form-group-custom mt-4">
                            {/* <p><b>City<span class="required text-danger">*</span></b></p> */}
                            <i className="ri-home-4-line auti-custom-input-icon"></i>
                            <select
                              class="form-control"
                              aria-label="Default select example"
                              onChange={(e) => {
                                setSelectCity(e.target.value)

                              }}
                            >
                              <option value={''} >Select city</option>

                              {
                                city.map((item, key) =>
                                  <option value={item.uuid} key={key}>{item.city}</option>

                                )
                              }
                            </select>
                          </div>
                          {<div><p className="ErrorMessage">{cityErr}</p></div>}
                          <div className="text-center mt-4">
                            <p className="mb-0">By registering you agree to the<br></br> <a class="text-primary">Terms of Use</a></p>
                          </div>

                          <div className="text-center mt-3">
                            <button type="button" onClick={() => Signup()} class="btn btn-primary w-md waves-effect waves-light" >Register</button>
                          </div>

                        </form>
                      </div>

                      <div className="text-center mt-3">
                        <p>Already have an account ? <Link to="/" className="fw-medium text-primary"> Login</Link></p>
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
  )
}
export default Signup