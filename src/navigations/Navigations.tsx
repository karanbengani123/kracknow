import React  from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import StartupScreen from '../screens/StartupScreen';
import ExamDetailsScreen from '../screens/student/ExamDetailsScreen';
import  AuthNavigator  from './auth-navigation/AuthNavigation';
import  MainDrawer  from './student-navigation/MainDrawer';
import LeaderboardResult from '../screens/student/LeaderboardResult';
import TournamentDetails from '../screens/student/TournamentDetails';
import { createStackNavigator } from 'react-navigation-stack';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

export type RootStackParams = {
  Startup: any;
  Authentication: any;
  Student: any,
}

const Navigations=()=>{
  const NativeStack: any = createNativeStackNavigator<RootStackParams>();
  return(
    <NavigationContainer>
      <NativeStack.Navigator 
            screenOptions={{
                headerShown:false
            }}>
        <NativeStack.Screen name="Startup" component={StartupScreen}/>
        <NativeStack.Screen name="Authentication" component={AuthNavigator}/>
        <NativeStack.Screen name="Student" component={MainDrawer}/>
        </NativeStack.Navigator>
  </NavigationContainer>
  )
}

export default Navigations;

// const MainNavigator = createStackNavigator({
//   // Startup: StartupScreen,
//   // Student: MainDrawer, 
//   // Authentication: AuthNavigator, 

//   Startup: {
//     screen: StartupScreen,
//     navigationOptions: ({ navigation }) => ({
//       headerShown: false,
//     })
//   },
//   Authentication: {
//     screen: AuthNavigator,
//     navigationOptions: ({ navigation }) => ({
//       headerShown: false,
//     })
//   },
//   Student: {
//     screen: MainDrawer,
//     navigationOptions: ({ navigation }) => ({
//       headerShown: false,
//     })
//   },
  

//   // Authentication: AuthNavigator,

  
//   // ExamDetails: ExamDetailsScreen,
//   // TournamentDetails: TournamentDetails,
//   // Leaderboard1: LeaderboardResult,

// });



// export default createAppContainer(MainNavigator);
