import React, { useState, useEffect, useCallback } from "react";
import '../CssFile/Student.css';
import { Link } from 'react-router-dom';
import SideNav from "./SideNav";
import Footer from "./Footer";
import Header from "./Header";
import { debounce } from 'lodash';
import ReactPaginate from "react-paginate";
import Environment from "./Environment";

function Cashfree() {
    const [Cashfreelist, setCashfreeList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [totalPage, setTotalPage] = useState(0)
    const [items, setItems] = useState([]);

    const [totalcount, setTotalcount] = useState()
    const [totalLength, setTotalLength] = useState('')
    const [filter, setFilter] = useState('')
    const [filters, setFilters] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getCashfreeList();
        // searchtable()
    }, [])

    //To Get The Cashfree List.....
    const getCashfreeList = async (page) => {


        let getpage = page ? page : 0

        let result = await fetch(`${Environment.server_url}/wallet/allhistory?limit=${itemsPerPage}&page=${page}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setCashfreeList(result.payload.rows);
        setTotalPage(Math.ceil(result.payload.count / itemsPerPage));
        setTotalcount(result.payload.count);
        setTotalLength(result.payload.rows.length);
    }
    
    //Search Exam
    const searchHandler = (event) => {
        handler(event);
    };

    const handler = useCallback(debounce((event) => searchtable(event.target.value), 500), []);

    const searchtable = async (key) => {
        console.log(key)

        let result = await fetch(`${Environment.server_url}/wallet/allhistory?q=${key}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            })
        result = await result.json();
        // setLoading(false)
        if (result) {
            setCashfreeList(result.payload.rows);
            setTotalPage(Math.ceil(result.payload.count / itemsPerPage));
            setTotalcount(result.payload.count);
            setTotalLength(result.payload.rows.length);
        }
    }

    //Exam Pagination
    const handlePageChange = async (data) => {
        setCurrentPage(data.selected + 1);
        const ExamFromServer = await getCashfreeList(data.selected + 1);
        setItems(ExamFromServer);
    }

    const paginationCount = () => {
        if (Cashfreelist.length === 0) {
            return (currentPage === 1
                ? totalcount ? 1 : 0
                : itemsPerPage * (currentPage - 1) + 1
            ).toString()
                + ' to '
                + (
                    totalcount < (currentPage * itemsPerPage)
                        ? totalcount
                        : currentPage * itemsPerPage
                ).toString()
                + ' of '
                + (totalcount ? totalcount : 0).toString();;
        }

        return (currentPage === 1
            ? totalcount ? 1 : 0
            : itemsPerPage * (currentPage - 1) + 1
        ).toString()
            + ' to '
            + (
                totalcount < (currentPage * itemsPerPage)
                    ? totalcount
                    : currentPage * itemsPerPage
            ).toString()
            + ' of '
            + (totalcount ? totalcount : 0).toString();

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
                                        <h4 className="mb-sm-0">Bank Transaction List</h4>
                                        <div className="page-title-right">
                                            {/* <ol className="breadcrumb m-0">
                                                <li className="breadcrumb-item"><a href="javascript: void(0);">Cashfree transaction</a></li>
                                                <li className="breadcrumb-item active">Cashfree transaction list</li>
                                            </ol> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* end page title */}
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <div class="col-sm-4">
                                                <div class="search-box me-2 mb-2 d-inline-block">
                                                    <div class="position-relative">
                                                        <label for="search-bar-0" class="search-label"><span id="search-bar-0-label" class="sr-only">Search this table</span><input id="search-bar-0" type="text" aria-labelledby="search-bar-0-label" class="form-control" placeholder="Search" onChange={searchHandler} /></label>
                                                        <i class="bx bx-search-alt search-icon">
                                                        </i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="table-responsive mt-3">
                                                <table className="table table-bordered datatable dt-responsive nowrap" style={{ borderCollapse: 'collapse', borderSpacing: 0, width: '100%' }}>
                                                    <thead className="thead-light">
                                                        <tr>
                                                            {/* <th style={{ width: 20 }}>
                                                                <div className="form-check">
                                                                    <input type="checkbox" className="form-check-input" id="customercheck" />
                                                                    <label className="form-check-label mb-0" htmlFor="customercheck">&nbsp;</label>
                                                                </div>
                                                            </th> */}
                                                            <th>Student</th>
                                                            {/* <th>Exam</th> */}
                                                            <th>Email</th>
                                                            <th>Mobile</th>
                                                            <th>Amount</th>
                                                            <th>Action</th>
                                                            {/* <th>Payment Status</th> */}
                                                            {/* <th>Amount</th>
                                                            <th>Type</th>
                                                            <th>Date</th> */}
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            Cashfreelist.map((item, index) => {
                                                                return (
                                                                    <tr key={index}>
                                                                        <td>{item.firstName} {item.lastName}</td>
                                                                        <td>{item.email}</td>
                                                                        <td>{item.mobileNumber}</td>
                                                                        <td>{item.wallet.balance}</td>
                                                                        {/* {item.status === "PENDING" ? (
                                                                            <td>
                                                                                <span className="badge bg-danger">
                                                                                    {item.status.replace(
                                                                                        item.status,
                                                                                        "pending"
                                                                                    )}
                                                                                </span>
                                                                            </td>
                                                                        ) : (
                                                                            <td>
                                                                                <span className="badge bg-success">
                                                                                    {item.status.replace(
                                                                                        item.status,
                                                                                        "completed"
                                                                                    )}
                                                                                </span>
                                                                            </td>
                                                                        )} */}
                                                                        <td>
                                                                            <Link to={"/Cashfreereview/" + item.wallet?.uuid} className='badge bg-success ReviewBtn'>See more</Link>
                                                                        </td>
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
                                                    <div className="dataTables_info pr-5" id="DataTables_Table_0_info" role="status" aria-live="polite">Showing {paginationCount()} entries
                                                    </div>
                                                </div>
                                                <div className="col-sm-2">
                                                    <ReactPaginate
                                                        previousLabel="Prev"
                                                        nextLabel="Next"
                                                        pageClassName="page-item"
                                                        pageLinkClassName="page-link"
                                                        previousClassName="page-item"
                                                        previousLinkClassName="page-link"
                                                        nextClassName="page-item"
                                                        nextLinkClassName="page-link"
                                                        breakLabel="..."
                                                        breakClassName="page-item"
                                                        breakLinkClassName="page-link"
                                                        pageCount={totalPage}
                                                        marginPagesDisplayed={1}
                                                        pageRangeDisplayed={1}
                                                        onPageChange={handlePageChange}
                                                        containerClassName="pagination float-right"
                                                        activeClassName="active"
                                                    />
                                                </div>
                                            </div>
                                            {/* <div className="row">
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
                                            </div> */}
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
export default Cashfree