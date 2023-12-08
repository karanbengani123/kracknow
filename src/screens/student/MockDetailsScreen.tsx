import * as React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Pressable, TouchableOpacity, ImageSourcePropType, ToastAndroid, FlatList, SafeAreaView, LogBox, Modal, ActivityIndicator, Dimensions, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors';
import { GetMockDetailsAPI, GetQuizDetailsAPI, GetStartExamonTimeAPI, GetSubcategoryAPI, PayPaymentApi, registerAPI, unregisterAPI } from '../../api-services/User.api';
import DropDownPicker from 'react-native-dropdown-picker';
import { FormStyle } from "../../styles/Styles";
import { Table, Row, Rows } from 'react-native-table-component';
import moment from 'moment';
import { showMessage, hideMessage } from "react-native-flash-message";
import FlashMessage from "react-native-flash-message";
import { GetBannerImageUrls } from "../../api-services/User.api";
import Environment from '../constants/Environment';
import RNPgReactNativeSDK from 'react-native-pg-react-native-sdk'
import { IAdd } from '../models/Auth.models';
// import uuid from 'react-native-uuid';
import { constant } from 'lodash';
import { DataTable } from 'react-native-paper';
import HeaderBack from './HeaderBack';
// const uuid = require('uuid')



interface Props {
    navigation: any;
    fieldLabel?: string;
    isMultiSelect: boolean;
    placeholder: string;
    isMandatory?: boolean;
    items: IDropDownPickerItems[];
    open: boolean;
    setOpen: (status: any) => void;
    value: string | string[];
    setValue: any;
    route: any
}

interface State {
    disabled1: boolean;
    disabled: boolean;
    examReg: any;
    examDetails: any;
    examTime: any;
    examRankingFactor: any;
    examBanner: any;
    examPrice: any;
    appeared: any;
    modalVisible: boolean;
    modalVisible1: boolean;
    value: string | string[];
    subcategoryList: IDropDownPickerItems[];
    isPrimaryOpened: boolean;
    isSecondaryOpened: boolean;
    selectedPrimary: string;
    selectedSecondary: string;
    blankError: string;
    blankError1: string;
    isLoading: boolean;
    orderAmount: string;
    orderId: any;
    referenceId: any;
}


export interface IDropDownPickerItems {
    label: string,
    value: string
}


export default class MockDetailsScreen extends React.Component<Props, State> {
    private focusListener: any;

    constructor(props: Props) {
        super(props);

        this.state = {
            disabled1: false,
            disabled: false,
            examReg: {},
            examDetails: {},
            examTime: {},
            examRankingFactor: {},
            examBanner: {},
            appeared: {},
            examPrice: {},
            modalVisible: false,
            modalVisible1: false,
            value: this.props.value,
            subcategoryList: [],
            isPrimaryOpened: false,
            isSecondaryOpened: false,
            selectedPrimary: '',
            selectedSecondary: '',
            blankError: '',
            blankError1: '',
            isLoading: true,
            orderAmount: '',
            orderId: '',
            referenceId: ''
        };
    }

    componentDidMount(): void {
        this._getExamListHandler();
        
        GetBannerImageUrls().then(data => {
            console.log(data.json())
        })
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            this._getExamListHandler();
        })
        
    }

    componentWillUnmount(): void {
        // LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
        GetBannerImageUrls().then((data) => {
            console.log(data.json());
        });
        this.setState = () => {
            return;
        };
        // this.focusListener.remove();
    }

    _getExamListHandler(): void {
        // debugger;
        GetMockDetailsAPI(this.props.route.params?.uuid)
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
                        response: any,
                    }
                    message: string
                }
            }) => {
                // debugger;
                if (res.statusCode === 200) {
                    this.setState({
                        examReg: res.data.payload,
                        examDetails: res.data.payload.response,
                        examTime: res.data.payload.response.schedule[0],
                        examRankingFactor: res.data.payload.response.examRankingFactor.map((examRankingFactor: any) => {
                            return {
                                type: examRankingFactor.type,
                                title: examRankingFactor.title,
                                points: examRankingFactor.points,
                                time: examRankingFactor.time,
                                coins: examRankingFactor.coins
                            }
                        }),
                        examBanner: res.data.payload.response.examBanner,

                        // examPrice: res.data.payload.response.schedule[0].studentExam !== null   
                        //     ? res.data.payload.response.examprice.map((examprice: any) => {
                        //         return {
                        //             toValue: examprice.toValue,
                        //             amount: examprice.amount
                        //         }
                        //     })
                        //     : []
                    }, () => {
                        this.getSubcategoryHandler();
                    });
                    if (res.data.payload.response.schedule[0].hasOwnProperty("studentExam")) {
                        this.setState({
                            appeared: res.data.payload.response.schedule[0].studentExam.status === "APPEARED" || res.data.payload.response.schedule[0].studentExam.status === "COMPLETED"
                        })
                    }
                    // console.log(res.data.payload.response.schedule[0], "data")
                }
                this.setState({ isLoading: false });
            });
    }

    _registerHandler(): void {
        this.setState({
            disabled: true
        })
        const payload = {
            currentTime: moment().utcOffset('+05:30').format('YYYY-MM-DD hh:mm:ss a'),
            examUUID: this.state.examDetails.uuid,
            examScheduleUUID: this.state.examTime.uuid,
            primarySubcategory: this.state.selectedPrimary,
            secondarySubcategory: this.state.selectedSecondary
        };
        if (this.state.selectedPrimary === "") {
            this.setState({
                blankError: 'This field is required'
            })
            // return;
        }
        if (this.state.selectedSecondary === "") {
            this.setState({
                blankError1: ''
            })
            // return;
        }
        // debugger;
        registerAPI(this.props.route.params?.uuid, payload)
            .then(response => {
                const statusCode = response.status;
                const data = statusCode === 200 ? response.json() : null;
                // const message = response.message;
                // const data = response.json()

                return Promise.all([statusCode, data]).then(res => ({
                    statusCode: res[0],
                    data: res[1],
                }));
            })
            .then((res: {
                statusCode: number,
                data: {
                    payload: {
                        response: any,
                    }

                }

            }) => {
                // debugger;

                if (res.statusCode === 200) {
                    this.setState({ modalVisible: false, disabled: false });
                    this._getExamListHandler();
                    // ToastAndroid.show("Successfully Registered", ToastAndroid.SHORT);
                    showMessage({
                        message: "Successfully Registered",
                        type: "success",
                    });

                }
                else if (res.statusCode === 400) {
                    this.setState({ modalVisible: false, disabled: false });
                    this._getExamListHandler();
                    // ToastAndroid.show(res?.message, ToastAndroid.SHORT);

                    // ToastAndroid.show("All seats are filled", ToastAndroid.SHORT);
                    showMessage({
                        message: "Can't register now",
                        type: "danger",
                    });
                }
                else if (res.statusCode === 404) {
                    this.setState({ modalVisible: false, disabled: false });
                    this._getExamListHandler();
                    // ToastAndroid.show("Not enough money in wallet", ToastAndroid.SHORT);
                    showMessage({
                        message: "Not enough money in wallet",
                        type: "danger",
                    });
                }
                else if (res.statusCode === 500) {
                    this.setState({ modalVisible: false, disabled: false });
                    this._getExamListHandler();
                    // ToastAndroid.show("Not enough money in wallet", ToastAndroid.SHORT);
                    showMessage({
                        message: "Internal server error",
                        type: "danger",
                    });
                }
                else {
                    // ToastAndroid.show(res.data?.message, ToastAndroid.SHORT);
                    // showMessage({
                    //     message: "Hello",
                    //     // description: "This is our second message",
                    //     type: "success",
                    //   });

                    this.setState({ modalVisible: false });
                }

            });

        // debugger;

    }

    _unregisterHandler(): void {
        this.setState({
            disabled1: true
        })
        // debugger;
        unregisterAPI(this.state.examDetails.schedule[0].studentExam.uuid)
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
                        response: any,
                    }
                    message: string
                }
            }) => {
                // this.setState({

                // });

                if (res.statusCode === 200) {
                    // ToastAndroid.show("Successfully Unregistered", ToastAndroid.SHORT);
                    showMessage({
                        message: "Successfully Unregistered",
                        type: "info",
                    });
                    // this._paymentDeduct();
                    this._getExamListHandler();
                    this.setState({
                        disabled1: false
                    })
                }

                else {
                    // ToastAndroid.show("Can't Unregister Now", ToastAndroid.SHORT);
                    showMessage({
                        message: "Can't Unregister Now",
                        type: "danger",
                    });
                    this.setState({
                        disabled1: false
                    })

                }
                // debugger;

            });

    }


    startExamonTime(): void {
        // debugger;
        const payload = {
            currentTime: moment().utcOffset('+05:30').format('YYYY-MM-DD hh:mm:ss a'),
            examUUID: this.state.examDetails.uuid,
            examScheduleUUID: this.state.examDetails.schedule[0].uuid
        };

        //     if(this.state.selectedPrimary)
        //     payload['primarySubcategory']=this.state.selectedPrimary
        // if(this.state.selectedSecondary)
        //     payload['primarySubcategory']= this.state.selectedSecondary



        // if (this.state.selectedPrimary === "") {
        //     this.setState({
        //         blankError: 'This field is required'
        //     })
        //     // return;
        // }
        // if (this.state.selectedSecondary === "") {
        //     this.setState({
        //         blankError1: ''
        //     })
        //     // return;
        // }
        // debugger;
        GetStartExamonTimeAPI(this.state.examDetails.schedule[0].studentExam.uuid, payload)
            .then(response => {
                const statusCode = response.status;
                const data = statusCode === 200 ? response.json() : null;
                // const data = response.json()

                return Promise.all([statusCode, data]).then(res => ({
                    statusCode: res[0],
                    data: res[1]
                }));
            })
            .then((res: {
                statusCode: number,
                data: {
                    payload: {
                        response: any,
                    }
                    message: string
                }

            }) => {

                if (res.statusCode === 200) {
                    this.props.navigation.navigate('MockStart', {
                        examUuid: this.state.examDetails.uuid,
                        participantUuid: this.state.examDetails.schedule[0].studentExam.uuid
                    })
                }
                else {
                    // ToastAndroid.show("You can't join exam now", ToastAndroid.SHORT);
                    showMessage({
                        message: "You can't join exam now",
                        type: "danger",
                    });

                }

            });

        // debugger;

    }

    renderItem = ({ item }: any) => (
        <View style={{ borderRadius: 20, borderWidth: 1, borderColor: '#1E276F', flexDirection: 'row', padding: 15, marginTop: 10, justifyContent: 'space-around' }}>
            <Ionicons
                name={'trophy'}
                size={25}
                color={Colors.warning}
            />
            <Text style={{ marginLeft: 30, fontSize: 16, fontWeight: '500', color: 'black' }}>{item.toValue}</Text>
            {/* <Text style={{ marginLeft: 30, color: '#FAC140', fontSize: 16, fontWeight: '500', }}>
                {'\u20B9'}
            </Text> */}

            <Text style={{ color: '#FAC140', fontSize: 16, fontWeight: '500' }}>{'\u20B9'} {item.amount}</Text>

            <Ionicons
                name={'medal'}
                size={25}
                color={Colors.warning}
                style={{ marginLeft: 30 }}
            />
        </View>

    );

    renderItem1 = ({ item }: any) => (
        <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <View>
                <Text style={{
                    marginTop: 0, fontSize: 12,
                    fontWeight: '400', color: 'black', paddingLeft: 4, borderBottomWidth: 0.5
                    // borderTopWidth: 1, borderBottomWidth: 1, borderLeftWidth: 1
                }}>{item.title}</Text>
            </View>
            <View>
                <Text style={{
                    marginTop: 0, fontSize: 12,
                    fontWeight: '400', color: 'black', paddingLeft: 4, borderBottomWidth: 0.5
                    //  borderTopWidth: 1, borderBottomWidth: 1, borderLeftWidth: 1
                }}>{item.time}</Text>
            </View>
            <View>
                <Text style={{
                    marginTop: 0, fontSize: 12,
                    fontWeight: '400', color: 'black', paddingLeft: 4, borderBottomWidth: 0.5
                    // borderWidth: 1,
                }}>{item.points}</Text>
            </View>
            <View>
                <Text style={{
                    marginTop: 0, fontSize: 12,
                    fontWeight: '400', width: 80, color: 'black', paddingLeft: 4, borderBottomWidth: 0.5
                    // borderWidth: 1,
                }}>{item.coins}</Text>
            </View>
        </View>
    );

    getSubcategoryHandler(): void {
        GetSubcategoryAPI((this.state.examDetails.uuid))
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
                        response: any[],
                    }
                    message: string
                }
            }) => {
                // debugger;
                this.setState({
                    subcategoryList: res.data.payload.response
                        .map((subcategory) => {
                            return {
                                label: subcategory.label,
                                value: subcategory.uuid
                            };
                        })
                });

            });
    }

    _registerExam(): void {
        if (this.state.examDetails.allowPrimarySelection || this.state.examDetails.allowSecondarySelection) {
            this.setState({ modalVisible: true, disabled: false });
        } else {
            this._registerHandler();

        }
    }



    render(): React.ReactNode {
        // if (this.state.isLoading) {
        //     return (
        //         <View style={{
        //             flex: 1,
        //             justifyContent: 'center',
        //             alignItems: 'center',
        //             height: Dimensions.get('window').height / 2
        //         }}>
        //             <ActivityIndicator
        //                 size={'large'}
        //                 color={Colors.primary}
        //             />
        //         </View> 
        //     );
        // }

        const { modalVisible } = this.state;

        const { modalVisible1 } = this.state;


        return (
            <SafeAreaView style={styles.screen}>
          <HeaderBack navigation={this.props.navigation} name="" />
                <FlashMessage position="top" />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.root}>
                        {this.state.examBanner.phoneBanner &&
                            <Image
                                style={{ height: 190, width: '100%' }}
                                source={
                                    (
                                        this.state.examBanner.phoneBanner
                                            ? { uri: this.state.examBanner.phoneBanner }
                                            : require('../../../assets/images/defaultbanner.jpg')
                                    ) as ImageSourcePropType
                                }
                                onLoadEnd={() => {
                                    console.log("image loaded")
                                    this.setState({ isLoading: false })
                                }}
                            />
                        }

                        {
                            this.state.isLoading &&
                            <View style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: Dimensions.get('window').height / 2
                            }}>
                                <ActivityIndicator
                                    size={'large'}
                                    color={Colors.primary}
                                />
                            </View>
                        }

                        {
                            !this.state.isLoading &&

                            <View style={{ padding: 20 }}>
                                <Text style={{ fontWeight: '500', fontSize: 18, color: 'black', paddingTop: 10, marginBottom: 10, }}>{this.state.examDetails.title}</Text>

                                <View style={{ flexDirection: 'row', paddingTop: 10 }}>

                                    <Text style={{
                                        color: 'black',
                                        fontSize: 12,
                                        fontWeight: '500'
                                    }}>Starts on: </Text>



                                    <View style={{
                                        backgroundColor: '#fdff32',
                                        paddingLeft: 2,
                                        paddingRight: 2,
                                        borderRadius: 5
                                    }}>

                                        <Text style={{
                                            color: 'black',
                                            fontSize: 12,
                                            fontWeight: '500'
                                        }}>
                                            {moment(new Date(this.state.examTime.startTime)).utcOffset('').format("ddd, DD-MMM-YYYY, hh:mm a")}
                                        </Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', paddingTop: 10 }}>

                                    <Text style={{
                                        color: 'black',
                                        fontSize: 12,
                                        fontWeight: '500'
                                    }}>Ends on: </Text>

                                    <View style={{
                                        backgroundColor: '#8cff32',
                                        paddingLeft: 2,
                                        paddingRight: 2,
                                        borderRadius: 5
                                    }}>

                                        <Text style={{
                                            color: 'black',
                                            fontSize: 12,
                                            fontWeight: '500'
                                        }}>
                                            {moment(new Date(this.state.examTime.endTime)).utcOffset('').format("ddd, DD-MMM-YYYY, hh:mm a")}
                                        </Text>
                                    </View>
                                </View>



                                <View style={{ flexDirection: 'row', paddingTop: 10 }}>

                                    <Text style={{
                                        color: 'black',
                                        fontSize: 12,
                                        fontWeight: '500'
                                    }}>Total Winnings: </Text>



                                    <View style={{
                                        backgroundColor: '#a41a1a',
                                        paddingLeft: 2,
                                        paddingRight: 2,
                                        borderRadius: 5
                                    }}>

                                        <Text style={{
                                            color: 'white',
                                            fontSize: 12,
                                            fontWeight: '500'
                                        }}>
                                            {'\u20B9'} {this.state.examDetails.totalWinningPrize}
                                        </Text>
                                    </View>
                                </View>

                                <View style={{ flexDirection: 'row', paddingTop: 10 }}>

                                    <Text style={{
                                        color: 'black',
                                        fontSize: 12,
                                        fontWeight: '500'
                                    }}>Total Questions: </Text>

                                    <View style={{
                                        backgroundColor: '#00ffd9',
                                        paddingLeft: 2,
                                        paddingRight: 2,
                                        borderRadius: 5
                                    }}>

                                        <Text style={{
                                            color: 'black',
                                            fontSize: 12,
                                            fontWeight: '500'
                                        }}>
                                            {this.state.examDetails.totalQuestions}
                                        </Text>
                                    </View>
                                </View>

                                <View style={{ flexDirection: 'row', paddingTop: 10 }}>

                                    <Text style={{
                                        color: 'black',
                                        fontSize: 12,
                                        fontWeight: '500'
                                    }}>Total Seats: </Text>



                                    <View style={{
                                        backgroundColor: 'blue',
                                        paddingLeft: 2,
                                        paddingRight: 2,
                                        borderRadius: 5
                                    }}>

                                        <Text style={{
                                            color: 'white',
                                            fontSize: 12,
                                            fontWeight: '500'
                                        }}>
                                            {this.state.examDetails.studentLimit}
                                        </Text>
                                    </View>
                                </View>

                                <View style={{ flexDirection: 'row', paddingTop: 10 }}>

                                    <Text style={{
                                        color: 'black',
                                        fontSize: 12,
                                        fontWeight: '500'
                                    }}>Join Delay: </Text>



                                    <View style={{
                                        backgroundColor: '#afafaf',
                                        paddingLeft: 2,
                                        paddingRight: 2,
                                        borderRadius: 5
                                    }}>

                                        <Text style={{
                                            color: 'black',
                                            fontSize: 12,
                                            fontWeight: '500'
                                        }}>
                                            {this.state.examDetails.joinDelay} sec
                                        </Text>
                                    </View>
                                </View>


                                {this.state.examDetails.description &&
                                    <View style={{ flexDirection: 'row', paddingTop: 10 }}>

                                        <Text style={{
                                            color: 'black',
                                            fontSize: 12,
                                            fontWeight: '500'
                                        }}>Description: </Text>



                                        <View style={{
                                            // backgroundColor: 'red',
                                            // paddingLeft: 2,
                                            // paddingRight: 2,
                                            // borderRadius: 5
                                        }}>

                                            <Text style={{
                                                // color: 'white',
                                                fontSize: 12,
                                                fontWeight: '400', color: 'black'
                                            }}>
                                                {this.state.examDetails.description}
                                            </Text>
                                        </View>
                                    </View>
                                }

                                <View style={{ paddingTop: 10 }}>
                                    {this.state.examRankingFactor.length !== 0 &&
                                        <View>
                                            <Text style={{
                                                color: 'black',
                                                fontSize: 12,
                                                fontWeight: '500'
                                            }}>Ranking Factor:</Text>


                                            <DataTable >
                                                <DataTable.Header >
                                                    <DataTable.Title style={{ flex: 1.5 }} >Title</DataTable.Title>
                                                    <DataTable.Title >Time(sec)</DataTable.Title>
                                                    <DataTable.Title >Points</DataTable.Title>
                                                    <DataTable.Title style={{ flex: 1.5 }}>Rewards(paisa)</DataTable.Title>
                                                </DataTable.Header>
                                                {this.state.examRankingFactor.map((data: {
                                                    title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined;
                                                    time: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined;
                                                    points: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined;
                                                    coins: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined;
                                                }) => (
                                                    <DataTable.Row>
                                                        <DataTable.Cell style={{ flex: 1.5 }}>{data.title}</DataTable.Cell>
                                                        <DataTable.Cell>{data.time}</DataTable.Cell>
                                                        <DataTable.Cell>{data.points}</DataTable.Cell>
                                                        <DataTable.Cell style={{ flex: 1.5 }}>{data.coins}</DataTable.Cell>
                                                    </DataTable.Row>
                                                )
                                                )}
                                            </DataTable>

                                        </View>
                                    }
                                </View>

                                {/* <TouchableOpacity style={{ backgroundColor: 'red' }} onPress={() => this.setState({ modalVisible1: true })}>
                                <Text>Test_Btn</Text>
                            </TouchableOpacity> */}
                                <View style={styles.centeredView}>
                                    <Modal
                                        animationType="slide"
                                        transparent={true}
                                        visible={modalVisible1}
                                        onRequestClose={() => {
                                            // Alert.alert("Modal has been closed.");
                                            this.setState({ modalVisible1: false });
                                        }}
                                    >
                                        <View style={styles.centeredView}>
                                            <View style={styles.modalView}>


                                                <Text style={{ marginBottom: 10, color: 'red' }}> *Not enough wallet balance for registering</Text>

                                                <View style={{ marginTop: 20, justifyContent: 'space-evenly', marginLeft: 60, marginRight: 60 }}>

                                                    <TouchableOpacity style={{ backgroundColor: '#1E276F', padding: 5, borderRadius: 10, marginBottom: 10 }}
                                                        // onPress={() => this.setModalVisible(true)}
                                                        onPress={() => this.props.navigation.navigate('Wallet')}
                                                    >
                                                        <Text style={styles.textStyle}>Go to Wallet</Text>
                                                    </TouchableOpacity>

                                                    <TouchableOpacity
                                                        style={[styles.button, styles.buttonClose]}
                                                        onPress={() => this.setState({ modalVisible1: false })}
                                                    >
                                                        <Text style={styles.textStyle}>Close</Text>
                                                    </TouchableOpacity>


                                                </View>
                                            </View>
                                        </View>
                                    </Modal>
                                </View>


                            </View>
                        }
                    </View>
                </ScrollView >

                {
                    !this.state.isLoading &&
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


                                    <Text style={{ marginBottom: 10 }}>Once again you selected your exam, you will have to assign a primary and secondary subject for your exam.The Primary will give you 2x points for every correct answer you give.The secondary will give you 1.5x points scored by you in the given exam </Text>

                                    {this.state.examDetails.allowPrimarySelection &&
                                        < DropDownPicker
                                            multiple={this.props.isMultiSelect}
                                            placeholder='Select Primary'
                                            style={styles.inputContainerStyle}
                                            dropDownContainerStyle={styles.dropDownContainerStyle}
                                            open={this.state.isPrimaryOpened}
                                            setOpen={() => this.setState({ isPrimaryOpened: !this.state.isPrimaryOpened })}
                                            value={this.state.selectedPrimary}
                                            setValue={(callback) => {
                                                this.setState((state: any) => ({
                                                    selectedPrimary: callback(state.value),
                                                    // blankError: ''
                                                }));
                                            }}
                                            items={this.state.subcategoryList}
                                        />
                                    }
                                    {/* {
                                    <Text style={FormStyle.errorText}>{this.state.blankError}</Text>
                                } */}

                                    {this.state.examDetails.allowSecondarySelection &&
                                        <DropDownPicker
                                            multiple={this.props.isMultiSelect}
                                            placeholder='Select Secondary'
                                            style={styles.inputContainerStyle}
                                            dropDownContainerStyle={styles.dropDownContainerStyle}
                                            open={this.state.isSecondaryOpened}
                                            setOpen={() => this.setState({ isSecondaryOpened: !this.state.isSecondaryOpened })}
                                            value={this.state.selectedSecondary}
                                            setValue={(callback) => {
                                                this.setState((state: any) => ({
                                                    selectedSecondary: callback(state.value),
                                                    // blankError1: ''
                                                }));
                                            }}
                                            items={this.state.subcategoryList}
                                        />
                                    }

                                    {/* {
                                    <Text style={FormStyle.errorText}>{this.state.blankError1}</Text>
                                } */}

                                    <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-evenly' }}>

                                        <TouchableOpacity style={{ backgroundColor: '#1E276F', padding: 5, borderRadius: 10, }}
                                            onPress={() => this._registerHandler()}
                                            disabled={this.state.disabled}

                                        // onPress={() => this.setModalVisible(true)}
                                        >
                                            <Text style={{ color: 'white' }}>Register</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={[styles.button, styles.buttonClose]}
                                            onPress={() => this.setState({ modalVisible: false, disabled: false })}
                                        >
                                            <Text style={styles.textStyle}>Close</Text>
                                        </TouchableOpacity>


                                    </View>
                                </View>
                            </View>
                        </Modal>
                    </View>
                }
                {
                    !this.state.isLoading &&
                    <View style={styles.footerContainer}>
                        <View style={{ flexDirection: 'row' }}>

                            <Text
                                style={styles.footerText}
                            >
                                Joining Fee
                            </Text>
                            <Text
                                style={{
                                    color: '#FAC140', fontSize: 16,
                                    fontWeight: '700', marginLeft: 4, marginTop: 1
                                }}
                            >
                                {this.state.examDetails.joinFee === 0 ? 'FREE' : (this.state.examDetails.joinFee)}
                            </Text>
                        </View>
                        {
                            this.state.examReg.examStudent && true
                                ?
                                <>
                                    {(!this.state.appeared) &&
                                        <TouchableOpacity
                                            style={styles.loginBtn}
                                            onPress={() => this._unregisterHandler()}
                                            disabled={this.state.disabled1}

                                        >
                                            <Text style={{ color: 'black' }}>Un-Register</Text>
                                        </TouchableOpacity>
                                    }
                                </>
                                :

                                <TouchableOpacity
                                    // disabled={!this.startTimeExam()}
                                    style={styles.loginBtn}
                                    onPress={() => this._registerExam()}
                                    disabled={this.state.disabled}

                                >
                                    <Text style={{ color: 'black' }}>Register</Text>
                                </TouchableOpacity>
                        }

                        {(this.state.examTime.studentExam && !this.state.appeared) &&
                            <TouchableOpacity
                                // disabled={!this.startExam()}
                                style={styles.loginBtn}
                                // onPress={() => this.props.navigation.navigate('ExamStart', {
                                //     examUuid: this.state.examDetails.uuid,
                                //     participantUuid: this.state.examDetails.schedule[0].studentExam.uuid
                                // })}
                                onPress={() => this.startExamonTime()}
                            >
                                <Text style={{ color: 'black' }}>Start Mock</Text>
                            </TouchableOpacity>
                        }

                    </View>
                }
            </SafeAreaView >
        );
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        // backgroundColor: Colors.white
    },
    loginBtn: {
        width: "30%",
        borderRadius: 25,
        height: 30,
        // marginLeft: 100,
        alignItems: "center",
        justifyContent: "center",
        // marginTop: 70,
        backgroundColor: "white",
    },
    rupee: {
        // marginTop: 10,
        color: '#FAC140',
        fontSize: 15,
        fontWeight: '500',
        marginLeft: 5
    },
    footerContainer: {
        flexDirection: 'row',
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#1E276F',
        justifyContent: 'space-between'
    },
    footerText: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: '700',
        marginLeft: 0
    },
    root: {
        // alignItems: 'center',
        // padding: 20,
    },
    item: {
        backgroundColor: '#FFFFFF',
        // padding: 20,
        // paddingTop: 10,
        // marginVertical: 10,
        width: 200,
        borderRadius: 14,
        marginHorizontal: 10
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
        elevation: 5
    },
    button: {
        borderRadius: 10,
        padding: 5,
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
    dropDownContainerStyle: {
        borderColor: Colors.text
    },
    inputContainerStyle: {
        borderWidth: 0,
        borderRadius: 0,
        borderBottomWidth: 1,
        borderBottomColor: Colors.text,
        height: 40.3,
        marginRight: 5,
        paddingLeft: 0,
        zIndex: 10
    },

});

