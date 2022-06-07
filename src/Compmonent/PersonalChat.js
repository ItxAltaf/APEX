// ./screens/Home.js

import React, { useState, useEffect, useContext, useRef } from "react";
import { View, StyleSheet, Button, ActivityIndicator, Text, StatusBar, TouchableWithoutFeedback, TouchableOpacity, Image, ScrollView, SafeAreaView, AsyncStorage, FlatList, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'

import manue from '../Assets/Icons/manue.png'
import image from '../Assets/Icons/image.png'
import image1 from '../Assets/Icons/image2.png'
import profile_icon from '../Assets/Icons/profile_icon.png'


import bell from '../Assets/Icons/bell_icon.png'

function PersonalChat({ navigation }) {


    const [isAnimating, setAnimating] = useState(false);
    const [isDisabled, setDisabled] = useState(false);
    const [message, setMessage] = useState([
        {
            image: profile_icon,
            name: 'User Name',
            description: 'Interview Interview Interview',
            time: '2hr',

        },
        {
            image: profile_icon,
            name: 'User Name',
            description: 'Interview Interview Interview',
            time: '2hr',
        },
        {
            image: profile_icon,
            name: 'User Name',
            description: 'Interview Interview Interview',
            time: '2hr',

        }, {
            image: profile_icon,
            name: 'User Name',
            description: 'Interview Interview Interview',
            time: '2hr',

        }, {
            image: profile_icon,
            name: 'User Name',
            description: 'Interview Interview Interview',
            time: '2hr',

        },
    ]);





    openManue = () => {
        navigation.openDrawer();

    }


    goToNotification = () => {
        navigation.navigate('Notification')
    }

    return (
        <SafeAreaView style={[styles.container]}>
            <StatusBar barStyle="light-content" backgroundColor="#1FC7B2" />

            {/* top bar */}
            <View style={{ width: "100%", flexDirection: "row", height: 60, backgroundColor: '#1FC7B2', justifyContent: "space-between" }}>
                {/* <TouchableOpacity style={{ width: '15%', justifyContent: "center", alignItems: "center" }}   >

                </TouchableOpacity> */}
                <View style={{ width: "70%", justifyContent: "center", marginLeft: 20 }}>
                    <Text style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>Chat</Text>
                </View>
                <TouchableOpacity style={{ width: '15%', justifyContent: "center", alignItems: "center" }} onPress={() => { goToNotification() }} >
                    <Image source={bell} style={{ width: 25, height: 25 }}></Image>
                </TouchableOpacity>
            </View>

            {/* top bar */}
            <View style={{ backgroundColor: 'white', }}>

                <ScrollView keyboardShouldPersistTaps={'handled'} showsVerticalScrollIndicator={false} >
                <Text style={{ fontSize: 20, color: "black", fontWeight: "bold",marginHorizontal: 20,marginTop:20 }}>ACTIVE</Text>
                    <View style={{ flexDirection: "row" ,margin:10,}}>
                        <View style={{ alignItems: "center", }}>
                            <View style={{ height: 70, width: 70,marginLeft:7, borderRadius: 30, alignItems: "center", justifyContent: "center", marginRight: 10 }}>
                                <Image source={profile_icon} style={{ width: 80, height: 80, resizeMode: "contain" }} />
                            </View>
                            <View style={{}}>
                                <Text style={{ fontSize: 16, fontWeight: "bold",margin:10 }}>Alisa</Text>
                            </View>
                        </View>
                        <View style={{ alignItems: "center", }}>
                            <View style={{ height: 70, width: 70,marginLeft:5, borderRadius: 30, alignItems: "center", justifyContent: "center", marginRight: 10 }}>
                                <Image source={profile_icon} style={{ width: 80, height: 80, resizeMode: "contain" }} />
                            </View>
                            <View style={{}}>
                                <Text style={{ fontSize: 16, fontWeight: "bold",margin:10}}>Kat</Text>
                            </View>
                        </View>
                        <View style={{ alignItems: "center", }}>
                            <View style={{ height: 70, width: 70,marginLeft:5, borderRadius: 30, alignItems: "center", justifyContent: "center", marginRight: 10 }}>
                                <Image source={profile_icon} style={{ width: 80, height: 80, resizeMode: "contain" }} />
                            </View>
                            <View style={{}}>
                                <Text style={{ fontSize: 16, fontWeight: "bold",margin:10 }}>Perry</Text>
                            </View>
                        </View>
                        <View style={{ alignItems: "center", }}>
                            <View style={{ height: 70, width: 70,marginLeft:5,borderRadius: 30, alignItems: "center", justifyContent: "center", marginRight: 10 }}>
                                <Image source={profile_icon} style={{ width: 80, height: 80, resizeMode: "contain" }} />
                            </View>
                            <View style={{}}>
                                <Text style={{ fontSize: 16, fontWeight: "bold",margin:10 }}>Jad</Text>
                            </View>
                        </View>
                        

                    </View>

                    <Text style={{ fontWeight: 'bold', marginHorizontal: 20, fontSize: 16, marginTop: 15, }}>CONVERSATIONS</Text>

                    <View style={{ width: "100%" }}>
                        {
                            message.map((item, index) => {
                                return (
                                    <TouchableOpacity>
                                        <View style={{ width: "90%", flexDirection: "row", height: 100, alignItems: "center", alignSelf: "center", justifyContent: "space-between" }}>
                                            <View style={{ flexDirection: "row", alignItems: "center", }}>
                                                <View style={{ height: 60, width: 60, borderRadius: 30, alignItems: "center", justifyContent: "center", marginRight: 10 }}>
                                                    <Image source={profile_icon} style={{ width: 60, height: 60, resizeMode: "contain" }} />
                                                </View>
                                                <View style={{}}>
                                                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>Barbara Matthews</Text>
                                                    <Text style={{ fontSize: 14, color: "#797A79" }}>Some Message from user</Text>

                                                </View>
                                            </View>
                                            <View styl={{}}>
                                                <Text style={{ marginLeft: 20, fontSize: 16, color: "#797A79" }}>2 hr</Text>

                                            </View>
                                        </View>
                                        <View style={styles.seperater}></View>
                                    </TouchableOpacity>
                                );
                            })
                        }
                    </View>

                    <View style={{ height: 200 }}></View>

                </ScrollView>
            </View>
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#1FC7B2",
        alignContent: 'center',
    },


    shadStyle: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    },
    button: {
        marginTop: 30,
        alignSelf: 'center',
        height: 30,
        width: 130,
        backgroundColor: '#1FC7B2',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        shadowColor: "#111111",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 14,
    },
    seperater: {
        height: 1,

        backgroundColor: '#d5c9de'

    },
});

export default PersonalChat;
