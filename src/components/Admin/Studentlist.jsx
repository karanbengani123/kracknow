import React, { useCallback, useState, useEffect } from "react";
import '../CssFile/Student.css';
import { Link } from 'react-router-dom';
import SideNav from "./SideNav";
import Footer from "./Footer";
import Header from "./Header";
import Popup from 'reactjs-popup';
import "../CssFile/Popup.css";
import ReactPaginate from "react-paginate";
import { debounce } from 'lodash';
import loader from '../Images/loader.gif';
import Environment from "./Environment";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import ReactDOM from 'react-dom';
// import Modal from 'react-modal';

function Studentlist() {

    // const customStyles = {
    //     content: {
    //         top: '50%',
    //         left: '50%',
    //         right: 'auto',
    //         bottom: 'auto',
    //         marginRight: '-50%',
    //         transform: 'translate(-50%, -50%)',
    //     },
    // };

    // let subtitle;
    // const [modalIsOpen, setIsOpen] = React.useState(false);

    // function openModal() {
    //     setIsO pen(true);
    // }

    // function afterOpenModal() {

    //     subtitle.style.color = '#f00';
    // }

    // function closeModal() {
    //     setIsOpen(false);
    // }

    // const notify = () => toast("Student Deleted Successfully!");

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [totalPage, setTotalPage] = useState(0)
    const [items, setItems] = useState([]);

    const [totalcount, setTotalcount] = useState()
    const [totalLength, setTotalLength] = useState()

    const [student, setStudent] = useState([]);
    const [fromDate, setFromDate] = useState([]);
    const [toDate, setToDate] = useState([])
    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        getStudentlist(currentPage);
    }, [])


    const getStudentlist = async (page) => {
        setLoading(true)
        let result = await fetch(`${Environment.server_url}/students?limit=${itemsPerPage}&page=${page}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setStudent(result.payload.students.rows);
        setLoading(false)
        setTotalPage(Math.ceil(result.payload.count / itemsPerPage));
        setTotalcount(result.payload.count);
        setTotalLength(result.payload.students.rows.length);

    }
    // console.warn("Studentlist", student);



    const handlePageChange = async (data) => {
        setCurrentPage(data.selected + 1);
        const categoryFromServer = await getStudentlist(data.selected + 1);
        setItems(categoryFromServer);
    }

    const paginationCount = () => {
        if (student.length === 0) {
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


    const deleteStudent = async (uuid) => {

        // if (student) {
        //     alert("Record is Delted")
        // }
        if (window.confirm("Delete Student!") == true) {
            let result = await fetch(`${Environment.server_url}/students/${uuid}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            })
            .then(catdata => {
                if (catdata.status === 200) {
                    setShowSuccess(true);
                    getStudentlist();
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
        }
    };
    const searchHandler = (event) => {
        handler(event);
    };

    const handler = useCallback(debounce((event) => searchtable(event.target.value), 1000), []);


    const searchtable = async (event) => {
        // let key = event.target.value
        setLoading(true)
        let result = await fetch(`${Environment.server_url}/students?q=${event}`,
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
            setStudent(result.payload.students.rows);
            setTotalPage(Math.ceil(result.payload.count / itemsPerPage));
            setTotalcount(result.payload.count);
            setTotalLength(result.payload.students.rows.length);
        }
    }

    const filter = async () => {
        let result = await fetch(`${Environment.server_url}/students?fromDate=${fromDate}&toDate=${toDate}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                }

            })
        result = await result.json();
        if (result) {
            setStudent(result.payload.students.rows)
            setTotalPage(Math.ceil(result.payload.count / itemsPerPage));
            setTotalcount(result.payload.count);
            setTotalLength(result.payload.students.rows.length);
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
                            {/* <ToastContainer
                                position="top-center"
                                autoClose={5000}
                                hideProgressBar
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover
                            /> */}

                            {/* {show ? (
                                <div class="modal bs-example-modal" tabindex="-1" role="dialog">
                                    <div class="modal-dialog" role="document">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title">Modal title</h5>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                <p>One fine body&hellip;</p>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-primary waves-effect waves-light">Save changes</button>
                                                <button type="button" class="btn btn-light waves-effect" data-bs-dismiss="modal">Close</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : null} */}

                            <div className="row">
                                <div className="col-12">
                                    <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                        <h4 className="mb-sm-0">Student List</h4>
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
                                                <div className="col-sm-2">
                                                    <div className="search-box me-2 mb-2 d-inline-block">
                                                        <div className="position-relative">
                                                            <label for="search-bar-0" className="search-label"><span id="search-bar-0-label" className="sr-only">Search this table</span><input id="search-bar-0" onChange={searchHandler} type="text" aria-labelledby="search-bar-0-label" className="form-control" placeholder="Search" /></label>
                                                            <i className="bx bx-search-alt search-icon">
                                                            </i>
                                                        </div>
                                                    </div>
                                                </div>

                                                <form className="col-sm-3">
                                                    <Popup trigger={<button type="button" className="btn filterbtn">Filter<i className="nav-icon fas fa-filter" /></button>}
                                                        position="bottom left"
                                                        closeOnDocumentClick
                                                    >
                                                        <div className="row d-flex flex-row justify-content-center align-items-center">
                                                            <div className="col-sm-6">
                                                                <p><b>Registration Start Date</b></p>
                                                                <input type="date" placeholder="YYYY-MM-DD" name="date" className="form-control" value={fromDate} onChange={(e) => { setFromDate(e.target.value) }} />
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <p><b>Registration End Date</b></p>
                                                                <input type="date" placeholder="YYYY-MM-DD" name="date" className="form-control" value={toDate} onChange={(e) => { setToDate(e.target.value) }} />
                                                            </div>
                                                            <div className="col text-center mt-2">
                                                                <input type="button" className="btn btn-sm btn-success mt-2" value="Submit" onClick={filter} /></div>
                                                        </div>
                                                    </Popup>
                                                </form>

                                                <div className="col-sm-7">
                                                    <div className="text-sm-end">
                                                        <div>
                                                            <Link to="/NewStudent" className="btn btn-success mb-2 addstudent"><i className="mdi mdi-plus me-1" />Add Student</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="table-responsive mt-3">
                                                <table className="table table-centered datatable dt-responsive nowrap" style={{ borderCollapse: 'collapse', borderSpacing: 0, width: '100%' }}>
                                                    <thead className="thead-light">
                                                        <tr>
                                                            <th>Profile Pic</th>
                                                            {/* <th>sl.no</th>
                                                            <th>Id</th> */}
                                                            <th>Name</th>
                                                            <th>Email</th>
                                                            <th>Mobile</th>
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
                                                                        <td></td>
                                                                        <td className="">
                                                                            <img
                                                                                src={loader}
                                                                                alt={"loader"}
                                                                                className={"mx-auto d-block"}
                                                                            />
                                                                        </td>
                                                                        {/* <td></td> */}
                                                                        <td></td>
                                                                        <td></td>
                                                                        <td></td>
                                                                        {/* <td></td> */}

                                                                    </tr>
                                                                )
                                                                :
                                                                (

                                                                    student.length > 0 ? student.map((item, index) =>
                                                                        <tr key={item}>
                                                                            <td>
                                                                                <img className="uploadprofile" src={item.profilePic || 'Placeholder.jpg'} alt="" />
                                                                            </td>
                                                                            {/* <td>{index + 1}</td> */}
                                                                            {/* <td>{item.uuid}</td> */}
                                                                            <td>{item.firstName} {item.lastName}</td>
                                                                            <td>{item.email}</td>
                                                                            <td>{item.mobileNumber}</td>
                                                                            <td>{item.status ? <span class="badge bg-success"> Active </span> : <span class="badge bg-danger"> Inactive </span>}</td>
                                                                            <td id="tooltip-container1">
                                                                                <Link to={"/studentview/" + item.uuid} className="me-3 text-primary" data-bs-container="#tooltip-container1" data-bs-toggle="tooltip" data-bs-placement="top" title="View"><i className="mdi mdi-eye font-size-18" /></Link>
                                                                                <Link to={"/StudentEdit/" + item.uuid} className="me-3 text-primary" data-bs-container="#tooltip-container1" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit"><i className="mdi mdi-pencil font-size-18" /></Link>
                                                                                <span
                                                                                    onClick={() => deleteStudent(item.uuid)}
                                                                                    className="text-danger"
                                                                                    data-bs-toggle="tooltip"
                                                                                    data-bs-placement="top"

                                                                                    title="Delete"
                                                                                >
                                                                                    <i className="mdi mdi-trash-can font-size-18" />
                                                                                </span>
                                                                                {/* <Modal
                                                                            isOpen={modalIsOpen}
                                                                            onAfterOpen={afterOpenModal}
                                                                            onRequestClose={closeModal}
                                                                            style={customStyles}
                                                                            contentLabel="Example Modal"
                                                                        >
                                                                            <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
                                                                            <button onClick={closeModal}>close</button>
                                                                            <div>I am a modal</div>
                                                                            <form>
                                                                                <input />
                                                                                <button>tab navigation</button>
                                                                                <button>stays</button>
                                                                                <button>inside</button>
                                                                                <button>the modal</button>
                                                                            </form>
                                                                        </Modal> */}
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                        :
                                                                        <tr>
                                                                            <td></td>
                                                                            <td></td>
                                                                            <td></td>
                                                                            <td><h4>No Students Found</h4></td>
                                                                            <td></td>
                                                                            <td></td>
                                                                        </tr>

                                                                )
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="row mt-3">
                                                <div className="col-sm-6">
                                                    <div className="dataTables_info pr-5" id="DataTables_Table_0_info" role="status" aria-live="polite">Showing {paginationCount()} entries
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
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
export default Studentlist