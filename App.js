import React, { Fragment } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import {  StatusBar} from 'react-native';
import { DrawerNavigator } from "./src/Screens/Drawer/Drawer";
import signIn from "./src//Screens/signIn";
import signUpScreen from "./src/Screens/signUpScreen";
import forgetPassword from "./src/Screens/forgetPassword";
import verificationCode from "./src/Screens/verificationCode";
import ResetPassword from "./src/Screens/ResetPassword";
import TwoPersonalCharScreen from "./src/Screens/TwoPersonalCharScreen";
import SelfEmploymentRefScreen from "./src/Screens/SelfEmploymentRefScreen";
import CriminalOffensesScreen from "./src/Screens/CriminalOffensesScreen";
import FinancialHistory from "./src/Screens/FinancialHistoryScreen";
import PersonalChat from "./src/Compmonent/PersonalChat";
import ChatPerson from "./src/Screens/ChatPerson";
import PushController from './src/utils/PushController';


import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { BottomTabNavigator } from "./src/Screens/BottomTab/BottomTab";

const Stack = createStackNavigator();


const App = () => {

  let isLogin = false;
  let initialRoute;
  if (isLogin) {
    initialRoute = "home"
  }
  else {
    initialRoute = "signIn"

  }

  return (
    <Fragment>
    <StatusBar barStyle="dark-content" />
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={BottomTabNavigator} />
          <Stack.Screen name="forgetPassword" component={forgetPassword} />
          <Stack.Screen name="signUpScreen" component={signUpScreen} />
          <Stack.Screen name="signIn" component={signIn} />
          <Stack.Screen name="TwoPersonalCharScreen"component={TwoPersonalCharScreen} />
          <Stack.Screen name="SelfEmploymentRefScreen"component={SelfEmploymentRefScreen} />
          <Stack.Screen name="CriminalOffensesScreen"component={CriminalOffensesScreen} />
          <Stack.Screen name="FinancialHistory"component={FinancialHistory} />
          <Stack.Screen name="PersonalChat"component={PersonalChat} />
          <Stack.Screen name="ChatPerson"component={ChatPerson} />
          



          <Stack.Screen name="verificationCode" component={verificationCode} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />

        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
    <PushController/>
    </Fragment>
  );
}
export default App;
