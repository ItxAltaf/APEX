// ./screens/Home.js

import React, { useState, useEffect, useContext, useRef } from "react";
import down from '../Assets/Icons/down.png';
import { View, StyleSheet, Text, Dimensions, ActivityIndicator, StatusBar, TextInput, TouchableWithoutFeedback, TouchableOpacity, Image, ScrollView, SafeAreaView, FlatList, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import bell from '../Assets/Icons/bell_icon.png'
import bag from '../Assets/Icons/bag.png'
import briefecase from '../Assets/Icons/briefcase1.png'
import next from '../Assets/Icons/next.png'
import visa from '../Assets/Icons/visa.png'
import delet from '../Assets/Icons/Delete.png'
import edit2 from '../Assets/Icons/edit2.png'


import AsyncStorage from '@react-native-community/async-storage';

import { get, post, dalete } from '../utils/api';
import { _alert, _font, _toast } from '../utils/index';

import CalendarPicker from 'react-native-calendar-picker';


import address from '../Assets/Icons/location.png'

import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

const screenWidth = Dimensions.get("window").width - 30;
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";

const chartConfig = {
    // backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#1FC7B2",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
};
function donates({ navigation }) {

    const [isAnimating, setAnimating] = useState(false);
    const [isDisabled, setDisabled] = useState(false);
    const [state, setState] = useState({

        Calender: true,
        Location: false,
        Earnings: false,
        Skills: false,
        Experience: false,


        BGCalender: 'white',
        BGLocation: "#1FC7B2",
        BGEarnings: "#1FC7B2",
        BGSkills: "#1FC7B2",
        BGExperience: "#1FC7B2",


        textLocation: "white",
        textCalender: "#1FC7B2",
        textEarnings: "white",
        textSkills: "white",
        textExperience: "white",



        textWeightEarnings: "500",
        textWeightCalender: "600",
        textWeightLocation: "500",
        textWeightSkills: "500",
        textWeightExperience: "500",

    });
    const [LocationList, setLocationList] = useState([]);
    const [SkilLList, setSkilList] = useState([]);
    const [experianceList, setExperiance] = useState([]);
    const [CalenderData, setCalenderData] = useState([]);
    const [EarnData, setEarnData] = useState([]);

    const [WithdrawHistory, setWithdrawHistory] = useState([]);
    const [WorkHistory, setWorkHistory] = useState([]);
    const [PendingBal, setPendingBal] = useState([]);
    const [TotalWithDraw, setTotalWithDraw] = useState([]);
    const [Balnce, setBalnce] = useState([]);
    const [UToken, setUToken] = useState();
    const [JobId, setJobId] = useState();
    /////////////////////////////////////////////////
    const [selectedStartDate, SetselectedStartDate] = useState(new Date());

    const onMonthChange = date => {

        setAnimating(true);
        var today = new Date(date);

        SetselectedStartDate(today);


        // PickDate(today.getFullYear(), today.getMonth() + 1, today.getDate(), today.toISOString(), date)
        setAnimating(false)
        // PickDate(formatToDate(dateObj))
    }

    const customDatesStylesCallback = date => {
        // let datetext = '2021-02-01'
        // var aar = datetext.split("-")
        // console.log(aar[0])
        setAnimating(true);
        var dd = new Date(date)
        var tDay = dd.getDate();
        var tMonth = dd.getMonth() + 1;
        var tYear = dd.getFullYear();

        if (CalenderData && CalenderData != undefined) {
            var t = CalenderData.filter(function (obj) {
                var aar = obj.date.split("-")
                // console.log(aar[1], 'hehe', tMonth)

                return aar[2] == tDay && aar[1] == tMonth && tYear == aar[0];

            })[0];
            // console.log("t is true : " + t);

            if (t) {
                //console.log("t is true : " + t);

                return {
                    style: {
                        backgroundColor: '#1FC7B2',
                    },
                    textStyle: {
                        color: 'white',
                        fontWeight: 'bold',
                    }
                };
            }
        }
        setAnimating(false);
    }
    useEffect(() => {
        setAnimating(true);
        var today = new Date();
        SetselectedStartDate(today)
        //  PickDate(today.getFullYear(), today.getMonth() + 1, today.getDate(), today.toISOString())
    }, [])
    const onDateChange = async (date, type) => {
        console.log('END_DATE', date)

        var data = {
            token: UToken,
            date: formatDate(date),
            type: "calender_add"
        }
        console.log(data, "apiData")
        let result = await post(data, 'calender_add');
        console.log('result1111', result)
        if (result.status) {
            // setAnimating(false)
            _toast('Date Added')
        }
    }
    const formatDate = (date1) => {
        var date = new Date(date1)
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
    //const [BalnceGraph, setBalnceGraph] = useState();


    // const [BalnceGraph, setBalnceGraph] = useState('');

    const [BalnceGraph, setBalnceGraph] = useState({
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
            {
                data: [20, 45, 28, 80, 99, 43],
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // optional withdraw_history Balnce.filter((i)=>i.Balnce)
                strokeWidth: 2 // optional
            }
        ],
        legend: ["Total earning £123"] // optional
    });

    const [Work_History_Array, setWork_History_Array] = useState([
        {
            title: 'Notifications Title', date: "22 Oct 2020", amount: "250$"
        },
        {
            title: 'Notifications Title', date: "22 Oct 2020", amount: "250$"
        },
        {
            title: 'Notifications Title', date: "22 Oct 2020", amount: "250$"
        }
    ]);
    useEffect(() => {
        // console.log("Job Detail", route.params)
        //setJobId(route.params.id)
        mainApi()
    }, [])
    mainApi = async () => {

        //const getToken = await AsyncStorage.getItem('token');${usertoken}
        let usertoken = JSON.parse(await AsyncStorage.getItem('login_token'));
        setUToken(usertoken)
        let result = await get(`workpreference?token=${usertoken}&type=calender`);
        console.log('result3330', result.data)
        if (result.success) {
            setCalenderData(result.data.calender)
            setAnimating(false)
        } else {
            setAnimating(false)
            _toast('something went wrong');
        }
    }
    const DeleteExpe = async (Id) => {

        setAnimating(true)
        var data = {
            token: UToken,
            id: Id,
            action: 'delete'
        }

        console.log(data, "apiData")
        let result = await dalete(data, 'remove-experience');
        console.log('result1111', result)
        if (result.status) {
            setAnimating(false)
            _toast('Deleted')

            let result = await get(`workpreference?token=${UToken}&type=experience`);
            console.log('result3330', result.data)
            if (result.success) {
                setExperiance(result.data.guard_experience)
                setAnimating(false)
            } else {
                setAnimating(false)
                _toast('something went wrong');
            }
        } else {
            setAnimating(false)
            if (result.message != 'something went wrong') {
                _toast(result.message);
            }
        }
    }
    const DeleteSkill = async (Id) => {

        setAnimating(true)
        var data = {
            token: UToken,
            id: Id,
            action: 'remove',
            type: 'skills'

        }

        console.log(data, "apiData")
        let result = await dalete(data, 'remove_skill');
        console.log('result1111', result)
        if (result.status) {
            setAnimating(false)
            _toast('Deleted')

            let result = await get(`workpreference?token=${UToken}&type=skills`);
            console.log('result3330', result.data)
            if (result.success) {
                setSkilList(result.data.skills)
                setAnimating(false)
            } else {
                setAnimating(false)
                _toast('something went wrong');
            }
        } else {
            setAnimating(false)
            if (result.message != 'something went wrong') {
                _toast(result.message);
            }
        }
    }
    const DeleteLocation = async (Id) => {

        setAnimating(true)
        var data = {
            token: UToken,
            id: Id,
            action: 'remove',
            type: 'location'

        }
        console.log(data, "apiData")
        let result = await dalete(data, 'remove_location');
        console.log('result1111', result)
        if (result.status) {
            setAnimating(false)
            _toast('Deleted')
            let usertoken = JSON.parse(await AsyncStorage.getItem('login_token'));
            console.log(usertoken)
            let result = await get(`workpreference?token=${UToken}&type=location`);
            console.log('result3330', result.data)
            if (result.success) {
                setLocationList(result.data.location)
                setAnimating(false)
            } else {
                setAnimating(false)
                _toast('something went wrong');
            }

        }
    }
    const changeFirstTab = async () => {
        setState({
            Location: false, Calender: true, Earnings: false, Skills: false, Experience: false,
            BGLocation: "#1FC7B2", BGEarnings: '#1FC7B2', BGCalender: 'white', BGSkills: "#1FC7B2", BGExperience: "#1FC7B2",
            textLocation: "white", textCalender: "#1FC7B2", textEarnings: "white", textSkills: "white", textExperience: "white",
            textWeightEarnings: "500", textWeightCalender: "600", textWeightLocation: "500", textWeightSkills: "500", textWeightExperience: "500"
        });
        setAnimating(true)
        //const getToken = await AsyncStorage.getItem('token');${usertoken}
        let usertoken = JSON.parse(await AsyncStorage.getItem('login_token'));
        console.log(usertoken)
        let result = await get(`workpreference?token=${UToken}&type=calender`);
        console.log('result3330', result.data)
        if (result.success) {
            setCalenderData(result.data.calender)
            setAnimating(false)
        } else {
            setAnimating(false)
            _toast('something went wrong');
        }


    }
    const goToNotification = () => {
        navigation.navigate('Notification')
    }
    const changeSeconTab = async () => {

        setState({
            Location: true, Calender: false, Earnings: false, Skills: false, Experience: false,
            BGLocation: 'white', BGCalender: "#1FC7B2", BGEarnings: "#1FC7B2", BGSkills: "#1FC7B2", BGExperience: "#1FC7B2",
            textLocation: "#1FC7B2", textCalender: "white", textEarnings: "white", textSkills: "white", textExperience: "white",
            textWeightEarnings: "500", textWeightCalender: "500", textWeightLocation: "600", textWeightLocation: "500", textWeightSkills: "500", textWeightExperience: "500"


        });
        console.log(state.Location)
        setAnimating(true)
        //const getToken = await AsyncStorage.getItem('token');${usertoken}
        let usertoken = JSON.parse(await AsyncStorage.getItem('login_token'));
        console.log(usertoken)
        let result = await get(`workpreference?token=${UToken}&type=location`);
        console.log('result3330', result.data)
        if (result.success) {
            setLocationList(result.data.location)
            setAnimating(false)
        } else {
            setAnimating(false)
            _toast('something went wrong');
        }

    }

    const changeThirdTab = async () => {
        setState({
            Location: false, Calender: false, Earnings: true, Skills: false, Experience: false,
            BGLocation: "#1FC7B2", BGEarnings: 'white', BGCalender: "#1FC7B2", BGSkills: "#1FC7B2", BGExperience: "#1FC7B2",
            textLocation: "white", textCalender: "white", textEarnings: "#1FC7B2", textSkills: "white", textExperience: "white",
            textWeightEarnings: "600", textWeightCalender: "500", textWeightLocation: "500", textWeightLocation: "500", textWeightSkills: "500", textWeightExperience: "500"
        });
        setAnimating(true)
        //const getToken = await AsyncStorage.getItem('token');${usertoken}
        // let usertoken = JSON.parse(await AsyncStorage.getItem('login_token'));
        // console.log(usertoken)
        let result = await get(`earn?token=${UToken}`);
        console.log('result3330', result.data)
        if (result.success) {
            setWorkHistory(result.data.work_history)
            setWithdrawHistory(result.data.withdraw_history)
            setPendingBal(result.data.pending_balance[0])
            setTotalWithDraw(result.data.total_witdraw[0])
            setBalnce(result.data.balance)
            // setBalnceGraph( result.data.balance.map((i)=>JSON.parse(i.balance)))
            let sum = result.data.balance.reduce((accumulator, current) => accumulator + current.balance, 0)
            setBalnceGraph({
                labels: ["January", "February", "March", "April", "May", "June"],
                datasets: [
                    {
                        data: result.data.balance.map((i) => JSON.parse(i.balance)),
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // optional withdraw_history Balnce.filter((i)=>i.Balnce)
                        strokeWidth: 2 // optional
                    }
                ],
                legend: [`Total earning ${sum}$`] // optional
            })
            //console.log('sum',result.data.balance.reduce((accumulator, current) => accumulator + current.balance, 0))
            setAnimating(false)
        } else {
            setAnimating(false)
            _toast('something went wrong');
        }
    }

    const changeforthTab = async () => {
        setState({
            Location: false, Calender: false, Earnings: false, Skills: true, Experience: false,
            BGLocation: "#1FC7B2", BGEarnings: '#1FC7B2', BGCalender: "#1FC7B2", BGSkills: 'white', BGExperience: "#1FC7B2",
            textLocation: "white", textCalender: "white", textEarnings: "white", textSkills: "#1FC7B2", textExperience: "white",
            textWeightEarnings: "500", textWeightCalender: "500", textWeightLocation: "500", textWeightLocation: "500", textWeightSkills: "600", textWeightExperience: "500"
        });
        setAnimating(true)
        //const getToken = await AsyncStorage.getItem('token');${usertoken}
        let usertoken = JSON.parse(await AsyncStorage.getItem('login_token'));
        console.log(usertoken)
        let result = await get(`workpreference?token=${UToken}&type=skills`);
        console.log('result3330', result.data)
        if (result.success) {
            setSkilList(result.data.skills)
            setAnimating(false)
        } else {
            setAnimating(false)
            _toast('something went wrong');
        }
    }


    const changeFifthTab = async () => {
        setState({
            Location: false, Calender: false, Earnings: false, Skills: false, Experience: true,
            BGLocation: "#1FC7B2", BGEarnings: '#1FC7B2', BGCalender: "#1FC7B2", BGSkills: '#1FC7B2', BGExperience: 'white',
            textLocation: "white", textCalender: "white", textEarnings: "white", textSkills: "white", textExperience: "#1FC7B2",
            textWeightEarnings: "500", textWeightCalender: "500", textWeightLocation: "500", textWeightLocation: "500", textWeightSkills: "500", textWeightExperience: "600"
        });
        setAnimating(true)
        //const getToken = await AsyncStorage.getItem('token');${usertoken}
        let usertoken = JSON.parse(await AsyncStorage.getItem('login_token'));
        console.log(usertoken)
        let result = await get(`workpreference?token=${UToken}&type=experience`);
        console.log('result3330', result.data)
        if (result.success) {
            setExperiance(result.data.guard_experience)
            setAnimating(false)
        } else {
            setAnimating(false)
            _toast('something went wrong');
        }
    }

    return (
        <SafeAreaView style={[styles.container]}>
            <StatusBar barStyle="light-content" backgroundColor="#1FC7B2" />

            {/* top bar */}
            {/* top bar */}
            <View style={{ width: "100%", flexDirection: "row", height: 60, backgroundColor: '#1FC7B2', justifyContent: "space-between" }}>
                {/* <TouchableOpacity style={{ width: '15%', justifyContent: "center", alignItems: "center" }}   >

                </TouchableOpacity> */}
                <View style={{ width: "70%", justifyContent: "center", marginLeft: 20 }}>
                    <Text style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>Work Preference</Text>
                </View>
                <TouchableOpacity style={{ width: '15%', justifyContent: "center", alignItems: "center" }} onPress={() => { goToNotification() }} >
                    <Image source={bell} style={{ width: 25, height: 25 }}></Image>
                </TouchableOpacity>
            </View>
            {/* top bar */}

            <View style={{ justifyContent: "center", flexDirection: "row", width: "98%", alignSelf: "center", height: 37, alignItems: "center", borderRadius: 20, backgroundColor: '#1FC7B2', paddingBottom: 10, marginTop: 10 }}>

                <TouchableOpacity style={styles.tab} onPress={() => { changeFirstTab() }}>

                    <View style={{ height: 33, backgroundColor: state.BGCalender, borderRadius: 20, alignItems: "center", justifyContent: "center" }}>
                        <Text style={{ fontSize: 12, color: state.textCalender, fontWeight: state.textWeightCalender }}>Calender</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tab} onPress={() => { changeSeconTab() }}>
                    <View style={{ height: 33, backgroundColor: state.BGLocation, borderRadius: 20, alignItems: "center", justifyContent: "center" }}>
                        <Text style={{ fontSize: 12, color: state.textLocation, fontWeight: state.textWeightLocation }}>Location</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tab} onPress={() => { changeThirdTab() }}>

                    <View style={{ height: 33, backgroundColor: state.BGEarnings, borderRadius: 20, alignItems: "center", justifyContent: "center" }}>
                        <Text style={{ fontSize: 12, color: state.textEarnings, fontWeight: state.textWeightEarnings }}>Earnings</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tab} onPress={() => { changeforthTab() }}>

                    <View style={{ height: 33, backgroundColor: state.BGSkills, borderRadius: 20, alignItems: "center", justifyContent: "center" }}>
                        <Text style={{ fontSize: 12, color: state.textSkills, fontWeight: state.textWeightSkills }}>Skills</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tab} onPress={() => { changeFifthTab() }}>

                    <View style={{ height: 33, backgroundColor: state.BGExperience, borderRadius: 20, alignItems: "center", justifyContent: "center" }}>
                        <Text style={{ fontSize: 12, color: state.textExperience, fontWeight: state.textWeightExperience }}>Experience</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={{ backgroundColor: '#F2F2F5', width: "100%", height: "90%", paddingTop: '3%' }}>

                {state.Calender == true &&
                    <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}  >

                        <View style={{ width: "100%", }}>

                            {/* <Calendar
                                style={{
                                    height: 400
                                }}
                                theme={{
                                    backgroundColor: '#ffffff',
                                    calendarBackground: '#ffffff',


                                    todayTextColor: '#197B81',
                                    selectedDayBackgroundColor: 'red',
                                    arrowColor: '#197B81',
                                    monthTextColor: '#197B81',
                                    indicatorColor: '#197B81',
                                    textDayFontWeight: '300',
                                    textMonthFontWeight: '500',
                                    textDayHeaderFontWeight: '300',
                                    textDayFontSize: 16,
                                    textMonthFontSize: 16,
                                    textDayHeaderFontSize: 16
                                }}
                                current={Date()}
                                minDate={Date()}
                                selected={'2021-07-20'}
                                monthFormat={'MMMM yyyy'}
                                hideArrows={false}
                                disableMonthChange={false}
                                firstDay={1}
                                hideExtraDays={true}
                                hideDayNames={false}
                                showWeekNumbers={false}
                                disableAllTouchEventsForDisabledDays={true}
                                enableSwipeMonths={true}
                                // markingType={'custom'}
                                // markedDates={{
                                //     '2021-07-16': { selected: true, marked: true, selectedColor: 'blue' },
                                //     // '2012-05-17': {marked: true},
                                //     // '2012-05-18': {marked: true, dotColor: 'red', activeOpacity: 0},
                                //     // '2012-05-19': {disabled: true, disableTouchEvent: true}
                                // }}
                                onDayPress={(day) => { console.log('selected day', day.dateString) }}
                                onClick

                            /> */}
                            <CalendarPicker
                                customDatesStyles={customDatesStylesCallback}
                                enableDateChange={true}
                                // onMonthChange={onMonthChange}
                                selectedStartDate={selectedStartDate}
                                showDayStragglers={true}
                                selectedDayColor="visible"
                                selectedDayTextColor="#1FC7B2"
                                selectedDayTextStyle={{backgroundColor:'transparent'}}
                                onDateChange={onDateChange}
                            // previousComponent
                            // previousComponent={<Icon name='chevron-left'></Icon>}
                            // nextComponent={<Icon name='chevron-right'></Icon>}

                            />
                            <TouchableOpacity style={[styles.button, { marginVertical: 20 }]}  >
                                <Text style={[styles.buttonText,]}>Confirm</Text>
                            </TouchableOpacity>


                        </View>
                    </ScrollView>
                }
                {state.Location == true &&
                    <View style={{ flex: 1, width: "100%", }}>
                        <View style={{ width: "90%", alignSelf: "center", flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, marginTop: 20 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 16, }}>Location  </Text>
                            <TouchableOpacity >
                                <View>
                                    <Text style={{ fontSize: 16, color: '#1FC7B2' }} onPress={() => navigation.navigate('AddLocation', { UToken: UToken })}>Add Location </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            data={LocationList}
                            keyExtractor={(item, index) => index.toString()}     //has to be unique
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity>
                                    <View style={[{
                                        width: '90%', alignSelf: "center", height: 50, marginTop: 15,
                                        borderRadius: 10, flexDirection: 'row',
                                        backgroundColor: 'white',
                                    }, styles.shadStyle]}>
                                        <View style={{ height: 50, borderTopLeftRadius: 10, borderBottomLeftRadius: 10, backgroundColor: "#1FC7B2", width: 7 }}></View>
                                        <View style={{ flex: 1 }}>
                                            <View style={{ alignItems: 'center', flexDirection: 'row', marginTop: '5%' }}>
                                                <Image source={address}
                                                    style={{ width: 25, height: 25, marginHorizontal: 5 }}
                                                />
                                                <Text style={{ fontSize: 13, color: "black" }}>{item.location_name}</Text>
                                            </View>
                                        </View>
                                        <View style={{ flex: 0.3, margin: 10 }}>
                                            <TouchableOpacity style={{ paddingLeft: 30 }} onPress={() => DeleteLocation(item.location_id)}>
                                                <Image source={delet} style={{ width: 25, height: 25, }}></Image>
                                            </TouchableOpacity>
                                        </View>

                                    </View>
                                    {index == LocationList.length - 1 &&
                                        < View style={{ height: 200 }}>


                                        </View>
                                    }
                                </TouchableOpacity>


                            )}
                        />

                    </View>
                }
                {state.Earnings == true &&
                    <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}  >
                        <View>
                            <View style={{ flex: 1, width: "95%", alignSelf: "center", marginTop: 20, justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>

                                <View style={[{ width: "30%", paddingVertical: 10, backgroundColor: '#52C7A7', borderRadius: 10, justifyContent: "center", justifyContent: "center", paddingHorizontal: 10 }, styles.shadStyle]}>
                                    <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                        <Image source={bag}
                                            style={{ width: 20, height: 20, }}
                                        />
                                        <Text style={{ fontSize: 16, color: "white", marginLeft: 5 }}>Today</Text>
                                    </View>
                                    <Text style={{ fontSize: 16, color: "white", marginTop: 10 }}>£250.00</Text>

                                </View>
                                <View style={[{ width: "30%", paddingVertical: 10, backgroundColor: '#F2716E', borderRadius: 10, justifyContent: "center", justifyContent: "center", paddingHorizontal: 10 }, styles.shadStyle]}>
                                    <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                        <Image source={bag}
                                            style={{ width: 20, height: 20, }}
                                        />
                                        <Text style={{ fontSize: 16, color: "white", marginLeft: 5 }}>Total</Text>
                                    </View>
                                    <Text style={{ fontSize: 16, color: "white", marginTop: 10 }}>£{TotalWithDraw.total_witdraw}</Text>

                                </View>
                                <View style={[{ width: "30%", paddingVertical: 10, backgroundColor: '#6C7AD2', borderRadius: 10, justifyContent: "center", paddingHorizontal: 10 }, styles.shadStyle]}>
                                    <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                        <Image source={bag}
                                            style={{ width: 20, height: 20, }}
                                        />
                                        <Text style={{ fontSize: 16, color: "white", marginLeft: 5 }}>Pending</Text>
                                    </View>
                                    <Text style={{ fontSize: 16, color: "white", marginTop: 10 }}>£{PendingBal.pending_balance == null ? 0 : PendingBal.pending_balance}</Text>

                                </View>




                            </View>

                            <Text style={{ fontWeight: 'bold', fontSize: 16, marginVertical: 10, marginTop: 20, marginHorizontal: 20 }}>Summery  </Text>
                            <View style={[{ width: "95%", paddingVertical: 10, borderRadius: 10, justifyContent: "center", justifyContent: "center", alignSelf: "center", paddingHorizontal: 10 }]}>
                                <LineChart
                                    data={BalnceGraph}
                                    width={screenWidth}
                                    height={256}
                                    verticalLabelRotation={30}
                                    chartConfig={chartConfig}
                                    bezier
                                />
                            </View>

                            <Text style={{ fontWeight: 'bold', fontSize: 16, marginVertical: 10, marginTop: 20, marginHorizontal: 20 }}>My Card  </Text>
                            <TouchableOpacity>
                                <View style={[{
                                    padding: 5, width: '90%', alignSelf: "center", height: 50, marginTop: 5,
                                    borderRadius: 10, flexDirection: 'row', justifyContent: 'space-between',
                                    backgroundColor: 'white',

                                }, styles.shadStyle]}>
                                    <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                        <Image source={visa}
                                            style={{ width: 20, height: 20, paddingTop: '8%', marginHorizontal: '3%', marginHorizontal: 10 }}
                                        />
                                        <Text style={{ fontSize: 16, color: "black", }}>£250.00</Text>
                                    </View>

                                    <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                        <Image source={next}
                                            style={{ marginHorizontal: 5, width: 15, height: 15, }}
                                        />
                                    </View>
                                </View>
                            </TouchableOpacity>

                            <Text style={{ fontWeight: 'bold', fontSize: 16, marginVertical: 10, marginTop: 20, marginHorizontal: 20 }}>Work History</Text>

                            <View style={{ width: "90%", alignSelf: "center" }}>
                                {
                                    WorkHistory.map((item, index) => {
                                        return (
                                            <TouchableOpacity key={index}>
                                                <View style={{ marginBottom: "2%", flexDirection: 'row', alignItems: "center", justifyContent: "space-between" }}>
                                                    <View style={{ flexDirection: 'row', marginVertical: "2%", alignItems: "center" }}>
                                                        <Image style={{ width: 30, height: 30, marginRight: 10 }}
                                                            source={briefecase} />
                                                        <View>
                                                            <Text style={{ marginHorizontal: '3%', }}>{item.title}</Text>
                                                            <Text style={{ marginHorizontal: '3%', }}>{item.date_to}</Text>

                                                        </View>
                                                    </View>
                                                    <Text style={{ marginHorizontal: '3%', color: "#EBB32E", fontSize: 15, fontWeight: "bold" }}>£{item.budget}</Text>

                                                </View>
                                            </TouchableOpacity>
                                        );
                                    })
                                }
                            </View>

                            <Text style={{ fontWeight: 'bold', fontSize: 16, marginVertical: 10, marginTop: 20, marginHorizontal: 20 }}>Withdraw History</Text>

                            <View style={{ width: "90%", alignSelf: "center" }}>
                                {
                                    WithdrawHistory.map((item, index) => {
                                        return (
                                            <TouchableOpacity key={index}>
                                                <View style={{ marginBottom: "2%", flexDirection: 'row', alignItems: "center", justifyContent: "space-between" }}>
                                                    <View style={{ flexDirection: 'row', marginVertical: "2%", alignItems: "center" }}>
                                                        <Image style={{ width: 30, height: 30, marginRight: 10 }}
                                                            source={briefecase} />
                                                        <View>
                                                            <Text style={{ marginHorizontal: '3%', }}>£{item.amount}</Text>
                                                            <Text style={{ marginHorizontal: '3%', }}>{item.date}</Text>

                                                        </View>
                                                    </View>
                                                    <Text style={{ marginHorizontal: '3%', color: "#EBB32E", fontSize: 15, fontWeight: "bold" }}>{item.status}</Text>

                                                </View>
                                            </TouchableOpacity>
                                        );
                                    })
                                }
                            </View>
                            < View style={{ height: 200 }}>


                            </View>

                        </View>
                    </ScrollView>
                }
                {state.Skills == true &&
                    <View style={{ flex: 1, width: "100%", }}>
                        <View style={{ flex: 1, width: "100%", }}>
                            <View style={{ width: "90%", alignSelf: "center", flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, marginTop: 20 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 16, }}>Skills  </Text>
                                <TouchableOpacity >

                                    <View>
                                        <Text style={{ fontSize: 16, color: '#1FC7B2' }} onPress={() => navigation.navigate('AddSkills', { UToken: UToken })}>Add Skills </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <FlatList
                                data={SkilLList}
                                showsVerticalScrollIndicator={false}
                                keyExtractor={(item, index) => index.toString()}     //has to be unique

                                renderItem={({ item, index }) => (
                                    <TouchableOpacity key={index}>
                                        <View style={[{
                                            width: '90%', marginHorizontal: '5%', height: 50, marginTop: 15,
                                            borderRadius: 10, flexDirection: 'row',
                                            backgroundColor: 'white',
                                        }, styles.shadStyle]}>
                                            <View style={{ height: 50, borderTopLeftRadius: 10, borderBottomLeftRadius: 10, backgroundColor: "#1FC7B2", width: 7 }}></View>


                                            <View>
                                                <View style={{ alignItems: 'center', flexDirection: 'row', marginTop: 10,flex:1 }}>
                                                    <Image source={address}
                                                        style={{ width: 25, height: 25, marginHorizontal: 5 }}
                                                    />
                                                    <Text style={{ fontSize: 13, color: "black", }}>{item.skill_name}</Text>
                                                </View>
                                            </View>
                                            <View style={{flex: 1, margin: 10}}>
                                                <TouchableOpacity style={{ paddingLeft: 0,alignItems:'flex-end'}} onPress={() => DeleteSkill(item.skill_id)}>
                                                    <Image source={delet} style={{ width: 25, height: 25, }}></Image>
                                                </TouchableOpacity>
                                            </View>


                                        </View>
                                        {index == LocationList.length - 1 &&
                                            < View style={{ height: 200 }}>


                                            </View>
                                        }
                                    </TouchableOpacity>
                                )}
                            />

                        </View>
                    </View>
                }
                {state.Experience == true &&
                    <View style={{ flex: 1, width: "100%", marginBottom: '10%' }}>
                        <View style={{ width: "90%", alignSelf: "center", flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, marginTop: 20 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 16, }}>Experience  </Text>
                            <TouchableOpacity onPress={() => { navigation.navigate('AddExperianceScreen', { UToken: UToken }) }}>
                                <View>
                                    <Text style={{
                                        fontSize: 16, fontStyle: "italic", color: '#1FC7B2',
                                    }}>Add Experience </Text>
                                </View>
                            </TouchableOpacity>
                        </View>


                        <FlatList
                            data={experianceList}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item, index) => index.toString()}     //has to be unique
                            renderItem={({ item, index }) => (
                                <TouchableOpacity>
                                    <View style={[{
                                        width: '90%', alignSelf: "center", padding: 20, marginTop: 40,
                                        borderRadius: 5,
                                        backgroundColor: 'white',
                                    }, styles.shadStyle]}>

                                        <View style={{
                                            width: '50%', height: 30, marginTop: -40,
                                            marginLeft: -20,
                                            borderRadius: 20, justifyContent: "center", alignItems: "center",
                                            backgroundColor: index % 2 == 0 ? "#35C4EF" : "#F2716E",
                                        }}>
                                            <Text style={{ fontSize: 16, color: "white", }}>{item.title}</Text>

                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={{ flex: 1 }}>
                                                <Text style={{ fontSize: 14, color: "#B0B0B0", fontWeight: "bold", marginTop: 10 }}>Responsibiltity</Text>
                                                <Text style={{ fontSize: 16, color: "black" }}>{item.responsibility}</Text>

                                            </View>

                                            <TouchableOpacity style={{ paddingTop: '8%' }} onPress={() => navigation.navigate('UpdateExpe', { ItemData: item, UToken: UToken })}>
                                                <Image source={edit2} style={{ width: 25, height: 25, alignSelf: 'flex-end' }}></Image>
                                            </TouchableOpacity>
                                        </View>
                                        <Text style={{ fontSize: 14, color: "#B0B0B0", fontWeight: "bold", marginTop: 10 }}>Experience</Text>
                                        <Text style={{ fontSize: 16, color: "black" }}>{item.experience_in_month} months</Text>


                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={{ flex: 1 }}>
                                                <Text style={{ fontSize: 14, color: "#B0B0B0", fontWeight: "bold", marginTop: 10 }}>Period</Text>
                                                <Text style={{ fontSize: 16, color: "black" }}>{item.start_year}      {item.end_year}</Text>

                                            </View>
                                            <TouchableOpacity style={{ paddingTop: '8%' }} onPress={() => DeleteExpe(item.id)}>
                                                <Image source={delet} style={{ width: 25, height: 25, alignSelf: 'flex-end' }}></Image>
                                            </TouchableOpacity>
                                        </View>


                                    </View>
                                    {index == experianceList.length - 1 &&
                                        < View style={{ height: 200 }}>


                                        </View>
                                    }
                                </TouchableOpacity>


                            )}
                        />

                    </View>
                }
            </View>

        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#1FC7B2",
        alignContent: 'center',
    },



    buttonText: {
        color: '#FFFFFF',
        fontSize: 17,
    },
    textField: {

        fontSize: 15,
        width: "90%",


    },
    button: {
        alignSelf: 'center',
        height: 50,
        width: "70%",
        backgroundColor: '#1FC7B2',
        justifyContent: 'center',
        borderRadius: 11,
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
    tab: {
        width: "20%",
        height: 33,
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
    }
});

export default donates;
