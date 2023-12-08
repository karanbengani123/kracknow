import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import { sendTokenAPI, SignInAPI } from "../../api-services/User.api";
import { ISignIn } from "../models/Auth.models";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Environment from "../constants/Environment";
import Colors from "../constants/Colors";
import { FormStyle } from "../../styles/Styles";
import { IsValidRegex, RegexExpresion } from "../constants/Regex";
import AntDesign from "react-native-vector-icons/AntDesign";
import { onChange } from "react-native-reanimated";
// import { Button } from "react-native-paper"
import DeviceInfo from 'react-native-device-info';
import { getDeviceId, getManufacturer } from 'react-native-device-info';

interface Props {
  navigation: any;
}

interface State {
  blankError1: string;
  blankError2: string;
  email: string;
  password: string;
  isPressed: boolean;
  isPasswordVisible: boolean;
  emailError: string;
  passwordError: string;
  blankError: string;
  loginError: string;
  isValidEmail: boolean;
  isValidPassword: boolean;
  isLoading: boolean;
  isDisabled: boolean;
}

export default class SignInScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      blankError1: '',
      blankError2: '',
      email: "",
      password: "",
      isPressed: false,
      isPasswordVisible: false,
      emailError: "",
      passwordError: "",
      loginError: "",
      blankError: "",
      isValidEmail: false,
      isValidPassword: false,
      isLoading: false,
      isDisabled: false
    };
  }

  _signInHandler(): void {
    this.setState({ isPressed: true, isDisabled: true });

    const payload: ISignIn = {
      email: this.state.email,
      password: this.state.password,
    };

    if (this.state.email === "") {
      this.setState({
        blankError1: 'This field is required',
        isPressed: false,
        isDisabled: false
      })
      //  return;
    }
    if (this.state.password === "") {
      this.setState({
        blankError2: 'This field is required',
        isPressed: false,
        isDisabled: false
      })
      return;
    }
    // debugger;
    // if (this.state.email === "" && this.state.password === "") {
    //   this.setState({
    //     blankError: "Fill the required fields",
    //     isPressed: false
    //   });
    //   return;
    // }

    SignInAPI(payload)
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
          // debugger;
          if (res.statusCode === 200) {
            AsyncStorage.setItem(
              Environment.PROJECT + "token",
              JSON.stringify(res.data?.payload?.token)
            ).then(() => {
              if (res.data.payload.isRegistered === false) {
                this.props.navigation.replace("PasswordUpdate", { oldPassword: this.state.password });
              }
              else {
                this.props.navigation.replace("Student")
              }
              this.setState({
                isDisabled: false,
                isPressed: false,
                password: '',
                email: ''
              });
              this._sendTokenHandler()
              //  this.props.navigation.navigate('Student');
            });
          } else if (res.statusCode === 500) {
            this.setState({
              loginError: "Internal server error",
              isPressed: false,
              isDisabled: false

            });
          }
          else {
            this.setState({
              loginError: "Username or Password is incorrect",
              isPressed: false,
              isDisabled: false

            });
          }
          // console.log('::::::::', this.state.isPressed)
          // debugger;
        }
      );

  }


  async _sendTokenHandler(): Promise<void> {

    //  await AsyncStorage.getItem(Environment.PROJECT + 'fcmToken')
    const payload = await AsyncStorage.getItem(Environment.PROJECT + 'fcmToken')

    const newpayload = payload && JSON.parse(payload)

    console.log('FCM token', newpayload)

    let deviceId = DeviceInfo.getDeviceId();

    console.log('device ID', deviceId)

    sendTokenAPI({ token: newpayload, deviceId: deviceId })
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
          //  debugger
        }
      );

  }



  _validateInputHandler(field: string): void {
    if (field === "email") {
      const isValid = IsValidRegex(this.state.email, RegexExpresion.email);
      this.setState({
        emailError: !isValid ? "Please provide valid email address" : "",
        isValidEmail: isValid,
      });
    }
  }



  render(): React.ReactNode {

    // console.log(AsyncStorage.getItem(Environment.PROJECT + 'fcmToken').then(value=>console.log(value)) , 'fcmmm')
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#1E276F" />
        <Image
          style={styles.image}
          source={require("../../../assets/images/Krackow.png")}
        />

        <View style={styles.inputView}>
          < TextInput
            autoCapitalize="none"
            style={styles.TextInput}
            placeholder="Enter Email"
            placeholderTextColor="black"
            onChangeText={(text) => this.setState({ email: text, blankError1: "", loginError:"" })}
            onEndEditing={() => this._validateInputHandler('email')}
            value={this.state.email}
          />
          {this.state.isValidEmail && (
            <AntDesign
              name={"checkcircleo"}
              size={16}
              color={Colors.success}
              style={FormStyle.textInputRightIcon}
            />
          )}
        </View>

        {
          this.state.email !== '' &&
          this.state.emailError !== '' &&
          <Text style={FormStyle.errorText}>{this.state.emailError}</Text>
        }
        {
          this.state.blankError1 !== "" &&
          <Text style={FormStyle.errorText}>{this.state.blankError1}</Text>
        }




        <View style={styles.inputView}>
          < TextInput
            autoCapitalize="none"
            style={styles.TextInput}
            secureTextEntry={!this.state.isPasswordVisible}
            placeholder="Enter Password"
            placeholderTextColor="black"
            onChangeText={(text) => this.setState({ password: text, blankError2: "", loginError:"" })}
            // onEndEditing={() => this._validateInputHandler('email')}
            value={this.state.password}
          />
          <Ionicons
            name={
              this.state.isPasswordVisible
                ? "md-eye-off-outline"
                : "md-eye-outline"
            }
            size={18}
            color="#003f5c"
            //   style={FormStyle.textInputRightIcon}
            style={{
              position: "absolute",
              right: 0,
              bottom: 0,
              padding: 10,
              zIndex: 10,
            }}
            onPress={() =>
              this.setState({
                isPasswordVisible: !this.state.isPasswordVisible,
              })
            }
          />
        </View>
       
        {
          this.state.blankError2 !== "" &&
          <Text style={FormStyle.errorText}>{this.state.blankError2}</Text>
        }

        {
          this.state.email !== '' &&
          this.state.loginError !== "" && (
            <Text style={FormStyle.errorText}>{this.state.loginError}</Text>
          )
        }

        <TouchableOpacity
          style={styles.loginBtn}
          // onPress={() => this.props.navigation.navigate('Student')}
          onPress={() => this._signInHandler()}
          disabled={this.state.isDisabled}
        >
          {/* <Text style={{ color: "white" }}>LOGIN</Text> */}


          <Text style={{ color: "white" }}>
            {
              !this.state.isPressed ? 'LOGIN' : ''
            }
          </Text>
          {
            !this.state.isPressed
              ? <Text></Text>
              : <ActivityIndicator
                size={'small'}
                color={Colors.white}
              />
          }
        </TouchableOpacity>


        <Text
          style={{ marginTop: 30 }}
          onPress={() => this.props.navigation.navigate("SignUp")}
        >
          Dont have an acoount? SignUp
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    marginBottom: 40,
    // width: '100%',
    maxWidth: 160,
    maxHeight: 200,
  },

  inputView: {
    backgroundColor: "#e4e8e5",
    // borderWidth:1,
    // borderColor:"black",
    borderRadius: 10,
    flexDirection: "row",
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
    marginTop: 40,
    backgroundColor: "#1E276F",
    flexDirection: 'row'
  },
  loginBtn1: {
    width: "40%",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 70,
    backgroundColor: "#1E276F",
  },

  googlelogo: {
    marginLeft: 7,
  },
  googleBtn: {
    width: "80%",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    backgroundColor: "white",
    borderWidth: 1,
    flexDirection: "row",
  },
  googleBtn1: {
    width: "15%",
    borderRadius: 10,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    backgroundColor: "white",
    borderWidth: 1,
    flexDirection: "row",
  },
  buttonDisabled: {
    opacity: 0.4
  }
});
