import React,{useState,useEffect} from "react";
import { Link } from 'react-router-dom';
import Environment from "../Admin/Environment";

function ForgotPassword() {
    const [email,setEmail] = useState()
    
    async function ForgetPassword() {
        let item = {email}
        let result = await fetch(`${Environment.server_url}/sessions/admin/forgetpassword`, {
          method: 'PUT',
          body: JSON.stringify(item),
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
        });
    }
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
                                                <a className="">
                                                    <img src="./logo1.png" alt="" height="60" className="auth-logo logo-dark mx-auto" />
                                                    <img src="dist/assets/images/logo-light.png" alt="" height="20" className="auth-logo logo-light mx-auto" />
                                                </a>
                                            </div>
                                            <h4 className="font-size-18 mt-4">Reset Password</h4>
                                        </div>
                                        <div className="p-2 mt-5">
                                            <div className="alert alert-success mb-4" role="alert">
                                                Enter your Email and instructions will be sent to you!
                                            </div>
                                            <form className="">
                                                <div className="auth-form-group-custom mb-4">
                                                    <i className="ri-mail-line auti-custom-input-icon"></i>
                                                    {/* <label for="useremail">Email</label> */}
                                                    <input type="email" className="form-control" id="useremail" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                                                </div>
                                                <div className="mt-4 text-center">
                                                    <button className="btn btn-primary w-md waves-effect waves-light" type="button" onClick={ForgetPassword}>Reset</button>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="mt-5 text-center">
                                            <p>Don't have an account ? <Link to="/" className="fw-medium text-primary"> Log in</Link></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-8">
                    <div className="authentication-bg">
                        <div className="bg-overlay"></div>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default ForgotPassword