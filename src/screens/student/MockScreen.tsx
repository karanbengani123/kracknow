import * as React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, SafeAreaView, TouchableOpacity, FlatList, ImageSourcePropType, Pressable, ActivityIndicator } from 'react-native';
import Footer from './Footer';
import Colors from '../constants/Colors';
import { GetCompletedExamListAPI, GetScheduleListAPI } from '../../api-services/User.api';
import moment from 'moment';
import { TabStyle, TabUnderlineStyle } from '../styles/TabStyle';
import UpcomingExams from './UpcomingExams';
import AllExamScreen from './AllExamScreen';
import ScheduledExamScreen from './ScheduledExamScreen';
import CompletedExamScreen from './CompletedExamScreen';
import AllMockScreen from './AllMockScreen';
import ScheduledMockScreen from './ScheduledMockScreen';
import CompletedMockScreen from './CompletedMockScreen';
import Header from './Header';



interface Props {
    navigation: any;
    route:any
}

interface State {
    scheduleList: any[];
    completedList: any[];
    examList: any[];
    isLoading: boolean;
    selectedTab2: string;
    tabList: string[];


}


export default class MockScreen extends React.Component<Props, State> {
    private _tabListRef: any;
    private focusListener: any;


    constructor(props: Props) {
        super(props);

        this.state = {
            scheduleList: [],
            completedList: [],
            examList: [],
            isLoading: true,
            selectedTab2: this.props.route.params?.tab || 'All Mocks',
            tabList: [
                'All Mocks',
                'Scheduled Mocks',
                'Completed Mocks'
            ],


        };


    }

    componentDidMount(): void {
        this._getScheduleListHandler();
        this._getCompletedExamListHandler();
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            this._getScheduleListHandler();
            this._getCompletedExamListHandler();
        })
    }

    componentWillUnmount(): void {
        this.setState = () => {
            return;
        };
        // this.focusListener.remove();
    }

    _toggleTabHandler(tabName: string): void {
        this.setState({
            selectedTab2: tabName,

        });
    }

    renderItem1 = ({ item }: any) => (
        <TouchableOpacity onPress={() => this.props.navigation.navigate('ExamDetails', { uuid: item.schedule[0].uuid })}>
            <View style={styles.item}>
                <View style={{ borderWidth: 0, borderColor: '#EEEEEA', borderRadius: 10 }}>
                    <Image
                        style={{ height: 180, width: 300, borderRadius: 10 }}
                        source={
                            (
                                item.examBanner.phoneBanner
                                    ? { uri: item.examBanner.phoneBanner }
                                    :
                                    require('../../../assets/images/defaultbanner.jpg')
                            ) as ImageSourcePropType
                        }
                    />
                    <View style={{ position: 'absolute', backgroundColor: '#167278', marginTop: 150, padding: 2, borderRadius: 5, marginLeft: 240 }}>
                        <Text style={{ fontSize: 10, fontWeight: '500', color: 'white', }}>Fee: {item.joinFee}</Text>
                    </View>

                    <View style={{ backgroundColor: 'yellow', position: 'absolute', marginTop: 10, padding: 2, borderRadius: 5, marginLeft: 10 }}>
                        <Text style={{ fontSize: 10, fontWeight: '700', color: 'black', }}>Win: {'\u20B9'}{item.totalWinningPrize}</Text>
                    </View>

                    <View style={{ padding: 10, }}>
                        <Text style={{ fontSize: 14, fontWeight: '500', color: '#0E242C', fontStyle: 'normal' }}>{item.title}</Text>
                        <Text style={{ fontSize: 10, fontWeight: '400', color: '#00000', opacity: 0.6, marginTop: 10 }}>Total seat: {item.studentLimit}</Text>
                        <Text style={{ fontSize: 10, fontWeight: '400', color: '#00000', opacity: 0.6, marginTop: 5 }}>Start: {moment(new Date(item.schedule[0].startTime)).utcOffset('').format("ddd, DD-MMM-YYYY, hh:mm a")}</Text>
                    </View>
                </View>

            </View>
        </TouchableOpacity>

    );



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
                if (res.statusCode === 200) {
                    this.setState({
                        scheduleList: res.data.payload.response
                    });
                }
                this.setState({ isLoading: false });
                // debugger;
            });

    }

    _getCompletedExamListHandler(): void {
        GetCompletedExamListAPI()
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

            });

    }

    renderItem2 = ({ item }: any) => (
        <TouchableOpacity onPress={() => this.props.navigation.navigate('ExamDoneResult', {
            participantUuid: item.schedule[0].studentExam.uuid
        })}>

            <View style={styles.item1}>
                <View style={styles.action}>
                    <Image
                        style={{ height: 60, width: 70, borderRadius: 5 }}
                        source={
                            (
                                item.examBanner.phoneBanner
                                    ? { uri: item.examBanner.phoneBanner }
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
                        }}>Date: {moment(new Date(item.schedule[0].startTime)).utcOffset('').format("ddd, DD-MMM-YYYY, hh:mm a")}</Text>

                    </View>
                </View>
            </View>
        </TouchableOpacity>

    );

    _renderItems = ({ item }: { item: any }) => (
        <TouchableOpacity
            activeOpacity={1}
            style={[TabStyle.tab2, item === this.state.selectedTab2 && TabStyle.activeTab2]}
            onPress={() => this._toggleTabHandler(item)}
        >
            <Text style={[
                TabStyle.tabText2,
                item === this.state.selectedTab2 && TabStyle.activeTabText2
            ]}>{item}</Text>
        </TouchableOpacity>
    );

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
        // if (this.state.isLoading) {
        //     return (
        //       <View style={{flex: 1,
        //         justifyContent: 'center',
        //         alignItems: 'center',
        //         // height: Dimensions.get('window').height / 2
        //     }}
        //         >
        //         <ActivityIndicator
        //           size={'large'}
        //           color={Colors.primary}
        //         />
        //       </View>
        //     );
        //   }
        return (
            <>
                <SafeAreaView style={{ flex: 1, backgroundColor: '#E5E5E5' }}>
                    <Header navigation={this.props.navigation} />
                    <View style={TabStyle.tabContainer2}>
                        <FlatList
                            ref={(ref) => this._tabListRef = ref}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ flexDirection: 'row' }}
                            data={this.state.tabList}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={this._renderItems} />
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false}>



                        <ScrollView style={{ paddingRight: 10 }}>
                            {this.state.selectedTab2 === 'All Mocks' &&
                                <AllMockScreen


                                    navigation={this.props.navigation} />}
                            {this.state.selectedTab2 === 'Scheduled Mocks' &&
                                <ScheduledMockScreen


                                    navigation={this.props.navigation} />}
                            {this.state.selectedTab2 === 'Completed Mocks' &&
                                <CompletedMockScreen


                                    navigation={this.props.navigation} />}

                        </ScrollView>

                    </ScrollView>
                    <Footer
                        tab='Mock'
                        navigation={this.props.navigation} />
                </SafeAreaView></>
        );
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.white,
        padding: 20,

    },
    root: {
        // alignItems: 'center',
        padding: 20,
        // backgroundColor: '#E5E5E5'
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
        width: 300,
        marginHorizontal: 15,
        borderRadius: 10
    },


    item1: {
        backgroundColor: '#FFFFFF',
        padding: 10,
        paddingTop: 10,
        marginVertical: 10,
        width: 370,
        borderRadius: 14,
    },
});

