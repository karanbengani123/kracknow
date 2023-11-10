import React, { useEffect, useState, useRef } from "react";
import { Link, useParams,useNavigate } from 'react-router-dom';
import SideNav from "./SideNav";
import Footer from "./Footer";
import Header from "./Header";
// import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import EditorContainer from "./TextEditor";
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import Environment from "./Environment";
import { Editor } from '@tinymce/tinymce-react';


function QuestionEdit() {
    const params = useParams('')
    const [status, setStatus] = useState('')
    const [categoryID, setCategoryID] = useState('')
    const [categoryUUID, setcategoryUUID] = useState('')


    const [subcategoryUUID, setSubCategoryUUID] = useState('')
    
    const [description, setDescription] = useState('')
    const [QuestionOption, setQueestionOption] = useState('')
    const [title, setTitle]= useState('')


    const [getcategory, setGetCategory] = useState([]);
    const [getsubCategory, setgetsubCategory] = useState([]);
    const [subCategoryUUID, setSubcategoryUUID] = useState('')


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


    const [isCorrect, setIsCorrect] = useState(false)
    const [isCorrect1, setIsCorrect1] = useState(false)
    const [isCorrect2, setIsCorrect2] = useState(false)
    const [isCorrect3, setIsCorrect3] = useState(false)

    const [show, setShow] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("")
    const [startExamDisable, setStartExamDisable] = useState(false);
    const [showLoaderShow, setShowLoaderShow] = useState(false);
    const navigate = useNavigate('');


    const handleEditorChange = (e) => {
        document.getElementsByClassName('titleError')[0].innerText = ""

        setTitle(e.target.getContent());
        console.log(title);
    }

    const onEditorStateChange = (title) => {
        return setTitle(title)
    }

 




    useEffect(() => {
        gettCategory();
        // getSubCategoryDetails();
        getQuestionDetails()
    }, [])


    const getQuestionDetails = async () => {
        console.warn(params)
        let result = await fetch(`${Environment.server_url}/questions/${params.uuid}`,
            {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
        result = await result.json();
        setStatus(result.payload.question.status)
        setcategoryUUID(result.payload.question.categoryUUID)
        setSubcategoryUUID(result.payload.question.subCategoryUUID)
        setTitle(result.payload.question.title)
        // tinymce.get("myTextarea").setContent("<p>Hello world!</p>");
        setDescription(result.payload.question.description)
        setQueestionOption(result.payload.question.QuestionOption)
        setOptionNumber(result.payload.question.options[0].key)
        setOptionNumber1(result.payload.question.options[1].key)
        setOptionNumber2(result.payload.question.options[2].key)
        setOptionNumber3(result.payload.question.options[3].key)
        setOptionImage(result.payload.question.options[0].image)
        setOptionImage1(result.payload.question.options[1].image)
        setOptionImage2(result.payload.question.options[2].image)
        setOptionImage3(result.payload.question.options[3].image)
        setOptionText(result.payload.question.options[0].text)
        setOptionText1(result.payload.question.options[1].text)
        setOptionText2(result.payload.question.options[2].text)
        setOptionText3(result.payload.question.options[3].text)
        setOptionAnswer(result.payload.question.options[0].isCorrect)
        setOptionAnswer1(result.payload.question.options[1].isCorrect)
        setOptionAnswer2(result.payload.question.options[2].isCorrect)
        setOptionAnswer3(result.payload.question.options[3].isCorrect)
        getSubCategoryDetails(result.payload.question.questionCategory.uuid);
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


    //To Get All Subcategories...
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

    const updateQuestion = async () => {
        if (title === '') {
            document.getElementsByClassName('titleError')[0].innerText = "This field is required"
        }
        else {
            document.getElementsByClassName('titleError')[0].innerText = ""
        }
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
            if (data.image || data.text) {
                return false
            } else {
                return true
            }
        })
        // console.log("opt",optionSelected)
        if (optionSelected.length !== 0) {
            document.getElementsByClassName('optionError')[0].innerText = "Option field is required"
        } else {
            document.getElementsByClassName('optionError')[0].innerText = ""
        }
        
        // console.warn(categoryUUID, subCategoryUUID, status, title, description, QuestionOption)
        let result = await fetch(`${Environment.server_url}/questions/${params.uuid}`, {
            method: "PUT",
            body: JSON.stringify({ categoryUUID, subCategoryUUID, status, title, QuestionOption:option }),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        .then(catdata => {
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
    }

    //First Option Image....
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
        setOptionImage(fileUrl);


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



    //Second Option Image.....
    async function uploadProfile2(file) {
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
        setOptionImage1(fileUrl);


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



    //Third Option Image....
    async function uploadProfile3(file) {
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
        setOptionImage2(fileUrl);


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




    //Fourth Option Image....
    async function uploadProfile4(file) {
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
        setOptionImage3(fileUrl);


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


    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            // console.log(editorRef.current.getContent());
        }
        document.getElementsByClassName('titleError')[0].innerText = ""

    };

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

    const OptionError = () => {
        document.getElementsByClassName('optionError')[0].innerText = ""
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
                                        <h4 className="mb-sm-0">Update Question</h4>
                                        <div className="page-title-right">
                                            <ol className="breadcrumb m-0">
                                                <Link to="/Question" className="breadcrumb-item">Question List</Link>
                                                <li className="breadcrumb-item active">Update Question</li>
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
                                <div className="col-sm-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="form">
                                                <form>
                                                    <div className="form-row mb-4">
                                                        <div className="col-12 col-sm-4">
                                                            <p1><b>Category</b><span className="required text-danger">*</span></p1>
                                                            <select className="form-select form-select mb-2 mt-3" aria-label="Default select example" value={categoryUUID} onChange={(e) => { updateSubcategoryHandler(e.target.value) }} >
                                                                {/* <option>select catergory</option> */}
                                                                {
                                                                    getcategory.map((item, key) =>
                                                                        <>
                                                                            <option value={item.uuid} key={key}>{item.label}</option>
                                                                        </>
                                                                    )
                                                                }
                                                            </select>
                                                        </div>
                                                        <div className="col-12 col-sm-4">
                                                            <p1><b>Sub Category</b><span className="required text-danger">*</span></p1>
                                                            <select className="form-select mt-3" aria-label="Default select example" value={subCategoryUUID} onChange={(e) => setSubcategoryUUID(e.target.value)}>
                                                                <option>select sub category</option>
                                                                {
                                                                    getsubCategory.map((item) =>
                                                                        <option value={item.uuid}>{item.label}</option>
                                                                    )
                                                                }
                                                            </select>
                                                        </div>
                                                        <div className="col-12 col-sm-4">
                                                            <p1><b>Status</b><span className="required text-danger">*</span></p1>
                                                            <select className="form-select form-select mb-2 mt-3" aria-label="Default select example"
                                                                onChange={(e) => { setStatus(e.target.value) }} value={status}
                                                            >
                                                                {/* <option>Select</option> */}
                                                                <option value={true}>Active</option>
                                                                <option value={false}>In-Active</option>
                                                            </select>

                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="mb-4">
                                                <p><b>Question</b><span className="required text-danger">*</span></p>
                                            </div>
                                            {/* <Editor wrapperClassName="demo-wrapper col-sm" editorClassName="demo-editor" localization={{ locale: 'en' }}  /> */}

                                            {/* <EditorContainer onChange={(e) => setTitle(e.target.value)} value={title} /> */}


                                            <Editor
                                                apiKey=''
                                                // onInit={(evt, editor) => editorRef.current = editor}
                                                // onEditorStateChange={(event)=>onEditorStateChange(event)}
                                                // onEditorStateChange={(event)=>onEditorStateChange(event)}
                                                // editorState={title}
                                                // value={title}
                                                initialValue={title}
                                                // onEditorStateChange={handleEditorChange}
                                                onBlur={handleEditorChange}
                                                init={{
                                                    mode : "textareas",
                                                    height: 500,
                                                    branding: false,
                                                    menubar: 'file edit insert format table tools help',
                                                    plugins: [
                                                        'paste image help wordcount',
                                                    ],
                                                    toolbar: 'undo redo | formatselect | ' +
                                                        'bold italic backcolor | alignleft aligncenter ' +
                                                        'alignright alignjustify | bullist numlist outdent indent | ' +
                                                        'removeformat | image',
                                                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                                                    file_picker_types: 'image',
                                                    image_title: true,
                                                    automatic_uploads: true,
                                                    selector: 'textarea#file-picker',
                                                    // images_upload_url: '',
                                                    images_upload_handler: tinyEditorUploadHandler,
                                                }}

                                            />
                                             <div><p className="titleError" style={{ color: "red", fontWeight: 'bold' }}></p></div>
                                            {/* onChange={(e) => { setTitle(log) }} */}
                                            {/* <button onClick={log}>Log editor content</button> */}


                                            {/* <div className="mb-4 mt-4">
                                                <p><b>Description</b></p>
                                                <textarea className="form-control" id="exampleFormControlTextarea1" rows="6" onChange={(e) => setDescription(e.target.value)} value={description}></textarea>
                                            </div> */}


                                            <div className="mb-4">
                                                <p><b>Options</b></p>
                                                <div className="option-section">
                                                    <div className="form-row">
                                                        <div className="col-sm-1">
                                                            <input type="name" className="form-control" id="exampleFormControlInput1" placeholder="Opt no." onChange={(e) => setOptionNumber(e.target.value)} value={optionNumber}></input>

                                                        </div>
                                                        <div className="col-sm-4">
                                                            <div className="choose-file">
                                                                <input type="file" required className="form-control form-control-prepended" id="exampleFormControlFile1" onChange={(e) => { uploadProfile(e); OptionError() }} />
                                                            </div>
                                                        </div>
                                                        <div className="col-sm">
                                                        <Zoom><img className="optionimage" src={optionImage || 'placeholder1.png'} alt="" /></Zoom>
                                                        </div>
                                                        <div className="col-sm-4">
                                                            <input type="name" className="form-control" id="exampleFormControlInput1" placeholder="Text" onChange={(e) => {setOptionText(e.target.value); OptionError() }} value={optionText}></input>
                                                        </div>
                                                        <div className="col-sm">
                                                            <div className="input-group-append">
                                                                <label className="input-group-text">
                                                                    <input type="checkbox" name="is_answer_1" onChange={(e) => setOptionAnswer(e.target.checked)} checked={optionAnswer} />&nbsp; Correct
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
                                                                <input type="file" required className="form-control form-control-prepended" id="exampleFormControlFile1" onChange={(e) => { uploadProfile2(e); OptionError()  }} />
                                                            </div>
                                                        </div>
                                                        <div className="col-sm">
                                                        <Zoom><img className="optionimage" src={optionImage1 || 'placeholder1.png'} alt="" /></Zoom>
                                                        </div>
                                                        <div className="col-sm-4">
                                                            <input type="name" className="form-control" id="exampleFormControlInput1" placeholder="Text" onChange={(e) => {setOptionText1(e.target.value); OptionError() }} value={optionText1}></input>
                                                        </div>
                                                        <div className="col-sm">
                                                            <div className="input-group-append">
                                                                <label className="input-group-text">
                                                                    <input type="checkbox" name="is_answer_1" onChange={(e) => setOptionAnswer1(e.target.checked)} checked={optionAnswer1} />&nbsp; Correct
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
                                                                <input type="file" required className="form-control form-control-prepended" id="exampleFormControlFile1" onChange={(e) => { uploadProfile3(e); OptionError()  }} />
                                                            </div>
                                                        </div>
                                                        <div className="col-sm">
                                                        <Zoom><img className="optionimage" src={optionImage2 || 'placeholder1.png'} alt="" /></Zoom>
                                                        </div>
                                                        <div className="col-sm-4">
                                                            <input type="name" className="form-control" id="exampleFormControlInput1" placeholder="Text" value={optionText2} onChange={(e) => {setOptionText2(e.target.value); OptionError() }}></input>
                                                        </div>
                                                        <div className="col-sm">
                                                            <div className="input-group-append">
                                                                <label className="input-group-text">
                                                                    <input type="checkbox" name="is_answer_1" onChange={(e) => setOptionAnswer2(e.target.checked)} checked={optionAnswer2} />&nbsp; Correct
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
                                                                <input type="file" required className="form-control form-control-prepended" id="exampleFormControlFile1" onChange={(e) => { uploadProfile4(e); OptionError()  }} />
                                                            </div>
                                                        </div>
                                                        <div className="col-sm">
                                                        <Zoom><img className="optionimage" src={optionImage3 || 'placeholder1.png'} alt="" /></Zoom>
                                                        </div>
                                                        <div className="col-sm-4">
                                                            <input type="name" className="form-control" id="exampleFormControlInput1" placeholder="Text" value={optionText3} onChange={(e) => {setOptionText3(e.target.value); OptionError() }}></input>
                                                        </div>
                                                        <div className="col-sm">
                                                            <div className="input-group-append">
                                                                <label className="input-group-text">
                                                                    <input type="checkbox" name="is_answer_1" onChange={(e) => setOptionAnswer3(e.target.checked)} checked={optionAnswer3} />&nbsp; Correct
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div><p className="optionError" style={{ color: "red", fontWeight: 'bold' }}></p></div>
                                            </div>
                                            <div className="button">
                                                <button type="button" onClick={updateQuestion} class="btn btn-success savebtn">Save</button>
                                                <Link to="/Question"><button type="button" class="btn">Cancel</button></Link>
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
export default QuestionEdit