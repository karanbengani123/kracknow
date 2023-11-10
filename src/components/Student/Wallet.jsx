import React, { useEffect, useState } from "react";
import "../CssFile/Student.css";
import { Link } from "react-router-dom";
import SideNav from "./SideNav";
import Footer from "./Footer";
import Header from "./Header";

function Wallet() {
  const [walletBalance, setWalletBalance] = useState("");

  useEffect(() => {
    walletballance();
  }, []);

  let walletballance = async () => {
    let result = await fetch("http://localhost:3000/wallet/balance", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (result.status == 200) {
      const data = await result.json();
      console.log(data);
      setWalletBalance(data.payload.balance);
    } else {
      document.getElementsByClassName("statusError")[0].innerText =
        "Something Went Wrong , Try After Some Time";
      setTimeout(() => {
        document.getElementsByClassName("statusError")[0].innerText = "";
      }, 3000);
    }
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
                    <h4 className="mb-sm-0">My Wallet</h4>
                    <div className="page-title-right">
                      <ol className="breadcrumb m-0">
                        <Link to="/Dashboard" className="breadcrumb-item">
                          Dashboard
                        </Link>
                        <li className="breadcrumb-item active">My Wallet</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-12">
                      <div className=" d-sm-flex align-items-center justify-content-center">
                        <p>
                          <b>Available Balance:</b>{" "}
                          <i
                            className="nav-icon fas fa-rupee-sign"
                            style={{ marginLeft: "5px" }}
                          />
                          {walletBalance ? walletBalance : "Waiting .."}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-5">
                    <div className="col-12">
                      <div className=" d-sm-flex align-items-center justify-content-center">
                        <Link to="/Addmoney">
                          <button
                            type="submit"
                            className="btn btn-success addmoney me-1"
                          >
                            <i className="mdi mdi-plus me-1" />
                            Add Money
                          </button>
                        </Link>
                        <Link to="/Wallethistory">
                          <button
                            type="submit"
                            className="btn btn-outline-success wallethistory"
                          >
                            Wallet History
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-12">
                      <div className=" d-sm-flex align-items-center justify-content-center">
                        <Link to="/Wallettobank">
                          <button
                            type="submit"
                            className="btn btn-success walletbank"
                          >
                            <i className="mdi mdi-bank me-1" />
                            Wallet to Bank transfer
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* <div className="col-md-12">
                                <div className="row">
                                    <div className="col-md-4">
                                    </div>
                                    <div className="col-md-4">
                                        <div className="row mt-2">
                                            <div className="col">
                                                <p><b>Available Balance:</b> Rs:1000</p>


                                            </div>


                                        </div>
                                        <div className="row mt-4">
                                            <div className="col">
                                                <Link to="/Addmoney"><button type="submit" className="btn btn-success  me-1"><i className="mdi mdi-plus me-1" />Add Money</button></Link>
                                                <Link to=""><button type="submit" className="btn btn-outline-success ">Wallet History</button></Link>
                                            </div>
                                        </div>
                                        <div className="row mt-4">
                                            <div className="col">
                                                <Link to="/Wallettobank"><button type="submit" className="btn btn-success walletbank"><i className="mdi mdi-bank me-1" />Wallet to Bank transfer</button></Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">

                                    </div>
                                </div>
                            </div> */}
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
export default Wallet;
