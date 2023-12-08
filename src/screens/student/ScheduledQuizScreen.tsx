
import moment from 'moment';
import * as React from 'react';
import { StyleSheet, Text, View, Image, FlatList, ScrollView, Pressable, ImageSourcePropType, ActivityIndicator, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GetExamListAPI, GetScheduleListAPI, GetScheduleQuizListAPI } from '../../api-services/User.api';
import Colors from '../constants/Colors';



interface Props {
    navigation: any;

}

interface State {
    scheduleList: any[];
    isLoading: boolean;

}




export default class ScheduledQuizScreen extends React.Component<Props, State> {
    private focusListener: any;

    constructor(props: Props) {
        super(props);

        this.state = {
            scheduleList: [],
            isLoading: true,

        };


    }

    componentDidMount(): void {
        this._getScheduleListHandler();
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            this._getScheduleListHandler();
        })

    }

    componentWillUnmount(): void {
        this.setState = () => {
            return;
        };
        // this.focusListener.remove();
    }


    renderItem1 = ({ item }: any) => (
        <TouchableOpacity onPress={() => this.props.navigation.navigate('ExamDetails', { uuid: item.schedule[0].uuid })}>
            <View style={styles.item}>
                <View style={{ borderWidth: 1, borderColor: '#EEEEEA', }}>
                    <Image
                        style={{ height: 180, width: '100%', }}
                        source={
                            (
                                item.examBanner.phoneBanner
                                    ? { uri: item.examBanner.phoneBanner }
                                    :
                                    require('../../../assets/images/defaultbanner.jpg')
                            ) as ImageSourcePropType
                        }
                    />
                    <View style={{ position: 'absolute', backgroundColor: '#167278', marginTop: 150, padding: 2, borderRadius: 5, right: 15 }}>
                        <Text style={{ fontSize: 10, fontWeight: '500', color: 'white', }}>Fee: {item.joinFee}</Text>
                    </View>

                    <View style={{ backgroundColor: 'yellow', position: 'absolute', marginTop: 10, padding: 2, borderRadius: 5, marginLeft: 10 }}>
                        <Text style={{ fontSize: 10, fontWeight: '700', color: 'black', }}>Win: {'\u20B9'}{item.totalWinningPrize}</Text>
                    </View>

                    <View style={{ padding: 10, }}>
                        <Text style={{ fontSize: 14, fontWeight: '500', color: '#0E242C', fontStyle: 'normal' }}>{item.title}</Text>
                        <View style={{ flexDirection: 'row', }}>
                            <Text style={{ fontSize: 10, fontWeight: '400', color: '#00000', opacity: 0.6, marginTop: 5 }}>Start: {moment(new Date(item.schedule[0].startTime)).utcOffset('').format("ddd, DD-MMM-YYYY, hh:mm a")}</Text>
                            <Text style={{ fontSize: 10, fontWeight: '400', color: '#00000', opacity: 0.6, marginTop: 5, marginLeft: 30 }}>Total seat: {item.studentLimit}</Text>
                        </View>
                    </View>
                </View>

            </View>
        </TouchableOpacity>

    );
    _getScheduleListHandler(): void {
        GetScheduleQuizListAPI()
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
                if (res.statusCode === 200) {
                    this.setState({
                        scheduleList: res.data.payload.response
                    });
                }
                this.setState({ isLoading: false });
                // debugger;
            });

    }

    // _getExamListHandler(): void {
    //     // <ActivityIndicator size="small" color="#0000ff" />


    //     GetExamListAPI()
    //         .then(response => {
    //             const statusCode = response.status;
    //             const data = statusCode === 200 ? response.json() : [];

    //             return Promise.all([statusCode, data]).then(res => ({
    //                 statusCode: res[0],
    //                 data: res[1]
    //             }));
    //         })
    //         .then((res: {
    //             statusCode: number,
    //             data: {
    //                 payload: {
    //                     response: any[],
    //                 }
    //                 message: string
    //             }
    //         }) => {
    //             // debugger;
    //             if (res.statusCode === 200) {
    //             this.setState({
    //                 examList: res.data.payload.response
    //             });
    //         }
    //         this.setState({ isLoading: false });
    //         });
    // }

    // formatAMPM = (date: any) => {
    //     var hours = date.getHours();
    //     var minutes = date.getMinutes();
    //     var ampm = hours >= 12 ? 'pm' : 'am';
    //     hours = hours % 12;
    //     hours = hours ? hours : 12; // the hour '0' should be '12'
    //     minutes = minutes < 10 ? '0' + minutes : minutes;
    //     var strTime = hours + ':' + minutes + ' ' + ampm;
    //     return strTime;
    // };

    // getDateTime = (dateString: any) => {
    //     const d = dateString?.slice(0, -1);
    //     const date = new Date(d);
    //     return [
    //         date.getDate(),
    //         date.toLocaleString('default', { month: 'long' }),
    //         date.getFullYear()
    //     ].join(' ') +
    //         ', ' +
    //         this.formatAMPM(date);
    // };


    render(): React.ReactNode {
        if (this.state.isLoading) {
            return (
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    // alignItems: 'center',
                    paddingTop: 10,
                    height: Dimensions.get('window').height / 2
                }}
                >
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

                    {
                        this.state.scheduleList.length === 0 ?
                            <View style={{ flex: 1, alignItems: 'center', marginTop: 100 }}>
                                <Text>No Quizzes Found</Text>
                            </View>
                            
                            :

                            <View style={{ paddingTop: 15 }}>

                                <FlatList
                                    // horizontal
                                    pagingEnabled={true}
                                    // showsHorizontalScrollIndicator={false}
                                    // legacyImplementation={false}
                                    data={this.state.scheduleList}
                                    renderItem={this.renderItem1}
                                    keyExtractor={(item, index) => index.toString()}
                                // onEndReachedThreshold={0.2}
                                />
                            </View>
                    }

                </View>
            </ScrollView>
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
        padding: 1,
    },
    item: {
        backgroundColor: '#FFFFFF',
        // padding: 20,
        // paddingTop: 10,
        marginVertical: 10,
        width: '100%',
        // borderRadius: 14,
        marginHorizontal: 10
    },
});
