import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import '../CssFile/Exam.css';
import '../CssFile/Student.css';
import SideNav from "./SideNav";
import Footer from "./Footer";
import Header from "./Header";
import { Editor } from '@tinymce/tinymce-react';
import Environment from "./Environment";

function QuestionAdd() {
    const params = useParams();
    const navigate = useNavigate('');

    const [getcategory, setGetCategory] = useState([]);
    const [getsubCategory, setgetsubCategory] = useState([]);

    const [categoryID, setCategoryID] = useState('');
    const [status, setStatus] = useState('')
    const [text, setText] = useState('');
    const [description, setDescription] = useState('');
    const [optionNumber, setOptionNumber] = useState('A');
    const [optionImage, setOptionImage] = useState('')
    const [optionText, setOptionText] = useState('')
    const [optionAnswer, setOptionAnswer] = useState(false)

    const [description1, setDescription1] = useState('');
    const [optionNumber1, setOptionNumber1] = useState('B');
    const [optionImage1, setOptionImage1] = useState('')
    const [optionText1, setOptionText1] = useState('')
    const [optionAnswer1, setOptionAnswer1] = useState(false)

    const [description2, setDescription2] = useState('');
    const [optionNumber2, setOptionNumber2] = useState('C');
    const [optionImage2, setOptionImage2] = useState('')
    const [optionText2, setOptionText2] = useState('')
    const [optionAnswer2, setOptionAnswer2] = useState(false)

    const [description3, setDescription3] = useState('');
    const [optionNumber3, setOptionNumber3] = useState('D');
    const [optionImage3, setOptionImage3] = useState('')
    const [optionText3, setOptionText3] = useState('')
    const [optionAnswer3, setOptionAnswer3] = useState(false)


    const [categoryUUID, setcategoryUUID] = useState('')
    const [subCategoryUUID, setSubcategoryUUID] = useState('')
    const [QuestionOption, setQuestionOption] = useState('')
    const [questionTitle, setQuestionTitle] = useState('')
    const [key, setKey] = useState('')

    const [isCorrect, setIsCorrect] = useState('')
    const [isCorrect1, setIsCorrect1] = useState('')
    const [isCorrect2, setIsCorrect2] = useState('')
    const [isCorrect3, setIsCorrect3] = useState('')


    const [categoryError, setCategoryError] = useState('')
    const [statusError, setStatusError] = useState('')
    const [subCategoryError, setSubCategoryError] = useState('')
    const [questionTitleError, setQuestionTitleError] = useState('')
    const [QuestionOptionError, setQuestionOptionError] = useState('')
    const [QuestionOptionError1, setQuestionOptionError1] = useState('')
    const [QuestionOptionError2, setQuestionOptionError2] = useState('')
    const [QuestionOptionError3, setQuestionOptionError3] = useState('')
    const [title, setTitle] = useState('')

    const [show, setShow] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("")
    const [startExamDisable, setStartExamDisable] = useState(false);
    const [showLoaderShow, setShowLoaderShow] = useState(false);


    const handleEditorChange = (e) => {

        setTitle(e.target.getContent())

        document.getElementsByClassName('titleError')[0].innerText = ""

        // console.log(
        //   'Content was updated:',
        //   e.target.getContent()
        // );
    }


    useEffect(() => {
        gettCategory();
        getSubCategoryDetails();
    }, [])



    function myFun() {
        var a = document.getElementsByName('is_answer_1');
        var total = 0;
        var i;
        for (i = 0; i < a.length; i++) {
            if (a[i].checked == true) {
                total = total + 1;
            }
        }
        if (total === 0) {
            document.getElementById('Error1').innerHTML = "Select At Least One Checkbox"
        }
        else {
            document.getElementById('Error1').innerHTML = ""
        }
        if (total >= 2) {
            document.getElementById('Error').innerHTML = "Select Only One Checkbox";
            document.getElementsByName('is_answer_1').checked = false;
            return false
        }
        document.getElementById('Error').innerHTML = "";


    }


    const Addquestion = async () => {
        if (title === '') {
            document.getElementsByClassName('titleError')[0].innerText = "This field is required"
        }
        else {
            document.getElementsByClassName('titleError')[0].innerText = ""
        }

        if (status === '') {
            document.getElementsByClassName('statusError')[0].innerText = "Status is required"
        }
        else {
            document.getElementsByClassName('statusError')[0].innerText = ""
        }


        if (subCategoryUUID === '') {
            document.getElementsByClassName('subcatError')[0].innerText = "Sub-category is required"
        }
        else {
            document.getElementsByClassName('subcatError')[0].innerText = ""
        }

        if (categoryUUID === '') {
            document.getElementsByClassName('catError')[0].innerText = "Category is required"
        }
        else {
            document.getElementsByClassName('catError')[0].innerText = ""
        }
        // debugger
        // console.log("data is",questionTitle.getCurrentContent().getPlainText())
        const option = [];
        option.push({
            "key": optionNumber,
            "image": optionImage,
            "text": optionText,
            "isCorrect": optionAnswer
        })
        option.push({
            "key": optionNumber1,
            "image": optionImage1,
            "text": optionText1,
            "isCorrect": optionAnswer1
        })
        option.push({
            "key": optionNumber2,
            "image": optionImage2,
            "text": optionText2,
            "isCorrect": optionAnswer2
        })
        option.push({
            "key": optionNumber3,
            "image": optionImage3,
            "text": optionText3,
            "isCorrect": optionAnswer3
        })

        const optionSelected = option.filter((data) => {
            // console.log(data)
            if (data.image || data.text) {
                return false
            } else {
                return true
            }
        })

        var a = document.getElementsByName('is_answer_1');
        var total = 0;
        var i;
        for (i = 0; i < a.length; i++) {
            if (a[i].checked == true) {
                total = total + 1;
            }
        }
        if (total === 0) {
            document.getElementById('Error1').innerHTML = "Select At Least One Checkbox"
        }
        else {
            document.getElementById('Error1').innerHTML = ""
        }
        if (total >= 2) {
            document.getElementById('Error').innerHTML = "Select Only One Checkbox";
            document.getElementsByName('is_answer_1').checked = false;
            return false
        }
        document.getElementById('Error').innerHTML = "";


        // console.log("opt",optionSelected)
        if (optionSelected.length !== 0) {
            document.getElementsByClassName('optionError')[0].innerText = "Option field is required"
        } else {
            document.getElementsByClassName('optionError')[0].innerText = ""

        }

        // const optionChecked = option.filter((data) => {
        //     if (data.isCorrect) {
        //         return false
        //     } else {
        //         return true
        //     }
        // })
        // console.log("opt",optionChecked)
        // if (optionChecked.length === false) {
        //     document.getElementById('Error1')[0].innerHTML = "Select At Least One Checkbox"
        // } else {
        //     document.getElementById('Error1')[0].innerHTML = ""

        // }

        // setStartExamDisable(true)
        setShowLoaderShow(true)
        setTimeout(() => {
            setStartExamDisable(false);
            setShowLoaderShow(false);
        }, 5000);


        // console.warn(categoryUUID, subCategoryUUID, status, title, description, QuestionOption);
        // console.warn(document.getElementById('Error1').innerHTML.length);

        // if (document.getElementById('Error1').innerHTML.length === 0) {
            const catdata = await fetch(`${Environment.server_url}/questions`, {
                method: "POST",
                body: JSON.stringify({ categoryUUID, subCategoryUUID, status, title, QuestionOption: option }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            }).then(catdata => {
                if (catdata.status === 200) {
                    setShowSuccess(true);
                    setTimeout(() => {
                        navigate("/Question")
                    }, 3000);
                    return (catdata.json());
                }
                else {
                    setShow(true);
                    return (catdata.json());
                }
            }).then(catdata => {
                setErrorMessage(catdata.message)
            })
            window.scrollTo(0, 0)
        // }

        // .then(catdata => {
        //     if (!categoryUUID == '') {
        //         if (!subCategoryUUID == '') {
        //             if (!status == '') {
        //                 if (!text == '') {
        //     if (!questionTitle == '') {

        //     }
        //     else {

        //     }
        //     }
        //             } else {
        //             }
        //         } else {
        //         }
        //     } else 
        //     {
        //         setCategoryError(catdata.payload.categoryUUID.message)
        //         setSubCategoryError(catdata.payload.subCategoryUUID.message)
        //         setStatusError(catdata.payload.status.message);
        //         setQuestionTitleError(catdata.payload.questionTitle.message)
        //         setQuestionOptionError(catdata.payload.QuestionOption.children[0].text.message)
        //         setQuestionOptionError1(catdata.payload.QuestionOption.children[1].text.message)
        //         setQuestionOptionError2(catdata.payload.QuestionOption.children[2].text.message)
        //         setQuestionOptionError3(catdata.payload.QuestionOption.children[3].text.message)
        //     }

        // })
    }

    const OptionError = () => {
        document.getElementsByClassName('optionError')[0].innerText = ""
    }

    const statusSelected = () => {
        document.getElementsByClassName('statusError')[0].innerText = ""
    }

    const subcatSelected = () => {
        document.getElementsByClassName('subcatError')[0].innerText = ""
    }


    const catSelected = () => {
        document.getElementsByClassName('catError')[0].innerText = ""
    }


    //To Get The All The Category....
    const gettCategory = async () => {
        let result = await fetch(`${Environment.server_url}/categories`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setGetCategory(result.payload.lists.rows);
        setCategoryID(categoryUUID)
    }

    //Get The Sub-Category According To The Category Selection...
    const getSubCategoryDetails = async (id) => {
        let result = await fetch(`${Environment.server_url}/categories/category/subcategories/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });

        result = await result.json();
        setgetsubCategory(result.payload.subCategory)

    }
    // console.warn("subcateoryuuid", subCategoryUUID)

    const updateSubcategoryHandler = (id) => {
        setcategoryUUID(id);
        getSubCategoryDetails(id);
    };
    // console.warn(categoryUUID,"Caetegory UUID")



    //First Option Image....
    async function uploadProfile(file) {
        // try {
        const fileObj = file.target.files[0];
        const fileName = fileObj.name;
        const fileExtension = fileName.match(/[a-zA-Z]{2,4}$/)[0];
        // console.log(fileName, fileExtension)
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
        setOptionImage(fileUrl);


        await fetch(signedUrl, {
            method: "PUT",
            // headers: {
            //     "Content-Type": "application/json",
            //     Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            // },
            body: fileObj,
        });
        // console.log("file url", fileUrl)
        // } catch { }
    }


    //Second Option Image.....
    async function uploadProfile2(file) {
        // try {
        const fileObj = file.target.files[0];
        const fileName = fileObj.name;
        const fileExtension = fileName.match(/[a-zA-Z]{2,4}$/)[0];
        // console.log(fileName, fileExtension)
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
        setOptionImage1(fileUrl);


        await fetch(signedUrl, {
            method: "PUT",
            // headers: {
            //     "Content-Type": "application/json",
            //     Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            // },
            body: fileObj,
        });
        // console.log("file url", fileUrl)
        // } catch { }
    }


    //Third Option Image....
    async function uploadProfile3(file) {
        // try {
        const fileObj = file.target.files[0];
        const fileName = fileObj.name;
        const fileExtension = fileName.match(/[a-zA-Z]{2,4}$/)[0];
        // console.log(fileName, fileExtension)
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
        setOptionImage2(fileUrl);


        await fetch(signedUrl, {
            method: "PUT",
            // headers: {
            //     "Content-Type": "application/json",
            //     Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            // },
            body: fileObj,
        });
        // console.log("file url", fileUrl)
        // } catch { }
    }


    //Fourth Option Image....
    async function uploadProfile4(file) {
        // try {
        const fileObj = file.target.files[0];
        const fileName = fileObj.name;
        const fileExtension = fileName.match(/[a-zA-Z]{2,4}$/)[0];
        // console.log(fileName, fileExtension)
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
        setOptionImage3(fileUrl);


        await fetch(signedUrl, {
            method: "PUT",
            // headers: {
            //     "Content-Type": "application/json",
            //     Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            // },
            body: fileObj,
        });
        // console.log("file url", fileUrl)
        // } catch { }
    }




    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            // console.log(editorRef.current.getContent());
        }
    };

    const onEditorStateChange = (title) => {
        document.getElementsByClassName('titleError')[0].innerText = ""
        return setTitle(title)

    }

    const uploadFileToS3 = async (blobInfo) => {
        const fileName = Date.now() + '-' + blobInfo.filename();
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
        const file = new File([blobInfo.blob()], fileName);

        await fetch(signedUrl, {
            method: "PUT",
            body: file,
        });

        return fileUrl;
    }

    const tinyEditorUploadHandler = (blobInfo, progress) => new Promise((resolve, reject) => {
        uploadFileToS3(blobInfo).then((url) => {
            progress(url);
            resolve(url)
        })
    })


    if (show === true) {
        setTimeout(() => setShow(false), 5000);
    }
    if (showSuccess === true) {
        setTimeout(() => setShowSuccess(false), 5000);
    }


    // console.warn("___________Outside Looop",)
    // const example_image_upload_handler_callback = (blobInfo, progress) => new Promise((resolve, reject) => {
    //     console.warn("___________Inside Looop",)
    //     const xhr = new XMLHttpRequest();
    //     xhr.withCredentials = `Bearer ${JSON.parse(localStorage.getItem('token'))}`;
    //     xhr.open('POST', `${Environment.server_url}/common/filesupload`);

    //     xhr.upload.onprogress = (e) => {
    //       progress(e.loaded / e.total * 100);
    //     };

    //     xhr.onload = () => {
    //       if (xhr.status === 403) {
    //         reject({ message: 'HTTP Error: ' + xhr.status, remove: true });
    //         return;
    //       }

    //       if (xhr.status < 200 || xhr.status >= 300) {
    //         reject('HTTP Error: ' + xhr.status);
    //         return;
    //       }

    //       const json = JSON.parse(xhr.responseText);

    //       if (!json || typeof json.location != 'string') {
    //         reject('Invalid JSON: ' + xhr.responseText);
    //         return;
    //       }

    //       resolve(json.location);
    //     };

    //     xhr.onerror = () => {
    //       reject('Image upload failed due to a XHR Transport error. Code: ' + xhr.status);
    //     };

    //     const formData = new FormData();
    //     formData.append('file', blobInfo.blob(), blobInfo.filename());

    //     xhr.send(formData);
    //     console.warn(formData,"FormData");
    //   });

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
                                        <h4 className="mb-sm-0">New Question</h4>
                                        <div className="page-title-right">
                                            <ol className="breadcrumb m-0">
                                                <Link to="/Question" className="breadcrumb-item">Question List</Link>
                                                <li className="breadcrumb-item active">New Question</li>
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
                                                <form>
                                                    <div className="form-row mb-4">
                                                        <div className="col-12 col-sm-4">
                                                            <p><b>Category</b><span className="required text-danger">*</span></p>
                                                            <select className="form-select " aria-label="Default select example" onChange={(e) => { updateSubcategoryHandler(e.target.value); catSelected() }} >
                                                                <option>Select category</option>
                                                                {
                                                                    getcategory.map((item, key) =>
                                                                        <>
                                                                            <option value={item.uuid} key={key}>{item.label}</option>
                                                                        </>
                                                                    )
                                                                }
                                                            </select>
                                                            {/* {<div><p className="ErrorMessage">{categoryUUID === '' ? (categoryError) : ('')}</p></div>} */}
                                                            <div><p className="catError" style={{ color: "red", fontWeight: 'bold' }}></p></div>

                                                        </div>
                                                        <div className="col-12 col-sm-4">
                                                            <p><b>Sub Category</b><span className="required text-danger">*</span></p>

                                                            <select className="form-select" aria-label="Default select example" onChange={(e) => { setSubcategoryUUID(e.target.value); subcatSelected() }}>
                                                                <option >Select sub-category</option>
                                                                {
                                                                    getsubCategory.map((item) =>
                                                                        <option value={item.uuid}>{item.label}</option>
                                                                    )
                                                                }
                                                            </select>
                                                            {/* {<div><p className="ErrorMessage">{subCategoryUUID === '' ? (subCategoryError) : ('')}</p></div>} */}
                                                            <div><p className="subcatError" style={{ color: "red", fontWeight: 'bold' }}></p></div>

                                                        </div>
                                                        <div className="col-12 col-sm-4">
                                                            <p><b>Status</b><span className="required text-danger">*</span></p>
                                                            <select className="form-select" aria-label="Default select example" onChange={(e) => { setStatus(e.target.value); statusSelected() }}>
                                                                <option >Select status</option>
                                                                <option value={true}>Active</option>
                                                                <option value={false}>Inactive</option>
                                                            </select>
                                                            {/* {<div><p className="ErrorMessage">{status === '' ? (statusError) : ('')}</p></div>} */}
                                                            <div><p className="statusError" style={{ color: "red", fontWeight: 'bold' }}></p></div>

                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="mb-4">
                                                <p><b>Question</b><span className="required text-danger">*</span></p>
                                            </div>
                                            <div>
                                                <Editor
                                                    apiKey=''
                                                    onInit={(evt, editor) => editorRef.current = editor}
                                                    onEditorStateChange={(event) => onEditorStateChange(event)}
                                                    editorState={title}

                                                    init={{
                                                        branding: false,
                                                        height: 500,
                                                        menubar: 'file edit insert format table tools help',
                                                        plugins: [
                                                            'paste image help wordcount',
                                                        ],
                                                        toolbar: 'undo redo | formatselect | ' +
                                                            'bold italic backcolor | alignleft aligncenter ' +
                                                            'alignright alignjustify | bullist numlist outdent indent | ' +
                                                            'removeformat | help | image | wordcount',
                                                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                                                        file_picker_types: 'image',
                                                        image_title: true,
                                                        automatic_uploads: true,
                                                        selector: 'textarea#file-picker',
                                                        images_upload_handler: tinyEditorUploadHandler,

                                                        // images_upload_url: `${Environment.server_url}/common/filesupload`,
                                                    }}
                                                    onChange={handleEditorChange}
                                                />
                                                <div><p className="titleError" style={{ color: "red", fontWeight: 'bold' }}></p></div>
                                                {/* onChange={(e) => { setQuestionTitle(log) }} */}
                                                {/* <button onClick={log}>Log editor content</button> */}
                                            </div>





                                            {/* <div className="mb-4 mt-4">
                                                <p><b>Description</b></p>
                                                <textarea className="form-control" id="exampleFormControlTextarea1" rows="6" onChange={(e) => setDescription(e.target.value)} value={description}></textarea>
                                            </div> */}

                                            <div className="mb-4">
                                                <p><b>Options</b><span className="required text-danger">*</span></p>
                                                <div className="option-section">
                                                    <div className="form-row">
                                                        <div className="col-1">
                                                            <input type="name" className="form-control" id="exampleFormControlInput1" placeholder="Opt no." onChange={(e) => setOptionNumber(e.target.value)} value={optionNumber}></input>

                                                        </div>
                                                        <div className="col-4">
                                                            <div className="choose-file">
                                                                <input type="file" required className="form-control form-control-prepended" id="exampleFormControlFile1" onChange={(e) => { uploadProfile(e); OptionError() }} />
                                                            </div>
                                                        </div>
                                                        <div className="col-4">
                                                            <input type="name" className="form-control" id="exampleFormControlInput1" placeholder="Text" onChange={(e) => { setOptionText(e.target.value); OptionError() }} value={optionText}></input>
                                                            {<div><p className="ErrorMessage">{QuestionOptionError}</p></div>}
                                                        </div>
                                                        <div className="col">
                                                            <div className="input-group-append">
                                                                <label className="input-group-text">
                                                                    <input type="checkbox" name="is_answer_1" onChange={(e) => setOptionAnswer(e.target.checked)} onClick={() => myFun(isCorrect)} value={isCorrect} />&nbsp; Correct
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="form-row mt-4">
                                                        <div className="col-sm-1">
                                                            <input type="name" className="form-control" id="exampleFormControlInput1" placeholder="Opt no." onChange={(e) => setOptionNumber1(e.target.value)} value={optionNumber1}></input>
                                                        </div>
                                                        <div className="col-sm-4">
                                                            <div className="choose-file">
                                                                <input type="file" required className="form-control form-control-prepended" id="exampleFormControlFile1" onChange={(e) => { uploadProfile2(e); OptionError() }} />
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-4">
                                                            <input type="name" className="form-control" id="exampleFormControlInput1" placeholder="Text" onChange={(e) => { setOptionText1(e.target.value); OptionError() }} value={optionText1}></input>
                                                            {<div><p className="ErrorMessage">{QuestionOptionError1}</p></div>}
                                                        </div>
                                                        <div className="col-sm">
                                                            <div className="input-group-append">
                                                                <label className="input-group-text">
                                                                    <input type="checkbox" name="is_answer_1" onChange={(e) => setOptionAnswer1(e.target.checked)} onClick={() => myFun(isCorrect1)} value={isCorrect1} />&nbsp; Correct
                                                                </label>

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="form-row mt-4">
                                                        <div className="col-sm-1">
                                                            <input type="name" className="form-control" id="exampleFormControlInput1" placeholder="Opt no." value={optionNumber2} onChange={(e) => setOptionNumber2(e.target.value)}></input>
                                                        </div>
                                                        <div className="col-sm-4">
                                                            <div className="choose-file">
                                                                <input type="file" required className="form-control form-control-prepended" id="exampleFormControlFile1" onChange={(e) => { uploadProfile3(e); OptionError() }} />
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-4">
                                                            <input type="name" className="form-control" id="exampleFormControlInput1" placeholder="Text" value={optionText2} onChange={(e) => { setOptionText2(e.target.value); OptionError() }}></input>
                                                            {<div><p className="ErrorMessage">{QuestionOptionError2}</p></div>}
                                                        </div>
                                                        <div className="col-sm">
                                                            <div className="input-group-append">
                                                                <label className="input-group-text">
                                                                    <input type="checkbox" name="is_answer_1" onChange={(e) => setOptionAnswer2(e.target.checked)} onClick={() => myFun(isCorrect2)} value={isCorrect2} />&nbsp; Correct
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="form-row mt-4">
                                                        <div className="col-sm-1">
                                                            <input type="name" className="form-control" id="exampleFormControlInput1" placeholder="Opt no." value={optionNumber3} onChange={(e) => setOptionNumber3(e.target.value)}></input>
                                                        </div>
                                                        <div className="col-sm-4">
                                                            <div className="choose-file">
                                                                <input type="file" required className="form-control form-control-prepended" id="exampleFormControlFile1" onChange={(e) => { uploadProfile4(e); OptionError() }} />
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-4">
                                                            <input type="name" className="form-control" id="exampleFormControlInput1" placeholder="Text" value={optionText3} onChange={(e) => { setOptionText3(e.target.value); OptionError() }}></input>
                                                            {<div><p className="ErrorMessage">{QuestionOptionError3}</p></div>}
                                                        </div>
                                                        <div className="col-sm">
                                                            <div className="input-group-append">
                                                                <label className="input-group-text">
                                                                    <input type="checkbox" name="is_answer_1" onChange={(e) => setOptionAnswer3(e.target.checked)} onClick={() => myFun(isCorrect3)} value={isCorrect3} />&nbsp; Correct
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div><p className="optionError" style={{ color: "red", fontWeight: 'bold' }}></p></div>
                                                <div>
                                                    <b><span id="Error" style={{ color: "red" }}></span></b>
                                                </div>
                                                <div>
                                                    <b><span id="Error1" style={{ color: "red" }}></span></b>
                                                </div>
                                            </div>
                                            <div className="button">
                                                <button type="button" onClick={() => Addquestion()} className="btn btn-success savebtn">Save</button>
                                                <Link to="/Question"><button type="button" className="btn">Cancel</button></Link>
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
export default QuestionAdd