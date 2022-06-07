import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";

import { MainStackNavigator, profileStackNavigator, donateStackNavigator, groupStackNavigator, nextOfKinStackNavigator, feedbackStackNavigator, loveStackNavigator } from "../Stack/stackScreen";
import DrawerContent from './DrawerItems'

import { BottomTabNavigator } from "../BottomTab/BottomTab";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator
            drawerContent={props => <DrawerContent {...props} />}
            drawerStyle={{ width: '60%', backgroundColor: "#FFF", }}>

            <Drawer.Screen name="Home" component={BottomTabNavigator} />
            <Drawer.Screen name="profile" component={profileStackNavigator} />
            <Drawer.Screen name="love" component={loveStackNavigator} />
            <Drawer.Screen name="donate" component={donateStackNavigator} />
            <Drawer.Screen name="nextofkin" component={nextOfKinStackNavigator} />
            <Drawer.Screen name="feedback" component={feedbackStackNavigator} />







        </Drawer.Navigator>
    );
}


export { DrawerNavigator };