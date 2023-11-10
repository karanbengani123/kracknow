import React, { useState, useEffect } from "react";
import '../CssFile/NewStudent.css';
import '../CssFile/Student.css';
import { Link, useParams, useNavigate } from 'react-router-dom';
import SideNav from "./SideNav";
import Footer from "./Footer";
import Header from "./Header";
import Environment from "./Environment";

function UpdateRequest() {
  const [studentFirstName, setStudentFirstName] = useState("")
  const [studentLastName, setStudentLastName] = useState("")
  const [studentWalletBalance, setStudentWalletBalance] = useState("")
  const [paymentStatus, setPaymentStatus] = useState("")
  const [Cashfreelist, setCashfreeList] = useState("")
  const [walletList, setWalletList] = useState([])
  const [show, setShow] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [noRequest, setNoRequest] = useState('')
  const [requestTimeerror, setRequestTimeerror] = useState('')
  const [errorMessage, setErrorMessage] = useState("")
  const [startExamDisable, setStartExamDisable] = useState(false);
  const [showLoaderShow, setShowLoaderShow] = useState(false);
  const [fetchError, setFetchError] = useState('')
  const [message, setMessage] = useState("");

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    GetAcceptWithdrawlList();
  }, [])

  const GetAcceptWithdrawlList = async () => {
    let result = await fetch(`${Environment.server_url}/students/withdrawalrequest/list/${params.uuid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    let results = await result.json();
    if (result.status === 200) {
      setWalletList(results.payload.withdrawalRequest)
      // setCashfreeList(result.payload);
      setStudentFirstName(results.payload.student.firstName);
      setStudentLastName(results.payload.student.lastName);
      setStudentWalletBalance(results.payload.student.wallet.balance);
    } else {
      setFetchError(results.message)
      setTimeout(() => {
        setFetchError('')
      }, 3000);
    }
  }

  const handaledata = async () => {
    let result = await fetch(`${Environment.server_url}/students/withdrawalrequest/${params.uuid}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      },
      body: JSON.stringify({'statusMsg':message})
    })
    let results = await result.json();
    if (result.status === 200) {
      navigate("/Withdraw")
    } else {
      if (result.status === 404) {
        setNoRequest(results.message)
        setTimeout(() => {
          setNoRequest('')
        }, 3000);
      } else {
        setRequestTimeerror(results.message)
        setTimeout(() => {
          setRequestTimeerror('')
        }, 3000);
      }
    }
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
                    <h4 className="mb-sm-0">Update Request</h4>
                    <div className="page-title-right">
                      <ol className="breadcrumb m-0">
                        <Link to="/Withdraw" className="breadcrumb-item">Withdraw requests</Link>
                        <li className="breadcrumb-item active">UpdateRequest</li>
                      </ol>
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
                      {noRequest && <div style={{ color: "red", fontWeight: 'bold', marginBottom: "15px" }}>{noRequest}</div>}
                      {requestTimeerror && <div style={{ color: "red", fontWeight: 'bold', marginBottom: "15px" }}>{requestTimeerror}</div>}
                      {fetchError && <div style={{ color: "red", fontWeight: 'bold', marginBottom: "15px" }}>{fetchError}</div>}

                      <div className="form">
                        <div className="form-row mb-4">
                          <div className="col-12 col-sm-4">
                            <p className="mb-0"><b>Student</b></p>
                            <p>{studentFirstName} {studentLastName}</p>
                          </div>
                          <div className="col-12 col-sm-4">
                            <p className="mb-0"><b>Student wallet balance</b></p>
                            <span className="badge badge-success">{studentWalletBalance}</span>
                          </div>
                          <div className="col-12 col-sm-4">
                            <p className="mb-0"><b>Request amount</b></p>
                            <span className="badge badge-warning">{walletList.amount}</span>
                          </div>
                        </div>

                        <div className="form-row mb-4">
                          <div className="col-12 col-sm-4">
                            <p className="mb-0"><b>Payment type</b></p>
                            <p><span className="badge bg-blue">{walletList.transferMode}</span></p>
                          </div>

                          <div className="col-12 col-sm-4">
                            <p className="mb-0"><b>Account number</b></p>
                            <p>{walletList.accountNumber}</p>
                          </div>
                          <div className="col-12 col-sm-4">
                            <p className="mb-0"><b>Bank name</b></p>
                            <p>{walletList.bankName}</p>
                          </div>
                        </div>
                        <div className="form-row mb-4">

                          <div className="col-12 col-sm-4">
                            <p className="mb-0"><b>Upi id</b></p>
                            <p>{walletList.upiID}</p>
                          </div>

                          <div className="col-12 col-sm-4">
                            <p className="mb-0"><b>Transfer id</b></p>
                            <p>{walletList.transferId}</p>
                          </div>
                          <div className="col-12 col-sm-4">
                            <p className="mb-0"><b>Requested at</b></p>
                            <p>{(walletList.createdAt)}</p>
                          </div>
                        </div>
                        <div className="form-row mb-4">
                          <div className="col-12 col-sm-4">
                            <p className="mb-0"><b>Status</b></p>
                            {
                              walletList.status === "PENDING" ?
                                <span className="badge badge-danger">{(paymentStatus).replace((paymentStatus), "pending")}</span>
                                :
                                <span className="badge badge-success">{(paymentStatus).replace((paymentStatus), "completed")}</span>
                            }
                          </div>
                          <div className="col-12 col-sm-4">
                          <p className="mb-0"><b>Message</b></p>
                            <input
                              type="text"
                              class="form-control"
                              name="upi"
                              placeholder="Enter message"
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                            />
                          </div>
                          {/* {walletList.statusMsg === null ? <span></span> : <div className="col-12 col-sm-4">
                            <p className="mb-0"><b>Status message</b></p>
                            <span className="badge badge-danger"><b>{walletList.statusMsg}</b></span>
                          </div>
                          } */}

                        </div>
                        <div className="button">
                          <button type="submit" onClick={handaledata} className="btn btn-success savebtn" disabled={startExamDisable}>
                            {
                              showLoaderShow ?
                                (
                                  <span >
                                    <span className="spinner-border spinner-border-sm mr-1" role="status" aria-hidden="true"></span>
                                    Saving..
                                  </span>
                                )
                                :
                                (
                                  "Complete request"
                                )
                            }
                          </button>
                          <Link to="/Withdraw"><button type="button" className="btn">Cancel</button></Link>
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
export default UpdateRequest;