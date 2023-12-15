import * as React from 'react';
import { View, Text, Image, StyleSheet, Button, TouchableOpacity, useWindowDimensions, ScrollView, FlatList, TextInput, Alert, Modal, Pressable, ToastAndroid, SafeAreaView } from 'react-native';
import { TabStyle } from '../styles/TabStyle';
import DropDownPicker from 'react-native-dropdown-picker';
import Colors from '../constants/Colors';
import { FormStyle } from '../../styles/Styles';
import { WithdrawAPI } from '../../api-services/User.api';
import { IWithdrawRequest } from '../models/Auth.models';
import WithdrawPendingScreen from './WithdrawPendingScreen';
import WithdrawCompletedRequest from './WithdrawCompletedRequest';
import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";
import { GetBankListAPI, SignUpAPI } from '../../api-services/User.api';
import HeaderBack from './HeaderBack';
import Header from './Header';
import Ionicons from 'react-native-vector-icons/Ionicons';




interface Props {
    navigation: any;
    isMultiSelect: boolean;

}

interface State {
    selectedTab: string;
    tabList: string[];
    modalVisible: boolean;
    isOpened: boolean;
    selectedPayment: string;
    blankError: string;
    amount: string;
    upiid: string;
    amountError: string;
    blankError1: string;
    upiError: string;
    bankList: any[];
    isBankOpened: boolean;
    selectedBank: string;
    bankError: string;
    ifscError: string;
    accountError: string;
    account: string;
    ifsc: string;
    accountName: string;
    accountNameError: string






}

export default class BankToWalletScreen extends React.Component<Props, State> {
    private _tabListRef: any;


    constructor(props: Props) {
        super(props)

        this.state = {
            selectedTab: this.props.navigation.navigate?.tab || 'Pending',
            tabList: ['Pending', 'Completed'],
            modalVisible: false,
            isOpened: false,
            selectedPayment: '',
            blankError: '',
            amount: '',
            upiid: '',
            amountError: '',
            blankError1: '',
            upiError: '',
            bankList: [],
            isBankOpened: false,
            selectedBank: '',
            bankError: '',
            ifscError: '',
            accountError: '',
            account: '',
            ifsc: '',
            accountName: '',
            accountNameError: ''






        }
    }

    componentDidMount(): void {
        this._getBankListHandler();
    }


    _toggleTabHandler(tabName: string): void {
        this.setState({
            selectedTab: tabName,
        });
    }

    _renderItems = ({ item }: { item: any }) => (
        <TouchableOpacity
            activeOpacity={1}
            style={[
                TabStyle.transfertab,
                item === this.state.selectedTab && TabStyle.transferactiveTab,
            ]}
            onPress={() => this._toggleTabHandler(item)}>
            <Text
                style={[
                    TabStyle.transfertabText,
                    item === this.state.selectedTab && TabStyle.transferactiveTabText,
                ]}>
                {item}
            </Text>
        </TouchableOpacity>
    );


    _withdrawHandler(): void {
        const payload: IWithdrawRequest = {
            amount: this.state.amount,
            transferMode: this.state.selectedPayment,
            upiID: this.state.upiid || " ",
            bankName: this.state.selectedBank || " ",
            accountNumber: this.state.account || " ",
            accountHolder: this.state.accountName || " ",
            IFSCCode: this.state.ifsc || " "

        };

        if (this.state.selectedPayment === "" || this.state.amount === "") {

            if (this.state.selectedPayment === "") {
                this.setState({
                    blankError: 'required'
                })
                return;
            } else {
                this.setState({
                    blankError: ''
                })

                if (this.state.selectedPayment === "bank") {
                    if (this.state.selectedBank === "") {
                        this.setState({
                            bankError: 'required'
                        })
                        return;
                    }
                    if (this.state.account === "") {
                        this.setState({
                            accountError: 'required'
                        })
                        return;
                    }
                    if (this.state.ifsc === "") {
                        this.setState({
                            ifscError: 'required'
                        })
                        return;
                    }
                    if (this.state.accountName === "") {
                        this.setState({
                            accountNameError: 'required'
                        })
                        return;
                    }
                }
                if (this.state.selectedPayment === "upi") {
                    if (this.state.upiid === "") {
                        this.setState({
                            upiError: 'required'
                        })
                        return;
                    }
                }

            }
            if (this.state.amount === "") {
                this.setState({
                    amountError: 'required'
                })
                return;
            }
        }
        // debugger
        WithdrawAPI(payload)
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
                        this._getBankListHandler();
                        showMessage({
                            message: "Successfully Applied",
                            type: "success",
                        });
                        this.setState({
                            modalVisible: false, selectedPayment: '',
                            blankError: '',
                            amount: '',
                            upiid: '',
                            amountError: '',
                            blankError1: '',
                            upiError: '',
                            selectedBank: '',
                            bankError: '',
                            ifscError: '',
                            accountError: '',
                            account: '',
                            ifsc: '',
                            accountName: '',
                            accountNameError: ''
                        });
                    }
                    else {
                        // ToastAndroid.show(res.data.message, ToastAndroid.SHORT);
                        this.setState({ modalVisible: false });
                        showMessage({
                            message: res.data.message,
                            type: "danger",
                        });


                    }
                    // console.log('::::::::', this.state.isPressed)
                    // debugger;
                }
            );

    }

    _getBankListHandler(): void {
        // debugger;
        GetBankListAPI()
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
                    bankList: res.data.payload
                        .map((payload) => {
                            return {
                                label: payload.bankName,
                                value: payload.bankName

                            };
                        })
                });
            });
    }
    _closebtnHandler(): void {
        this.setState({
            modalVisible: false, selectedPayment: '',
            blankError: '',
            amount: '',
            upiid: '',
            amountError: '',
            blankError1: '',
            upiError: '',
            selectedBank: '',
            bankError: '',
            ifscError: '',
            accountError: '',
            account: '',
            ifsc: '',
            accountName: '',
            accountNameError: ''
        });
    }

    render(): React.ReactNode {
        const { modalVisible } = this.state;
        const Items = [
            { label: 'UPI ID', value: 'upi' },
            { label: 'Paytm', value: 'paytm' },
            { label: 'Bank Account', value: 'bank' }
        ]

        return (
            <SafeAreaView>
                {/* <HeaderBack navigation={this.props.navigation} name="" /> */}
                {/* <Header navigation={this.props.navigation} /> */}
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
                        Terms & Conditions
                    </Text>
                </View>
                <FlashMessage position="top" />
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity
                        style={styles.loginBtn}
                        // onPress={() => this.props.navigation.navigate('Wallet')}
                        onPress={() => this.setState({ modalVisible: true })}
                    >
                        <Text style={{ color: "white" }}>Add Transfer Request</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.centeredView}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            // Alert.alert("Modal has been closed.");
                            this.setState({ modalVisible: false });
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>

                                < DropDownPicker
                                    multiple={this.props.isMultiSelect}
                                    placeholder='Select Payment Type'
                                    style={styles.inputContainerStyle}
                                    dropDownContainerStyle={styles.dropDownContainerStyle}
                                    open={this.state.isOpened}
                                    setOpen={() => this.setState({ isOpened: !this.state.isOpened })}
                                    value={this.state.selectedPayment}
                                    setValue={(callback) => {
                                        this.setState((state: any) => ({
                                            selectedPayment: callback(state.value),
                                            blankError: ''
                                        }));
                                    }}
                                    items={Items}
                                />

                                {
                                    <Text style={FormStyle.errorText}>{this.state.blankError}</Text>
                                }

                                <View style={styles.inputView}>

                                    < TextInput
                                        style={styles.TextInput}
                                        placeholder="Enter Withdraw Amount"
                                        placeholderTextColor="black"
                                        keyboardType='numeric'
                                        onChangeText={(text) => this.setState({ amount: text, amountError: "" })}

                                    // onChangeText={(text) => this.setState({ firstName: text, blankError1: "" })}
                                    // onEndEditing={() => this._validateInputHandler('name')}
                                    // value={this.state.amount}
                                    />

                                </View>

                                {
                                    <Text style={FormStyle.errorText}>{this.state.amountError}</Text>
                                }

                                {
                                    this.state.selectedPayment === "upi" &&
                                    <><View style={styles.inputView}>
                                        <TextInput
                                            style={styles.TextInput}
                                            placeholder="Enter UPI ID"
                                            placeholderTextColor="black"
                                            onChangeText={(text) => this.setState({ upiid: text, upiError: "" })} />
                                    </View><Text style={FormStyle.errorText}>{this.state.upiError}</Text></>

                                }


                                {
                                    this.state.selectedPayment === "bank" &&
                                    <>
                                        <DropDownPicker
                                            multiple={this.props.isMultiSelect}
                                            placeholder='Select Bank'
                                            style={styles.inputContainerStyle}
                                            dropDownContainerStyle={styles.dropDownContainerStyle}
                                            open={this.state.isBankOpened}
                                            setOpen={() => this.setState({ isBankOpened: !this.state.isBankOpened })}
                                            value={this.state.selectedBank}
                                            setValue={(callback) => {
                                                this.setState((state: any) => ({
                                                    selectedBank: callback(state.value),
                                                    bankError: ''
                                                }));
                                            }}
                                            items={this.state.bankList}


                                        />
                                        {
                                            <Text style={FormStyle.errorText}>{this.state.bankError}</Text>
                                        }

                                        <View style={styles.inputView}>
                                            <TextInput
                                                style={styles.TextInput}
                                                placeholder="Enter Account Holder Name"
                                                placeholderTextColor="black"
                                                onChangeText={(text) => this.setState({ accountName: text, accountError: "" })} />
                                        </View>
                                        <Text style={FormStyle.errorText}>{this.state.accountNameError}</Text>

                                        <View style={styles.inputView}>
                                            <TextInput
                                                style={styles.TextInput}
                                                placeholder="Enter Account Number"
                                                placeholderTextColor="black"
                                                onChangeText={(text) => this.setState({ account: text, accountError: "" })} />
                                        </View>
                                        <Text style={FormStyle.errorText}>{this.state.accountError}</Text>

                                        <View style={styles.inputView}>
                                            <TextInput
                                                style={styles.TextInput}
                                                placeholder="Enter IFSC code"
                                                placeholderTextColor="black"
                                                onChangeText={(text) => this.setState({ ifsc: text, ifscError: "" })} />
                                        </View>
                                        <Text style={FormStyle.errorText}>{this.state.ifscError}</Text>


                                    </>

                                }




                                {/* <View style={styles.inputView}>
                                    < TextInput
                                        style={styles.TextInput}
                                        placeholder="Enter Phone Number"
                                        placeholderTextColor="black"
                                    // onChangeText={(text) => this.setState({ firstName: text, blankError1: "" })}
                                    // onEndEditing={() => this._validateInputHandler('name')}
                                    // value={this.state.firstName}
                                    />
                                </View> */}




                                <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-evenly' }}>

                                    <TouchableOpacity style={{ backgroundColor: '#1E276F', padding: 8, borderRadius: 10, }}
                                        onPress={() => this._withdrawHandler()}
                                    >
                                        <Text style={{ color: 'white' }}>Schedule now</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={() => this._closebtnHandler()}
                                    >
                                        <Text style={styles.textStyle}>Close</Text>
                                    </TouchableOpacity>


                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>

                <View style={TabStyle.transfertabContainer}>
                    <FlatList
                        ref={ref => (this._tabListRef = ref)}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ flexDirection: 'row' }}
                        data={this.state.tabList}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={this._renderItems}
                    />
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                    {this.state.selectedTab === 'Pending' &&
                        <WithdrawPendingScreen
                            navigation={this.props.navigation}
                        />
                    }
                    {this.state.selectedTab === 'Completed' &&
                        <WithdrawCompletedRequest
                            navigation={this.props.navigation}
                        />
                    }
                </ScrollView>

            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        // alignItems: 'center',
        // padding: 20,
    },
    // 
    profile: {
        height: 80,
        backgroundColor: '#1E276F',
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
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
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        // alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        // marginBottom:10
    },
    dropDownContainerStyle: {
        borderColor: Colors.text
    },
    inputContainerStyle: {
        backgroundColor: "#e4e8e5",
        borderWidth: 0,
        borderRadius: 10,
        width: "100%",
        // borderBottomWidth: 1,
        // borderBottomColor: Colors.text,
        height: 45,
        // marginRight: 5,
        // paddingLeft: 0,
        // zIndex: 10,
        // alignItems: "center",
        marginTop: 20,
    },
    button: {
        borderRadius: 10,
        padding: 8,
        // elevation: 2,
        // marginTop:10
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "red",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 1,
    },
    inputView: {
        backgroundColor: "#e4e8e5",
        // borderWidth:1,
        // borderColor:'black',
        borderRadius: 10,
        // width: "80%",
        height: 45,
        // marginBottom: 10,
        marginTop: 25,
        // alignItems: "center",
    },
})