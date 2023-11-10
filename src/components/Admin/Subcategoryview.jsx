import React, { useState, useEffect } from "react";
import '../CssFile/Student.css';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import SideNav from './SideNav';
import Environment from "./Environment";


function Subcategoryview() {
    const [id, setId] = useState()
    const [label, setLabel] = useState()
    const [status, setStatus] = useState()



    const params = useParams()
    const navigate = useNavigate()


    useEffect(() => {
        viewSubCategoryDetails();
    }, [])

    const viewSubCategoryDetails = async () => {
        let result = await fetch(`${Environment.server_url}/categories/subcategory/${params.uuid}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        result = await result.json();
        console.warn("subcategoryview", result)

        setId(result.payload.subCategory.label)
        {
            result.payload.subCategory.SubCategory_SubCategories.map(item =>
                <>
                    <span>{setLabel(item.label)}</span>
                    <span>{setStatus(item.status)}</span>
                </>
            )
        }
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
                                        <h4 className="mb-sm-0">Sub Category</h4>
                                        <div className="page-title-right">
                                            <ol className="breadcrumb m-0">
                                                <Link to="/Subcategory" className="breadcrumb-item">Sub Category List</Link>
                                                <li className="breadcrumb-item active">Sub Category</li>
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

                                                </div>
                                                <div className="col-sm-8">
                                                    <div className="text-sm-end">
                                                        <Link to={"/UpdateSubCategory/" + params.uuid} type="button" className="btn mb-2 me-2 btn btn-success">Edit</Link>
                                                    </div>
                                                </div>
                                            </div>


                                            <div className="row">
                                                <div className="col-sm-4">
                                                    <h6><b>Parent Category</b></h6>
                                                    <p>{id}</p>
                                                </div>
                                                <div className="col-sm-4">
                                                    <h6><b>Name</b></h6>
                                                    <p>{label}</p>
                                                </div>
                                                <div className="col-sm-4">
                                                    <h6><b>Status</b></h6>
                                                    <span>{status ? <span className="badge bg-success">Active </span> : <span className="badge bg-danger">In-active</span>}</span>
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

export default Subcategoryview
