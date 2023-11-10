import * as React from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Colors from '../../constants/Colors';

interface Props {
  notificationText: string;
  onClose: () => void;
}

interface State {
  modalVisible: boolean;
}

export default class CustomModal extends React.Component<Props, State> {
  constructor(props: Props | Readonly<Props>) {
    super(props);

    this.state = {
      modalVisible: true
    };
  }

  _closeModalHandler(): void {
    this.setState({modalVisible: false});
    this.props.onClose();
  }

  render(): React.ReactNode {
    return (
      <Modal
        animationType={'slide'}
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => this._closeModalHandler()}
      >

        <View
          style={styles.centeredView}
        >

          <View style={styles.modalView}>

            <View style={styles.modalHeader}>
              <Ionicons
                name={'close'}
                size={20}
                color={Colors.black}
                onPress={() => this._closeModalHandler()}
              />
            </View>

            <View style={styles.modalBody}>
              <Text style={styles.modalBodyText}>
                {this.props.notificationText}
              </Text>
            </View>

          </View>

        </View>

      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  centeredView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)'
  },
  modalView: {
    backgroundColor: Colors.white,
    marginHorizontal: 30,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.darkBackground,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    padding: 10
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  modalBody: {
    paddingHorizontal: 30,
    paddingBottom: 10
  },
  modalBodyText: {
    color: Colors.black,
    fontSize: 16,
    textAlign: 'center'
  }
});
