// ./screens/Home.js

import React from "react";
import { View, StyleSheet, Button, ActivityIndicator, Text, StatusBar, TouchableWithoutFeedback, TouchableOpacity, Image, ScrollView, SafeAreaView, AsyncStorage, FlatList, Platform } from 'react-native';
import Logo from '../../Assets/Icons/profile.png'
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';
function drawerItem({ navigation }) {


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView keyboardShouldPersistTaps={'handled'} showsVerticalScrollIndicator={false} >
                <View style={{ width: "100%", paddingTop: "10%", }}>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('profile')
                    }}>
                        <View style={styles.ImageView}>

                            <Image source={Logo} style={{ height: 100, width: 100, borderRadius: 50, alignSelf: 'center', }} />

                        </View>
                        <Text style={{ textAlign: "center", fontSize: 22, fontWeight: "bold", marginTop: 10, marginBottom: 20, color: "white" }}> umer Saleem</Text>

                    </TouchableOpacity>

                </View>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('Home')
                }}>
                    <View style={styles.item}>

                        <Text style={{ textAlign: "center", fontSize: 16, marginTop: 10, color: "white" }}>Home </Text>

                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('profile')
                }}>
                    <View style={styles.item}>

                        <Text style={{ textAlign: "center", fontSize: 16, marginTop: 10, color: "white" }}> Profile </Text>

                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('nextofkin')
                }}>
                    <View style={styles.item}>

                        <Text style={{ textAlign: "center", fontSize: 16, marginTop: 10, color: "white" }}> Next of Kin </Text>

                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    navigation.navigate('love')
                }}>
                    <View style={styles.item}>

                        <Text style={{ textAlign: "center", fontSize: 16, marginTop: 10, color: "white" }}> Love One </Text>

                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    navigation.navigate('donate')
                }}>
                    <View style={styles.item}>

                        <Text style={{ textAlign: "center", fontSize: 16, marginTop: 10, color: "white" }}> Donate </Text>

                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    navigation.navigate('feedback')
                }}>
                    <View style={styles.item}>

                        <Text style={{ textAlign: "center", fontSize: 16, marginTop: 10, color: "white" }}> Feedback </Text>

                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    navigation.navigate('feedback')
                }}>
                    <View style={styles.item}>

                        <Text style={{ textAlign: "center", fontSize: 16, marginTop: 10, color: "white" }}>Log out </Text>

                    </View>
                </TouchableOpacity>



            </ScrollView>

        </SafeAreaView >
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0178B9",
        alignContent: 'center',
    },
    ImageView: {
        height: 100,
        width: 100,
        borderRadius: 50,
        backgroundColor: "white",
        alignSelf: "center"


    },
    item: {
        height: 40,
        width: "100%",

    }
});

export default drawerItem;

