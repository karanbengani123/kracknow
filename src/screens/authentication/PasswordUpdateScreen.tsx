// import React from "react";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   TextInput,
//   TouchableOpacity,
//   KeyboardAvoidingView,
//   ActivityIndicator,
// } from "react-native";
// import { ChangePasswordAPI, SignInAPI } from "../../api-services/User.api";
// import { IChangePassword, ISignIn } from "../models/Auth.models";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import Environment from "../constants/Environment";
// import Colors from "../constants/Colors";
// import { FormStyle } from "../../styles/Styles";
// import { IsValidRegex, RegexExpresion } from "../constants/Regex";
// import AntDesign from "react-native-vector-icons/AntDesign";
// import { onChange } from "react-native-reanimated";
// // import { Button } from "react-native-paper"

// interface Props {
//   navigation: any;
//   route: any;
// }

// interface State {
//   password: string;
//   passwordError: string,
//   Confirmpassword: string;
//   ConfirmpasswordError: string;
//   isPressed: boolean;
//   isPasswordVisible: boolean;
//   isConfirmpasswordVisible: boolean;
//   loading: boolean;
// }

// export default class PasswordUpdateScreen extends React.Component<Props, State> {
//   constructor(props: Props) {
//     super(props);

//     this.state = {
//       password: "",
//       passwordError: "",
//       Confirmpassword: '',
//       ConfirmpasswordError: '',
//       isPressed: false,
//       isPasswordVisible: false,
//       isConfirmpasswordVisible: false,
//       loading: false,
//     };
//   }



//   formValidation = async () => {
//     this.setState({ loading: true })
//     let errorFlag = false;

//     if (this.state.password.length == 0) {
//       errorFlag = true;
//       this.setState({ passwordError: "Password is required" });
//     } else if (this.state.password.length < 8 || this.state.password.length > 20) {
//       errorFlag = true;
//       this.setState({ passwordError: "Password should be min 8 char and max 20 char" });
//     }

//     if (this.state.Confirmpassword.length == 0) {
//       errorFlag = true;
//       this.setState({ ConfirmpasswordError: "Confirm password is required" });
//     } else if (this.state.Confirmpassword !== this.state.password) {
//       errorFlag = true;
//       this.setState({ ConfirmpasswordError: "Confirm password and password should be same" });
//     }

//     if (!errorFlag) {
//       console.log("errorFlag");
//       //API call
//       this._passwordChangeHandler()
//     } else {
//       this.setState({ loading: false })
//     }
//   }


//   _passwordChangeHandler(): void {
//     const payload: IChangePassword = {
//       oldPassword: this.props.route.params?.oldPassword,
//       newPassword: this.state.password,
//     };

//     let errorFlag = false;

//     if (this.state.password.length == 0) {
//       errorFlag = true;
//       this.setState({ passwordError: "Password is required" });
//     } else if (this.state.password.length < 8 || this.state.password.length > 20) {
//       errorFlag = true;
//       this.setState({ passwordError: "Password should be min 8 char and max 20 char" });
//     }

//     if (this.state.Confirmpassword.length == 0) {
//       errorFlag = true;
//       this.setState({ ConfirmpasswordError: "Confirm password is required" });
//     } else if (this.state.Confirmpassword !== this.state.password) {
//       errorFlag = true;
//       this.setState({ ConfirmpasswordError: "Confirm password and password should be same" });
//     }

//     ChangePasswordAPI(payload)
//       .then((response) => {
//         const statusCode = response.status;
//         const data = response.json();

//         return Promise.all([statusCode, data]).then((res) => ({
//           statusCode: res[0],
//           data: res[1],
//         }));
//       })
//       .then(
//         (res: {
//           statusCode: number;
//           data: { payload: any; message: string };
//         }) => {
//           if (res.statusCode === 200) {

//             this.props.navigation.navigate("KeywordUpdate");

//           }
//           // console.log('::::::::', this.state.isPressed)
//           // debugger;
//         }
//       );

//   }


//   render(): React.ReactNode {
//     return (
//       <View style={styles.container}>
//         <Image
//           style={styles.image}
//           source={require("../../../assets/images/Krackow.png")}
//         />


//         <View style={styles.inputView}>
//           <TextInput
//             autoCapitalize="none"
//             style={styles.TextInput}
//             secureTextEntry={!this.state.isPasswordVisible}
//             // secureTextEntry={true}
//             placeholder="Enter New Password"
//             placeholderTextColor="#003f5c"
//             onChangeText={(text) =>
//               this.setState({ password: text, passwordError: "", ConfirmpasswordError: "" })
//             }
//             value={this.state.password}
//           // onEndEditing={() => this._validateInputHandler('email')}
//           />
//           <Ionicons
//             name={
//               this.state.isPasswordVisible
//                 ? "md-eye-off-outline"
//                 : "md-eye-outline"
//             }
//             size={18}
//             color="#003f5c"
//             //   style={FormStyle.textInputRightIcon}
//             style={{
//               position: "absolute",
//               right: 0,
//               bottom: 0,
//               padding: 10,
//               zIndex: 10,
//             }}
//             onPress={() =>
//               this.setState({
//                 isPasswordVisible: !this.state.isPasswordVisible,
//               })
//             }
//           />
//         </View>
//         {this.state.passwordError.length > 0 && <Text style={FormStyle.errorText}>{this.state.passwordError}</Text>}


//         <View style={styles.inputView}>
//           <TextInput
//             autoCapitalize="none"
//             style={styles.TextInput}
//             secureTextEntry={!this.state.isConfirmpasswordVisible}
//             // secureTextEntry={true}
//             placeholder="Confirm Password"
//             placeholderTextColor="#003f5c"
//             onChangeText={(text) =>
//               this.setState({ Confirmpassword: text, ConfirmpasswordError: "", passwordError: "" })
//             }
//             value={this.state.Confirmpassword}
//           // onEndEditing={() => this._validateInputHandler('email')}
//           />
//           <Ionicons
//             name={
//               this.state.isConfirmpasswordVisible
//                 ? "md-eye-off-outline"
//                 : "md-eye-outline"
//             }
//             size={18}
//             color="#003f5c"
//             //   style={FormStyle.textInputRightIcon}
//             style={{
//               position: "absolute",
//               right: 0,
//               bottom: 0,
//               padding: 10,
//               zIndex: 10,
//             }}
//             onPress={() =>
//               this.setState({
//                 isConfirmpasswordVisible: !this.state.isConfirmpasswordVisible,
//               })
//             }
//           />

//         </View>
//         {this.state.ConfirmpasswordError.length > 0 && <Text style={FormStyle.errorText}>{this.state.ConfirmpasswordError}</Text>}





//         <TouchableOpacity
//           style={styles.loginBtn}
//           // onPress={() => this.props.navigation.navigate('KeywordUpdate')}
//           // onPress={() => this._passwordChangeHandler()}
//          onPress={() => this.formValidation()}
//         >
//           <Text style={{ color: "white" }}>
//             {
//               !this.state.isPressed ? 'CONFIRM' : ''
//             }
//           </Text>
//           {
//             !this.state.isPressed
//               ? <Text></Text>
//               : <ActivityIndicator
//                 size={'small'}
//                 color={Colors.white}
//               />
//           }
//         </TouchableOpacity>

//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   image: {
//     marginBottom: 40,
//     // width: '100%',
//     maxWidth: 160,
//     maxHeight: 200,
//   },

//   inputView: {
//     backgroundColor: "#e4e8e5",
//     // borderWidth:1,
//     // borderColor:"black",
//     borderRadius: 10,
//     flexDirection: "row",
//     width: "80%",
//     height: 45,
//     marginBottom: 10,
//     marginTop: 10,
//     // alignItems: "center",
//   },

//   TextInput: {
//     height: 50,
//     flex: 1,
//     padding: 10,
//     marginLeft: 1,
//   },

//   forgot_button: {
//     height: 30,
//     marginBottom: 30,
//   },

//   loginBtn: {
//     width: "80%",
//     borderRadius: 10,
//     height: 50,
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 40,
//     backgroundColor: "#1E276F",
//     flexDirection: 'row'
//   },
//   loginBtn1: {
//     width: "40%",
//     borderRadius: 10,
//     height: 50,
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 70,
//     backgroundColor: "#1E276F",
//   },

//   googlelogo: {
//     marginLeft: 7,
//   },
//   googleBtn: {
//     width: "80%",
//     borderRadius: 10,
//     height: 50,
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 5,
//     backgroundColor: "white",
//     borderWidth: 1,
//     flexDirection: "row",
//   },
//   googleBtn1: {
//     width: "15%",
//     borderRadius: 10,
//     height: 40,
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 5,
//     backgroundColor: "white",
//     borderWidth: 1,
//     flexDirection: "row",
//   },
//   buttonDisabled: {
//     opacity: 0.4
//   }
// });



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
  ToastAndroid,
} from "react-native";
import { ChangePasswordAPI, SignInAPI } from "../../api-services/User.api";
import { IChangePassword, ISignIn } from "../models/Auth.models";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Environment from "../constants/Environment";
import Colors from "../constants/Colors";
import { FormStyle } from "../../styles/Styles";
import { IsValidRegex, RegexExpresion } from "../constants/Regex";
import AntDesign from "react-native-vector-icons/AntDesign";
import { onChange } from "react-native-reanimated";
// import { Button } from "react-native-paper"
import { showMessage, hideMessage } from "react-native-flash-message";
import FlashMessage from "react-native-flash-message";

interface Props {
  navigation: any;
  route: any;
}

interface State {
  password: string;
  passwordError: string,
  Oldpassword: string,
  OldpasswordError: string,
  Confirmpassword: string;
  ConfirmpasswordError: string;
  isPressed: boolean;
  isPasswordVisible: boolean;
  isOldpasswordVisible:boolean;
  isConfirmpasswordVisible: boolean;
  loading: boolean;
}

export default class PasswordUpdateScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      password: "",
      passwordError: "",
      Oldpassword:"",
      OldpasswordError:"",
      Confirmpassword: '',
      ConfirmpasswordError: '',
      isPressed: false,
      isPasswordVisible: false,
      isOldpasswordVisible: false,
      isConfirmpasswordVisible: false,
      loading: false,
    };
  }




  _passwordChangeHandler(): void {
    const payload: IChangePassword = {
      oldPassword: this.state.Oldpassword,
      newPassword: this.state.password,
    };

    // let errorFlag = false;

    if (this.state.Oldpassword.length == 0) {
      this.setState({ OldpasswordError: "Old password is required" });
    } 

    if (this.state.password.length == 0) {
      this.setState({ passwordError: "New password is required" });
    }

    

    ChangePasswordAPI(payload)
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
          if (res.statusCode === 200) {

            this.props.navigation.replace("KeywordUpdate");

          }
          if(res.statusCode === 500){
            ToastAndroid.show("Internal server error", ToastAndroid.SHORT);

          }
          // console.log('::::::::', this.state.isPressed)
          // debugger;
        }
      );

  }


  render(): React.ReactNode {
    return (
      <View style={styles.container}>
        <FlashMessage position="top" />
        <Image
          style={styles.image}
          source={require("../../../assets/images/Krackow.png")}
        />


        <View style={styles.inputView}>
          <TextInput
            autoCapitalize="none"
            style={styles.TextInput}
            secureTextEntry={!this.state.isOldpasswordVisible}
            // secureTextEntry={true}
            placeholder="Enter Old Password"
            placeholderTextColor="#003f5c"
            onChangeText={(text) =>
              this.setState({ Oldpassword: text, OldpasswordError: "", passwordError: "" })
            }
            value={this.state.Oldpassword}
          // onEndEditing={() => this._validateInputHandler('email')}
          />
          <Ionicons
            name={
              this.state.isOldpasswordVisible
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
                isOldpasswordVisible: !this.state.isOldpasswordVisible,
              })
            }
          />
        </View>
        {this.state.OldpasswordError.length > 0 && <Text style={FormStyle.errorText}>{this.state.OldpasswordError}</Text>}


        <View style={styles.inputView}>
          <TextInput
            autoCapitalize="none"
            style={styles.TextInput}
            secureTextEntry={!this.state.isPasswordVisible}
            // secureTextEntry={true}
            placeholder="Enter New Password"
            placeholderTextColor="#003f5c"
            onChangeText={(text) =>
              this.setState({ password: text, passwordError: "", OldpasswordError: "", })
            }
            value={this.state.password}
          // onEndEditing={() => this._validateInputHandler('email')}
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
        {this.state.passwordError.length > 0 && <Text style={FormStyle.errorText}>{this.state.passwordError}</Text>}


        {/* <View style={styles.inputView}>
          <TextInput
            autoCapitalize="none"
            style={styles.TextInput}
            secureTextEntry={!this.state.isConfirmpasswordVisible}
            // secureTextEntry={true}
            placeholder="Confirm Password"
            placeholderTextColor="#003f5c"
            onChangeText={(text) =>
              this.setState({ Confirmpassword: text, ConfirmpasswordError: "", passwordError: "" })
            }
            value={this.state.Confirmpassword}
          // onEndEditing={() => this._validateInputHandler('email')}
          />
          <Ionicons
            name={
              this.state.isConfirmpasswordVisible
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
                isConfirmpasswordVisible: !this.state.isConfirmpasswordVisible,
              })
            }
          />

        </View>
        {this.state.ConfirmpasswordError.length > 0 && <Text style={FormStyle.errorText}>{this.state.ConfirmpasswordError}</Text>} */}





        <TouchableOpacity
          style={styles.loginBtn}
          // onPress={() => this.props.navigation.navigate('KeywordUpdate')}
          onPress={() => this._passwordChangeHandler()}
        >
          <Text style={{ color: "white" }}>
            {
              !this.state.isPressed ? 'CONFIRM' : ''
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
