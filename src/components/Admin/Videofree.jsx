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
    const [exam, setExam] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [totalPage, setTotalPage] = useState(0);
    const [items, setItems] = useState([]);

    const [totalcount, setTotalcount] = useState();
    const [totalLength, setTotalLength] = useState('');
    const [filter, setFilter] = useState('EXAM'); // Default filter is EXAM
    const [filters, setFilters] = useState('');
    const [loading, setLoading] = useState(false);

    // Fetch exams on component mount
    useEffect(() => {
        getExam(currentPage, filter);
    }, [filter, currentPage]); 

    // Fetch Exams from the API
    const getExam = async (page, filter) => {
        setLoading(true);
        let result = await fetch(`${Environment.server_url}/schedules/all/exam/video?type=${filter}&limit=${itemsPerPage}&page=${page}&categories=${filters}&filter=${filters}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });

        result = await result.json();
        setExam(result.payload.response);
        setLoading(false);

        setTotalPage(Math.ceil(result.payload.count / itemsPerPage));
        setTotalcount(result.payload.count);
        setTotalLength(result.payload.list.length);
    };

    // Search Exam
    const searchHandler = (event) => {
        handler(event);
    };

    const handler = useCallback(debounce((event) => searchtable(event.target.value), 500), []);

    const searchtable = async (key) => {
        setLoading(true);
        let result = await fetch(`${Environment.server_url}/exams?q=${key}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setLoading(false);
        if (result) {
            setExam(result.payload.response);
            setTotalPage(Math.ceil(result.payload.count / itemsPerPage));
            setTotalcount(result.payload.count);
            setTotalLength(result.payload.list.length);
        }
    };

    // Handle Pagination
    const handlePageChange = async (data) => {
        setCurrentPage(data.selected + 1);
        await getExam(data.selected + 1, filter); // Re-fetch data on page change
    };

    // Count the number of exams being displayed
    const paginationCount = () => {
        if (exam.length === 0) {
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
    };

    // Handle filter change (EXAM or TOURNAMENT)
    const handleFilterChange = (e) => {
        setFilter(e.target.value); // Set the filter to either 'EXAM' or 'TOURNAMENT'
        setCurrentPage(1); // Reset to page 1 on filter change
    };

    // Time Formatting
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
                                        <h4 className="mb-sm-0">Video Ad Overview</h4>
                                        <div className="page-title-right">
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-sm-2">
                                                    <div className="search-box me-2 mb-2 d-inline-block">
                                                        <div className="position-relative">
                                                            <label for="search-bar-0" className="search-label"><span id="search-bar-0-label" className="sr-only">Search this table</span><input id="search-bar-0" type="text" aria-labelledby="search-bar-0-label" onChange={searchHandler} className="form-control" placeholder="Search" /></label>
                                                            <i className="bx bx-search-alt search-icon"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-2">
                                                    <select className="form-select form-select mb-2" aria-label="Default select example" value={filter} onChange={handleFilterChange}>
                                                        <option value="EXAM">Exam</option>
                                                        <option value="TOURNAMENT">Tournament</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="table-responsive mt-3">
                                                <table className="table table-centered datatable dt-responsive nowrap" style={{ borderCollapse: 'collapse', borderSpacing: 0, width: '100%' }}>
                                                    <thead className="thead-light">
                                                        <tr>
                                                            <th>Type</th>
                                                            <th>Title</th>
                                                            <th>Video Time</th>
                                                            <th>Video Length</th>
                                                            {/* <th>Start time</th>
                                                            <th>End time</th> */}
                                                            <th>Is Video exam</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {loading ? (
                                                            <tr>
                                                                <td colSpan="9">
                                                                    <img src={loader} alt="loader" className="mx-auto d-block" />
                                                                </td>
                                                            </tr>
                                                        ) : (
                                                            exam.length > 0 ? exam.map((item, key) =>
                                                                <tr key={key}>
                                                                    <td>{item.type}</td>
                                                                    <td>{item.title}</td>
                                                                    <td>{item.adViewDuration} Sec</td>
                                                                    <td>{item.videoAdLength} Sec</td>
                                                                    {/* <td>
                                                                        {item.type === 'EXAM' || item.type === 'QUIZ' || item.type === 'MOCKTEST'
                                                                            ? item.schedule[0].startTime 
                                                                                ? <span>{getDateTime(item.schedule[0].startTime)}</span> 
                                                                                : <span>-----</span>
                                                                            : filter === 'TOURNAMENT' 
                                                                                ? item.tournamentSchedule[0].startTime 
                                                                                    ? <span>{getDateTime(item.tournamentSchedule[0].startTime)}</span>
                                                                                    : <span>-----</span>
                                                                                : <span>-----</span> 
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        {item.type === 'EXAM' || item.type === 'QUIZ' || item.type === 'MOCKTEST'
                                                                            ? item.schedule[0].endTime 
                                                                                ? <span>{getDateTime(item.schedule[0].endTime)}</span> 
                                                                                : <span>-----</span>
                                                                            : filter === 'TOURNAMENT' 
                                                                                ? item.tournamentSchedule[0].endTime 
                                                                                    ? <span>{getDateTime(item.tournamentSchedule[0].endTime)}</span>
                                                                                    : <span>-----</span>
                                                                                : <span>-----</span> 
                                                                        }
                                                                    </td> */}

                                                                    <td>{ <span className="badge badge-success">YES</span>}</td>
                                                                    <td>
                                                                        {filter === "EXAM" ? (
                                                                            <Link to={`/Videofreeview/${item.uuid}`} className='badge bg-success ReviewBtn'>
                                                                                See more
                                                                            </Link>
                                                                        ) : filter === "TOURNAMENT" ? (
                                                                            <Link to={`/TournamentVideofreeview/${item.uuid}`} className='badge bg-success ReviewBtn'>
                                                                                See more
                                                                            </Link>
                                                                        ) : (
                                                                            <span>---</span> // Placeholder for cases where no filter is applied
                                                                        )}
                                                                    </td>
                                                                </tr>
                                                            ) : (
                                                                <tr>
                                                                    <td colSpan="9">No Exam Found</td>
                                                                </tr>
                                                            )
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-10">
                                                    <div className="dataTables_info pr-5" role="status" aria-live="polite">
                                                        Showing {paginationCount()} entries
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

export default Exam;
