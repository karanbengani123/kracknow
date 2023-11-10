import React, { useState, useEffect } from "react";
import '../CssFile/Student.css';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import SideNav from './SideNav';
import Environment from "./Environment";


function Admin() {
    const [admin, setAdmin] = useState([])

    useEffect(() => {
        getAdmin();
        // searchtable()
    }, [])

    //To Get The Category List.....
    const getAdmin = async (page) => {
        // setLoading(true)
        let result = await fetch(`${Environment.server_url}/sessions/admin/get`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setAdmin(result.payload.admin);
        // setLoading(false)
        // setTotalPage(Math.ceil(result.payload.lists.count / itemsPerPage));
        // setTotalcount(result.payload.lists.count);
        // setTotallength(result.payload.lists.rows.length);
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
                                        <h4 className="mb-sm-0">Admin List</h4>
                                        {/* <div className="page-title-right">
                                            <ol className="breadcrumb m-0">
                                                <li className="breadcrumb-item"><a href="javascript: void(0);">Administration</a></li>
                                                <li className="breadcrumb-item active">Admin List</li>
                                            </ol>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <div class="row">
                                                <div class="col-sm-4">
                                                    <div class="search-box me-2 mb-2 d-inline-block">
                                                        <div class="position-relative">
                                                            <label for="search-bar-0" class="search-label"><span id="search-bar-0-label" class="sr-only">Search this table</span><input id="search-bar-0" type="text" aria-labelledby="search-bar-0-label" class="form-control" placeholder="Search" /></label>
                                                            <i class="bx bx-search-alt search-icon">
                                                            </i></div>
                                                    </div>
                                                </div>
                                                <div class="col-sm-8">
                                                    <div class="text-sm-end">
                                                        <Link to="/NewAdmin" button type="button" class="btn mb-2 me-2 btn btn-success">
                                                            <i class="mdi mdi-plus me-1"></i>Add Admin</Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="table-responsive mt-3">
                                                <table className="table table-centered datatable dt-responsive nowrap" style={{ borderCollapse: 'collapse', borderSpacing: 0, width: '100%' }}>
                                                    <thead className="thead-light">
                                                        <tr>
                                                            {/* <th style={{ width: 20 }}>
                                                                <div className="form-check">
                                                                    <input type="checkbox" className="form-check-input" id="customercheck" />
                                                                    <label className="form-check-label mb-0" htmlFor="customercheck">&nbsp;</label>
                                                                </div>
                                                            </th> */}
                                                            <th>Profile</th>
                                                            <th>Login Type</th>
                                                            <th>Name</th>
                                                            <th>Email</th>
                                                            <th>Mobile</th>
                                                            <th>Roles</th>
                                                            <th>Status</th>
                                                            <th style={{ width: 120 }}>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            admin.map((item, index) =>
                                                                <tr>
                                                                    <td>
                                                                        <div className="img" ><img src="./guy-6.jpg" className='tableimage' /></div>
                                                                    </td>
                                                                    <td>Email</td>
                                                                    <td>{item.name}</td>
                                                                    <td>{item.email}</td>
                                                                    <td>
                                                                        7008207397
                                                                    </td>
                                                                    <td><span className="badge bg-success">{item.role.roleName}</span></td>
                                                                    {
                                                                        item.status === true ?
                                                                            <td>
                                                                                <span className="badge bg-success">Active</span>
                                                                            </td>
                                                                            :
                                                                            <td>
                                                                                <span className="badge bg-danger">In-active</span>
                                                                            </td>
                                                                    }
                                                                    <td id="tooltip-container1">
                                                                        <Link to={"/Adminview/" + item.uuid} className="me-3 text-primary" data-bs-container="#tooltip-container1" data-bs-toggle="tooltip" data-bs-placement="top" title="View"><i className="mdi mdi-eye font-size-18" /></Link>
                                                                        <Link to="/EditProfile" className="me-3 text-primary" data-bs-container="#tooltip-container1" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit"><i className="mdi mdi-pencil font-size-18" /></Link>
                                                                        <a className="text-danger" data-bs-container="#tooltip-container1" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete"><i className="mdi mdi-trash-can font-size-18" /></a>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        }

                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-10">
                                                    <div className="dataTables_info pr-5" id="DataTables_Table_0_info" role="status" aria-live="polite">Showing 1 to 10 of 12 entries</div>
                                                </div>
                                                <div className="col-sm-2 ">
                                                    <div className="dataTables_paginate paging_simple_numbers" id="DataTables_Table_0_paginate">
                                                        <ul className="pagination pagination-rounded">
                                                            <li className="paginate_button page-item previous disabled" id="DataTables_Table_0_previous">
                                                                <a aria-controls="DataTables_Table_0" data-dt-idx={0} tabIndex={0} className="page-link">
                                                                    <i className="mdi mdi-chevron-left" />
                                                                </a>
                                                            </li>
                                                            <li className="paginate_button page-item active">
                                                                <a aria-controls="DataTables_Table_0" data-dt-idx={1} tabIndex={0} className="page-link">1</a>
                                                            </li>
                                                            <li className="paginate_button page-item ">
                                                                <a aria-controls="DataTables_Table_0" data-dt-idx={2} tabIndex={0} className="page-link">2</a>
                                                            </li>
                                                            <li className="paginate_button page-item next" id="DataTables_Table_0_next">
                                                                <a aria-controls="DataTables_Table_0" data-dt-idx={3} tabIndex={0} className="page-link"><i className="mdi mdi-chevron-right" /></a>
                                                            </li>
                                                        </ul>
                                                    </div>
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

export default Admin;