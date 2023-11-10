import React from "react";
import '../CssFile/Student.css';
import '../CssFile/NewStudent.css';
import { Link } from 'react-router-dom';
import SideNav from "./SideNav";
import Footer from "./Footer";
import Header from "./Header";

function NewAdmin() {
    return (
        <>
        <Header/>
        <div className="content-wrapper admin-body">
            <section className="content">
                <div className="container-fluid">
                    <div className="page-content">
                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                    <h4 className="mb-sm-0">Admin List</h4>
                                    <div className="page-title-right">
                                        <ol className="breadcrumb m-0">
                                           <Link to="/Admin" className="breadcrumb-item">Admin</Link>
                                            <li className="breadcrumb-item active">Admin list</li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="form">
                                            <form>
                                                <div className="form-row mb-4">
                                                    <div className="col-12 col-sm-4">
                                                        <p><b>Name</b><span class="required text-danger">*</span></p>
                                                        <input type="text" class="form-control" />
                                                    </div>
                                                    <div className="col-12 col-sm-4">
                                                        <p><b>Icon</b></p>
                                                        <div className="choose-file">
                                                            <input type="file" required className="form-control form-control-prepended" id="exampleFormControlFile1" />
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-sm-4">
                                                        <p><b>Status</b><span class="required text-danger">*</span></p>
                                                        <select className="form-select form-select mb-2 form-control valid" aria-label="Default select example">
                                                            <option selected>Active</option>
                                                            <option value="1">In-Active</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="button">
                                            <button type="button" class="btn btn-success savebtn">Save</button>
                                            <Link to="/Admin"> <button type="button" class="btn">Cancel</button></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        <SideNav/>
        <Footer/>
        </>
    )
}
export default NewAdmin