// ./screens/Home.js

import React, { useState, useEffect, useContext, useRef } from "react";
import { View, StyleSheet, TextInput, ActivityIndicator, Text, StatusBar, Modal, TouchableOpacity, Image, ScrollView, SafeAreaView, FlatList, Platform } from 'react-native';
import backGroundImage1 from '../Assets/Icons/food.jpeg'
import bell from '../Assets/Icons/bell_icon.png'
import info from '../Assets/Icons/goldNoti.png'
import search from '../Assets/Icons/search1.png'
import questionmark from '../Assets/Icons/questionmark.png'
import dotline from '../Assets/Icons/doneline.png'
import filter from '../Assets/Icons/filter.png'


import blackNoti from '../Assets/Icons/bell_icon.png'
import { Item } from "native-base";
import { get } from '../utils/api';
import { _alert, images, WIDTH, HEIGHT, colours, _font, _toast, validateEmail } from '../utils/index';
import AsyncStorage from '@react-native-community/async-storage';


function Search({ navigation }) {

    const [isAnimating, setAnimating] = useState(false);
    const [FilterVisible, setFilterVisible] = useState(false);

    const [Data, setData] = useState([]);
    const [UToken, setUToken] = useState();
    useEffect(() => {
        Submit()
        //alert('ok')
    }, [])
    const Submit = async () => {
        let usertoken = JSON.parse(await AsyncStorage.getItem('login_token'));
        setUToken(usertoken)
        let result = await get(`show_jobs?token=${usertoken}`);

        console.log('result3330', result.data)
        if (result.success) {
            setData(result.data.jobs)
            // setAnimating(false)
        } else {
            // setAnimating(false)
            _toast('something went wrong');
        }
    }

    const SearchChangeHandler = async (value) => {
        setAnimating(true);
        let result = await get(`search_jobs?token=${UToken}&search=${value}`);
        console.log('result1111', result)
        if (result.success) {
            setData(result.data.jobs)
            // await AsyncStorage.setItem('login_token',JSON.stringify(result.data.login_token) );
            // navigation.reset({
            //     index: 0,
            //     routes: [{ name: 'Home' }],
            // })
        }
        else {
            if (result.message == 'Invalid Credentials') {
                // setLoading(true);
                // let result2 = await post({email: email}, 'user/resendCode');
                // if (result2.status) {
                //     props.navigation.navigate('StepFour', {uEmail: email.toLowerCase()});
                // } else {
                //     _toast(result2.message);
                // }
                setAnimating(false);
                _toast(result.message);

            }
            else {
                if (result.message != 'Something went wrong!') {
                    _toast(result.message);
                }
            }
        }
        setAnimating(false);
    };
    goToNotification = () => {
        navigation.navigate('Notification')
    }
    openManue = () => {
        navigation.openDrawer();

    }
    const gotoJObDetail = (item) => {
        navigation.navigate('JobDetails', item)
    }


    return (
        <SafeAreaView style={[styles.container]}>
            <StatusBar barStyle="light-content" backgroundColor="#1FC7B2" />
            <Modal visible={FilterVisible} transparent={false}>
                <ScrollView style={{ width: "100%", height: "100%", marginTop: "20%" }}>
                    <View style={styles.modalContainer}>

                        <Text style={{ fontWeight: 'bold', color: 'black', marginLeft: '5%', paddingTop: '5%' }}>Holidays</Text>


                        <View style={[styles.inputContainer]}>
                            <TextInput
                                multiline={true}
                                autoCapitalize="none"
                                placeholder='Type Reason'
                                placeholderTextColor='#d5c9de'
                                // onChangeText={(val) => { setreason(val) }}


                                style={styles.input2}

                                underlineColorAndroid='transparent' />


                        </View>

                        <TouchableOpacity style={styles.ModalButton}
                        //onPress={() => { SubmitLeave() }}
                        >
                            <Text style={{ color: '#FFFFFF', fontSize: 15, fontWeight: 'bold', textAlign: "center" }}>Confirm</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ marginVertical: 10 }}
                         onPress={() => { setFilterVisible(false) }}
                        >
                            <Text style={{ color: 'black', fontSize: 15, fontWeight: 'bold', textAlign: "center" }}>back</Text>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
            </Modal>
            {/* top bar */}
            <View style={{ width: "100%", flexDirection: "row", height: 60, backgroundColor: '#F2F2F5', justifyContent: "space-between" }}>
                <TouchableOpacity style={{ width: '15%', justifyContent: "center", alignItems: "center" }}   >
                    {/* <Image source={manue} style={{ width: 25, height: 25 }}></Image> */}

                </TouchableOpacity>
                {/* <View style={{ width: "70%", justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>Home</Text>
                </View> */}
                <TouchableOpacity style={{ width: '15%', justifyContent: "center", alignItems: "center" }} onPress={() => { goToNotification() }} >
                    <Image source={blackNoti} style={{ width: 25, height: 25 }}></Image>

                </TouchableOpacity>
            </View>
            {/* top bar */}
            <View style={{ paddingHorizontal: 20, backgroundColor: '#F2F2F5', marginTop: -20 }}>
                <Text style={{ fontSize: 22, fontWeight: '700', }}>Search Results  </Text>
                <View style={{ borderRadius: 15, height: 40, backgroundColor: '#E6E8E7', flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                    <TextInput
                        placeholder='Search here'
                        style={{ paddingLeft: "6%" }}
                        onChangeText={SearchChangeHandler}

                    />
                    <Image
                        source={search}
                        style={{ width: 25, height: 25, alignSelf: 'center', marginRight: '3%' }}
                    />
                </View>
            </View>

            <View style={{ backgroundColor: '#F2F2F5', flex: 1, }}>
                <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}  >


                    <TouchableOpacity>

                        <View style={[{
                            width: '90%', alignSelf: "center", paddingTop: 60, paddingBottom: 20, marginTop: 20,
                            borderRadius: 10,
                            backgroundColor: 'white',
                        }, styles.shadStyle]}>

                            <View style={{
                                marginTop: -70, width: 30, height: 30, marginLeft: -10, borderRadius: 20,
                            }}>
                                <Image source={questionmark} style={{ width: 30, height: 30 }}></Image>

                            </View>

                            <View style={{ flexDirection: 'row', width: "100%", height: 60, alignItems: "center" }}>
                                <View style={{ width: "30%", justifyContent: "center" }}>
                                    <Image source={dotline} style={{ alignSelf: 'center', width: 60, height: 60, resizeMode: "contain" }} />
                                </View>
                                <View style={{ width: "70%", paddingRight: 20, }}>
                                    <Text style={{ color: 'black', fontSize: 14, marginTop: 5, }}>Complete Vetting To Apply For The Job</Text>
                                </View>
                            </View>

                        </View>
                    </TouchableOpacity>

                    <View style={{ width: "90%", alignSelf: "center", flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, marginTop: 20 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, }}>Jobs Near You  </Text>
                        <TouchableOpacity  onPress={() => { setFilterVisible(true) }}>
                            <View>
                                <Image source={filter} style={{ alignSelf: 'center', width: 20, height: 20, resizeMode: "contain" }} />

                            </View>
                        </TouchableOpacity>
                    </View>



                    <FlatList
                        data={Data}
                        style={{ paddingRight: 5, paddingLeft: 5, marginBottom: Platform.OS === 'ios' ? 0 : 60, marginTop: 15 }}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}     //has to be unique   


                        renderItem={({ item, index }) => (
                            <View style={{ paddingLeft: 10, marginRight: 10 }} key={index}>
                                <TouchableOpacity
                                    onPress={() => gotoJObDetail(item)}
                                >
                                    <View style={styles.itemContainer}>
                                        <View style={{ alignItems: "center", alignSelf: "flex-start", marginRight: 10 }}>

                                            <View style={{ flex: 1, flexDirection: "column", justifyContent: "flex-start", width: 100, alignItems: "center", justifyContent: "center", }}>
                                                <Image style={{ width: 100, height: 100, resizeMode: "contain" }} source={backGroundImage1} />
                                            </View>

                                        </View>

                                        <View style={{ flex: 1, paddingRight: 8, flexDirection: "column", }}>

                                            <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-between" }}>

                                                <Text style={{ textTransform: 'uppercase', color: "black", fontSize: 14, fontWeight: "bold" }}>{item.skill_name}</Text>
                                                <Text style={{ textTransform: 'uppercase', color: "#1FC7B2", fontSize: 12, }}>{item.budget}$</Text>

                                            </View>
                                            <View style={{ flex: 1, flexDirection: "column", justifyContent: "space-between" }}>
                                                <View style={{ flexDirection: "column", }}>
                                                    <View style={{ flexDirection: "row", }}>
                                                        <Text numberOfLines={2} style={{ fontSize: 13, color: "#6BC7E2" }}>{item.start_time} / {item.end_time}</Text>
                                                    </View>
                                                    <View style={{ flexDirection: "row", }}>
                                                        <Text numberOfLines={2} style={{ fontSize: 12, color: "#666666", marginTop: 5, }}>{item.detail}</Text>
                                                    </View>
                                                </View>

                                                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>

                                                    <Text style={{ color: "#666666", fontSize: 11, fontFamily: 'NotoSans-Medium', marginTop: 2 }}></Text>

                                                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                                        <Text style={{ paddingLeft: 1, color: "#666666", fontSize: 9, }}>{item.distance}</Text>
                                                    </View>
                                                </View>
                                            </View>


                                        </View>


                                    </View>

                                </TouchableOpacity>
                            </View>
                        )}
                    />
                    <View style={{ height: 50 }}></View>
                </ScrollView>
            </View>
        </SafeAreaView >

    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    itemContainer: {

        // height: 90,
        backgroundColor: "white",
        marginTop: 7,
        padding: 10,
        paddingBottom: 5,
        marginBottom: 7,
        borderRadius: 7,
        flexDirection: "row",
        alignItems: "center",

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,



    },
    ModalButton: {
        marginBottom: 10,
        marginTop: 30,
        alignSelf: 'center',
        height: 40,
        width: "100%",
        backgroundColor: "#1FC7B2",
        justifyContent: 'center',
        alignItems: 'center',

        borderRadius: 10,
        shadowColor: "black",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        elevation: 5,
    },
    textField: {

        marginRight: 30,
        width: '70%',
        marginTop: 6,
        marginBottom: 3,
        paddingTop: '3%',
        paddingBottom: '3%',


    },
    seperater: {
        height: 0.5,
        width: "90%",
        backgroundColor: 'black'

    },
    modalContainer: {
        flex: 1,
        width: "90%",
        backgroundColor: "white",
        alignSelf: "center",
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderRadius: 20,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: "hidden",

    },
    inputContainer: {
        marginTop: 20,
        width: "100%",

        height: 100,
        backgroundColor: '#FFF',
        borderRadius: 25,

        borderWidth: 0.5,
        shadowColor: "#B3B3B3",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    },
    input2: {
        fontSize: 15,
        width: "100%",
        paddingLeft: 20,
        paddingBottom: 40,
        color: 'black',
        marginTop: 10,


    },

    modalHeading: {
        color: "black", fontSize: 22,
        fontWeight: 'bold', marginTop: 15,
        marginBottom: 20, alignSelf: "flex-start",
    },
});
export default Search;
