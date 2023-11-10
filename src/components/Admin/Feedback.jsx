import '../CssFile/Student.css';
import { FiEye, FiTrash2, FiEdit } from "react-icons/fi";
import { Link } from 'react-router-dom';
import React from "react";
import Header from './Header';
import Footer from './Footer';
import SideNav from './SideNav';


function Feedback() {
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
                                        <h4 className="mb-sm-0">Feedback List</h4>
                                        <div className="page-title-right">
                                            {/* <ol className="breadcrumb m-0">
                                                <li className="breadcrumb-item"><a href="javascript: void(0);">Administration</a></li>
                                                <li className="breadcrumb-item active">Feedback List</li>
                                            </ol> */}
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
                                                    <div class="search-box me-2 mb-2 d-inline-block">
                                                        <div class="position-relative">
                                                            <label for="search-bar-0" class="search-label"><span id="search-bar-0-label" class="sr-only">Search this table</span><input id="search-bar-0" type="text" aria-labelledby="search-bar-0-label" class="form-control" placeholder="Search" /></label>
                                                            <i class="bx bx-search-alt search-icon">
                                                            </i></div>
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
                                                            <th>Student</th>
                                                            <th>Topic</th>
                                                            <th>Description</th>
                                                            <th>Status</th>
                                                            <th>Requested date</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {/* <tr>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                        </tr> */}
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-10">
                                                    <div className="dataTables_info pr-5" id="DataTables_Table_0_info" role="status" aria-live="polite">Showing 0 to 0 of 0 entries</div>
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

export default Feedback