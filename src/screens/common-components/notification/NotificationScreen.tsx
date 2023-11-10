import * as React from 'react';
import {
  FlatList,
  Image, ImageSourcePropType,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { TabStyle } from '../../styles/TabStyle';

import Colors from '../../constants/Colors';

import { OrganizationType } from '../../helper-functions/Helper';

import LoadingView from '../../custom-elements/LoadingView';

import { GetNotificationListAPI } from '../../api-services/Notification.api';
import { GeneralStyle } from '../../styles/GeneralStyles';

interface Props {
  navigation: any;
}

interface State {
  isLoading: boolean;
  selectedTab: string;
  tabList: {
    name: string;
    role: string[];
  }[];
  notificationList: any[];
}

export default class NotificationScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isLoading: false,
      selectedTab: 'All',
      tabList: [
        {name: 'All', role: ['AGENT', 'RETAILER', 'WHOLESALER']},
        {name: 'Orders', role: ['AGENT', 'RETAILER', 'WHOLESALER']},
        {name: 'Payments', role: ['RETAILER', 'WHOLESALER']},
        {name: 'Offers', role: ['AGENT', 'RETAILER', 'WHOLESALER']},
        {name: 'Other', role: ['AGENT', 'RETAILER', 'WHOLESALER']}
      ],
      notificationList: []
    };
  }

  componentDidMount(): void {
    OrganizationType()
      .then((organizationType) => {
        this.setState({
          tabList: this.state.tabList.filter((tab) => tab.role.includes(organizationType))
        });
      });

    // this._getNotificationListHandler();
  }

  _getNotificationListHandler(): void {
    GetNotificationListAPI()
      .then(response => {
        const statusCode = response.status;
        const data = statusCode === 200 ? response.json() : [];

        return Promise.all([statusCode, data]).then(res => ({
          statusCode: res[0],
          data: res[1]
        }));
      })
      .then((res: {
        statusCode,
        data: {
          payload: {
            notifications: any[]
          },
          message: string
        }
      }) => {
        if (res.statusCode === 200) {
          this.setState({
            notificationList: res.data.hasOwnProperty('payload') ? res.data?.payload?.notifications : []
          });
        }

        this.setState({isLoading: false});
      });
  }

  _toggleTabHandler(tabName: string): void {
    this.setState({selectedTab: tabName});
  }

  _renderItems = ({item}) => (
    <TouchableOpacity
      activeOpacity={1}
      style={[TabStyle.tab, item.name === this.state.selectedTab && TabStyle.activeTab]}
      onPress={() => this._toggleTabHandler(item.name)}
    >
      <Text style={[
        TabStyle.tabText,
        item.name === this.state.selectedTab && TabStyle.activeTabText
      ]}>{item.name}</Text>
    </TouchableOpacity>
  );

  render(): React.ReactNode {
    if (this.state.isLoading) {
      return (
        <LoadingView
          size={'large'}
        />
      );
    }

    return (
      <SafeAreaView
        style={styles.screen}
      >

        <View
          style={TabStyle.tabContainer}
        >
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{flexDirection: 'row'}}
            data={this.state.tabList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={this._renderItems}
          />
        </View>

        {
          this.state.notificationList.length !== 0
            ?
            <FlatList
              data={this.state.notificationList}
              keyExtractor={(item, index) => index.toString()}
              renderItem={this._renderItems}
            />
            :
            <View style={GeneralStyle.contentCenter}>
              <Image
                source={require('../../assets/no-data/no-data-found.png') as ImageSourcePropType}
              />
              <Text>Oops, no notification found !!!</Text>
            </View>
        }

      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.white
  }
});
