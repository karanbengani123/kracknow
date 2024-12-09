import React, { useState, useEffect } from "react";
import '../CssFile/Student.css';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import SideNav from './SideNav';
import Environment from "./Environment";

function Bundle() {
    const [bundle, setBundle] = useState([]);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        getBundles();
    }, []);

    // To Get The Bundle List
    const getBundles = async () => {
        try {
            const result = await fetch(`http://localhost:3000/common/bundle`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
            const data = await result.json();
            setBundle(data.payload.lists.rows);
        } catch (error) {
            setShowError(true);
            setErrorMessage("Error fetching bundles.");
        }
    };

    const deleteBundle = async (uuid) => {
        if (window.confirm("Delete Bundle?")) {
            try {
                const response = await fetch(`http://localhost:3000/common/bundle`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                    },
                    body: JSON.stringify({ id: uuid }) // Sending UUID in the body
                });

                const data = await response.json();

                if (response.ok) {
                    setShowSuccess(true);
                    setSuccessMessage("Bundle deleted successfully!");
                    getBundles();
                } else {
                    setShowError(true);
                    setErrorMessage(data.message || "Failed to delete bundle.");
                }
            } catch (error) {
                console.error("Error deleting bundle:", error);
                setShowError(true);
                setErrorMessage("An error occurred while deleting the bundle.");
            }
        }
    };

    // Auto-hide messages
    useEffect(() => {
        if (showError) {
            const timer = setTimeout(() => setShowError(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [showError]);

    useEffect(() => {
        if (showSuccess) {
            const timer = setTimeout(() => setShowSuccess(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [showSuccess]);

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
                                        <h4 className="mb-sm-0">Bundle List</h4>
                                    </div>
                                    {showError && (
                                        <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                            <strong className="text-danger">{errorMessage}</strong>
                                            <button type="button" className="btn-close" onClick={() => setShowError(false)}></button>
                                        </div>
                                    )}
                                    {showSuccess && (
                                        <div className="alert alert-success alert-dismissible fade show" role="alert">
                                            <strong className="text-success">{successMessage}</strong>
                                            <button type="button" className="btn-close" onClick={() => setShowSuccess(false)}></button>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-sm-4">
                                                    <div className="search-box me-2 mb-2 d-inline-block">
                                                        <div className="position-relative">
                                                            <label htmlFor="search-bar-0" className="search-label">
                                                                <span id="search-bar-0-label" className="sr-only">Search this table</span>
                                                                <input id="search-bar-0" type="text" aria-labelledby="search-bar-0-label" className="form-control" placeholder="Search" />
                                                            </label>
                                                            <i className="bx bx-search-alt search-icon"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-8">
                                                    <div className="text-sm-end">
                                                        <Link to="/NewBundle" className="btn mb-2 me-2 btn-success">
                                                            <i className="mdi mdi-plus me-1"></i>Add Bundle
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="table-responsive mt-3">
                                                <table className="table table-centered datatable dt-responsive nowrap" style={{ borderCollapse: 'collapse', borderSpacing: 0, width: '100%' }}>
                                                    <thead className="thead-light">
                                                        <tr>
                                                            <th>Pack Name</th>
                                                            <th>Coin</th>
                                                            <th>Rupee</th>
                                                            <th>Status</th>
                                                            <th style={{ width: 120 }}>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {bundle.map((item) => (
                                                            <tr key={item.uuid}>
                                                                <td>{item.bundle_name}</td>
                                                                <td>{item.amount_coins}</td>
                                                                <td>{item.amount_rupees}</td>
                                                                <td>
                                                                    {item.status === 1 ? (
                                                                        <span className="badge bg-success">Active</span>
                                                                    ) : (
                                                                        <span className="badge bg-danger">In-active</span>
                                                                    )}
                                                                </td>
                                                                <td>
                                                                    <Link to={`/Bundleview/${item.uuid}`} className="me-3 text-primary" title="View">
                                                                        <i className="mdi mdi-eye font-size-18" />
                                                                    </Link>
                                                                    <Link to={`/NewBundle/${item.uuid}`} className="me-3 text-primary" title="Edit">
                                                                        <i className="mdi mdi-pencil font-size-18" />
                                                                    </Link>
                                                                    <span type="button" onClick={() => deleteBundle(item.uuid)} className="text-danger" title="Delete">
                                                                        <i className="mdi mdi-trash-can font-size-18" />
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
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

export default Bundle;
