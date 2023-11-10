import '../CssFile/Student.css';
import { Link, useParams } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import Header from './Header';
import Footer from './Footer';
import SideNav from './SideNav';
import Environment from './Environment';


function Categoryview() {
    const [label, setLabel] = useState()
    const [status, setStatus] = useState()

    const params = useParams()


    useEffect(() => {
        viewCategoryDetails();
    }, [])

    const viewCategoryDetails = async () => {
        let result = await fetch(`${Environment.server_url}/categories/category/${params.uuid}`,
            {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
        result = await result.json();
        setLabel(result.payload.category.label);
        setStatus(result.payload.category.status);
    }

    return (
        <>
            <Header />
            <div className="content-wrapper admin-body">
                <section className="content">
                    <div className="container-fluid">
                        <div className="page-content">
                            <div className="row">
                                <div className="col-12">
                                    <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                        <h4 className="mb-sm-0">Category</h4>
                                        <div className="page-title-right">
                                            <ol className="breadcrumb m-0">
                                                <Link to="/Category" className="breadcrumb-item">Category List</Link>
                                                <li className="breadcrumb-item active">Category</li>
                                            </ol>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-sm-4">
                                                    {/* <div className="search-box me-2 mb-2 d-inline-block">
                                                        <div className="position-relative">
                                                            <label for="search-bar-0" className="search-label"><span id="search-bar-0-label" className="sr-only">Search this table</span><input id="search-bar-0" type="text" aria-labelledby="search-bar-0-label" className="form-control" placeholder="Search" /></label>
                                                            <i className="bx bx-search-alt search-icon">
                                                            </i>
                                                        </div>
                                                    </div> */}
                                                </div>
                                                <div className="col-sm-8">
                                                    <div className="text-sm-end">
                                                        <Link to={"/CategoryEdit/" + params.uuid} type="button" className="btn mb-2 me-2 btn btn-success">Edit</Link>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <h6><b>Name</b></h6>
                                                    <p>{label}</p>
                                                </div>
                                                <div className="col-sm-3">
                                                    <h6><b>Status</b></h6>
                                                    <span >{status ? <span className="badge bg-success"> Active </span> : <span className="badge bg-danger"> Inactive </span>}</span>
                                                </div>
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

export default Categoryview