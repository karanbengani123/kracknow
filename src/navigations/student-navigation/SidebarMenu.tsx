import AsyncStorage from "@react-native-async-storage/async-storage";
import * as React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  SafeAreaView,
  BackHandler
} from "react-native";
import { deleteTokenAPI, GetStudentDetailsAPI } from "../../api-services/User.api";
import Colors from "../../screens/constants/Colors";
import Environment from "../../screens/constants/Environment";
import DeviceInfo from 'react-native-device-info';
import { DrawerActions } from 'react-navigation-drawer';

// import RNExitApp from 'react-native-exit-app';


interface Props {
  navigation: any;
}

interface State {
  firstName: string;
  lastName: string;
  profilePic: string;
}

export default class SidebarMenu extends React.Component<Props, State> {
   private focusListener: any;

  constructor(props: any) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      profilePic: "",
    };
  }

  componentDidMount() {
    this._getStudentListHandler();
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
    this._getStudentListHandler();
    })
  }

  componentWillUnmount(): void {
    this.setState = () => {
      return;
  };
  // this.focusListener.remove();
  }

  _logoutHandler() {
    AsyncStorage.setItem(Environment.PROJECT + "token", "").then(e => {
      console.log("token cleared")
    })
    
    this._deleteTokenHandler()
    
    console.log(AsyncStorage.getItem(Environment.PROJECT + "token"), "/////////////////")

  }

  _deleteTokenHandler(): void {
    this.props.navigation.closeDrawer()

    let deviceId = DeviceInfo.getDeviceId();

    console.log('deviceIDDDD', deviceId)

    let id = {
      deviceId: deviceId
    }
    console.log(id, "idddddddd")
    deleteTokenAPI(id)
      .then((response) => {
        // debugger;
        const statusCode = response.status;
        const data = response.json();

        return Promise.all([statusCode, data]).then((res) => ({
          statusCode: res[0],
          data: res[1],
        }));
      })
      .then(
        (res: {
          statusCode: number;
          data: { payload: any; message: string };
        }) => {
          console.log(res, "token delete")
          //  debugger
          if (res.statusCode === 200) {
            AsyncStorage.setItem(Environment.PROJECT + "token", "").then(e => {
              console.log("token cleared")
            })
            this.props.navigation.replace('Authentication')}
           else {
            console.log('error')
          }
        }
      );

  }

  handleBackButton() {
    // this.props.navigation.navigate("Exam");
    return true;
}

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
          // let studentData = res.data.payload.student;
          // console.log("selectes city", studentData.City_City.city);
          this.setState({
            firstName: res.data.payload.student.firstName,
            lastName: res.data.payload.student.lastName,
            profilePic: res.data.payload.student.profilePic,
          });

          // debugger;
        }
      );
  }

  render() {
    return (
      <SafeAreaView style={styles.screen}>
        <ScrollView style={styles.container}>
          <View style={{ flexDirection: "row", marginBottom: 2, marginTop: 5 }}>
            <Image
              style={{ height: 30, width: 25, marginTop: 2 }}
              source={require("../../../assets/images/Krackow.png")}
            ></Image>

            <Text
              style={{
                fontSize: 18,
                fontWeight: "500",
                marginLeft: 15,
                marginTop: 3,
              }}
            >
              KRACKNOW
            </Text>
          </View>
          <View style={styles.sectionSeparator} />

          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Image
              style={{ height: 70, width: 70, borderRadius: 40 }}
              source={
                (this.state.profilePic
                  ? { uri: this.state.profilePic }
                  : require("../../../assets/images/defaultbanner.jpg")) as ImageSourcePropType
              }
            ></Image>
            <View style={{ flexDirection: "column" }}>
              <Text
                style={{
                  fontSize: 16,
                  marginLeft: 10,
                  marginTop: 20,
                  fontWeight: "600",
                }}
              >
                {this.state.firstName} {this.state.lastName}
              </Text>
              {/* <Text style={{ fontSize: 13,marginLeft: 20,}}>Id:100</Text> */}
            </View>
          </View>

          <View style={{ marginTop: 15 }}>
            <View style={styles.sectionSeparator} />
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.navItemContainer}
              onPress={() => this.props.navigation.navigate("Search")}
            >
              <Image
                style={{ height: 20, width: 20, marginTop: 2 }}
                source={require("../../../assets/images/edit.png")}
              ></Image>
              <Text style={styles.navItemText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.sectionSeparator} />

          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.navItemContainer}
            onPress={() => this.props.navigation.navigate("WalletNavigator")}
          >
            <Image
              style={{ height: 20, width: 20 }}
              source={require("../../../assets/images/wallet.png")}
            ></Image>
            <Text style={styles.navItemText}>Wallet</Text>
          </TouchableOpacity>

          <View style={styles.sectionSeparator} />

          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.navItemContainer}
            onPress={() => this.props.navigation.navigate("Interest")}
          >
            <Image
              style={{ height: 20, width: 20, marginTop: 2 }}
              source={require("../../../assets/images/people.png")}
            ></Image>
            <Text style={styles.navItemText}>Interest</Text>
          </TouchableOpacity>

          <View style={styles.sectionSeparator} />

          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.navItemContainer}
          // onPress={() => this.props.navigation.navigate('Search')}
          >
            <Image
              style={{ height: 20, width: 20, marginTop: 2 }}
              source={require("../../../assets/images/ask.png")}
            ></Image>
            <Text style={styles.navItemText}>How To Play</Text>
          </TouchableOpacity>

          <View style={styles.sectionSeparator} />

          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.navItemContainer}
            onPress={() => this.props.navigation.navigate('Privacy')}
          >
            <Image
              style={{ height: 20, width: 20, marginTop: 2 }}
              source={require("../../../assets/images/lock.png")}
            ></Image>
            <Text style={styles.navItemText}>Privacy Policy</Text>
          </TouchableOpacity>

          <View style={styles.sectionSeparator} />

          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.navItemContainer}
            onPress={() => this.props.navigation.navigate('Terms')}
          >
            <Image
              style={{ height: 20, width: 20, marginTop: 2 }}
              source={require("../../../assets/images/feedback.png")}
            ></Image>
            <Text style={styles.navItemText}>Terms & Conditions</Text>
          </TouchableOpacity>

          <View style={styles.sectionSeparator} />

          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.navItemContainer}
            onPress={() => this.props.navigation.navigate("Feedback")}
          >
            <Image
              style={{ height: 20, width: 20, marginTop: 2 }}
              source={require("../../../assets/images/phone.png")}
            ></Image>
            <Text style={styles.navItemText}>Contact Us</Text>
          </TouchableOpacity>

          <View style={styles.sectionSeparator} />

          {/* <TouchableOpacity
            activeOpacity={0.7}
            style={styles.navItemContainer}
            onPress={() => this.props.navigation.navigate('SignIn')}
          >
            <Text style={styles.navItemText}>Logout</Text>
          </TouchableOpacity> */}
        </ScrollView>

        <TouchableOpacity
          onPress={() => this._deleteTokenHandler()}
        // onPress={() =>  BackHandler.exitApp()}
        // onPress={() => this.props.navigation.navigate('Authentication')}
        // onPress={() => this.props.navigation.navigate('Authentication')}
        >
          <View style={styles.footerContainer}> 
            <Image
              style={{ height: 20, width: 20, marginTop: 2 }}
              source={require("../../../assets/images/logout-64.png")}
            ></Image>
            <Text style={styles.footerText}>Log out</Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  navItemContainer: {
    flexDirection: "row",
    paddingHorizontal: 5,
    paddingVertical: 3,
  },
  navItemText: {
    color: "black",
    fontSize: 14,
    fontWeight: "400",
    marginLeft: 5,
  },
  sectionSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    marginVertical: 10,
  },
  footerContainer: {
    flexDirection: "row",
    padding: 20,
    backgroundColor: "#1E276F",
  },
  footerText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: "700",
    marginLeft: 5,
  },
});
