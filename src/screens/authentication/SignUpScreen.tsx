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
    ScrollView,
    SafeAreaView,
    ToastAndroid,
    ActivityIndicator
} from "react-native";
import { GetCityListAPI, SignUpAPI } from '../../api-services/User.api';
import { ISignUp } from "../models/Auth.models";
import DropDownPicker from 'react-native-dropdown-picker';
import Colors from '../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FormStyle } from "../../styles/Styles";
import { IsValidRegex, RegexExpresion } from '../constants/Regex';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Environment from "../constants/Environment";
import { showMessage, hideMessage } from "react-native-flash-message";
import FlashMessage from "react-native-flash-message";





interface Props {
    navigation: any;
    isMultiSelect: boolean;
    placeholder: string;

}

interface State {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    mobileNumber: string;
    city: string;
    isPressed: boolean;
    isCityOpened: boolean;
    selectedCity: string;
    cityList: any[];
    isPasswordVisible: boolean;
    blankError: string;
    blankError1: string;
    blankError2: string;
    blankError3: string;
    blankError4: string;
    blankError5: string;
    emailError: string,
    isValidEmail: boolean;
    mobileError: string,
    isValidMobile: boolean;
    nameError: string,
    isValidName: boolean;
    lastnameError: string,
    isValidLastname: boolean;


    isMandatoryOpen: boolean










}

export default class SignUpScreen extends React.Component<Props, State> {


    constructor(props: Props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            mobileNumber: '',
            city: '',
            isPressed: false,
            isCityOpened: false,
            selectedCity: '',
            cityList: [],
            isPasswordVisible: false,
            blankError: '',
            blankError1: '',
            blankError2: '',
            blankError3: '',
            blankError4: '',
            blankError5: '',
            emailError: '',
            isValidEmail: false,
            mobileError: '',
            isValidMobile: false,
            nameError: '',
            isValidName: false,
            lastnameError: '',
            isValidLastname: false,

            isMandatoryOpen: false









        };


    }

    componentDidMount(): void {
        this._getCityListHandler();

    }

    componentWillUnmount(): void {

    }

    _signUpHandler(): void {
        this.setState({ isPressed: true });

        const payload: ISignUp = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            // password: this.state.password,
            mobileNumber: this.state.mobileNumber,
            city: this.state.selectedCity
        };


        if (this.state.firstName === "") {
            this.setState({
                blankError1: 'This field is required',
                isPressed: false,
            })
            // return;
        }
        if (this.state.lastName === "") {
            this.setState({
                blankError2: 'This field is required',
                isPressed: false,
            })
            // return;
        }
        if (this.state.email === "") {
            this.setState({
                blankError4: 'This field is required',
                isPressed: false,
            })
            // return;
        }
        if (this.state.password === "") {
            this.setState({
                blankError5: 'This field is required',
                isPressed: false,
            })
            // return;
        }
        if (this.state.mobileNumber === "") {
            this.setState({
                blankError3: 'This field is required',
                isPressed: false,
            })
            // return;
        }
        if (this.state.selectedCity === "") {
            this.setState({
                blankError: 'This field is required',
                isPressed: false,
            })
            return;
        }
        // console.log('//////////',payload)

        SignUpAPI(payload)
            .then(response => {
                const statusCode = response.status;
                const data = response.json();

                return Promise.all([statusCode, data]).then(res => ({
                    statusCode: res[0],
                    data: res[1]
                }));

            })

            .then((res: { statusCode: number, data: { payload: any, message: string } }) => {
                if (res.statusCode === 200) {
                    // AsyncStorage.setItem(
                    //     Environment.PROJECT + 'token',
                    //     JSON.stringify(res.data?.payload?.token)
                    // ).then(() => {
                    // this.props.navigation.navigate('SignIn');
                    // ToastAndroid.show("Successfully created", ToastAndroid.SHORT);
                    showMessage({
                        message: res.data.message,
                        type: "success",
                    });
                    setTimeout(() => {
                        this.props.navigation.navigate("SignIn");
                    }, 2000);
                    this.setState({
                        isPressed: false,

                    });

                    // });
                }
                else if (res.statusCode === 400) {
                    // ToastAndroid.show("Student already exist", ToastAndroid.SHORT);
                    showMessage({
                        message: "Student already exist",
                        type: "danger",
                    });
                    this.setState({
                        isPressed: false,

                    });

                }
                else {
                    // ToastAndroid.show("Unprocessed entity", ToastAndroid.SHORT);

                }
                // debugger;
            });
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

    _validateInputHandler(field: string): void {
        if (field === 'name') {
            const isValid = IsValidRegex(this.state.firstName, RegexExpresion.name);
            this.setState({
                nameError: !isValid
                    ? 'FirstName is invalid'
                    : '',
                isValidName: isValid,
                isPressed: false,

            });
        }
        if (field === 'lastname') {
            const isValid = IsValidRegex(this.state.lastName, RegexExpresion.name);
            this.setState({
                lastnameError: !isValid
                    ? 'LastName is invalid'
                    : '',
                isValidLastname: isValid,
                isPressed: false,

            });
        }
        if (field === 'email') {
            const isValid = IsValidRegex(this.state.email, RegexExpresion.email);
            this.setState({
                emailError: !isValid
                    ? 'Please provide valid email address'
                    : '',
                isValidEmail: isValid,
                isPressed: false,

            });
        }
        if (field === 'mobile') {
            const isValid = IsValidRegex(this.state.mobileNumber, RegexExpresion.phone);
            this.setState({
                mobileError: !isValid
                    ? 'Please provide valid mobile number'
                    : '',
                isValidMobile: isValid,
                isPressed: false,

            });
        }



    }

    setValue(callback: any) {
        this.setState(state => ({
            selectedCity: callback(state.selectedCity)
        }));
    }

    setItems(callback: any) {
        this.setState(state => ({
            cityList: callback(state.cityList)
        }));
    }

    render(): React.ReactNode {
        return (
            <SafeAreaView>
                <FlashMessage position="top" />
                <ScrollView showsVerticalScrollIndicator={false} >
                    <View style={styles.container}>
                        {/* <StatusBar style="auto" /> */}

                        {/* <Image style={{ height: 70, width: 70, marginTop: 20 }} source={require("../../../assets/images/user.png")}></Image> */}

                        <View style={{
                            backgroundColor: "#e4e8e5",
                            // borderWidth:1,
                            // borderColor:'black',
                            borderRadius: 10,
                            width: "80%",
                            height: 45,
                            marginBottom: 10,
                            marginTop: 100,
                        }}>
                            < TextInput
                                style={styles.TextInput}
                                placeholder="Enter First Name"
                                placeholderTextColor="black"
                                onChangeText={(text) => this.setState({ firstName: text, blankError1: "" })}
                                onEndEditing={() => this._validateInputHandler('name')}
                                value={this.state.firstName}
                            />
                            {
                                this.state.isValidName &&
                                <AntDesign
                                    name={'checkcircleo'}
                                    size={16}
                                    color={Colors.success}
                                    style={FormStyle.textInputRightIcon}
                                />
                            }
                        </View>
                        {
                            this.state.firstName !== '' &&
                            this.state.nameError !== '' &&
                            <Text style={FormStyle.errorText}>{this.state.nameError}</Text>
                        }
                        {
                            this.state.blankError1 !== "" &&
                            <Text style={FormStyle.errorText}>{this.state.blankError1}</Text>
                        }

                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.TextInput}
                                placeholder="Enter Last Name"
                                placeholderTextColor="black"
                                onChangeText={(text) => this.setState({ lastName: text, blankError2: "" })}
                                onEndEditing={() => this._validateInputHandler('lastname')}
                                value={this.state.lastName}
                            />
                            {
                                this.state.isValidLastname &&
                                <AntDesign
                                    name={'checkcircleo'}
                                    size={16}
                                    color={Colors.success}
                                    style={FormStyle.textInputRightIcon}
                                />
                            }
                        </View>
                        {
                            this.state.lastName !== '' &&
                            this.state.lastnameError !== '' &&
                            <Text style={FormStyle.errorText}>{this.state.lastnameError}</Text>
                        }
                        {
                            this.state.blankError2 !== "" &&
                            <Text style={FormStyle.errorText}>{this.state.blankError2}</Text>
                        }

                        <View style={styles.inputView}>
                            <TextInput
                                keyboardType='numeric'
                                style={styles.TextInput}
                                placeholder="Enter Mobile Number"
                                placeholderTextColor="black"
                                onChangeText={(text) => this.setState({ mobileNumber: text, blankError3: "", mobileError: "" })}
                                onEndEditing={() => this._validateInputHandler('mobile')}
                                value={this.state.mobileNumber}
                            />
                            {
                                this.state.isValidMobile &&
                                <AntDesign
                                    name={'checkcircleo'}
                                    size={16}
                                    color={Colors.success}
                                    style={FormStyle.textInputRightIcon}
                                />
                            }
                        </View>
                        {
                            this.state.mobileNumber !== '' &&
                            this.state.mobileError !== '' &&
                            <Text style={FormStyle.errorText}>{this.state.mobileError}</Text>
                        }
                        {
                            this.state.blankError3 !== "" &&
                            <Text style={FormStyle.errorText}>{this.state.blankError3}</Text>
                        }

                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.TextInput}
                                placeholder="Enter Email"
                                placeholderTextColor="black"
                                onChangeText={(text) => this.setState({ email: text, blankError4: "", emailError: '' })}
                                onEndEditing={() => this._validateInputHandler('email')}
                                value={this.state.email}
                            />
                            {
                                this.state.isValidEmail &&
                                <AntDesign
                                    name={'checkcircleo'}
                                    size={16}
                                    color={Colors.success}
                                    style={FormStyle.textInputRightIcon}
                                />
                            }
                        </View>
                        {
                            this.state.email !== '' &&
                            this.state.emailError !== '' &&
                            <Text style={FormStyle.errorText}>{this.state.emailError}</Text>
                        }
                        {
                            this.state.blankError4 !== "" &&
                            <Text style={FormStyle.errorText}>{this.state.blankError4}</Text>
                        }

                        {/* <View style={styles.inputView}>
                            <TextInput
                                secureTextEntry={!this.state.isPasswordVisible}

                                style={styles.TextInput}
                                placeholder="Enter Password"
                                placeholderTextColor="black"
                                onChangeText={(text) => this.setState({ password: text, blankError5: "" })}
                                value={this.state.password}
                            />
                            <Ionicons
                                name={this.state.isPasswordVisible ? 'md-eye-off-outline' : 'md-eye-outline'}
                                size={18}
                                color='#003f5c'
                                //   style={FormStyle.textInputRightIcon}
                                style={{
                                    position: 'absolute',
                                    right: 0,
                                    bottom: 0,
                                    padding: 10,
                                    zIndex: 10
                                }}
                                onPress={() => this.setState({ isPasswordVisible: !this.state.isPasswordVisible })}
                            />
                        </View>
                        {
                            this.state.blankError5 !== "" &&
                            <Text style={FormStyle.errorText}>{this.state.blankError5}</Text>
                        } */}

                        {/* <View style={styles.inputView}>
                            <TextInput
                                style={styles.TextInput}
                                placeholder="Enter City"
                                placeholderTextColor="#003f5c"
                                onChangeText={(text) => this.setState({ city: text })}
                                value={this.state.city}
                            />
                        </View> */}

                        {/* <View style={{
                            alignItems: "center",
                            justifyContent: "center"
                        }}>

                            <DropDownPicker
                                multiple={this.props.isMultiSelect}
                                dropDownDirection={"TOP"}
                                placeholder='Select City'
                                style={styles.inputContainerStyle}
                                dropDownContainerStyle={styles.dropDownContainerStyle}
                                open={this.state.isCityOpened}
                                setOpen={() => this.setState({ isCityOpened: !this.state.isCityOpened })}
                                value={this.state.selectedCity}
                                setValue={(callback) => {
                                    this.setState((state: any) => ({
                                        selectedCity: callback(state.value),
                                        blankError: ''
                                    }));
                                }}
                                items={this.state.cityList}


                            />
                        </View> */}

                        <View style={{
                            alignItems: "center",
                            justifyContent: "center",

                        }}>
                            <DropDownPicker
                                searchable={true}
                                multiple={this.props.isMultiSelect}
                                dropDownDirection={"TOP"}
                                placeholder='Select City'
                                style={styles.inputContainerStyle}
                                dropDownContainerStyle={styles.dropDownContainerStyle}
                                open={this.state.isCityOpened}
                                setOpen={() => this.setState({ isCityOpened: !this.state.isCityOpened })}
                                value={this.state.selectedCity}
                                setValue={(callback) => {
                                    this.setState((state: any) => ({
                                        selectedCity: callback(state.value),
                                        blankError: ''
                                    }));
                                }}
                                items={this.state.cityList}

                            />

                        </View>

                        {
                            <Text style={FormStyle.errorText}>{this.state.blankError}</Text>
                        }


                        <TouchableOpacity style={styles.loginBtn}
                            onPress={() => this._signUpHandler()}>
                            <Text style={{ color: "white" }}>
                                {
                                    !this.state.isPressed ? 'SIGN UP' : ''
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

                        <Text style={{ marginTop: 30, marginBottom: 30 }}
                            onPress={() => this.props.navigation.navigate('SignIn')}
                        >Already have an account? SignIn</Text>
                    </View>


                </ScrollView>
            </SafeAreaView >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },

    image: {
        // marginBottom: 40,
        width: '50%',
        maxWidth: 300,
        maxHeight: 300
    },

    inputView: {
        backgroundColor: "#e4e8e5",
        // borderWidth:1,
        // borderColor:'black',
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
        marginTop: 40,
        backgroundColor: "#1E276F",
        flexDirection: 'row'
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
        height: "400%"
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
