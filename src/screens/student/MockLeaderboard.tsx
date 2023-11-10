import * as React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Pressable, TouchableOpacity, FlatList, ImageSourcePropType } from 'react-native';

import Colors from '../constants/Colors';

import ExamDetails from './ExamDetailsScreen'
import { GetCompletedExamListAPI, GetCompletedMockListAPI, GetScheduleListAPI } from '../../api-services/User.api';
import moment from 'moment';




interface Props {
    navigation: any;
}

interface State {
    scheduleList: any;
    completedList: any



}



export default class MockLeaderboard extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            scheduleList: {},
            completedList: {}



        };


    }

    componentDidMount(): void {
        // this._getScheduleListHandler();
        this._getCompletedExamListHandler()

    }

    componentWillUnmount(): void {

    }


    _getScheduleListHandler(): void {
        GetScheduleListAPI()
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
                this.setState({
                    scheduleList: res.data.payload.response

                });


            });
    }

    _getCompletedExamListHandler(): void {
        GetCompletedMockListAPI()
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
                this.setState({
                    completedList: res.data.payload.response,
                    // examList: res.data.payload.response
                    // .map((response) => {
                    //     return {
                    //         participantUuid: response.schedule[0].studentExam.uuid,

                    //     };
                    // })

                });
                // debugger;

            });

    }


    formatAMPM = (date: any) => {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    };

    getDateTime = (dateString: any) => {
        const date = new Date(dateString);
        return [
            date.getDate(),
            date.toLocaleString('default', { month: 'long' }),
            date.getFullYear()
        ].join(' ') +
            ', ' +
            this.formatAMPM(date);
    };


    renderItem = ({ item }: any) => (
        <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Leaderboard1', {
                uuid: item.schedule[0].uuid
            })}
        >

            <View style={styles.item1}>
                <View style={styles.action}>
                    {/* <Text>{item.index}</Text> */}
                    {/* <Image source={require("../../../assets/images/Group54.png")} Leaderboard1/>
                    <Image style={{ position: 'absolute' }} source={require("../../../assets/images/Group53.png")} /> */}
                    <Image
                        style={{ height: 60, width: 70, borderRadius: 5 }}
                        source={
                            (
                                item.examBanner.url
                                    ? { uri: item.examBanner.url }
                                    : require('../../../assets/images/defaultbanner.jpg')
                            ) as ImageSourcePropType
                        }
                    />
                    <View style={{ flexDirection: 'column', flex: 1 }}>

                        <Text
                            style={{
                                fontSize: 12, fontWeight: '500', color: '#0E242C', fontStyle: 'normal', marginLeft: 5, marginTop: 5
                            }}
                            numberOfLines={2}
                            ellipsizeMode='tail'>{item.title}</Text>
                        <Text style={{
                            fontSize: 10, fontWeight: '400', color: '#00000', opacity: 0.6, marginTop: 10, marginLeft: 5
                        }}>Date: {moment(new Date(item.schedule[0].startTime)).utcOffset('').format("ddd, DD-MMM-YYYY, hh:mm a")}
                            {/* {this.getDateTime(item.schedule[0].startTime)} */}
                        </Text>


                    </View>
                    {/* <View style={{alignSelf:'center', marginLeft:70}}>

                        <Image style={{  }} source={require("../../../assets/images/Checklist.png")} />
                    </View> */}
                </View>
            </View>
        </TouchableOpacity>

    );

    render(): React.ReactNode {
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.root}>
                {
                        this.state.completedList.length === 0 ?

                            <View style={{ flex: 1, alignItems: 'center', marginTop: 100 }}>
                                <Text>No Mock- tests Found</Text>
                            </View>
                            :
                    <FlatList
                        // horizontal
                        pagingEnabled={true}
                        // showsHorizontalScrollIndicator={false}
                        data={this.state.completedList}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => index.toString()}
                    />
                }
                </View>
            </ScrollView >
        );
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.white
    },
    root: {
        // alignItems: 'center',
        padding: 20,
    },
    action: {
        display: 'flex',
        flexDirection: 'row',
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
        marginVertical: 10,
        width: '100%',
        borderRadius: 14,
    },
});

