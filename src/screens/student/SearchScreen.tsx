
import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  ImageSourcePropType,
  SafeAreaView,
  ScrollView,
  ToastAndroid,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { TouchableHighlight } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";
import Colors from "../constants/Colors";
import { FormStyle } from "../../styles/Styles";
import {
  GetCityListAPI,
  GetStudentDetailsAPI,
  UpdateStudentAPI,
} from "../../api-services/User.api";
import { IEdit, ISignUp } from "../models/Auth.models";
import DocumentPicker from "react-native-document-picker";
import {
  CreateSignedUrlAPI,
  uploadImage,
} from "../../api-services/UploadDocument";
import { ICreateSignedUrl, ISignedUrl } from "../../helper-functions/Upload";
import { showMessage, hideMessage } from "react-native-flash-message";
import FlashMessage from "react-native-flash-message";

// import jwt_decode from "jwt-decode";

interface Props {
  navigation: any;
  isMultiSelect: boolean;
}

interface State {
  // isPressed: boolean;
  isCityOpened: boolean;
  selectedCity: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  email: string;
  profilePic: string;
  idProof: string;
  cityList: any[];
  fileName: string;
  edit: any
}

export default class SearchScreen extends React.Component<Props, State> {
  private focusListener: any;

  constructor(props: Props) {
    super(props);

    this.state = {
      // isPressed: false,
      isCityOpened: false,
      selectedCity: "",
      firstName: "",
      lastName: "",
      mobileNumber: "",
      email: "",
      profilePic: "",
      idProof: "",
      cityList: [],
      fileName: "",
      edit: ""
    };
  }

  componentDidMount(): void {
    this._getStudentListHandler();
    this._getCityListHandler();

    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this._getStudentListHandler();
      this._getCityListHandler();
    })

  }

  componentWillUnmount(): void {
    this.setState = () => {
      return;
    };
    // this.focusListener.remove();
  }

  _uploadDocumentHandler = async () => {
    try {
      const fileDetails: any = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });

      const obj: ICreateSignedUrl = {
        for: "Superadmin",
        files: fileDetails.map((data: any) => {
          this.setState({ fileName: data.name });
          return {
            fileName: data.name,
            extension: data.name.split(".")[1],
            contentType: data.type,
          };
        }),
      };

      CreateSignedUrlAPI(obj)
        .then((response) => {
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
            data: {
              payload: {
                signedUrls: ISignedUrl[];
              };
              message: string;
            };
          }) => {
            // debugger;
            if (res.statusCode === 200) {
              const promises = res.data?.payload?.signedUrls.map(
                (url: ISignedUrl) => {
                  uploadImage(url.signedUrl, fileDetails[0]).then((res) => {
                  });
                  this.setState({
                    profilePic: url.fileUrl,
                  });
                }
              );
              // ToastAndroid.show("Successfully Uploaded", ToastAndroid.LONG);
              showMessage({
                message: "Successfully Uploaded",
                type: "success",
              });
            }
            // else {
            //   ToastAndroid.show(res.data?.message, ToastAndroid.LONG);
            // }
          }
        );
      // debugger;
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        return;
      }
    }
  };

  _uploadIDDocumentHandler = async () => {
    try {
      const fileDetails: any = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });

      const obj: ICreateSignedUrl = {
        for: "Superadmin",
        files: fileDetails.map((data: any) => {
          this.setState({ fileName: data.name });
          return {
            fileName: data.name,
            extension: data.name.split(".")[1],
            contentType: data.type,
          };
        }),
      };

      CreateSignedUrlAPI(obj)
        .then((response) => {
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
            data: {
              payload: {
                signedUrls: ISignedUrl[];
              };
              message: string;
            };
          }) => {
            // debugger;
            if (res.statusCode === 200) {
              const promises = res.data?.payload?.signedUrls.map(
                (url: ISignedUrl) => {
                  uploadImage(url.signedUrl, fileDetails[0]).then((res) => {
                    console.log(res, "ees");
                  });
                  this.setState({
                    idProof: url.fileUrl,
                  });
                }
              );
              // ToastAndroid.show("Successfully Uploaded", ToastAndroid.LONG);
              showMessage({
                message: "Successfully Uploaded",
                type: "success",
              });
            }
            // else {
            //   ToastAndroid.show(res.data?.message, ToastAndroid.LONG);
            // }
          }
        );
      // debugger;
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        return;
      }
    }
  };

  _editHandler(): void {
    // this.setState({ isPressed: true });
    // debugger;
    const payload: IEdit = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      mobileNumber: this.state.mobileNumber,
      city: this.state.selectedCity,
      password: "",
      status: true,
      profilePic: this.state.profilePic,
      idProof: this.state.idProof,
    };

    UpdateStudentAPI(payload)
      .then((response) => {
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
          console.warn(payload, "pppppp");
          // debugger;
          if (res.statusCode === 200) {
            // ToastAndroid.show("Successfully Updated", ToastAndroid.LONG);
            showMessage({
              message: "Successfully Updated",
              type: "success",
            });
            // this.props.navigation.navigate("Dashboard");
            setTimeout(() => {
              this.props.navigation.navigate("Dashboard");
            }, 2000);
            // AsyncStorage.setItem(
            //     Environment.PROJECT + 'token',
            //     JSON.stringify(res.data?.payload?.token)
            // ).then(() => {
            // this.props.navigation.navigate('SignIn');
            // });
          }
          // debugger;
        }
      );
  }

  _getStudentListHandler(): void {
    // debugger;
    GetStudentDetailsAPI()
      .then((response: any) => {
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
            };
            message: string;
          };
        }) => {
          // debugger;
          // let studentData = res.data.payload.student;
          // console.log("selectes city", studentData.City_City.city);
          console.log(res.data.payload.student.firstName, "fffnav")
          this.setState({
            edit: res.data.payload.student,
            selectedCity: res.data.payload.student?.City_City?.uuid,
            firstName: res.data.payload.student?.firstName,
            lastName: res.data.payload.student?.lastName,
            mobileNumber: res.data.payload.student?.mobileNumber,
            email: res.data.payload.student?.email,
            profilePic: res.data.payload.student?.profilePic,
            idProof: res.data.payload.student?.idProof,
          });

          // debugger;
        }
      );
  }

  _getCityListHandler(): void {
    // debugger;
    GetCityListAPI()
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
              map(arg0: (cities: any) => { label: any }): any[];
              cities: any[];
              response: any[];
            };
            message: string;
          };
        }) => {
          // debugger;
          this.setState({
            cityList: res.data.payload.cities.map((cities) => {
              return {
                label: cities.city,
                value: cities.uuid,
              };
            }),
          });
        }
      );
  }

  render(): React.ReactNode {
    // debugger;

    return (
      <SafeAreaView>
        <FlashMessage position="top" />
        <View style={{ padding: 20, flexDirection: "row" }}>
          <Ionicons
            name={"arrow-back"}
            size={25}
            color={Colors.black}
            onPress={() => this.props.navigation.goBack()}
          />
          <Text
            style={{
              fontSize: 16,
              marginLeft: 15,
              fontWeight: "700",
              color: "black",
            }}
          >
            Edit Profile
          </Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              marginTop: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View style={{ alignItems: "center" }}>
              <Text style={{ color: "black" }}>Profile Pic</Text>

              <TouchableOpacity onPress={() => this._uploadDocumentHandler()}>
                <Image
                  style={{ height: 120, width: 180 }}
                  source={
                    this.state.profilePic
                      ? { uri: this.state.profilePic }
                      : require("../../../assets/images/defaultbanner.jpg")
                  }
                ></Image>
              </TouchableOpacity>
            </View>

            <View style={{ marginTop: 10, alignItems: "center" }}>
              <Text style={{ color: "black" }}>Id Proof</Text>

              <TouchableOpacity onPress={() => this._uploadIDDocumentHandler()}>
                <Image
                  style={{ height: 120, width: 180 }}
                  source={
                    this.state.idProof
                      ? { uri: this.state.idProof }
                      : require("../../../assets/images/defaultbanner.jpg")
                  }
                ></Image>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Enter First Name"
              placeholderTextColor="black"
              onChangeText={(text) => this.setState({ firstName: text })}
              value={this.state.firstName}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Enter Last Name"
              placeholderTextColor="black"
              onChangeText={(text) => this.setState({ lastName: text })}
              value={this.state.lastName}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Enter Mobile Number"
              placeholderTextColor="black"
              onChangeText={(text) => this.setState({ mobileNumber: text })}
              value={this.state.mobileNumber}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Enter Email"
              placeholderTextColor="black"
              onChangeText={(text) => this.setState({ email: text })}
              value={this.state.email}
            />
          </View>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <DropDownPicker
              searchable={true}
              listMode="SCROLLVIEW"
              multiple={this.props.isMultiSelect}
              placeholder="Select City"
              style={styles.inputContainerStyle}
              dropDownContainerStyle={styles.dropDownContainerStyle}
              open={this.state.isCityOpened}
              setOpen={() =>
                this.setState({ isCityOpened: !this.state.isCityOpened })
              }
              value={this.state.selectedCity}
              setValue={(callback) => {
                this.setState((state) => ({
                  selectedCity: callback(state.value),
                }));
              }}
              items={this.state.cityList}
            />
          </View>
          <TouchableOpacity style={styles.loginBtn} onPress={() => this._editHandler()}>
            <Text style={{ color: "white" }}>Save</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );


    // return (
    //   <SafeAreaView>
    //     <FlashMessage position="top" />
    //     <View style={{ padding: 20, flexDirection: "row" }}>
    //       <Ionicons
    //         name={"arrow-back"}
    //         size={25}
    //         color={Colors.black}
    //         onPress={() => this.props.navigation.goBack()}
    //       />
    //       <Text
    //         style={{
    //           fontSize: 16,
    //           marginLeft: 15,
    //           fontWeight: "700",
    //           color: "black",
    //         }}
    //       >
    //         Edit Profile
    //       </Text>
    //     </View>
    //     <ScrollView showsVerticalScrollIndicator={false} >
    //       <View
    //         style={{
    //           marginTop: 10,
    //           alignItems: "center",
    //           justifyContent: "center",
    //         }}
    //       >
    //         <View style={{ alignItems: "center" }}>
    //           <Text style={{ color: "black" }}>Profile Pic</Text>

    //           <TouchableOpacity onPress={() => this._uploadDocumentHandler()}>
    //             <Image
    //               style={{ height: 120, width: 180 }}
    //               source={
    //                 (this.state.profilePic
    //                   ? { uri: this.state.profilePic }
    //                   : require("../../../assets/images/defaultbanner.jpg")) as ImageSourcePropType
    //               }
    //             ></Image>
    //           </TouchableOpacity>
    //         </View>

    //         <View style={{ marginTop: 10, alignItems: "center" }}>
    //           <Text style={{ color: "black" }}>Id Proof</Text>

    //           <TouchableOpacity
    //             onPress={() => this._uploadIDDocumentHandler()}
    //           >
    //             <Image
    //               style={{ height: 120, width: 180 }}
    //               source={
    //                 (this.state.idProof
    //                   ? { uri: this.state.idProof }
    //                   : require("../../../assets/images/defaultbanner.jpg")) as ImageSourcePropType
    //               }
    //             ></Image>
    //           </TouchableOpacity>

    //         </View>
    //       </View>
    //         <View style={styles.inputView}>
    //           <TextInput
    //             style={styles.TextInput}
    //             placeholder="Enter First Name"
    //             placeholderTextColor="black"
    //             onChangeText={(text) => this.setState({ firstName: text })}
    //             value={this.state.firstName}
    //           />
    //         </View>

    //         <View style={styles.inputView}>
    //           <TextInput
    //             style={styles.TextInput}
    //             placeholder="Enter Last Name"
    //             placeholderTextColor="black"
    //             onChangeText={(text) => this.setState({ lastName: text })}
    //             value={this.state.lastName}
    //           />
    //         </View>

    //         <View style={styles.inputView}>
    //           <TextInput
    //             style={styles.TextInput}
    //             placeholder="Enter Mobile Number"
    //             placeholderTextColor="black"
    //             onChangeText={(text) => this.setState({ mobileNumber: text })}
    //             value={this.state.mobileNumber}
    //           />
    //         </View>

    //         <View style={styles.inputView}>
    //           <TextInput
    //             style={styles.TextInput}
    //             placeholder="Enter Email"
    //             placeholderTextColor="black"
    //             onChangeText={(text) => this.setState({ email: text })}
    //             value={this.state.email}
    //           />
    //         </View>

    //         <View
    //           style={{
    //             alignItems: "center",
    //             justifyContent: "center",
    //           }}
    //         >
    //           <DropDownPicker
    //             searchable={true}
    //             listMode="SCROLLVIEW"
    //             multiple={this.props.isMultiSelect}
    //             placeholder="Select City"
    //             style={styles.inputContainerStyle}
    //             dropDownContainerStyle={styles.dropDownContainerStyle}
    //             open={this.state.isCityOpened}
    //             setOpen={() =>
    //               this.setState({ isCityOpened: !this.state.isCityOpened })
    //             }
    //             value={this.state.selectedCity}
    //             setValue={(callback) => {
    //               this.setState((state: any) => ({
    //                 selectedCity: callback(state.value),
    //               }));
    //             }}
    //             items={this.state.cityList}
    //           />
    //         </View>

    //         <TouchableOpacity
    //           style={styles.loginBtn}
    //           onPress={() => this._editHandler()}
    //         >
    //           <Text style={{ color: "white" }}>Save</Text>
    //         </TouchableOpacity>


    //       </View>
    //     </ScrollView>
    //   </SafeAreaView>
    // );
  }
}

const styles = StyleSheet.create({
  container1: {
    // backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },
  container2: {
    // backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
    marginBottom: 10
  },
  image: {
    // marginBottom: 40,
    width: "50%",
    maxWidth: 300,
    maxHeight: 300,
  },

  inputView: {
    backgroundColor: "#e4e8e5",
    borderRadius: 10,
    width: "80%",
    height: 45,
    marginBottom: 10,
    marginTop: 10,
    // alignItems: "center",
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 1,
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
  },

  loginBtn: {
    width: "80%",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#1E276F",
    marginBottom: 100
  },

  googleBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    backgroundColor: "#FF1493",
  },
  dropDownContainerStyle: {
    borderColor: Colors.text,
    width: "80%",
    height: "300%",
    // zIndex: 2000
  },
  inputContainerStyle: {
    backgroundColor: "#e4e8e5",
    borderWidth: 0,
    borderRadius: 10,
    width: "80%",
    // borderBottomWidth: 1,
    // borderBottomColor: Colors.text,
    height: 45,
    // marginRight: 5,
    // paddingLeft: 0,
    // zIndex: 10,
    // alignItems: "center",
    marginTop: 10,
  },
});
