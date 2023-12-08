import * as React from 'react';
import { connect } from 'react-redux';
import messaging, { firebase } from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomModal from '../../common-components/notification/CustomModal';


import Environment from '../../constants/Environment';

import CustomToaster from '../../common-components/notification/CustomToaster';

import { INotificationCount } from '../../models/Notification.models';
import { SafeAreaView } from 'react-native';

interface Props {
  updateNotificationCount: (count: number) => void;
}

interface State {
  isInAppNotificationTriggered: boolean;
  isPopupNotificationTriggered: boolean;
  notificationText: any;
}

class PushController extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isInAppNotificationTriggered: false,
      isPopupNotificationTriggered: false,
      notificationText: ''
    };
  }

  componentDidMount() {
    // this.getToken().then();

    // PushNotification.configure({
    //   onRegister: (res) => {
    //     // console.log('FCM TOKEN:', res.token);
    //     // console.log(res,'ress//////////////////////////////////')
    //     // messaging().subscribeToTopic('all').then();
    //     AsyncStorage.setItem(
    //       Environment.PROJECT + 'fcmToken',
    //       JSON.stringify(res.token)).then();
    //     // this._registerDeviceHandler(res.token);
    //   },

    //   onNotification: (notification) => {
    //     console.log('NOTIFICATION:', notification);

    //     if (!!notification) {
    //       this.setState({
    //         isInAppNotificationTriggered: notification.data.topic === 'notification',
    //         // isPopupNotificationTriggered: notification.data.topic === 'POPUP',
    //         notificationText: notification.message
    //       });
    //       // this._getNotificationCountHandler();
    //       console.log(notification, 'notiiii.......')
    //     }
    //     notification.finish(PushNotificationIOS.FetchResult.NoData);

    //   },
    //   // Android only
    //   senderID: Environment.FCM_SENDER_ID,
    //   // iOS only
    //   permissions: { 
    //     alert: true,
    //     badge: true,
    //     sound: true
    //   },
    //   popInitialNotification: true,
    //   requestPermissions: true
    // });

    this.requestUserPermission().then((enabled) => {
      if (enabled) {
        messaging()
          .getToken()
          .then((fcmToken) => {
            console.log('FCM Token -> ', fcmToken);
            AsyncStorage.setItem(
              Environment.PROJECT + 'fcmToken',
              JSON.stringify(fcmToken)
            ).then();
          });
      } else {
        console.log("FCM token no permission");
      }
    });

    this.messageListener().then();
  }


  async requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    return enabled;
  }

  async messageListener() {
    // console.log('inside message listener ** ')

    messaging().onMessage(remoteMessage => {
      console.log('A new notification arrived!', JSON.stringify(remoteMessage));


      console.log(remoteMessage.notification?.body, 'texxxt')
      console.log(remoteMessage.data?.topic, 'topic')

      if (!!remoteMessage) {
        this.setState({
          isInAppNotificationTriggered: remoteMessage.data?.topic === 'notification',
          notificationText: remoteMessage.notification?.body
        });
      }

    })

  }


  // async requestUserPermission() {
  //   await messaging().requestPermission();
  // }

  // async getToken() {
  //   const fcmToken = await firebase.messaging().getToken();

  //   if (fcmToken) {
  //     await AsyncStorage.setItem('fcmToken', fcmToken);
  //   }
  // }

  // _getNotificationCountHandler(): void {
  //   GetNotificationCountAPI()
  //     .then(response => {
  //       const statusCode = response.status;
  //       const data = statusCode !== 204 ? response.json() : [];

  //       return Promise.all([statusCode, data]).then(res => ({
  //         statusCode: res[0],
  //         data: res[1]
  //       }));
  //     })
  //     .then((res: {
  //       statusCode,
  //       data: {
  //         payload: INotificationCount,
  //         message: string
  //       }
  //     }) => {
  //       if (res.statusCode === 200) {
  //         this.props.updateNotificationCount(res.data.payload.totalUnread);
  //       }
  //     });
  // }

  render() {
    if (this.state.isInAppNotificationTriggered) {
      return (
        <SafeAreaView style={{ zIndex: 9999 }}>
          <CustomToaster
            notificationText={this.state.notificationText}
            // notificationText="Hello"
            onClose={() => this.setState({ isInAppNotificationTriggered: false })} />
        </SafeAreaView>
      );
    }

    return null
  }
}

const mapDispatchToProps = (dispatch: (arg0: { type: string; notificationCount: number; }) => any) => {
  return {
    updateNotificationCount: (count: number) => dispatch({
      type: 'UPDATE_NOTIFICATION_COUNT',
      notificationCount: count
    })
  };
};

export default connect(null, mapDispatchToProps)(PushController);
