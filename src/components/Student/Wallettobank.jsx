import React, { useEffect, useState } from "react";
import "../CssFile/Student.css";
import { Link } from "react-router-dom";
import SideNav from "./SideNav";
import Footer from "./Footer";
import Header from "./Header";
import loader from "../images/loader.gif";
import ReactPaginate from "react-paginate";
import { baseurl, baseurlwallet } from "./BaseUrl";

function Wallettobank() {
  const [walletBalance, setWalletBalance] = useState("");
  const [transactionList, setTransactionList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [items, setItems] = useState([]);
  const [totalPage, setTotalPage] = useState(0);

  const [getdata, setGetdata] = useState(false)
  const [totalcount, setTotalcount] = useState();

  useEffect(() => {
    walletballance();
  }, []);

  console.log(transactionList);
  // console.log(addmoneyRequestList)
  let walletballance = async (page) => {
    // let result = await fetch(`http://localhost:3000/baseurlwalletwallettransactionsforWithdrawal?limit=${itemsPerPage}&page=${page}`,
    let result = await fetch(
      `${baseurlwallet}/wallet/wallettransactionsforWithdrawal?limit=${itemsPerPage}&page=${page}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (result.status == 200) {
      const data = await result.json();
      setGetdata(true)
      console.log(data.payload.Wallettransactionslist.rows)
      let firstarray = data.payload.Wallettransactionslist.rows;
      // setAddmoneyRequestList(data.payload.Wallettransactionslistreq.rows);
      setTransactionList(firstarray);
      setTotalPage(
        Math.ceil(data.payload.Wallettransactionslist.count / itemsPerPage)
      );
      setTotalcount(data.payload.Wallettransactionslist.count);
    } else {
      setGetdata(false)

      document.getElementsByClassName("statusError")[0].innerText =
        "Something Went Wrong , Try After Some Time";
      setTimeout(() => {
        document.getElementsByClassName("statusError")[0].innerText = "";
      }, 3000);
    }
  };

  const handlePageChange = async (data) => {
    setCurrentPage(data.selected + 1);
    const ExamFromServer = await walletballance(data.selected + 1);
    setItems(ExamFromServer);
  };

  const paginationCount = () => {
    if (transactionList.length === 0) {
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

  const formatAMPM = (date) => {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;
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
  // console.log( );
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
                    <h4 className="mb-sm-0">Transfer Requests</h4>
                    <div className="page-title-right">
                      <ol className="breadcrumb m-0">
                        <Link to="/Wallet" className="breadcrumb-item">
                          My Wallet
                        </Link>
                        <li className="breadcrumb-item active">
                          Transfer Requests
                        </li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-sm-3"></div>

                        <div className="col-sm-9">
                          <div className="text-sm-end">
                            <div>
                              <Link
                                to="/Wallettobank1"
                                className="btn btn-success mb-2 addstudent"
                              >
                                <i className="mdi mdi-plus me-1" />
                                Add
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                      {getdata === false ? (
                        <img
                          src={loader}
                          alt={"loader"}
                          className={"mx-auto d-block"}
                        />
                      ) : (
                        <>
                          <div className="table-responsive mt-3">
                            <table
                              className="table table-centered datatable dt-responsive nowrap"
                              style={{
                                borderCollapse: "collapse",
                                borderSpacing: 0,
                                width: "100%",
                              }}
                            >
                              <thead className="thead-light">
                                <tr>
                                  <th>Date</th>
                                  <th>Payment type</th>
                                  <th>Amount</th>
                                  <th>Message</th>
                                  <th>Status</th>
                                </tr>
                              </thead>
                              <tbody>
                                {transactionList.map((resu) => {
                                  // if (resu.type === "OUTBOUND") {
                                  return (
                                    <tr className="hide-table-padding">
                                      <td>{getDateTime(resu.createdAt)}</td>

                                      {resu.type === "OUTBOUND" ? (
                                        <td>
                                          <span className="badge bg-success">
                                            Withdrawal
                                          </span>
                                        </td>
                                      ) : (
                                        <td>
                                          <span className="badge bg-warning">
                                            Deposit
                                          </span>
                                        </td>
                                      )}
                                      <td>{resu.amount}</td>
                                      <td>{resu.statusMsg}</td>
                                      {resu.status === "SUCCESS" ? (
                                        <td>
                                          <span className="badge bg-success">
                                            {resu.status}
                                          </span>
                                        </td>
                                      ) : (
                                        <td>
                                          <span className="badge bg-warning">
                                            {resu.status}
                                          </span>
                                        </td>
                                      )}
                                    </tr>
                                  );
                                  // }
                                })}
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
                        </>
                      )}
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
export default Wallettobank;
