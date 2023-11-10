// import * as React from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';

// interface Props {
//   navigation: any;
// }

// interface State {
// }

// export default class SearchScreen extends React.Component<Props, State> {
//   render(): React.ReactNode {
//     return (
//       <View
//         style={styles.container}
//       >
//         <TouchableOpacity
//         onPress={() => this.props.navigation.navigate('Student')}>
//           <Text style={{ color: 'red' }}>back</Text>
//         </TouchableOpacity>
//         <Text>Search Screen works !!!</Text>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center'
//   }
// });


// import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
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
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors';
import { FormStyle } from "../../styles/Styles";
import { GetCityListAPI, GetStudentDetailsAPI, UpdateStudentAPI } from "../../api-services/User.api";
import { IEdit, ISignUp } from "../models/Auth.models";
import DocumentPicker from 'react-native-document-picker';
import { CreateSignedUrlAPI, uploadImage } from "../../api-services/UploadDocument";
import { ICreateSignedUrl, ISignedUrl } from "../../helper-functions/Upload";

// import jwt_decode from "jwt-decode";






interface Props {
  navigation: any;
  isMultiSelect: boolean;

}

interface State {
  isPressed: boolean;
  isCityOpened: boolean;
  selectedCity: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  email: string;
  profilePic: string;
  idProof: string;
  cityList: any[];
  fileName: string


}

export default class SearchScreen extends React.Component<Props, State> {


  constructor(props: Props) {
    super(props);

    this.state = {
      isPressed: false,
      isCityOpened: false,
      selectedCity: '',
      firstName: '',
      lastName: '',
      mobileNumber: '',
      email: '',
      profilePic: '',
      idProof: '',
      cityList: [],
      fileName: ''


    };


  }

  componentDidMount(): void {
    this._getStudentListHandler();
    this._getCityListHandler()
  }

  componentWillUnmount(): void {

  }



  _uploadDocumentHandler = async () => {
    try {
      const fileDetails: any = await DocumentPicker.pick({
        type: [
          DocumentPicker.types.images
        ],
      });

      const obj: ICreateSignedUrl = {
        "for": "Superadmin",
        "files": fileDetails.map((data: any) => {
          this.setState({ fileName: data.name })
          return {
            fileName: data.name,
            extension: data.name.split(".")[1],
            contentType: data.type
          };
        }),
      };

      CreateSignedUrlAPI(obj)
        .then(response => {
          const statusCode = response.status;
          const data = response.json();

          return Promise.all([statusCode, data]).then(res => ({
            statusCode: res[0],
            data: res[1]
          }));
        })
        .then((res: {
          statusCode: number,
          data: {
            payload: {
              signedUrls: ISignedUrl[]
            },
            message: string
          }
        }) => {
          // debugger;
          if (res.statusCode === 200) {
            const promises = res.data?.payload?.signedUrls
              .map((url: ISignedUrl) => {
               
                uploadImage(url.signedUrl, fileDetails[0]).then((res) => {
                  console.log(res, "ees")
                })
                this.setState({
                  profilePic: url.fileUrl
                })
              });
              ToastAndroid.show("Successfully Uploaded", ToastAndroid.LONG);
          }
          // else {
          //   ToastAndroid.show(res.data?.message, ToastAndroid.LONG);
          // }
        });
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
        type: [
          DocumentPicker.types.images
        ],
      });

      const obj: ICreateSignedUrl = {
        "for": "Superadmin",
        "files": fileDetails.map((data: any) => {
          this.setState({ fileName: data.name })
          return {
            fileName: data.name,
            extension: data.name.split(".")[1],
            contentType: data.type
          };
        }),
      };

      CreateSignedUrlAPI(obj)
        .then(response => {
          const statusCode = response.status;
          const data = response.json();

          return Promise.all([statusCode, data]).then(res => ({
            statusCode: res[0],
            data: res[1]
          }));
        })
        .then((res: {
          statusCode: number,
          data: {
            payload: {
              signedUrls: ISignedUrl[]
            },
            message: string
          }
        }) => {
          // debugger;
          if (res.statusCode === 200) {
            const promises = res.data?.payload?.signedUrls
              .map((url: ISignedUrl) => {
               
                uploadImage(url.signedUrl, fileDetails[0]).then((res) => {
                  console.log(res, "ees")
                })
                this.setState({
                  idProof: url.fileUrl
                })
              });
              ToastAndroid.show("Successfully Uploaded", ToastAndroid.LONG);
          }
          // else {
          //   ToastAndroid.show(res.data?.message, ToastAndroid.LONG);
          // }
        });
      // debugger;
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        return;
      }
    }
  };

  _editHandler(): void {
    this.setState({ isPressed: true });
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
      idProof: this.state.idProof
    };

    UpdateStudentAPI(payload)
      .then(response => {
        const statusCode = response.status;
        const data = response.json();

        return Promise.all([statusCode, data]).then(res => ({
          statusCode: res[0],
          data: res[1]
        }));
        
      })
      
      .then((res: { statusCode: number, data: { payload: any, message: string } }) => {
        console.warn(payload, "pppppp")
        debugger;
        if (res.statusCode === 200) {
          ToastAndroid.show("Successfully Updated", ToastAndroid.LONG);
          this.props.navigation.navigate('Dashboard');
          // AsyncStorage.setItem(
          //     Environment.PROJECT + 'token',
          //     JSON.stringify(res.data?.payload?.token)
          // ).then(() => {
          // this.props.navigation.navigate('SignIn');
          // });
        }
        // debugger;
      });
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
          let studentData = res.data.payload.student
          console.log("selectes city", studentData.City_City.city)
          this.setState({
            firstName: studentData.firstName,
            lastName: studentData.lastName,
            mobileNumber: studentData.mobileNumber,
            email: studentData.email,
            selectedCity: studentData.City_City.uuid,
            profilePic: studentData.profilePic,
            idProof: studentData.idProof
          });

          // debugger;
        }
      );
  }

  _getCityListHandler(): void {
    // debugger;
    GetCityListAPI()
      .then(response => {
        const statusCode = response.status;
        const data = statusCode === 200 ? response.json() : [];

        return Promise.all([statusCode, data]).then(res => ({
          statusCode: res[0],
          data: res[1]
        }));
      })
      .then((res: {
        statusCode: number,
        data: {
          payload: {
            map(arg0: (cities: any) => { label: any; }): any[];
            cities: any[];
            response: any[],
          }
          message: string
        }
      }) => {
        // debugger;
        this.setState({
          cityList: res.data.payload.cities
            .map((cities) => {
              return {
                label: cities.city,
                value: cities.uuid

              };
            })
        });
      });
  }


  render(): React.ReactNode {
    // debugger;

    return (
      <View>
        <SafeAreaView>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ padding: 20, flexDirection: 'row' }} >
              {/* <Image style={{ height: 30, width: 30 }} source={require("../../../assets/images/back-button.png")} ></Image> */}

              <Ionicons
                name={'arrow-back'}
                size={25}
                color={Colors.black}
                // style={HeaderNavigatorStyles.iconSpacing}
                onPress={() => this.props.navigation.goBack()}
              />
              <Text style={{ fontSize: 18, marginLeft: 10, fontWeight: '700', color: 'black', }}>Edit Profile</Text>

            </View>

            {/* <StatusBar style="auto" /> */}
            <View style={{
              marginTop: 10, alignItems: "center",
              justifyContent: "center",
            }}>

              <View style={{ alignItems: 'center' }}>
                <Text style={{ color: 'black' }}>Profile Pic</Text>

                <TouchableOpacity onPress={() => this._uploadDocumentHandler()}>

                  <Image style={{ height: 120, width: 180 }} source={
                    (
                      this.state.profilePic
                        ? { uri: this.state.profilePic }
                        : require('../../../assets/images/defaultbanner.jpg')
                    ) as ImageSourcePropType
                  }></Image>
                </TouchableOpacity>
                {/* <TouchableOpacity
    // style={FormInput.Save}
    style={{
      backgroundColor: "#1E276F", alignItems: "center",
      justifyContent: "center", padding: 2, marginTop: 5
    }}
    onPress={() => this._uploadDocumentHandler()}
  // uppercase={false}
  >
    <Text style={{ color: 'white', fontSize: 10 }}>
      Click to Upload
    </Text>
  </TouchableOpacity> */}

              </View>

              <View style={{ marginTop: 10, alignItems: 'center' }}>
                <Text style={{ color: 'black' }}>Id Proof</Text>

                <TouchableOpacity onPress={() => this._uploadIDDocumentHandler()}>

                  <Image style={{ height: 120, width: 180 }} source={
                    (
                      this.state.idProof
                        ? { uri: this.state.idProof }
                        : require('../../../assets/images/defaultbanner.jpg')
                    ) as ImageSourcePropType
                  }></Image>
                </TouchableOpacity>

                {/* <TouchableOpacity
    // style={FormInput.Save}
    style={{
      backgroundColor: "#1E276F", alignItems: "center",
      justifyContent: "center", padding: 2, marginTop: 5
    }}
    onPress={() => this._uploadDocumentHandler()}
  // uppercase={false}
  >
    <Text style={{ color: 'white', fontSize: 10 }}>
      Click to Upload
    </Text>
  </TouchableOpacity> */}

              </View>

            </View>
            <View style={styles.container1}>
              {/* <Image style={{ height: 70, width: 70 }} source={require("../../../assets/images/user.png")}></Image> */}
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

              <View style={{
                alignItems: "center",
                justifyContent: "center"
              }}>

                <DropDownPicker
                  multiple={this.props.isMultiSelect}
                  placeholder='Select City'
                  style={styles.inputContainerStyle}
                  dropDownContainerStyle={styles.dropDownContainerStyle}
                  open={this.state.isCityOpened}
                  setOpen={() => this.setState({ isCityOpened: !this.state.isCityOpened })}
                  value={this.state.selectedCity}
                  setValue={(callback) => {
                    this.setState((state: any) => ({
                      selectedCity: callback(state.value)
                    }));
                  }}
                  items={this.state.cityList}


                />
              </View>






              {/* <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Confirm Password"
                        placeholderTextColor="#003f5c"
                    />
                </View> */}




              {/* <Text style={{ marginTop: 30 }} onPress={() => this.props.navigation.navigate('SignIn')} >Already have an account? SignIn</Text> */}
            </View>


            <View style={styles.container2}>

              <TouchableOpacity style={styles.loginBtn}
                onPress={() => this._editHandler()}>
                <Text style={{ color: 'white' }}>Save</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container1: {
    // backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5
  },
  container2: {
    // backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2
  },
  image: {
    // marginBottom: 40,
    width: '50%',
    maxWidth: 300,
    maxHeight: 300
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

