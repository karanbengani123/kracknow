// import '../CssFile/Student.css';
// import { Link } from 'react-router-dom';
// import React from "react";
// import Header from './Header';
// import Footer from './Footer';
// import SideNav from './SideNav';


// function Keywordview() {
//     return (
//         <>
//             <Header />
//             <div className="content-wrapper admin-body">
//                 <section className="content">
//                     <div className="container-fluid">
//                         <div className="page-content">
//                             <div className="row">
//                                 <div className="col-12">
//                                     <div className="page-title-box d-sm-flex align-items-center justify-content-between">
//                                         <h4 className="mb-sm-0">Keyword</h4>
//                                         <div className="page-title-right">
//                                             <ol className="breadcrumb m-0">
//                                                 <Link to="/Category" className="breadcrumb-item">Keyword List</Link>
//                                                 <li className="breadcrumb-item active">Keyword</li>
//                                             </ol>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="row">
//                                 <div className="col-lg-12">
//                                     <div className="card">
//                                         <div className="card-body">
//                                             <div class="row">
//                                                 <div class="col-sm-4">
//                                                     {/* <div class="search-box me-2 mb-2 d-inline-block">
//                                                         <div class="position-relative">
//                                                             <label for="search-bar-0" class="search-label"><span id="search-bar-0-label" class="sr-only">Search this table</span><input id="search-bar-0" type="text" aria-labelledby="search-bar-0-label" class="form-control" placeholder="Search" /></label>
//                                                             <i class="bx bx-search-alt search-icon">
//                                                             </i>
//                                                         </div>
//                                                     </div> */}
//                                                 </div>
//                                                 <div class="col-sm-8">
//                                                     <div class="text-sm-end">
//                                                         <Link to="/Keywordedit" button type="button" class="btn mb-2 me-2 btn btn-success">Edit</Link>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                             <div class="row">
//                                                 <div class="col-sm-4">
//                                                     <h6><b>Name</b></h6>
//                                                     <p>ABC</p>
//                                                 </div>
//                                                 <div class="col-sm-4">
//                                                     <h6><b>Status</b></h6>
//                                                     <span className="badge bg-success">Active</span>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </section>
//             </div>
//             <SideNav />
//             <Footer />
//         </>
//     );
// }

// export default Keywordview

import '../CssFile/Student.css';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import Header from './Header';
import Footer from './Footer';
import SideNav from './SideNav';
import Environment from './Environment';


function Keywordview() {

    const [keywords, setKeywords] = useState([])
    useEffect(() => {
        getKeyword();
    }, [])

    const getKeyword = async () => {
        let result = await fetch(`${Environment.server_url}/keywords`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setKeywords(result.payload.lists)
    }
    console.warn("Kewords", keywords)


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
                                        <h4 className="mb-sm-0">Keyword</h4>
                                        <div className="page-title-right">
                                            <ol className="breadcrumb m-0">
                                                <Link to="/Category" className="breadcrumb-item">Keyword List</Link>
                                                <li className="breadcrumb-item active">Keyword</li>
                                            </ol>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <div class="row">
                                                <div class="col-sm-4">
                                                    {/* <div class="search-box me-2 mb-2 d-inline-block">
                                                        <div class="position-relative">
                                                            <label for="search-bar-0" class="search-label"><span id="search-bar-0-label" class="sr-only">Search this table</span><input id="search-bar-0" type="text" aria-labelledby="search-bar-0-label" class="form-control" placeholder="Search" /></label>
                                                            <i class="bx bx-search-alt search-icon">
                                                            </i>
                                                        </div>
                                                    </div> */}
                                                </div>
                                                <div class="col-sm-8">
                                                    <div class="text-sm-end">
                                                        <Link to="/Keywordedit" button type="button" class="btn mb-2 me-2 btn btn-success">Edit</Link>
                                                    </div>
                                                </div>
                                            </div>
                                            {
                                                keywords.map((item) =>
                                                    <div class="row">
                                                        <div class="col-sm-4">
                                                            <h6><b>Name</b></h6>
                                                            <p>{item.attribute}</p>
                                                        </div>
                                                        <div class="col-sm-4">
                                                            <h6><b>Status</b></h6>
                                                            {item.status ? <span className="badge bg-success">Active</span> : <span className="badge bg-danger">Inactive</span>}
                                                        </div>
                                                    </div>
                                                )
                                            }
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

export default Keywordview