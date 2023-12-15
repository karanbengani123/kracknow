import React, { useEffect, useState } from "react";
import "../CssFile/Student.css";
import { Link } from "react-router-dom";
import SideNav from "./SideNav";
import Footer from "./Footer";
import Header from "./Header";
import { baseurlwallet } from "./BaseUrl";

function Addmoney() {
  const [transactionid, setTransactionid] = useState("");
  const [transactionimg, setTransactionimg] = useState("");
  const [walletBalance, setWalletBalance] = useState("");
  const [transactionamount, setTransactionamount] = useState("");
  const [startExamDisable, setStartExamDisable] = useState(false);
  const [showLoaderShow, setShowLoaderShow] = useState(false);
  const [error1, setError1] = useState(false);
  const [blobImage, setBlobImage] = useState("");
  const [fileName, setFileName] = useState("");
  const [baseimg, setBaseimg] = useState("");
  const [bankList, setBankList] = useState([]);
  const [fetchError, setFetchError] = useState("");
  const [amountbtnclick, setAmountbtnclick] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handletransactionimg = (e) => {
    let addImage = e.target.files[0];
    const maxSizeBytes = 2 * 1024 * 1024; // 2 MB
    console.log(addImage.size > maxSizeBytes);
    if (addImage.size > maxSizeBytes === true) {
      document.getElementsByClassName("imagesizeerror")[0].innerText =
        "Maximun Size is 2Mb";
    } else {
      document.getElementsByClassName("imagesizeerror")[0].innerText = "";
      setTransactionimg(addImage);
      // Process the file
    }

    convertFileToBase64(addImage)
      .then((base64String) => {
        console.log(base64String);
        setBaseimg(base64String);
      })
      .catch((error) => {
        console.error("Error converting file to Base64:", error);
      });
  };
  // // console.log(transactionimg);

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        resolve(event.target.result);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  };

  useEffect(() => {
    walletballance();
    fetchbankDetails();
  }, []);

  let handleamountClick = () => {
    if (transactionamount === "") {
      document.getElementsByClassName("AddAmountErrordegit")[0].innerText =
        "Amount required";

      setTimeout(() => {
        document.getElementsByClassName("AddAmountErrordegit")[0].innerText =
          "";
      }, 3000);
    } else {
      setAmountbtnclick(true);
    }
  };

  let walletballance = async () => {
    // let result = await fetch("http://localhost:3000/wallet/balance", {
    let result = await fetch(`${baseurlwallet}/wallet/balance`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (result.status == 200) {
      const data = await result.json();
      setWalletBalance(data.payload.balance);
    } else {
      // console.log(result);
      document.getElementsByClassName("statusError")[0].innerText =
        "Something Went Wrong , Try After Some Time";
      setTimeout(() => {
        document.getElementsByClassName("statusError")[0].innerText = "";
      }, 3000);
    }
  };

  const sendTransactionReq = async () => {
    let data = {
      transactionId: transactionid,
      amount: transactionamount,
      transactionImage: baseimg,
    };
    console.log("before", data);

    if (transactionid === "" && transactionimg === "") {
      if (transactionid === "" && transactionimg === "") {
        document.getElementsByClassName("AddAmountError")[0].innerText =
          "Transaction Id or Image is required";
      }
      setTimeout(() => {
        document.getElementsByClassName("AddAmountError")[0].innerText = "";
      }, 3000);
    } else {
      setShowLoaderShow(true);
      setStartExamDisable(true);
      console.log(data);
      // let result = await fetch("https://4uwwei55mc.execute-api.ap-south-1.amazonaws.com/prod/wallet/studentaddmoneyrequest",
      let result = await fetch(
        `${baseurlwallet}/wallet/studentaddmoneyrequest`,
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": `application/json`,
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ).then(async (result) => {
        setShowLoaderShow(false);
        setStartExamDisable(false);
        if (result.status === 200) {
          const data = await result.json();
          setShowSuccess(true);
          setTimeout(() => {
            setShowSuccess(false);
          }, 3000);
          setTransactionamount("");
          setTransactionid("");
          setTransactionimg("");
          setBaseimg("");
          setAmountbtnclick(false);
          document.getElementById("fileimg").value = "";
          document.getElementsByClassName("AddAmountError")[0].innerText = "";
          document.getElementsByClassName("AddAmountErrordegit")[0].innerText =
            "";
        } else {
          document.getElementsByClassName("statusError")[0].innerText =
            "Something Went Wrong , Try After Some Time";
          setTimeout(() => {
            document.getElementsByClassName("statusError")[0].innerText = "";
          }, 3000);
        }
        throw result;
      });
    }
  };

  const transactionidSelected = () => {
    document.getElementsByClassName("AddAmountError")[0].innerText = "";
  };

  const transactionidSelecteddegit = () => {
    document.getElementsByClassName("AddAmountErrordegit")[0].innerText = "";
  };

  const handleamountClickBtn = (data) => {
    setTransactionamount(data);
  };
  const fetchbankDetails = async () => {
    let result = await fetch(`${baseurlwallet}/sessions/banklist_student`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    result = await result.json();
    if (result.message === "Successful") {
      setBankList(result.payload[0]);
    } else {
      // console.log(result);
      setFetchError("Server Error");
    }
  };

  const handleIconClick = (data) => {
    // Copy the input value to the clipboard
    navigator.clipboard
      .writeText(data)
      .then(() => {
        // console.log("Text copied to clipboard");
      })
      .catch((err) => {
        // console.error("Unable to copy text to clipboard", err);
      });

    // If you want to toggle something, uncomment the following line
    // togglePassword();
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
                    <h4 className="mb-sm-0">Add money</h4>
                    <div className="page-title-right">
                      <ol className="breadcrumb m-0">
                        <Link to="/wallet" className="breadcrumb-item">
                          My Wallet
                        </Link>
                        <li className="breadcrumb-item active">Add money</li>
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
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-4"></div>

                    <div className="col-4">
                      <div className=" d-sm-flex align-items-center justify-content-center">
                        <p>
                          <b>Available Balance:</b>{" "}
                          <i className="nav-icon fas fa-rupee-sign" />
                          {walletBalance ? walletBalance : "Waiting.."}
                        </p>
                      </div>
                    </div>

                    <div className="col-4"></div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-lg-6 col-md-6 com-sm-12">
                      <div style={{ padding: "0 30px" }}>
                        <span style={{ fontWeight: "bold" }}>
                          Please Send Money To The Provided Number only. After
                          Sending The payment , insert the mandatory field
                        </span>
                      </div>
                      <div className="row mt-3">
                        <div className="col-xl-2 col-lg-1 col-md-0"></div>
                        <div className="col-xl-8 col-lg-10  col-md-0">
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <img
                              src={bankList.qrCodeImage}
                              alt="qrCode"
                              style={{ maxWidth: "250px" }}
                            />
                          </div>
                          <div className="auth-form-group-custom mt-3">
                            <i
                              className="fa fa-clone"
                              style={{
                                position: "absolute",
                                right: "10px",
                                // top: "10px",
                                color: "#ced4da",
                                fontSize: "20px",
                                cursor: "pointer",
                              }}
                              onClick={handleIconClick(bankList.upi)}
                            />

                            <lable className="lablesize">
                              Upi :{" "}
                              <span style={{ fontWeight: "600" }}>
                                {bankList.upi}{" "}
                              </span>
                            </lable>
                          </div>
                          <div className="auth-form-group-custom mt-3">
                            <i
                              className="fa fa-clone"
                              style={{
                                position: "absolute",
                                right: "10px",
                                // top: "10px",
                                color: "#ced4da",
                                fontSize: "20px",
                                cursor: "pointer",
                              }}
                              onClick={handleIconClick(bankList.bankName)}
                            />

                            <lable className="lablesize">
                              Bank Name :{" "}
                              <span style={{ fontWeight: "600" }}>
                                {bankList.bankName}{" "}
                              </span>
                            </lable>
                          </div>

                          <div className="auth-form-group-custom mt-3">
                            <i
                              className="fa fa-clone"
                              style={{
                                position: "absolute",
                                right: "10px",
                                // top: "10px",
                                color: "#ced4da",
                                fontSize: "20px",
                                cursor: "pointer",
                              }}
                              onClick={handleIconClick(bankList.account)}
                            />

                            <lable className="lablesize">
                              Account :{" "}
                              <span style={{ fontWeight: "600" }}>
                                {bankList.account}{" "}
                              </span>
                            </lable>
                          </div>
                          <div className="auth-form-group-custom mt-3">
                            <i
                              className="fa fa-clone"
                              style={{
                                position: "absolute",
                                right: "10px",
                                // top: "10px",
                                color: "#ced4da",
                                fontSize: "20px",
                                cursor: "pointer",
                              }}
                              onClick={handleIconClick(bankList.ifsc)}
                            />
                            <lable className="lablesize">
                              Ifsc :{" "}
                              <span style={{ fontWeight: "600" }}>
                                {bankList.ifsc}{" "}
                              </span>
                            </lable>
                          </div>
                        </div>
                      </div>
                    </div>
                    {!amountbtnclick ? (
                      <div className="col-lg-6 col-md-6 com-sm-12">
                        <div className="row mt-3">
                          <div className="col-xl-2 col-lg-1 col-md-0"></div>
                          <div className="col-xl-8 col-lg-10  col-md-0">
                            <input
                              type="number"
                              name="FirstName"
                              className="form-control mt-2"
                              placeholder="Enter Transaction Amount"
                              value={transactionamount}
                              onChange={(e) => {
                                setTransactionamount(e.target.value);
                                transactionidSelecteddegit();
                              }}
                            />
                            <p
                              className="AddAmountErrordegit"
                              style={{
                                color: "red",
                                fontWeight: "bold",
                                marginTop: "5px",
                              }}
                            ></p>
                            <button
                              type="submit"
                              className="btn  moneyamountbtn "
                              style={{ background: "#252b3b", color: "#fff" }}
                              onClick={() => handleamountClickBtn(500)}
                            >
                              500
                            </button>
                            <button
                              type="submit"
                              className="btn  moneyamountbtn  ml-2"
                              style={{ background: "#252b3b", color: "#fff" }}
                              onClick={() => handleamountClickBtn(1000)}
                            >
                              1000
                            </button>
                            <button
                              type="submit"
                              className="btn  moneyamountbtn ml-2"
                              style={{ background: "#252b3b", color: "#fff" }}
                              onClick={() => handleamountClickBtn(2000)}
                            >
                              2000
                            </button>

                            <div className=" d-sm-flex align-items-center justify-content-center">
                              <button
                                type="submit"
                                className="btn btn-success moneybtn mt-4"
                                onClick={handleamountClick}
                              >
                                Submit
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="col-lg-6 col-md-6 com-sm-12">
                        <div className="row mt-3">
                          <div className="col-xl-2 col-lg-1 col-md-0"></div>
                          <div className="col-xl-8 col-lg-10  col-md-0">
                            <input
                              type="text"
                              name="FirstName"
                              className="form-control mt-4"
                              placeholder="Enter Transaction Id"
                              value={transactionid}
                              onChange={(e) => {
                                setTransactionid(e.target.value);
                                transactionidSelected();
                              }}
                            />
                            <input
                              type="file"
                              name="file"
                              id="fileimg"
                              accept="image/*"
                              className="form-control mt-4"
                              // value={transactionimg}
                              onChange={handletransactionimg}
                            />

                            <p
                              className="AddAmountError"
                              style={{
                                color: "red",
                                fontWeight: "bold",
                                marginTop: "5px",
                              }}
                            />

                            <p
                              className="imagesizeerror"
                              style={{
                                color: "red",
                                fontWeight: "bold",
                                marginTop: "5px",
                              }}
                            ></p>
                            <div className=" d-sm-flex align-items-center justify-content-center">
                              {/* <button
                                type="submit"
                                className="btn btn-success mt-4"
                                onClick={sendTransactionReq}
                              >
                                Add Now
                              </button> */}
                              <button
                                className="btn btn-success w-md waves-effect waves-light mt-4"
                                type="submit"
                                onClick={() => sendTransactionReq()}
                                disabled={startExamDisable}
                              >
                                {showLoaderShow ? (
                                  <span>
                                    <span
                                      class="spinner-border spinner-border-sm mr-1"
                                      role="status"
                                      aria-hidden="true"
                                    ></span>
                                    Loading...
                                  </span>
                                ) : (
                                  // <span style={{textAlign:"center"}}>Loading<span className="spinner-border spinner-border-sm spinnerLoader ml-1 mr-1" style={{ width: "0.9rem", height: "0.9rem",textAlign:"center" }} role="status" aria-hidden="true"></span></span>
                                  "Submit"
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
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
export default Addmoney;
