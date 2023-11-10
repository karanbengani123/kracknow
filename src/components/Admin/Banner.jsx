import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import '../CssFile/Banner.css';
import SideNav from "./SideNav";
import Footer from "./Footer";
import Header from "./Header";
import loader from '../Images/loader.gif';
import { Multiselect } from 'multiselect-react-dropdown';
import Environment from "./Environment";

const bannerList = []
const Banner = () => {
    const datavalue = [{ data: 'Apt', id: 1 },
    { data: 'ABC', id: 2 },
    { data: 'Active', id: 3 },
    { data: 'In-Active', id: 4 },]
    const [options] = useState(datavalue)

    const [banner, setBanner] = useState([])
    const [mobilebanner, setMobilebanner] = useState([])
    const [selectedImages, setSelectedImages] = useState([]);
    const [selectedImagesObj, setSelectedImagesObj] = useState([]);
    const [showLoaderShow, setShowLoaderShow] = useState(false);
    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState('')
    const [showSuccess, setShowSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("")



    const onSelectFile = (event) => {
        const selectedFiles = event.target.files;
        setSelectedImagesObj([...selectedFiles]);
        const selectedFilesArray = Array.from(selectedFiles);

        const imagesArray = selectedFilesArray.map((file) => {
            return URL.createObjectURL(file);
        });

        setSelectedImages((previousImages) => previousImages.concat(imagesArray));
        imagesArray.map(url => {
            // bannerList.push({tag:'MOBILE',url})
            bannerList.push(url)
        })
    };



    const uploadBanner2 = async (event) => {
        event.preventDefault();
        setShowLoaderShow(true)
        setTimeout(() => {
            setShowLoaderShow(false);
        }, 5000);

        selectedImagesObj.map(async (fileObj) => {

            const fileName = fileObj.name;
            const fileExtension = fileName.match(/[a-zA-Z]{2,4}$/)[0];

            const response = await fetch(`${Environment.server_url}/common/filesupload`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                },
                body: JSON.stringify({
                    "for": "Superadmin",
                    "files": [
                        {
                            "extension": fileExtension,
                            "contentType": "image",
                            "fileName": fileName
                        }
                    ]
                })

            });

            const result = await response.json();

            const { signedUrl, fileUrl } = result.payload.signedUrls[0];




            await fetch(signedUrl, {
                method: "PUT",

                body: fileObj,
            });
            const catdata = await fetch(`${Environment.server_url}/Banner/addbanner`, {
                method: "POST",
                body: JSON.stringify({ banner: [{ tag: 'WEB', url: fileUrl }] }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            })
                .then(catdata => {
                    if (Response.status = 200) {
                        window.location.reload(false);
                        setShowSuccess(true);
                        getBanner();
                        return catdata.json();

                    } else {
                        throw new Error(catdata)
                    }
                }).then(catdata => {
                    setErrorMessage(catdata.message)
                })

        })
    }

    const [selectedImages2, setSelectedImages2] = useState([]);
    const [selectedImagesObj2, setSelectedImagesObj2] = useState([]);

    const onSelectFile2 = (event) => {
        const selectedFiles2 = event.target.files;
        setSelectedImagesObj2([...selectedFiles2]);
        const selectedFilesArray = Array.from(selectedFiles2);

        const imagesArray = selectedFilesArray.map((file) => {
            return URL.createObjectURL(file);
        });

        setSelectedImages2((previousImages) => previousImages.concat(imagesArray));
        imagesArray.map(url => {
            // bannerList.push({tag:'MOBILE',url})
            bannerList.push(url)
        })
    };



    const uploadBanner = async (event) => {
        event.preventDefault();

        selectedImagesObj2.map(async (fileObj) => {

            const fileName = fileObj.name;
            const fileExtension = fileName.match(/[a-zA-Z]{2,4}$/)[0];

            const response = await fetch(`${Environment.server_url}/common/filesupload`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                },
                body: JSON.stringify({
                    "for": "Superadmin",
                    "files": [
                        {
                            "extension": fileExtension,
                            "contentType": "image",
                            "fileName": fileName
                        }
                    ]
                })

            });

            const result = await response.json();

            const { signedUrl, fileUrl } = result.payload.signedUrls[0];




            await fetch(signedUrl, {
                method: "PUT",

                body: fileObj,
            });
            const catdata = await fetch(`${Environment.server_url}/Banner/addbanner`, {
                method: "POST",
                body: JSON.stringify({ banner: [{ tag: 'MOBILE', url: fileUrl }] }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            })
                .then(catdata => {
                    if (Response.status = 200) {
                        window.location.reload(false);
                        getBanner();
                        return catdata.json();

                    } else {
                        throw new Error(catdata)
                    }

                })
                // .then(catdata => {
                //     if (catdata.status === 200) {
                //         setShowSuccess(true);
                //         getBanner();
                //         return (catdata.json());
                //     }
                //     else {
                //         setShow(true);
                //         return (catdata.json());
                //     }
                // })
                //     .then(catdata => {
                //         setErrorMessage(catdata.message)
                //     })
        })
    }

    const getBanner = async (page) => {
        setLoading(true)
        let result = await fetch(`${Environment.server_url}/Banner/All`,
            //  {
            //   method: "GET",
            //   headers: {
            //     Authorization: `Bearer ${localStorage.getItem('token')}`
            //   }
            // });
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
        result = await result.json();
        setBanner(result.payload.lists.rows.filter(data => data.tag === "WEB"))
        setMobilebanner(result.payload.lists.rows.filter(data => data.tag === "MOBILE"))
        setLoading(false)
    }
    useEffect(() => {
        getBanner()
    }, [])

    const deleteBanner = async (uuid) => {
        if (window.confirm("Delete Banner!") == true) {
            let result = await fetch(`${Environment.server_url}/Banner/${uuid}`, {
                method: "Delete",
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
            result = await result.json();
            window.location.reload(false);
            getBanner();
        } else {
            // setShow("Not Deleted")
        }
    }

    if (show === true) {
        setTimeout(() => setShow(false), 5000);
    }
    if (showSuccess === true) {
        setTimeout(() => setShowSuccess(false), 5000);
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
                                        <h4 className="mb-sm-0">New Banner</h4>
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
                                            <div className="form">
                                                <form>
                                                    <div className="form-row ">
                                                        <div className="col-sm-6">
                                                            <section>
                                                                <label className="examlabel">
                                                                    + Add Banner for web
                                                                    <input
                                                                        className="examinput"
                                                                        type="file"
                                                                        name="images"
                                                                        onChange={onSelectFile}
                                                                        multiple
                                                                        accept="image/png , image/jpeg, image/webp"
                                                                    />
                                                                </label>
                                                                <br />

                                                                {selectedImages.length > 0 &&
                                                                    (selectedImages.length > 100 ? (
                                                                        <p className="error">
                                                                            You can't upload more than 100 banners! <br />
                                                                            <span>
                                                                                please delete <b> {selectedImages.length - 100} </b> of them{" "}
                                                                            </span>
                                                                        </p>
                                                                    ) : (
                                                                        <button
                                                                            className="upload-btn"
                                                                            onClick={

                                                                                uploadBanner2
                                                                            }
                                                                        >
                                                                            UPLOAD {selectedImages.length} BANNER
                                                                            {selectedImages.length === 1 ? "" : "S"}
                                                                        </button>
                                                                    ))}

                                                                <div className="images">
                                                                    {selectedImages &&
                                                                        selectedImages.map((image, index) => {
                                                                            return (
                                                                                <div key={image} className="image">
                                                                                    <img src={image} height="250" alt="upload" />
                                                                                    {/* <button
                                                                                        onClick={() =>
                                                                                            setSelectedImages(selectedImages.filter((e) => e !== image))
                                                                                        }
                                                                                    >
                                                                                        Delete Banner
                                                                                    </button> */}
                                                                                    {/* <p>{index + 1}</p> */}
                                                                                </div>
                                                                            );
                                                                        })}
                                                                </div>
                                                            </section>
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <section>
                                                                <label className="examlabel">
                                                                    + Add Banner for mobile
                                                                    <input
                                                                        className="examinput"
                                                                        type="file"
                                                                        name="images"
                                                                        onChange={onSelectFile2}
                                                                        multiple
                                                                        accept="image/png , image/jpeg, image/webp"
                                                                    />
                                                                </label>
                                                                <br />

                                                                {selectedImages2.length > 0 &&
                                                                    (selectedImages2.length > 100 ? (
                                                                        <p className="error">
                                                                            You can't upload more than 100 banners! <br />
                                                                            <span>
                                                                                please delete <b> {selectedImages2.length - 100} </b> of them{" "}
                                                                            </span>
                                                                        </p>
                                                                    ) : (
                                                                        <button
                                                                            className="upload-btn"
                                                                            onClick={

                                                                                uploadBanner
                                                                            }
                                                                        >
                                                                            {showLoaderShow ?
                                                                                (
                                                                                    <span className="spinner-border spinner-border-sm spinnerLoader mr-1" style={{ width: "0.9rem", height: "0.9rem" }} role="status" aria-hidden="true"></span>
                                                                                )
                                                                                :
                                                                                (
                                                                                    `UPLOAD ${selectedImages2.length} BANNER
                                                                            ${selectedImages2.length === 1 ? "" : "S"}`
                                                                                )
                                                                            }

                                                                        </button>
                                                                    ))}

                                                                <div className="images">
                                                                    {selectedImages2 &&
                                                                        selectedImages2.map((image, index) => {
                                                                            return (
                                                                                <div key={image} className="image">
                                                                                    <img src={image} height="250" alt="upload" />
                                                                                    {/* <button
                                                                                        onClick={() =>
                                                                                            setSelectedImages(selectedImages.filter((e) => e !== image))
                                                                                        }
                                                                                    >
                                                                                        Delete Banner
                                                                                    </button> */}
                                                                                    {/* <p>{index + 1}</p> */}
                                                                                </div>
                                                                            );
                                                                        })}
                                                                </div>
                                                            </section>
                                                        </div>
                                                    </div>
                                                    <div className="form-row ">
                                                    </div>
                                                </form>
                                            </div>
                                            {
                                                loading ?
                                                    (
                                                        <div
                                                            className="row h-100"
                                                            style={{ paddingBottom: "11%" }}
                                                        >
                                                            <div className="col-sm-12 my-auto">
                                                                <img
                                                                    src={loader}
                                                                    alt={"loader"}
                                                                    className={"mx-auto d-block"}
                                                                />
                                                            </div>
                                                        </div>
                                                    )
                                                    :
                                                    (
                                                        <div className="row">
                                                            <div className="col-sm-6">
                                                                <h6><b>Web-banner</b></h6>
                                                                {
                                                                    banner.map((item) =>
                                                                        <>
                                                                            <img className="bannerImage" src={item.url} alt="" />
                                                                            <span type="button" onClick={() => { deleteBanner(item.uuid); }} className="text-danger" data-bs-container="#tooltip-container1" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete"><i className="mdi mdi-trash-can font-size-18" /></span>
                                                                        </>
                                                                    )}
                                                            </div>

                                                            <div className="col-sm-6">
                                                                <h6><b>Mobile-banner</b></h6>
                                                                {
                                                                    mobilebanner.map((item) =>
                                                                        <>
                                                                            <img className="bannerImage" src={item.url} alt="" />
                                                                            <span type="button" onClick={() => { deleteBanner(item.uuid); }} className="text-danger" data-bs-container="#tooltip-container1" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete"><i className="mdi mdi-trash-can font-size-18" /></span>
                                                                        </>
                                                                    )}
                                                            </div>
                                                        </div>
                                                    )
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section >
            </div >
            <SideNav />
            <Footer />
        </>
    );
}


export default Banner;