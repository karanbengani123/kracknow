import React, { useCallback, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import SideNav from "./SideNav";
import Footer from "./Footer";
import Header from "./Header";
import '../CssFile/AddExam.css';
import '../CssFile/Student.css';
import { Multiselect } from 'multiselect-react-dropdown';
import Popup from 'reactjs-popup';
import "../CssFile/Popup.css";
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import ReactPaginate from "react-paginate";
import { debounce } from 'lodash';
import { useStateManager } from "react-select";
import Environment from "./Environment";


const Quizadd = () => {
    const [imgPreview, setImgPreview] = useState(null);
    const [error, setError] = useState(false);




    // const [inputList, setInputList] = useState([{ toValue: '1', fromValue: '', price: '1' }]);

    // handle input change
    // const handleInputChange = (e, index) => {
    //     const { name, value } = e.target;
    //     const list = [...inputList];
    //     list[index][name] = value;
    //     setInputList(list);

    // };

    // handle click event of the Remove button
    // const handleRemoveClick = index => {
    //     const list = [...inputList];
    //     list.splice(index, 1);
    //     setInputList(list);
    //     alert("Wants To Remove");
    // };

    // handle click event of the Add button
    // const handleAddClick = (e) => {
    //     e.preventDefault();
    //     // setInputList([...inputList,{}]);
    //     setInputList([...inputList, { toValue: (toValue), fromValue: '', price: (price) }]);
    //     setExamPrice(inputList)

    // };
    // console.warn(inputList, "inputLiist")

    const [banner, setBanner] = useState();

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
            console.log("file not supported");
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
            console.log("file not supported");

        }
    };



    // const [formValues, setFormValues] = useState([{ type: 'ON_CORRECT_ANSWER', title: '1', time: '1', point: '1' }])
    // let handleChange = (i, e) => {
    //     let newFormValues = [...formValues];
    //     newFormValues[i][e.target.name] = e.target.value;
    //     setFormValues(newFormValues);
    // }

    // let addFormFields = () => {
    //     setFormValues([...formValues, { type: (questionType), title: (titile), time: (time), point: (points) }])
    //     setExamRankingFactor(formValues)
    // }

    // console.warn(ExamRankingFactor, "formvalues")

    // let removeFormFields = (i) => {
    //     let newFormValues = [...formValues];
    //     newFormValues.splice(i, 1);
    //     setFormValues(newFormValues);
    //     alert("Wants To Delete");
    // }
    // let handleSubmit = (event) => {
    //     event.preventDefault();
    //     alert(JSON.stringify(formValues));
    // }

    const navigate = useNavigate()
    const [show, setShow] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("")
    const [startExamDisable, setStartExamDisable] = useState(false);
    const [showLoaderShow, setShowLoaderShow] = useState(false);

    const [title, setTitle] = useState('');
    const [studentLimit, setStudentLimit] = useState('')
    // const [starttime, setStartTime] = useState('')
    // const [endtime, setEndTime] = useState('')
    const [isFree, setIsFree] = useState(false)
    const [joinFee, setJoinFee] = useState(0)
    const [marksPerQuestion, setMarksPerQuestion] = useState('')
    const [timePerQuestion, settimePerQuestion] = useState(0)
    const [perQuestionlimitcheck, setPerQuestionLimitCheck] = useState('')
    const [totalWinningPrize, settotalWinningPrize] = useState('')
    const [isFeatured, setIsFeatured] = useState('')
    const [allowPrimarySelection, setAllowPrimarySelection] = useState('')
    const [allowSecondarySelection, setAllowSecondarySelection] = useState('')
    const [joinDelay, setJoinDelay] = useState(0)
    const [ExamKeyword, setExamKeyword] = useState([])
    const [description, setDescription] = useState('')
    const [categoryUUID, setcategoryUUID] = useState('');
    const [ExamBanner, setExamBanner] = useState('');
    const [phoneBanner, setphoneBanner] = useState('');
    const [ExamQuestion, setExamQuestion] = useState([]);
    const [city, setCity] = useState([]);
    const [ExamCity, setExamCity] = useState([]);
    const [type, setType] = useState("QUIZ")

    // const [toValue, settoValue] = useState('');
    // const [fromValue, setFromValue] = useState('');
    // const [price, setPrice] = useState('');

    const [questionType, setQuestionType] = useState()
    const [titile, setTitile] = useState()
    const [time, setTime] = useState(0)
    const [points, setPoints] = useState()
    const [coin, setCoins] = useState()

    const [ExamPrice, setExamPrice] = useState([])
    const [ExamRankingFactor, setExamRankingFactor] = useState([])


    const [questionChecked, setQuestionChecked] = useState(false);
    const [checked, setChecked] = useState(false);
    const [text, setText] = useState("");

    const [checked1, setChecked1] = useState(false);
    const [text1, setText1] = useState("");

    const [filterCategory, setFilterCategory] = useState('')
    const [filtersubCategory, setFilterSubCategory] = useState('')
    const [filterstartDate, setFilteStartDate] = useState('')
    const [filterendDate, setFilteEndDate] = useState('')
    const [filterusagecount, setFilteUsageCount] = useState("")

    const [titileErr, setTitileErr] = useState('');
    const [ExamBannerErr, setExamBannerErr] = useState('');
    const [descriptionErr, setDescriptionErr] = useState('');
    const [allowPrimarySelectionErr, setAllowPrimarySelectionErr] = useState('');
    const [categoryUUIDErr, setcategoryUUIDErr] = useState('');
    const [isFeaturedErr, setIsFeaturedErr] = useState('');
    const [marksPerQuestionErr, setMarksPerQuestionErr] = useState('');


    //new winning price
    const [prizeNumber0, setPrizeNumber0] = useState(1)
    const [prizeAmount0, setPrizeAmount0] = useState(0)

    const [prizeFromNumber0, setPrizeFromNumber0] = useState(0)
    const [prizeFromNumber1, setPrizeFromNumber1] = useState(0)
    const [prizeFromNumber2, setPrizeFromNumber2] = useState(0)
    const [prizeFromNumber3, setPrizeFromNumber3] = useState(0)
    const [prizeFromNumber4, setPrizeFromNumber4] = useState(0)
    const [prizeFromNumber5, setPrizeFromNumber5] = useState(0)
    const [prizeFromNumber6, setPrizeFromNumber6] = useState(0)
    const [prizeFromNumber7, setPrizeFromNumber7] = useState(0)
    const [prizeFromNumber8, setPrizeFromNumber8] = useState(0)



    const [prizeNumber1, setPrizeNumber1] = useState(2)
    const [prizeAmount1, setPrizeAmount1] = useState(0)

    const [prizeNumber2, setPrizeNumber2] = useState(3)
    const [prizeAmount2, setPrizeAmount2] = useState(0)

    const [prizeNumber3, setPrizeNumber3] = useState(4)
    const [prizeAmount3, setPrizeAmount3] = useState(0)

    const [prizeNumber4, setPrizeNumber4] = useState(5)
    const [prizeAmount4, setPrizeAmount4] = useState(0)

    const [prizeNumber5, setPrizeNumber5] = useState(6)
    const [prizeAmount5, setPrizeAmount5] = useState(0)

    const [prizeNumber6, setPrizeNumber6] = useState(7)
    const [prizeAmount6, setPrizeAmount6] = useState(0)

    const [prizeNumber7, setPrizeNumber7] = useState(8)
    const [prizeAmount7, setPrizeAmount7] = useState(0)

    const [prizeNumber8, setPrizeNumber8] = useState(9)
    const [prizeAmount8, setPrizeAmount8] = useState(0)

    const [prizeNumber9, setPrizeNumber9] = useState('')
    const [prizeAmount9, setPrizeAmount9] = useState('')
    const [prizeNumberFrom9, setPrizeNumberFrom9] = useState('')



    const [getcategory, setGetcategory] = useState([])
    const [getsubcategory, setGetSubcategory] = useState([])

    const [questionListitem, setQuestionList] = useState([]);
    // console.warn(type, "type")

    useEffect(() => {
        getCategory();
        getSubcategory();
        getKeyword();
        getCities();
    }, [])

    const getCities = async () => {
        let result = await fetch(`${Environment.server_url}/common/cities`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        // if(result.payload.hasOwnProperty("cities"))
        // setCity(result.payload.cities.map(obj=>obj.uuid))
        setCity(result.payload.cities)

    }
    // console.warn(city, "CityUUID")
    // console.warn(ExamQuestion, "examQuestion")

    // let options = keyword.map((item)=>
    // return<option value={item.uuid}>{item.city}</option>
    // )

    // console.warn(ExamRankingFactor)

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
        // setQuestionChecked(true)
        setcategoryUUID(id);
        getSubcategory(id);
    };

    // const [Attribute, setAttribute] = useState('')

    //Get Keyword.................
    const [keyword, setKeyword] = useState([])
    const getKeyword = async () => {
        let result = await fetch(`${Environment.server_url}/keywords`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setKeyword(result.payload.lists.rows)
    }

    //Questions Get
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [totalPage, setTotalPage] = useState(0)
    const [items, setItems] = useState([]);

    const [totalcount, setTotalcount] = useState()
    const [totalLength, setTotalLength] = useState()

    const [question, setQuestion] = useState([]);

    // const [optionss, setOptionss] = useState('')

    useEffect(() => {
        getQuestionlist(currentPage);
    }, [])

    const getQuestionlist = async (page) => {
        let result = await fetch(`${Environment.server_url}/questions?limit=${itemsPerPage}&page=${page}&category=${categoryUUID}&subCategory=${filtersubCategory}&startDate=${filterstartDate}&endDate=${filterendDate}&usageCount=${filterusagecount}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });

        result = await result.json();
        const list = result.payload.list.map((obj) => {
            return {
                ...obj,
                checked: questionListitem.findIndex((item) => item.questionUUID === obj.uuid) > -1
            };
        })
        setQuestion(list);
        setTotalPage(Math.ceil(result.payload.count / itemsPerPage));
        setTotalcount(result.payload.count);
        setTotalLength(result.payload.students.rows.length);
    }

    const handlePageChange = async (data) => {
        setCurrentPage(data.selected + 1);
        const questionFromServer = await getQuestionlist(data.selected + 1);
        setItems(questionFromServer);
    }

    const paginationCount = () => {
        if (question.length === 0) {
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


    //Search Handler(debounce) and search Table start... 
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
            setQuestion(result.payload.list);
            setTotalPage(Math.ceil(result.payload.count / itemsPerPage));
            setTotalcount(result.payload.count);
            setTotalLength(result.payload.list.length);
        }
    }

    // console.warn("Updated ExamKEyword",ExamKeyword)



    const Addexam = async () => {
        if (ExamBanner === '') {
            document.getElementsByClassName('bannerError')[0].innerText = "This field is required"
        }
        else {
            document.getElementsByClassName('bannerError')[0].innerText = ""
        }

        if (categoryUUID === '') {
            document.getElementsByClassName('catError')[0].innerText = "This field is required"
        }
        else {
            document.getElementsByClassName('catError')[0].innerText = ""
        }

        if (title === '') {
            document.getElementsByClassName('titleError')[0].innerText = "This field is required"
        }
        else {
            document.getElementsByClassName('titleError')[0].innerText = ""
        }

        if (isFeatured === '') {
            document.getElementsByClassName('isfeaturedError')[0].innerText = "This field is required"
        }
        else {
            document.getElementsByClassName('isfeaturedError')[0].innerText = ""
        }

        if (marksPerQuestion === "") {
            document.getElementsByClassName('marksperquestionError')[0].innerText = "This field is required"
        }
        else {
            document.getElementsByClassName('marksperquestionError')[0].innerText = ""
        }

        if (allowPrimarySelection === '') {
            document.getElementsByClassName('allowprimaryselectionError')[0].innerText = "This field is required"
        }
        else {
            document.getElementsByClassName('allowprimaryselectionError')[0].innerText = ""
        }

        // if (ExamCity.length === 0) {
        //     document.getElementsByClassName('examcityError')[0].innerText = "This field is required"
        // }
        // else {
        //     document.getElementsByClassName('examcityError')[0].innerText = ""
        // }
        if (ExamKeyword.length === 0) {
            document.getElementsByClassName('examkeywordError')[0].innerText = "This field is required"
        }
        // else {
        //     document.getElementsByClassName('examcityError')[0].innerText = ""
        // }

        if (studentLimit === '') {
            document.getElementsByClassName('studentlimitError')[0].innerText = "This field is required"
        }
        else {
            document.getElementsByClassName('studentlimitError')[0].innerText = ""
        }


        if (totalWinningPrize === '') {
            document.getElementsByClassName('totalwinningprizeError')[0].innerText = "This field is required"
        }
        else {
            document.getElementsByClassName('totalwinningprizeError')[0].innerText = ""
        }

        if (phoneBanner === '') {
            document.getElementsByClassName('phonebannerError')[0].innerText = "This field is required"
        }
        else {
            document.getElementsByClassName('phonebannerError')[0].innerText = ""
        }

        if (ExamKeyword.length === 0) {
            document.getElementsByClassName('examkeywordError')[0].innerText = "This field is required"
        }
        else {
            document.getElementsByClassName('examkeywordError')[0].innerText = ""
        }

        if (ExamBanner === '' && categoryUUID === '' && title === '' && isFeatured === '' && marksPerQuestion === '' && allowPrimarySelection === '' && ExamCity.length === 0 && ExamKeyword.length === 0 && studentLimit === '' && totalWinningPrize === '' && phoneBanner === '') {
            document.getElementsByClassName('allfieldError')[0].innerText = "Please fill all required field"
        } else {
            document.getElementsByClassName('allfieldError')[0].innerText = ""
        }


        // console.warn(title, studentLimit, isFree, joinFee, marksPerQuestion, perquestiontimelimit, perQuestionlimitcheck, totalwinningprice, isFeatured, allowPrimarySelection, allowSecondarySelection, joinDelay, ExamKeyword, description, ExamQuestion, ExamCity);
        const rank = [];
        rank.push({
            "toValue": prizeNumber0,
            "fromValue": prizeFromNumber0,
            "price": prizeAmount0,
        })
        rank.push({
            "toValue": prizeNumber1,
            "fromValue": prizeFromNumber1,
            "price": prizeAmount1,
        })
        rank.push({
            "toValue": prizeNumber2,
            "fromValue": prizeFromNumber2,
            "price": prizeAmount2,
        })
        rank.push({
            "toValue": prizeNumber3,
            "fromValue": prizeFromNumber3,
            "price": prizeAmount3,
        })
        rank.push({
            "toValue": prizeNumber4,
            "fromValue": prizeFromNumber4,
            "price": prizeAmount4,
        })
        rank.push({
            "toValue": prizeNumber5,
            "fromValue": prizeFromNumber5,
            "price": prizeAmount5,
        })
        rank.push({
            "toValue": prizeNumber6,
            "fromValue": prizeFromNumber6,
            "price": prizeAmount6,
        })
        rank.push({
            "toValue": prizeNumber7,
            "fromValue": prizeFromNumber7,
            "price": prizeAmount7,

        })
        rank.push({
            "toValue": prizeNumber8,
            "fromValue": prizeFromNumber8,
            "price": prizeAmount8,

        })

        // console.warn(banner, title, studentLimit, description, isFree, joinFee, tournamentPrize, tournamentKeywords, tournamentCities, tournamentExams)


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
            if (val[1] && val[0] && val[2])
                parsedValue.push({ toValue: parseInt(val[1]), fromValue: val[0], price: parseInt(val[2]) })
            // parsedValue.push({ toValue: parseInt(val[1]), fromValue: val[0], price: parseInt(val[2]) })
        })
        const dataBundle = [...rank]
        parsedValue.map(val => {
            dataBundle.push(val)
        })
        // console.log("data bundle ", dataBundle)

        //Add and remove the row for the ranking
        const examList = [];
        const parsedValue1 = []
        Array.from(document.getElementsByClassName('examList')).map(currObj => {
            const localArr = [];
            Array.from(currObj.getElementsByTagName("select")).map((val) => {
                localArr.push(val.value);
            })
            // Array.from(currObj.getElementsByTagName("input")).map((val) => {
            //     localArr.push(val.value);
            //     console.log(val.value,"$$$$$$$$$$$$")
            // })

            localArr.push(currObj.getElementsByTagName("input")[0].value);

            const time = currObj.getElementsByTagName("input")[1];
            if (time.value)
                localArr.push(time.value);
            else
                localArr.push(0);

            localArr.push(currObj.getElementsByTagName("input")[2].value);
            localArr.push(currObj.getElementsByTagName("input")[3].valueAsNumber);

            examList.push(localArr);
        })
        examList.map((val, index) => {
            parsedValue1.push({ type: val[0], title: val[1], time: val[2], point: val[3], coins: val[4] })
        })
        const dataBundle1 = [...ExamRankingFactor]
        parsedValue1.map(val => {
            dataBundle1.push(val)
        })
        // console.log("data bundle1 ", dataBundle1)

        // setStartExamDisable(true)
        setShowLoaderShow(true)
        setTimeout(() => {
            setStartExamDisable(false);
            setShowLoaderShow(false);
        }, 5000);

        // const ExamQuestion = question
        // .filter((item) => item.checked)
        // .map((item) => item.uuid);

        questionListitem.map((item, key) => {
            item.checked &&
                ExamQuestion.push({ questionUUID: item.uuid })
            setExamQuestion(ExamQuestion);
        }
        )

        //post call start here
        const catdata = await fetch(`${Environment.server_url}/exams/addexam`, {
            method: "POST",
            body: description ?
                JSON.stringify({ type, ExamBanner, phoneBanner, title, categoryUUID, description, allowPrimarySelection, allowSecondarySelection, isFeatured, marksPerQuestion, studentLimit, isFree, joinFee, marksPerQuestion, timePerQuestion, totalWinningPrize, joinDelay, ExamKeyword, ExamCity, ExamQuestion:questionListitem, ExamPrice: dataBundle, ExamRankingFactor: dataBundle1 })
                :
                JSON.stringify({ type, ExamBanner, phoneBanner, title, categoryUUID, allowPrimarySelection, allowSecondarySelection, isFeatured, marksPerQuestion, studentLimit, isFree, joinFee, marksPerQuestion, timePerQuestion, totalWinningPrize, joinDelay, ExamKeyword, ExamCity, ExamQuestion:questionListitem, ExamPrice: dataBundle, ExamRankingFactor: dataBundle1 }),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
            .then(catdata => {
                if (catdata.status === 200) {
                    setShowSuccess(true);
                    setTimeout(() => {
                        navigate("/Quiz");
                    }, 5000);
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
        window.scrollTo(0, 0)
    }

    const bannerSelected = () => {
        document.getElementsByClassName('bannerError')[0].innerText = ""
    }
    const categorySelected = () => {
        document.getElementsByClassName('catError')[0].innerText = ""
    }
    const titleSelected = () => {
        document.getElementsByClassName('titleError')[0].innerText = ""
    }
    const isfeaturedSelected = () => {
        document.getElementsByClassName('isfeaturedError')[0].innerText = ""
    }
    const marksperquestionSelected = () => {
        document.getElementsByClassName('marksperquestionError')[0].innerText = ""
    }
    const allowprimarySelected = () => {
        document.getElementsByClassName('allowprimaryselectionError')[0].innerText = ""
    }
    const cityselected = (list, item) => {
        setExamCity(list)
        // if (list.length === 0)
        //     document.getElementsByClassName('examcityError')[0].innerText = "This field is Required"
        // else
        //     document.getElementsByClassName('examcityError')[0].innerText = ""
    }
    const keywordselected = (list, item) => {
        setExamKeyword(list)
        if (list.length === 0)
            document.getElementsByClassName('examkeywordError')[0].innerText = "this field is Required"
        else
            document.getElementsByClassName('examkeywordError')[0].innerText = ""
    }
    const totalwinningprizeSelected = () => {
        document.getElementsByClassName('totalwinningprizeError')[0].innerText = ""
    }
    const studentlimitSelected = () => {
        document.getElementsByClassName('studentlimitError')[0].innerText = ""
    }
    const phonebannerSelected = () => {
        document.getElementsByClassName('phonebannerError')[0].innerText = ""
    }
    const allfieldSelected = () => {
        document.getElementsByClassName('allfieldError')[0].innerText = ""
    }


    //add or remove the winning price
    const [indexes, setIndexes] = React.useState([]);
    const [counter, setCounter] = React.useState(0);
    const { register, handleSubmit } = useForm();

    const onSubmit = data => {
        console.log(data);
    };

    const addRank = () => {
        setIndexes(prevIndexes => [...prevIndexes, counter]);
        setCounter(prevCounter => prevCounter + 1);
    };

    const removeRank = index => () => {
        setIndexes(prevIndexes => [...prevIndexes.filter(item => item !== index)]);
        setCounter(prevCounter => prevCounter - 1);
    };


    //add or remove ranking Factor..
    const [indexes1, setIndexes1] = React.useState([]);
    const [counter1, setCounter1] = React.useState(0);

    const addExam = () => {
        setIndexes1(prevIndexes => [...prevIndexes, counter1]);
        setCounter1(prevCounter => prevCounter + 1);
    };
    const removeExam = index => () => {
        setIndexes1(prevIndexes => [...prevIndexes.filter(item => item !== index)]);
        setCounter1(prevCounter => prevCounter - 1);
    };



    //file Upload url
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

        setExamBanner(fileUrl);


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

    async function uploadProfileMobile(file) {
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


    // const handlecheck = (e) => {
    //     if (e.target.checked) {
    //         setExamQuestion([...ExamQuestion, { questionUUID:(e.target.value) }]);
    //     } else {
    //         const index = ExamQuestion.findIndex((id) => id === e.target.value);
    //         const updatedArray = ExamQuestion.splice(index, 1);
    //         setExamQuestion(updatedArray);
    //         console.warn("QuestionUUID", ExamQuestion)
    //     }
    // };

    // const handlecheck = (e, index) => {
    //     question[index].status = false;
    //     setQuestion(question);
    //     if (e.target.checked) {
    //         setExamQuestion([...ExamQuestion, { questionUUID: e.target.value }]);
    //     } else {
    //         // setQuestionChecked(false)
    //         setExamQuestion(ExamQuestion.filter((id) => id !== e.target.value))
    //         const updatedArray = ExamQuestion.splice(ExamQuestion, 1)
    //         setExamQuestion(updatedArray)
    //     }
    // };

    // const handlecheck = React.useCallback((e, index)=>{
    //     question[index].status = false;
    //     setQuestion(question);
    // })


    // console.warn(ExamCity,"ExamCity")




    // function handleShortlist(event) {
    //     var updatedList = [...listId];
    //     if (event.target.checked) {
    //       updatedList.push(event.target.value);
    //     } else {
    //       updatedList.splice(listId.indexOf(event.target.value), 1);
    //     }
    //     setListId(updatedList);
    //   }

    // console.warn("Keyword", keywords)
    // console.warn("QuestionUUID Outside", ExamQuestion)

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
                                        <h4 className="mb-sm-0">New Quiz</h4>
                                        <div className="page-title-right">
                                            <ol className="breadcrumb m-0">
                                                <Link to="/Exam" className="breadcrumb-item">Quiz</Link>
                                                <li className="breadcrumb-item active">New Quiz</li>
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
                                                        {/* <Popup trigger={<button className="popupbtn" type="button">+ Add Banner</button>}
                                                            position="right center">
                                                            <div className="row d-flex flex-column justify-content-center align-items-center">
                                                                <button className="popupbtn2">Upload from Banner gallery</button>
                                                            </div>
                                                        </Popup> */}
                                                        <div className="col-12 col-sm-6 imgageupload">
                                                            <p><b>Quiz Banner</b><span className="required text-danger">*</span></p>
                                                            <div className="container-exam">
                                                                {error && <p className="errorMsg">File not supported</p>}
                                                                <div
                                                                    className="imgPreview"
                                                                    style={{
                                                                        background: imgPreview ? `url("${imgPreview}") no-repeat center/cover`
                                                                            : "#c2c7d0"
                                                                    }}
                                                                >
                                                                    {/* <label htmlFor="fleUpload" className="customFileUpload">
                                                                                select profile
                                                                            </label>
                                                                    <input type="file" onChange={(e)=>uploadProfile(e)} id={"fleUpload"}/> */}
                                                                    {!imgPreview && (
                                                                        <>
                                                                            {/* <p>Add Profile Picture</p> */}
                                                                            <label htmlFor="fileUpload" className="customFileUpload">
                                                                                Choose file
                                                                            </label>
                                                                            <input type="file"
                                                                                id="fileUpload"
                                                                                onChange={(e) => {
                                                                                    handleImageChange(e);
                                                                                    uploadProfile(e);
                                                                                    bannerSelected();
                                                                                }}

                                                                            />
                                                                        </>
                                                                    )}
                                                                </div>
                                                                {imgPreview && (
                                                                    <button className="btn-exam" onClick={() => setImgPreview(null)}>Remove</button>
                                                                )}
                                                            </div>
                                                            {/* {<div><p className="ErrorMessage">{ExamBanner === "" ? (ExamBannerErr) : ("")}</p></div>} */}
                                                            <div><p className="bannerError" style={{ color: "red", fontWeight: 'bold' }}></p></div>
                                                        </div>
                                                        <div className="col-12 col-sm-6 imgageupload">
                                                            <p><b>Phone Banner</b><span className="required text-danger">*</span></p>
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
                                                                                    phonebannerSelected();
                                                                                }}
                                                                            />
                                                                        </>
                                                                    )}
                                                                </div>
                                                                {imgPreviewId && (
                                                                    <button className="btn-exam" onClick={() => setImgPreviewId(null)}>Remove</button>
                                                                )}
                                                            </div>
                                                            <div><p className="phonebannerError" style={{ color: "red", fontWeight: 'bold' }}></p></div>
                                                        </div>
                                                    </div>

                                                    <div className="form-row mb-4">
                                                        <div className="col-sm-4">
                                                            <p><b>Category</b><span className="required text-danger">*</span></p>
                                                            <select className="form-select form-select mb-2" aria-label="Default select example" onClick={getQuestionlist} onChange={(e) => { updateSubcategoryHandler(e.target.value); categorySelected() }}>
                                                                <option>Select</option>
                                                                {
                                                                    getcategory.map((item) =>
                                                                        <>
                                                                            <option value={item.uuid}>{item.label}</option>
                                                                        </>
                                                                    )
                                                                }
                                                            </select>
                                                            {/* {<div><p className="ErrorMessage">{categoryUUID === "" ? (categoryUUIDErr) : ("")}</p></div>} */}
                                                            <div><p className="catError" style={{ color: "red", fontWeight: 'bold' }}></p></div>
                                                        </div>
                                                        <div className="col-sm-4">
                                                            <p><b>Title</b><span className="required text-danger">*</span></p>
                                                            <input type="name" className="form-control" id="exampleFormControlInput1" placeholder="Quiz title" onChange={(e) => { setTitle(e.target.value); titleSelected() }}></input>
                                                            {/* {<div><p className="ErrorMessage">{title === "" ? (titileErr) : ("")}</p></div>} */}
                                                            <div><p className="titleError" style={{ color: "red", fontWeight: 'bold' }}></p></div>
                                                        </div>
                                                        <div className="col-sm-4">
                                                            <p><b>Student limit</b><span className="required text-danger">*</span></p>
                                                            <input type="name" className="form-control" id="exampleFormControlInput1" placeholder="Student limit" onChange={(e) => { setStudentLimit(e.target.valueAsNumber || e.target.value); studentlimitSelected() }}></input>
                                                            <div><p className="studentlimitError" style={{ color: "red", fontWeight: 'bold' }}></p></div>
                                                        </div>
                                                        {/* <div className="col-sm-3">
                                                            <p><b>Start time</b><span className="required text-danger">*</span></p>
                                                            <input type="datetime-local" name="end_time" id="end_time" className="form-control valid" aria-invalid="false" onChange={(e) => { setStartTime(e.target.value) }} />
                                                        </div> */}
                                                    </div>

                                                    <div className="form-row mb-4">
                                                        {/* <div className="col-12 col-sm-4">
                                                            <p><b>End time</b><span className="required text-danger">*</span></p>
                                                            <input type="datetime-local" name="end_time" id="end_time" className="form-control valid" aria-invalid="false" onChange={(e) => { setEndTime(e.target.value) }} />
                                                        </div> */}
                                                        <div className="col-12 col-sm-4">
                                                            <p><b>Is free?</b></p>
                                                            <div className="input-group">
                                                                <div className="input-group-prepend">
                                                                    <div className="input-group-text">
                                                                        <input name="is_free" type="checkbox" id="is_free" defaultValue={0}
                                                                            checked={checked1}
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
                                                                <input id="joining_fees" placeholder="Joining fees" className="form-control" name="joining_fees" type="text" disabled={checked1} onChange={(e) => { setJoinFee(e.target.value) }} />
                                                            </div>
                                                        </div>
                                                        <div className="col-12 col-sm-4 column">
                                                            <p><b>Marks per question</b><span className="required text-danger">*</span></p>
                                                            <input type="number" placeholder="Marks per question" className="form-control" id="exampleFormControlInput1" onChange={(e) => { setMarksPerQuestion(e.target.valueAsNumber || e.target.value); marksperquestionSelected() }}></input>
                                                            {/* {<div><p className="ErrorMessage">{marksPerQuestion === "" ? (marksPerQuestionErr) : ("")}</p></div>} */}
                                                            <div><p className="marksperquestionError" style={{ color: "red", fontWeight: 'bold' }}></p></div>
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
                                                                <input id="marks_perquestion" placeholder="Time limit" className="form-control" name="marks_perquestion" type="text" disabled={!checked}
                                                                    onChange={(e) => { settimePerQuestion(e.target.valueAsNumber || e.target.value) }} />
                                                            </div>
                                                        </div>
                                                    </div>


                                                    <div className="form-row mb-4">
                                                        {/* <div className="col-12 col-sm-4 column">
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
                                                                <input id="marks_perquestion" placeholder="Time limit" className="form-control" name="marks_perquestion" type="text" disabled={!checked}
                                                                    onChange={(e) => { setPerQuestionTimeLimit(e.target.value) }} />
                                                            </div>
                                                        </div> */}


                                                        <div className="col-12 col-sm-4">
                                                            <div className="form-group">
                                                                <div className="controls">
                                                                    <p><b>Total winning price</b><span className="required text-danger">*</span></p>
                                                                    <input placeholder="Total winning price" min="0" className="form-control valid" name="total_winning_price" type="number" id="total_winning_price" aria-invalid="false" onChange={(e) => { settotalWinningPrize(e.target.valueAsNumber || e.target.value); totalwinningprizeSelected() }} />
                                                                </div>
                                                            </div>
                                                            <div><p className="totalwinningprizeError" style={{ color: "red", fontWeight: 'bold' }}></p></div>
                                                        </div>
                                                        <div className="col-12 col-sm-4">
                                                            <p><b>Is feature exam?</b><span className="required text-danger">*</span></p>
                                                            <select className="form-select form-select mb-2" aria-label="Default select example" onChange={(e) => { setIsFeatured(e.target.value); isfeaturedSelected() }}>
                                                                <option>Select</option>
                                                                <option value={true}>Yes</option>
                                                                <option value={false}>No</option>
                                                            </select>
                                                            {/* {<div><p className="ErrorMessage">{isFeatured === "" ? (isFeaturedErr) : ("")}</p></div>} */}
                                                            <div><p className="isfeaturedError" style={{ color: "red", fontWeight: 'bold' }}></p></div>
                                                        </div>
                                                        <div className="col-12 col-sm-4 column">
                                                            <p><b>Allow to select primary?</b><span className="required text-danger">*</span></p>
                                                            <select className="form-select form-select mb-2" aria-label="Default select example" onChange={(e) => { setAllowPrimarySelection(e.target.value); allowprimarySelected() }}>
                                                                <option>Select</option>
                                                                <option value={true}>Yes</option>
                                                                <option value={false}>No</option>
                                                            </select>
                                                            {/* {<div><p className="ErrorMessage">{allowPrimarySelection === "" ? (allowPrimarySelectionErr) : ("")}</p></div>} */}
                                                            <div><p className="allowprimaryselectionError" style={{ color: "red", fontWeight: 'bold' }}></p></div>
                                                        </div>
                                                    </div>
                                                    <div className="form-row mb-4">
                                                        {/* <div className="col-12 col-sm-4 column">
                                                            <p><b>Allow to select primary?</b><span className="required text-danger">*</span></p>
                                                            <select className="form-select form-select mb-2" aria-label="Default select example" onChange={(e) => { setAllowPrimarySelection(e.target.value) }}>
                                                                <option value={true}>Yes</option>
                                                                <option value={false}>No</option>
                                                            </select>
                                                        </div> */}
                                                        {
                                                            allowPrimarySelection === 'true' &&
                                                            <div className="col-12 col-sm-4 column">
                                                                <p><b>Allow to select secondary?</b><span className="required text-danger">*</span></p>
                                                                <select className="form-select form-select mb-2" aria-label="Default select example" onChange={(e) => { setAllowSecondarySelection(e.target.value) }}>
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
                                                                    <input placeholder="Delay in seconds" className="form-control valid" name="join_delay" type="number" id="join_delay" aria-invalid="false" onChange={(e) => { setJoinDelay(e.target.valueAsNumber || e.target.value) }} />
                                                                    {/* <select className="form-select form-select mb-2" aria-label="Default select example" onChange={(e) => { setJoinDelay(e.target.value) }}>
                                                                        <option>Select</option>
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
                                                                    </select> */}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12 col-sm-4">
                                                            <p><b>City</b><span className="required text-danger">*</span></p>
                                                            <Multiselect options={city} onSelect={cityselected} emptyRecordMsg={"No City Found"} displayValue="city" class="form-control" id="exampleFormControlInput1" >
                                                            </Multiselect>
                                                            <div><p className="examcityError" style={{ color: "red", fontWeight: 'bold' }}></p></div>
                                                        </div>
                                                    </div>

                                                    <div className="form-row mb-4">
                                                        <div className="col-sm">
                                                            <p><b>Keywords</b><span className="required text-danger">*</span></p>
                                                            <Multiselect options={keyword} onSelect={keywordselected} emptyRecordMsg={"No Keywords Found"} displayValue="attribute" class="form-control" id="exampleFormControlInput1"></Multiselect>
                                                            <div><p className="examkeywordError" style={{ color: "red", fontWeight: 'bold' }}></p></div>
                                                        </div>
                                                    </div>
                                                    <div className="form-row mb-4">
                                                        <p><b>Description</b></p>
                                                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="4" onChange={(e) => { setDescription(e.target.value) }}></textarea>
                                                        {/* {<div><p className="ErrorMessage">{description === "" ? (descriptionErr) : ("")}</p></div>} */}
                                                        {/* <div><p className="descriptionError" style={{ color: "red", fontWeight: 'bold' }}></p></div> */}
                                                    </div>
                                                    <div className="mb-4">
                                                        <p><b>Questions</b></p>
                                                        <div className="option-section">
                                                            <div className="form-row mb-4">
                                                                {/* <div className="col-sm">
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
                                                                </div> */}
                                                                <div className="col-sm">
                                                                    <p><b>Sub-Category</b></p>
                                                                    <select className="form-select form-select mb-2" aria-label="Default select example" onClick={getQuestionlist} onChange={(e) => { setFilterSubCategory(e.target.value) }}>
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
                                                                    <input type="datetime-local" name="end_time" id="end_time" className="form-control valid" aria-invalid="false" onClick={getQuestionlist} onChange={(e) => { setFilteStartDate(e.target.value) }} />
                                                                </div>

                                                                <div className="col-sm">
                                                                    <p><b>End date of Creation</b></p>
                                                                    <input type="datetime-local" name="end_time" id="end_time" className="form-control valid" aria-invalid="false" onClick={getQuestionlist} onChange={(e) => { setFilteEndDate(e.target.value) }} />

                                                                </div>

                                                                <div className="col-sm">
                                                                    <div className="form-group">
                                                                        <div className="controls">
                                                                            <p><b>Usage count</b></p>
                                                                            {/* <input placeholder="Usage count" max="10" className="form-control valid" name="total_winning_price" type="number" id="total_winning_price" aria-invalid="false" /> */}
                                                                            {/* <input placeholder="Join delay" className="form-control valid" name="join_delay" type="number" id="join_delay" aria-invalid="false" /> */}
                                                                            <select className="form-select form-select mb-2" aria-label="Default select example" onClick={getQuestionlist} onChange={(e) => { setFilteUsageCount(e.target.value) }}>
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
                                                                {/* <div className="col-sm">
                                                                    <button onClick={handleClear}> clear
                                                                    </button>
                                                                </div> */}
                                                            </div>

                                                            <div className="table-responsive mt-3">
                                                                <div className="col">
                                                                    <div className="col-sm">
                                                                        <div className="search-box me-2 mb-2 d-inline-block">
                                                                            <div className="position-relative">
                                                                                <label for="search-bar-0" className="search-label"><span id="search-bar-0-label" className="sr-only">Search this table</span><input id="search-bar-0" onChange={searchHandler} type="text" aria-labelledby="search-bar-0-label" className="form-control" placeholder="Search" /></label>
                                                                                <i className="bx bx-search-alt search-icon">
                                                                                </i>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {
                                                                    categoryUUID === "" ? (
                                                                        <tr>
                                                                            <td></td>
                                                                            <td></td>
                                                                            <td></td>
                                                                            <td>Please select category</td>
                                                                            <td></td>
                                                                            <td></td>
                                                                        </tr>
                                                                    ) : (
                                                                        <table className="table table-centered datatable dt-responsive nowrap" style={{ borderCollapse: 'collapse', borderSpacing: 0, width: '100%' }}>
                                                                            <thead className="thead-light">
                                                                                <tr>
                                                                                    <th>Sl.no</th>
                                                                                    <th>Question</th>
                                                                                    <th>Sub category</th>
                                                                                    <th>Options</th>
                                                                                    <th>Selected</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                {
                                                                                    question.length > 0 ? question.map((item, index) =>
                                                                                        <tr key={index}>
                                                                                            <td>{index + 1}</td>
                                                                                            <td><Zoom><div dangerouslySetInnerHTML={{ __html: item.title }} ></div></Zoom></td>
                                                                                            <td>{item?.questionSubCategory?.label}</td>
                                                                                            <td>
                                                                                                {item.options?.map(obj => {
                                                                                                    return obj.isCorrect ? <span className="badge bg-success me-1 mr-1"><b>{obj.key}</b>.{obj.text}<br></br>
                                                                                                        {
                                                                                                            obj.image && <Zoom><img src={obj.image} className="Questionimage"></img></Zoom>
                                                                                                        }
                                                                                                    </span>
                                                                                                        : <span className="badge bg-dark me-1 mr-1"><b>{obj.key}</b>.{obj.text}<br />
                                                                                                            {
                                                                                                                obj.image && <Zoom> <img src={obj.image} className="Questionimage"></img></Zoom>
                                                                                                            }
                                                                                                        </span>
                                                                                                })}
                                                                                            </td>
                                                                                            <td>
                                                                                                <div className="form-check form-switch">
                                                                                                    <input
                                                                                                        type="checkbox"
                                                                                                        className="form-check-input"
                                                                                                        onChange={(e) => {
                                                                                                            const questionList = [...question];
                                                                                                            questionList[index].checked = e.target.checked;
                                                                                                            setQuestion(questionList);
                                                                                                            if (e.target.checked) {
                                                                                                                questionListitem.push({questionUUID:item.uuid})
                                                                                                            } else {
                                                                                                                const idx = questionListitem.indexOf((obj) => obj.questionUUID === item.uuid);
                                                                                                                questionListitem.splice(idx, 1);
                                                                                                            }
                                                                                                            // setQuestionList(questionList);
                                                                                                            // ExamQuestion.push({questionUUID:item.uuid})
                                                                                                            // setExamQuestion(ExamQuestion);
                                                                                                        }}
                                                                                                        checked={item.checked}
                                                                                                    />
                                                                                                    {/* value {JSON.stringify(item.checked)} */}
                                                                                                </div>
                                                                                            </td>
                                                                                            {/* <td>
                                                                                        {item.status ? <span class="badge bg-success"> Active </span> : <span class="badge bg-danger"> Inactive </span>}
                                                                                    </td> */}
                                                                                        </tr>
                                                                                    )
                                                                                        : (
                                                                                            <tr>
                                                                                                <td></td>
                                                                                                <td></td>
                                                                                                <td>No-Question Found</td>
                                                                                                <td></td>
                                                                                                <td></td>
                                                                                            </tr>
                                                                                        )
                                                                                }

                                                                            </tbody>
                                                                        </table>
                                                                    )
                                                                }
                                                            </div>
                                                            {
                                                                categoryUUID === "" ?
                                                                    (
                                                                        <></>
                                                                    )
                                                                    :
                                                                    (
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
                                                                    )
                                                            }

                                                        </div>
                                                    </div>

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
                                                            {indexes.map(index => {
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
                                                                                <button type="button" className="btn btn-danger btn-sm" onClick={removeRank(index)}>
                                                                                    X
                                                                                </button>
                                                                            </div>

                                                                        </div>
                                                                    </fieldset>
                                                                );
                                                            })}
                                                            <button type="button" className="btn btn-warning mt-2" onClick={addRank}>
                                                                Add Rank
                                                            </button>
                                                        </form>
                                                    </div>
                                                    {/* <div className="mb-4">
                                                        <p><b>Winning Price</b></p>

                                                        <div className="form-group">
                                                            <div className="table-responsive controls">
                                                                <table className="table table-centered datatable dt-responsive nowrap" style={{ borderCollapse: 'collapse', borderSpacing: 0, width: '100%' }}>
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Rank</th>
                                                                            <th>Price</th>
                                                                            <th>Action</th>
                                                                        </tr>
                                                                    </thead>
                                                                    {inputList.map((_x, i) => {
                                                                        return (
                                                                            <tbody>
                                                                                <tr className="exam-ranking-factor-tr-3">
                                                                                    <td><input type="number" placeholder="Rank" className="form-control" onChange={(e) => { settoValue(e.target.value) }}></input></td>
                                                                                    <td><input type="number" name="exam_ranking_factor_point[]" className="form-control" placeholder="Price" onChange={(e) => { setPrice(e.target.value) }} /></td>
                                                                                    <td>
                                                                                        {inputList.length !== 1 && <button type="button" className="btn btn-danger btn-sm"
                                                                                            onClick={() => handleRemoveClick(i)}>x</button>}
                                                                                    </td>

                                                                                </tr>
                                                                            </tbody>
                                                                        );
                                                                    })}
                                                                    {
                                                                        <button className="btn btn-warning" onChange={handleInputChange} onClick={handleAddClick}>Add Winning Price</button>
                                                                    }
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div> */}

                                                    {/* <form onSubmit={handleSubmit}>
                                                        <div className="form-inline">
                                                            <table className="table table-centered datatable dt-responsive " style={{ borderCollapse: 'collapse', borderSpacing: 0, width: '100%' }}>
                                                                <thead className="thead-light">
                                                                    <tr>
                                                                        <th>Type</th>
                                                                        <th>Title</th>
                                                                        <th>Time</th>
                                                                        <th>Points</th>
                                                                        <th>Action</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {formValues.map((_element, index) => (
                                                                        <tr key={index} >
                                                                            <td>
                                                                                <select className="form-select form-control" aria-label="Default select example" onChange={(e) => { setQuestionType(e.target.value) }}>
                                                                                    <option value={"ON_CORRECT_ANSWER"}>On answer correct</option>
                                                                                    <option value={"ON_INCORRECT_ANSWER"}>On answer In-correct</option>
                                                                                    <option value={"TIME_LIMIT"}>Time limit</option>
                                                                                    <option value={"SECONDARY"}>Primary</option>
                                                                                    <option value={"PRIMARY"}>Secondary</option>
                                                                                </select>
                                                                            </td>
                                                                            <td>
                                                                                <div className="form-group">
                                                                                    <input type="name" className="form-control" id="exampleFormControlInput1" placeholder="Title" onChange={(e) => { setTitle(e.target.value) }}></input>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <div className="form-group">
                                                                                    <div className="controls">
                                                                                        <input placeholder="Time(i.e 10)" min="0" className="form-control valid" name="total_winning_price" type="number" id="total_winning_price" aria-invalid="false" onChange={(e) => { setTime(e.target.value) }} />
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <div className="form-group">
                                                                                    <div className="controls">
                                                                                        <input placeholder="Point" min="0" className="form-control valid" name="point" type="number" id="total_winning_price" aria-invalid="false" onChange={(e) => { setPoints(e.target.value) }} />
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                            {
                                                                                index ?
                                                                                    <td id="tooltip-container2"><a className=" text-danger" data-bs-container="#tooltip-container2" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete" onClick={() => removeFormFields(index)}><button className="btn btn-danger btn-sm">x</button></a></td>
                                                                                    : null
                                                                            }
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </table>
                                                        </div>

                                                        <button className="btn btn-dark" type="button" onClick={() => addFormFields()}>Add Ranking Factor</button>
                                                    </form> */}

                                                    <form onSubmit={handleSubmit(onSubmit)}>
                                                        {indexes1.map(index => {
                                                            const fieldName = `friends[${index}]`;
                                                            return (
                                                                <fieldset name={fieldName} key={fieldName} className={"examList"}>
                                                                    <div className="form-row mt-2">
                                                                        <div className="col-sm-2">
                                                                            <p><b>Type</b></p>
                                                                            <select className="form-select form-control" aria-label="Default select example" onChange={(e) => { setQuestionType(e.target.value) }}>
                                                                                <option value={"ON_CORRECT_ANSWER"}>On answer correct</option>
                                                                                <option value={"ON_INCORRECT_ANSWER"}>On answer In-correct</option>
                                                                                <option value={"TIME_LIMIT"}>Time limit</option>
                                                                                {/* <option value={"PRIMARY"}>Primary</option>
                                                                                <option value={"SECONDARY"}>Secondary</option> */}
                                                                                {
                                                                                    allowPrimarySelection === 'true' && <option value={"PRIMARY"}>Primary</option>
                                                                                }
                                                                                {

                                                                                    allowSecondarySelection === 'true' && <option value={"SECONDARY"}>Secondary</option>
                                                                                }
                                                                            </select>
                                                                        </div>
                                                                        <div className="col-sm-2">
                                                                            <p><b>title</b></p>
                                                                            <input type="name" className="form-control" id="exampleFormControlInput1" placeholder="Title" onChange={(e) => { setTitile(e.target.value) }}></input>
                                                                        </div>
                                                                        <div className="col-sm-2">
                                                                            <p><b>time</b></p>
                                                                            <input placeholder="Time(i.e 10)" min="0" className="form-control valid" name="total_winning_price" type="number" id="total_winning_price" aria-invalid="false" onChange={(e) => { setTime(e.target.value) }} />
                                                                        </div>
                                                                        <div className="col-sm-2">
                                                                            <p><b>points</b></p>
                                                                            <input placeholder="Point" min="0" className="form-control valid" name="point" type="number" id="total_winning_price" aria-invalid="false" onChange={(e) => { setPoints(e.target.value) }} />
                                                                        </div>
                                                                        <div className="col-sm-2">
                                                                            <p><b>Rewards</b></p>
                                                                            <input placeholder="in paisa" min="0" className="form-control valid" name="point" type="number" id="total_winning_price" aria-invalid="false" onChange={(e) => { setCoins(e.target.value) }} defaultValue={0}/>
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
                                                        <div onChange={allfieldSelected}><p className="allfieldError" style={{ color: "red", fontWeight: 'bold' }}></p></div>
                                                        <button type="button" className="btn btn-success savebtn" onClick={() => Addexam()} disabled={startExamDisable}>
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
                                                        <Link to="/Exam"><button type="button" className="btn">Cancel</button></Link>
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

export default Quizadd