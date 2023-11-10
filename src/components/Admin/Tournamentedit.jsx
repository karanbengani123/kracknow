import React, { useEffect, useState, useRef, useCallback } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams, useNavigate } from 'react-router-dom';
import SideNav from "./SideNav";
import Footer from "./Footer";
import Header from "./Header";
import '../CssFile/AddExam.css';
import '../CssFile/Student.css';
import { Multiselect } from 'multiselect-react-dropdown';
import Popup from 'reactjs-popup';
import "../CssFile/Popup.css";
import { debounce } from 'lodash';
import ReactPaginate from "react-paginate";
import Environment from "./Environment";


const Tournamentedit = () => {
    const [show, setShow] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("")
    const [startExamDisable, setStartExamDisable] = useState(false);
    const [showLoaderShow, setShowLoaderShow] = useState(false);
    const [imgPreview, setImgPreview] = useState(null);
    const [error, setError] = useState(false);
    const [checked1, setChecked1] = useState(false);
    const [checked, setChecked] = useState(false);
    const [text1, setText1] = useState("");
    const [text, setText] = useState("");
    const [isfreecheckboxcheck, setIsFreeCheckBoxCheck] = useState(false)
    const [perquestiontimelimitcheckboxcheck, setPerQuestionTimeLimitcheckboxcheck] = useState(false)

    const [inputList, setInputList] = useState([{ firstName: "" }]);

    // handle input change
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
    };

    // handle click event of the Remove button
    const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
        alert("Wants To Remove");
    };

    // handle click event of the Add button
    const handleAddClick = () => {
        setInputList([...inputList, { firstName: "" }]);
    };
    const navigate = useNavigate()




    const handleImageChange = (e) => {
        setError(false);
        const selected = e.target.files[0];
        const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg"];
        if (selected && ALLOWED_TYPES.includes(selected.type)) {
            let reader = new FileReader();
            reader.onloadend = () => {
                setImgPreview(reader.result);
            }
            reader.readAsDataURL(selected);
        } else {
            setError(true);
        }
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
        }
    };


    const [formValues, setFormValues] = useState([{}])
    let handleChange = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
    }

    let addFormFields = () => {
        setFormValues([...formValues, {}])
    }

    let removeFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues);
        alert("Wants To Delete");
    }


    const params = useParams('')

    const [banner, setBanner] = useState('');
    const [title, setTitle] = useState('');
    const [studentLimit, setStudentLimit] = useState('')
    // const [starttime, setStartTime] = useState('')
    // const [endtime, setEndTime] = useState('')
    const [isFree, setIsFree] = useState(false)
    const [joinFee, setJoinFee] = useState(0)
    const [marksPerQuestion, setMarksPerQuestion] = useState(0)
    const [timePerQuestion, settimePerQuestion] = useState(0)
    // const [perquestiontimelimit, setPerQuestionTimeLimit] = useState(0)
    const [perQuestionlimitcheck, setPerQuestionLimitCheck] = useState('')
    const [totalwinningprice, setTotalWinningPrice] = useState('')
    const [winningPrice, settotalWinningPrize] = useState('')
    const [isFeatured, setIsFeatured] = useState('')
    const [allowPrimarySelection, setAllowPrimarySelection] = useState()
    const [allowSecondarySelection, setAllowSecondarySelection] = useState('')
    const [joinDelay, setJoinDelay] = useState(0)
    const [tournamentKeywords, setExamKeyword] = useState([])
    const [description, setDescription] = useState('')
    const [categoryUUID, setcategoryUUID] = useState('');
    const [webBanner, setWebBanner] = useState();
    const [tournamentExams, setExamQuestion] = useState([]);
    const [city, setCity] = useState([]);
    const [tournamentCities, setExamCity] = useState([]);
    // const [marksperQuestion, setMarksperQuestion] = useState();
    const [questions, setQuestions] = useState([]);
    const [rankingFactor, setRankingFactor] = useState([]);
    const [phoneBanner, setphoneBanner] = useState();
    const [joiningFees, setJoiningFees] = useState();
    const [keyword, setGetKeyword] = useState([]);
    const [ExamRankingFactor, setExamRankingFactor] = useState([])
    const [type, setType] = useState("EXAM")
    const [rankType, setRankType] = useState('')
    const [rankTime, setRankTime] = useState('')
    const [rankPoint, setRankPoint] = useState('')
    const [rankTitle, setRankTitle] = useState('')
    const [rank, setRanks] = useState('')
    const [quetsionCheck, setQuestionCheck] = useState()

    const [filterCategory, setFilterCategory] = useState('')
    const [filtersubCategory, setFilterSubCategory] = useState('')
    const [filterstartDate, setFilteStartDate] = useState('')
    const [filterendDate, setFilteEndDate] = useState('')
    const [filterusagecount, setFilteUsageCount] = useState("")

    const [category, setCategory] = useState();
    const [sincategory, setSincategory] = useState([]);

    const [questionType, setQuestionType] = useState()
    const [titile, setTitile] = useState()
    const [time, setTime] = useState()
    const [points, setPoints] = useState()

    const [keywords, setKeywords] = useState([])
    const [getcategory, setGetcategory] = useState([])
    const [getsubcategory, setGetSubcategory] = useState([])

    //new winning price
    const [prizeNumber0, setPrizeNumber0] = useState(1)
    const [prizeAmount0, setPrizeAmount0] = useState('')

    const [prizeFromNumber0, setPrizeFromNumber0] = useState('')
    const [prizeFromNumber1, setPrizeFromNumber1] = useState('')
    const [prizeFromNumber2, setPrizeFromNumber2] = useState('')
    const [prizeFromNumber3, setPrizeFromNumber3] = useState('')
    const [prizeFromNumber4, setPrizeFromNumber4] = useState('')
    const [prizeFromNumber5, setPrizeFromNumber5] = useState('')
    const [prizeFromNumber6, setPrizeFromNumber6] = useState('')
    const [prizeFromNumber7, setPrizeFromNumber7] = useState('')
    const [prizeFromNumber8, setPrizeFromNumber8] = useState('')



    const [prizeNumber1, setPrizeNumber1] = useState(2)
    const [prizeAmount1, setPrizeAmount1] = useState('')

    const [prizeNumber2, setPrizeNumber2] = useState(3)
    const [prizeAmount2, setPrizeAmount2] = useState('')

    const [prizeNumber3, setPrizeNumber3] = useState(4)
    const [prizeAmount3, setPrizeAmount3] = useState('')

    const [prizeNumber4, setPrizeNumber4] = useState(5)
    const [prizeAmount4, setPrizeAmount4] = useState('')

    const [prizeNumber5, setPrizeNumber5] = useState(6)
    const [prizeAmount5, setPrizeAmount5] = useState('')

    const [prizeNumber6, setPrizeNumber6] = useState(7)
    const [prizeAmount6, setPrizeAmount6] = useState('')

    const [prizeNumber7, setPrizeNumber7] = useState(8)
    const [prizeAmount7, setPrizeAmount7] = useState('')

    const [prizeNumber8, setPrizeNumber8] = useState(9)
    const [prizeAmount8, setPrizeAmount8] = useState('')

    const [profilePic, setProfilePic] = useState('')





    useEffect(() => {
        // getSinCategory();
        getExamDetails();
        getCategory();
        getKeyword();
        getCities();
        getExamList(currentPage);
    }, [])

    // const [Attribute, setAttribute] = useState('')


    //getKeyword Api Starts....
    const getKeyword = async () => {
        let result = await fetch(`${Environment.server_url}/keywords`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setKeywords(result.payload.lists.rows)
    }

    //get all Cities Api starts.....
    const getCities = async () => {
        let result = await fetch(`${Environment.server_url}/common/cities`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setCity(result.payload.cities)
    }

    //Get Category api starts.................
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


    //Get Sub-Category Api Starts..........
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

    //Sub-category filter according to category start...........
    const updateSubcategoryHandler = (id) => {
        setcategoryUUID(id)
        // setFilterCategory(id);
        getSubcategory(id);
    };

    const questionCheckHandler = (id) => {

    }

    // console.warn(categoryUUID,"catehoryUUISSS")
    //get all questions and search and pagination start...
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [totalPage, setTotalPage] = useState(0)
    const [items, setItems] = useState([]);

    const [totalcount, setTotalcount] = useState()
    const [totalLength, setTotalLength] = useState('')
    // const [question, setQuestion] = useState([]);
    const [examList, setExamList] = useState([]);

    // const [optionss, setOptionss] = useState('')

    const getExamList = async (page) => {
        let result = await fetch(`${Environment.server_url}/exams?type=EXAM&limit=${itemsPerPage}&page=${page}&categories=${categoryUUID}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        const list = result.payload.response.map((obj) => {
            return {
                ...obj,
                checked: tournamentExams.findIndex((item) => item.examUUID === obj.uuid) > -1
            };
        });
        setExamList(list);
        // console.warn(list,"from examlist")
        setTotalPage(Math.ceil(result.payload.count / itemsPerPage));
        setTotalcount(result.payload.count);
        setTotalLength(result.payload.students.rows.length);

    }
    // console.warn(tournamentExams,"outsid ethe tournamenrttttttttttttt")


    const handlePageChange = async (data) => {
        setCurrentPage(data.selected + 1);
        const questionFromServer = await getExamList(data.selected + 1);
        setItems(questionFromServer);
    }

    const paginationCount = () => {
        if (examList.length === 0) {
            return (currentPage === 1
                ? totalcount ? 1 : 0
                : itemsPerPage * (currentPage - 1) + 1
            ).toString()
                + ' to '
                + (
                    totalcount < (currentPage * itemsPerPage)
                        ? totalcount
                        : currentPage * itemsPerPage
                ).toString()
                + ' of '
                + (totalcount ? totalcount : 0).toString();;
        }

        return (currentPage === 1
            ? totalcount ? 1 : 0
            : itemsPerPage * (currentPage - 1) + 1
        ).toString()
            + ' to '
            + (
                totalcount < (currentPage * itemsPerPage)
                    ? totalcount
                    : currentPage * itemsPerPage
            ).toString()
            + ' of '
            + (totalcount ? totalcount : 0).toString();
    }

    const searchHandler = (event) => {
        handler(event);
    };

    const handler = useCallback(debounce((event) => searchtable(event.target.value), 500), []);

    const searchtable = async (key) => {
        let result = await fetch(`${Environment.server_url}/questions?q=${key}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            })
        result = await result.json();
        if (result) {
            setExamList(result.payload.list);
            setTotalPage(Math.ceil(result.payload.count / itemsPerPage));
            setTotalcount(result.payload.count);
            setTotalLength(result.payload.list.length);
        }
    }

    //Image Upload
    async function uploadProfile(file) {
        // try {
        const fileObj = file.target.files[0];
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
        setWebBanner(fileUrl);
        await fetch(signedUrl, {
            method: "PUT",
            // headers: {
            //     "Content-Type": "application/json",
            //     Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            // },
            body: fileObj,
        });
        // console.log("file url", fileUrl)
    }

    async function uploadProfileMobile(file) {
        // try {
        const fileObj = file.target.files[0];
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

        setphoneBanner(fileUrl);


        await fetch(signedUrl, {
            method: "PUT",
            // headers: {
            //     "Content-Type": "application/json",
            //     Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            // },
            body: fileObj,
        });
    }




    const [prizeAmount, setPrizeAmount] = useState([]);
    const getExamDetails = async () => {

        // console.log("data bundle1 ", dataBundle1)

        // console.warn(params)
        let result = await fetch(`${Environment.server_url}/tournaments/${params.uuid}`,
            {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
        result = await result.json();
        // setBanner(result.payload.response.banner)
        setWebBanner(result.payload.response.webBanner)
        setphoneBanner(result.payload.response.phoneBanner)
        setImgPreview(result.payload.response.webBanner)
        setImgPreviewId(result.payload.response.phoneBanner)
        setcategoryUUID(result.payload.response.categoryUUID)
        setTitle(result.payload.response.title)
        setStudentLimit(result.payload.response.studentLimit)
        setAllowPrimarySelection(result.payload.response.allowPrimarySelection)
        setAllowSecondarySelection(result.payload.response.allowSecondarySelection)
        setDescription(result.payload.response.description)
        setIsFeatured(result.payload.response.isFeatured)
        settotalWinningPrize(result.payload.response.winningPrice)
        setJoinDelay(result.payload.response.joinDelay)
        setMarksPerQuestion(result.payload.response.marksPerQuestion)
        setJoinFee(result.payload.response.joinFee)
        setExamKeyword(result.payload.response.tournamentKeywords)
        setExamCity(result.payload.response.tournamentCities.map((index) => index.citiesTournament))
        setQuestions(result.payload.response.questions)
        setIsFree(result.payload.response.isFree)
        setIsFreeCheckBoxCheck(result.payload.response.isFree)
        settimePerQuestion(result.payload.response.timePerQuestion)
        const Updatelist = result.payload.response.tournamentExamSchedule
            .map((obj) => {
                return {
                    examUUID: obj.examUUID, serialNo : obj.serialNo
                };
            });
        setExamQuestion(Updatelist)
        // setExamQuestion(result.payload.response.tournamentExamSchedule)
        // console.warn(result.payload.response.tournamentExamSchedule,"inside get the exm list by ud")
        setRankingFactor(result.payload.response.tournamentRankingFactor)

        setPrizeAmount0(result.payload.response.tournamentPrize[0].amount)
        setPrizeAmount1(result.payload.response.tournamentPrize[1].amount)
        setPrizeAmount2(result.payload.response.tournamentPrize[2].amount)
        setPrizeAmount3(result.payload.response.tournamentPrize[3].amount)
        setPrizeAmount4(result.payload.response.tournamentPrize[4].amount)
        setPrizeAmount5(result.payload.response.tournamentPrize[5].amount)
        setPrizeAmount6(result.payload.response.tournamentPrize[6].amount)
        setPrizeAmount7(result.payload.response.tournamentPrize[7].amount)
        setPrizeAmount8(result.payload.response.tournamentPrize[8].amount)

        setPrizeAmount(result.payload.response.priceRatio.slice(9))
    }

    // console.warn(timePerQuestion,"joindelay")
    useEffect(() => {
        if (prizeAmount.length) {

            Array.from(document.getElementsByClassName('rankList')).map((currObj, index) => {
                currObj.getElementsByTagName("input")[0].value = prizeAmount[index].fromValue
                currObj.getElementsByTagName("input")[1].value = prizeAmount[index].toValue
                currObj.getElementsByTagName("input")[2].value = prizeAmount[index].amount
            })

        }
    }, [prizeAmount])

    useEffect(() => {
        if (rankingFactor.length) {
            Array.from(document.getElementsByClassName('examList')).map((currObj, index) => {
                currObj.getElementsByTagName("select")[0].value = rankingFactor[index].type
                currObj.getElementsByTagName("input")[0].value = rankingFactor[index].title ? rankingFactor[index].title : ''
                currObj.getElementsByTagName("input")[1].value = rankingFactor[index].time
                currObj.getElementsByTagName("input")[2].value = rankingFactor[index].points
                currObj.getElementsByTagName("input")[3].value = rankingFactor[index].coins
            })
        }
    }, [rankingFactor])


    // Edit Exam by UUID...
    const updateExam = async () => {
        const rank = [];
        rank.push({
            "toValue": prizeNumber0,
            "fromValue": prizeFromNumber0,
            "amount": prizeAmount0,
        })
        rank.push({
            "toValue": prizeNumber1,
            "fromValue": prizeFromNumber1,
            "amount": prizeAmount1,
        })
        rank.push({
            "toValue": prizeNumber2,
            "fromValue": prizeFromNumber2,
            "amount": prizeAmount2,
        })
        rank.push({
            "toValue": prizeNumber3,
            "fromValue": prizeFromNumber3,
            "amount": prizeAmount3,
        })
        rank.push({
            "toValue": prizeNumber4,
            "fromValue": prizeFromNumber4,
            "amount": prizeAmount4,
        })
        rank.push({
            "toValue": prizeNumber5,
            "fromValue": prizeFromNumber5,
            "amount": prizeAmount5,
        })
        rank.push({
            "toValue": prizeNumber6,
            "fromValue": prizeFromNumber6,
            "amount": prizeAmount6,
        })
        rank.push({
            "toValue": prizeNumber7,
            "fromValue": prizeFromNumber7,
            "amount": prizeAmount7,

        })
        rank.push({
            "toValue": prizeNumber8,
            "fromValue": prizeFromNumber8,
            "amount": prizeAmount8,

        })

        const rankList = [];
        const parsedValue = []
        Array.from(document.getElementsByClassName('rankList')).map(currObj => {
            const localArr = [];
            Array.from(currObj.getElementsByTagName("input")).map((val) => {
                localArr.push(val.value);
            })
            rankList.push(localArr);
        })
        rankList.map((val, index) => {
            parsedValue.push({ toValue: parseInt(val[0]), fromValue: val[1], amount: parseInt(val[2]) })
        })
        const dataBundle = [...rank]
        parsedValue.map(val => {
            dataBundle.push(val)
        })


        const examList = [];
        const parsedValue1 = []
        Array.from(document.getElementsByClassName('examList')).map(currObj => {
            const localArr = [];
            Array.from(currObj.getElementsByTagName("select")).map((val) => {
                localArr.push(val.value);
            })
            Array.from(currObj.getElementsByTagName("input")).map((val) => {
                localArr.push(val.value);
            })

            examList.push(localArr);
        })
        examList.map((val, index) => {
            parsedValue1.push({ type: val[0], title: val[1], time: val[2], point: val[3], coins: val[4] })
        })
        const dataBundle1 = []
        parsedValue1.map(val => {
            dataBundle1.push(val)
        })

        // setStartExamDisable(true)s
        setShowLoaderShow(true)
        setTimeout(() => {
            setStartExamDisable(false);
            setShowLoaderShow(false);
        }, 3000);

        // const slNumber = tournamentExams.map((obj,key)=>({...obj, serialNo:key}));

        let result = await fetch(`${Environment.server_url}/tournaments/${params.uuid}`, {
            method: "PUT",
            body: JSON.stringify({ categoryUUID, webBanner, phoneBanner, tournamentCities, tournamentKeywords, tournamentPrize: dataBundle, tournamentExams: tournamentExams, allowPrimarySelection, allowSecondarySelection, description, isFeatured, isFree, joinDelay, joinFee, marksPerQuestion, timePerQuestion, studentLimit, title, winningPrice, tournamentRankingFactor: dataBundle1 }),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        }).then(catdata => {
            if (catdata.status === 200) {
                setShowSuccess(true);
                setTimeout(() => {
                    navigate("/Tournament");
                }, 3000);
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

    const [indexes, setIndexes] = React.useState([]);
    const [counter, setCounter] = React.useState(0);
    const { register, handleSubmit } = useForm();

    const onSubmit = data => {
    };

    const addRank = () => {
        setPrizeAmount(prevIndexes => [...prevIndexes, counter]);
        setCounter(prevCounter => prevCounter + 1);
    };

    const removeRank = index => () => {
        setPrizeAmount(prevIndexes => [...prevIndexes.filter(item => item !== index)]);
        setCounter(prevCounter => prevCounter - 1);
    };


    //add or remove ranking Factor..
    const [indexes1, setIndexes1] = React.useState([]);
    const [counter1, setCounter1] = React.useState(0);


    const addExam = () => {
        setRankingFactor(prevIndexes => [...prevIndexes, counter1]);
        setCounter1(prevCounter => prevCounter + 1);
    };

    const removeExam = index => () => {
        setRankingFactor(prevIndexes => [...prevIndexes.filter(item => item !== index)]);
        setCounter1(prevCounter => prevCounter - 1);
    };

    // const handlecheck = (e, value) => {
    //     if (e.target.checked) {
    //         setExamQuestion([...ExamQuestion, { questionUUID: e.target.value }]);
    //     } else {
    //         setExamQuestion(ExamQuestion.filter((id) => id !== e.target.value));
    //         const updatedArray = ExamQuestion.splice(ExamQuestion, 1)
    //         setExamQuestion(updatedArray)
    //     }
    // };


    // }
    function handleDisabledCheck() {
        if (joinFee > 0) {
            document.getElementById("is_free").style.pointerEvents = "none"
        } else {
            document.getElementById("is_free").style.pointerEvents = "auto"
        }
    }
    useEffect(() => {
        handleDisabledCheck();
    }, [joinFee])


    if (show === true) {
        setTimeout(() => setShow(false), 5000);
    }
    if (showSuccess === true) {
        setTimeout(() => setShowSuccess(false), 5000);
    }

    // console.warn(tournamentExams,"outside the onchange event")
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
                                        <h4 className="mb-sm-0">Edit Tournament</h4>
                                        <div className="page-title-right">
                                            <ol className="breadcrumb m-0">
                                                <Link to="/Exam" className="breadcrumb-item">Tournament</Link>
                                                <li className="breadcrumb-item active">Edit Tournament</li>
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
                                                        <div className="col-12 col-sm-6 imgageupload">
                                                            <p><b>Web Banner</b></p>
                                                            <div className="container-exam">
                                                                {error && <p className="errorMsg">File not supported</p>}
                                                                <div
                                                                    className="imgPreview"
                                                                    style={{
                                                                        background: imgPreview ? `url("${imgPreview}") no-repeat center/cover`
                                                                            : "#c2c7d0"
                                                                    }}
                                                                >
                                                                    {!imgPreview && (
                                                                        <>
                                                                            {/* <p>Add Profile Picture</p> */}
                                                                            <label htmlFor="fileUpload" className="customFileUpload">
                                                                                Add Banner
                                                                            </label>
                                                                            <input type="file"
                                                                                id="fileUpload"
                                                                                onChange={(e) => {
                                                                                    handleImageChange(e);
                                                                                    uploadProfile(e);
                                                                                }}
                                                                            />
                                                                        </>
                                                                    )}
                                                                </div>
                                                                {imgPreview && (
                                                                    <button className="btn-exam" onClick={() => setImgPreview(null)}>Remove</button>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="col-12 col-sm-6 imgageupload">
                                                            <p><b>Phone Banner</b></p>
                                                            <div className="container-exam">
                                                                {error1 && <p className="errorMsg">File not supported</p>}
                                                                <div
                                                                    className="imgPreview"
                                                                    style={{
                                                                        background: imgPreviewId ? `url("${imgPreviewId}") no-repeat center/cover`
                                                                            : "#c2c7d0"
                                                                    }}
                                                                >
                                                                    {!imgPreviewId && (
                                                                        <>
                                                                            {/* <p>ID Proof</p> */}
                                                                            <label htmlFor="fileUpload1" className="customFileUpload">
                                                                                Add banner
                                                                            </label>
                                                                            <input type="file"
                                                                                id="fileUpload1"
                                                                                onChange={(e) => {
                                                                                    handleImageChangeId(e);
                                                                                    uploadProfileMobile(e);
                                                                                }}
                                                                            />
                                                                        </>
                                                                    )}
                                                                </div>
                                                                {imgPreviewId && (
                                                                    <button className="btn-exam" onClick={() => setImgPreviewId(null)}>Remove</button>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="form-row mb-4">
                                                        <div className="col-sm-4">
                                                            <p><b>Category</b></p>
                                                            <select className="form-select form-select mb-2" aria-label="Default select example" value={categoryUUID} onClick={getExamList} onChange={(e) => { updateSubcategoryHandler(e.target.value) }}>
                                                                {
                                                                    getcategory.map((item) =>
                                                                        <option value={item.uuid}>{item.label}</option>
                                                                    )
                                                                }
                                                            </select>
                                                        </div>
                                                        <div className="col-sm-4">
                                                            <p><b>Title</b><span className="required text-danger">*</span></p>
                                                            <input type="name" className="form-control" id="exampleFormControlInput1" placeholder="Exam title" onChange={(e) => setTitle(e.target.value)} value={title}></input>
                                                        </div>
                                                        <div className="col-sm-4">
                                                            <p><b>Student limit</b><span className="required text-danger">*</span></p>
                                                            <input type="name" className="form-control" id="exampleFormControlInput1" placeholder="Student limit" onChange={(e) => { setStudentLimit(e.target.valueAsNumber || e.target.value) }} value={studentLimit}></input>
                                                        </div>

                                                    </div>

                                                    <div className="form-row mb-4">
                                                        <div className="col-12 col-sm-4">
                                                            <p><b>Is free?</b></p>
                                                            <div className="input-group">
                                                                <div className="input-group-prepend">
                                                                    <div className="input-group-text">
                                                                        <input name="is_free" type="checkbox" id="is_free" checked={checked1} defaultValue={0}
                                                                            onChange={(e) => {
                                                                                setIsFree(e.target.checked)
                                                                                if (checked1) {
                                                                                    setText1("")
                                                                                }
                                                                                setChecked1(!checked1)
                                                                            }
                                                                            }
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <input id="joining_fees" placeholder="Joining fees" value={joinFee} className="form-control" name="joining_fees" type="text" disabled={checked1} onChange={(e) => { setJoinFee(e.target.valueAsNumber || e.target.value) }} />
                                                            </div>
                                                        </div>
                                                        <div className="col-12 col-sm-4 column">
                                                            <p><b>Marks per question</b><span className="required text-danger">*</span></p>
                                                            <input type="number" placeholder="Marks per question" className="form-control" id="exampleFormControlInput1" onChange={(e) => setMarksPerQuestion(e.target.valueAsNumber || e.target.value)} value={marksPerQuestion}></input>
                                                        </div>

                                                        <div className="col-12 col-sm-4 column">
                                                            <p><b>Per question time-limit in seconds?</b></p>
                                                            <div className="input-group">
                                                                <div className="input-group-prepend">
                                                                    <div className="input-group-text">
                                                                        <input name="marksper_question" type="checkbox" id="marksper_question" checked={checked}
                                                                            onChange={(e) => {
                                                                                setPerQuestionLimitCheck(e.target.checked)
                                                                                if (checked) {
                                                                                    setText('')
                                                                                }
                                                                                setChecked(!checked)
                                                                            }
                                                                            } />
                                                                    </div>
                                                                </div>
                                                                <input id="joining_fees" placeholder="Time limit" className="form-control" name="joining_fees" type="text" disabled={!checked} value={timePerQuestion} onChange={(e) => { settimePerQuestion(e.target.valueAsNumber || e.target.value) }} />
                                                            </div>
                                                        </div>
                                                    </div>


                                                    <div className="form-row mb-4">
                                                        <div className="col-12 col-sm-4">
                                                            <div className="form-group">
                                                                <div className="controls">
                                                                    <p><b>Total winning price</b><span className="required text-danger">*</span></p>
                                                                    <input placeholder="Total winning price" min="0" className="form-control valid" name="total_winning_price" type="number" id="total_winning_price" aria-invalid="false" value={winningPrice} onChange={(e) => { settotalWinningPrize(e.target.valueAsNumber || e.target.value) }} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12 col-sm-4">
                                                            <p><b>Is feature exam?</b><span className="required text-danger">*</span></p>
                                                            <select className="form-select form-select mb-2" aria-label="Default select example"
                                                                onChange={(e) => { setIsFeatured(e.target.value) }} value={isFeatured}
                                                            >
                                                                <option>Select</option>
                                                                <option value={true}>Yes</option>
                                                                <option value={false}>No</option>
                                                            </select>
                                                        </div>

                                                        <div className="col-12 col-sm-4 column">
                                                            <p><b>Allow to select primary?</b><span className="required text-danger">*</span></p>
                                                            <select className="form-select form-select mb-2" aria-label="Default select example" onChange={(e) => { setAllowPrimarySelection(e.target.value === "true" ? true : false) }} value={allowPrimarySelection}>
                                                                <option>Select</option>
                                                                <option value={true}>Yes</option>
                                                                <option value={false}>No</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="form-row mb-4">
                                                        {
                                                            allowPrimarySelection &&
                                                            <div className="col-12 col-sm-4 column">
                                                                <p><b>Allow to select secondary?</b><span className="required text-danger">*</span></p>
                                                                <select className="form-select form-select mb-2" aria-label="Default select example" onChange={(e) => { setAllowSecondarySelection(e.target.value === "true" ?true : false) }} value={allowSecondarySelection}>
                                                                    <option>Select</option>
                                                                    <option value={true}>Yes</option>
                                                                    <option value={false}>No</option>
                                                                </select>
                                                            </div>
                                                        }
                                                        <div className="col-12 col-sm-4">
                                                            <div className="form-group">
                                                                <div className="controls">
                                                                    <p><b>Join delay</b></p>
                                                                    <input placeholder="Join delay" className="form-control valid" name="join_delay" type="number" id="join_delay" aria-invalid="false" onChange={(e) => { setJoinDelay(e.target.valueAsNumber || e.target.value) }} value={joinDelay} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12 col-sm-4">
                                                            <p><b>City</b><span className="required text-danger">*</span></p>
                                                            <Multiselect options={city} selectedValues={tournamentCities} onSelect={setExamCity} emptyRecordMsg={"No City Found"} displayValue="city" class="form-control" id="exampleFormControlInput1" >
                                                            </Multiselect>
                                                        </div>
                                                    </div>

                                                    <div className="form-row mb-4">
                                                        <div className="col-sm">
                                                            <p><b>Keywords</b><span className="required text-danger">*</span></p>
                                                            <Multiselect options={keywords} selectedValues={tournamentKeywords} onSelect={setExamKeyword} displayValue="attribute" class="form-control" id="exampleFormControlInput1"></Multiselect>
                                                        </div>
                                                    </div>

                                                    <div className="form-row mb-4">
                                                        <p><b>Description</b></p>
                                                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="4" onChange={(e) => setDescription(e.target.value)} value={description}></textarea>
                                                    </div>
                                                    <div className="mb-4">
                                                        <p><b>Exams</b></p>
                                                        <div className="option-section">
                                                            {/* <div className="form-row mb-4">
                                                                <div className="col-sm">
                                                                    <p><b>Category</b></p>
                                                                    <select className="form-select form-select mb-2" aria-label="Default select example" onClick={getQuestionlist} onChange={(e) => { updateSubcategoryHandler(e.target.value) }}>
                                                                        <option value={""}>Select category</option>
                                                                        {
                                                                            getcategory.map((item) =>
                                                                                <>
                                                                                    <option value={item.uuid}>{item.label}</option>
                                                                                </>
                                                                            )
                                                                        }
                                                                    </select>
                                                                </div>
                                                                <div className="col-sm">
                                                                    <p><b>Sub-Category</b></p>
                                                                    <select className="form-select form-select mb-2" aria-label="Default select example" onClick={getExamList} onChange={(e) => { setFilterSubCategory(e.target.value) }}>
                                                                        <option value={""}>Select sub-category</option>
                                                                        {
                                                                            getsubcategory.map((item, index) =>
                                                                                <>
                                                                                    <option value={item.uuid}>{item.label}</option>
                                                                                </>
                                                                            )}

                                                                    </select>
                                                                </div>

                                                                <div className="col-sm">
                                                                    <p><b>Start date of Creation</b></p>
                                                                    <input type="datetime-local" name="end_time" id="end_time" className="form-control valid" aria-invalid="false" onClick={getExamList} onChange={(e) => { setFilteStartDate(e.target.value) }} />
                                                                </div>

                                                                <div className="col-sm">
                                                                    <p><b>End date of Creation</b></p>
                                                                    <input type="datetime-local" name="end_time" id="end_time" className="form-control valid" aria-invalid="false" onClick={getExamList} onChange={(e) => { setFilteEndDate(e.target.value) }} />
                                                                </div>
                                                                <div className="col-sm">
                                                                    <div className="form-group">
                                                                        <div className="controls">
                                                                            <p><b>Usage count</b></p>
                                                                            <select className="form-select form-select mb-2" aria-label="Default select example" onClick={getExamList} onChange={(e) => { setFilteUsageCount(e.target.value) }}>
                                                                                <option value={""}>Select</option>
                                                                                <option value={1}>1</option>
                                                                                <option value={2}>2</option>
                                                                                <option value={3}>3</option>
                                                                                <option value={4}>4</option>
                                                                                <option value={5}>5</option>
                                                                                <option value={6}>6</option>
                                                                                <option value={7}>7</option>
                                                                                <option value={8}>8</option>
                                                                                <option value={9}>9</option>
                                                                                <option value={10}>10</option>
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div> */}

                                                            <div className="table-responsive mt-3">
                                                                <div class="col">
                                                                    <div class="col-sm">
                                                                        <div class="search-box me-2 mb-2 d-inline-block">
                                                                            <div class="position-relative">
                                                                                <label for="search-bar-0" class="search-label"><span id="search-bar-0-label" class="sr-only">Search this table</span><input id="search-bar-0" type="text" aria-labelledby="search-bar-0-label" class="form-control" placeholder="Search" onChange={searchHandler} /></label>
                                                                                <i class="bx bx-search-alt search-icon">
                                                                                </i>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <table className="table table-centered datatable dt-responsive nowrap" style={{ borderCollapse: 'collapse', borderSpacing: 0, width: '100%' }}>
                                                                    <thead className="thead-light">
                                                                        <tr>
                                                                            {/* <th style={{ width: 20 }}>
                                                                                <div className="form-check">
                                                                                    <input type="checkbox" className="form-check-input" id="customercheck" />
                                                                                    <label className="form-check-label mb-0" htmlFor="customercheck">&nbsp;</label>
                                                                                </div>
                                                                            </th> */}
                                                                            <th>Sl.no</th>
                                                                            <th>Exam id</th>
                                                                            <th>Exam name</th>
                                                                            <th>Category</th>
                                                                            {/* <th>Start time</th>
                                                                            <th>End time</th> */}
                                                                            <th>Status</th>
                                                                            {/* <th>Is featured</th> */}
                                                                            <th>Selected</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {
                                                                            examList.map((item, index) =>
                                                                                <tr key={index}>
                                                                                    <td>{index + 1}</td>
                                                                                    <td>{item.identifier}</td>
                                                                                    <td>{item.title}</td>
                                                                                    <td>{item.categoryName}</td>
                                                                                    {/* <td>{item.startTime ? <span>{getDateTime(item.startTime)}</span> : <span>-----</span>}</td>
                                                                                            <td>{item.endTime ? <span>{getDateTime(item.endTime)}</span> : <span>-----</span>}</td> */}
                                                                                    {/* <td><span className="badge badge-warning">{item.totalQuestion}</span></td> */}
                                                                                    <td>{item.status}</td>
                                                                                    <td>
                                                                                        <div className="form-check form-switch">
                                                                                            <input className="form-check-input"
                                                                                                type={"checkbox"}
                                                                                                onChange={(e) => {
                                                                                                    const ExamList = [...examList];
                                                                                                    ExamList[index].checked = e.target.checked;
                                                                                                    setExamList(ExamList);
                                                                                                    if (e.target.checked) {
                                                                                                        tournamentExams.push({ examUUID: item.uuid, serialNo: index + 1 })
                                                                                                    } else {
                                                                                                        const idx = tournamentExams.indexOf((obj) => obj.examUUID === item.uuid) > -1;
                                                                                                        tournamentExams.splice(idx, 1);
                                                                                                    }
                                                                                                    // console.warn(tournamentExams,"inside the onchange event")
                                                                                                    // tournamentExams.push({ examUUID: item.uuid})
                                                                                                    // setExamQuestion(tournamentExams);
                                                                                                }}
                                                                                                checked={item.checked} />
                                                                                        </div>
                                                                                    </td>
                                                                                </tr>
                                                                            )
                                                                        }

                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-sm-10">
                                                                    <div className="dataTables_info pr-5" id="DataTables_Table_0_info" role="status" aria-live="polite">Showing {paginationCount()} entries
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-2">
                                                                    <ReactPaginate
                                                                        previousLabel="Prev"
                                                                        nextLabel="Next"
                                                                        pageClassName="page-item"
                                                                        pageLinkClassName="page-link"
                                                                        previousClassName="page-item"
                                                                        previousLinkClassName="page-link"
                                                                        nextClassName="page-item"
                                                                        nextLinkClassName="page-link"
                                                                        breakLabel="..."
                                                                        breakClassName="page-item"
                                                                        breakLinkClassName="page-link"
                                                                        pageCount={totalPage}
                                                                        marginPagesDisplayed={1}
                                                                        pageRangeDisplayed={1}
                                                                        onPageChange={handlePageChange}
                                                                        containerClassName="pagination float-right"
                                                                        activeClassName="active"
                                                                    />
                                                                </div>
                                                                {/* <div className="col-sm-2">
                                                                    <div className="dataTables_paginate paging_simple_numbers" id="DataTables_Table_0_paginate">
                                                                        <ul className="pagination pagination-rounded">
                                                                            <li className="paginate_button page-item previous disabled" id="DataTables_Table_0_previous">
                                                                                <a aria-controls="DataTables_Table_0" data-dt-idx="0" tabIndex="0" className="page-link">
                                                                                    <i className="mdi mdi-chevron-left" />
                                                                                </a>
                                                                            </li>
                                                                            <li className="paginate_button page-item active">
                                                                                <a aria-controls="DataTables_Table_0" data-dt-idx="1" tabIndex="0" className="page-link">1</a>
                                                                            </li>
                                                                            <li className="paginate_button page-item ">
                                                                                <a aria-controls="DataTables_Table_0" data-dt-idx="2" tabIndex="0" className="page-link">2</a>
                                                                            </li>
                                                                            <li className="paginate_button page-item next" id="DataTables_Table_0_next">
                                                                                <a aria-controls="DataTables_Table_0" data-dt-idx="3" tabIndex="0" className="page-link"><i className="mdi mdi-chevron-right" /></a>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </div> */}
                                                            </div>

                                                        </div>
                                                    </div>

                                                    {/* <div className="mb-4">
                                                        <p><b>Winning Price</b></p>
                                                        {inputList.map((x, i) => {
                                                            return (
                                                                <div className="form-group">
                                                                    <div className="table-responsive controls">
                                                                        <table className="table table-centered datatable dt-responsive nowrap" style={{ borderCollapse: 'collapse', borderSpacing: 0, width: '100%' }}>
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>Price</th>
                                                                                    <th>Action</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                <tr className="exam-ranking-factor-tr-3">
                                                                                    <td><input type="number" name="exam_ranking_factor_point[]" className="form-control" placeholder="Price" /></td>
                                                                                    <td>
                                                                                        {inputList.length !== 1 && <button type="button" class="btn btn-danger btn-sm"
                                                                                            onClick={() => handleRemoveClick(i)}>x</button>}
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                    {inputList.length - 1 === i && <button type="button" className="btn btn-warning" onClick={handleAddClick}>Add Winning Price</button>}
                                                                </div>
                                                            );
                                                        })}
                                                    </div> */}

                                                    <div className="mb-4">
                                                        <p><b>Winning Price</b></p>
                                                        <div className="form-group">
                                                            <div className="table-responsive controls">
                                                                <table className="table table-centered datatable dt-responsive nowrap" style={{ borderCollapse: 'collapse', borderSpacing: 0, width: '100%' }}>
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Rank</th>
                                                                            <th>Price</th>

                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr className="exam-ranking-factor-tr-3">
                                                                            <td><input type="number" className="form-control" disabled onChange={(e) => { setPrizeNumber0(parseInt(e.target.value)) }} value={prizeNumber0}></input></td>
                                                                            <td><input type="number" name="exam_ranking_factor_point[]" className="form-control" placeholder="Price" onChange={(e) => { setPrizeAmount0(parseInt(e.target.value)) }} value={prizeAmount0} /></td>
                                                                        </tr>
                                                                        <tr className="exam-ranking-factor-tr-3">
                                                                            <td><input type="number" className="form-control" disabled onChange={(e) => { setPrizeNumber1(parseInt(e.target.value)) }} value={prizeNumber1}></input></td>
                                                                            <td><input type="number" name="exam_ranking_factor_point[]" className="form-control" placeholder="Price" onChange={(e) => { setPrizeAmount1(parseInt(e.target.value)) }} value={prizeAmount1} /></td>
                                                                        </tr>
                                                                        <tr className="exam-ranking-factor-tr-3">
                                                                            <td><input type="number" className="form-control" disabled onChange={(e) => { setPrizeNumber2(parseInt(e.target.value)) }} value={prizeNumber2}></input></td>
                                                                            <td><input type="number" name="exam_ranking_factor_point[]" className="form-control" placeholder="Price" onChange={(e) => { setPrizeAmount2(parseInt(e.target.value)) }} value={prizeAmount2} /></td>
                                                                        </tr>
                                                                        <tr className="exam-ranking-factor-tr-3">
                                                                            <td><input type="number" className="form-control" disabled onChange={(e) => { setPrizeNumber3(parseInt(e.target.value)) }} value={prizeNumber3}></input></td>
                                                                            <td><input type="number" name="exam_ranking_factor_point[]" className="form-control" placeholder="Price" onChange={(e) => { setPrizeAmount3(parseInt(e.target.value)) }} value={prizeAmount3} /></td>
                                                                        </tr>
                                                                        <tr className="exam-ranking-factor-tr-3">
                                                                            <td><input type="number" className="form-control" disabled onChange={(e) => { setPrizeNumber4(parseInt(e.target.value)) }} value={prizeNumber4}></input></td>
                                                                            <td><input type="number" name="exam_ranking_factor_point[]" className="form-control" placeholder="Price" onChange={(e) => { setPrizeAmount4(parseInt(e.target.value)) }} value={prizeAmount4} /></td>
                                                                        </tr>
                                                                        <tr className="exam-ranking-factor-tr-3">
                                                                            <td><input type="number" className="form-control" disabled onChange={(e) => { setPrizeNumber5(parseInt(e.target.value)) }} value={prizeNumber5}></input></td>
                                                                            <td><input type="number" name="exam_ranking_factor_point[]" className="form-control" placeholder="Price" onChange={(e) => { setPrizeAmount5(parseInt(e.target.value)) }} value={prizeAmount5} /></td></tr>
                                                                        <tr className="exam-ranking-factor-tr-3">
                                                                            <td><input type="number" className="form-control" disabled onChange={(e) => { setPrizeNumber6(parseInt(e.target.value)) }} value={prizeNumber6}></input></td>
                                                                            <td><input type="number" name="exam_ranking_factor_point[]" className="form-control" placeholder="Price" onChange={(e) => { setPrizeAmount6(parseInt(e.target.value)) }} value={prizeAmount6} /></td></tr>
                                                                        <tr className="exam-ranking-factor-tr-3">
                                                                            <td><input type="number" className="form-control" disabled onChange={(e) => { setPrizeNumber7(parseInt(e.target.value)) }} value={prizeNumber7}></input></td>
                                                                            <td><input type="number" name="exam_ranking_factor_point[]" className="form-control" placeholder="Price" onChange={(e) => { setPrizeAmount7(parseInt(e.target.value)) }} value={prizeAmount7} /></td></tr>
                                                                        <tr className="exam-ranking-factor-tr-3">
                                                                            <td><input type="number" className="form-control" disabled onChange={(e) => { setPrizeNumber8(parseInt(e.target.value)) }} value={prizeNumber8}></input></td>
                                                                            <td><input type="number" name="exam_ranking_factor_point[]" className="form-control" placeholder="Price" onChange={(e) => { setPrizeAmount8(parseInt(e.target.value)) }} value={prizeAmount8} /></td> </tr>
                                                                    </tbody>

                                                                </table>
                                                            </div>
                                                        </div>
                                                        <form onSubmit={handleSubmit(onSubmit)}>
                                                            {prizeAmount.map((index) => {
                                                                // onChange={(e) =>  setPrizeAmount(...prizeAmount,prizeAmount[num].fromValue:parseInt(e.target.value)) } 
                                                                // console.log("***********",prizeAmount[num].fromValue)
                                                                const fieldName = `friends[${index}]`;
                                                                return (
                                                                    <fieldset name={fieldName} key={fieldName} className={"rankList"}>
                                                                        <div className="form-row mt-2">
                                                                            <div className="col-sm-3">
                                                                                <p><b>From</b></p>
                                                                                <input type="number" className="form-control" />
                                                                            </div>
                                                                            <div className="col-sm-3">
                                                                                <p><b>To</b></p>
                                                                                <input type="number" className="form-control" />
                                                                            </div>
                                                                            <div className="col-sm-5">
                                                                                <p><b>Amount</b></p>
                                                                                <input type="number" className="form-control" />
                                                                            </div>
                                                                            <div className="col-sm-1">
                                                                                <p><b>Action</b></p>
                                                                                <button type="button" className="btn btn-danger btn-sm mt-1 ml-2" onClick={removeRank(index)}>
                                                                                    X
                                                                                </button>
                                                                            </div>

                                                                        </div>
                                                                    </fieldset>
                                                                );
                                                            })}

                                                            <button type="button" className="btn btn-sm btn-warning mt-2" onClick={addRank}>
                                                                Add more
                                                            </button>
                                                        </form>
                                                    </div>

                                                    <form onSubmit={handleSubmit(onSubmit)}>
                                                        {rankingFactor.map((index) => {
                                                            const fieldName = `friends[${index}]`;
                                                            return (
                                                                <fieldset name={fieldName} key={fieldName} className={"examList"}>
                                                                    <div className="form-row mt-2">
                                                                        <div className="col-sm-2">
                                                                            <p><b>Type</b></p>
                                                                            <select className="form-select form-control" aria-label="Default select example" >
                                                                                <option value={"ON_CORRECT_ANSWER"}>On answer correct</option>
                                                                                <option value={"ON_INCORRECT_ANSWER"}>On answer In-correct</option>
                                                                                <option value={"TIME_LIMIT"}>Time limit</option>
                                                                                {/* <option value={"SECONDARY"}>Primary</option>
                                                                                <option value={"PRIMARY"}>Secondary</option> */}
                                                                                {
                                                                                    allowPrimarySelection && <option value={"PRIMARY"}>Primary</option>
                                                                                }
                                                                                {

                                                                                    allowSecondarySelection && <option value={"SECONDARY"}>Secondary</option>
                                                                                }
                                                                            </select>
                                                                        </div>
                                                                        <div className="col-sm-2">
                                                                            <p><b>title</b></p>
                                                                            <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Title" ></input>
                                                                        </div>
                                                                        <div className="col-sm-2">
                                                                            <p><b>time</b></p>
                                                                            <input placeholder="Time(i.e 10)" min="0" className="form-control valid" name="total_winning_price" type="number" id="total_winning_price" aria-invalid="false" />
                                                                        </div>
                                                                        <div className="col-sm-2">
                                                                            <p><b>points</b></p>
                                                                            <input placeholder="Point" min="0" className="form-control valid" name="point" type="number" id="total_winning_price" aria-invalid="false" />
                                                                        </div>
                                                                        <div className="col-sm-2">
                                                                            <p><b>Rewards</b></p>
                                                                            <input placeholder="in paisa" min="0" className="form-control valid" name="point" type="number" id="total_winning_price" aria-invalid="false" />
                                                                        </div>
                                                                        <div className="col-sm-2">
                                                                            <p><b>Action</b></p>
                                                                            <button type="button" className="btn btn-danger btn-sm" onClick={removeExam(index)}>
                                                                                X
                                                                            </button>
                                                                        </div>

                                                                    </div>
                                                                </fieldset>
                                                            );
                                                        })}

                                                        <button type="button" className="btn btn-dark mt-2" onClick={addExam}>
                                                            Add Ranking Factor
                                                        </button>
                                                    </form>
                                                    <div className="button mt-3">
                                                        <button type="button" onClick={updateExam} class="btn btn-success savebtn" disabled={startExamDisable}>
                                                            {showLoaderShow ?
                                                                (
                                                                    <span className="spinner-border spinner-border-sm spinnerLoader mr-1" style={{ width: "0.9rem", height: "0.9rem" }} role="status" aria-hidden="true"></span>
                                                                )
                                                                :
                                                                (
                                                                    ""
                                                                )
                                                            }
                                                            Save
                                                        </button>
                                                        <Link to="/Exam"><button type="button" class="btn">Cancel</button></Link>
                                                    </div>
                                                </form>
                                            </div>
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

export default Tournamentedit