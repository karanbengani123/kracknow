import '../CssFile/Student.css';
import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import Header from './Header';
import Footer from './Footer';
import SideNav from './SideNav';
import Moment from 'react-moment';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import Environment from './Environment';


function Questionview() {

    const params = useParams()

    const [status, setStatus] = useState('')
    const [categoryUUID, setCategoryUUID] = useState('')
    const [subCategoryUUID, setSubCategoryUUID] = useState('')
    const [title, setTitle] = useState('')
    const [createdAt, setCreatedAt] = useState('')
    const [description, setDescription] = useState('')
    const [options, setOptions] = useState('')
    const [id, setId] = useState('')
    const [id2, setId2] = useState('')

    useEffect(() => {
        viewQuestionDetails();

    }, []);

    const viewQuestionDetails = async () => {
        console.warn(params);

        let result = await fetch(`${Environment.server_url}/questions/${params.uuid}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
        result = await result.json();
        console.warn("view", result.payload.question)

        setStatus(result.payload.question.status)
        setCategoryUUID(result.payload.question.questionCategory.label)
        setSubCategoryUUID(result.payload.question.questionSubCategory.label)
        setTitle(result.payload.question.title)
        setDescription(result.payload.question.description)
        setCreatedAt(result.payload.question.createdAt)
        if(result.payload.hasOwnProperty("question")){
            if(!result.payload.question.hasOwnProperty("options"))
            result.payload["question"]={options:[]}
        }else{
            result.payload["question"]={options:[]}
        }
        setOptions(result.payload.question.options)
        

        // console.warn(options,"iscorrect")

        // {
        //     result.payload.question.options.map(obj => {
        //         return obj.isCorrect ? <span className="badge bg-success me-1 mr-1">{setId(obj.key)}.{setId2(obj.text)}</span> : <span className="badge bg-danger me-1 mr-1">{setId(obj.key)}.{setId2(obj.text)}</span>
        //     })
        // }



        // setId(result.payload.question.options)
        // {
        //     result.payload.question.options.map(item =>
        //         <>
        //             {options.map(obj => {
        //                 return obj.isCorrect ? <span className="badge bg-success me-1 mr-1">{obj.key}.{obj.text}</span> : <span className="badge bg-danger me-1 mr-1">{obj.key}.{obj.text}</span>
        //             })}
        //         </>
        //     )
        // }
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
                                        <h4 className="mb-sm-0">Question</h4>
                                        <div className="page-title-right">
                                            <ol className="breadcrumb m-0">
                                                <Link to="/Question" className="breadcrumb-item">Question List</Link>
                                                <li className="breadcrumb-item active">Question</li>
                                            </ol>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <h6><b>Category</b></h6>
                                                    <span className="badge bg-primary">{categoryUUID}</span>
                                                </div>
                                                <div className="col-sm-3">
                                                    <h6><b>Sub category</b></h6>
                                                    <span className="badge bg-warning">{subCategoryUUID}</span>
                                                </div>
                                                <div className="col-sm-3">
                                                    <h6><b>Status</b></h6>
                                                    <span>{status ? <span className="badge bg-success"> Active </span> : <span className="badge bg-danger"> Inactive </span>}</span>
                                                </div>
                                                <div className="col-sm-3">
                                                    <h6><b>Created At</b></h6>
                                                    <span className="badge bg-secondary"><Moment>{createdAt}</Moment></span>
                                                </div>
                                            </div>

                                            <div className="row mt-5">
                                                <div className="col">
                                                    <h6><b>Question</b></h6>
                                                    <p><div dangerouslySetInnerHTML={{ __html: title }} ></div></p>

                                                </div>
                                            </div>

                                            <div className='row mt-4'>
                                                <div className='col'>
                                                    <h6><b>Description</b></h6>
                                                    <p>{description}</p>
                                                </div>
                                            </div>

                                            <div className="row mt-4">
                                                <div className="col">
                                                    <h6><b>Options</b></h6>
                                                    {/* <span><p>{id}.{id2}</p></span> */}
                                                    {options&&options.map((obj) => {
                                                        return obj.isCorrect ? <span className="badge bg-success me-1 mr-1">{obj.key}. {obj.text}<br></br>
                                                        {
                                                            obj.image && <Zoom><img src={obj.image} className="Questionimage"></img></Zoom>
                                                        }
                                                        </span>
                                                         : <span className="badge bg-dark me-1 mr-1">{obj.key}. {obj.text}<br/>
                                                         {
                                                            obj.image && <Zoom><img src={obj.image} className="Questionimage"></img></Zoom>
                                                        }
                                                        </span>
                                                    })}

                                                </div>
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

export default Questionview