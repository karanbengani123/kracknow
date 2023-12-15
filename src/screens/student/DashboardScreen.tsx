import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Pressable,
  ImageSourcePropType,
  StatusBar,
} from "react-native";
import { withNavigationFocus } from 'react-navigation';

import Colors from "../constants/Colors";

import Ionicons from "react-native-vector-icons/Ionicons";
import { DrawerActions } from "react-navigation-drawer";
import {
  HeaderNavigatorStyles,
  NoHeaderStyle,
} from "../../screens/styles/HeaderNavigatorStyles";
import RecommendedExams from "./RecommendedExams";
import { TabStyle, TabUnderlineStyle } from "../styles/TabStyle";
import RecommendedQuiz from "./RecommendedQuiz";
import UpcomingExams from "./UpcomingExams";
import UpcomingTournaments from "./UpcomingTournaments";
import UpcomingQuizzes from "./UpcomingQuizzes";
import Footer from "./Footer";
import { useIsFocused } from '@react-navigation/native';

import {
  GetCompletedExamListAPI,
  GetStudentDetailsAPI,
} from "../../api-services/User.api";
import moment from "moment";
import { GetBannerImageUrls } from "../../api-services/User.api";
import UpcomingMock from "./UpcomingMock";
import Header from "./Header";
// import ImagesSwiper from "react-native-image-swiper";

import { Carousel } from "rn-image-carousel";
import UpcomingTournament from "./UpcomingTournament";


interface Props {
  navigation: any;
  route: any
}

interface State {
  firstName: string;
  selectedTab: string;
  selectedOrganizationTypeList: string[];
  selectedCityList: {
    uuid: string;
    name: string;
  }[];
  selectedCategoryList: {
    uuid: string;
    name: string;
  }[];
  tabList: string[];
  filterCount: number;
  search: string;
  currentTab: "Received" | "Sent";
  showFilterModal: boolean;
  organizationType: string;
  selectedFooter: string;
  completedList: any;
  imageUrls: {
    data: {
      uri: string
    },
    id: any
  }[]

}

export default class DashboardScreen extends React.Component<Props, State> {
  private focusListener: any;

  private _tabListRef: any;
  constructor(props: Props) {
    super(props);

    this.state = {
      firstName: "",
      selectedTab:
        this.props.route.params?.tab || "Recommended Exams",
      selectedOrganizationTypeList: [],
      selectedCityList: [],
      selectedCategoryList: [],
      tabList: [
        "Recommended Exams",
        "Upcoming Exams",
        "Recommended Quiz",
        "Upcoming Tournaments",
        "Upcoming Quizzes",
      ],
      filterCount: 0,
      search: "",
      currentTab: "Received",
      showFilterModal: false,
      organizationType: "",
      selectedFooter: "Home",
      completedList: {},
      imageUrls: [{
        data: {
          uri: ""
        },
        id: ""
      }]
    };
  }


  componentDidMount(): void {
    this._getCompletedExamListHandler();
    // this.callApis();
    this._getStudentListHandler();
    this.getBanner()
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this._getCompletedExamListHandler();
      // this.callApis();
      this._getStudentListHandler();
      this.getBanner()
    })
  }



  componentDidUpdate(prevProps: Props) {
    const { isFocused } = this.props;

    if (isFocused && !prevProps.isFocused) {
      // Your code to execute when the screen becomes focused
    }
  }


  componentWillUnmount(): void {
    if (this.focusListener)
      this.focusListener();
    this.setState = () => {
      return;
    };
    // this.focusListener.remove();
  }


  _toggleTabHandler(tabName: string): void {
    this.setState({
      selectedTab: tabName,
    });

  }

  _getCompletedExamListHandler(): void {
    // debugger;

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
              respose: any;
              response: any[];
            };
            message: string;
          };
        }) => {
          // debugger;
          this.setState({
            completedList: res.data.payload.response.slice(0, 3),
          });
        }
      );
  }



  _renderItems = ({ item }: { item: any }) => (
    <TouchableOpacity
      activeOpacity={1}
      style={[
        TabStyle.tab,
        item === this.state.selectedTab && TabStyle.activeTab,
      ]}
      onPress={() => this._toggleTabHandler(item)}
    >
      <Text
        style={[
          TabStyle.tabText,
          item === this.state.selectedTab && TabStyle.activeTabText,
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  renderItem1 = ({ item }: any) => (
    <Pressable>
      <View style={styles.item1}>
        <View style={styles.action}>
          {/* <Text>{item.index}</Text> */}
          {/* <Image source={require("../../../assets/images/Group54.png")} Leaderboard1/>
                                <Image style={{ position: 'absolute' }} source={require("../../../assets/images/Group53.png")} /> */}
          <Image
            style={{ height: 60, width: 70, borderRadius: 5 }}
            source={
              (item.examBanner.phoneBanner
                ? { uri: item.examBanner.phoneBanner }
                : require("../../../assets/images/defaultbanner.jpg")) as ImageSourcePropType
            }
          />
          <View style={{ flexDirection: "column", flex: 1 }}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "500",
                color: "#0E242C",
                fontStyle: "normal",
                marginLeft: 5,
                marginTop: 5,
              }}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {item.title}
            </Text>
            {/* <Text
              style={{
                color: '#686A7B',
                fontSize: 12,
                marginLeft: 5,
                fontWeight: '500'
              }}>ID: {item.identifier}</Text> */}
            <Text
              style={{
                fontSize: 10,
                fontWeight: "400",
                color: "#00000",
                opacity: 0.6,
                marginTop: 10,
                marginLeft: 5,
              }}
            >
              Date:{" "}
              {moment(new Date(item.schedule[0].startTime))
                .utcOffset("")
                .format("ddd, DD-MMM-YYYY, hh:mm a")}
            </Text>
          </View>
          {/* <View style={{alignSelf:'center', marginLeft:70}}>

                    <Image style={{  }} source={require("../../../assets/images/Checklist.png")} />
                </View> */}
        </View>
      </View>
    </Pressable>
  );

  _getStudentListHandler(): void {
    // debugger;
    GetStudentDetailsAPI()
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
              student: any;
              respose: any;
              response: any[];
            };
            message: string;
          };
        }) => {
          // debugger; 
          // let studentData = res.data.payload.student;
          // console.log("selectes city", studentData.City_City.city);
          this.setState({
            firstName: res.data.payload.student.firstName,
          });

          // debugger;
        }
      );
  }

  getBanner(): void {
    GetBannerImageUrls()
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
            lists: any;
            response: any[],
          }
          message: string
        }
      }) => {
        // debugger;
        const urls: string[] = res.data.payload.lists.rows
          .filter((imageObj: any) => imageObj.tag === "MOBILE")
          .map((imageUrl: any) => imageUrl.url);
        if (urls.length)
          this.setState({
            imageUrls: urls.map((obj, key) => {
              return { data: { uri: obj }, id: key }
            }),
          });

      });
  }

  //    imagesData = [
  //     {data: { uri: this.s }, id: "img-1"}
  // ];





  render(): React.ReactNode {
    return (
      <>
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar backgroundColor="#1E276F" />
          <Header navigation={this.props.navigation} />
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
              <Text style={styles.heading}>Hi, {this.state.firstName}</Text>
              {/* <Text style={styles.heading1}>Here your progress last week</Text> */}
            </View>



            <Carousel
              style={styles.carousel}
              imagesData={this.state.imageUrls}
              autoPlay={true}
            // onImagePress={onImagePress} 
            />



            <View style={styles.root}>

              <Text
                style={{
                  fontSize: 14,
                  paddingTop: 30,
                  color: "#0A1042",
                  fontWeight: "500",
                  paddingBottom: 10,
                }}
              >
                Recommended Exams
              </Text>
              <RecommendedExams navigation={this.props.navigation} />
              {/* <RecommendedExams navigation={this.props.navigation} /> */}
              {/* <UpcomingExams navigation={this.props.navigation} /> */}

              <Text
                style={{
                  fontSize: 14,
                  paddingTop: 30,
                  color: "#0A1042",
                  fontWeight: "500",
                  paddingBottom: 10,
                }}
              >
                Upcoming Exams
              </Text>

              <UpcomingExams navigation={this.props.navigation} />

              <Text
                style={{
                  fontSize: 14,
                  paddingTop: 30,
                  color: "#0A1042",
                  fontWeight: "500",
                  paddingBottom: 10,
                }}
              >
                Upcoming Quizzes
              </Text>
              <UpcomingQuizzes navigation={this.props.navigation} />


              <Text
                style={{
                  fontSize: 14,
                  paddingTop: 30,
                  color: "#0A1042",
                  fontWeight: "500",
                  paddingBottom: 10,
                }}
              >
                Upcoming Mock-tests
              </Text>
              <UpcomingMock navigation={this.props.navigation} />


              <Text
                style={{
                  fontSize: 14,
                  paddingTop: 30,
                  color: "#0A1042",
                  fontWeight: "500",
                  paddingBottom: 10,
                }}
              >
                Upcoming Tournaments
              </Text>
              <UpcomingTournament navigation={this.props.navigation} />


            </View>
          </ScrollView>

          <Footer tab="Home" navigation={this.props.navigation} />
        </SafeAreaView></>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    // backgroundColor: Colors.white
    backgroundColor: "white",
  },
  root: {
    // alignItems: 'center',
    // flex:1,
    padding: 20,
    // backgroundColor: 'white'
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
    paddingBottom: 5,
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
    flex: 1,
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
    width: 280,
    borderRadius: 14,
    marginHorizontal: 10,
  },

  item1: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    paddingTop: 10,
    marginVertical: 10,
    width: 370,
    borderRadius: 14,
    flex: 1,
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
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  carousel: {
    width: "100%",
    height: 150
  }
});
