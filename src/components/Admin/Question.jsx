import React, { useCallback, useState, useEffect } from "react";
import '../CssFile/Student.css';
import { Link } from 'react-router-dom'
import { FiEye, FiTrash2, FiEdit } from "react-icons/fi";
import SideNav from "./SideNav";
import Footer from "./Footer";
import Header from "./Header";
import ReactPaginate from "react-paginate";
// import { applyStyle } from "draft-js/lib/CharacterMetadata";
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import loader from '../Images/loader.gif';
import { debounce } from 'lodash';
import Environment from "./Environment";
import DOMPurify, { sanitize } from 'dompurify';


function Question() {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [totalPage, setTotalPage] = useState(0)
    const [items, setItems] = useState([]);

    const [totalcount, setTotalcount] = useState()
    const [totalLength, setTotalLength] = useState('')

    const [options, setOptions] = useState('')
    const [question, setQuestion] = useState([]);
    const [show, setShow] = useState('')
    const [loading, setLoading] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        getQuestionlist(currentPage);
    }, [])

    const getQuestionlist = async (page) => {
        setLoading(true)
        let result = await fetch(`${Environment.server_url}/questions?limit=${itemsPerPage}&page=${page}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });

        result = await result.json();
        setQuestion(result.payload.list);
        setLoading(false)
        setTotalPage(Math.ceil(result.payload.count / itemsPerPage));
        setTotalcount(result.payload.count);
        setTotalLength(result.payload.list.length);
    }

    const handlePageChange = async (data) => {
        setCurrentPage(data.selected + 1);
        const questionFromServer = await getQuestionlist(data.selected + 1);
        setItems(questionFromServer);
    }

    const deleteQuestion = async (uuid) => {
        if (window.confirm("Delete Question!") == true) {
            let result = await fetch(`${Environment.server_url}/questions/${uuid}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            }).then(catdata => {
                if (catdata.status === 200) {
                    setShowSuccess(true);
                    getQuestionlist();
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
        // console.warn(event.target.value,"***********88")
        if(event.target.value.length > 0)
        {
            handler(event);
        }else{
            getQuestionlist(currentPage)
        }
    };
    const handler = useCallback(debounce((event) => searchtable(event.target.value), 500), []);

    const searchtable = async (key) => {
        // let key = event.target.value
        let result = await fetch(`${Environment.server_url}/questions?q=${key}&limit=${itemsPerPage}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            })
        result = await result.json();
        if (result) {
            setQuestion(result.payload.list);
            setTotalPage(Math.ceil(result.payload.count / itemsPerPage));
            setTotalcount(result.payload.count);
            setTotalLength(result.payload.list.length);
        }
    }

    const paginationCount = () => {
        if (question.length === 0) {
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

    if (show === true) {
        setTimeout(() => setShow(false), 5000);
    }
    if (showSuccess === true) {
        setTimeout(() => setShowSuccess(false), 5000);
    }

    // const myData = [].concat(this.state.data)
    // .sort((a, b) => a.itemM > b.itemM ? 1 : -1)
    // .map((item, i) => 
    //     <div key={i}> {item.matchID} {item.timeM}{item.description}</div>
    // );

    // const[data, setData] = useState('');
    // const[order, setOrder] = useState("ASC");

    // const sorting = (col) =>{
    //     if(order === "ASC"){
    //         const sorted = [..data].sort((a,b)=>
    //         a[col].toLowerCase() > b[col].toLowerCase
    //         );
    //     }
    // }

    return (
        <>
            <Header />
            <div className="content-wrapper admin-body">
                <section className="content">
                    <div className="container-fluid">
                        <div className="page-content">
                            {/* start page title */}
                            <div className="row">
                                <div className="col-12">
                                    <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                        <h4 className="mb-sm-0">Question List</h4>
                                        <div className="page-title-right">
                                            {/* <ol className="breadcrumb m-0">
                                                <li className="breadcrumb-item"><a href="javascript: void(0);">Question</a></li>
                                                <li className="breadcrumb-item active">Question List</li>
                                            </ol> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* end page title */}
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
                                                <div class="col-sm-4">
                                                    <div class="search-box me-2 mb-2 d-inline-block">
                                                        <div className="position-relative">
                                                            <label for="search-bar-0" className="search-label"><span id="search-bar-0-label" className="sr-only">Search this table</span><input onChange={searchHandler} id="search-bar-0" type="text" aria-labelledby="search-bar-0-label" className="form-control" placeholder="Search" /></label>
                                                            <i className="bx bx-search-alt search-icon">
                                                            </i>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-sm-8">
                                                    <div class="text-sm-end">
                                                        <div>
                                                            <Link to="/QuestionAdd" className="btn btn-success mb-2 ml-2 addstudent"><i className="mdi mdi-plus me-1 " />Add Questions</Link>
                                                            <Link to="/QuestionImport" className="btn btn-success mb-2 ml-2 addstudent"><i className="mdi mdi-import me-1" />Import</Link>
                                                            <a href={"https://kracknow-dev.s3.ap-south-1.amazonaws.com/image_store//Superadmin/Sample_download.xlsx"} className="btn btn-success mb-2 addstudent" download={"SampleDownload.csv"}><i className="mdi mdi-download me-1" />Sample download</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="table-responsive mt-3">
                                                <table className="table table-centered datatable dt-responsive nowrap" style={{ borderCollapse: 'collapse', borderSpacing: 0, width: '100%' }}>
                                                    <thead className="thead-light">
                                                        <tr>
                                                            <th>Category</th>
                                                            <th>Sub Category</th>
                                                            <th>Question</th>
                                                            <th>Options</th>
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
                                                                        <td></td>
                                                                        <td></td>
                                                                        <td></td>
                                                                        <td></td>
                                                                    </tr>
                                                                )
                                                                :
                                                                (
                                                                    question.length > 0 ? question.map((item, key) =>
                                                                        <tr key={key}>
                                                                            <td>{item?.questionCategory?.label}</td>
                                                                            <td>{item?.questionSubCategory?.label}</td>
                                                                            <td><Zoom><div dangerouslySetInnerHTML={{ __html: item.title }} ></div></Zoom></td>
                                                                            {/* {
                                                                                console.warn(<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.title) }} ></div>,"**************")
                                                                            } */}
                                                                            <td>
                                                                                {/* <span className="badge bg-dark mr-1">1.East</span>
                                                                        <span className="badge bg-success">2. North</span>
                                                                        <span className="badge bg-dark mr-1">3.West</span>
                                                                        <span className="badge bg-dark">4.South</span> */}
                                                                                {/* <InnerImageZoom src="/path/to/image.jpg" zoomSrc="/path/to/zoom-image.jpg" /> */}
                                                                                {item.options?.map(obj => {
                                                                                    return obj.isCorrect ? <span className="badge bg-success me-1 mr-1">{obj.key}. {obj.text}<br></br>
                                                                                        {
                                                                                            obj.image && <Zoom><img src={obj.image} className="Questionimage"></img></Zoom>
                                                                                        }
                                                                                    </span>
                                                                                        : <span className="badge bg-dark me-1 mr-1">{obj.key}. {obj.text}<br />
                                                                                            {
                                                                                                obj.image && <Zoom><img src={obj.image} className="Questionimage"></img></Zoom>
                                                                                            }
                                                                                        </span>
                                                                                })}
                                                                            </td>
                                                                            <td>
                                                                                {item.status ? <span class="badge bg-success"> Active </span> : <span class="badge bg-danger"> Inactive </span>}
                                                                            </td>
                                                                            <td id="tooltip-container1">
                                                                                <Link to={"/Questionview/" + item.uuid} className="me-3 text-primary" data-bs-container="#tooltip-container1" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit"><i className="mdi mdi-eye font-size-18" /></Link>
                                                                                <Link to={"/QuestionEdit/" + item.uuid} className="me-3 text-primary" data-bs-container="#tooltip-container1" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit"><i className="mdi mdi-pencil font-size-18" /></Link>
                                                                                <span
                                                                                    onClick={() => deleteQuestion(item.uuid)}
                                                                                    className="text-danger"
                                                                                    data-bs-toggle="tooltip"
                                                                                    data-bs-placement="top"
                                                                                    title="Delete"
                                                                                >
                                                                                    <i className="mdi mdi-trash-can font-size-18" />
                                                                                </span>
                                                                            </td>
                                                                        </tr>

                                                                    )
                                                                        :
                                                                        <tr>
                                                                            <td></td>
                                                                            <td></td>
                                                                            <td><h5>No question found</h5></td>
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
    );
}
export default Question;
