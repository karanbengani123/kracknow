import React from "react";
import '../CssFile/Student.css';
import { Link } from 'react-router-dom';

function Student() {
    return (
        <div className="content-wrapper admin-body">
            <section className="content">
                <div className="container-fluid">
                    <div className="page-content">
                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                    <h4 className="mb-sm-0">Dashboard</h4>
                                    <div className="page-title-right">
                                        <ol className="breadcrumb m-0">
                                            <li className="breadcrumb-item"><a href="#">Learn And Earn</a></li>
                                            <li className="breadcrumb-item active">Dashboard</li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="row media">
                                    <div className="col-md-3">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="d-flex">
                                                    <div className="flex-1 overflow-hidden">
                                                        <p className="text-truncate font-size-14 mb-2">Number of Students</p>
                                                        <h4 className="mb-0">1452</h4>
                                                    </div>
                                                    <div className="text-primary ms-auto">
                                                        <i className="ri-stack-line font-size-24" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-body border-top py-3">
                                                <div className="text-truncate">
                                                    <span className="badge badge-soft-success font-size-11"><i className="mdi mdi-menu-up"> </i> 2.4% </span>
                                                    <span className="text-muted ms-2">From previous period</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="d-flex">
                                                    <div className="flex-1 overflow-hidden">
                                                        <p className="text-truncate font-size-14 mb-2">Number Of Exams</p>
                                                        <h4 className="mb-0"> 38452</h4>
                                                    </div>
                                                    <div className="text-primary ms-auto">
                                                        <i className="ri-store-2-line font-size-24" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-body border-top py-3">
                                                <div className="text-truncate">
                                                    <span className="badge badge-soft-success font-size-11"><i className="mdi mdi-menu-up"> </i> 2.4% </span>
                                                    <span className="text-muted ms-2">From previous period</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="d-flex">
                                                    <div className="flex-1 overflow-hidden">
                                                        <p className="text-truncate font-size-14 mb-2">Number Of Tournaments</p>
                                                        <h4 className="mb-0"> 15</h4>
                                                    </div>
                                                    <div className="text-primary ms-auto">
                                                        <i className="ri-briefcase-4-line font-size-24" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-body border-top py-3">
                                                <div className="text-truncate">
                                                    <span className="badge badge-soft-success font-size-11"><i className="mdi mdi-menu-up"> </i> 2.4% </span>
                                                    <span className="text-muted ms-2">From previous period</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="d-flex">
                                                    <div className="flex-1 overflow-hidden">
                                                        <p className="text-truncate font-size-14 mb-2">Number Of Tournaments</p>
                                                        <h4 className="mb-0"> 15</h4>
                                                    </div>
                                                    <div className="text-primary ms-auto">
                                                        <i className="ri-briefcase-4-line font-size-24" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-body border-top py-3">
                                                <div className="text-truncate">
                                                    <span className="badge badge-soft-success font-size-11"><i className="mdi mdi-menu-up"> </i> 2.4% </span>
                                                    <span className="text-muted ms-2">From previous period</span>
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
    )
}
export default Student