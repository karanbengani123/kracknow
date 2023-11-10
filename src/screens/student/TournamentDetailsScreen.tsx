import * as React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Pressable, TouchableOpacity, ImageSourcePropType, ToastAndroid, FlatList, SafeAreaView, LogBox, Modal, ActivityIndicator, Dimensions, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors';
import { GetExamDetailsAPI, GetStartExamonTimeAPI, GetSubcategoryAPI, GetTournamentDetailsAPI, GetTourSubcategoryAPI, PayPaymentApi, registerAPI, StartTournamentExamAPI, tournamentregisterAPI, tournamentunregisterAPI, unregisterAPI } from '../../api-services/User.api';
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
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
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
    // tournamentDetails: {
    //     title: any;
    //     phoneBanner: any;
    //     winningPrice: any;
    //     studentLimit: any;
    //     description: any;
    //     joinFee: any;
    //     startTime: any;
    //     uuid: any;
    //     allowPrimarySelection: boolean;
    //     allowSecondarySelection: boolean;
    //     tournamentSchedule: {
    //         uuid: any;
    //         startTime: any;
    //     }[]

    // };
    disabled1: boolean;
    disabled: boolean;
    tournamentparticipation: {
        uuid: any
    };
    tournamentexamList: any;
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
    examcomplete: any;
    examregister: any;
    examList: any;
    tournamentDetailsList: any;
    startTime: any;
    examStart: any
}


export interface IDropDownPickerItems {
    label: string,
    value: string
}


export default class TournamentDetailsScreen extends React.Component<Props, State> {
    private focusListener: any;

    constructor(props: Props) {
        super(props);

        this.state = { 
            disabled1: false,
            disabled: false,

            tournamentparticipation: {
                uuid: '',
            },
            tournamentexamList: '',
            examList: '',
            examReg: '',
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
            referenceId: '',
            examcomplete: '',
            examregister: '',
            tournamentDetailsList: '',
            startTime: '',
            examStart: ''
        };
    }

    componentDidMount(): void {
        this._getTournamentListHandler();
        this.getSubcategoryHandler();
        GetBannerImageUrls().then(data => {
            console.log(data.json())
        })
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            this._getTournamentListHandler();
            this.getSubcategoryHandler()
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

    _getTournamentListHandler(): void {
        // debugger;
        console.log(this.props.route.params?.uuid, "uuiddd")
        GetTournamentDetailsAPI(this.props.route.params?.uuid)
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
                        tournament: any[];
                        tournamentSchedule: any;
                        //tournament: { title: any; phoneBanner: any; winningPrice: any; studentLimit: any; description: any; joinFee: any; startTime: any; uuid: any; allowPrimarySelection: boolean; allowSecondarySelection: boolean; tournamentSchedule: { uuid: any; startTime: any; }[]; };
                        participation: { uuid: any; };
                        examStudent: any;
                        tournamentExam: any;
                        examStatus: any;
                        // response: any,
                    }
                    message: string
                }
            }) => {
                // debugger;  
                if (res.statusCode === 200) {
                    console.log(res.data.payload, "payload//////////")

                    if (res.data.payload.hasOwnProperty('examStatus')) {
                        this.setState({
                            examcomplete: res.data.payload.examStatus,
                        })
                    }

                    console.log(res.data.payload.hasOwnProperty('examStatus'), ',,,,,.........,,,,,,')
                    let timeSort = res.data.payload.tournamentSchedule.tournamentSchedule_TournamentScheduledExam.sort(
                        function compare(a: any, b: any) {
                            var dateA: any = new Date(a.startTime)
                            var dateB: any = new Date(b.startTime)
                            return dateA - dateB;
                        }
                    )
                    this.setState({
                        tournamentDetailsList: res.data.payload.tournament,
                        startTime: res.data.payload.tournamentSchedule,
                        examReg: res.data.payload.examStudent,
                        examStart: timeSort,
                        // tournamentDetails: res.data.payload.tournament,
                        examregister: res.data.payload.participation,
                        // tournamentparticipation: res.data.payload.participation,
                        // tournamentexamList: res.data.payload.tournamentExam.tournamentSchedule[0].tournamentSchedule_TournamentScheduledExam.map((tournamentSchedule_TournamentScheduledExam: any) => {
                        //     return {
                        //         title: tournamentSchedule_TournamentScheduledExam.tournamentScheduledExam_Exam.title,
                        //         examUUID: tournamentSchedule_TournamentScheduledExam.examUUID,
                        //         uuid: tournamentSchedule_TournamentScheduledExam.uuid
                        //     }
                        // }),

                        examList: res.data.payload.tournamentSchedule.tournamentSchedule_TournamentScheduledExam

                        // examTime: res.data.payload.response.schedule[0],
                        // examRankingFactor: res.data.payload.response.examRankingFactor.map((examRankingFactor: any) => {
                        //     return {
                        //         type: examRankingFactor.type,
                        //         title: examRankingFactor.title,
                        //         points: examRankingFactor.points,
                        //         time: examRankingFactor.time,
                        //         coins: examRankingFactor.coins
                        //     }
                        // }),
                        // examBanner: res.data.payload.tournamentExam,

                    })
                    console.log("state data ", res.data.payload)
                    // , () => {
                    //     // console.log(this.state.tournamentexamList, '.......>>>>>>>>>>>>>>>>')

                    //     console.log(this.state.tournamentDetailsList.title, 'res....')

                    //     // console.log(this.state.tournamentDetails, "...data")
                    //     console.log(this.state.examcomplete, 'examStatus>>>>>>>>>>>>')
                    //     // this.getSubcategoryHandler();
                    // });

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
            // examUUID: this.state.examDetails.uuid,
            // examScheduleUUID: this.state.examTime.uuid,
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
        console.log(payload, "payload sentt")
        console.log(this.state.startTime.uuid, "reg uuid")
        tournamentregisterAPI(this.state.startTime.uuid, payload)
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
                    this.setState({
                        modalVisible: false,
                        disabled: false
                    });
                    this._getTournamentListHandler();
                    // ToastAndroid.show("Successfully Registered", ToastAndroid.SHORT);
                    showMessage({
                        message: "Successfully Registered",
                        type: "success",
                    });

                }
                else if (res.statusCode === 400) {
                    this.setState({
                        modalVisible: false,
                        disabled: false
                    });
                    this._getTournamentListHandler();
                    // ToastAndroid.show(res?.message, ToastAndroid.SHORT);

                    // ToastAndroid.show("All seats are filled", ToastAndroid.SHORT);
                    showMessage({
                        message: "Can't register now",
                        type: "danger",
                    });
                }
                else if (res.statusCode === 404) {
                    this.setState({
                        modalVisible: false,
                        disabled: false
                    });
                    this._getTournamentListHandler();
                    // ToastAndroid.show("Not enough money in wallet", ToastAndroid.SHORT);
                    showMessage({
                        message: "Not enough money in wallet",
                        type: "danger",
                    });
                }
                else if (res.statusCode === 500) {
                    this.setState({
                        modalVisible: false,
                        disabled: false
                    });
                    this._getTournamentListHandler();
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

                    this.setState({
                        modalVisible: false,
                        disabled: false
                    });
                }

            });

        // debugger;

    }

    _unregisterHandler(): void {
        this.setState({
            disabled1: true
        })
        // debugger;
        console.log(this.state.examregister.uuid, "tour uuid////////")
        tournamentunregisterAPI(this.state.startTime.uuid, this.state.examregister.uuid)
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
                // this.setState({

                // });

                if (res.statusCode === 200) {
                    // ToastAndroid.show("Successfully Unregistered", ToastAndroid.SHORT);
                    showMessage({
                        message: "Successfully Unregistered",
                        type: "info",
                    });
                    // this._paymentDeduct();
                    this._getTournamentListHandler();
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


    startExamonTime(examuuid: string, examScheduleuuid: string): void {
        // debugger;
        const payload = {
            // currentTime: moment().utcOffset('+05:30').format('YYYY-MM-DD hh:mm:ss a'),
            // examUUID: this.state.examDetails.uuid,
            examUUID: examuuid,
            participationUUID: this.state.examregister.uuid
        };

        console.log(",<<<<<<<<<<<<<<<<<<<<<,", payload)

        StartTournamentExamAPI(payload)
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
                // debugger;

                if (res.statusCode === 200) {
                    console.log(examuuid, '.............')

                    this.props.navigation.navigate('TournamentStart', { 
                        // examUuid: this.state.examDetails.uuid,
                        // participantUuid: this.state.examDetails.schedule[0].studentExam.uuid
                        // examScheduleUUID:this.state.tournamentDetails.tournamentSchedule[0].uuid,
                        examUUID: examuuid,
                        examScheduleUUID: examScheduleuuid,
                        participationUUID: this.state.examregister.uuid
                    })
                }
                if (res.statusCode === 400) {
                    showMessage({
                        message: "You can't start exam now",
                        type: "danger",
                    });
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
        console.log(this.props.route.params?.uuid, "touruuidddd")
        GetTourSubcategoryAPI((this.props.route.params?.uuid))
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
        if (this.state.tournamentDetailsList.allowPrimarySelection || this.state.tournamentDetailsList.allowSecondarySelection) {
            this.setState({
                modalVisible: true,
                disabled: false
            });
        } else {
            this._registerHandler();

        }
    }

    renderItem2 = ({ item, index }: any) => {

        const tempFlag = this.state.examcomplete && this.state.examcomplete.filter((o: any) => o.examUUID === item.examUUID)

        console.log(item.examUUID, 'exaaammiid')
        console.log(item.uuid, 'exaaammname uuid')


        const flag = tempFlag.length ? tempFlag[0].completed : false

        console.log(flag, 'flag')
        // obj.sort((a,b)=>new Date(a.startTime)-new Date(b.startTime))
        return <View>

            <View style={styles.item1}>
                <View style={styles.action}>
                    <View style={{ flexDirection: 'column', flex: 1 }}>

                        <Text
                            style={{
                                fontSize: 14, fontWeight: '500', color: '#0E242C', fontStyle: 'normal', marginBottom: 5
                            }}
                            numberOfLines={2}
                            ellipsizeMode='tail'>
                           {index+1}- {item.tournamentScheduledExam_Exam.title}
                        </Text>

                        <Text style={{
                            color: 'black',
                            fontSize: 10,
                            fontWeight: '500'
                        }}>Starts on: {moment(new Date(item.startTime)).utcOffset('').format("ddd, DD-MMM-YYYY, hh:mm a")}</Text>
                        <Text style={{
                            color: 'black',
                            fontSize: 10,
                            fontWeight: '500'
                        }}>Ends on: {moment(new Date(item.endTime)).utcOffset('').format("ddd, DD-MMM-YYYY, hh:mm a")}</Text>

                    </View>


                    {
                        flag ?

                            <Text style={{ color: 'red', alignSelf: 'center' }}>Completed</Text>
                            :
                            <TouchableOpacity style={styles.loginBtn1}
                                onPress={() => this.startExamonTime(item.examUUID, item.uuid)}>
                                <Text style={{ color: 'white' }}>Start</Text>
                            </TouchableOpacity>

                        // <Text>Completed</Text>
                    }
                </View>
            </View>
        </View>
    }

    render(): React.ReactNode {

        const { modalVisible } = this.state;

        const { modalVisible1 } = this.state;


        return (
            <SafeAreaView style={styles.screen}>
                <HeaderBack navigation={this.props.navigation} name="" />
                
                <FlashMessage position="top" />
                <ScrollView showsVerticalScrollIndicator={false}>

                    {
                        this.state.tournamentDetailsList.phoneBanner &&

                        <Image
                            style={{ height: 190, width: '100%' }}
                            source={
                                (
                                    this.state.tournamentDetailsList.phoneBanner
                                        ? { uri: this.state.tournamentDetailsList.phoneBanner }
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
                            <Text style={{ fontWeight: '500', fontSize: 18, color: 'black', paddingTop: 10, marginBottom: 10, }}>{this.state.tournamentDetailsList.title}</Text>

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
                                        {moment(new Date(this.state.startTime.startTime)).utcOffset('').format("ddd, DD-MMM-YYYY, hh:mm a")}
                                    </Text>
                                </View>

                            </View>
                            {/* <View style={{ flexDirection: 'row', paddingTop: 10 }}>

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
                                    XXXXXXXXXXXXXXX
                                </Text>
                            </View>


                        </View> */}



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
                                        {'\u20B9'} {this.state.tournamentDetailsList.winningPrice}
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
                                        {this.state.tournamentDetailsList.studentLimit}
                                    </Text>
                                </View>

                            </View>

                            {this.state.tournamentDetailsList.description &&
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
                                            {this.state.tournamentDetailsList.description}
                                        </Text>
                                    </View>
                                </View>
                            }





                            {this.state.examregister !== null &&
                                <View style={{ paddingTop: 10 }}>
                                    <FlatList
                                        pagingEnabled={true}
                                        data={this.state.examStart}
                                        renderItem={this.renderItem2}
                                        keyExtractor={(item, index) => index.toString()}
                                    />
                                </View>
                            }




                        </View>
                    }
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

                                    {this.state.tournamentDetailsList.allowPrimarySelection &&
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

                                    {this.state.tournamentDetailsList.allowSecondarySelection &&
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
                                            onPress={() => this.setState({
                                                modalVisible: false,
                                                disabled: false
                                            })}
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
                                {this.state.tournamentDetailsList.joinFee === 0 ? 'FREE' : (this.state.tournamentDetailsList.joinFee)}
                            </Text>
                        </View>
                        {
                            this.state.examReg && true
                                ?

                                <TouchableOpacity
                                    style={styles.loginBtn}
                                    onPress={() => this._unregisterHandler()}
                                    disabled={this.state.disabled1}

                                >
                                    <Text style={{ color: 'black' }}>Un-Register</Text>
                                </TouchableOpacity>
                                :

                                <TouchableOpacity
                                    style={styles.loginBtn}
                                    onPress={() => this._registerExam()}
                                    disabled={this.state.disabled}

                                >
                                    <Text style={{ color: 'black' }}>Register</Text>
                                </TouchableOpacity>
                        }

                        {/* {(this.state.examTime.studentExam && !this.state.appeared) &&
                        <TouchableOpacity
                            style={styles.loginBtn}
                            // onPress={() => this.props.navigation.navigate('ExamStart', {
                            //     examUuid: this.state.examDetails.uuid,
                            //     participantUuid: this.state.examDetails.schedule[0].studentExam.uuid
                            // })}
                            onPress={() => this.startExamonTime()}
                        >
                            <Text style={{ color: 'black' }}>Start Exam</Text>
                        </TouchableOpacity>
                    } */}

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
    loginBtn1: {
        width: "30%",
        borderRadius: 25,
        height: 30,
        // marginLeft: 100,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: 'center',
        // marginTop: 70,
        backgroundColor: Colors.primary,
        // marginTop: 5
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
    action: {
        display: 'flex',
        flexDirection: 'row',
    },
    item1: {
        backgroundColor: '#FFFFFF',
        padding: 15,
        paddingTop: 10,
        marginVertical: 10,
        width: '100%',
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#1E276F',
    },
});

