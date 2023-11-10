import '../CssFile/Student.css';
import { Link, useParams } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import Header from './Header';
import Footer from './Footer';
import SideNav from './SideNav';
import Environment from './Environment';


function Adminview() {
    const [admin, setAdmin] = useState([])
    const params = useParams();

    useEffect(() => {
        getAdmin();
        // searchtable()
    }, [])

    //To Get The Category List.....
    const getAdmin = async (page) => {
        // setLoading(true)
        let result = await fetch(`${Environment.server_url}/sessions/admin/${params.uuid}`, {
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

    //TimeFormat Code Start
    const formatAMPM = (date) => {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    };

    const getDateTime = (dateString) => {
        const d = dateString;
        const date = new Date(d);
        return [
            date.getDate(),
            date.toLocaleString('default', { month: 'long' }),
            date.getFullYear()
        ].join(' ') +
            ', ' +
            formatAMPM(date);
    };
    //Time Format Code End
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
                                                </div>
                                                <div class="col-sm-8">
                                                    <div class="text-sm-end">
                                                        <Link to="/Adminedit" button type="button" class="btn mb-2 me-2 btn btn-success">
                                                            <i class="mdi mdi-plus me-1"></i>Edit</Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <div className="card">
                                                        <div className="adminimageview">
                                                            <h6>Profile Will Be Display Here</h6>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-3">
                                                    <h6><b>Name</b></h6>
                                                    <p>{admin.name}</p>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <h6><b>Email</b></h6>
                                                    <p>{admin.email}</p>
                                                </div>
                                                <div className="col-sm-3">
                                                    <h6><b>Mobile</b></h6>
                                                    <p>808890888</p>
                                                </div>
                                                <div className="col-sm-3">
                                                    <h6><b>Status</b></h6>
                                                    {
                                                        admin.status === true ?
                                                        <p><span className='badge bg-success'>Active</span></p>
                                                        :
                                                        <p><span className='badge bg-danger'>In-active</span></p>
                                                    }
                                                </div>
                                                <div className="col-sm-3">
                                                    <h6><b>Created At</b></h6>
                                                    <p>{getDateTime(admin.createdAt)}</p>
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

export default Adminview;