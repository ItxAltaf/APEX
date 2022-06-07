
import React, { useState, useEffect, useContext, useRef } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image, ImageBackground,
    StatusBar,
    Alert,
    TextInput,
    Dimensions,
    ActivityIndicator,
    TouchableOpacity,
    ScrollView, BackHandler, SafeAreaView, KeyboardAvoidingView,
    Button
} from "react-native";
import { isIphoneX } from 'react-native-iphone-x-helper';
import paycase from '../Assets/Icons/paycase.png';
import backGroundImage1 from '../Assets/Images/backGround4.png';
import logo from '../Assets/Images/logo.png'
import name from '../Assets/Icons/name.png'
import addresss from '../Assets/Icons/address.png'
import back from '../Assets/Icons/Arrr.png';
import nationalityy from '../Assets/Icons/nationality.png';
import card from '../Assets/Icons/crad.png';
import phone from '../Assets/Icons/phone.png';
import add from '../Assets/Icons/add.png';


import RadioButton from '../Compmonent/RadioButton'

import user from '../Assets/Icons/user.png'
import passwordd from '../Assets/Icons/password.png'
var validator = require("email-validator");
import { domain } from "../Api/Api";

import * as Animatable from 'react-native-animatable';
const screenWidth = Dimensions.get("window").width
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import calenderDate from '../Assets/Icons/calendardate.png'
import { color } from "react-native-reanimated";
import AsyncStorage from '@react-native-community/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';

import { post } from '../utils/api';
import { _alert, _font, _toast } from '../utils/index';

export default function AddExperience({ navigation, route }) {


    const [title, SetTitle] = useState("");
    const [startdate, SetStartDate] = useState("");
    const [lastdate, setEndDate] = useState("");
    const [Degreetitle, setDegreetitle] = useState("");
    const [startdate2, SetStartDate2] = useState("");
    const [lastdate2, setEndDate2] = useState("");

    const [isAnimating, setAnimating] = useState(false);
    const [isDisabled, setDisabled] = useState(false);
    let [referanceYes, setReferanceYes] = useState(false);
    let [referanceNo, setReferanceNo] = useState(false);
    let [SelectedIndex, setSelectedIndex] = useState()

    //////////////////////////////////////////////
    function AddExpe() {
        let temData = {
            "title": '',
            "currently_work": true,
            "start_year": 'Start Date',
            "end_year": 'End Date'
        };
        SetExpeArray([...ExpeArray, temData])
        // console.log('Added:', JSON.stringify(TArray))
        // console.log("*****")
    }

    const [ExpeArray, SetExpeArray] = useState([{
        "title": '',
        "currently_work": referanceYes,
        "start_year": 'Start Date',
        "end_year": 'End Date'
    }]);
    const UpdateExpeValue = (val, type, index) => {
        //console.log(formatFromDate(val), 'TArrayLenght')
        console.log(index, 'index')

        let Carray = [];
        for (let i = 0; i < ExpeArray.length; i++) {
            // console.log('Counter:', i)
            if (i == index) {
                if (type === 'title') {
                    ExpeArray[i].title = val
                } else if (type === 'start_year') {
                    ExpeArray[i].start_year = formatFromDate(val)
                    setIsUpdated(formatFromDate(val))
                } else if (type === 'end_year') {
                    ExpeArray[i].end_year = formatToDate(val)
                    setIsUpdated(formatToDate(val))

                }
            }
        }
        console.log(JSON.stringify(ExpeArray))
        SetExpeArray(ExpeArray)
        // console.log("*****")
    }



    ////////////////////////////////////////////////////////////////
    function AddRow() {
        let temData = {
            "name": '',
            "degree_type": "college",
            "start_year": 'Start Date',
            "end_year": 'End Date'
        };
        SetTArray([...TArray, temData])
        // console.log('Added:', JSON.stringify(TArray))
        // console.log("*****")
    }

    const [TArray, SetTArray] = useState([{
        "name": '',
        "degree_type": "college",
        "start_year": 'Start Date',
        "end_year": 'End Date'
    }]);

    const UpdateValue = (val, type, index) => {
        //console.log(formatFromDate(val), 'TArrayLenght')
        console.log(index, 'index')

        let Carray = [];
        for (let i = 0; i < TArray.length; i++) {
            // console.log('Counter:', i)
            if (i == index) {
                if (type === 'name') {
                    TArray[i].name = val
                } else if (type === 'start_year') {
                    TArray[i].start_year = formatFromDate(val)
                    setIsUpdated(formatFromDate(val))
                } else if (type === 'end_year') {
                    TArray[i].end_year = formatToDate(val)
                    setIsUpdated(formatToDate(val))

                }
            }
        }
        console.log(JSON.stringify(TArray))
        SetTArray(TArray)
        // console.log("*****")
    }

    // let Educations = [
    //     {
    //         "name": Degreetitle,
    //         "degree_type": "college",
    //         "start_year": startdate2,
    //         "end_year": lastdate2
    //     }

    // ]
    //
    const [fromDate, setFromDate] = useState(false);
    const [toDate, setToDate] = useState(false);
    const [date, setDate] = useState(new Date());
    const [dateFrom, setdateFrom] = useState(new Date());
    const [dateTo, setDateTo] = useState(new Date());

    //////////////////
    const [fromDate1, setFromDate1] = useState(false);
    const [toDate1, setToDate1] = useState(false);
    const [dateFrom1, setdateFrom1] = useState(new Date());
    const [dateTo1, setDateTo1] = useState(new Date());

    ///////////////////////
    const [IsUpdated, setIsUpdated] = useState('');

    //<Text>10th</Text></Avatar>
    //<Text>35201-1936650-7</Text>
    //<Text>C.N.I.C No. </Text> 
    //STANDARD
    const onChangeFromDate1 = (event, selectedValue) => {
        const SelectedDate = selectedValue || new Date();
        setFromDate1(Platform.OS === 'ios');

        setdateFrom1(SelectedDate);

        setFromDate1(false)
        setToDate1(false)
        UpdateExpeValue(SelectedDate, 'start_year', SelectedIndex)
    };
    const onChangeToDate1 = (index, selectedValue) => {

        const currentDate = selectedValue || new Date();
        setToDate1(Platform.OS === 'ios');

        setDateTo1(currentDate);

        setToDate1(false)
        setFromDate1(false)
        UpdateExpeValue(currentDate, 'end_year', SelectedIndex)


    };
    const FromDatepicker1 = (index) => {
        //console.log('okay nde ', index)
        setSelectedIndex(index)
        setFromDate1(true)
        setToDate1(false)
    };
    const ToDatepicker1 = (index) => {
        setSelectedIndex(index)

        setToDate1(true)
        setFromDate1(false)
    };
    /////////////////////////////
    const onChangeFromDate = (event, selectedValue) => {
        const SelectedDate = selectedValue || new Date();
        setFromDate(Platform.OS === 'ios');

        setdateFrom(SelectedDate);

        setFromDate(false)
        setToDate(false)
        UpdateValue(SelectedDate, 'start_year', SelectedIndex)
    };
    const onChangeToDate = (index, selectedValue) => {

        const currentDate = selectedValue || new Date();
        setToDate(Platform.OS === 'ios');

        setDateTo(currentDate);

        setToDate(false)
        setFromDate(false)
        UpdateValue(currentDate, 'end_year', SelectedIndex)


    };
    const FromDatepicker = (index) => {
        //console.log('okay nde ', index)
        setSelectedIndex(index)
        setFromDate(true)
        setToDate(false)
    };
    const ToDatepicker = (index) => {
        setSelectedIndex(index)

        setToDate(true)
        setFromDate(false)
    };
    const formatFromDate = (date) => {
        if (date.getMonth() + 1 <= 9 && date.getDate() <= 9) {
            return `${date.getFullYear()}-0${date.getMonth() + 1
                }-0${date.getDate()}`;
        } if (date.getMonth() + 1 <= 9) {
            return `${date.getFullYear()}-0${date.getMonth() + 1
                }-${date.getDate()}`;
        } if (date.getDate() <= 9) {
            return `${date.getFullYear()}-${date.getMonth() + 1
                }-0${date.getDate()}`;
        } else {
            return `${date.getFullYear()}-${date.getMonth() + 1
                }-${date.getDate()}`;
        }

    };
    const formatToDate = (date) => {
        if (date.getMonth() + 1 <= 9 && date.getDate() <= 9) {
            return `${date.getFullYear()}-0${date.getMonth() + 1
                }-0${date.getDate()}`;
        } if (date.getMonth() + 1 <= 9) {
            return `${date.getFullYear()}-0${date.getMonth() + 1
                }-${date.getDate()}`;
        } if (date.getDate() <= 9) {
            return `${date.getFullYear()}-${date.getMonth() + 1
                }-0${date.getDate()}`;
        } else {
            return `${date.getFullYear()}-${date.getMonth() + 1
                }-${date.getDate()}`;
        }
    };

    const SubmitExperience = async () => {

        setAnimating(true)
        var data = {
            token: route.params.UToken == undefined ? route.params : route.params.UToken,
            title: title,
            currently_work: referanceYes,
            start_year: formatFromDate(dateFrom),
            start_year: formatToDate(dateTo)
        }

        console.log(data, "apiData")
        let result = await post(data, 'add-experience');
        //console.log('result1111', result)
        if (result.status) {
            setAnimating(false)
            _toast('okay')
            // navigation.goBack()
        } else {
            setAnimating(false)
            _toast('Something went wrong')
        }
    }
    const SubmitEducations = async () => {

        // let arrayExp = [];
        // arrayExp.push(
        //     {
        //         "title": title,
        //         "currently_work": referanceYes,
        //         "start_year": "2012-5-12",
        //         "end_year": "2015-5-16"
        //     }
        // );


        setAnimating(true)

        var data = {
            "token": route.params.UToken == undefined ? route.params : route.params.UToken,
            "education": TArray,
            "experience": ExpeArray
        }
        var data1 = new FormData();
        // data1.append('data', 770)
        // data1.append('education', JSON.stringify(Daata))
        // data1.append('experience', JSON.stringify(arrayExp))

        // Daata.forEach((item) => {
        //     data1.append('education', item)
        //  })

        data1.append("data", JSON.stringify(data))
        console.log(data, "apiData")
        // let result = await post(data1, 'add-education');
        // console.log('result222', result)
        // if (result.status) {
        //     setAnimating(false)
        //     _toast('okay')
        //     // navigation.goBack()
        // } else {
        //     setAnimating(false)
        //     _toast('Already Exists')
        // }

        try {

            await fetch(domain + 'add-education', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
                body: data1
            })
                .then(response => {
                    console.log('Response111->', response)
                    const statusCode = response.status;
                    const data = response.json();
                    return Promise.all([statusCode, data]);


                })
                .then(async (data) => {
                    console.log('Response->', data)
                    setAnimating(false)
                    if (data[1].success) {

                        // navigation.dispatch({
                        //     ...CommonActions.reset({
                        //         index: 0,
                        //         routes: [{ name: 'signIn' }],
                        //     }),
                        // })
                        navigation.goBack();
                    } else {
                        _toast(data[1].error)
                    }

                })
                .catch(err => {
                    setAnimating(false)
                    _toast(err)
                    console.log('failed', err)
                })

        } catch (error) {
            setAnimating(false)
            console.log(error);
            _toast(error)


        }

    }

    const ValidateValues = async () => {
        if (title.trim() === "") {
            _toast("title is required!");
            return
        }
        // else if (startdate.trim() === "") {
        //     _toast("Start date is required!");
        //     return
        // }
        // else if (lastdate.trim() === "") {
        //     _toast("End date is required!");
        //     return
        // }
        else {
            // SubmitExperience()
            SubmitEducations()
        }
    }

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




    return (
        <SafeAreaView style={styles.container}>

            <StatusBar barStyle="light-content" backgroundColor="#1FC7B2" />
            <View style={{ width: "100%" }}>
                <TouchableOpacity style={styles.back} styles={{ width: "15%" }} onPress={() => navigation.goBack()}>
                    <Image source={back} style={styles.backIcon}></Image>
                </TouchableOpacity>
            </View>
            <KeyboardAwareScrollView
                resetScrollToCoords={{ x: 0, y: 0 }}
                scrollEnabled={true}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <Animatable.View animation="fadeInUp" style={{ height: 280, }} >

                    <ImageBackground source={backGroundImage1} style={{
                        flex: 1,
                        resizeMode: "contain",
                    }}>

                    </ImageBackground>
                </Animatable.View>
                <Animatable.View animation="fadeInUp" style={{ backgroundColor: "white" }} >
                    {/* 
                    <Animatable.Text animation="fadeInUp" style={styles.subheading}>Proceed with your</Animatable.Text>
                    <Animatable.Text animation="fadeInUp" style={styles.heading}>Login</Animatable.Text> */}
                    <Image source={logo} style={styles.logo}></Image>
                    <Animatable.View style={[styles.bottomView, { marginTop: 0, justifyContent: 'space-between', alignSelf: 'baseline', alignSelf: "center", width: '90%' }]} animation="fadeIn" >
                        <Text style={[styles.label, { marginLeft: 0, }]}>Experience</Text>
                        <TouchableOpacity onPress={() => AddExpe()}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end' }}>
                                <Image source={add} style={{ width: 10, height: 10, marginBottom: 3, marginRight: 3 }} />
                                <Text style={[styles.label, { marginLeft: 0, color: 'blue', fontWeight: '500' }]}>Add More Experience</Text>
                            </View>
                        </TouchableOpacity>
                    </Animatable.View>
                    {ExpeArray.length > 0 && (
                        <View>
                            {ExpeArray?.map((item, index) => (
                                <View key={index} style={[{ width: '90%', marginLeft: '5%', backgroundColor: 'white', borderRadius: 10, marginTop: '3%', paddingBottom: '3%' }, styles.shadStyle]}>


                                    <View style={[{ marginTop: '4%', borderRadius: 5, width: '90%', flexDirection: 'row', alignSelf: "center", alignItems: "center", backgroundColor: 'white', elevation: 5, height: 40 }, styles.shadStyle]} >
                                        <Image source={paycase} style={{ height: 15, width: 15, marginLeft: 20, marginRight: 5 }}></Image>

                                        <TextInput
                                            style={[styles.textField, { paddingTop: '1%', paddingBottom: '1%' }]}
                                            placeholder='Job Title'
                                            placeholderTextColor='black'
                                            onChangeText={(val) => UpdateExpeValue(val, 'title', index)}
                                        >
                                        </TextInput>

                                    </View>

                                    <View style={{ marginTop: '4%', width: "95%", flexDirection: "row", backgroundColor: 'white', marginBottom: '5%', }}>
                                        <View style={{ width: "50%" }}>
                                            <TouchableOpacity onPress={() => FromDatepicker1(index)}>
                                                <View style={[{ marginTop: '4%', borderRadius: 10, marginLeft: '10%', flexDirection: 'row', alignItems: "center", height: 40, backgroundColor: 'white', elevation: 5 }, styles.shadStyle]} >
                                                    <Image source={calenderDate} style={{ height: 15, width: 15, marginLeft: 20, marginRight: 5 }}></Image>

                                                    <TextInput
                                                        style={[styles.textField,]}
                                                        placeholder={item.start_year}
                                                        placeholderTextColor='black'
                                                        // onChangeText={(val) => SetStartDate(val)}
                                                        editable={false}
                                                    >
                                                    </TextInput>

                                                </View>
                                            </TouchableOpacity>
                                        </View>

                                        <View style={{ width: "50%" }}>
                                            <TouchableOpacity onPress={() => ToDatepicker1(index)}>
                                                <View style={[{ marginTop: '4%', borderRadius: 10, marginLeft: '10%', flexDirection: 'row', alignItems: "center", height: 40, backgroundColor: 'white', elevation: 5 }, styles.shadStyle]} >
                                                    <Image source={calenderDate} style={{ height: 15, width: 15, marginLeft: 20, marginRight: 5 }}></Image>

                                                    <TextInput
                                                        style={[styles.textField,]}
                                                        placeholder={item.end_year}
                                                        placeholderTextColor='black'
                                                        // onChangeText={(val) => SetStartDate(val)}
                                                        editable={false}
                                                    >
                                                    </TextInput>

                                                </View>
                                            </TouchableOpacity>
                                        </View>

                                    </View>

                                    <Animatable.Text animation="fadeInUp" style={[styles.label, { fontWeight: "normal" }]}>Currently Work here</Animatable.Text>
                                    <Animatable.View animation="fadeInUp" style={{ marginLeft: 30, }}>

                                        <RadioButton
                                            setFirstValue={setReferanceYesValue}
                                            firstValue={referanceYes}
                                            text1={"Yes"}
                                            setSecondValue={setReferanceNoValue}
                                            secondValue={referanceNo}
                                            text2={"No"}
                                        />
                                    </Animatable.View>
                                </View>

                            ))}
                        </View>
                    )}

                    {/* <Animatable.View animation="fadeInUp" style={styles.seperater}></Animatable.View> */}


                    <Text style={[styles.label, { fontSize: 18, marginLeft: '5%' }]}>Educational Information</Text>
                    <View>
                        {TArray.length > 0 && (
                            <View>
                                {TArray?.map((item, index) => (
                                    <View key={index} style={[{ width: '90%', marginLeft: '5%', backgroundColor: 'white', borderRadius: 10, marginTop: '3%' }, styles.shadStyle]}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: '3%', marginVertical: '3%' }}>
                                            <Text style={{ fontSize: 18, fontWeight: '700' }}>College</Text>
                                            <Image source={require('../Assets/Icons/remove.png')} style={{
                                                width: 10, height: 10, alignSelf: 'center'
                                            }} />
                                        </View>

                                        <Animatable.View animation="fadeInUp" style={{ flexDirection: 'row', alignItems: "center" }} >
                                            <Image source={require('../Assets/Icons/degree.png')} style={{ alignSelf: 'center', height: 18, width: 18, marginLeft: 30, marginRight: 10 }}></Image>

                                            <TextInput
                                                style={[styles.textField, { paddingBottom: '1%' }]}
                                                placeholder='Degree Title'
                                                placeholderTextColor='black'
                                                onChangeText={(val) => UpdateValue(val, 'name', index)}
                                            >
                                            </TextInput>

                                        </Animatable.View>
                                        <Animatable.View animation="fadeInUp" style={[styles.seperater, { backgroundColor: 'black' }]}></Animatable.View>

                                        <View style={{ marginTop: '4%', width: "90%", flexDirection: "row", backgroundColor: 'white', marginBottom: '5%', }}>
                                            <View style={{ width: "50%" }}>
                                                <TouchableOpacity onPress={() => FromDatepicker(index)}>
                                                    <Animatable.View animation="fadeInUp" style={{ flexDirection: 'row', alignItems: "center" }} >
                                                        <Image source={calenderDate} style={{ height: 18, width: 18, marginLeft: 30, marginRight: 10 }}></Image>

                                                        <TextInput
                                                            style={styles.textField}
                                                            placeholder={item.start_year}
                                                            placeholderTextColor='black'
                                                            //onChangeText={(val) => SetStartDate2(val)}
                                                            editable={false}
                                                        //value={formatFromDate(dateFrom)}
                                                        >
                                                        </TextInput>

                                                    </Animatable.View>
                                                    <Animatable.View animation="fadeInUp" style={[styles.seperater, { width: "90%", alignSelf: "flex-start", backgroundColor: 'black' }]}></Animatable.View>
                                                </TouchableOpacity>
                                            </View>

                                            <View style={{ width: "50%" }}>
                                                <TouchableOpacity onPress={() => ToDatepicker(index)}>
                                                    <Animatable.View animation="fadeInUp" style={{ flexDirection: 'row', alignItems: "center" }} >
                                                        <Image source={calenderDate} style={{ height: 18, width: 18, marginLeft: 30, marginRight: 10 }}></Image>

                                                        <TextInput
                                                            style={styles.textField}
                                                            placeholder={item.end_year}
                                                            placeholderTextColor='black'
                                                            //onChangeText={(val) => setEndDate2(val)}
                                                            editable={false}
                                                        >

                                                        </TextInput>

                                                    </Animatable.View>
                                                    <Animatable.View animation="fadeInUp" style={[styles.seperater, { width: "90%", alignSelf: "flex-start", backgroundColor: 'black' }]}></Animatable.View>
                                                </TouchableOpacity>
                                            </View>

                                        </View>


                                    </View>

                                ))}
                            </View>
                        )}
                    </View>


                    {/* <View style={[{ width: '90%', marginLeft: '5%', backgroundColor: 'white', borderRadius: 10, marginTop: '3%' }, styles.shadStyle]}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: '3%', marginVertical: '3%' }}>
                            <Text style={{ fontSize: 18, fontWeight: '700' }}>University</Text>
                            <Image source={require('../Assets/Icons/remove.png')} style={{
                                width: 10, height: 10, alignSelf: 'center'
                            }} />
                        </View>

                        <Animatable.View animation="fadeInUp" style={{ flexDirection: 'row', alignItems: "center" }} >
                            <Image source={require('../Assets/Icons/degree.png')} style={{ alignSelf: 'center', height: 18, width: 18, marginLeft: 30, marginRight: 10 }}></Image>

                            <TextInput
                                style={[styles.textField, { paddingBottom: '1%' }]}
                                placeholder='Degree Title'
                                placeholderTextColor='black'
                                onChangeText={(val) => setNationality(val)}
                            >
                            </TextInput>

                        </Animatable.View>
                        <Animatable.View animation="fadeInUp" style={[styles.seperater, { backgroundColor: 'black' }]}></Animatable.View>

                        <View style={{ marginTop: '4%', width: "90%", flexDirection: "row", backgroundColor: 'white', marginBottom: '5%', }}>
                            <View style={{ width: "50%" }}>
                                <Animatable.View animation="fadeInUp" style={{ flexDirection: 'row', alignItems: "center" }} >
                                    <Image source={calenderDate} style={{ height: 18, width: 18, marginLeft: 30, marginRight: 10 }}></Image>

                                    <TextInput
                                        style={styles.textField}
                                        placeholder='Start Date'
                                        placeholderTextColor='black'
                                    >
                                    </TextInput>

                                </Animatable.View>
                                <Animatable.View animation="fadeInUp" style={[styles.seperater, { width: "90%", alignSelf: "flex-start", backgroundColor: 'black' }]}></Animatable.View>

                            </View>
                            <View style={{ width: "50%" }}>
                                <Animatable.View animation="fadeInUp" style={{ flexDirection: 'row', alignItems: "center" }} >
                                    <Image source={calenderDate} style={{ height: 18, width: 18, marginLeft: 30, marginRight: 10 }}></Image>

                                    <TextInput
                                        style={styles.textField}
                                        placeholder='End Date'
                                        placeholderTextColor='black'>
                                    </TextInput>

                                </Animatable.View>
                                <Animatable.View animation="fadeInUp" style={[styles.seperater, { width: "90%", alignSelf: "flex-start", backgroundColor: 'black' }]}></Animatable.View>

                            </View>
                        </View>


                    </View>
 */}
                    {fromDate && (
                        <DateTimePicker
                            timeZoneOffsetInMinutes={0}
                            value={dateFrom}
                            mode="date"
                            display="SPINNER"
                            onChange={onChangeFromDate}
                        />
                    )}
                    {toDate && (
                        <DateTimePicker
                            timeZoneOffsetInMinutes={0}
                            value={dateTo}
                            mode="date"
                            display="SPINNER"
                            onChange={onChangeToDate}
                        />
                    )}
                    {fromDate1 && (
                        <DateTimePicker
                            timeZoneOffsetInMinutes={0}
                            value={dateFrom1}
                            mode="date"
                            display="SPINNER"
                            onChange={onChangeFromDate1}
                        />
                    )}
                    {toDate1 && (
                        <DateTimePicker
                            timeZoneOffsetInMinutes={0}
                            value={dateTo1}
                            mode="date"
                            display="SPINNER"
                            onChange={onChangeToDate1}
                        />
                    )}
                    <TouchableOpacity onPress={() => AddRow()}>
                        <View style={[{ marginTop: '6%', borderRadius: 10, width: '90%', marginLeft: '5%', flexDirection: 'row', justifyContent: "space-between", alignItems: "center", backgroundColor: 'white', elevation: 5, height: 40 }, styles.shadStyle]} >

                            <View style={{ flexDirection: 'row', }}>
                                <Image source={paycase} style={{ alignSelf: 'center', height: 15, width: 15, marginLeft: 15, marginRight: 10, }}></Image>

                                <Text>Add college</Text>
                            </View>
                            <Image style={{ width: 10, height: 10, marginRight: 20 }} source={require('../Assets/Icons/plus.png')} />

                        </View>
                    </TouchableOpacity>
                    {/* <View style={[{ marginTop: '4%', borderRadius: 10, width: '90%', marginLeft: '5%', flexDirection: 'row', justifyContent: "space-between", alignItems: "center", backgroundColor: 'white', elevation: 5, height: 40 }, styles.shadStyle]} >
                        <View style={{ flexDirection: 'row', }}>
                            <Image source={paycase} style={{ alignSelf: 'center', height: 15, width: 15, marginLeft: 15, marginRight: 10, }}></Image>

                            <TextInput
                                style={[styles.textField, { paddingTop: '1%', paddingBottom: '1%' }]}
                                placeholder='Add Collage'
                                placeholderTextColor='black'
                                onChangeText={(val) => setPhoneNumber(val)}
                            >
                            </TextInput>
                        </View>
                        <Image style={{ width: 10, height: 10, marginRight: 20 }} source={require('../Assets/Icons/plus.png')} />
                    </View> */}


                    <Animatable.View animation="fadeInUp" >


                        <TouchableOpacity style={styles.button} onPress={() => SubmitEducations()} >
                            <Text style={styles.buttonText}>CONFIRM</Text>
                        </TouchableOpacity>
                    </Animatable.View>


                    <View style={{ height: 100 }}></View>
                </Animatable.View>

            </KeyboardAwareScrollView>


            {
                isAnimating &&
                <ActivityIndicator size="large" color="#1FC7B2" animating={isAnimating} style={styles.loading} />
            }
        </SafeAreaView >
    )
}


const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 35 : 0;
const STATUSBAR_COLOR = Platform.OS === 'ios' ? 'white' : '#1FC7B2';
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 0 : 56;
const styles = StyleSheet.create({
    statusBar: {
        height: STATUSBAR_HEIGHT,
        backgroundColor: STATUSBAR_COLOR
    },
    container: {
        flex: 1,
        backgroundColor: "#1FC7B2",
        marginBottom: isIphoneX() ? -35 : 0,
        paddingBottom: isIphoneX() ? 35 : 0,
        marginTop: isIphoneX() ? -5 : 0,
    },
    background: {
        flex: 1,
        resizeMode: "cover",
    },
    back: {

        height: 50,
        width: 50,
        marginLeft: 15,
        justifyContent: 'center'
    },
    backIcon: {
        height: 30,
        width: 30,
    },
    logo: {
        resizeMode: "contain",
        height: 90,
        width: 120,

        alignSelf: "center"
    },
    heading: {
        marginLeft: 30,
        marginTop: 5,
        fontSize: 23,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    subheading: {
        marginLeft: 30,
        marginTop: 10,
        fontSize: 20,
        fontWeight: '300',
        marginBottom: 0,
    },
    label: {
        marginLeft: 30,
        marginTop: 15,
        fontWeight: '300',
        fontSize: 14,
        fontWeight: 'bold'
    },
    textField: {

        marginRight: 30,
        width: '70%',
        marginTop: 6,
        marginBottom: 3,
        paddingTop: '3%',
        paddingBottom: '3%',
        color:"black",

    },
    seperater: {
        height: 0.5,
        marginLeft: 30,
        marginRight: 30,
        backgroundColor: '#d5c9de'

    },
    ForgotPassword: {
        alignSelf: 'center',
        marginTop: 15,
        color: '#acacac',
        fontSize: 15
    },
    button: {
        backgroundColor: "#1FC7B2", marginTop: 10,
        marginTop: 30,
        alignSelf: 'center',
        height: 50,
        borderRadius: 10,

        width: screenWidth - 60,
        justifyContent: 'center',
        alignItems: 'center',
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
        fontSize: 17,
    },
    bottomView: {
        justifyContent: 'center',
        alignSelf: 'center',
        flexDirection: 'row',
    },
    newUser: {
        fontSize: 15,
        color: '#010a0a',
    },
    register: {
        color: '#1FC7B2',
        fontSize: 15,
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
    shadStyle: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 8,

        elevation: 5,
    },

});