import { createBottomTabNavigator } from 'react-navigation-tabs';

import DashboardScreen from '../../screens/student/DashboardScreen';
import FeedScreen from '../../screens/student/FeedScreen';

export const BottomTabs = createBottomTabNavigator({
  Dashboard: {
    screen: DashboardScreen,
    navigationOptions: {
      tabBarLabel: 'Dashboard'
    },
  },
  Feed: {
    screen: FeedScreen,
    navigationOptions: {
      tabBarLabel: 'Feed'
    },
  }
});
