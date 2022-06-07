// ./screens/Home.js

import React, { useState, useEffect, useContext, useRef } from "react";
import { View, StyleSheet, TextInput, ActivityIndicator, Text, StatusBar, TouchableWithoutFeedback, TouchableOpacity, Image, ScrollView, SafeAreaView, FlatList, Platform } from 'react-native';
import backGroundImage1 from '../Assets/Images/backGroundImage1.png'
import bell from '../Assets/Icons/bell_icon.png'
import info from '../Assets/Icons/goldNoti.png'
import search from '../Assets/Icons/search1.png'
import blackNoti from '../Assets/Icons/bell_icon.png'

import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment'

import { domain } from '../Api/Api'

import { get } from '../utils/api';
import { _alert, _font, _toast } from '../utils/index';



function Home({ navigation }) {

    const [isAnimating, setAnimating] = useState(false);
    const [isDisabled, setDisabled] = useState(false);

    const [newJob, setNewJob] = useState([]);
    const [myInvitation, setMyInvitation] = useState([]);
    const [notification, setNotification] = useState([]);
    const [FilterVisible, setFilterVisible] = useState(false);
    const [searchtext, setsearchtext] = useState('');

    const [Data, setData] = useState([]);
    const [UToken, setUToken] = useState();

    const openManue = () => {
        navigation.openDrawer();

    }


    const goToNotification = () => {
        navigation.navigate('Notification')
    }

    useEffect(() => {
        homeApi()
        //alert('ok')
    }, [])

    const homeApi = async () => {

        setAnimating(true)
        //const getToken = await AsyncStorage.getItem('token');${usertoken}
        let usertoken = JSON.parse(await AsyncStorage.getItem('login_token'));
        setUToken(usertoken)
        let result = await get(`get-home?token=${usertoken}`);
        //console.log('result11110000', result.data.new_jobs)
        if (result.success) {
            setNewJob(result.data.new_jobs)
            setMyInvitation(result.data.invite_job)
            setNotification(result.data.notification)
            setAnimating(false)
        } else {
            setAnimating(false)
            _toast('something went wrong');
        }
        // try {

        //     await fetch(domain + `get-home?token=782`, {
        //         method: 'GET',
        //         headers: {
        //             Accept: 'application/json',
        //             'Content-Type': 'multipart/form-data',
        //         },
        //     })
        //         .then(response => {
        //             const statusCode = response.status;
        //             const data = response.json();
        //             return Promise.all([statusCode, data]);

        //         })
        //         .then(async (data) => {
        //             // console.log('Response->', data)

        //             if (data[1].success) {

        //                 await setNewJob(data[1].new_jobs)
        //                 await setMyInvitation(data[1].invite_job)
        //                 await setNotification(data[1].notification)
        //                 setAnimating(false)


        //             } else {
        //                 setAnimating(false)
        //                 alert(data[1].error)
        //             }

        //         })
        //         .catch(err => {
        //             setAnimating(false)
        //             alert(err)
        //             console.log('failed', err)
        //         })

        // } catch (error) {
        //     setAnimating(false)
        //     console.log(error);
        //     alert(error)


        // }


    }
    const SearchChangeHandler = async (value) => {
        setsearchtext(value)
        setAnimating(true);
        let result = await get(`search_jobs?token=${UToken}&search=${value}`);
        console.log('result1111', result)
        if (result.success) {
            setData(result.data.jobs)
            // if (result.data.jobs.length <= 0) {
            //     _toast('No result found!');
            // }
        }
        else {
            _toast('Something went wrong!')
        }
        setAnimating(false);
    };
    const gotoScreenOne = (item) => {
        navigation.navigate('ScreenOne', item)
    }
    const gotoJObDetail = (item) => {
        navigation.navigate('JobDetails', item)
    }


    return (
        <SafeAreaView style={[styles.container]}>
            <StatusBar barStyle="light-content" backgroundColor="#1FC7B2" />

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
            <View style={{ backgroundColor: '#F2F2F5', paddingHorizontal: 20, marginTop: -20 }}>
                <Text style={{ fontSize: 22, fontWeight: '700', }}>Good Morning  </Text>
                <Text style={{ color: 'gray', marginTop: 2 }}>What job You looking for?  </Text>
                <View style={{ borderRadius: 15, height: 40, backgroundColor: '#E6E8E7', flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                    <TextInput
                        placeholder='Search here'
                        style={{ paddingLeft: "6%", color: "black", }}
                        onChangeText={SearchChangeHandler}
                    />
                    <Image
                        source={search}
                        style={{ width: 25, height: 25, alignSelf: 'center', marginRight: '3%' }}
                    />
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'handled'}>
                <View style={{ backgroundColor: '#F2F2F5', paddingHorizontal: 20 }}>
                    {searchtext && Data && Data.length == 0 ?
                        <Text style={{textAlign:'center',}}>No result found.</Text>
                        :
                        null
                    }
                    {Data && Data.length > 0 ?
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
                        :
                        null

                    }
                    <View>

                        <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 15 }}> My jobs  </Text>


                        {
                            newJob.map((item, index) => {
                                return (

                                    <TouchableOpacity key={index} style={{ backgroundColor: "#1FC7B2", marginTop: '6%', borderRadius: 10, padding: 10 }}
                                        onPress={() => { gotoScreenOne(item) }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <View style={{}}>
                                                <Text style={{ fontWeight: 'bold', color: 'white', marginLeft: '5%', paddingTop: '5%' }}>{item.title}</Text>
                                                <Text style={{ paddingTop: '3%', color: 'white', marginLeft: '5%', }}>{item.company_name}</Text>
                                                <View style={{ padding: 8 }} />
                                                <Text style={{ marginTop: '4%', color: 'white', marginLeft: '5%', fontWeight: '700' }}>Job Timing</Text>
                                                <Text style={{ marginTop: '0.7%', color: 'white', marginLeft: '5%', }}>{item.start_time}</Text>
                                            </View>
                                            <Image
                                                source={backGroundImage1}
                                                style={{ width: 80, height: 80, marginRight: '3%', }}
                                            />
                                        </View>
                                    </TouchableOpacity>

                                );
                            })
                        }






                        <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 10 }}> My Invitations  </Text>

                        {
                            myInvitation.map((item, index) => {
                                return (

                                    <TouchableOpacity key={index} style={{ backgroundColor: "#1FC7B2", marginTop: '6%', borderRadius: 10, padding: 10 }}
                                        onPress={() => navigation.navigate('AcceptInvitation', item)}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <View style={{}}>
                                                <Text style={{ fontWeight: 'bold', color: 'white', marginLeft: '5%', paddingTop: '5%' }}>{item.title}</Text>
                                                <Text style={{ paddingTop: '3%', color: 'white', marginLeft: '5%', }}>{item.company_name}</Text>
                                                <View style={{ padding: 8 }} />
                                                <Text style={{ marginTop: '4%', color: 'white', marginLeft: '5%', fontWeight: '700' }}>Job Timing</Text>
                                                <Text style={{ marginTop: '0.7%', color: 'white', marginLeft: '5%', }}>{item.start_time}</Text>
                                            </View>
                                            <Image
                                                source={backGroundImage1}
                                                style={{ width: 80, height: 80, marginRight: '3%', }}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                );
                            })
                        }



                        <Text style={{ fontWeight: 'bold', fontSize: 14, marginTop: 15, marginBottom: 15 }}>Recent Notifications</Text>

                        <View>
                            {
                                notification.map((item, index) => {
                                    return (
                                        <View style={{ marginBottom: "2%", }} key={index}>
                                            <View style={{ flexDirection: 'row', marginVertical: "2%", }}>
                                                <Image style={{ width: 20, height: 20, tintColor: '#FFDA6D' }}
                                                    source={info} />
                                                <Text style={{ marginHorizontal: '3%', }}>{item.text}</Text>
                                            </View>
                                            <View
                                                style={{ borderBottomColor: 'grey', borderWidth: 0.5, }}
                                            />
                                        </View>
                                    );
                                })
                            }
                        </View>

                    </View>
                    <View style={{ height: 50 }}></View>
                </View>
            </ScrollView>







            {isAnimating &&
                <ActivityIndicator size="large" color="#1FC7B2" animating={isAnimating} style={styles.loading} />
            }
        </SafeAreaView >

    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1FC7B2",
        alignContent: 'center',
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',

    },
});
export default Home;
