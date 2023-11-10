import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Pressable,
  SafeAreaView,
  FlatList,
} from "react-native";

import Colors from "../../screens/constants/Colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  GetLeaderboardAPI,
  GetScheduleListAPI,
} from "../../api-services/User.api";
import { DataTable } from "react-native-paper";
import HeaderBack from "./HeaderBack";

interface Props {
  navigation: any;
  route: any
}

interface State {
  scheduleList: any;
  result: any;
  examLeaderboard: any[];
}

export default class LeaderboardResult extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      scheduleList: {},
      result: {},
      examLeaderboard: [],
    };
  }

  componentDidMount(): void {
    this._getLeaderboardHandler();
    this._getScheduleListHandler();
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

  _getLeaderboardHandler(): void {
    // debugger;
    GetLeaderboardAPI(this.props.route.params?.uuid)
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
              // isLastRecord: boolean; 
              response: any[];
            };
            message: string;
          };
        }) => {
          // debugger;
          let rankSort = res.data.payload.response.sort(
            function compare(a: any, b: any) {
              var rankA: any = (a.rank)
              var rankB: any = (b.rank)
              return rankA - rankB;
            }
          )
          this.setState({
            examLeaderboard: rankSort
            // .map((response) => {
            //   return {
            //     studentName: response.studentName,
            //     marks: response.marks,
            //     rank: response.rank,
            //     prizeAmount: response.prizeAmount,
            //   };
            // }),
          });
        }
      );
  }

  renderItem = ({ item, index }: any) => (
    <View style={{ paddingTop: 20 }}>
      <Pressable>
        <View style={styles.item1}>
          <View style={styles.action}>
            <Text
              style={{
                color: "#686A7B",
                fontSize: 13,
                marginLeft: 5,
                fontWeight: "500",
              }}
            >
              {item.rank}
            </Text>
            {/* <Text
                            style={{
                                color: '#0A1042',
                                fontSize: 14,
                                marginLeft: 5,
                                paddingTop: 10,
                                fontWeight: '500'
                            }}>01</Text> */}
            {/* <Image style={{ marginLeft: 7, height: 40, width: 40 }} source={require("../../../assets/images/mann.png")} /> */}
            <Text
              style={{
                color: "#686A7B",
                fontSize: 13,
                marginLeft: 5,
                fontWeight: "500",
              }}
            >
              {item.label}{" "}
            </Text>
            <Text
              style={{
                color: "#686A7B",

                fontSize: 12,
                marginLeft: 5,
                fontWeight: "500",
              }}
            >
              {item.marks}
            </Text>

            <Text
              style={{
                color: "#686A7B",

                fontSize: 12,
                marginLeft: 5,
                fontWeight: "500",
              }}
            >
              {item.prize}
            </Text>

            {/* <Image style={{ left: 190, marginTop: 5 }} source={require("../../../assets/images/1st.png")} /> */}
          </View>
        </View>
      </Pressable>
    </View>
  );

  render(): React.ReactNode {
    return (
      <SafeAreaView>
          <HeaderBack navigation={this.props.navigation} name="" />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.root}>
            {/* <Text style={{ fontWeight: '500', fontSize: 18, color: '#0A1042', }}>Leaderboard</Text> */}

            <DataTable>
              <DataTable.Header>
                <DataTable.Title style={{ flex: 1, }}>Rank</DataTable.Title>
                <DataTable.Title style={{ flex: 1.5, }}>Name</DataTable.Title>
                <DataTable.Title style={{ flex: 1, }}>Scrore</DataTable.Title>
                <DataTable.Title style={{ flex: 1, }}>Prize (in Rs)</DataTable.Title>
              </DataTable.Header>

              {
                this.state.examLeaderboard.map(data => (
                  <DataTable.Row>
                    <DataTable.Cell style={{ flex: 1, }}>{data.rank}</DataTable.Cell>
                    <DataTable.Cell style={{ flex: 1.5, }}>{data.studentName}</DataTable.Cell>
                    <DataTable.Cell style={{ flex: 1, }}>{data.marks}</DataTable.Cell>
                    <DataTable.Cell style={{ flex: 1, }}>{data.prizeAmount}</DataTable.Cell>
                  </DataTable.Row>
                ))
              }

            </DataTable>

          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  root: {
    // alignItems: "center",
    padding: 10,
  },
  searchSection: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    backgroundColor: "#fff",
    color: "#424242",
  },
  heading: {
    fontSize: 18,
    paddingTop: 5,
    color: "#0A1042",
    fontWeight: "500",
  },
  heading1: {
    color: "#686A7B",
    fontSize: 12,
    fontWeight: "500",
  },
  heading3: {
    fontSize: 18,
    paddingTop: 30,
    color: "#0A1042",
    fontWeight: "500",
  },
  badge: {
    width: 56,
    height: 56,
    backgroundColor: "#9D9D9D",
    borderRadius: 20,
  },
  box: {
    backgroundColor: "#3785E010",
    borderRadius: 14,
    width: 320,
    height: 93,
    marginTop: 30,
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  boxtext: {
    fontWeight: "600",
    fontSize: 18,
    color: "#3F9AE0",
    paddingRight: 30,
  },
  action: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  action_box: {
    width: 150,
    height: 93,
    borderRadius: 14,
    margin: 10,
    marginTop: 25,
    paddingLeft: 20,
    paddingTop: 20,
  },
  action_box_text: {
    fontWeight: "bold",
    fontSize: 24,
    color: "#FFFFFF",
  },
  action_box_smalltext: {
    fontWeight: "500",
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.6)",
  },
  item3: {
    backgroundColor: "#1E276F",
    padding: 20,
    paddingTop: 10,
    // marginVertical: 10,
    width: 370,
    borderRadius: 14,
  },
  item: {
    backgroundColor: "#FFFFFF",
    // padding: 20,
    // paddingTop: 10,
    // marginVertical: 10,
    width: 200,
    borderRadius: 14,
    marginHorizontal: 10,
  },

  item1: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    paddingTop: 10,
    // marginVertical: 10,
    width: 370,
    borderRadius: 14,
    justifyContent: "space-evenly",
    display: "flex",
  },
  profile: {
    flexDirection: "row",
    alignSelf: "flex-end",
  },
  bellicon: {
    marginBottom: 2,
    marginRight: 15,
    alignSelf: "flex-end",
  },
  adminlogo: {
    alignSelf: "flex-end",
  },
});
