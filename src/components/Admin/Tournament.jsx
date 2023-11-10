import React, { useCallback, useState, useEffect } from "react";
import '../CssFile/Student.css';
import { Link } from 'react-router-dom';
import SideNav from "./SideNav";
import Footer from "./Footer";
import Header from "./Header";
import Moment from 'react-moment';
import ReactPaginate from "react-paginate";
import { debounce } from 'lodash';
import loader from '../Images/loader.gif';
import Environment from "./Environment";

function Exam() {
    const [tournament, setTournament] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [totalPage, setTotalPage] = useState(0)
    const [items, setItems] = useState([]);

    const [totalcount, setTotalcount] = useState()
    const [totalLength, setTotalLength] = useState('')
    const [filter, setFilter] = useState('')
    const [filters, setFilters] = useState('')
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        getTournament(currentPage);
        getCategory();
    }, [])

    const [category, setCategory] = useState([])
    //To Get The Category List.....
    const getCategory = async (page) => {
        let result = await fetch(`${Environment.server_url}/categories?limit=${itemsPerPage}&page=${page}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setCategory(result.payload.lists.rows);
    }

    const getTournament = async (page) => {
        setLoading(true)
        let result = await fetch(`${Environment.server_url}/tournaments/all/list?limit=${itemsPerPage}&page=${page}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                // "type":"EXAM",
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });

        result = await result.json();
        setTournament(result.payload.rows);
        setLoading(false)
        setTotalPage(Math.ceil(result.payload.count / itemsPerPage));
        setTotalcount(result.payload.count);
        setTotalLength(result.payload.list.length);
    }

    //To Delete The Category List.....
    const deleteTournamentList = async (uuid) => {
        if (window.confirm("Delete SubCategory") == true) {
            let result = await fetch(`${Environment.server_url}/tournaments/${uuid}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
            result = await result.json();
            getTournament();
            // setShow(result.message)
        };
    }

    //Search Exam
    const searchHandler = (event) => {
        handler(event);
    };

    const handler = useCallback(debounce((event) => searchtable(event.target.value), 500), []);

    const searchtable = async (key) => {
        // let key = event.target.value
        setLoading(true)
        let result = await fetch(`${Environment.server_url}/tournaments/allTournaments?q=${key}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            })
        result = await result.json();
        setLoading(false)
        if (result) {
            setTournament(result.payload.rows);
            setTotalPage(Math.ceil(result.payload.count / itemsPerPage));
            setTotalcount(result.payload.count);
            setTotalLength(result.payload.list.length);

        }
    }
    //Exam Pagination
    const handlePageChange = async (data) => {
        setCurrentPage(data.selected + 1);
        const ExamFromServer = await getTournament(data.selected + 1);
        setItems(ExamFromServer);
    }

    const paginationCount = () => {
        if (tournament.length === 0) {
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
                                        <h4 className="mb-sm-0">Tournament List</h4>
                                        <div className="page-title-right">
                                            {/* <ol className="breadcrumb m-0">
                                                <li className="breadcrumb-item"><a href="javascript: void(0);">Exam</a></li>
                                                <li className="breadcrumb-item active">Exam List</li>
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
                                                <div class="col-sm-6">
                                                    <div class="search-box me-2 mb-2 d-inline-block">
                                                        <div class="position-relative">
                                                            <label for="search-bar-0" className="search-label"><span id="search-bar-0-label" className="sr-only">Search this table</span><input id="search-bar-0" type="text" aria-labelledby="search-bar-0-label" onChange={searchHandler} className="form-control" placeholder="Search" /></label>
                                                            <i class="bx bx-search-alt search-icon">
                                                            </i>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <div className="col-sm-2">
                                                    <select className="form-select form-select mb-2" aria-label="Default select example" onClick={getTournament} onChange={(e) => { setFilter(e.target.value); }}>
                                                        <option value={""}>Select category</option>
                                                        {
                                                            category.map((item) =>
                                                                <option value={item.uuid}>{item.label}</option>
                                                            )
                                                        }

                                                    </select>
                                                </div> */}
                                                {/* <div className="col-sm-2">
                                                    <select className="form-select form-select mb-2" aria-label="Default select example" onClick={getTournament} onChange={(e) => { setFilters(e.target.value) }}>
                                                        <option value={""}>Filter Exam</option>
                                                        <option value={"UNSCHEDULED"}>Unscheduled</option>
                                                        <option value={"SCHEDULED"}>Scheduled</option>
                                                        <option value={"COMPLETED"}>Completed</option>
                                                    </select>
                                                </div> */}
                                                <div class="col-sm-6">
                                                    <div class="text-sm-end">
                                                        <div>
                                                            <Link to="/Tournamentadd" className="btn btn-success mb-2 addstudent"><i className="mdi mdi-plus me-1" />Add Tournament</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="table-responsive mt-3">
                                                <table className="table table-centered datatable dt-responsive nowrap" style={{ borderCollapse: 'collapse', borderSpacing: 0, width: '100%' }}>
                                                    <thead className="thead-light">
                                                        <tr>
                                                            <th>Tournament id</th>
                                                            <th>Title</th>
                                                            <th>Category</th>
                                                            <th>Start time</th>
                                                            <th>End time</th>
                                                            <th>Total Exam</th>
                                                            <th>Is feature exam</th>
                                                            <th>Status</th>
                                                            <th>Action</th>
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
                                                                        <td></td>
                                                                        <td></td>
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
                                                                        <td></td>
                                                                        <td></td>
                                                                        <td></td>

                                                                    </tr>
                                                                )
                                                                :
                                                                (
                                                                    tournament.length > 0 ? tournament.map((item, key) =>
                                                                        <tr>
                                                                            {/* <td><button type="button" class="btn btn-success btn-sm accordion-toggle collapsed" id="accordion1" data-toggle="collapse" data-parent="#accordion1" href="#collapseOne">+</button></td> */}
                                                                            <td>{item.identifier}</td>
                                                                            <td>{item.title}</td>
                                                                            {
                                                                                item.category !== null ?
                                                                                    <td>{item.category.label}</td>
                                                                                    :
                                                                                    <td>---------</td>
                                                                            }

                                                                            {
                                                                                item.tournamentSchedule.length > 0 ?
                                                                                    <td>{item.tournamentSchedule[0].startTime ? <span>{getDateTime(item.tournamentSchedule[0].startTime)}</span> : <span>-----</span>}</td>
                                                                                    :
                                                                                    <td>----------</td>
                                                                            }
                                                                            {
                                                                                item.tournamentSchedule.length > 0 ?
                                                                                    <td>{item.tournamentSchedule[0].endTime ? <span>{getDateTime(item.tournamentSchedule[0].endTime)}</span> : <span>-----</span>}</td>
                                                                                    :
                                                                                    <td>----------</td>
                                                                            }
                                                                            {/* <td>{item.tournamentSchedule[0].endTime ? <span>{getDateTime(item.tournamentSchedule[0].endTime)}</span> : <span>-----</span>}</td> */}
                                                                            <td><span className="badge badge-warning">{item.tournamentExamSchedule.length}</span></td>
                                                                            <td>{item.isFeatured ? <span className="badge badge-success">YES</span> : <span className="badge badge-danger">NO</span>}</td>
                                                                            {
                                                                                item.tournamentSchedule.length > 0 ?
                                                                                    <td>{item.tournamentSchedule[0].status}</td>
                                                                                    :
                                                                                    <td>----------</td>
                                                                            }
                                                                            <td id="tooltip-container1" >
                                                                                <div className="iconss">
                                                                                    <Link to={"/tournamentview/" + item.uuid} className="me-1 text-primary" data-bs-container="#tooltip-container1" data-bs-toggle="tooltip" data-bs-placement="top" title="View"><i className="mdi mdi-eye font-size-18" /></Link>
                                                                                    <Link to={"/tournamentedit/" + item.uuid} className="me-1 text-primary" data-bs-container="#tooltip-container1" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit"><i className="mdi mdi-pencil font-size-18" /></Link>
                                                                                    <span type="button" onClick={() => deleteTournamentList(item.uuid)} className="text-danger" data-bs-container="#tooltip-container1" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete"><i className="mdi mdi-trash-can font-size-18" /></span>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                        :
                                                                        <tr>
                                                                            <td></td>
                                                                            <td></td>
                                                                            <td></td>
                                                                            <td></td>
                                                                            <td>No Tournament Found</td>
                                                                            <td></td>
                                                                            <td></td>
                                                                            <td></td>
                                                                            <td></td>
                                                                        </tr>

                                                                )
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-10">
                                                    <div className="dataTables_info pr-5" id="DataTables_Table_0_info" role="status" aria-live="polite">Showing {paginationCount()}  entries
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
export default Exam