import '../CssFile/Student.css';
import { Link, useParams } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import Header from './Header';
import Footer from './Footer';
import SideNav from './SideNav';
import Environment from './Environment';


function Bundleview() {
    const [bundle_name, setBundleName] = useState()
    const [status, setStatus] = useState()
    const [amount_coins, setAmountCoins] = useState()
    const [amount_rupees, setAmountRupees] = useState()

    const params = useParams()

    useEffect(() => {
        viewBundleDetails();
    }, [])

    const viewBundleDetails = async () => {
        // let result = await fetch(`${Environment.server_url}/common/bundle/${params.id}`,
        let result = await fetch(`http://localhost:3000/common/bundle/${params.id}`,
            {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
        result = await result.json();
        console.log(result);
        setBundleName(result.payload.bundle.bundle_name);
        setStatus(result.payload.bundle.status);
        setAmountCoins(result.payload.bundle.amount_coins);
        setAmountRupees(result.payload.bundle.amount_rupees);
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
                                        <h4 className="mb-sm-0">Bundle</h4>
                                        <div className="page-title-right">
                                            <ol className="breadcrumb m-0">
                                                <Link to="/Bundle" className="breadcrumb-item">Bundle List</Link>
                                                <li className="breadcrumb-item active">Bundle</li>
                                            </ol>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="row mb-3">
                                                <div className="col-sm-4">
                                                    {/* Uncomment if you want a search box */}
                                                    {/* <div className="search-box me-2 mb-2 d-inline-block">
                                                        <div className="position-relative">
                                                            <label htmlFor="search-bar-0" className="search-label">
                                                                <span id="search-bar-0-label" className="sr-only">Search this table</span>
                                                                <input id="search-bar-0" type="text" aria-labelledby="search-bar-0-label" className="form-control" placeholder="Search" />
                                                            </label>
                                                            <i className="bx bx-search-alt search-icon"></i>
                                                        </div>
                                                    </div> */}
                                                <h5 className="mb-4">Bundle Details</h5>
                                                </div>
                                                
                                                <div className="col-sm-8 text-sm-end">
                                                    <Link to={`/NewBundle/${params.id}`} className="btn btn-success mb-2">
                                                        Edit
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-12 mb-2">
                                                    <h6><b>Name</b></h6>
                                                    <p className="text-muted">{bundle_name}</p>
                                                </div>
                                                <div className="col-sm-12 mb-2">
                                                    <h6><b>Rupee (In Amount)</b></h6>
                                                    <p className="text-muted">{amount_rupees}</p>
                                                </div>
                                                <div className="col-sm-12 mb-2">
                                                    <h6><b>Coin (In Amount)</b></h6>
                                                    <p className="text-muted">{amount_coins}</p>
                                                </div>
                                                <div className="col-sm-12 mb-2">
                                                    <h6><b>Status</b></h6>
                                                    <span>
                                                        {status === 1 ? (
                                                            <span className="badge bg-success">Active</span>
                                                        ) : (
                                                            <span className="badge bg-danger">Inactive</span>
                                                        )}
                                                    </span>
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

export default Bundleview