import React, { useState, useEffect } from "react";
import '../CssFile/Student.css';
import { Link, useParams } from 'react-router-dom';
import SideNav from "./SideNav";
import Footer from "./Footer";
import Header from "./Header";
import Environment from "./Environment";
import moment from "moment";

function Cashfreereview() {
    const [Cashfreelist, setCashfreeList] = useState([])
    const [totalInbound, setTotalInbound] = useState([])
    const [totaloutBound, setTotalOutBound] = useState([])
    const params = useParams();

    useEffect(() => {
        getCashfreeList();
        // searchtable()
    }, [])

    //To Get The Cashfree List.....
    const getCashfreeList = async (page) => {
        let result = await fetch(`${Environment.server_url}/wallet/${params.uuid}/history`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setCashfreeList(result.payload.wallet.wallettransaction);
        setTotalInbound(result.payload.totalInbound.map((item) => item.totalInbound));
        setTotalOutBound(result.payload.totalOutbound.map((item) => item.totalOutbound));
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
        const date = new Date(dateString);
        return [
            date.getDate(),
            date.toLocaleString('default', { month: 'long' }),
            date.getFullYear()
        ].join(' ') +
            ', ' +
            formatAMPM(date);
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
                                        <h4 className="mb-sm-0">Bank Transaction List</h4>
                                        <div className="page-title-right">
                                            <ol className="breadcrumb m-0">
                                                <li className="breadcrumb-item"><a href="javascript: void(0);">Bank transaction</a></li>
                                                <li className="breadcrumb-item active">Cashfree transaction list</li>
                                            </ol>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* end page title */}
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="row col-sm-12 d-flex">
                                                <div class="col-sm-4">
                                                    <div class="search-box me-2 mb-2 d-inline-block">
                                                        <div class="position-relative">
                                                            <label for="search-bar-0" class="search-label"><span id="search-bar-0-label" class="sr-only">Search this table</span><input id="search-bar-0" type="text" aria-labelledby="search-bar-0-label" class="form-control" placeholder="Search" /></label>
                                                            <i class="bx bx-search-alt search-icon">
                                                            </i>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-3"></div>
                                                <div className="col-sm-5 d-flex">
                                                    <div className="col-sm">
                                                        <p><b>Total Inbound:</b> {totalInbound}</p>
                                                    </div>
                                                    <div className="col-sm">
                                                        <p><b>Total Outbound:</b> {totaloutBound}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="table-responsive mt-3">
                                                <table className="table table-bordered datatable dt-responsive nowrap" style={{ borderCollapse: 'collapse', borderSpacing: 0, width: '100%' }}>
                                                    <thead className="thead-light">
                                                        <tr>
                                                            {/* <th>Order id</th> */}
                                                            <th>Type</th>
                                                            <th>Name</th>
                                                            {/* <th>Reference id</th> */}
                                                            <th>Payment Date</th>
                                                            <th>Payment Mode</th>
                                                            <th>Type</th>
                                                            <th>Amount</th>
                                                            <th>Status</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            Cashfreelist.map((item, index) => {
                                                                return (
                                                                <tr>
                                                                    {/* <td>{item.orderId}</td> */}
                                                                    <td>{item.examType}</td>
                                                                    <td>{item.examTitle}</td>
                                                                    {/* <td>{item.referenceId}</td> */}
                                                                    <td>{moment(item.paymentDate).format('D MMM YYYY, h:mm a')}</td>
                                                                    <td>{item.paymentMode}</td>
                                                                    <td>{item.amount}</td>
                                                                    <td>{item.type}</td>
                                                                    {
                                                                        item.status === "SUCCESS" ?
                                                                            <td><span className="badge bg-success">{item.status}</span></td>
                                                                            :
                                                                            <td><span className="badge bg-warning">{item.status}</span></td>
                                                                    }
                                                                    {/* <td>{item.status}</td> */}
                                                                </tr>
                                                                )
                                                            }
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
    )
}
export default Cashfreereview