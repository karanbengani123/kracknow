import React, { useCallback, useEffect, useState } from "react";
import SideNav from "./SideNav";
import Footer from "./Footer";
import Header from "./Header";
import { Link } from 'react-router-dom';
import ReactPaginate from "react-paginate";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { debounce } from 'lodash';
import loader from '../Images/loader.gif';
import Environment from "./Environment";

function Keywords() {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [totalPage, setTotalPage] = useState(0)
    const [items, setItems] = useState([]);
    const [show, setShow] = useState('')
    const [loading, setLoading] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("")
    const [totalcount, setTotalcount] = useState()
    const [totalLength, setTotalLength] = useState()

    const [keywords, setKeywords] = useState([])

    useEffect(() => {
        getKeyword(currentPage);
    }, [])

    const getKeyword = async (page) => {
        setLoading(true)
        let result = await fetch(`${Environment.server_url}/keywords?limit=${itemsPerPage}&page=${page}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setKeywords(result.payload.lists.rows);
        setLoading(false)
        setTotalPage(Math.ceil(result.payload.lists.count / itemsPerPage));
        setTotalcount(result.payload.lists.count);
        setTotalLength(result.payload.lists.rows.length);
    }

    const handlePageChange = async (data) => {
        setCurrentPage(data.selected + 1);
        const categoryFromServer = await getKeyword(data.selected + 1);
        setItems(categoryFromServer);
    }

    const paginationCount = () => {
        if (keywords.length === 0) {
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


    const deleteKeyword = async (attribute) => {
        if (window.confirm("Delete Keyword!") == true) {
            let result = await fetch(`${Environment.server_url}/keywords/${attribute}`, {
                method: "Delete",
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            })
            .then(catdata => {
                if (catdata.status === 200) {
                    setShowSuccess(true);
                    getKeyword();
                    return (catdata.json());
                }
                else {
                    setShow(true);
                    return (catdata.json());
                }
            })
            .then(catdata => {
                setErrorMessage(catdata.message)
            })
        } else {
            // setShow("Not Deleted")
        }
    }

    const searchHandler = (event) => {
        handler(event);
    };

    const handler = useCallback(debounce((event) => searchtable(event.target.value), 1000), []);

    const searchtable = async (event) => {
        let result = await fetch(`${Environment.server_url}/keywords?q=${event}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            })
        result = await result.json();
        if (result) {
            setKeywords(result.payload.lists.rows)
            setTotalPage(Math.ceil(result.payload.lists.count / itemsPerPage));
            setTotalcount(result.payload.lists.count);
            setTotalLength(result.payload.lists.rows.length);
        }
    }

    if (show === true) {
        setTimeout(() => setShow(false), 5000);
    }
    if (showSuccess === true) {
        setTimeout(() => setShowSuccess(false), 5000);
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
                                        <h4 className="mb-sm-0">Keyword List</h4>
                                        <div className="page-title-right">
                                            {/* <ol className="breadcrumb m-0">
                                                <li className="breadcrumb-item"><a href="javascript: void(0);">Keyword</a></li>
                                                <li className="breadcrumb-item active">Keyword list</li>
                                            </ol> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {
                                show &&
                                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                    <strong className="text-danger">{errorMessage}</strong>
                                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setShow(false)}></button>
                                </div>
                            }
                            {
                                showSuccess &&
                                <div className="alert alert-success alert-dismissible fade show" role="alert">
                                    <strong className="text-success">{errorMessage}</strong>
                                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setShowSuccess(false)}></button>
                                </div>
                            }
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <div class="row">
                                                {<div><p className="SuccessMessage ">{show}</p></div>}
                                                <div class="col-sm-4">
                                                    <div class="search-box me-2 mb-2 d-inline-block">
                                                        <div class="position-relative">
                                                            <label for="search-bar-0" class="search-label"><span id="search-bar-0-label" class="sr-only">Search this table</span><input id="search-bar-0" onChange={searchHandler} type="text" aria-labelledby="search-bar-0-label" class="form-control" placeholder="Search" /></label>
                                                            <i class="bx bx-search-alt search-icon">
                                                            </i>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-sm-8">
                                                    <div class="text-sm-end">
                                                        <div>
                                                            <Link to="/Keywordadd" className="btn btn-success mb-2 addstudent "><i className="mdi mdi-plus me-2 " />Add Keyword</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="table-responsive mt-3">
                                                <table className="table table-centered datatable dt-responsive nowrap" style={{ borderCollapse: 'collapse', borderSpacing: 0, width: '100%' }}>
                                                    <thead className="thead-light">
                                                        <tr>
                                                            <th>Name</th>
                                                            <th>Status</th>
                                                            {/* <th></th> */}
                                                            <th style={{ width: 120 }}>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            loading ?
                                                            (
                                                                <tr
                                                                    className=""
                                                                    style={{ paddingBottom: "11%" }}
                                                                >
                                                                    <td></td>
                                                                    <td className="">
                                                                        <img
                                                                            src={loader}
                                                                            alt={"loader"}
                                                                            className={"mx-auto d-block"}
                                                                        />
                                                                    </td>
                                                                    <td></td>
                                                                </tr>
                                                            )
                                                            :
                                                            (
                                                            keywords.length > 0 ? keywords.map((item) =>
                                                                <tr key={item}>
                                                                    <td>{item.attribute}</td>
                                                                    <td>{item.status ? <span className="badge bg-success">Active</span> : <span className="badge bg-danger">Inactive</span>}</td>
                                                                    {/* <td></td> */}
                                                                    <td id="tooltip-container1">
                                                                        {/* <Link to="/Keywordview" className="me-3 text-primary" data-bs-container="#tooltip-container1" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit"><i className="mdi mdi-eye font-size-18" /></Link>
                                                                <Link to={"/Keywordedit/" +item.attribute} className="me-3 text-primary" data-bs-container="#tooltip-container1" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit"><i className="mdi mdi-pencil font-size-18" /></Link> */}
                                                                        <span type="button" onClick={() => { deleteKeyword(item.attribute) }} className="text-danger" data-bs-container="#tooltip-container1" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete"><i className="mdi mdi-trash-can font-size-18" /></span>
                                                                    </td>
                                                                </tr>
                                                            )
                                                                :
                                                                <tr>
                                                                    <td></td>
                                                                    <td><h4>No Keywords Found</h4></td>
                                                                    <td></td>
                                                                </tr>
                                                            )
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="row mt-3">
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
                                                    // forcePage={pageOffset}
                                                    />
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
export default Keywords