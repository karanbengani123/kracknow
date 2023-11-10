import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../CssFile/Quiz.css";
import Header from "./Header";
import SideNav from "./SideNav";
import Footer from "./Footer";

function Review() {
  const params = useParams();
  const [getReview, setGetReview] = useState([]);
  useEffect(() => {
    getReviewList();
  }, []);

  const getReviewList = async () => {
    let result = await fetch(
      `https://zlasvmkyg1.execute-api.ap-south-1.amazonaws.com/dev/schedules/review/answer/${params.uuid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    result = await result.json();
    setGetReview(result.payload.respose);
  };

  return (
    <>
      <Header />
      <SideNav />
      <div className="content-wrapper admin-body">
        <section className="content">
          <div className="container-fluid">
            <div className="page-content">
              <div className="row">
                <div className="quiz-container">
                  <div className="title mt-3">
                    <p className="mb-0"><b>Review:</b></p>
                  </div>
                  <div className="table-responsive mt-3">
                    <table className="table table-centered datatable dt-responsive nowrap" style={{ borderCollapse: 'collapse', borderSpacing: 0, width: '100%' }}>
                      <thead className="thead-light">
                        <tr>
                          <th>Qn.No</th>
                          <th>Question</th>
                          <th>Given answer</th>
                          <th>Correct answer</th>
                          <th>Marks</th>
                          <th>Total Marks</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          getReview.map((data, index) =>
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td><div dangerouslySetInnerHTML={{ __html: data.title }}></div></td>
                              <td><b>{data.isCorrect ? (
                                <span className="text-success">
                                  {data.givenAnswer}
                                </span>
                              ) : (
                                <span className="text-danger">
                                  {data.givenAnswer}
                                </span>
                              )}</b></td>
                              <td><b>{data.correctAnswer}</b></td>
                              {/* <td>{data.totalScore}</td> */}
                              <td>{data.mark}</td>
                              <td>{data.totalScore}</td>
                            </tr>
                          )
                        }

                      </tbody>
                    </table>
                  </div>
                  {/* <div className="mt-5">
                    {getReview.map((data, index) => (
                      <div key={index}>
                        <div
                          className="row pr-0"
                          style={{ marginLeft: "-50px" }}
                        >
                          <div className="col-md pr-0"></div>
                          <div className="col-md pr-0">
                            <label>{index + 1} .</label>
                          </div>
                          <div className="col-md-11 pl-0">
                            <div
                              dangerouslySetInnerHTML={{ __html: data.title }}
                            ></div>
                          </div>
                        </div>
                        <div className="row mb-4 ml-4">
                          <div className="col-md-4">
                            <label>
                              Given Answer :{" "}
                              {data.isCorrect ? (
                                <span className="text-success">
                                  {data.givenAnswer}
                                </span>
                              ) : (
                                <span className="text-danger">
                                  {data.givenAnswer}
                                </span>
                              )}
                            </label>
                          </div>
                          <div className="col-md-4">
                            <label>Correct Answer : {data.correctAnswer}</label>
                          </div>
                          <div className="col-md-4">
                            <label>Score : {data.totalScore}</label>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default Review;
