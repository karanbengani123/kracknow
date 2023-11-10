import React, { useEffect, useState } from "react";
import "../CssFile/Student.css";
import { Link } from "react-router-dom";
import SideNav from "./SideNav";
import Footer from "./Footer";
import Header from "./Header";
import ReactPaginate from "react-paginate";

function Wallethistory() {
  const [walletBalance, setWalletBalance] = useState("");
  const [transactionList, setTransactionList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [items, setItems] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [addmoneyRequestList, setAddmoneyRequestList] = useState([]);
  const [totalcount, setTotalcount] = useState();

  useEffect(() => {
    walletballance();
  }, []);

  let walletballance = async (page) => {
    let result = await fetch(
      `http://localhost:3000/wallet/wallettransactions?limit=${itemsPerPage}&page=${page}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (result.status == 200) {
      const data = await result.json();
      console.log(data.payload);
      setAddmoneyRequestList(data.payload.Wallettransactionslistreq.rows);
      setTransactionList(data.payload.Wallettransactionslist.rows);
      setTotalPage(
        Math.ceil(data.payload.Wallettransactionslist.count / itemsPerPage)
      );
      setTotalcount(data.payload.Wallettransactionslist.count);
      //   setTotalLength(data.payload.rows.length);
    } else {
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
                    <h4 className="mb-sm-0">Wallet History</h4>
                    <div className="page-title-right">
                      <ol className="breadcrumb m-0">
                        <Link to="/Wallet" className="breadcrumb-item">
                          My Wallet
                        </Link>
                        <li className="breadcrumb-item active">
                          Wallet History
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
                        <div className="col-sm-3">
                          {/* <div className="search-box me-2 mb-2 d-inline-block"> */}
                          {/* <div className="position-relative">
                              <label
                                for="search-bar-0"
                                className="search-label"
                              >
                                <span
                                  id="search-bar-0-label"
                                  className="sr-only"
                                >
                                  Search this table
                                </span>
                                <input
                                  id="search-bar-0"
                                  type="text"
                                  aria-labelledby="search-bar-0-label"
                                  className="form-control"
                                  placeholder="Search"
                                />
                              </label>
                              <i className="bx bx-search-alt search-icon"></i>
                            </div> */}
                          {/* </div> */}
                        </div>

                        <div className="col-sm-9">
                          <div className="text-sm-end">
                            {/* <div>
                                                            <Link to="/Wallettobank1" className="btn btn-success mb-2 addstudent"><i className="mdi mdi-plus me-1" />Add</Link>
                                                        </div> */}
                          </div>
                        </div>
                      </div>
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
                              <th>Payment type</th>
                              <th>Payment Mode</th>
                              <th>Date</th>
                              <th>Amount</th>
                              <th>Message</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {transactionList.map((item, index) => {
                              return (
                                <tr key={index}>
                                  <td>{item.paymentMode}</td>
                                  {item.type === "OUTBOUND" ? (
                                    <td>
                                      <span className="badge bg-success">
                                        {item.type}
                                      </span>
                                    </td>
                                  ) : (
                                    <td>
                                      <span className="badge bg-warning">
                                        {item.type}
                                      </span>
                                    </td>
                                  )}
                                  {/* <td>
                                    <span className="badge bg-success">
                                      {item.type}
                                    </span>
                                  </td> */}
                                  <td>{getDateTime(item.createdAt)}</td>
                                  <td>{item.amount}</td>
                                  <td>{item.statusMsg}</td>
                                  {item.status === "SUCCESS" ? (
                                    <td>
                                      <span className="badge bg-success">
                                        {item.status}
                                      </span>
                                    </td>
                                  ) : (
                                    <td>
                                      <span className="badge bg-warning">
                                        {item.status}
                                      </span>
                                    </td>
                                  )}
                                </tr>
                              );
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
                      {/* <div className="row">
                                                <div className="col-sm-10">
                                                    <div className="dataTables_info pr-5" id="DataTables_Table_0_info" role="status" aria-live="polite">Showing 1 to 2 of 2 entries
                                                    </div>
                                                </div>
                                                <div className="col-sm-2">
                                                    <div className="dataTables_paginate paging_simple_numbers" id="DataTables_Table_0_paginate">
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
  );
}
export default Wallethistory;

//transactionList.map((item, index) => {
//   return (
//     <tr key={index}>
//       <td>
//         {addmoneyRequestList.map((e) => {
//           if (e.referenceId !== null) {
//             console.log(e.referenceId);
//             console.log(item.referenceId);
//             if (
//               e.referenceId === item.referenceId
//             ) {
//               return (
//                 <p style={{ margin: "0" }}>
//                   Credit
//                 </p>
//               );
//             }
//             // else {
//             //     return (
//             //         <p style={{ margin: "0" }}>
//             //           Debit
//             //         </p>
//             //       );
//             // }
//           }
//         })}
//       </td>
//       <td>{item.createdAt}</td>
//       <td>{item.amount}</td>
//       {item.status === "SUCCESS" ? (
//         <td className="badge bg-success">
//           {item.status}
//         </td>
//       ) : (
//         <td className="badge bg-warning">
//           {item.status}
//         </td>
//       )}
//       {/* <td className="badge bg-success">{item.status}</td> */}
//       {/* {item.status === "PENDING" ? (
//                                                 <td>
//                                                     <span className="badge bg-danger">
//                                                         {item.status.replace(
//                                                             item.status,
//                                                             "pending"
//                                                         )}
//                                                     </span>
//                                                 </td>
//                                             ) : (
//                                                 <td>
//                                                     <span className="badge bg-success">
//                                                         {item.status.replace(
//                                                             item.status,
//                                                             "completed"
//                                                         )}
//                                                     </span>
//                                                 </td>
//                                             )} */}
//       {/* <td>
//         <Link
//           to={
//             "/Cashfreereview/" + item.wallet?.uuid
//           }
//           className="badge bg-success ReviewBtn"
//         >
//           See more
//         </Link>
//       </td> */}
//     </tr>
//   );
// })}
