
import * as React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Pressable, TouchableOpacity, SafeAreaView } from 'react-native';

import ExamDetails from './ExamDetailsScreen'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors';
import { GetTournamentDetailsAPI } from '../../api-services/User.api';


 
interface Props {
    navigation: any;
    route: any

}

interface State {
}





export default class ExamDetailsScreen extends React.PureComponent<Props, State> {

    private focusListener: any;

    constructor(props: Props) {
        super(props);

        this.state = {
           
        };
    }

    componentDidMount(): void {
        this._getTournamentListHandler();
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            this._getTournamentListHandler();
        })
       
    }

    componentWillUnmount(): void {
        // LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
        this.setState = () => {
            return;
        };
        // this.focusListener.remove();
    }


    _getTournamentListHandler(): void {
        // debugger;
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




    render(): React.ReactNode {
        return (
            <SafeAreaView style={styles.screen}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.root}>


                        {/* <Image
                        source={require("../../../assets/images/leaderboard.png")}
                        style={{ position: 'absolute', width: 500, maxHeight: 200 }}


                    /> */}
                        {/* <View style={{ padding: 15, }}>

                            <Ionicons
                                name={'arrow-back'}
                                size={25}
                                color={Colors.black}
                                // style={HeaderNavigatorStyles.iconSpacing}
                                onPress={() => this.props.navigation.navigate('Tournament')}
                            />
                        </View> */}
                        <Image source={require("../../../assets/images/tour1.png")}
                            style={{ width: 500, height: 200 }}></Image>

                        <View style={{ padding: 20 }}>


                            {/* <Ionicons
                                name={'arrow-back'}
                                size={25}
                                color={Colors.white}
                                // style={HeaderNavigatorStyles.iconSpacing}
                                onPress={() => this.props.navigation.navigate('Feed')}
                            /> */}

                            <Text style={{ fontWeight: '500', fontSize: 18, color: 'black', paddingTop: 10, marginBottom: 10 }}>Math Tournament</Text>
                            <Text style={{
                                color: 'black', 
                                fontSize: 12,
                                fontWeight: '500'
                            }}>Tournament ID: 123456</Text>
                            <Text style={{
                                color: 'black',
                                fontSize: 12,
                                fontWeight: '500'
                            }}>Start on: 1 June 2022, 11:00 pm</Text>
                            {/* <Text style={{
                                color: 'black',
                                fontSize: 12,
                                fontWeight: '500'
                            }}>Total 15 Questions(MCQs)</Text> */}


                            <View style={{ flexDirection: 'row', marginTop: 25, }}>
                                <Text style={{
                                    color: 'black',
                                    fontSize: 15,
                                    fontWeight: '500'
                                }}>Total Winnings</Text>

                                <Text style={{
                                    color: 'black',
                                    fontSize: 15,
                                    fontWeight: '500', marginLeft: 25
                                }}>Total Seats</Text>

                                <Text style={{
                                    color: 'black',
                                    fontSize: 15,
                                    fontWeight: '500', marginLeft: 25
                                }}>Joining fee</Text>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 5 }}>

                                <Ionicons
                                    name={'trophy'}
                                    size={25}
                                    color={Colors.warning}
                                // style={HeaderNavigatorStyles.iconSpacing}
                                />

                                <Text style={styles.rupee}>
                                    {'\u20B9'}
                                </Text>

                                <Text style={styles.rupee}>100</Text>

                                <Text style={{
                                    fontSize: 20,
                                    fontWeight: '500', color: 'black', marginLeft: 55
                                }}>1/10</Text>

                                <Text style={{
                                    fontSize: 20,
                                    fontWeight: '500', color: '#FAC140', marginLeft: 60
                                }}>FREE</Text>
                            </View>
                        </View>
                        <View style={{ padding: 20 }}>

                            <View style={{ flexDirection: 'row' }}>

                                <Text style={{ fontSize: 18, color: '#1E276F', fontWeight: '500' }}>Exams</Text>
                                {/* <TouchableOpacity style={{ marginTop: 8, marginLeft: 240 }} onPress={() => this.props.navigation.navigate('Prizes')}>
                                    <Text style={{ fontSize: 12, color: '#1E276F', fontWeight: '500', }}>More</Text>
                                </TouchableOpacity> */}
                            </View>

                            <View style={{ borderRadius: 20, borderWidth: 1, borderColor: '#1E276F', flexDirection: 'row', padding: 20, marginTop: 10 }}>
                                <Ionicons
                                    name={'trophy'}
                                    size={25}
                                    color={Colors.warning}
                                // style={HeaderNavigatorStyles.iconSpacing}
                                />
                                <Text style={{ marginLeft: 30, fontSize: 16, fontWeight: '500', color: 'black' }}>Exam-1</Text>
                                {/* <Text style={{ marginLeft: 30, color: '#FAC140', fontSize: 16, fontWeight: '500', }}>
                                    {'\u20B9'}
                                </Text>

                                <Text style={{ color: '#FAC140', fontSize: 16, fontWeight: '500' }}>50</Text> */}

                                {/* <Ionicons
                                    name={'medal'}
                                    size={25}
                                    color={Colors.warning}
                                    style={{ marginLeft: 30 }}
                                // style={HeaderNavigatorStyles.iconSpacing}
                                /> */}
                                <TouchableOpacity style={{
                                    width: "30%",
                                    borderRadius: 25,
                                    height: 30,
                                    marginLeft: 100,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    // marginTop: 70,
                                    backgroundColor: "#1E276F",
                                }}>
                                    <Text style={{ color: 'white' }}>Start</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ borderRadius: 20, borderWidth: 1, borderColor: '#1E276F', flexDirection: 'row', padding: 20, marginTop: 10 }}>
                                <Ionicons
                                    name={'trophy'}
                                    size={25}
                                    color={Colors.warning}
                                // style={HeaderNavigatorStyles.iconSpacing}
                                />
                                <Text style={{ marginLeft: 30, fontSize: 16, fontWeight: '500', color: 'black' }}>Exam-2</Text>
                                {/* <Text style={{ marginLeft: 30, color: '#FAC140', fontSize: 16, fontWeight: '500', }}>
                                    {'\u20B9'}
                                </Text>

                                <Text style={{ color: '#FAC140', fontSize: 16, fontWeight: '500' }}>50</Text> */}

                                {/* <Ionicons
                                    name={'medal'}
                                    size={25}
                                    color={Colors.warning}
                                    style={{ marginLeft: 30 }}
                                // style={HeaderNavigatorStyles.iconSpacing}
                                /> */}
                                <TouchableOpacity style={{
                                    width: "30%",
                                    borderRadius: 25,
                                    height: 30,
                                    marginLeft: 100,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    // marginTop: 70,
                                    backgroundColor: "#1E276F",
                                }}>
                                    <Text style={{ color: 'white' }}>Start</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ borderRadius: 20, borderWidth: 1, borderColor: '#1E276F', flexDirection: 'row', padding: 20, marginTop: 10 }}>
                                <Ionicons
                                    name={'trophy'}
                                    size={25}
                                    color={Colors.warning}
                                // style={HeaderNavigatorStyles.iconSpacing}
                                />
                                <Text style={{ marginLeft: 30, fontSize: 16, fontWeight: '500', color: 'black' }}>Exam-3</Text>
                                {/* <Text style={{ marginLeft: 30, color: '#FAC140', fontSize: 16, fontWeight: '500', }}>
                                    {'\u20B9'}
                                </Text>

                                <Text style={{ color: '#FAC140', fontSize: 16, fontWeight: '500' }}>50</Text> */}

                                {/* <Ionicons
                                    name={'medal'}
                                    size={25}
                                    color={Colors.warning}
                                    style={{ marginLeft: 30 }}
                                // style={HeaderNavigatorStyles.iconSpacing}
                                /> */}
                                <TouchableOpacity style={{
                                    width: "30%",
                                    borderRadius: 25,
                                    height: 30,
                                    marginLeft: 100,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    // marginTop: 70,
                                    backgroundColor: "#1E276F",
                                }}>
                                    <Text style={{ color: 'white' }}>Start</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ flexDirection: 'row' }}>

                                <Text style={{ fontSize: 18, color: '#1E276F', fontWeight: '500'  }}>Prizes</Text>
                                {/* <TouchableOpacity style={{ marginTop: 8, marginLeft: 240 }} onPress={() => this.props.navigation.navigate('Prizes')}>
                                    <Text style={{ fontSize: 12, color: '#1E276F', fontWeight: '500', }}>More</Text>
                                </TouchableOpacity> */}
                            </View>

                            <View style={{ borderRadius: 20, borderWidth: 1, borderColor: '#1E276F', flexDirection: 'row', padding: 20, marginTop: 10 }}>
                                <Ionicons
                                    name={'trophy'}
                                    size={25}
                                    color={Colors.warning}
                                // style={HeaderNavigatorStyles.iconSpacing}
                                />
                                <Text style={{ marginLeft: 30, fontSize: 16, fontWeight: '500', color: 'black' }}>1st Prize Winner</Text>
                                <Text style={{ marginLeft: 30, color: '#FAC140', fontSize: 16, fontWeight: '500', }}>
                                    {'\u20B9'}
                                </Text>

                                <Text style={{ color: '#FAC140', fontSize: 16, fontWeight: '500' }}>50</Text>

                                <Ionicons
                                    name={'medal'}
                                    size={25}
                                    color={Colors.warning}
                                    style={{ marginLeft: 30 }}
                                // style={HeaderNavigatorStyles.iconSpacing}
                                />
                            </View>

                            <View style={{ borderRadius: 20, borderWidth: 1, borderColor: '#1E276F', flexDirection: 'row', padding: 20, marginTop: 10 }}>
                                <Ionicons
                                    name={'trophy'}
                                    size={25}
                                    color={Colors.warning}
                                // style={HeaderNavigatorStyles.iconSpacing}
                                />
                                <Text style={{ marginLeft: 30, fontSize: 16, fontWeight: '500', color: 'black' }}>1st Prize Winner</Text>
                                <Text style={{ marginLeft: 30, color: '#FAC140', fontSize: 16, fontWeight: '500', }}>
                                    {'\u20B9'}
                                </Text>

                                <Text style={{ color: '#FAC140', fontSize: 16, fontWeight: '500' }}>50</Text>

                                <Ionicons
                                    name={'medal'}
                                    size={25}
                                    color={Colors.warning}
                                    style={{ marginLeft: 30 }}
                                // style={HeaderNavigatorStyles.iconSpacing}
                                />
                            </View>

                            <View style={{ borderRadius: 20, borderWidth: 1, borderColor: '#1E276F', flexDirection: 'row', padding: 20, marginTop: 10 }}>
                                <Ionicons
                                    name={'trophy'}
                                    size={25}
                                    color={Colors.warning}
                                // style={HeaderNavigatorStyles.iconSpacing}
                                />
                                <Text style={{ marginLeft: 30, fontSize: 16, fontWeight: '500', color: 'black' }}>1st Prize Winner</Text>
                                <Text style={{ marginLeft: 30, color: '#FAC140', fontSize: 16, fontWeight: '500', }}>
                                    {'\u20B9'}
                                </Text>

                                <Text style={{ color: '#FAC140', fontSize: 16, fontWeight: '500' }}>50</Text>

                                <Ionicons
                                    name={'medal'}
                                    size={25}
                                    color={Colors.warning}
                                    style={{ marginLeft: 30 }}
                                // style={HeaderNavigatorStyles.iconSpacing}
                                />
                            </View>

                            <Text style={{ marginTop: 40, }}>Description</Text>
                            <Text style={{ marginTop: 40, }}>Ranking Factor</Text>

                        </View>


                    </View>
                </ScrollView >

                <View style={styles.footerContainer}>

                    <Text
                        style={styles.footerText}
                    >
                        Joining Fee
                    </Text>
                    <Text
                        style={{
                            color: '#FAC140', fontSize: 16,
                            fontWeight: '700', marginLeft: 8
                        }}
                    >
                        FREE
                    </Text>
                    <TouchableOpacity style={styles.loginBtn}>
                        <Text style={{ color: 'black' }}>Register</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
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
        marginLeft: 100,
        alignItems: "center",
        justifyContent: "center",
        // marginTop: 70,
        backgroundColor: "white",
    },
    rupee: {
        // marginTop: 10,
        color: '#FAC140',
        fontSize: 20,
        fontWeight: '500',
        marginLeft: 5
    },
    footerContainer: {
        flexDirection: 'row',
        padding: 20,
        backgroundColor: '#1E276F'
    },
    footerText: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: '700',
        marginLeft: 5
    },
    root: {
        // alignItems: 'center',
        // padding: 20,
    },
    searchSection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1
    },
    searchIcon: {
        padding: 10,
    },
    input: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        backgroundColor: '#fff',
        color: '#424242',
    },
    heading: {
        fontSize: 18,
        paddingTop: 5,
        color: '#0A1042',
        fontWeight: '500'
    },
    heading1: {
        color: '#686A7B',
        fontSize: 12,
        fontWeight: '500'

    },
    heading3: {
        fontSize: 18,
        paddingTop: 30,
        color: '#0A1042',
        fontWeight: '500'

    },
    badge: {
        width: 56,
        height: 56,
        backgroundColor: '#9D9D9D',
        borderRadius: 20,
    },
    box: {
        backgroundColor: '#3785E010',
        borderRadius: 14,
        width: 320,
        height: 93,
        marginTop: 30,
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    boxtext: {
        fontWeight: '600',
        fontSize: 18,
        color: '#3F9AE0',
        paddingRight: 30,
    },
    action: {
        display: 'flex',
        flexDirection: 'row',
    },
    action_box: {
        width: 150,
        height: 93,
        borderRadius: 14,
        margin: 10,
        marginTop: 25,
        paddingLeft: 20,
        paddingTop: 20
    },
    action_box_text: {
        fontWeight: 'bold',
        fontSize: 24,
        color: '#FFFFFF',
    },
    action_box_smalltext: {
        fontWeight: '500',
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.6)'
    },
    item3: {
        backgroundColor: '#1E276F',
        padding: 20,
        paddingTop: 10,
        // marginVertical: 10,
        width: 370,
        borderRadius: 14,
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


    item1: {
        backgroundColor: '#FFFFFF',
        padding: 10,
        paddingTop: 10,
        // marginVertical: 10,
        width: 370,
        borderRadius: 14,
    },
    profile: {
        flexDirection: 'row',
        alignSelf: 'flex-end',

    },
    bellicon: {
        marginBottom: 2,
        marginRight: 15,
        alignSelf: 'flex-end',

    },
    adminlogo: {
        alignSelf: 'flex-end',

    },
});

