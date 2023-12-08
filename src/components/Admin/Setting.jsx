import React, { useState, useEffect } from "react";
import "../CssFile/Student.css";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import SideNav from "./SideNav";
import Environment from "./Environment";

//testind pending for update record

function Setting() {
  const [amount, setAmount] = useState("");
  const [minamount, setMinamount] = useState("");
  const [maxamount, setMaxamount] = useState("");
  const [upi, setUpi] = useState("");
  const [bankName, setBankName] = useState("");
  const [account, setAccount] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [qrCodeImage, setQrCodeImage] = useState("");
  const [upUpi, setUpUpi] = useState("");
  const [upBankName, setUpBankName] = useState("");
  const [upAccount, setUpAccount] = useState("");
  const [upIfsc, setUpIfsc] = useState("");
  const [upQrCodeImage, setUpQrCodeImage] = useState("");
  const [show, setShow] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [baseimg, setBaseimg] = useState("");
  const [upBaseimg, setUpBaseimg] = useState("");
  const [bankList, setBankList] = useState([]);
  const [error, setError] = useState([]);
  const [fetchError, setFetchError] = useState("");
  const [newEntry, setNewEntry] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [updateErr, setUpdateErr] = useState("");
  if (show === true) {
    setTimeout(() => setShow(false), 5000);
  }
  if (showSuccess === true) {
    setTimeout(() => setShowSuccess(false), 5000);
  }
  useEffect(() => {
    getStudent();
    fetchbankDetails();
    getWithdrawal();
  }, []);

  const handletransactionimg = (e) => {
    let addImage = e.target.files[0];

    const maxSizeBytes = 2 * 1024 * 1024; // 2 MB
    if (!newEntry) {
      if (addImage.size > maxSizeBytes) {
        document.getElementsByClassName("imagesizeerror")[0].innerText =
          "Maximun Size is 2Mb";
      } else {
        document.getElementsByClassName("imagesizeerror")[0].innerText = "";
        // setUpQrCodeImage(addImage);
        convertFileToBase64(addImage)
          .then((base64String) => {
            setUpBaseimg(base64String);
          })
          .catch((error) => {
            console.error("Error converting file to Base64:", error);
          });
      }
    } else {
      if (addImage.size > maxSizeBytes) {
        document.getElementsByClassName("imagesizeerror")[0].innerText =
          "Maximun Size is 2Mb";
      } else {
        document.getElementsByClassName("imagesizeerror")[0].innerText = "";
        // setQrCodeImage(addImage);
        convertFileToBase64(addImage)
          .then((base64String) => {
            setBaseimg(base64String);
          })
          .catch((error) => {
            console.error("Error converting file to Base64:", error);
          });
      }
    }
  };

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

  const handleupi = (e) => {
    setUpi(e.target.value);
  };
  const handlebank = (e) => {
    setBankName(e.target.value);
  };
  const handleacc = (e) => {
    setAccount(e.target.value);
  };
  const handleifsc = (e) => {
    setIfsc(e.target.value);
  };
  const handleupupi = (e) => {
    setUpUpi(e.target.value);
  };
  const handleupbank = (e) => {
    setUpBankName(e.target.value);
  };
  const handleupacc = (e) => {
    setUpAccount(e.target.value);
  };
  const handleupifsc = (e) => {
    setUpIfsc(e.target.value);
  };

  const fetchbankDetails = async () => {
    let result = await fetch(
      `${Environment.server_url}/sessions/banklist_student`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      }
    );
    result = await result.json();
    if (result.message === "Successful") {
      setBankList(result.payload[0]);
      console.log(result.payload);
      if (result.payload.length === 0) {
        setNewEntry(true);
      } else {
        setNewEntry(false);
        setSelectedId(result.payload[0].uuid);
        setUpAccount(result.payload[0].account);
        setUpBankName(result.payload[0].bankName);
        setUpBaseimg(result.payload[0].qrCodeImage);
        setUpIfsc(result.payload[0].ifsc);
        setUpUpi(result.payload[0].upi);
      }
    } else {
      console.log(result);
      setFetchError("Server Error");
    }
  };

  const addBankDetails = async (e) => {
    if (!newEntry) {
      if (!upUpi || !upBankName || !upBaseimg || !upAccount || !upIfsc) {
        setError({
          upi: !upUpi ? "Required !" : "",
          bankName: !upBankName ? "Required !" : "",
          baseimg: !upBaseimg ? "Required !" : "",
          account: !upAccount ? "Required !" : "",
          ifsc: !upIfsc ? "Required !" : "",
        });
        setTimeout(() => {
          setError([]);
        }, 3000);
      } else {
        let data = {
          bankName: upBankName,
          qrCodeImage: upBaseimg,
          upi: upUpi,
          account: upAccount,
          ifsc: upIfsc,
        };
        let result = await fetch(
          `${Environment.server_url}/sessions/admin/updatebankdetail/${selectedId}`,
          {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${JSON.parse(
                localStorage.getItem("token")
              )}`,
            },
          }
        );
        result = await result.json();
        if (result.message === "Successful") {
          setUpBankName("");
          setUpAccount("");
          setUpIfsc("");
          setUpUpi("");
          setUpBaseimg("");
          fetchbankDetails();
        } else {
          setUpdateErr("server Error");
          setTimeout(() => {
            setUpdateErr("");
          }, 3000);
        }
      }
    } else {
      if (!upi || !bankName || !baseimg || !account || !ifsc) {
        setError({
          upi: !upi ? "Required !" : "",
          bankName: !bankName ? "Required !" : "",
          baseimg: !baseimg ? "Required !" : "",
          account: !account ? "Required !" : "",
          ifsc: !ifsc ? "Required !" : "",
        });
        setTimeout(() => {
          setError([]);
        }, 3000);
      } else {
        let data = {
          bankName,
          qrCodeImage: baseimg,
          upi,
          account,
          ifsc,
        };
        let result = await fetch(
          `${Environment.server_url}/sessions/admin/addBankDetails`,
          {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${JSON.parse(
                localStorage.getItem("token")
              )}`,
            },
          }
        );
        result = await result.json();
        if (result.message === "Successful") {
          setBankName("");
          setAccount("");
          setIfsc("");
          setUpi("");
          setBaseimg("");
          fetchbankDetails();
        } else {
          setUpdateErr("server Error");
          setTimeout(() => {
            setUpdateErr("");
          }, 3000);
        }
        // setBankList(result.payload.admin);
      }
    }
  };
  console.log("error", error);

  const updateStudent = async () => {
    // setStartExamDisable(true)
    // setShowLoaderShow(true)
    // setTimeout(() => {
    //     setStartExamDisable(false);
    //     setShowLoaderShow(false);
    // }, 5000);

    let result = await fetch(
      `${Environment.server_url}/students/amount/initialamount`,
      {
        method: "PUT",
        body: JSON.stringify({ amount }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      }
    )
      .then((catdata) => {
        if (catdata.status === 200) {
          setShowSuccess(true);
          setTimeout(() => {
            getStudent();
          }, 5000);
          // navigate('../Exam');
          return catdata.json();
        } else {
          setShow(true);
          return catdata.json();
        }
      })
      .then((catdata) => {
        setErrorMessage(catdata.message);
      });
  };
  const getStudent = async () => {
    let result = await fetch(
      `${Environment.server_url}/students/amount/initialamount`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      }
    );
    result = await result.json();
    setAmount(result.payload.intValue);
  };
  const updateWithdrawal = async () => {

    let result = await fetch(
      `${Environment.server_url}/students/amount/withdrawallimit`,
      {
        method: "PUT",
        body: JSON.stringify({ minamount , maxamount }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      }
    )
      .then((catdata) => {
        if (catdata.status === 200) {
          setMinamount('')
          setMaxamount('')
          setShowSuccess(true);
          setTimeout(() => {
            getWithdrawal();
          }, 1000);
          // navigate('../Exam');
          return catdata.json();
        } else {
          setShow(true);
          return catdata.json();
        }
      })
      .then((catdata) => {
        setErrorMessage(catdata.message);
      });
  };
  const getWithdrawal = async () => {
    let result = await fetch(
      `${Environment.server_url}/students/amount/withdrawallimit`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      }
    );
    result = await result.json();
    console.log(result.payload)
    setMinamount(result.payload.minval)
    setMaxamount(result.payload.maxval)
    // setAmount(result.payload.intValue);
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
                    <h4 className="mb-sm-0">Configuration</h4>
                    <div className="page-title-right"></div>
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
                      <div class="row">
                        <div className="col-sm-4">
                          <h6>
                            <b>Joining bonus (In Rupees)</b>
                          </h6>
                          <input
                            type={"number"}
                            placeholder={"Enter Amount"}
                            value={amount}
                            onChange={(e) =>
                              setAmount(
                                e.target.valueAsNumber || e.target.value
                              )
                            }
                            className="form-control"
                          ></input>
                        </div>
                        <div className="col-sm-3 sendmoneybtn">
                          <button
                            type="button"
                            className="ml-2 btn btn-success sendMoneyButton"
                            onClick={() => updateStudent()}
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-body">
                      <div class="row">
                        <div className="col-sm-4">
                          <h6>
                            <b>Min. Withdrawal Amount (In Rupees)</b>
                          </h6>
                          <input
                            type={"number"}
                            placeholder={"Enter Minimun Amount"}
                            value={minamount}
                            onChange={(e) =>
                              setMinamount(
                                e.target.valueAsNumber || e.target.value
                              )
                            }
                            className="form-control"
                          ></input>
                        </div>
                        <div className="col-sm-4">
                          <h6>
                            <b>Max. Withdrawal Amount (In Rupees)</b>
                          </h6>
                          <input
                            type={"number"}
                            placeholder={"Enter Maximum Amount"}
                            value={maxamount}
                            onChange={(e) =>
                              setMaxamount(
                                e.target.valueAsNumber || e.target.value
                              )
                            }
                            className="form-control"
                          ></input>
                        </div>
                        <div className="col-sm-3 sendmoneybtn">
                          <button
                            type="button"
                            className="ml-2 btn btn-success sendMoneyButton"
                            onClick={() => updateWithdrawal()}
                          >
                            Update
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-body">
                      <div class="row">
                        {updateErr && (
                          <p
                            className="imagesizeerror"
                            style={{ color: "red", fontWeight: "bold" }}
                          >
                            {updateErr}
                          </p>
                        )}
                        <div className="col-sm-3">
                          <h6>
                            <b>UPI Id</b>
                          </h6>
                          <input
                            type={"text"}
                            placeholder={"Enter upi"}
                            value={newEntry ? upi : upUpi}
                            onChange={newEntry ? handleupi : handleupupi}
                            className="form-control"
                          ></input>
                          {error.upi && (
                            <p
                              className="imagesizeerror"
                              style={{ color: "red", fontWeight: "bold" }}
                            >
                              {error.upi}
                            </p>
                          )}
                        </div>
                        <div className="col-sm-3">
                          <h6>
                            <b>Bank Name</b>
                          </h6>
                          <input
                            type={"text"}
                            placeholder={"Enter Bank Name"}
                            value={!newEntry ? upBankName : bankName}
                            onChange={!newEntry ? handleupbank : handlebank}
                            className="form-control"
                          ></input>
                          {error.bankName && (
                            <p
                              className="imagesizeerror"
                              style={{ color: "red", fontWeight: "bold" }}
                            >
                              {error.bankName}
                            </p>
                          )}
                        </div>
                        <div className="col-sm-3">
                          <h6>
                            <b>Account Number</b>
                          </h6>
                          <input
                            type={"number"}
                            placeholder={"Enter Account"}
                            value={!newEntry ? upAccount : account}
                            onChange={!newEntry ? handleupacc : handleacc}
                            className="form-control"
                          ></input>
                          {error.account && (
                            <p
                              className="imagesizeerror"
                              style={{ color: "red", fontWeight: "bold" }}
                            >
                              {error.account}
                            </p>
                          )}
                        </div>
                        <div className="col-sm-3">
                          <h6>
                            <b>IFSC</b>
                          </h6>
                          <input
                            type={"text"}
                            placeholder={"Enter IFSC"}
                            value={!newEntry ? upIfsc : ifsc}
                            onChange={!newEntry ? handleupifsc : handleifsc}
                            className="form-control"
                          ></input>
                          {error.ifsc && (
                            <p
                              className="imagesizeerror"
                              style={{ color: "red", fontWeight: "bold" }}
                            >
                              {error.ifsc}
                            </p>
                          )}
                        </div>
                        <div className="col-sm-3" style={{ marginTop: "15px" }}>
                          <h6>
                            <b>Qr code</b>
                          </h6>
                          {/* <input type={"number"} placeholder={"Enter Amount"} value={amount} onChange={(e) => (setAmount(e.target.valueAsNumber || e.target.value))} className="form-control"> */}
                          <input
                            type={"file"}
                            name="file"
                            id="fileimg"
                            accept="image/*"
                            className="form-control"
                            // value={qrCodeImage}
                            onChange={handletransactionimg}
                          />
                          <p
                            className="imagesizeerror"
                            style={{ color: "red", fontWeight: "bold" }}
                          />
                          {error.baseimg && (
                            <p
                              className="imagesizeerror"
                              style={{ color: "red", fontWeight: "bold" }}
                            >
                              {error.baseimg}
                            </p>
                          )}
                        </div>
                        <div className="col-sm-3" style={{ marginTop: "15px" }}>
                          <img
                            src={newEntry ? baseimg : upBaseimg}
                            alt="Preview"
                            style={{ maxWidth: "200px" }}
                          />
                        </div>
                      </div>
                      <div
                        className="sendmoneybtn"
                        style={{ display: "flex", justifyContent: "end" }}
                      >
                        <button
                          type="button"
                          className="ml-2 btn btn-success sendMoneyButton"
                          onClick={() => addBankDetails()}
                        >
                          {!newEntry ? "Update" : "Add"}
                        </button>
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

export default Setting;
