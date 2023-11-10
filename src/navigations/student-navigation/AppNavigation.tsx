import { createStackNavigator } from 'react-navigation-stack';

import DashboardScreen from '../../screens/student/DashboardScreen';

export const AppNavigator = createStackNavigator({
  Dashboard: DashboardScreen
});
