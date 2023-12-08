import React  from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createSwitchNavigator } from 'react-navigation';

import SignInScreen from '../../screens/authentication/SignInScreen';
import SignUpScreen from '../../screens/authentication/SignUpScreen';
// import PasswordUpdateScreen from '../PasswordUpdateScreen';
import KeywordUpdateScreen from '../../screens/authentication/KeywordUpdateScreen';
import PasswordUpdateScreen from '../../screens/authentication/PasswordUpdateScreen';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

export type RootStackParams = {
  SignIn: any;
  PasswordUpdate: any;
  SignUp: any;
  KeywordUpdate: any;
}

const AuthNavigator=()=>{
  const NativeStack: any = createNativeStackNavigator<RootStackParams>();
  return(
   <NativeStack.Navigator 
            screenOptions={{
                headerShown:false
            }}>
        <NativeStack.Screen name="SignIn" component={SignInScreen}/>
        <NativeStack.Screen name="PasswordUpdate" component={PasswordUpdateScreen}/>
        <NativeStack.Screen name="SignUp" component={SignUpScreen}/>
        <NativeStack.Screen name="KeywordUpdate" component={KeywordUpdateScreen}/>

        </NativeStack.Navigator>
  )
}

export default AuthNavigator;


// export const AuthNavigator1 = createStackNavigator({
//   SignIn: {
//     screen: SignInScreen,
//     navigationOptions: { 
//       headerShown: false
//     }
//   },
//   PasswordUpdate:{
//     screen: PasswordUpdateScreen,
//     navigationOptions: {
//       headerShown: false
//     }
//   },
//   SignUp: {
//     screen: SignUpScreen,
//     navigationOptions: {
//       headerShown: false
//     }
//   },
  
//   KeywordUpdate:{
//     screen: KeywordUpdateScreen,
//     navigationOptions: {
//       headerShown: false
//     }
//   },

// });

// export const AuthNavigator = createSwitchNavigator({
//   SignIN: AuthNavigator1
// });
