import * as React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';



interface Props {
    navigation: any;
    route: any

}

interface State {
}



export default class TournamentStartScreen extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
        };
    }

    componentDidMount(): void {
    }

    componentWillUnmount(): void {
    }

    render(): React.ReactNode {
        return (
            <View style={styles.screen}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.root}>
                        <TouchableOpacity
                            style={{ backgroundColor: '#1E276F', display: 'flex', alignItems: 'center', padding: 10, marginTop: 200, borderRadius: 10 }}
                            onPress={() => this.props.navigation.navigate('TournamentExamStart', {
                                examUUID: this.props.route.params?.examUUID,
                                examScheduleUUID: this.props.route.params?.examScheduleUUID,
                                participationUUID: this.props.route.params?.participationUUID
                            })}
                        >
                            <Text style={{ color: 'white' }}>Start</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView >
            </View>
        );
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        // backgroundColor: Colors.white
    },
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 100,
    },
});

