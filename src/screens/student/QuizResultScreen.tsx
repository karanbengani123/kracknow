import * as React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Pressable, TouchableOpacity, FlatList, BackHandler, ActivityIndicator, Dimensions } from 'react-native';
import { GetExamDetailsAPI, GetMarksAPI, GetScheduleListAPI, } from '../../api-services/User.api';

import ExamDetails from './ExamDetailsScreen'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Environment from "../constants/Environment";
import { SafeAreaView } from 'react-native-safe-area-context';



interface Props {
    navigation: any;
    route: any
}

interface State {
    scheduleList: any;
    result: any;
    isLoading: boolean;


}



export default class QuizResultScreen extends React.Component<Props, State> {
    backHandler: any;
    constructor(props: Props) {
        super(props);

        this.state = {
            scheduleList: {},
            result: {},
            isLoading: true,


        };


    }
    componentDidMount(): void {
        setTimeout(() => {
            this._getMarksHandler();
            // this._getScheduleListHandler();
        }, 5000)
        // this._getMarksHandler();
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

    }

    componentWillMount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
        // this.setState = () => {
        //     return;
        // };
    }


    handleBackButton() {
        // this.props.navigation.navigate("Exam");
        return true;
    }



    _getScheduleListHandler(): void {
        GetScheduleListAPI()
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
                        response: any[],
                    }
                    message: string
                }
            }) => {

                this.setState({
                    scheduleList: res.data.payload.response
                });
            });

    }



    _getMarksHandler(): void {
        // debugger;
        GetMarksAPI(this.props.route.params?.participantUuid)
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
                        response: any[],
                    }
                    message: string
                }
            }) => {

                // debugger;
                if (res.statusCode === 200) {
                    this.setState({
                        result: res.data.payload.response,
                        isLoading: false
                    });
                    console.log(this.state.result, "res marks state")
                    console.log(res.data.payload.response, "res ")
                }
                else {
                    this.setState({
                        isLoading: false
                    });
                }
                // this.setState({ isLoading: false });

            });


    }

    render(): React.ReactNode {

        if (this.state.isLoading) {
            return (
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
            );
        }

        return (
            <ScrollView showsVerticalScrollIndicator={false} >
                <View style={styles.root}>
                    <View style={{ alignItems: 'center', marginTop: 40 }}>
                        <Text style={{ color: 'green' }}>Thanks for submitting your answers</Text>
                    </View>
                    <View style={{ alignItems: 'center', marginTop: 40 }}>

                        <Text style={{ fontWeight: '500', fontSize: 18, color: '#0A1042', }}>Total Score: {this.state.result.marks} </Text>
                    </View>
                    <View style={{ alignItems: 'center', marginTop: 20 }}>

                        <Text style={{ fontWeight: '500', fontSize: 18, color: '#0A1042', }}>Congratulations...! </Text>
                    </View>
                    {/* {this.state.result.marks > 30 &&
                    <View style={{ alignItems: 'center', marginTop: 20 }}>
                    <Image style={{ height: 60, width: 60, }} source={require("../../../assets/images/happy.png")}></Image>
                    </View>
                    }
                    {this.state.result.marks > 10 &&
                    <View style={{ alignItems: 'center', marginTop: 20 }}>
                    <Image style={{ height: 60, width: 60, }} source={require("../../../assets/images/sad.png")}></Image>
                    </View>
                    } */}

                    {/* <SafeAreaView style={{marginTop:40}}>
                        <FlatList
                            // horizontal
                            pagingEnabled={true}
                            // showsHorizontalScrollIndicator={false}
                            data={this.state.scheduleList}
                            renderItem={this.renderItem1}
                            keyExtractor={(item, index) => index.toString()} 
                        />
                    </SafeAreaView> */}
                    <View style={{ justifyContent: 'space-between', display: 'flex', marginTop: 100 }}>

                        <View style={{ flexDirection: 'row', display: 'flex', justifyContent: 'space-around', marginBottom: 50 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Image style={{ height: 20, width: 20, marginRight: 5 }} source={require("../../../assets/images/correct.png")}></Image>
                                <Text style={{ fontWeight: '500', fontSize: 14, color: '#0A1042', }}>Correct: {this.state.result.correctCount}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Image style={{ height: 20, width: 20, marginRight: 5 }} source={require("../../../assets/images/remove.png")}></Image>
                                <Text style={{ fontWeight: '500', fontSize: 14, color: '#0A1042', }}>Wrong: {this.state.result.inCorrectCount}</Text>
                            </View>

                        </View>
                        <View style={{ flexDirection: 'row', display: 'flex', justifyContent: 'space-around' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Image style={{ height: 20, width: 20, marginRight: 5 }} source={require("../../../assets/images/clock.png")}></Image>
                                <Text style={{ fontWeight: '500', fontSize: 14, color: '#0A1042', }}>Timeout: {this.state.result.timeOut}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Image style={{ height: 15, width: 15, marginRight: 5, marginTop: 4 }} source={require("../../../assets/images/next.png")}></Image>
                                <Text style={{ fontWeight: '500', fontSize: 14, color: '#0A1042', }}>Skipped: {this.state.result.skipped}</Text>
                            </View>

                        </View>
                    </View>

                    {/* <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity style={{ backgroundColor: '#1E276F', display: 'flex', alignItems: 'center', padding: 10, marginTop: 80, borderRadius: 10, width: '30%' }}
                            onPress={() => this.props.navigation.navigate('ExamReview', {
                                participantUuid: this.props.route.params?.participantUuid
                            })}>
                            <Text style={{ color: 'white' }}>Review</Text>
                        </TouchableOpacity>
                    </View> */}

                    {/* <SafeAreaView>
                        <FlatList
                            // horizontal
                            pagingEnabled={true}
                            // showsHorizontalScrollIndicator={false}
                            data={this.state.scheduleList}
                            renderItem={this.renderItem}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </SafeAreaView> */}
                    <View style={{ alignItems: 'center', marginTop: 20 }}>
                        <TouchableOpacity
                            style={{ backgroundColor: '#1E276F', display: 'flex', alignItems: 'center', padding: 10, marginTop: 80, borderRadius: 10, width: '30%' }}
                            onPress={() => {
                                BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton)
                                this.props.navigation.navigate('Quiz')
                            }}>
                            <Text style={{ color: 'white' }}>Go to Home</Text>
                        </TouchableOpacity>
                    </View>



                </View>
            </ScrollView >

        );
    }
}

const styles = StyleSheet.create({
    screen: {
        // backgroundColor: Colors.white
    },
    root: {
        flex: 1,
        padding: 10,
        justifyContent: 'space-between', display: 'flex',
        marginVertical: 50
    },
});

