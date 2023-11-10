import * as React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Pressable, TouchableOpacity, ImageSourcePropType, ToastAndroid, FlatList, SafeAreaView, LogBox, Modal, ActivityIndicator, Dimensions, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors';
import { GetExamDetailsAPI, GetStartExamonTimeAPI, GetSubcategoryAPI, GetTournamentDetailsAPI, GetTournamentLeaderboardAPI, PayPaymentApi, registerAPI, StartTournamentExamAPI, tournamentregisterAPI, tournamentunregisterAPI, unregisterAPI } from '../../api-services/User.api';
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
// const uuid = require('uuid')

import PieChart from 'react-native-pie-chart'
import HeaderBack from './HeaderBack';




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
    tournamentDetails: {
        title: any;
        phoneBanner: any;
        winningPrice: any;
        studentLimit: any;
        description: any;
        joinFee: any;
        startTime: any;
        tournamentSchedule: {
            uuid: any;
            startTime: any;
        }[]

    };
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

    examLeaderboard: any;
    examcomplete: any;

    examregister: any;
    examList: any;
    tournamentDetailsList: any;
    startTime: any;
    examStart: any;


}


export interface IDropDownPickerItems {
    label: string,
    value: string
}


export default class TournamentDoneExamList extends React.Component<Props, State> {
    private focusListener: any;

    constructor(props: Props) {
        super(props);

        this.state = {
            tournamentDetails: {
                title: '',
                phoneBanner: '',
                winningPrice: '',
                studentLimit: '',
                description: '',
                joinFee: '',
                startTime: '',
                tournamentSchedule: [{
                    uuid: '',
                    startTime: ''
                }]



            },
            tournamentparticipation: {
                uuid: '',
            },
            tournamentexamList: '',
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

            examLeaderboard: {},
            examcomplete: '',

            examregister: '',
            examList: '',
            tournamentDetailsList: '',
            startTime: '',
            examStart: ''


        };
    }

    componentDidMount(): void {
        this._getTournamentListHandler();
        this._getLeaderboardHandler();
        GetBannerImageUrls().then(data => {
            console.log(data.json())
        })
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            this._getTournamentListHandler();
            this._getLeaderboardHandler();

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
        // console.log(this.props.route.params?.participationUUID, "uuiddd")
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
                    console.log(this.state.tournamentDetails, 'res....')
                    if (res.data.payload.hasOwnProperty('examStatus')) {
                        this.setState({
                            examcomplete: res.data.payload.examStatus,
                        })
                    }
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
                        examStart: res.data.payload.tournamentSchedule.tournamentSchedule_TournamentScheduledExam,
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

                        examList: timeSort,

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
                    console.log(this.state.examList, "List of exams")

                }
                this.setState({ isLoading: false });
            });
    }

    _getLeaderboardHandler(): void {
        // debugger;
        GetTournamentLeaderboardAPI(this.props.route.params?.participationUUID)
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
                            // isLastRecord: boolean; 
                            response: {
                                chart: any[]
                            };
                        };
                        message: string;
                    };
                }) => {
                    //   debugger;
                    this.setState({
                        examLeaderboard: res.data.payload.response.chart.reverse()
                        // .map((response:any)=>{
                        //     return {
                        //         chart: response.chart
                        //     }
                        // })
                    });
                    console.log(this.state.examLeaderboard, 'resssssss chart')
                }
            );
    }


    renderItem2 = ({ item, index }: any) => {

        const tempFlag = this.state.examList && this.state.examList.filter((o: any) => o.examUUID === item.examUUID)

        console.log(item.examUUID, 'exaaammiid')
        console.log(item.title, 'exaaammname')


        const flag = tempFlag.length ? tempFlag[0].completed : false

        console.log(flag, 'flag')

        return <View>
            {/* {item.status === "COMPLETED" && */}
                <View style={styles.item1}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('TournamentDoneExamScore', {
                            // questionUUID: item.questionUUID
                            uuid: this.props.route.params?.uuid,
                            examUUID: item.examUUID,
                            participationUUID: this.props.route.params?.participationUUID
                        })}
                    >

                        <Text style={{ alignSelf: 'center', color: 'black' }}>{index+1}- {item.tournamentScheduledExam_Exam.title}</Text>
                    </TouchableOpacity>
                </View>
            {/* } */}
            {/* {
                flag ?
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('TournamentDoneExamScore', {
                            // questionUUID: item.questionUUID
                            uuid: this.props.route.params?.uuid,
                            examUUID: item.examUUID,
                            participationUUID: this.props.route.params?.participationUUID
                        })}
                    >

                        <Text style={{ alignSelf: 'center', color: 'black' }}>Exam: {index + 1} - {item.tournamentScheduledExam_Exam.title}</Text>
                    </TouchableOpacity>
                    :

                    <View>
                        <Text style={{ alignSelf: 'center', color: 'black' }}>Exam: {index + 1} - {item.tournamentScheduledExam_Exam.title}</Text>
                        <Text style={{ alignSelf: 'center', color: 'red' }}>Exam not attended</Text>
                    </View>
            } */}

        </View>
    };




    renderItem3 = ({ item, index }: any) => (
        <View >
            <Text style={{ marginBottom: 15, alignSelf: 'center', color: 'black',  marginTop:15 }}>Exam: {item.examName}</Text>

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 40 }}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ backgroundColor: '#4CAF50', height: 20, width: 50, marginRight: 5 }}>
                    </View>
                    <Text style={{ color: 'black' }}>Correct ({item.correct})</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <View style={{ backgroundColor: '#F44336', height: 20, width: 50, marginRight: 5 }}>
                    </View>
                    <Text style={{ color: 'black' }}>In-correct ({item.incorrect})</Text>
                </View>

            </View>

            <View style={{ alignSelf: 'center', }}>

                <PieChart
                    widthAndHeight={250}
                    series={Array(item.correct, item.incorrect)}
                    sliceColor={Array('#4CAF50', '#F44336')}
                    doughnut={true}
                    coverRadius={0.45}
                    coverFill={'#FFF'}
                />

            </View>
        </View>
    )

    render(): React.ReactNode {

        const { modalVisible } = this.state;

        const { modalVisible1 } = this.state;


        return (
            <SafeAreaView style={styles.screen}>
                <HeaderBack navigation={this.props.navigation} name="" />
                <FlashMessage position="top" />
                <ScrollView showsVerticalScrollIndicator={false}>

                    <View style={{ padding: 20 }}>

                        <FlatList
                            //pagingEnabled={true}
                            data={this.state.examList}
                            renderItem={this.renderItem2}
                            keyExtractor={(item, index) => index.toString()}
                        />


                    </View>

                    <View style={{ paddingTop: 20, }}>

                        <FlatList
                            // horizontal
                            pagingEnabled={true}
                            // showsHorizontalScrollIndicator={false}
                            data={this.state.examLeaderboard}
                            renderItem={this.renderItem3}
                        // keyExtractor={item => item.id}
                        // numColumns={5}
                        />
                    </View>

                </ScrollView >

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
        // display: 'flex',
        // flexDirection: 'row',
    },
    item1: {
        backgroundColor: '#FFFFFF',
        padding: 15,
        // display:'flex',
        alignSelf: 'center',
        // paddingTop: 10,
        marginVertical: 5,
        width: '100%',
        borderRadius: 14,
        marginHorizontal: 5,
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 1
        }
    },
});

