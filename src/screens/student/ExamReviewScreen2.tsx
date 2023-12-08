
import * as React from 'react';
import { StyleSheet, Text, View, Image, FlatList, ScrollView, Pressable, Dimensions, SafeAreaView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GetQuestionsExamAPI, GetQuestionsOptionExamAPI } from '../../api-services/User.api';
import RenderHtml from 'react-native-render-html';
import Colors from '../constants/Colors';
import HTML from 'react-native-render-html';
import HeaderBack from './HeaderBack';


interface Props {
    navigation: any;
    route: any

}

interface State {
    examList: any,
    optionList: any,

    examQuestionDetails: any,
    examOptions: any,
    examParticipation: any,
    givenAnswer: any,
    isCorrect: boolean,
    // correctAnswer: any
}


export default class ExamReviewScreen2 extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            examList: {},
            optionList: {},

            examQuestionDetails: {},
            examOptions: {},
            examParticipation: {},
            givenAnswer: "",
            isCorrect: false
            // correctAnswer: false

        };


    }

    componentDidMount(): void {
        this._getExamOptionHandler();
        this._getExamListsHandler()
    }

    componentWillUnmount(): void {

    }


    _getExamOptionHandler(): void {
        GetQuestionsOptionExamAPI(this.props.route.params?.questionUUID)
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
                        response: any,
                        examParticipation: string
                    }
                    message: string
                }
            }) => {
                // debugger; 
                this.setState({
                    examQuestionDetails: res.data.payload.response,
                    givenAnswer: res.data.payload.response.givenAnswer,
                    isCorrect: res.data.payload.response.isCorrect,
                    examParticipation: res.data.payload.response.examParticipation
                        .map((examParticipation: {
                            correctAnswer: any; text: any; image: any;
                        }) => {
                            return {
                                text: examParticipation.text,
                                // image: {
                                //     ...examParticipation.image,
                                //     html: examParticipation.image
                                // },
                                image: examParticipation.image,
                                correctAnswer: examParticipation.correctAnswer

                            };
                        })

                })
            }
            )
        // debugger;

    }



    _getExamListsHandler(): void {
        GetQuestionsExamAPI(this.props.route.params?.participantUuid)
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
                    optionList: res.data.payload.response
                        .map((response) => {
                            return {
                                questionUUID: response.questionUUID,

                            };
                        })
                });
            });
    }

    renderItem1 = ({ item, index }: any) => {
        let result_color;
        if (item.correctAnswer)
            result_color = "#90EE90"
        // else if(item.correctAnswer !== item.givenAnswer)
        // result_color="red"
        else if (this.state.isCorrect === false) {
            if (this.state.givenAnswer === item.text) {

                result_color = "red"
            }

            else {
                result_color = "white"
            }

        }
        else
            result_color = "white"


        return <View style={{
            backgroundColor: result_color,
            padding: 20,
            alignSelf: 'center',
            marginVertical: 10,
            width: 200,
            borderRadius: 14,
            marginHorizontal: 10,
            shadowColor: "#000000",
            // flexDirection:'row'
            alignItems: 'center'
        }}>


            <Text style={{ alignSelf: 'center', color: "black" }}>{item.text}</Text>

            {/* {!!item.image &&
                <Image
                    source={{ uri: item.image.replace("https", "http") }}
                    style={{ width: 80, height: 80 }}
                />
            } */}

            {!!item.image &&
                <RenderHtml
                    source={{
                        html: `<img
                    width="80" height="80"
                    src=${item.image}
                  />`
                    }}
                    contentWidth={Dimensions.get("window").width}
                    renderersProps={this.renderersProps}
                />
            }
            {/* {!!item.image &&
                <HTML  html={htmlContent} imagesMaxWidth={Dimensions.get('window').width} />
            } */}



        </View>
    }

    renderersProps = {
        img: {
            enableExperimentalPercentWidth: true
        }
    };

    render(): React.ReactNode {
        return (
            <SafeAreaView>
          <HeaderBack navigation={this.props.navigation} name="" />
                <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ alignItems: 'center', padding: 20 }}>
                    {/* <Text style={{ fontWeight: '500' }}>Question: {this.state.pageCount}</Text> */}
                    <RenderHtml
                        source={{
                            html: this.state.examQuestionDetails.title
                        }}
                        contentWidth={Dimensions.get('window').width} />
                </View>

                <SafeAreaView>

                    <FlatList
                        // horizontal
                        pagingEnabled={true}
                        // showsHorizontalScrollIndicator={false}
                        data={this.state.examParticipation}
                        renderItem={this.renderItem1}
                        keyExtractor={(item, index) => index.toString()} />
                </SafeAreaView>

            </ScrollView></SafeAreaView>
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
    },
    item: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        alignSelf: 'center',
        marginVertical: 10,
        width: 200,
        borderRadius: 14,
        marginHorizontal: 10,
        shadowColor: "#000000",
        // shadowOpacity: 0.8,
        // shadowRadius: 2,
        // shadowOffset: {
        //     height: 1,
        //     width: 1
        // }
    },
});
