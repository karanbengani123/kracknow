import React, { useState } from "react";
import "../CssFile/Student.css";
import { Link, useNavigate } from "react-router-dom";
import SideNav from "./SideNav";
import Footer from "./Footer";
import Header from "./Header";
import { useForm } from "react-hook-form";
import { baseurl, baseurlwallet } from "./BaseUrl";

function Wallettobank1() {
  const [amount, setAmount] = useState("");
  const [addmoneytype, setAddmoneytype] = useState("");
  const [account, setAccount] = useState("");
  const [bankname, setBankname] = useState("");
  const [name, setName] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [upi, setUpi] = useState("");
  const [bankError, setBankError] = useState(false);
  const [upiError, setUpiError] = useState(false);
  const [show, setShow] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    console.log("data");
  };
  const navigate = useNavigate();

  const handlewallettobanktra = async () => {
    let upierrstate = false;
    let bankerrstate = false;
    if (addmoneytype === "upi") {
      if (!upi) {
        document.getElementsByClassName("upiidError")[0].innerText =
          "Upi ID Required";
        setUpiError(true);
        upierrstate = true;
      } else {
        // setTimeout(() => {
        //   document.getElementsByClassName("upiidError")[0].innerText = "";
        // }, 3000);
        setUpiError(false);
        upierrstate = false;
      }
    }

    if (addmoneytype === "bank") {
      if (!name) {
        document.getElementsByClassName("nameError")[0].innerText =
          "Name Required";
        setBankError(true);
        bankerrstate = true;
      } else {
        // setTimeout(() => {
        //   document.getElementsByClassName("nameError")[0].innerText = "";
        // }, 3000);
        setBankError(false);
        bankerrstate = false;
      }
      if (!bankname) {
        document.getElementsByClassName("banknameError")[0].innerText =
          "Bank Name Required";
        setBankError(true);
        bankerrstate = true;
      } else {
        // setTimeout(() => {
        //   document.getElementsByClassName("banknameError")[0].innerText = "";
        // }, 3000);
        setBankError(false);
        bankerrstate = false;
      }
      if (!account) {
        document.getElementsByClassName("accountError")[0].innerText =
          "Account Required";
        setBankError(true);
        bankerrstate = true;
      } else {
        // setTimeout(() => {
        //   document.getElementsByClassName("accountError")[0].innerText = "";
        // }, 3000);
        setBankError(false);
        bankerrstate = false;
      }
      if (!ifsc) {
        document.getElementsByClassName("ifscError")[0].innerText =
          "IFSC Required";
        setBankError(true);
        bankerrstate = true;
      } else {
        // setTimeout(() => {
        //   document.getElementsByClassName("ifscError")[0].innerText = "";
        // }, 3000);
        setBankError(false);
        bankerrstate = false;
      }
    }

    console.log(bankerrstate);
    console.log(upierrstate);
    if (
      !amount ||
      !addmoneytype ||
      bankerrstate === true ||
      upierrstate === true
    ) {
      if (!amount) {
        document.getElementsByClassName("AmountError")[0].innerText =
          "Amount Required";
      } else {
        // setTimeout(() => {
        //   console.log('call')
        //   document.getElementsByClassName("AmountError")[0].innerText = "";
        // }, 3000);
      }
      if (!addmoneytype) {
        document.getElementsByClassName("addmoneytypeError")[0].innerText =
          "Payment Type Required";
      } else {
        // setTimeout(() => {
        //   document.getElementsByClassName("addmoneytypeError")[0].innerText =
        //     "";
        // }, 3000);
      }
    } else {
      let result = await fetch(
        `${baseurlwallet}/wallet/studentwithdrawalrequest`,
        {
          method: "POST",
          body: JSON.stringify({
            amount: amount,
            transferMode: addmoneytype,
            upiID: upi,
            accountHolder: name,
            bankName: bankname,
            accountNumber: account,
            IFSCCode: ifsc,
          }),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ).then(async (result) => {
        if (result.status === 200) {
          setShowSuccess(true);
          canclebtn();
          setTimeout(() => {
            setShowSuccess(false);
            navigate("/Wallet");
          }, 3000);
          return result.json();
        } else {
          result = await result.json();
          console.log("------", result.message);
          document.getElementsByClassName("statusError")[0].innerText =
            result.message;
          // "Something Went Wrong , Try After Some Time";
          setTimeout(() => {
            document.getElementsByClassName("statusError")[0].innerText = "";
          }, 3000);
        }
        throw result;
      });

      // result = await result.json();
      // console.warn("Login Result", result);
    }
    setTimeout(() => {
      console.log('call')
      document.getElementsByClassName("AmountError")[0].innerText = "";
      document.getElementsByClassName("addmoneytypeError")[0].innerText ="";
      document.getElementsByClassName("ifscError")[0].innerText = "";
      document.getElementsByClassName("accountError")[0].innerText = "";
      document.getElementsByClassName("banknameError")[0].innerText = "";
      document.getElementsByClassName("nameError")[0].innerText = "";
      document.getElementsByClassName("upiidError")[0].innerText = "";
    }, 3000);
  };

  const canclebtn = () => {
    setAmount("");
    setAddmoneytype("");
    setAccount("");
    setBankname("");
    setIfsc("");
    setName("");
    setUpi("");
    setBankError(false);
    setUpiError(false);
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
                    <h4 className="mb-sm-0">Add Transfer Requests</h4>
                    <div className="page-title-right">
                      <ol className="breadcrumb m-0">
                        <Link to="/Wallettobank" className="breadcrumb-item">
                          Transfer Requests
                        </Link>
                        <li className="breadcrumb-item active">
                          Add Transfer Requests
                        </li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
              {showSuccess && (
                <div
                  className="alert alert-success alert-dismissible fade show"
                  role="alert"
                >
                  <strong className="text-success">
                    {"Withdrawal Request Apply Successful "}
                  </strong>
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
                      <div className="form">
                        <form onSubmit={handleSubmit(onSubmit)}>
                          <div className="form-row ">
                            <div className="col-12 col-sm-4">
                              <p>
                                <b>Amount</b>
                              </p>
                              <input
                                type="num"
                                className="form-control"
                                name="Amount"
                                placeholder="Enter withdraw amount"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                              />
                              <p
                                className="AmountError"
                                style={{ color: "red", fontWeight: "bold" }}
                              ></p>
                            </div>

                            <div className="col-12 col-sm-4 ">
                              <p>
                                <b>Select Payment Type</b>
                              </p>
                              <select
                                className="form-select form-select  form-control valid"
                                aria-label="Default select example"
                                value={addmoneytype}
                                onChange={(e) =>
                                  setAddmoneytype(e.target.value)
                                }
                              >
                                <option selected>Select type</option>
                                <option value="upi">UPI ID</option>
                                <option value="paytm">Paytm</option>
                                <option value="bank">Bank</option>
                              </select>
                              <p
                                className="addmoneytypeError"
                                style={{ color: "red", fontWeight: "bold" }}
                              ></p>
                            </div>
                            <div className="col-12 col-sm-4">
                              {addmoneytype === "upi" && (
                                <>
                                  <p>
                                    <b>Enter Upi ID</b>
                                  </p>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="upi"
                                    placeholder="Enter Upi id"
                                    value={upi}
                                    onChange={(e) => setUpi(e.target.value)}
                                  />
                                  <p
                                    className="upiidError"
                                    style={{ color: "red", fontWeight: "bold" }}
                                  ></p>
                                </>
                              )}
                              {addmoneytype === "bank" && (
                                <>
                                  <div>
                                    <p>
                                      <b>Enter Bank</b>
                                    </p>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="bankname"
                                      placeholder="Enter Bank Name"
                                      value={bankname}
                                      onChange={(e) =>
                                        setBankname(e.target.value)
                                      }
                                    />
                                    {/* <select
                                      className="form-select form-select mb-2 form-control valid"
                                      aria-label="Default select example"
                                      value={bankname}
                                      onChange={(e) =>
                                        setBankname(e.target.value)
                                      }
                                    >
                                      <option selected>Select Bank Name</option>
                                      <option value="upi">loop</option>
                                    </select> */}
                                    <p
                                      className="banknameError"
                                      style={{
                                        color: "red",
                                        fontWeight: "bold",
                                      }}
                                    ></p>
                                  </div>
                                  <div>
                                    <p>
                                      <b>Account holder name</b>
                                    </p>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="name"
                                      placeholder="Enter Name"
                                      value={name}
                                      onChange={(e) => setName(e.target.value)}
                                    />
                                    <p
                                      className="nameError"
                                      style={{
                                        color: "red",
                                        fontWeight: "bold",
                                      }}
                                    ></p>
                                  </div>
                                  <div>
                                    <p>
                                      <b>Account number</b>
                                    </p>
                                    <input
                                      type="num"
                                      className="form-control"
                                      name="account"
                                      placeholder="Enter account number"
                                      value={account}
                                      onChange={(e) =>
                                        setAccount(e.target.value)
                                      }
                                    />
                                    <p
                                      className="accountError"
                                      style={{
                                        color: "red",
                                        fontWeight: "bold",
                                      }}
                                    ></p>
                                  </div>
                                  <div>
                                    <p>
                                      <b>IFSC</b>
                                    </p>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="ifsc"
                                      placeholder="Enter IFSC"
                                      value={ifsc}
                                      onChange={(e) => setIfsc(e.target.value)}
                                    />
                                    <p
                                      className="ifscError"
                                      style={{
                                        color: "red",
                                        fontWeight: "bold",
                                      }}
                                    ></p>
                                  </div>
                                </>
                              )}

                              {/* <p>
                                <b>Ref# Value</b>
                              </p>
                              <input
                                type="text"
                                className="form-control"
                                name="Value"
                                placeholder="Enter value"
                                {...register("Value", {
                                  required: {
                                    value: true,
                                    message: "*This field is required",
                                  },
                                })}
                              /> */}
                              {/* {errors.Value && (
                                <p className="errorText">
                                  {errors.Value.message}
                                </p>
                              )} */}
                              {/* <button type="button" className="btn btn-success savebtnn">Schedule now</button> */}
                            </div>
                          </div>
                          <p
                            className="statusError"
                            style={{ color: "red", fontWeight: "bold" }}
                          ></p>
                          <div className="button">
                            <button
                              type="submit"
                              className="btn btn-success savebtn"
                              onClick={handlewallettobanktra}
                            >
                              Schedule now
                            </button>
                            <button
                              type="button"
                              className="btn btn-success savebtn ml-2"
                              onClick={canclebtn}
                            >
                              Cancle
                            </button>
                          </div>
                        </form>
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
export default Wallettobank1;
