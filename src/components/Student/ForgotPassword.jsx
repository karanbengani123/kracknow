import React from "react";
import { Link } from 'react-router-dom';

function ForgotPassword() {
    return (
        <div class="container-fluid p-0">
            <div class="row g-0">
                <div class="col-lg-4">
                    <div class="authentication-page-content p-4 d-flex align-items-center min-vh-100">
                        <div class="w-100">
                            <div class="row justify-content-center">
                                <div class="col-lg-9">
                                    <div>
                                        <div class="text-center">
                                            <div>
                                                <a href="index.html" class="">
                                                </a>
                                            </div>
                                            <h4 class="font-size-18 mt-4">Reset Password</h4>
                                        </div>
                                        <div class="p-2 mt-5">
                                            <div class="alert alert-success mb-4" role="alert">
                                                Enter your Email and instructions will be sent to you!
                                            </div>
                                            <form class="">
                                                <div class="auth-form-group-custom mb-4">
                                                    <i class="ri-mail-line auti-custom-input-icon"></i>
                                                    
                                                    <input type="email" class="form-control" id="useremail" placeholder="Enter email" />
                                                </div>
                                                <div class="mt-4 text-center">
                                                    <button class="btn btn-primary w-md waves-effect waves-light" type="submit">Reset</button>
                                                </div>
                                            </form>
                                        </div>
                                        <div class="mt-5 text-center">
                                            <p>Don't have an account ? <Link to="/" class="fw-medium text-primary"> Log in</Link></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-8">
                    <div class="authentication-bg">
                        <div class="bg-overlay"></div>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default ForgotPassword