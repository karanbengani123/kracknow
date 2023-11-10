
import * as React from 'react';
import { StyleSheet, Text, View, Image, FlatList, ScrollView, Pressable, SafeAreaView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GetQuestionsExamAPI } from '../../api-services/User.api';

import Colors from '../constants/Colors';
import HeaderBack from './HeaderBack';



interface Props {
    navigation: any;
    route: any

}

interface State {
    examList: any
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



export default class ExamReviewScreen extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            examList: {}
        };


    }

    componentDidMount(): void {
        this._getExamListsHandler();
    }

    componentWillUnmount(): void {

    }


    _getExamListsHandler(): void {
        // debugger;
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

                <Text style={{ alignSelf: 'center', color: 'black' }}>Question: {index + 1}</Text>
            </TouchableOpacity>

        </View>
    )

    render(): React.ReactNode {
        return (
            <SafeAreaView>
                <HeaderBack navigation={this.props.navigation} name="" />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.root}>
                        <View style={{ paddingTop: 20 }}>

                            <FlatList
                                // horizontal
                                pagingEnabled={true}
                                // showsHorizontalScrollIndicator={false}
                                data={this.state.examList}
                                renderItem={this.renderItem1}
                                keyExtractor={item => item.id}
                                numColumns={2} />
                        </View>

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
                padding: 25,
                // display:'flex',
                alignSelf: 'center',
                // paddingTop: 10, 
                marginVertical: 10,
                width: 170,
                borderRadius: 14,
                marginHorizontal: 10,
                shadowColor: "#000000",
                shadowOpacity: 0.8,
                shadowRadius: 2,
                shadowOffset: {
                    height: 1,
                width: 1
        }
    },
});
