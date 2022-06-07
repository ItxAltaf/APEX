// ./screens/Home.js

import React, { useState, useEffect, useContext, useRef } from "react";
import { View, StyleSheet, Button, ActivityIndicator, Text, StatusBar, Modal, TouchableOpacity, Image, ScrollView, SafeAreaView, FlatList, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import bell from '../Assets/Icons/bell_icon.png'
import profile_icon from '../Assets/Icons/profile_icon.png'
import star from '../Assets/Icons/star.png'
import add from '../Assets/Icons/add.png'
import briefecase from '../Assets/Icons/briefecase.png';
import coin from '../Assets/Icons/coin.png';
import AsyncStorage from '@react-native-community/async-storage';
import { get, post, put } from '../utils/api';
import { _alert, _font, _toast } from '../utils/index';
import modal3 from '../Assets/Images/modal4.png';
import calenderDate from '../Assets/Icons/calendardate.png'
import RadioButton from '../Compmonent/RadioButton'
import * as Animatable from 'react-native-animatable';


function profile({ navigation }) {
    const [userData, setuserData] = useState([])
    const [userInfo, setuserInfo] = useState([])
    const [Holidays, setHolidays] = useState(false);
    const [postCode, setPostCode] = useState(false);
    const [TransVisible, setTransVisible] = useState(false);
    const [CompnyVisible, setCompnyVisible] = useState(false);
    let [referanceYes, setReferanceYes] = useState(false);
    let [referanceNo, setReferanceNo] = useState(false);
    const [isAnimating, setAnimating] = useState(false);
    const [date, setDate] = useState('');
    const [reason, setreason] = useState('');
    const [Code, setCode] = useState('');
    const [Trans, setTrans] = useState('');
    const [CompCode, setCompCode] = useState('');
    const [UToken, setUToken] = useState();

    useEffect(() => {
        loadData();
    }, []);
    const setReferanceYesValue = () => {
        if (referanceYes == true) {
            setReferanceYes(false)
            setReferanceNo(false)
        }
        else if (referanceYes == false) {
            setReferanceYes(true)
            setReferanceNo(false)

        }

    }
    const setReferanceNoValue = () => {
        if (referanceNo == true) {
            setReferanceYes(false)
            setReferanceNo(false)
        }
        else if (referanceNo == false) {
            setReferanceYes(false)
            setReferanceNo(true)

        }


    }
    const loadData = async () => {
        //${usertoken}
        let usertoken = JSON.parse(await AsyncStorage.getItem('login_token'));
        setUToken(usertoken)
        let result = await get(`profile?token=${usertoken}`);
        //console.log('result11110000', result.data)
        if (result.success) {
            setuserData(result.data)
            setuserInfo(result.data.personal_info[0])
        } else {
            _toast('something went wrong');
        }
    };
    let Dummy_Array = [
        {
            title: 'Experience',
            value: userData.experience,
            image: '',
            star: '',
            onPress: () => {
                navigation.navigate('AddExperianceScreen', { UToken: UToken });
            }
            // onPress:''
        },
        {
            title: 'Qualification',
            value: userData.qualification,
            image: '',
            star: '',
            // onPress:''
        },
        {
            title: 'Post Code',
            value: userInfo.postcode,
            image: '',
            star: '',
            onPress: () => {
                setPostCode(true);
            }
        },
        {
            title: 'Transportation',
            value: userInfo.transportation == 1 ? 'Yes' : 'No',
            image: '',
            star: '',
            onPress: () => {
                setTransVisible(true);
            }
        },
        {
            title: 'Vetting',
            value: userData.vetting,
            image: '',
            star: '',
            onPress: () => {
                navigation.navigate('Vetting', { UToken: UToken });
            }
        },
        {
            title: 'Company Code',
            value: userInfo.company_id,
            image: '',
            star: '',
            onPress: () => {
                setCompnyVisible(true);
            }
        },
        {
            title: 'Sickness',
            value: userData.leave,
            image: '',
            star: '',
            // Setvisible:''
        },
    ];
    const SubmitLeave = async () => {

        setAnimating(true)
        var data = {
            token: UToken,
            job_id: 2,
            date: date,
            type: 'leave',
            reason: reason
        }

        //console.log(data, "apiData")
        let result = await post(data, 'leave');
        //console.log('result1111', result)
        if (result.status) {
            setAnimating(false)
            _toast('success')
            setHolidays(false)
        } else {
            setAnimating(false)
            if (result.message != 'something went wrong') {
                _toast(result.message);
            }
        }
    }
    const SubmitPostCode = async () => {

        setAnimating(true)
        var data = {
            token: UToken,
            postcode: Code,
        }
        let result = await get(`post_code/${Code}`);
        console.log('result3330', result.data)
        if (result.data.success) {
            //console.log(data, "apiData")
            let result = await put(data, 'update_postcode');
            //console.log('result1111', result)
            if (result.status) {
                setAnimating(false)
                _toast('success')
                setPostCode(false)
                loadData()
            } else {
                setAnimating(false)
                if (result.message != 'something went wrong') {
                    _toast(result.message);
                }
            }
        } else {
            _toast('PostCode not found');
        }



    }
    const SubmitTrans = async () => {

        setAnimating(true)
        var data = {
            token: UToken,
            transportation: referanceYes,
        }

        //console.log(data, "apiData")
        let result = await put(data, 'update_transportation');
        //console.log('result1111', result)
        if (result.status) {
            setAnimating(false)
            _toast('success')
            setTransVisible(false)
            loadData()
        } else {
            setAnimating(false)
            if (result.message != 'something went wrong') {
                _toast(result.message);
            }
        }
    }
    const SubmitCompCode = async () => {
        // if (CompCode.trim() === "") {
        //     _toast("Company Code is required");
        //     return
        // }
        setAnimating(true)
        var data = {
            token: UToken,
            company_id: CompCode,
        }

        //console.log(data, "apiData")
        let result = await put(data, 'update_company_code');
        //console.log('result1111', result)
        if (result.status) {
            setAnimating(false)
            _toast('success')
            setCompnyVisible(false)
            loadData()
        } else {
            setAnimating(false)
            if (result.message != 'something went wrong') {
                _toast(result.message);
            }
        }
    }
    openManue = () => {
        navigation.openDrawer();

    }

    goToNotification = () => {
        navigation.navigate('Notification')
    }


    return (
        <SafeAreaView style={[styles.container]}>
            <StatusBar barStyle="light-content" backgroundColor="#1FC7B2" />

            <Modal visible={Holidays} transparent={false}>
                <ScrollView style={{ width: "100%", height: "100%", marginTop: "20%" }}>
                    <View style={styles.modalContainer}>
                        <Image source={modal3} style={{ width: "100%", height: 200 }}></Image>

                        <Text style={{ fontWeight: 'bold', color: 'black', marginLeft: '5%', paddingTop: '5%' }}>Holidays</Text>


                        < View style={{ flexDirection: 'row', alignItems: "center" }} >
                            <Image source={calenderDate} style={{ height: 18, width: '5%', marginLeft: 30, marginRight: 10 }}></Image>

                            <TextInput
                                style={styles.textField}
                                placeholder='Date'
                                placeholderTextColor='#d5c9de'
                                onChangeText={(val) => setDate(val)}
                                keyboardType='decimal-pad'
                            >
                            </TextInput>

                        </ View>
                        < View style={styles.seperater}></ View>

                        <View style={[styles.inputContainer]}>
                            <TextInput
                                multiline={true}
                                autoCapitalize="none"
                                placeholder='Type Reason'
                                placeholderTextColor='#d5c9de'
                                onChangeText={(val) => { setreason(val) }}


                                style={styles.input2}

                                underlineColorAndroid='transparent' />


                        </View>

                        <TouchableOpacity style={styles.ModalButton} onPress={() => { SubmitLeave() }}>
                            <Text style={{ color: '#FFFFFF', fontSize: 15, fontWeight: 'bold', textAlign: "center" }}>Confirm</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ marginVertical: 10 }} onPress={() => { setHolidays(false) }}>
                            <Text style={{ color: 'black', fontSize: 15, fontWeight: 'bold', textAlign: "center" }}>back</Text>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
            </Modal>
            <Modal visible={postCode} transparent={false}>
                <ScrollView style={{ width: "100%", height: "70%", marginTop: "20%" }}>
                    <View style={styles.modalContainer}>

                        <Text style={{ fontWeight: 'bold', color: 'black', marginLeft: '5%', paddingTop: '5%' }}>Update Postcode</Text>


                        < View style={{ flexDirection: 'row', alignItems: "center" }} >
                            <Image source={calenderDate} style={{ height: 18, width: '5%', marginLeft: 30, marginRight: 10 }}></Image>

                            <TextInput
                                style={styles.textField}
                                placeholder='New Post code'
                                placeholderTextColor='#d5c9de'
                                onChangeText={(val) => setCode(val)}
                            >
                            </TextInput>

                        </ View>
                        < View style={styles.seperater}></ View>


                        <TouchableOpacity style={styles.ModalButton} onPress={() => { SubmitPostCode() }}>
                            <Text style={{ color: '#FFFFFF', fontSize: 15, fontWeight: 'bold', textAlign: "center" }}>Confirm</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ marginVertical: 10 }} onPress={() => { setPostCode(false) }}>
                            <Text style={{ color: 'black', fontSize: 15, fontWeight: 'bold', textAlign: "center" }}>back</Text>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
            </Modal>
            {/* top bar */}
            <Modal visible={TransVisible} transparent={false}>
                <ScrollView style={{ width: "100%", height: "70%", marginTop: "20%" }}>
                    <View style={styles.modalContainer}>

                        <Animatable.Text animation="fadeInUp" style={{ fontWeight: "bold", alignSelf: 'flex-start' }}>Transporation</Animatable.Text>

                        <Animatable.View animation="fadeInUp" style={{ alignSelf: 'flex-start', marginLeft: 20, marginTop: 10 }}>

                            <RadioButton
                                setFirstValue={setReferanceYesValue}
                                firstValue={referanceYes}
                                text1={"Yes"}
                                setSecondValue={setReferanceNoValue}
                                secondValue={referanceNo}
                                text2={"No"}
                            />
                        </Animatable.View>


                        <TouchableOpacity style={styles.ModalButton} onPress={() => { SubmitTrans() }}>
                            <Text style={{ color: '#FFFFFF', fontSize: 15, fontWeight: 'bold', textAlign: "center" }}>Confirm</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ marginVertical: 10 }} onPress={() => { setTransVisible(false) }}>
                            <Text style={{ color: 'black', fontSize: 15, fontWeight: 'bold', textAlign: "center" }}>back</Text>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
            </Modal>
            <Modal visible={CompnyVisible} transparent={false}>
                <ScrollView style={{ width: "100%", height: "70%", marginTop: "20%" }}>
                    <View style={styles.modalContainer}>

                        <Text style={{ fontWeight: 'bold', color: 'black', marginLeft: '5%', paddingTop: '5%' }}>Update Company code</Text>


                        < View style={{ flexDirection: 'row', alignItems: "center" }} >
                            <Image source={calenderDate} style={{ height: 18, width: '5%', marginLeft: 30, marginRight: 10 }}></Image>

                            <TextInput
                                style={styles.textField}
                                placeholder='New Company code'
                                placeholderTextColor='#d5c9de'
                                onChangeText={(val) => setCompCode(val)}
                                keyboardType='decimal-pad'
                            >
                            </TextInput>

                        </ View>
                        < View style={styles.seperater}></ View>


                        <TouchableOpacity style={styles.ModalButton} onPress={() => { SubmitCompCode() }}>
                            <Text style={{ color: '#FFFFFF', fontSize: 15, fontWeight: 'bold', textAlign: "center" }}>Confirm</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ marginVertical: 10 }} onPress={() => { setCompnyVisible(false) }}>
                            <Text style={{ color: 'black', fontSize: 15, fontWeight: 'bold', textAlign: "center" }}>back</Text>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
            </Modal>
            <View style={{ width: "100%", flexDirection: "row", height: 60, backgroundColor: '#1FC7B2' }}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('YourPay')}
                    style={{ flexDirection: 'row', width: '35%', justifyContent: "center", alignItems: "center" }}   >
                    <Image source={coin} style={{ width: 20, height: 20, tintColor: 'white' }} />
                    <Text style={{ color: 'white', fontSize: 18, marginLeft: 3 }}>Your Pay</Text>
                </TouchableOpacity>

                <View style={{ width: "50%", justifyContent: "center", alignItems: "center" }}>
                    {/* <Text style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>Profile</Text> */}
                </View>

                <TouchableOpacity style={{ width: '15%', justifyContent: "center", alignItems: "center" }} onPress={() => { goToNotification() }} >
                    <Image source={bell} style={{ width: 25, height: 25 }}></Image>
                </TouchableOpacity>
            </View>


            {/* top bar */}

            <ScrollView keyboardShouldPersistTaps="handled" style={{}} >
                <View style={{ backgroundColor: '#F2F2F5', }}>

                    <View style={{ flex: 1, width: "100%", backgroundColor: "#1FC7B2", paddingHorizontal: 10, paddingBottom: 20 }}>
                        <View style={{ flexDirection: 'row', }}>
                            <View style={{ width: "40%", alignItems: "flex-end", paddingRight: 20 }}>
                                <Image source={{ uri: userInfo.picture }}
                                    style={{ width: 110, height: 110, borderRadius: 50, }}
                                />
                            </View>
                            <View style={{ width: "60%", }}>
                                <View style={{ flexDirection: 'row', paddingTop: '2%', justifyContent: 'space-between', }}>
                                    <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 14 }}>{userInfo.first_name} {userInfo.last_name}</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                        <Text style={{ color: 'white' }}>5 </Text>
                                        <Image source={star}
                                            style={{ width: 20, height: 20, paddingRight: '3%' }}
                                        />
                                    </View>
                                </View>
                                <Text style={{ color: 'gray', paddingTop: "3%" }}>{userInfo.phone}</Text>
                                <Text style={{ color: 'gray', }}>{userInfo.email}</Text>
                                {/* <View style={{ width: '80%' }}>
                                    <Text style={{ color: 'white', fontWeight: '700', paddingTop: '3%' }}>
                                        er since the 1500s, when an unknown printer welcome
                                    </Text>
                                </View> */}
                            </View>
                        </View>
                    </View>
                    <View style={{ backgroundColor: '#F2F2F5', }}>

                        {
                            Dummy_Array.map((item, index) => {
                                return (
                                    <TouchableOpacity
                                        onPress={item.onPress}
                                    >
                                        <View style={{
                                            padding: 5, width: '90%', alignSelf: "center", height: 50, marginTop: 15, elevation: 3,
                                            borderRadius: 4, flexDirection: 'row', justifyContent: 'space-between',
                                            backgroundColor: 'white',
                                            shadowColor: "#000",
                                            shadowOffset: {
                                                width: 0,
                                                height: 1,
                                            },
                                            shadowOpacity: 0.20,
                                            shadowRadius: 1.41,

                                            elevation: 2,
                                        }}>
                                            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                                <Image source={briefecase}
                                                    style={{ width: 20, height: 20, paddingTop: '8%', marginHorizontal: '3%' }}
                                                />
                                                <Text>{item.title}</Text>
                                            </View>
                                            <View style={{
                                                alignItems: 'center',
                                                flexDirection: 'row'
                                            }}>
                                                <Text style={{
                                                    paddingHorizontal: 5
                                                }}>{item.value}</Text>
                                                <Image source={add}
                                                    style={{ marginHorizontal: 5, width: 15, height: 15, }}
                                                />
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                );
                            })
                        }
                    </View>
                    <TouchableOpacity onPress={() => setHolidays(true)} style={{
                        width: '90%', marginLeft: '5%', padding: '3%', backgroundColor: 'red', marginTop: '12%', borderRadius: 15
                        , justifyContent: 'center', marginBottom: '4%'
                    }}>
                        <Text style={{ textAlign: 'center', color: 'white' }}>REQUEST HOLIDAYS</Text>
                    </TouchableOpacity>

                    <View style={{ height: 100, }}></View>
                </View>
            </ScrollView >
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#1FC7B2",
        alignContent: 'center',
    },
    ImageView: {
        height: 120,
        width: 120,
        borderRadius: 60,
        backgroundColor: "#FFF",
        alignItems: "center",
        justifyContent: "center"


    },
    backIcon: {
        height: 20,
        width: 20,
    },
    back: {
        height: 50,
        width: 50,
        marginLeft: 15,
        justifyContent: 'center'
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
        color: "black",


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

export default profile;
