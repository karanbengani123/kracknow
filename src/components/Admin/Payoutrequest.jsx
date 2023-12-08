import React, { useState, useEffect } from "react";
import "../CssFile/NewStudent.css";
import "../CssFile/Student.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import SideNav from "./SideNav";
import Footer from "./Footer";
import Header from "./Header";
import Environment from "./Environment";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

function Payoutrequest() {
  const [studentFirstName, setStudentFirstName] = useState("");
  const [studentLastName, setStudentLastName] = useState("");
  const [studentWalletBalance, setStudentWalletBalance] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [query, setQuery] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [walletList, setWalletList] = useState([]);
  const [show, setShow] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [startExamDisable, setStartExamDisable] = useState(false);
  const [showLoaderShow, setShowLoaderShow] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [noRequest, setNoRequest] = useState("");
  const [requestTimeerror, setRequestTimeerror] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    GetAcceptWithdrawlList();
  }, []);

  const GetAcceptWithdrawlList = async () => {
    let result = await fetch(
      `${Environment.server_url}/wallet/studentaddmoneyrequestforadmin/${params.uuid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      }
    );
    let results = await result.json();
    if (result.status === 200) {
      setWalletList(results.payload);
      // setCashfreeList(result.payload);
      setStudentFirstName(results.payload.addmoneyRequests_Student.firstName);
      setStudentEmail(results.payload.addmoneyRequests_Student.email);

      setStudentLastName(results.payload.addmoneyRequests_Student.lastName);
      setStudentWalletBalance(
        results.payload.addmoneyRequests_Student.studentWallet.balance
      );
    } else {
      setFetchError(result.message);
      setTimeout(() => {
        setFetchError("");
      }, 3000);
    }
  };

  const handaledata = async () => {
    setStartExamDisable(true);
    setShowLoaderShow(true);
    let result = await fetch(
      `${Environment.server_url}/wallet/adminaddmoney/${params.uuid}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      }
    );
    let results = await result.json();
    setStartExamDisable(false);
    setShowLoaderShow(false);
    if (result.status === 200) {
      navigate("/payoutrequest");
    } else {
      if (result.status === 404) {
        setNoRequest(results.message);
        setTimeout(() => {
          setNoRequest("");
        }, 3000);
      } else {
        setRequestTimeerror(results.message);
        setTimeout(() => {
          setRequestTimeerror("");
        }, 3000);
      }
    }
  };


  console.log(walletList.transactionImage)
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
                    <h4 className="mb-sm-0">Update Request</h4>
                    <div className="page-title-right">
                      <ol className="breadcrumb m-0">
                        <Link to="/payoutrequest" className="breadcrumb-item">
                        DepositRequest
                        </Link>
                        <li className="breadcrumb-item active">
                          UpdateRequest
                        </li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
              {show && (
                <div
                  className="alert alert-danger alert-dismissible fade show"
                  role="alert"
                >
                  <strong className="text-danger">{errorMessage}</strong>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                    onClick={() => setShow(false)}
                  ></button>
                </div>
              )}
              {showSuccess && (
                <div
                  className="alert alert-success alert-dismissible fade show"
                  role="alert"
                >
                  <strong className="text-success">{errorMessage}</strong>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                    onClick={() => setShowSuccess(false)}
                  ></button>
                </div>
              )}
              <div className="row">
                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-body">
                      {noRequest && (
                        <div
                          style={{
                            color: "red",
                            fontWeight: "bold",
                            marginBottom: "15px",
                          }}
                        >
                          {noRequest}
                        </div>
                      )}
                      {requestTimeerror && (
                        <div
                          style={{
                            color: "red",
                            fontWeight: "bold",
                            marginBottom: "15px",
                          }}
                        >
                          {requestTimeerror}
                        </div>
                      )}
                      {fetchError && (
                        <div
                          style={{
                            color: "red",
                            fontWeight: "bold",
                            marginBottom: "15px",
                          }}
                        >
                          {fetchError}
                        </div>
                      )}
                      <div className="form">
                        <div className="form-row mb-4">
                          <div className="col-12 col-sm-4">
                            <p className="mb-0">
                              <b>Student</b>
                            </p>
                            <p>
                              {studentFirstName} {studentLastName}
                            </p>
                          </div>
                          <div className="col-12 col-sm-4">
                            <p className="mb-0">
                              <b>Email</b>
                            </p>
                            <p>{studentEmail}</p>
                          </div>
                          <div className="col-12 col-sm-4">
                            <p className="mb-0">
                              <b>Request amount</b>
                            </p>
                            <span className="badge badge-warning">
                              {walletList.amount}
                            </span>
                          </div>
                        </div>

                        <div className="form-row mb-4">
                          <div className="col-12 col-sm-4">
                            <p className="mb-0">
                              <b>Student wallet balance</b>
                            </p>
                            <span className="badge badge-success">
                              {studentWalletBalance}
                            </span>
                          </div>
                          <div className="col-12 col-sm-4">
                            <p className="mb-0">
                              <b>Transaction Id</b>
                            </p>
                            <p>
                              <span className="badge bg-blue">
                                {walletList.transactionId}
                              </span>
                            </p>
                          </div>

                          <div className="col-12 col-sm-4">
                            <p className="mb-0">
                              <b>Status</b>
                            </p>
                            {walletList.status === "PENDING" ? (
                              <span className="badge badge-danger">
                                {paymentStatus.replace(
                                  paymentStatus,
                                  "pending"
                                )}
                              </span>
                            ) : (
                              <span className="badge badge-success">
                                {paymentStatus.replace(
                                  paymentStatus,
                                  "completed"
                                )}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="form-row mb-4">
                          <div className="col-12 col-sm-4">
                            <p className="mb-0">
                              <b>Transaction Image</b>
                            </p>
                            {walletList.transactionImage
                             && 
                            <Zoom>
                              <img
                                src={walletList.transactionImage}
                                style={{ maxWidth: "100px" }}
                              />
                            </Zoom>
                             }
                          </div>
                          {/* <div className="col-12 col-sm-4">
                            <label for="search-bar-0" className="search-label">
                              Query
                            </label>

                            <input
                              id="search-bar-0"
                              type="text"
                              aria-labelledby="search-bar-0-label"
                              className="form-control"
                              placeholder="query"
                              value={query}
                              onChange={(e) => setQuery(e.target.value)}
                            />
                          </div> */}
                        </div>
                        <div className="button">
                          <button
                            type="submit"
                            onClick={handaledata}
                            className="btn btn-success savebtn"
                            disabled={startExamDisable}
                          >
                            {showLoaderShow ? (
                              <span>
                                <span
                                  className="spinner-border spinner-border-sm mr-1"
                                  role="status"
                                  aria-hidden="true"
                                ></span>
                                Saving..
                              </span>
                            ) : (
                              "Complete request"
                            )}
                          </button>
                         
                            
                          <Link to="/payoutrequest">
                            <button type="button" className="btn">
                              Cancel
                            </button>
                          </Link>
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
export default Payoutrequest;
