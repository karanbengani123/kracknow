
import * as React from 'react';
import { StyleSheet, Text, View, Image, FlatList, ScrollView, Pressable, Dimensions, SafeAreaView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GetQuestionsExamAPI, GetQuestionsOptionExamAPI, GetTournamentReviewAPI } from '../../api-services/User.api';
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
    questionTitle: any,
    option: any[],
    isCorrect: any,
    givenAnswer: any
    // correctAnswer: any
}


export default class TournamentReviewQuestionScreen extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            examList: {},
            optionList: {},

            examQuestionDetails: {},
            examOptions: {},
            examParticipation: {},
            questionTitle: '',
            option: [],
            isCorrect: '',
            givenAnswer: ''
            // correctAnswer: false

        };


    }

    componentDidMount(): void {
        this._getExamListsHandler();

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

                res.data.payload.response.map((obj) => {
                    if (obj.questionUUID === this.props.route.params?.questionUUID) {
                        console.log('id same')
                        this.setState({
                            questionTitle: obj.title,
                            option: obj.tournamentExamParticipationQuestionOption,
                            isCorrect: obj.isCorrect,
                            givenAnswer: obj.givenAnswer
                        })
                    }
                }

                )
                console.log(this.state.examList, "response...////")
            });
    }


    renderItem1 = ({ item, index }: any) => {
        let result_color;
        if (item.correctAnswer) {
            result_color = "#90EE90"
        }
        else if (this.state.isCorrect === false) {
            if (this.state.givenAnswer === item.text) {

                result_color = "red"
            }

            else {
                result_color = "white"
            }

        }
        else {
            result_color = "white"
        }

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
        }
        }>


            <Text style={{ alignSelf: 'center', color: "black" }}>{item.text}</Text>

            {/* {!!item.image &&
                <Image
                    source={{ uri: item.image.replace("https", "http") }}
                    style={{ width: 80, height: 80 }}
                />
            } */}

            {
                !!item.image &&
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



        </View >
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
                <ScrollView showsVerticalScrollIndicator={false} >
                    {/* <View style={{ alignItems: 'center', padding: 20 }}>
                    <RenderHtml
                        source={{
                            html: this.state.examQuestionDetails.title
                        }}
                        contentWidth={Dimensions.get('window').width}
                    />
                </View> */}

                    <SafeAreaView>

                        <View style={{ alignItems: 'center', padding: 20 }}>
                            <RenderHtml
                                source={{
                                    html: this.state.questionTitle
                                }}
                                contentWidth={Dimensions.get('window').width}
                            />
                        </View>

                        {/* <Text>{this.state.questionTitle}</Text> */}

                        <FlatList
                            // horizontal
                            pagingEnabled={true}
                            // showsHorizontalScrollIndicator={false}
                            data={this.state.option}
                            renderItem={this.renderItem1}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </SafeAreaView>

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
