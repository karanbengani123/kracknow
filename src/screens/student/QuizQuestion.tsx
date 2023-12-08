import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  BackHandler,
  SafeAreaView,
} from "react-native";
import { AnswerAPI, GetAllExamQuestionAPI, GetExamDetailsAPI, GetExamQuestionAPI, GetPrevExamQuestionAPI } from "../../api-services/User.api";
import RenderHtml from "react-native-render-html";
import RNRadioBox from "./RadioBox";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import config from "./config";
import Colors from "../constants/Colors";

interface Props {
  navigation: any;
  route: any
}

interface State {
  disabled: boolean;
  isLoading: boolean;
  examQuestionDetails: any;
  pageCount: number;
  isLastRecord: boolean;
  options: any[];
  selectedOption: any;
  givenAnswer: string;
  timer: number;
  time: string;
  status: string;
  categoryType: string;
  description: string;
  size: string;
  isFinished: boolean;
  appeared: any;
  updateTimer: number;
  EXAMUUID: string;
  PARTICIPANTUUID: string;
  PAGE: number;
  QUESTIONUUID: string;
  prevPageCount: number;
  answerGiven: string;
  examUUID: string;
  prevQuestionData:
  {
    pageNumber: number;
    questionUUID: any
  }[]

}

let PreviosCount: number;


export default class QuizQuestion extends React.Component<Props, State> {
  selected: any;
  style: any;
  options: any;

  constructor(props: Props) {
    super(props);

    this.state = {
      disabled: false,
      isLoading: true,
      examQuestionDetails: {},
      isLastRecord: false,
      description: "",
      givenAnswer: "",
      pageCount: 0,
      options: [],
      selectedOption: "",
      timer: 0,
      time: "",
      categoryType: "",
      status: "",
      size: "",
      isFinished: false,
      appeared: {},
      updateTimer: 0,
      EXAMUUID: "",
      PARTICIPANTUUID: "",
      PAGE: 0,
      QUESTIONUUID: "",
      prevPageCount: 0,
      answerGiven: "",
      examUUID: "",
      prevQuestionData: [

      ]

    };
  }

  componentDidMount(): void {
    this._getExamQuestionHandler();
    this._getExamListHandler();
    // this._getPrevExamQuestionHandler();
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillMount(): void {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton() {
    return true;
  }

  _getExamListHandler(): void {
    // debugger;
    GetExamDetailsAPI(this.props.route.params?.uuid)
      .then(response => {
        const statusCode = response.status;
        const data = statusCode === 200 ? response.json() : null;

        return Promise.all([statusCode, data]).then(res => ({
          statusCode: res[0],
          data: res[1]
        }));
      })
      .then((res: {
        statusCode: number,
        data: {
          payload: {
            response: any,
          }
          message: string
        }
      }) => {
        // debugger;
        if (res.statusCode === 200) {

          if (res.data.payload.response.schedule[0].hasOwnProperty("studentExam")) {
            this.setState({
              appeared: res.data.payload.response.schedule[0].studentExam.status === "APPEARED" || res.data.payload.response.schedule[0].studentExam.status === "COMPLETED"
            })
          }
          // console.log(res.data.payload.response.schedule[0], "data")
        }
      });
  }



  _getExamQuestionHandler(): void {
    const params = {
      limit: 1,
      page: this.state.pageCount + 1,
    };

    // console.log("flag page no ", flag ? PreviosCount : this.state.pageCount + 1)

    console.log("current page", params.page)

    this.setState({
      EXAMUUID: this.props.route.params?.examUuid,
      PARTICIPANTUUID: this.props.route.params?.participantUuid,
      // PAGE: this.state.pageCount
    })


    if (!this.state.isFinished)
      GetExamQuestionAPI(
        this.props.route.params?.examUuid,
        this.props.route.params?.participantUuid,
        params
      )
        .then((response) => {
          const statusCode = response.status;
          const data = statusCode === 200 ? response.json() : [];
          return Promise.all([statusCode, data]).then((res) => ({
            statusCode: res[0],
            data: res[1],
          }));
        })
        .then(
          (res: {
            statusCode: number;
            data: {
              payload: {
                isLastRecord: boolean;
                categoryType: string;
                description: string;
                response: any[];
                time: string;
                timePerQuestion: {
                  timePerQuestion: number;
                };
              };
              message: string;
            };
          }) => {
            // debugger;
            console.log(res, "get quess")
            if (res.data.payload.response.length !== 0) {
              this.setState({
                disabled: false,
                pageCount: this.state.pageCount + 1,
                // selectedOption: "",
                // isLoading: false,
                examQuestionDetails: (res.data.payload.response[0] = {
                  ...res.data.payload.response[0],
                  examQuestions: {
                    ...res.data.payload.response[0].examQuestions,
                    html: res.data.payload.response[0].examQuestions.title,
                  },
                }),
                isLastRecord: res.data.payload.isLastRecord,
                time: res.data.payload.time,
                description:
                  res.data.payload.response[0].examQuestions.description,
                categoryType: res.data.payload.categoryType,
                options: res.data.payload.response[0].examQuestions.options.map(
                  (option: any) => {
                    return {
                      name: option.text,
                      value: option.key,
                      image: option.image || "",
                    };
                  }
                ),
                timer: res.data.payload.timePerQuestion.timePerQuestion,
                QUESTIONUUID: res.data.payload.response[0].examQuestions.uuid,
                examUUID: res.data.payload.response[0].examUUID,



              }, () => {
                this.setState({
                  isLoading: false,
                  prevQuestionData: [...this.state.prevQuestionData, {
                    pageNumber: this.state.pageCount,
                    questionUUID: this.state.examQuestionDetails.examQuestions?.uuid
                  }]
                })
              }
              )
              console.log(this.state.prevQuestionData, "store Data")


            }
          }
        );
  }

  _getPrevExamQuestionHandler(): void {
    this.setState({
      isLoading: true
    })
    const questionIndex = this.state.prevQuestionData.findIndex((ques) => ques.pageNumber == this.state.pageCount)
    let questionUUID: string = this.state.prevQuestionData[questionIndex].questionUUID;

    console.log("questionUUID-------->", questionUUID)

    if (questionUUID)
      GetPrevExamQuestionAPI(this.props.route.params?.participantUuid, questionUUID)

        .then((response) => {
          const statusCode = response.status;
          const data = statusCode === 200 ? response.json() : [];
          return Promise.all([statusCode, data]).then((res) => ({
            statusCode: res[0],
            data: res[1],
          }));
        })
        .then(
          (res: {
            statusCode: number;
            data: {
              payload: {
                givenAnswer: any;
                question: any;
                examQuestions: any;
              };
              message: string;
            };
          }) => {
            // debugger;
            console.log('Prev Ques', res)

            if (res.statusCode === 200) {

              this.setState({
                disabled: false,
                isLastRecord: false,
                examQuestionDetails: (res.data.payload.question.examQuestions = {
                  ...res.data.payload.question.examQuestions,
                  examQuestions: {
                    ...res.data.payload.question.examQuestions,
                    html: res.data.payload.question.examQuestions.title,
                  },
                }),
                options: res.data.payload.question.examQuestions.options.map(
                  (option: any) => {
                    return {
                      name: option.text,
                      value: option.key,
                      image: option.image || "",
                    };
                  }
                ),

                answerGiven: res.data.payload.givenAnswer.givenAnswer,
                selectedOption: res.data.payload.givenAnswer.givenAnswer || "",
                isLoading: false

              })
              console.log(this.state.answerGiven, "answer given")

            }
            else {
              console.log("previous page error")
            }
          }
        );
  }

  _getPrevNextExamQuestionHandler(): void {

    const questionIndex = this.state.prevQuestionData.findIndex((ques) => ques.pageNumber == this.state.pageCount + 1)
    let questionUUID: string = this.state.prevQuestionData[questionIndex].questionUUID;

    console.log("questionUUID-------->", questionUUID)

    if (questionUUID)
      // debugger;
      GetPrevExamQuestionAPI(this.props.route.params?.participantUuid, questionUUID)

        .then((response) => {
          const statusCode = response.status;
          const data = statusCode === 200 ? response.json() : [];
          return Promise.all([statusCode, data]).then((res) => ({
            statusCode: res[0],
            data: res[1],
          }));
        })
        .then(
          (res: {
            statusCode: number;
            data: {
              givenAnswer: any;
              payload: {
                givenAnswer: any;
                examQuestions: any;
              };
              message: string;
            };
          }) => {
            // debugger;
            console.log('Prev Next Ques', res)

            if (res.statusCode === 200) {
              this.setState({
                disabled: false,
                answerGiven: res.data.payload.givenAnswer.givenAnswer,
                selectedOption: res.data.payload.givenAnswer.givenAnswer || ""
              })
              console.log(this.state.answerGiven, "answer given")

            }
            else {
              console.log("previous page error")
            }
          }
        );
  }

  _sendAnswerHandler(): void {
    this.setState({
      disabled: true,
      isLoading: true
    })
    if (this.state.isLastRecord) {
      this.props.navigation.navigate("QuizResult", {
        participantUuid: this.props.route.params?.participantUuid,
      });
    }
    const payload = {

      categoryType: this.state.categoryType,
      description: this.state.description,
      examUUID: this.state.examUUID,
      givenAnswer: this.state.selectedOption || "",
      isLastRecord: this.state.isLastRecord,
      options: this.state.examQuestionDetails.examQuestions?.options,
      questionUUID: this.state.examQuestionDetails.examQuestions?.uuid,
      time: this.state.time,
      status: !!this.state.selectedOption ? "ANSWERED" : "SKIPPED",

    };
    if (!this.state.isFinished)
      AnswerAPI(this.props.route.params?.participantUuid, payload)
        .then((response) => {
          const statusCode = response.status;
          const data = statusCode === 200 ? response.json() : null;

          return Promise.all([statusCode, data]).then((res) => ({
            statusCode: res[0],
            data: res[1],
          }));
        })
        .then(
          (res: {
            statusCode: number;
            data: {
              payload: {
                response: any;
              };
              message: string;
            };
          }) => {
            console.log("submitted answer///////////", res)
            if (res.statusCode === 200) {

              this.setState({
                selectedOption: ""
              })

              this._getExamQuestionHandler();
              this._getPrevNextExamQuestionHandler();
            }
            else if (res.statusCode === 400) {
              this.props.navigation.navigate("QuizResultTimeout", {
                participantUuid: this.props.route.params?.participantUuid,
              });
            }
            else if (res.statusCode === 404) {
              this._getExamQuestionHandler();

            }
          }
        );
    if (this.state.isLastRecord) {
      this.setState({ isFinished: true })
    }

  }


  _sendTimeoutAnswerHandler(): void {
    this.setState({
      disabled: true,
      isLoading: true
    })
    //console.log("event",e)
    if (this.state.isLastRecord) {
      this.props.navigation.navigate("QuizResult", {
        participantUuid: this.props.route.params?.participantUuid,
      });
    }
    const payload = {

      categoryType: this.state.categoryType,
      description: this.state.description,
      examUUID: this.state.examQuestionDetails.examUUID,
      givenAnswer: "",
      isLastRecord: this.state.isLastRecord,
      options: this.state.examQuestionDetails.examQuestions?.options,
      questionUUID: this.state.examQuestionDetails.examQuestions?.uuid,
      time: this.state.time,
      status: "TIME_OUT",

    };
    if (!this.state.isFinished)
      AnswerAPI(this.props.route.params?.participantUuid, payload)
        .then((response) => {
          const statusCode = response.status;
          const data = statusCode === 200 ? response.json() : null;

          return Promise.all([statusCode, data]).then((res) => ({
            statusCode: res[0],
            data: res[1],
          }));
        })
        .then(
          (res: {
            statusCode: number;
            data: {
              payload: {
                response: any;
              };
              message: string;
            };
          }) => {
            console.log("Timeout answer///////////", res)
            if (res.statusCode === 200) {
              this._getExamQuestionHandler();
            }
            if (res.statusCode === 400) {
              this.props.navigation.navigate("QuizResultTimeout", {
                participantUuid: this.props.route.params?.participantUuid,
              });
            }
          }
        );
    if (this.state.isLastRecord) {
      this.setState({ isFinished: true })
    }

  }



  render(): React.ReactNode {
    // if (this.state.isLoading) {
    //   <ActivityIndicator size="large" />;
    // }
    // console.log(this.state.timer, "timmmeee")

    return (
      <SafeAreaView style={styles.screen}>
        {
          this.state.isLoading ?
            <View style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              height: Dimensions.get('window').height / 2
            }}>
              <ActivityIndicator
                size={'large'}
                color={Colors.primary}
              />
            </View>
            :
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.root}>
                <View style={{ alignItems: "center" }}>
                  {this.state.timer !== 0 && (
                    <>
                      <Text
                        style={{ color: "red", fontWeight: "500", marginBottom: 5 }}
                      >
                        Time remaining
                      </Text>
                      <CountdownCircleTimer
                        isPlaying
                        size={120}
                        key={this.state.pageCount}
                        duration={this.state.timer}
                        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                        colorsTime={[20, 5, 2, 0]}
                        onComplete={() => this._sendTimeoutAnswerHandler()}
                        onUpdate={(e) => {
                          this.setState({ updateTimer: e })
                        }}
                      >
                        {({ remainingTime }) => (
                          <Text style={{ fontSize: 30 }}>{remainingTime}</Text>
                        )}
                      </CountdownCircleTimer>
                    </>
                  )}
                </View>
                <View style={{ alignItems: "center", marginTop: 10 }}>
                  <Text style={{ fontWeight: "500" }}>
                    Question: {this.state.pageCount}
                  </Text>
                  <RenderHtml
                    source={{
                      html:
                        this.state.examQuestionDetails?.examQuestions?.html || "",
                    }}
                    contentWidth={Dimensions.get("window").width}
                  />
                </View>

                {this.state.options.map((option: any, index: number) => {
                  //   console.log("loop ", option);
                  return (
                    <RNRadioBox
                      key={index}
                      item={option}
                      status={
                        this.state.answerGiven ?
                          (this.state.answerGiven === option.name)
                          :
                          (option.name || option.value) === this.state.selectedOption
                      }
                      onPress={(value: string) =>
                        this.setState({
                          selectedOption: value || option.value,
                          answerGiven: ""
                        })
                      }
                    />
                  );
                })}

                <View
                  style={{ flexDirection: 'row', justifyContent: 'center' }}
                >

                  {(this.state.timer === 0 && this.state.pageCount > 1) && (

                    <TouchableOpacity
                      style={{
                        borderWidth: 2,
                        borderColor: "#1E276F",
                        width: 100,
                        height: 40,
                        borderRadius: 10,
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: 20,
                        marginRight: config.deviceWidth * 0.3
                      }}
                      onPress={() => {
                        this.setState({
                          pageCount: this.state.pageCount - 1
                        }, () => { this._getPrevExamQuestionHandler() })
                      }}
                    >
                      <Text style={{ color: "#1E276F" }}>Prev</Text>
                    </TouchableOpacity>

                  )}

                  <TouchableOpacity
                    style={{
                      backgroundColor: "#1E276F",
                      width: 100,
                      height: 40,
                      borderRadius: 10,
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: 20,
                    }}
                    onPress={this._sendAnswerHandler.bind(this)}
                    disabled={this.state.disabled}
                  >
                    <Text style={{ color: "white" }}>Next</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
        }
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#E5E5E5",
  },
  root: {
    padding: 30,
  },
  item: {
    backgroundColor: "#FFFFFF",
    width: 200,
    borderRadius: 14,
    marginHorizontal: 10,
  },
});

