import React, { useCallback, useState, useEffect } from "react";
import '../CssFile/Student.css';
import { Link, useParams } from 'react-router-dom';
import SideNav from "./SideNav";
import Footer from "./Footer";
import Header from "./Header";
import ReactPaginate from "react-paginate";
import { debounce } from 'lodash';
import loader from '../Images/loader.gif';
import Environment from "./Environment";
// import logo1 from '../Images/logo1.png';
// import { Pagination } from "react-bootstrap";


function Category() {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [totalPage, setTotalPage] = useState(0);
    const [items, setItems] = useState([]);
    const [totallength, setTotallength] = useState('');
    const [totalcount, setTotalcount] = useState();
    const [show, setShow] = useState('')
    const [loading, setLoading] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("")
    const [category, setCategory] = useState([])


    useEffect(() => {
        getCategory(currentPage);
        // searchtable()
    }, [])

    //To Get The Category List.....
    const getCategory = async (page) => {
        setLoading(true)
        let result = await fetch(`${Environment.server_url}/categories?limit=${itemsPerPage}&page=${page}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setCategory(result.payload.lists.rows);
        setLoading(false)
        setTotalPage(Math.ceil(result.payload.lists.count / itemsPerPage));
        setTotalcount(result.payload.lists.count);
        setTotallength(result.payload.lists.rows.length);
    }

    //Pagination HandleChange
    const handlePageChange = async (data) => {
        setCurrentPage(data.selected + 1);
        const categoryFromServer = await getCategory(data.selected + 1);
        setItems(categoryFromServer);
    }

    const paginationCount = () => {
        if (category.length === 0) {
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

        // return (currentPage === 1
        //     ? totalcount ? 1 : 0
        //     : itemsPerPage * (currentPage - 1) + 1

        // ).toString()
        // + ' to '
        // + (
        //     totalcount < (currentPage * itemsPerPage)
        //         ? totalcount
        //         : currentPage * itemsPerPage
        // ).toString()
        // + ' of '
        // + totalcount.toString();
    }



    //To Delete The Category List.....
    const deleteCategory = async (uuid) => {
        if (window.confirm("Delete SubCategory") === true) {
            let result = await fetch(`${Environment.server_url}/categories/${uuid}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            })
                .then(catdata => {
                    if (catdata.status === 200) {
                        setShowSuccess(true);
                        getCategory();
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
        };
    }

    const params = useParams('')

    const searchHandler = (event) => {
        handler(event);
    };

    const handler = useCallback(debounce((event) => searchtable(event.target.value), 500), []);


    //To Search The Category List.....
    const searchtable = async (key) => {
        // let key = event.target.value
        let result = await fetch(`${Environment.server_url}/categories?q=${key}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            })
        result = await result.json();

        if (result) {
            setCategory(result.payload.lists.rows);
            setTotalPage(Math.ceil(result.payload.lists.count / itemsPerPage));
            setTotalcount(result.payload.lists.count);
            setTotallength(result.payload.lists.rows.length);
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
                            {/* {
                                show1 ? (
                                    <div className="alert alert-danger" role="alert">
                                        Student deleted successfully!
                                    </div>
                                ) : null
                            } */}
                            <div className="row">
                                <div className="col-12">
                                    <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                        <h4 className="mb-sm-0">Category List</h4>
                                        <div className="page-title-right ">

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
                                            <div className="row">
                                                <div className="col-sm-4">
                                                    <div className="search-box me-2 mb-2 d-inline-block">
                                                        <div className="position-relative">
                                                            <label for="search-bar-0" className="search-label"><span id="search-bar-0-label" className="sr-only">Search this table</span>
                                                            <input onChange={searchHandler} id="search-bar-0" type="text" aria-labelledby="search-bar-0-label" className="form-control" placeholder="Search" /></label>
                                                            <i className="bx bx-search-alt search-icon">
                                                            </i>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-8">
                                                    <div className="text-sm-end">
                                                        <div>
                                                            <Link to="/Subcategory" className="btn btn-success mb-2 addstudent"><i className="mdi mdi-plus me-1" />Add Sub-category</Link>
                                                            <Link to="/Categoryadd" className="btn btn-success mb-2 me-2 addstudent"><i className="mdi mdi-plus me-1" />Add Category</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="table-responsive mt-3">
                                                <table className="table table-centered datatable dt-responsive nowrap" style={{ borderCollapse: 'collapse', borderSpacing: 0, width: '100%' }}>
                                                    <thead className="thead-light">
                                                        <tr>
                                                            {/* <th>Id</th> */}
                                                            <th>Icon</th>
                                                            <th>Name</th>
                                                            <th>Status</th>
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
                                                                        <td></td>
                                                                    </tr>
                                                                )
                                                                :
                                                                (
                                                                    category.length > 0 ? category.map((item, key) =>
                                                                        <tr key={key}>
                                                                            {/* <td>{item.uuid}</td> */}
                                                                            <td>
                                                                                <img className="CategoryImage" src={item.icon || 'Placeholder.jpg'} alt="Categoryprofile" />
                                                                            </td>
                                                                            <td>{item.label}</td>
                                                                            <td>{item.status ? <span className="badge bg-success"> Active </span> : <span className="badge bg-danger"> Inactive </span>}</td>
                                                                            <td id="tooltip-container1">
                                                                                <Link to={"/Categoryview/" + item.uuid} className="me-3 text-primary" data-bs-container="#tooltip-container1" data-bs-toggle="tooltip" data-bs-placement="top" title="View"><i className="mdi mdi-eye font-size-18" /></Link>
                                                                                <Link to={"/Categoryedit/" + item.uuid} className="me-3 text-primary" data-bs-container="#tooltip-container1" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit"><i className="mdi mdi-pencil font-size-18" /></Link>
                                                                                <span type="button" onClick={() => deleteCategory(item.uuid)} className="text-danger" data-bs-container="#tooltip-container1" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete"><i className="mdi mdi-trash-can font-size-18" /></span>
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                        : <tr>
                                                                            <td></td>
                                                                            <td></td>
                                                                            <td><h5>No category found</h5></td>
                                                                            <td></td>
                                                                        </tr>
                                                                )
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="row mt-3">
                                                <div className="col-sm-10">
                                                    <div className="dataTables_info pr-5" id="DataTables_Table_0_info" role="status" aria-live="polite">Showing  {paginationCount()}  Entries
                                                    </div>
                                                </div>
                                                <div className="col-sm-2">
                                                    {/* <div className="dataTables_paginate paging_simple_numbers" id="DataTables_Table_0_paginate">
                                                        <ul className="pagination pagination-rounded">
                                                            <li className="paginate_button page-item previous disabled" id="DataTables_Table_0_previous">
                                                                <a aria-controls="DataTables_Table_0" data-dt-idx="0" tabIndex="0" className="page-link">
                                                                    <i className="mdi mdi-chevron-left" />
                                                                </a>
                                                            </li>
                                                            <li className="paginate_button page-item active">
                                                                <a aria-controls="DataTables_Table_0" data-dt-idx="1" tabIndex="0" className="page-link">1</a>
                                                            </li>
                                                            <li className="paginate_button page-item ">
                                                                <a aria-controls="DataTables_Table_0" data-dt-idx="2" tabIndex="0" className="page-link">2</a>
                                                            </li>
                                                            <li className="paginate_button page-item next" id="DataTables_Table_0_next">
                                                                <a aria-controls="DataTables_Table_0" data-dt-idx="3" tabIndex="0" className="page-link"><i className="mdi mdi-chevron-right" /></a>
                                                            </li>
                                                        </ul>
                                                    </div> */}
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
                                                    // paginationCount={paginationCount}
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
export default Category