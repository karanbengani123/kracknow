
import * as React from 'react';
import { StyleSheet, Text, View, Image, FlatList, ScrollView, Pressable, SafeAreaView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GetQuestionsExamAPI, GetTournamentLeaderboardAPI, GetTournamentReviewAPI } from '../../api-services/User.api';
import PieChart from 'react-native-pie-chart'
import Colors from '../constants/Colors';
import HeaderBack from './HeaderBack';



interface Props {
    navigation: any;
    route: any

}

interface State {
    examList: any;
    examLeaderboard: any;
}

const DATA = [
    {
        id: '1',
        title: 'Question: 1',


    },
    {
        id: '2',
        title: 'Question: 2',


    },
    {
        id: '3',
        title: 'Question: 3',


    },
    {
        id: '4',
        title: 'Question: 4',


    },
];

const Item = ({ title }: any) => (
    <View style={styles.item}>
        <Text style={{ alignSelf: 'center', color: 'black' }}>{title}</Text>

    </View>
);



export default class TournamentReviewScreen extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            examList: {},
            examLeaderboard: {}
        };


    }

    componentDidMount(): void {
        this._getExamListsHandler();
        this._getLeaderboardHandler();
    }

    componentWillUnmount(): void {

    }


    _getExamListsHandler(): void {
        // debugger;
        console.log(this.props.route.params?.examUUID, 'examuuid')
        console.log(this.props.route.params?.participationUUID, 'participationuuid')

        GetTournamentReviewAPI(this.props.route.params?.participationUUID, this.props.route.params?.examUUID)
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
                    examList: res.data.payload.response
                });
                // console.log(this.state.examList, "response...////")
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
                        examLeaderboard: res.data.payload.response.chart
                        // .map((response:any)=>{
                        //     return {
                        //         chart: response.chart
                        //     }
                        // })
                    });
                    console.log(this.state.examLeaderboard.chart, 'resssssss')
                }
            );
    }


    renderItem1 = ({ item, index }: any) => (
        <View style={styles.item}>
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate('TournamentReviewQuestionScreen', {
                    participationUUID: this.props.route.params?.participationUUID,
                    examUUID: this.props.route.params?.examUUID,
                    questionUUID: item.questionUUID

                })}
            >

                <Text style={{ alignSelf: 'center', color: 'black' }}>{index + 1}</Text>
            </TouchableOpacity>

        </View>
    )

    renderItem2 = ({ item, index }: any) => (
        <View >
            <Text style={{ marginBottom: 15, alignSelf: 'center', color: 'black' }}>Exam: {item.examName}</Text>

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 40 }}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ backgroundColor: '#4CAF50', height: 20, width: 50, marginRight: 5 }}>
                    </View>
                    <Text style={{color: 'black'}}>Correct ({item.correct})</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <View style={{ backgroundColor: '#F44336', height: 20, width: 50, marginRight: 5 }}>
                    </View>
                    <Text style={{color: 'black'}}>In-correct ({item.incorrect})</Text>
                </View>

            </View>

            <View style={{ alignSelf: 'center' }}>

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
        return (
            <SafeAreaView>
        <HeaderBack navigation={this.props.navigation} name="" />
                <ScrollView showsVerticalScrollIndicator={false} >
                    <View style={styles.root}>
                        {/* <View style={{ flexDirection: 'row', paddingTop: 20, justifyContent: 'space-between' }}>

                        <Text>2/4 Correct</Text>
                        <Text>2 points</Text>
                    </View> */}
                        <Text>Questions</Text>
                        <View style={{ paddingTop: 20 }}>

                            <FlatList
                                // horizontal
                                pagingEnabled={true}
                                // showsHorizontalScrollIndicator={false}
                                data={this.state.examList}
                                renderItem={this.renderItem1}
                                keyExtractor={item => item.id}
                                numColumns={5}
                            />
                        </View>

                        {/* <View style={{ paddingTop: 20, marginVertical: 20 }}>

                            <FlatList
                                // horizontal
                                pagingEnabled={true}
                                // showsHorizontalScrollIndicator={false}
                                data={this.state.examLeaderboard}
                                renderItem={this.renderItem2}
                            // keyExtractor={item => item.id}
                            // numColumns={5}
                            />
                        </View> */}

                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.white
    },
    root: {
        alignItems: 'center',
        padding: 15,
        flex: 1,

    },
    item: {
        backgroundColor: '#FFFFFF',
        padding: 15,
        // display:'flex',
        alignSelf: 'center',
        // paddingTop: 10,
        marginVertical: 5,
        width: 55,
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
