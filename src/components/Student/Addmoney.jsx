import React, { useEffect, useState } from "react";
import "../CssFile/Student.css";
import { Link } from "react-router-dom";
import SideNav from "./SideNav";
import Footer from "./Footer";
import Header from "./Header";

function Addmoney() {
  const [transactionid, setTransactionid] = useState("");
  const [transactionimg, setTransactionimg] = useState("");
  const [walletBalance, setWalletBalance] = useState("");
  const [transactionamount, setTransactionamount] = useState("");
  const [error1, setError1] = useState(false);
  const [blobImage, setBlobImage] = useState("");
  const [fileName, setFileName] = useState("");
  const [baseimg, setBaseimg] = useState("");

  const handletransactionimg = (e) => {
    let addImage = e.target.files[0];

    const maxSizeBytes = 2 * 1024 * 1024; // 2 MB
    if (addImage.size > maxSizeBytes) {
      document.getElementsByClassName("imagesizeerror")[0].innerText =
        "Maximun Size is 2Mb";
    } else {
      document.getElementsByClassName("imagesizeerror")[0].innerText = "";
      setTransactionimg(addImage);
      // Process the file
    }

    convertFileToBase64(addImage)
      .then((base64String) => {
        setBaseimg(base64String);
        console.log("Base64 encoded image:", base64String);
        // You can use the base64String as needed, for example, to display the image.
      })
      .catch((error) => {
        console.error("Error converting file to Base64:", error);
      });
  };
  // console.log(transactionimg);

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
      setWalletBalance(data.payload.balance);
    } else {
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
    console.log(data);

    console.log(transactionimg);
    console.log(transactionid === "");
    if (
      (transactionid === "" && transactionimg === "") ||
      transactionamount === ""
    ) {
      if (transactionamount === "") {
        document.getElementsByClassName("AddAmountErrordegit")[0].innerText =
          "Amount is required";
      }

      if (transactionid === "" && transactionimg === "") {
        document.getElementsByClassName("AddAmountError")[0].innerText =
          "TransferId or Image is required";
      }
    } else {
      let result = await fetch(
        "http://localhost:3000/wallet/studentaddmoneyrequest",
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": `application/json`,
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ).then(async (result) => {
        if (result.status === 200) {
          const data = await result.json();
          setTransactionamount("");
          setTransactionid("");
          setTransactionimg("");
          setBaseimg("");
          document.getElementById('fileimg').value = ""
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

  const handleImageChangeId = (e) => {
    // setError1(false);
    // const selected = e.target.files[0];
    // const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg"];
    // if (selected && ALLOWED_TYPES.includes(selected.type)) {
    //   let reader = new FileReader();
    //   reader.onloadend = () => {
    //     setImgPreviewId(reader.result);
    //   };
    //   reader.readAsDataURL(selected);
    // } else {
    //   setError1(true);
    //   console.log("file not supported");
    // }
  };
  async function uploadID(file) {
    // try {
    //   const fileObj = file.target.files[0];
    //   const fileName = fileObj.name;
    //   const fileExtension = fileName.match(/[a-zA-Z]{2,4}$/)[0];
    //   console.log(fileName, fileExtension);
    //   const response = await fetch(
    //     `${Environment.server_url}/common/filesupload`,
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    //       },
    //       body: JSON.stringify({
    //         for: "Superadmin",
    //         files: [
    //           {
    //             extension: fileExtension,
    //             contentType: "image",
    //             fileName: fileName,
    //           },
    //         ],
    //       }),
    //     }
    //   );
    // const result = await response.json();
    // const { signedUrl, fileUrl } = result.payload.signedUrls[0];
    // setIdProof(fileUrl);
    // await fetch(signedUrl, {
    //   method: "PUT",
    //   // headers: {
    //   //     "Content-Type": "application/json",
    //   //     Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
    //   // },
    //   body: fileObj,
    // });
    // console.log("file url", fileUrl);
    // } catch { }
  }

  const transactionidSelected = () => {
    document.getElementsByClassName("AddAmountError")[0].innerText = "";
  };

  const transactionidSelecteddegit = () => {
    document.getElementsByClassName("AddAmountErrordegit")[0].innerText = "";
  };

  const handleOpenImage = () => {
    // openImageInNewTab(baseimg);
  };

  // function openImageInNewTab(base64String) {
  //   const byteCharacters = atob(base64String);
  //   const byteNumbers = new Array(byteCharacters.length);
  // console.log(byteNumbers)
  //   for (let i = 0; i < byteCharacters.length; i++) {
  //     byteNumbers[i] = byteCharacters.charCodeAt(i);
  //   }

  //   const byteArray = new Uint8Array(byteNumbers);
  //   const blob = new Blob([byteArray], { type: 'image/jpeg' });
  // console.log(blob)
  //   const url = URL.createObjectURL(blob);
  //   console.log(url)
  //   window.open(url, '_blank');
  //   URL.revokeObjectURL(url);
  // }
  // function openImageInNewTab(base64String) {
  //   try {
  //     const byteCharacters = atob(base64String);
  //     const byteNumbers = new Array(byteCharacters.length);

  //     for (let i = 0; i < byteCharacters.length; i++) {
  //       byteNumbers[i] = byteCharacters.charCodeAt(i);
  //     }

  //     const byteArray = new Uint8Array(byteNumbers);
  //     const blob = new Blob([byteArray], { type: 'image/jpeg' }); // Ensure the format matches the image format

  //     const url = URL.createObjectURL(blob);
  //     window.open(url, '_blank');
  //     URL.revokeObjectURL(url);
  //   } catch (error) {
  //     console.log("Error opening image:", error);
  //   }
  // }

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
                    <div className="col-4"></div>

                    <div className="col-4">
                      <div className=" d-sm-flex align-items-center justify-content-center">
                        <input
                          type="number"
                          name="FirstName"
                          className="form-control"
                          placeholder="Enter Transaction Id"
                          value={transactionamount}
                          onChange={(e) => {
                            setTransactionamount(e.target.value);
                            transactionidSelecteddegit();
                          }}
                        />
                      </div>

                      <p
                        className="AddAmountErrordegit"
                        style={{ color: "red", fontWeight: "bold" }}
                      ></p>
                    </div>
                    <div className="col-4"></div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-4"></div>

                    <div className="col-4">
                      <div className=" d-sm-flex align-items-center justify-content-center">
                        <input
                          type="text"
                          name="FirstName"
                          className="form-control"
                          placeholder="Enter Transaction Id"
                          value={transactionid}
                          onChange={(e) => {
                            setTransactionid(e.target.value);
                            transactionidSelected();
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-4"></div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-4"></div>
                    <div className="col-4">
                      <div className=" d-sm-flex align-items-center justify-content-center">
                        <input
                          type="file"
                          name="file"
                          id="fileimg"
                          accept="image/*"
                          className="form-control"
                          // value={transactionimg}
                          onChange={handletransactionimg}
                        />
                      </div>
                      <p
                        className="AddAmountError"
                        style={{ color: "red", fontWeight: "bold" }}
                      ></p>
                      <p
                        className="imagesizeerror"
                        style={{ color: "red", fontWeight: "bold" }}
                      ></p>
                    </div>
                    <div>

                    </div>
                  </div>



                  <div className="row mt-3">
                    <div className="col-4"></div>

                    <div className="col-4">
                      <div className=" d-sm-flex align-items-center justify-content-center">
                        {/* create onClick for request to node js for two details id & image  */}
                        {/* <Link to=""> */}
                        <button
                          type="submit"
                          className="btn btn-success moneybtn"
                          onClick={sendTransactionReq}
                        >
                          Add Now
                        </button>
                        {/* </Link> */}
                      </div>
                    </div>

                    <div className="col-4"></div>
                  </div>
                </div>
              </div>
              {/* <div className="row">
                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-body">
                      <div className="row mt-2">
                        <div className="col">
                          <p className="balanceheader"><b>Available Balance:</b> Rs:1000</p>
                        </div>
                      </div>
                      <div className="row mt-4">
                        <div className="col-md-12">
                          <div className="row">
                            <div className="col-md-3">
                              <p><b>Enter amount</b></p>
                              <input type="text" name="FirstName" className="form-control" />
                            </div>
                            <div className="col-md-9 moneycol">
                              <p>You will be redirected to payment gateway <br />to pay via various option they provide</p>
                              <Link to=""><button type="submit" className="btn btn-success moneybtn">Add Now</button></Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
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
