import React, { useState, useEffect } from "react";
import '../CssFile/NewSubCategory.css';
import '../CssFile/NewStudent.css';
import '../CssFile/Student.css';
import { Link, useParams, useNavigate } from 'react-router-dom';
import SideNav from "./SideNav";
import Footer from "./Footer";
import Header from "./Header";
import Environment from "./Environment";
// import { useForm } from "react-hook-form";

function UpdateSubCategory() {
    // const { register, handleSubmit, formState: { errors }, } = useForm();

    // const onSubmit = () => {
    //     console.log("data");
    // }

    const [categoryUUID, setcategoryUUID] = useState();
    const [label, setLabel] = useState('');
    const [icon, setIcon] = useState('');
    const [status, setStatus] = useState('');

    const [categorylabel, setcategoryLabel] = useState();

    const params = useParams();
    const navigate = useNavigate();

    const [sincategory, setSincategory] = useState([])

    const [show, setShow] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("")
    const [startExamDisable, setStartExamDisable] = useState(false);
    const [showLoaderShow, setShowLoaderShow] = useState(false);

    useEffect(() => {
        getScategory();
        getSinCategory();
    }, [])

    const getSinCategory = async () => {
        let result = await fetch(`${Environment.server_url}/categories`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setSincategory(result.payload.lists.rows);
    }

    const updateSubcategoryHandler = (id) => {
        setcategoryUUID(id)
        // setFilterCategory(id);
        // getSubcategory(id);
    };

    const getScategory = async () => {
        let result = await fetch(`${Environment.server_url}/categories/subcategory/${params.uuid}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        result = await result.json()
        console.warn("subcateditresult", result)

            setcategoryLabel(result.payload.subCategory)
            {
                result.payload.subCategory.SubCategory_SubCategories.map((item)=>
                <>
                <span>{setcategoryUUID(item.categoryUUID)}</span>
                <span>{setLabel(item.label)}</span>
                <span>{setLabel(item.label)}</span>
                <span>{setStatus(item.status)}</span>
                {/* <span>{setIcon(item.icon)}</span> */}
                </>
                )
            }
    }



    //For UpDate Sub-Categroy
    const updateSubCategory = async () => {
        if (categoryUUID === null) {
            document.getElementsByClassName('categoryNameError')[0].innerText = "This field is required"
        }
        else {
            document.getElementsByClassName('categoryNameError')[0].innerText = ""
        }
        if (label === '') {
            document.getElementsByClassName('subcategoryNameError')[0].innerText = "This field is required"
        }
        else {
            document.getElementsByClassName('subcategoryNameError')[0].innerText = ""
        }

        if (status === '') {
            document.getElementsByClassName('categoryStatusError')[0].innerText = "This field is required"
        }
        else {
            document.getElementsByClassName('categoryStatusError')[0].innerText = ""
        }
        setStartExamDisable(true)
        setShowLoaderShow(true)
        setTimeout(() => {
            setStartExamDisable(false);
            setShowLoaderShow(false);
        }, 5000);
        // console.warn(categoryUUID, label, icon, status)
        let result = await fetch(`${Environment.server_url}/categories/sub-categories/${params.uuid}`, {
            method: "PUT",
            body: JSON.stringify({ categoryUUID, label, icon, status }),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        }).then(catdata => {
            if (catdata.status === 200) {
                setShowSuccess(true);
                setTimeout(() => {
                    navigate("/SubCategory")
                }, 5000);
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

    const categoryNameSelected = () => {
        document.getElementsByClassName('categoryNameError')[0].innerText = ""
    }
    const subcategoryNameSelected = () => {
        document.getElementsByClassName('subcategoryNameError')[0].innerText = ""
    }
    const categoryStatusSelected = () => {
        document.getElementsByClassName('categoryStatusError')[0].innerText = ""
    }

    if (show === true) {
        setTimeout(() => setShow(false), 5000);
    }
    if (showSuccess === true) {
        setTimeout(() => setShowSuccess(false), 5000);
    }



//For FileUpload And Edit File 
    async function uploadProfile(file) {
        // try {
        const fileObj = file.target.files[0];
        const fileName = fileObj.name;
        const fileExtension = fileName.match(/[a-zA-Z]{2,4}$/)[0];
        console.log(fileName, fileExtension)
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
        setIcon(fileUrl);


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
                                        <h4 className="mb-sm-0">Update Sub Category</h4>
                                        <div className="page-title-right">
                                            <ol className="breadcrumb m-0">
                                                <Link to="/SubCategory" className="breadcrumb-item">Sub Category List</Link>
                                                <li className="breadcrumb-item active">Update Sub Category</li>
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
                                                <form onSubmit={()=>navigate('../Subcategory',{replace:true})}>
                                                    <div className="form-row mb-4">
                                                        <div className="col-12 col-sm-4">
                                                            <p><b>Category</b></p>
                                                            <select className="form-select form-select mb-2" aria-label="Default select example" value={categoryUUID} onChange={(e) => { updateSubcategoryHandler(e.target.value) }}>
                                                                {
                                                                    sincategory.map((item) =>
                                                                        <option value={item.uuid} key={item}>{item.label}</option>
                                                                    )
                                                                }
                                                            </select>
                                                            <div><p className="categoryNameError" style={{ color: "red", fontWeight: 'bold' }}></p></div>
                                                        </div>
                                                        <div className="col-12 col-sm-4">
                                                            <p><b>Name<span className="required text-danger">*</span></b></p>
                                                            <input type="text" name="userName" className="form-control" value={label} onChange={(e) => { setLabel(e.target.value) }} />
                                                            <div><p className="subcategoryNameError" style={{ color: "red", fontWeight: 'bold' }}></p></div>
                                                        </div>
                                                        <div className="col-12 col-sm-4">
                                                            <p><b>Icon</b></p>
                                                            <div className="choose-file">
                                                                <input type="file" className="form-control form-control-prepended" id="exampleFormControlFile1" onChange={(e) => { uploadProfile(e) }} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-12 col-sm-4">
                                                            <p><b>Status<span className="required text-danger">*</span></b></p>
                                                            <select className="form-select form-select mb-2" aria-label="Default select example" onChange={(e) => { setStatus(e.target.value) }} value={status}>
                                                                <option>Select</option>
                                                                <option value={true}>Active</option>
                                                                <option value={false}>Inactive</option>
                                                            </select>
                                                            <div><p className="categoryStatusError" style={{ color: "red", fontWeight: 'bold' }}></p></div>
                                                        </div>
                                                    </div>
                                                    <div className="button">
                                                        <button type="submit" onClick={updateSubCategory} className="btn btn-success savebtn" disabled={startExamDisable}>
                                                        {showLoaderShow ?
                                                                (
                                                                    <span >
                                                                        <span class="spinner-border spinner-border-sm mr-1" role="status" aria-hidden="true"></span>
                                                                        Saving...
                                                                    </span>
                                                                )
                                                                :
                                                                (
                                                                    "Save"
                                                                )
                                                            }
                                                        </button>
                                                        <Link to="/SubCategory"><button type="button" className="btn">Cancel</button></Link>
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
export default UpdateSubCategory;