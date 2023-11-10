import React, { useCallback, useState, useEffect } from "react";
import '../CssFile/Student.css';
import '../CssFile/NewStudent.css';
import { Link,useNavigate } from 'react-router-dom';
import SideNav from "./SideNav";
import Footer from "./Footer";
import Header from "./Header";
import { useForm } from "react-hook-form";
import Environment from "./Environment";

function QuestionImport() {
    const { register, handleSubmit, formState: { errors }, } = useForm();

    const onSubmit = () => {
        // console.log("data");
    }
    const navigate = useNavigate()
    const [getcategory, setGetcategory] = useState([])
    const [getsubcategory, setGetSubcategory] = useState([])
    const [categoryUUID, setcategoryUUID] = useState('');
    const [subCategoryUUID, setFilterSubCategory] = useState('')
    const [phoneBanner, setphoneBanner] = useState('');
    const [fileName, setFileName] = useState('');

    const [show, setShow] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("")
    const [startExamDisable, setStartExamDisable] = useState(false);
    const [showLoaderShow, setShowLoaderShow] = useState(false);

    // console.warn(type, "type")

    useEffect(() => {
        getCategory();
        getSubcategory();
    }, [])
    //Get Category.................
    const getCategory = async () => {
        let result = await fetch(`${Environment.server_url}/categories`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setGetcategory(result.payload.lists.rows);
    }

    //Get SubCategory.................
    const getSubcategory = async (id) => {
        let result = await fetch(`${Environment.server_url}/categories/category/subcategories/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setGetSubcategory(result.payload.subCategory);
    }

    const updateSubcategoryHandler = (id) => {
        setcategoryUUID(id);
        getSubcategory(id);
    };

    const [imgPreviewId, setImgPreviewId] = useState(null);
    const [error1, setError1] = useState(false);

    const handleImageChangeId = (e) => {
        setError1(false);
        const selected = e.target.files[0];
        const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg"];
        if (selected && ALLOWED_TYPES.includes(selected.type)) {
            let reader = new FileReader();
            reader.onloadend = () => {
                setImgPreviewId(reader.result);
            }
            reader.readAsDataURL(selected);
        } else {
            setError1(true);
            console.log("file not supported");

        }
    };
    async function uploadProfileMobile(file) {
        // try {
        const fileObj = file.target.files[0];
        const fileName = fileObj.name;
        const fileExtension = fileName.match(/[a-zA-Z]{2,4}$/)[0];
        console.log(fileName, fileExtension)
        setFileName(fileName)
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

        setphoneBanner(fileUrl);


        await fetch(signedUrl, {
            method: "PUT",
            // headers: {
            //     "Content-Type": "application/json",
            //     Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            // },
            body: fileObj,
        });
        console.log("file url", fileUrl)
        // } catch { }
    }
    const AddImportQuestion = async () => {
        setStartExamDisable(true)
        setShowLoaderShow(true)
        setTimeout(() => {
            setStartExamDisable(false);
            setShowLoaderShow(false);
        }, 5000);
        const catdata = await fetch(`${Environment.server_url}/questions/import/question`, {
            method: "POST",
            body: JSON.stringify({ fileName, categoryUUID,subCategoryUUID}),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
            .then(catdata => {
                console.warn(catdata.status)
                if (catdata.status === 200) {
                    setShowSuccess(true);
                    setTimeout(() => {
                        navigate("/Question");
                    }, 2000);
                    // navigate('../Exam');
                    return (catdata.json());
                }
                else {
                    setShow(true);
                    return (catdata.json());
                }
            })
            .then(catdata => {
                setErrorMessage(catdata.message)
            })
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
                                        <h4 className="mb-sm-0">Import Questions</h4>
                                        <div className="page-title-right">
                                            <ol className="breadcrumb m-0">
                                                <Link to="/Question" className="breadcrumb-item">Question list</Link>
                                                <li className="breadcrumb-item active">Import questions</li>
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
                                            <div className="form">
                                                <form onSubmit={handleSubmit(onSubmit)}>
                                                    <div className="form-row mb-4">
                                                        <div className="col-12 col-sm-4">
                                                            <p><b>Category</b><span className="required text-danger">*</span></p>
                                                            <select className="form-select form-select mb-2" aria-label="Default select example" onChange={(e) => { updateSubcategoryHandler(e.target.value)}}>
                                                                <option>Select</option>
                                                                {
                                                                    getcategory.map((item) =>
                                                                        <>
                                                                            <option value={item.uuid}>{item.label}</option>
                                                                        </>
                                                                    )
                                                                }
                                                            </select>
                                                        </div>
                                                        <div className="col-12 col-sm-4">
                                                            <p><b>Sub Category</b><span className="required text-danger">*</span></p>

                                                            <select className="form-select form-select mb-2" aria-label="Default select example" onChange={(e) => { setFilterSubCategory(e.target.value) }}>
                                                                <option value={""}>Select sub-category</option>
                                                                {
                                                                    getsubcategory.map((item, index) =>
                                                                        <>
                                                                            <option value={item.uuid}>{item.label}</option>
                                                                        </>
                                                                    )}

                                                            </select>


                                                        </div>
                                                        <div className="col-12 col-sm-4">
                                                            <p><b>File</b><span className="required text-danger">*</span></p>
                                                            <div className="container-exam">
                                                                {/* {error1 && <p className="errorMsg">File not supported</p>} */}
                                                                {/* <div
                                                                    className="imgPreview"
                                                                    style={{
                                                                        background: imgPreviewId ? `url("${imgPreviewId}") no-repeat center/cover`
                                                                            : "#c2c7d0"
                                                                    }}
                                                                > */}
                                                                    {!imgPreviewId && (
                                                                        <>
                                                                            {/* <p>ID Proof</p> */}
                                                                            <label htmlFor="fileUpload1" className="customFileUpload">
                                                                            
                                                                            </label>
                                                                            <input type="file"
                                                                                id="fileUpload1"
                                                                                onChange={(e) => {
                                                                                    handleImageChangeId(e);
                                                                                    uploadProfileMobile(e);
                                                                                    // phonebannerSelected();
                                                                                }}
                                                                            />
                                                                        </>
                                                                    )}
                                                                {/* </div> */}
                                                                {imgPreviewId && (
                                                                    <button className="btn-exam" onClick={() => setImgPreviewId(null)}>Remove</button>
                                                                )}
                                                            </div>
                                                            {/* <div><p className="phonebannerError" style={{ color: "red", fontWeight: 'bold' }}></p></div> */}
                                                        </div>
                                                    </div>
                                                    <div className="button">
                                                        <button type="submit" onClick={() => AddImportQuestion()} class="btn btn-success savebtn" disabled={startExamDisable}>
                                                        {showLoaderShow ?
                                                                (
                                                                    <span >
                                                                        <span class="spinner-border spinner-border-sm mr-1" role="status" aria-hidden="true"></span>
                                                                        Importing...
                                                                    </span>
                                                                )
                                                                :
                                                                (
                                                                    "Save"
                                                                )
                                                            }
                                                        </button>
                                                        <Link to="/Question"> <button type="button" class="btn">Cancel</button></Link>
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
    )
}
export default QuestionImport