import React, { useState } from "react";
import { Link } from 'react-router-dom';


function Signup() {

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const[mobile,setMobile]=useState('');
    const[profile,setProfile]=useState('')

    
    const [emailerr, setEmailerr] = useState('');
    const [usernameerr, setUsernameerr] = useState('');
    const [passworderr, setPassworderr] = useState('');
    const[mobileerr,setmobileerr]=useState('');
    const[profileerr,setProfileerr]=useState('');

    const HandleEmailChange = (e) => {
        setEmailerr('');
        setEmail(e.target.value);
    }
    const HandleUsernameChange = (e) => {
        console.warn(e.target.value.length)
        setUsernameerr('');
        setUsername(e.target.value);
    }
    const HandlePasswordChange = (e) => {
        setPassworderr('');
        setPassword(e.target.value);
    }
    const HandleMobileChange=(e)=>
    {
        setmobileerr('');
        setMobile(e.target.value);
    }

    const HandleProfileChange=(e)=>
    {
        setProfileerr('');
        setProfile(e.target.value);
    }
    const HandleOnSubmit = (e) => {
        e.preventDefault();

        if (email !== '') {
        }
        else {
            setEmailerr("Provide Correct Email ")
        }
        if (username !== '') {
        } else {
            setUsernameerr("Provide One Username")
        }
        if (password !== '') {
        } else {
            setPassworderr("Please Provide Password")
        }
        if(mobile !=='')
        {

        }else{
            setmobileerr("Please Provide A Number");
        }
        if(profile !=='')
        {

        }else{
            setProfileerr("Please Provide The Profile Photo");
        }
    }
    return (
        <div className="container-fluid p-0">
            <div className="row g-0">
                <div className="col-sm-4">
                    <div className="authentication-page-content p-4 d-flex align-items-center min-vh-100">
                        <div className="w-100">
                            <div className="row justify-content-center">
                                <div className="col-sm-9">
                                    <div>
                                        <div className="text-center">
                                            <div>
                                                <a className="">
                                                <img src="./logo1.png" alt="" height="60" className="auth-logo logo-dark mx-auto" />
                                                </a>
                                                <a className="">
                                                    <h3><b>LEARN AND EARN</b></h3>
                                                </a>
                                                <p className="font-size-18 mt-2">Register account</p>

                                            </div>
                                            {usernameerr && <div>{usernameerr}</div>}
                                            {emailerr && <div>{emailerr}</div>}
                                            {passworderr && <div>{passworderr}</div>}
                                            {mobileerr&&<div>{mobileerr}</div>}
                                            {profileerr &&<div>{profileerr}</div>}
                                            <div className="p-2 mt-5">
                                                <form class="" onSubmit={HandleOnSubmit} >
                                                    <div className="auth-form-group-custom mb-2">
                                                        <i className="ri-user-2-line auti-custom-input-icon"></i>
                                                        <label htmlFor="firstname">First Name</label>
                                                        <input type="text" class="form-control" id="username" placeHolder="Enter Firstname" onChange={HandleUsernameChange} value={username} />
                                                    </div>
                                                    <div className="auth-form-group-custom mb-2">
                                                        <i className="ri-user-2-line auti-custom-input-icon"></i>
                                                        <label htmlFor="lastname">Last Name</label>
                                                        <input type="text" class="form-control" id="username" placeHolder="Enter Lastname"  />
                                                    </div>
                                                    <div className="auth-form-group-custom mb-2">
                                                        <i className="ri-image-line auti-custom-input-icon"></i>

                                                        <label htmlFor="photo">Profile Photo</label>
                                                        <input type="file" name="photo" className="form-control form-control-prepended" id="exampleFormControlFile1" placeHolder="Enter ProfilePhoto" onChange={HandleProfileChange} value={profile}/>
                                                        {/* <input type="text" class="form-control" id="username" placeHolder="Enter ProfilePhoto" /> */}
                                                    </div>
                                                    <div className="auth-form-group-custom mb-2">
                                                        <i className="ri-smartphone-line auti-custom-input-icon"></i>
                                                        <label htmlFor="mobile">Mobile Number</label>
                                                        <input type="number" class="form-control" id="username" placeHolder="Enter MobileNumber" onChange={HandleMobileChange} value={mobile}/>
                                                    </div>
                                                     
                                                    <div className="auth-form-group-custom mb-2">
                                                        <i className="ri-mail-line auti-custom-input-icon"></i>
                                                        <label htmlFor="useremail">Email</label>
                                                        <input type="email" class="form-control" id="useremail" placeHolder="Enter email" onChange={HandleEmailChange} value={email} />
                                                    </div>
                                                    <div className="auth-form-group-custom mb-2">
                                                        <i className="ri-lock-2-line auti-custom-input-icon"></i>
                                                        <label htmlFor="userpassword">Password</label>
                                                        <input type="password" class="form-control" id="userpassword" placeHolder="Enter password" onChange={HandlePasswordChange} value={password} />
                                                    </div>

                                                    <div className="text-center">
                                                        <button onClick={HandleOnSubmit} class="btn btn-primary w-md waves-effect waves-light" type="submit">Register</button>
                                                    </div>

                                                    <div className="mt-4 text-center">
                                                        <p className="mb-0">By registering you agree to the  <a class="text-primary">Terms of Use</a></p>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="mt-4 text-center">
                                                <p>Already have an account ? <Link to="/" className="fw-medium text-primary"> Login</Link></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-8">
                    <div class="authentication-bg">
                        <div class="bg-overlay"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Signup