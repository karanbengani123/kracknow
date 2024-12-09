import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import SideNav from "./SideNav";
import Footer from "./Footer";
import Header from "./Header";
import 'react-toastify/dist/ReactToastify.css';
import Environment from "./Environment";

function NewBundle() {
    const { id } = useParams(); 
    const [bundleData, setBundleData] = useState(null);
    const [bundleName, setBundleName] = useState('');
    const [amountCoins, setAmountCoins] = useState('');
    const [amountRupees, setAmountRupees] = useState('');
    const [status, setStatus] = useState('1');
    const [errors, setErrors] = useState({});
    const [show, setShow] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [startExamDisable, setStartExamDisable] = useState(false);
    const [showLoaderShow, setShowLoaderShow] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            getBundleDetails(); // Call the fetch function if id is available
        }
    }, [id]);

    const getBundleDetails = async () => {
        try {
            const result = await fetch(`http://localhost:3000/common/bundle/${id}`, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });

            if (!result.ok) {
                throw new Error(`HTTP error! status: ${result.status}`);
            }

            const data = await result.json();

            if (data.payload && data.payload.bundle) {
                const bundle = data.payload.bundle;
                setBundleData(bundle); // Set bundleData
                setBundleName(bundle.bundle_name);
                setAmountCoins(bundle.amount_coins);
                setAmountRupees(bundle.amount_rupees);
                setStatus(bundle.status.toString()); // Convert status to string if needed
            } else {
                console.error('Unexpected data structure:', data);
            }
        } catch (error) {
            console.error('Error fetching bundle:', error);
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!bundleName) newErrors.bundleName = "Bundle name is required.";
        if (!amountCoins) newErrors.amountCoins = "Coin amount is required.";
        else if (isNaN(amountCoins) || amountCoins <= 0) newErrors.amountCoins = "Coin amount must be a positive number.";
        if (!amountRupees) newErrors.amountRupees = "Rupee amount is required.";
        else if (isNaN(amountRupees) || amountRupees <= 0) newErrors.amountRupees = "Rupee amount must be a positive number.";
        if (!status) newErrors.status = "Status is required.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;
    
        const bundlePayload = {
            bundle_name: bundleName,
            amount_coins: amountCoins,
            amount_rupees: amountRupees,
            status: status
        };
    
        const method = bundleData ? "PUT" : "POST"; // PUT if editing, POST if creating
        const endpoint = bundleData ? `http://localhost:3000/common/bundle/${id}` : `http://localhost:3000/common/bundle`;

        try {
            const response = await fetch(endpoint, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                },
                body: JSON.stringify(bundlePayload), // Always stringify the payload
            });
    
            if (!response.ok) throw new Error('Failed to save bundle');

            setShowSuccess(true);
            // Optionally reset form or navigate
            setTimeout(() => navigate('/Bundle'), 2000); // Navigate after a successful save
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Failed to save bundle.');
            setShow(true);
        }
    };

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
                                        <h4 className="mb-sm-0">{bundleData ? 'Edit Bundle' : 'Add Bundle'}</h4>
                                        <div className="page-title-right">
                                            <ol className="breadcrumb m-0">
                                                <Link to="/Bundle" className="breadcrumb-item"><a>Bundle</a></Link>
                                                <li className="breadcrumb-item active">{bundleData ? 'Edit Bundle' : 'Add Bundle'}</li>
                                            </ol>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Show success or error messages */}
                            {show && <div className="alert alert-danger">{errorMessage}</div>}
                            {showSuccess && <div className="alert alert-success">Bundle successfully saved!</div>}

                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="form">
                                                <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                                                    <div className="form-row">
                                                        <div className="col-12 col-sm-4">
                                                            <label><b>Name<span className="required text-danger">*</span></b></label>
                                                            <select
                                                                className="form-select"
                                                                value={bundleName}
                                                                onChange={(e) => setBundleName(e.target.value)}
                                                                required
                                                            >
                                                                <option value="">Select Pack</option>
                                                                <option value="small_pack">Small Pack</option>
                                                                <option value="medium_pack">Medium Pack</option>
                                                                <option value="large_pack">Large Pack</option>
                                                                <option value="extra_large">Extra Large</option>
                                                            </select>
                                                            {errors.bundleName && <p className="text-danger">{errors.bundleName}</p>}
                                                        </div>
                                                        <div className="col-12 col-sm-4">
                                                            <p><b>Coin<span className="required text-danger">*</span></b></p>
                                                            <input
                                                                type="text"
                                                                placeholder="Enter coin amount"
                                                                value={amountCoins}
                                                                onChange={(e) => setAmountCoins(e.target.value)}
                                                                className="form-control"
                                                            />
                                                            {errors.amountCoins && <p className="text-danger">{errors.amountCoins}</p>}
                                                        </div>
                                                        <div className="col-12 col-sm-4">
                                                            <p><b>Rupee<span className="required text-danger">*</span></b></p>
                                                            <input
                                                                type="text"
                                                                placeholder="Enter rupee amount"
                                                                value={amountRupees}
                                                                onChange={(e) => setAmountRupees(e.target.value)}
                                                                className="form-control"
                                                            />
                                                            {errors.amountRupees && <p className="text-danger">{errors.amountRupees}</p>}
                                                        </div>
                                                        <div className="col-12 col-sm-4">
                                                            <p><b>Status<span className="required text-danger">*</span></b></p>
                                                            <select
                                                                className="form-select"
                                                                value={status}
                                                                onChange={(e) => setStatus(e.target.value)}
                                                                required
                                                            >
                                                                <option value={1}>Active</option>
                                                                <option value={0}>Inactive</option>
                                                            </select>
                                                            {errors.status && <p className="text-danger">{errors.status}</p>}
                                                        </div>
                                                    </div>
                                                    <div className="button">
                                                        <button type="submit" className="btn btn-success savebtn" disabled={startExamDisable}>
                                                            {showLoaderShow ? <span>Loading...</span> : "Save"}
                                                        </button>
                                                        <Link to="/Bundle"><button type="button" className="btn">Cancel</button></Link>
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
            <SideNav />
            <Footer />
        </>
    );
}

export default NewBundle;
