import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Pressable,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
import {
  GetCompletedExamListAPI,
  GetExamDetailsAPI,
  GetMarksAPI,
  GetQuestionsExamAPI,
  GetScheduleListAPI,
} from "../../api-services/User.api";
import HeaderBack from "./HeaderBack";
// import Pie from 'react-native-pie'
// import PieChart from 'react-native-pie-chart'

interface Props {
  navigation: any;
  route: any
}

interface State {
  scheduleList: any;
  result: any;
  examList: any;
  completedList: any;
  examStatus: any;
  status: any
}

export default class QuizDoneResultScreen extends React.Component<
  Props,
  State
> {
  constructor(props: Props) {
    super(props);

    this.state = {
      scheduleList: {},
      result: {},
      examList: {},
      completedList: {},
      examStatus: {},
      status: {}
    };
  }
  componentDidMount(): void {
    this._getMarksHandler();
    this._getScheduleListHandler();
    // this._getExamListsHandler()
    // this._getCompletedExamListHandler()
  }

  componentWillUnmount(): void { }

  _getScheduleListHandler(): void {
    GetScheduleListAPI()
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
              response: any[];
            };
            message: string;
          };
        }) => {
          // debugger;
          this.setState({
            scheduleList: res.data.payload.response,
          });
        }
      );
  }

  _getExamListsHandler(): void {
    // debugger;
    GetQuestionsExamAPI(this.props.route.params?.participantUuid)
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
              response: any[];
            };
            message: string;
          };
        }) => {
          // debugger;
          this.setState({
            examList: res.data.payload.response.map((response) => {
              return {
                questionUUID: response.questionUUID,
              };
            }),
          });
        }
      );
  }

  _getCompletedExamListHandler(): void {
    GetCompletedExamListAPI()
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
              response: any[];
            };
            message: string;
          };
        }) => {
          // debugger;
          this.setState({
            completedList: res.data.payload.response,
            examStatus: res.data.payload.response.map((response) => {
              return {
                status: response.schedule[0].status,
              };
            }),
          });
          // debugger;
        }
      );
  }

  _getMarksHandler(): void {
    // debugger;
    console.log(this.props.route.params)
    GetMarksAPI(this.props.route.params?.participantUuid[0])
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
              scheduleData: any;
              response: any[];
            };
            message: string;
          };
        }) => {
          // debugger;
          this.setState({
            result: res.data.payload.response,
            status: res.data.payload.scheduleData.status
          });
        }
      );
  }



  render(): React.ReactNode {

    const widthAndHeight = 250
    const series = [123, 589]
    const sliceColor = ['#F44336', '#4CAF50',]

    return (
      <SafeAreaView>
      <HeaderBack navigation={this.props.navigation} name="" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.root}>
          <View style={{ alignItems: "center", marginTop: 10 }}>
            <Text style={{ fontWeight: "500", fontSize: 18, color: "#0A1042" }}>
              Your Score: {this.state.result.marks}{" "}
            </Text>
          </View>

          <View
            style={{
              justifyContent: "space-between",
              display: "flex",
              marginTop: 50,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                display: "flex",
                justifyContent: "space-around",
                marginBottom: 50,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Image
                  style={{ height: 20, width: 20, marginRight: 5 }}
                  source={require("../../../assets/images/correct.png")}
                ></Image>
                <Text
                  style={{ fontWeight: "500", fontSize: 14, color: "#0A1042" }}
                >
                  Correct: {this.state.result.correctCount}
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Image
                  style={{ height: 20, width: 20, marginRight: 5 }}
                  source={require("../../../assets/images/remove.png")}
                ></Image>
                <Text
                  style={{ fontWeight: "500", fontSize: 14, color: "#0A1042" }}
                >
                  Wrong: {this.state.result.inCorrectCount}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Image
                  style={{ height: 20, width: 20, marginRight: 5 }}
                  source={require("../../../assets/images/clock.png")}
                ></Image>
                <Text
                  style={{ fontWeight: "500", fontSize: 14, color: "#0A1042" }}
                >
                  Timeout: {this.state.result.timeOut}
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Image
                  style={{
                    height: 15,
                    width: 15,
                    marginRight: 5,
                    marginTop: 4,
                  }}
                  source={require("../../../assets/images/next.png")}
                ></Image>
                <Text
                  style={{ fontWeight: "500", fontSize: 14, color: "#0A1042" }}
                >
                  Skipped: {this.state.result.skipped}
                </Text>
              </View>
            </View>
          </View>
          {/* <Text>hello{this.state.examStatus.status }</Text> */}

          {/* <View style={{alignSelf:'center', marginTop:40}}>
            <PieChart
              widthAndHeight={widthAndHeight}
              series={series}
              sliceColor={sliceColor}
              doughnut={true}
              coverRadius={0.45}
              coverFill={'#FFF'}
            />
          </View> */}


          {this.state.status === "SCHEDULED" &&
            <View style={{ alignItems: "center", marginTop: 100 }}>
              <Text style={{ color: 'red' }}>*Review will be published after completion of the exam</Text>
            </View>
          }

          {this.state.status === "COMPLETED" &&

            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                style={{
                  backgroundColor: "#1E276F",
                  display: "flex",
                  alignItems: "center",
                  padding: 10,
                  marginTop: 50,
                  borderRadius: 10,
                  width: "30%",

                }}
                onPress={() =>
                  this.props.navigation.navigate("ExamDoneResult2", {
                    participantUuid:
                      this.props.route.params?.participantUuid,
                  })
                }
              >
                <Text style={{ color: "white" }}>Review</Text>
              </TouchableOpacity>
            </View>

          }
        </View>
      </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    // backgroundColor: Colors.white
  },
  root: {
    flex: 1,
    padding: 10,
    justifyContent: "space-between",
    display: "flex",
    marginVertical: 50,
  },
});
