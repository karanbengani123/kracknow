import React from "react";
import '../CssFile/Student.css';
import '../CssFile/NewStudent.css';
import { Link } from 'react-router-dom';
import SideNav from "./SideNav";
import Footer from "./Footer";
import Header from "./Header";
import {useForm} from "react-hook-form";

function Settingadd() {
    const {register,handleSubmit,formState:{errors},}=useForm();

    const onSubmit=()=>{
        console.log("data");
    }
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
                                    <h4 className="mb-sm-0">New Setting</h4>
                                    <div className="page-title-right">
                                        <ol className="breadcrumb m-0">
                                            <Link to="/Setting" className="breadcrumb-item">Setting List</Link>
                                            <li className="breadcrumb-item active">New Setting</li>
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
                                            <form onSubmit={handleSubmit(onSubmit)}>
                                                <div className="form-row mb-4">
                                                    <div className="col-3">
                                                        <p><b>Key<span class="required text-danger">*</span></b></p>
                                                        <input type="text" name="userName" className="form-control" 
                                                        {...register("userName",{required : {value : true, message:"This field is required."}})} />
                                                        {errors.userName && <p className="errorText">{errors.userName.message}</p>}
                                                    </div>
                                                    <div className="col-3">
                                                        <p><b>Value</b></p>
                                                        <input type="text" name="value" className="form-control" 
                                                        {...register("value",{required : {value : true, message:"This field is required."}})} />
                                                        {errors.value && <p className="errorText">{errors.value.message}</p>}
                                                    </div>
                                                </div>
                                        <div className="button">
                                            <button type="submit" class="btn btn-success savebtn">Save</button>
                                            <Link to="/Setting"> <button type="button" class="btn">Cancel</button></Link>
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
        <SideNav/>
        <Footer/>
        </>
        
    )
}
export default Settingadd