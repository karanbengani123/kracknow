
import * as React from 'react';
import { StyleSheet, Text, View, Image, FlatList, ScrollView, Pressable, SafeAreaView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GetChartAPI, GetCompletedExamListAPI, GetQuestionsExamAPI } from '../../api-services/User.api';
import PieChart from 'react-native-pie-chart'
import Colors from '../constants/Colors';
import HeaderBack from './HeaderBack';



interface Props {
    navigation: any;
    route: any

}

interface State {
    examList: any;
    completedList: any;
    chartList: any;
}


export default class QuizDoneResultScreen2 extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            examList: {},
            completedList: {},
            chartList: {}
        };


    }

    componentDidMount(): void {
        this._getChartHandler();
        this._getExamListsHandler();
        this._getCompletedExamListHandler()
    }

    componentWillUnmount(): void {

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
                    completedList: res.data.payload.response
                        .map((response) => {
                            return {
                                uuid: response.schedule[0].uuid,

                            };
                        })

                });
                console.log(this.state.completedList, ".........", this.props.route.params?.participantUuid)
                // debugger;

            });

    }


    _getChartHandler(): void {
        // debugger;
        console.log(this.props.route.params?.participantUuid[1], ",,,,,,")
        GetChartAPI(this.props.route.params?.participantUuid[1])
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
                    chartList: res.data.payload.response
                    // .map((response) => {
                    //     return {
                    //         questionUUID: response.questionUUID,

                    //     };
                    // })
                });
            });
    }


    _getExamListsHandler(): void {
        // debugger;
        GetQuestionsExamAPI(this.props.route.params?.participantUuid[0])
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
                        .map((response) => {
                            return {
                                questionUUID: response.questionUUID,

                            };
                        })
                });
            });
    }

    renderItem1 = ({ item, index }: any) => (
        <View style={styles.item}>
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate('ExamReview2', {
                    questionUUID: item.questionUUID
                })}
            >

                <Text style={{ alignSelf: 'center', color: 'black' }}>{index + 1}</Text>
            </TouchableOpacity>

        </View>
    )

    renderItem2 = ({ item, index }: any) => (
        <View style={{}}>
            <Text style={{ marginBottom: 10, alignSelf: 'center' }}>Sub-category: {item.subCategoryName}</Text>

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 40 }}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ backgroundColor: '#4CAF50', height: 20, width: 50, marginRight: 5 }}>
                    </View>
                    <Text>Correct ({item.correctAnswer})</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <View style={{ backgroundColor: '#F44336', height: 20, width: 50, marginRight: 5 }}>
                    </View>
                    <Text>In-correct ({item.incorrectAnswer})</Text>
                </View>

            </View>

            <View style={{ alignSelf: 'center' }}>

                <PieChart
                    widthAndHeight={250}
                    series={Array(item.correctAnswer, item.incorrectAnswer)}
                    sliceColor={Array('#4CAF50', '#F44336')}
                    doughnut={true}
                    coverRadius={0.45}
                    coverFill={'#FFF'}
                />

            </View>
        </View>
    )

    // widthAndHeight = 250
    // series = [123, 589]
    // sliceColor = ['#F44336', '#4CAF50']

    // series1 = [523, 189]

    render(): React.ReactNode {



        return (
            <SafeAreaView>
                <HeaderBack navigation={this.props.navigation} name="" />

                <ScrollView showsVerticalScrollIndicator={false} >
                    <View style={styles.root}>
                        <Text style={{ alignSelf: 'center', color: 'black' }}>Question</Text>
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


                        <View style={{ paddingTop: 20, marginVertical: 20 }}>

                            <FlatList
                                // horizontal
                                pagingEnabled={true}
                                // showsHorizontalScrollIndicator={false}
                                data={this.state.chartList}
                                renderItem={this.renderItem2}
                            // keyExtractor={item => item.id}
                            // numColumns={5}
                            />
                        </View>



                        {/* <View style={{ alignSelf: 'center', marginTop: 40 }}>
                        <PieChart
                            widthAndHeight={widthAndHeight}
                            series={series}
                            sliceColor={sliceColor}
                            doughnut={true}
                            coverRadius={0.45}
                            coverFill={'#FFF'}
                        />
                    </View>

                    <View style={{ alignSelf: 'center', marginTop: 40 }}>
                        <PieChart
                            widthAndHeight={widthAndHeight}
                            series={series1}
                            sliceColor={sliceColor}
                            doughnut={true}
                            coverRadius={0.45}
                            coverFill={'#FFF'}
                        />
                    </View>

                    <View style={{ alignSelf: 'center', marginTop: 40 }}>
                        <PieChart
                            widthAndHeight={widthAndHeight}
                            series={series}
                            sliceColor={sliceColor}
                            doughnut={true}
                            coverRadius={0.45}
                            coverFill={'#FFF'}
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
        // alignItems: 'center',
        padding: 15,
    },
    item: {
        backgroundColor: '#FFFFFF',
        padding: 15,
        // display:'flex',
        alignSelf: 'center',
        // paddingTop: 10,
        marginVertical: 5,
        width: 65,
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
