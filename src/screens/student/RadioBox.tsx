import React from "react";
import {
    Dimensions,
    Image,
    ImageSourcePropType,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Octicons from "react-native-vector-icons/Octicons";
import Colors from "../../screens/constants/Colors";
import RenderHtml from "react-native-render-html";


interface Props {
    item: {
        name: string;
        value: string;
        image: string;
    };
    status: boolean;
    onPress: (value: string) => void;
    style?: any;
}
const renderersProps = {
    img: {
        enableExperimentalPercentWidth: true
    }
};

export default class RNRadioBox extends React.PureComponent<Props> {
    render(): React.ReactNode {
        return (
            <TouchableOpacity
                activeOpacity={0.7}
                style={[styles.container, this.props.status && styles.activeContainer]}
                onPress={() => this.props.onPress(this.props.item.name)}
            >
                <View style={{ position: "relative", marginRight: 12 }}>
                    <View style={styles.radioBox} />
                    {this.props.status && (
                        <View style={styles.radioBoxActive}>
                            <Octicons
                                name={"primitive-dot"}
                                size={24}
                                color={Colors.primary}
                            />
                        </View>
                    )}
                </View>
                <Text
                    style={[
                        styles.radioBoxLabel,
                        this.props.status && styles.activeRadioBoxLabel,
                    ]}
                >
                    {this.props.item.name ? this.props.item.name : this.props.item.value}
                </Text>

                {!!this.props.item.image && (
                    // <Image
                    //     source={{ uri: this.props.item.image.replace("https", "http") }}
                    //     style={{ width: 140, height: 100 }}
                    // />
                    <RenderHtml
                    source={{
                        html: `<img
                    width="140" height="100"
                    src=${this.props.item.image}
                  />`
                    }}
                    contentWidth={Dimensions.get("window").width}
                    renderersProps={renderersProps}
                />
                )}
                {/* {!!this.props.item.image && (
                    <RenderHtml
                        contentWidth={Dimensions.get("window").width}
                        //   source={source}
                        source={{ uri: this.props.item.image.replace("https", "http") }}
                    //   renderersProps={renderersProps}
                    />
                )} */}
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.white,
        borderRadius: 9,
        width: "100%",
        padding: 14,
        marginVertical: 10,
    },
    activeContainer: {
        backgroundColor: Colors.primary,
    },
    radioBox: {
        backgroundColor: Colors.background,
        borderRadius: 12,
        height: 24,
        width: 24,
    },
    radioBoxActive: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        justifyContent: "center",
        alignItems: "center",
    },
    radioBoxLabel: {
        color: Colors.radioLabel,
        fontSize: 14,
        fontWeight: "500",
    },
    activeRadioBoxLabel: {
        color: Colors.white,
    },
});
