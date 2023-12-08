import React, { useState, useEffect, useCallback } from "react";
import "../CssFile/Student.css";
import { Link, useParams } from "react-router-dom";
import SideNav from "./SideNav";
import Footer from "./Footer";
import Header from "./Header";
import { debounce } from "lodash";
import ReactPaginate from "react-paginate";
import Environment from "./Environment";
import loader from "../Images/loader.gif";

function Withdraw() {
  const [Cashfreelist, setCashfreeList] = useState([]);
  const [remarks, setRemarks] = useState("Testing");
  const [amount, setAmount] = useState("");
  const [transferMode, setTranferMode] = useState("");
  const [upiID, setupiID] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalPage, setTotalPage] = useState(0);
  const [items, setItems] = useState([]);

  const [totalcount, setTotalcount] = useState();
  const [totalLength, setTotalLength] = useState("");
  const [filter, setFilter] = useState("");
  const [filters, setFilters] = useState("");
  const [loading, setLoading] = useState(false);

  const params = useParams();

  useEffect(() => {
    GetAcceptWithdrawlList();
    // searchtable()
  }, []);

  const GetAcceptWithdrawlList = async (page) => {
    setLoading(true);

    let result = await fetch(
      `${Environment.server_url}/students/withdrawalrequest/list?limit=${itemsPerPage}&page=${page}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      }
    );
    result = await result.json();
    setLoading(false);
    setCashfreeList(result.payload.rows);
    setTotalPage(Math.ceil(result.payload.count / itemsPerPage));
    setTotalcount(result.payload.count);
    setTotalLength(result.payload.rows.length);
  };

  //TimeFormat Code Start
  const formatAMPM = (date) => {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  };

  const getDateTime = (dateString) => {
    if (!dateString) {
      return;
    }
    const d = dateString;
    const date = new Date(d);
    return (
      [
        date.getDate(),
        date.toLocaleString("default", { month: "long" }),
        date.getFullYear(),
      ].join(" ") +
      ", " +
      formatAMPM(date)
    );
  };

  //Search Exam
  const searchHandler = (event) => {
    handler(event);
  };

  const handler = useCallback(
    debounce((event) => searchtable(event.target.value), 500),
    []
  );

  const searchtable = async (key) => {
    // let key = event.target.value
    setLoading(true);
    let result = await fetch(
      `${Environment.server_url}/students/withdrawalrequest/list?limit=${itemsPerPage}&page=1&q=${key}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      }
    );
    result = await result.json();
    setLoading(false);
    if (result) {
      setCashfreeList(result.payload.rows);
      setTotalPage(Math.ceil(result.payload.count / itemsPerPage));
      setTotalcount(result.payload.count);
      setTotalLength(result.payload.rows.length);
    }
  };

  //Exam Pagination
  const handlePageChange = async (data) => {
    setCurrentPage(data.selected + 1);
    const ExamFromServer = await GetAcceptWithdrawlList(data.selected + 1);
    setItems(ExamFromServer);
  };

  const paginationCount = () => {
    if (Cashfreelist.length === 0) {
      return (
        (currentPage === 1
          ? totalcount
            ? 1
            : 0
          : itemsPerPage * (currentPage - 1) + 1
        ).toString() +
        " to " +
        (totalcount < currentPage * itemsPerPage
          ? totalcount
          : currentPage * itemsPerPage
        ).toString() +
        " of " +
        (totalcount ? totalcount : 0).toString()
      );
    }

    return (
      (currentPage === 1
        ? totalcount
          ? 1
          : 0
        : itemsPerPage * (currentPage - 1) + 1
      ).toString() +
      " to " +
      (totalcount < currentPage * itemsPerPage
        ? totalcount
        : currentPage * itemsPerPage
      ).toString() +
      " of " +
      (totalcount ? totalcount : 0).toString()
    );
  };
  // onChange={searchHandler}

  const handleapproveamount = async (data) => {
    let result = await fetch(
      `${Environment.server_url}/wallet/allhistory?limit=2&page=1`,
      {
        method: "POST",
        body: JSON.stringify({ studentId: data }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      }
    );
    result = await result.json();
    console.log(result);
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
                    <h4 className="mb-sm-0">Withdraw Request List</h4>
                    <div className="page-title-right">
                      {/* <ol className="breadcrumb m-0">
                            <li className="breadcrumb-item"><a href="javascript: void(0);">Withdraw requests</a></li>
                            <li className="breadcrumb-item active">Withdraw Request list</li>
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
                      <div className="col-sm-4">
                        <div className="search-box me-2 mb-2 d-inline-block">
                          <div className="position-relative">
                            <label for="search-bar-0" className="search-label">
                              <span id="search-bar-0-label" className="sr-only">
                                Search this table
                              </span>
                              <input
                                id="search-bar-0"
                                type="text"
                                aria-labelledby="search-bar-0-label"
                                className="form-control"
                                placeholder="Search"
                                onChange={searchHandler}
                              />
                            </label>
                            <i className="bx bx-search-alt search-icon"></i>
                          </div>
                        </div>
                      </div>
                      <div className="table-responsive mt-3">
                        <table
                          className="table table-bordered datatable dt-responsive nowrap"
                          style={{
                            borderCollapse: "collapse",
                            borderSpacing: 0,
                            width: "100%",
                          }}
                        >
                          <thead className="thead-light">
                            <tr>
                              {/* <th style={{ width: 20 }}>
                                      <div className="form-check">
                                          <input type="checkbox" className="form-check-input" id="customercheck" />
                                          <label className="form-check-label mb-0" htmlFor="customercheck">&nbsp;</label>
                                      </div>
                                  </th> */}
                              <th>Student</th>
                              <th>Payment type</th>
                              <th>Amount</th>
                              {/* <th>Bank name</th> */}
                              {/* <th>Payment type value</th> */}
                              {/* <th>Receipt</th> */}
                              <th>Requested date</th>
                              <th>Status</th>
                              {/* <th>Status msg</th> */}
                              {/* <th>Account number</th>
                                <th>Upi id</th>
                                <th>Transfer id</th> */}
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {loading ? (
                              <tr className="" style={{ paddingBottom: "11%" }}>
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
                            ) : (
                              Cashfreelist.map((item, index) => (
                                // item.withdrawlRequests_Student.map((items, index) =>
                                <tr key={index}>
                                  <td>
                                    {item.withdrawlRequests_Student?.firstName}{" "}
                                    {item.withdrawlRequests_Student?.lastName}
                                  </td>
                                  <td>{item.transferMode}</td>
                                  <td>{item.amount}</td>
                                  {/* <td>{item.bankName}</td> */}
                                  <td>{getDateTime(item.createdAt)}</td>
                                  {item.status === "PENDING" ? (
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
                                  )}
                                  {/* <td>{item.statusMsg}</td> */}
                                  {/* {
                                                                            items.accountNumber === null ?
                                                                                <td>--</td>
                                                                                :
                                                                                <td>{items.accountNumber}</td>
                                                                        } */}
                                  {/* {
                                                                            items.upiID === null || " " ?
                                                                                <td>--</td>
                                                                                :
                                                                                <td>{items.upiID}</td>
                                                                        } */}
                                  {/* <td>{items.transferId}</td> */}
                                  <td>
                                    <Link to={"/UpdateRequest/" + item.uuid}>
                                      <button
                                        type="button"
                                        className="btn btn-success btn-sm"
                                      >
                                        Request Details
                                      </button>
                                    </Link>
                                  </td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>
                      <div className="row">
                        <div className="col-sm-10">
                          <div
                            className="dataTables_info pr-5"
                            id="DataTables_Table_0_info"
                            role="status"
                            aria-live="polite"
                          >
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
export default Withdraw;