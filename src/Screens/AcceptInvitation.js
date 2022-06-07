import React, { useState, useEffect, useContext, useRef } from "react";
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Image,
    TouchableOpacity,
    StatusBar
} from 'react-native';
import back from '../Assets/Icons/Arrr.png';
import pizza from '../Assets/Icons/pizza.png';
import locationTwo from '../Assets/Icons/locationtwo.png';
import maps from '../Assets/Icons/maps.png';
import arrowDown from '../Assets/Icons/downarrow.png';
// import capture from '../Assets/Images/test.png';
import AsyncStorage from '@react-native-community/async-storage';

import { get, post } from '../utils/api';
import { _alert, _font, _toast } from '../utils/index';
function AcceptInvitation({ navigation, route }) {
    const [isAnimating, setAnimating] = useState(false);
    const [Detail, setDetail] = useState([]);

    useEffect(() => {
        console.log("Job Detail", route.params)
        setDetail(route.params)
        //Submit()
        //alert('ok')
    }, [])
    // const Submit = async () => {

    //     setAnimating(true)
    //     //const getToken = await AsyncStorage.getItem('token');${usertoken}${route.params.id}
    //     let usertoken = JSON.parse(await AsyncStorage.getItem('login_token'));
    //     // console.log(usertoken)
    //     let result = await get(`job_detail?token=770&job_id=${route.params.id}`);
    //     console.log('result3330', result.data.job_detail[0])
    //     if (result.success) {
    //        // setDetail(result.data.job_detail[0])
    //         setAnimating(false)
    //     } else {
    //         setAnimating(false)
    //         _toast('something went wrong');
    //     }
    // }
    Back = () => {
        navigation.goBack()
    }

    const ApplyNow = async () => {

        setAnimating(true)
        var data = {
            token: 770,
            invitation_id: Detail.id,
        }

        console.log(data, "apiData")
       let result = await post(data, 'accept_invitation');
        console.log('result1111', result.data)
        if (result.status) {
            setAnimating(false)
            _toast('Applied')
            // setHolidays(false)
        } else {
            setAnimating(false)
            if (result.message != 'something went wrong') {
                _toast(result.message);
            }
        }
    }



    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#1FC7B2" />
            <View style={{ width: "100%", backgroundColor: "#1FC7B2", flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity style={styles.back} styles={{ width: "15%" }} onPress={() => { Back() }}>
                    <Image source={back} style={styles.backIcon}></Image>
                </TouchableOpacity>
                <Text style={{ color: 'white', fontSize: 18 }}>Job Detail</Text>
            </View>

            <View style={{ backgroundColor: '#F2F2F5', flex: 1, }}>
                <ScrollView keyboardShouldPersistTaps="handled">
                    <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'space-evenly', marginTop: '10%' }}>
                        <Image source={pizza} style={{ width: 170, height: 120, borderRadius: 7, }} />
                        <View>
                            <Text style={{ fontSize: 18, fontWeight: '700' }}>{Detail.title}</Text>
                            <Text style={{ fontSize: 17, color: '#1dc7b1', marginVertical: '5%' }}>${Detail.budget}</Text>
                            {/* <TouchableOpacity
                                onPress={() => navigation.navigate('Vetting')}
                                style={{ borderRadius: 15, width: '130%', backgroundColor: '#1dc7b1', marginTop: '7%', height: 35, justifyContent: 'center', }}>
                                <Text style={{ textAlign: 'center', color: 'white' }}>PAY</Text>
                            </TouchableOpacity> */}
                        </View>

                    </View>
                    <Text style={{ width: '90%', marginLeft: '5%', fontSize: 16, marginTop: '5%' }}>{Detail.detail}</Text>

                    <Text style={{ marginTop: '3%', marginLeft: '5%', fontSize: 17, fontWeight: 'bold' }}>Skills</Text>
                    <Text style={{ marginTop: '1%', marginLeft: '5%' }}>{Detail.skill_name}</Text>

                    <Text style={{ marginTop: '3%', marginLeft: '5%', fontSize: 17, fontWeight: 'bold' }}>Job Type</Text>
                    <Text style={{ marginTop: '1%', marginLeft: '5%' }}>{Detail.job_type}</Text>

                    <Text style={{ marginTop: '3%', marginLeft: '5%', fontSize: 17, fontWeight: 'bold' }}>Company</Text>
                    <Text style={{ marginTop: '1%', marginLeft: '5%' }}>{Detail.company_name}</Text>

                    <Text style={{ marginTop: '3%', marginLeft: '5%', fontSize: 17, fontWeight: 'bold' }}>Address</Text>
                    <Text style={{ marginTop: '1%', marginLeft: '5%' }}>{Detail.address}</Text>

                    <View style={[styles.seperater, { marginLeft: 0, marginRight: 0, marginTop: '5%' }]} />

                    <View style={{ width: '90%', marginLeft: '5%', marginTop: '1%' }}>
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                            <Text style={{ fontSize: 18, fontWeight: '600' }}>{Detail.location_name}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ color: '#1dc7b1', fontSize: 17 }}>85 miles</Text>
                                <Image source={locationTwo} style={{ width: 20, height: 20 }} />
                            </View>
                        </View>
                        <View style={{ width: '100%' }}>
                            <Image source={maps} style={{ width: '100%', height: 120, marginTop: '3%' }} />
                        </View>
                    </View>
                    <Text style={{ marginTop: '3%', marginLeft: '5%', fontSize: 17, fontWeight: 'bold' }}>Car Parking</Text>
                    <Text style={{ marginTop: '1%', marginLeft: '5%' }}>Available</Text>

                    <Text style={{ marginTop: '3%', marginLeft: '5%', fontSize: 17, fontWeight: 'bold' }}>Job Requirements</Text>

                    <View style={{ flexDirection: 'row', alignItems: "center", marginLeft: '5%', marginTop: '2%' }}>
                        <Text style={{ marginLeft: '3%', fontSize: 15 }}>{Detail.job_requirement}</Text>
                    </View>
                    <Text style={{ fontSize: 20, marginLeft: '5%', marginTop: '7%' }}>Shift Available</Text>

                    <View style={{ width: '90%', marginLeft: "5%", flexDirection: 'row', justifyContent: 'space-between', marginTop: '5%' }}>
                        <Text style={{ fontSize: 19, alignSelf: 'center' }}>Date</Text>
                        <Image style={{ width: 15, height: 15, alignSelf: 'center' }} source={arrowDown} />
                    </View>

                    <View style={{ flexDirection: 'row', width: '90%', marginLeft: '5%', borderWidth: 0.5, borderRadius: 8, borderColor: '#d5c9de', marginTop: '5%' }}>
                        <View style={{ paddingVertical: '7%', marginLeft: '7%', alignItems: 'center', flex: 1 }}>
                            <Text style={{ fontSize: 18 }} >From Date</Text>
                            <Text style={{ fontSize: 18, color: 'gray' }}>{Detail.date_from}</Text>
                        </View>
                        <View style={{ paddingVertical: '7%', marginLeft: '7%', alignItems: 'center', flex: 1 }}>
                            <Text style={{ fontSize: 18 }} >To Date</Text>
                            <Text style={{ fontSize: 18, color: 'gray' }}>{Detail.date_to}</Text>
                        </View>

                    </View>
                    <Text style={{ fontSize: 19, marginLeft: '5%', marginTop: '5%' }}>Time</Text>
                    <View style={{ flexDirection: 'row', width: '90%', marginLeft: '5%', borderWidth: 0.5, borderRadius: 8, borderColor: '#d5c9de', marginTop: '5%' }}>
                        <Text style={{ paddingVertical: '5%', fontSize: 18, marginLeft: '7%', flex: 1, color: 'black' }}>{Detail.start_time}</Text>
                        <Text style={{ paddingVertical: '5%', fontSize: 18, marginLeft: '7%', flex: 1, color: '#1dc7b1', textAlign: 'center' }}>To</Text>
                        <Text style={{ paddingVertical: '5%', fontSize: 18, marginLeft: '5%', flex: 1, color: 'black' }}>{Detail.end_time}</Text>

                    </View>
                    <View style={{ width: '90%', marginLeft: '5%', }}>
                        <Text style={{ fontSize: 20, marginLeft: '5%', marginTop: '6%' }}>Uniform</Text>
                        <Image source={require('../Assets/Images/backGround4.png')} style={{ width: '100%', height: 200, marginVertical: '5%' }} />
                    </View>
                    <Text style={{ marginTop: '3%', marginLeft: '5%', fontSize: 17, fontWeight: 'bold' }}>Requirements</Text>

                    <View style={{ flexDirection: 'row', alignItems: "center", marginLeft: '5%', marginTop: '2%' }}>

                        <Text style={{ marginLeft: '3%', fontSize: 15 }}>{Detail.uniform_requirement}</Text>
                    </View>


                    <TouchableOpacity
                        onPress={() => ApplyNow()}
                        style={{ borderRadius: 15, width: '85%', backgroundColor: '#1dc7b1', alignSelf: 'center', marginTop: '10%', height: 40, justifyContent: 'center', marginBottom: '15%' }}>
                        <Text style={{ textAlign: 'center', color: 'white' }}>Accept Invitation</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1FC7B2",
    },
    back: {
        height: 50,
        width: 50,
        marginLeft: 15,
        justifyContent: 'center'
    },
    backIcon: {
        height: 20,
        width: 20,
    },
    seperater: {
        height: 1,
        marginLeft: 20,
        marginRight: 30,
        marginBottom: 10,
        backgroundColor: '#d5c9de',
    },
})

export default AcceptInvitation;