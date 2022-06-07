import React, { useState, useEffect, useContext, useRef } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView, TextInput,
    StyleSheet,
    StatusBar,
    Image, Modal,
    ScrollView
} from 'react-native';
import back from '../Assets/Icons/Arrr.png';
import modal from '../Assets/Images/modal1.png';
import modal1 from '../Assets/Images/modal2.png';
import modal2 from '../Assets/Images/modal3.png';
import modal3 from '../Assets/Images/modal4.png';
import calenderDate from '../Assets/Icons/calendardate.png'
import camera from '../Assets/Icons/camera.png'

//import AsyncStorage from '@react-native-community/async-storage';
import { domain } from '../Api/Api'

import { get, post, put } from '../utils/api';
import { _alert, images, WIDTH, HEIGHT, colours, _font, _toast, validateEmail } from '../utils/index';
import AsyncStorage from '@react-native-community/async-storage';
import DocumentPicker from 'react-native-document-picker';


import bell from '../Assets/Icons/bell_icon.png';
import backGroundImage1 from '../Assets/Images/backGroundImage1.png';
import ProgressCircle from 'react-native-progress-circle';

function ScreenOne({ navigation, route }) {
    const [SIKNESS, setSIKNESS] = useState(false);
    const [sickness, setSickness] = useState('');

    const [Holidays, setHolidays] = useState(false);
    const [Incident, setIncident] = useState(false);
    const [late, setlate] = useState(false);
    const [Latereason, setLatereason] = useState('');

    const [isCheckIn, setIsCheckIn] = useState(false);
    const [Shift, setShift] = useState(false);
    let [singleFile, setSingleFile] = useState(null);
    const [report, setReport] = useState('');
    const [Todayjob, setTodayjob] = useState([]);

    const [isAnimating, setAnimating] = useState(false);
    const [UToken, setUToken] = useState();
    const [JobId, setJobId] = useState();


    Back = () => {
        navigation.goBack()
    }
    const getCurrentDate = () => {

        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();

        //Alert.alert(date + '-' + month + '-' + year);
        // You can turn it in to your desired format
        //  return date + '-' + month + '-' + year;//format: dd-mm-yyyy;
        return year + '-' + month + '-' + date;//format: yyyy-mm-dd;

    }

    useEffect(() => {
        console.log("Job Detail", route.params)
        setJobId(route.params.id)
        mainApi()
    }, [])

    goToNotification = () => {
        navigation.navigate('Notification')
    }

    mainApi = async () => {

        setAnimating(true)
        //const getToken = await AsyncStorage.getItem('token');${usertoken}
        let usertoken = JSON.parse(await AsyncStorage.getItem('login_token'));
        setUToken(usertoken)
        let result = await get(`today_job?token=${usertoken}`);
        //console.log('result11110000', result.data)
        if (result.success) {
            setTodayjob(result.data.today_job[0])
            setAnimating(false)
        } else {
            setAnimating(false)
            _toast('something went wrong');
        }

    }

    gotoCheckout = async () => {

        //setAnimating(true)
        // const getToken = await AsyncStorage.getItem('token');
        var data = new FormData();
        data.append("token", UToken)
        data.append("job_id", JobId)
        data.append("date", route.params.date_from)
        data.append("check_out", 1)

        console.log(data, "verve")

        try {

            await fetch(domain + `checkout?`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
                body: data
            })
                .then(response => {
                    const statusCode = response.status;
                    const data = response.json();
                    return Promise.all([statusCode, data]);

                })
                .then(async (data) => {
                    console.log('Checkout  Response->', data)

                    if (data[1].success) {
                        _toast(data[1].success)
                        // if (data[1].check_in.length > 0) {
                        //     setIsCheckIn(true)
                        // }
                        // await setNewJob(data[1].new_jobs)
                        // await setMyInvitation(data[1].invite_job)
                        // await setNotification(data[1].notification)


                    } else {
                        //setAnimating(false)
                        _toast(data[1].error)
                    }

                })
                .catch(err => {
                    //setAnimating(false)
                    _toast(err)
                    console.log('failed', err)
                })

        } catch (error) {
            //setAnimating(false)
            console.log(error);
            _toast(error)


        }


    }

    gotoCheckin = async () => {

        //setAnimating(true)
        // const getToken = await AsyncStorage.getItem('token');
        var data = new FormData();
        data.append("token", UToken)
        data.append("job_id", JobId)
        data.append("date", route.params.date_from)
        data.append("check_in", 1)

        console.log(data, "verve")


        try {

            await fetch(domain + `checkin?`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
                body: data
            })
                .then(response => {
                    const statusCode = response.status;
                    const data = response.json();
                    return Promise.all([statusCode, data]);

                })
                .then(async (data) => {
                    console.log('verve', data)

                    if (data[1].success) {
                        _toast(data[1].success)

                        // if (data[1].check_in.length > 0) {
                        //     setIsCheckIn(true)
                        // }
                        // await setNewJob(data[1].new_jobs)
                        // await setMyInvitation(data[1].invite_job)
                        // await setNotification(data[1].notification)


                    } else {
                        //setAnimating(false)
                        _toast(data[1].error)
                    }

                })
                .catch(err => {
                    //setAnimating(false)
                    _toast(err)
                    console.log('failed', err)
                })

        } catch (error) {
            //setAnimating(false)
            console.log(error);
            _toast(error)


        }


    }
    const SubmitSickness = async () => {
        if (sickness == '') {
            _toast(" enter Reason.")
            return
        }
        setAnimating(true)
        var data = {
            token: UToken,
            job_id: JobId,
            date: getCurrentDate(),
            type: 'sickness',
            reason: sickness
        }

        console.log(data, "apiData")
        let result = await post(data, 'add_sickness');
        console.log('result1111', result)
        if (result.status) {
            setAnimating(false)
            _toast('success')
            setSIKNESS(false)
        } else {
            setAnimating(false)
            if (result.message != 'something went wrong') {
                _toast(result.message);
            }
        }
    }
    const SubmitLate = async () => {
        if (Latereason == '') {
            _toast(" enter Reason.")
            return
        }
        setAnimating(true)
        var data = {
            token: UToken,
            job_id: JobId,
            date: getCurrentDate(),
            type: 'late',
            reason: Latereason
        }

        console.log(data, "apiData")
        let result = await post(data, 'add_late');
        console.log('result1111', result)
        if (result.status) {
            setAnimating(false)
            _toast('success')
            setlate(false)
        } else {
            setAnimating(false)
            if (result.message != 'something went wrong') {
                _toast(result.message);
            }
        }
    }
    const SubmitHourly = async () => {

        setAnimating(true)
        var data = {
            token: UToken,
            job_id: JobId,
            // date: '2021-03-12',
            // type: 'late',
            // reason: Latereason
        }

        console.log(data, "apiData")
        let result = await post(data, 'hourly_checker');
        console.log('result1111', result)
        if (result.status) {
            setAnimating(false)
            _toast('success')
            // setHolidays(false)
        } else {
            setAnimating(false)
            if (result.message != 'something went wrong') {
                _toast(result.message);
            }
        }
    }
    const SubmitStartShift = async () => {

        setAnimating(true)
        var data = {
            token: UToken,
            job_id: JobId,
            start_time: '10:15:00',
            // type: 'late',
            // reason: Latereason
        }

        console.log(data, "apiData")
        let result = await post(data, 'start_shift');
        console.log('result1111', result)
        if (result.status) {
            setAnimating(false)
            _toast('success')
            // setHolidays(false)
        } else {
            setAnimating(false)
            if (result.message != 'something went wrong') {
                _toast(result.message);
            }
        }
    }
    const SubmitEndShift = async () => {

        setAnimating(true)
        var data = {
            token: UToken,
            job_id: JobId,
            end_time: '12:15:00',
            // type: 'late',
            // reason: Latereason
        }

        console.log(data, "apiData")
        let result = await put(data, 'end_shift');
        console.log('result1111', result)
        if (result.status) {
            setAnimating(false)
            _toast('success')
            // setHolidays(false)
        } else {
            setAnimating(false)
            if (result.message != 'something went wrong') {
                _toast(result.message);
            }
        }
    }
    const SubmitIncident = async () => {
        if (singleFile == null && report == '') {
            _toast("Please select image and  enter report.")
            return
        }

        setAnimating(true)
        // var data = {
        //     token: 770,
        //     job_id: 6,
        //     // end_time: '12:15:00',
        //     uploadedFile: singleFile,
        //     report: report
        // }
        var data1 = new FormData()
        data1.append('token', UToken),
            data1.append('job_id', JobId),
            data1.append('uploadedFile', singleFile),
            data1.append('report', report)

        console.log(data1, "apiData")
        let result = await post(data1, 'add_incident');
        console.log('result1111', result)
        if (result.status) {
            setAnimating(false)
            _toast('success')
            setIncident(false)
        } else {
            setAnimating(false)
            if (result.message != 'something went wrong') {
                _toast(result.message);
            }
        }
    }
    let selectFile = async () => {
        //Opening Document Picker to select one file
        try {
            const res = await DocumentPicker.pick({
                //Provide which type of file you want user to pick
                type: [DocumentPicker.types.images],
                //There can me more options as well
                // DocumentPicker.types.allFiles
                // DocumentPicker.types.images
                // DocumentPicker.types.plainText
                // DocumentPicker.types.audio
                // DocumentPicker.types.pdf
            });
            //Printing the log realted to the file
            // console.log('res : ' + JSON.stringify(res));
            //Setting the state to show single file attributes
            setSingleFile(res);
        } catch (err) {
            setSingleFile(null);
            //Handling any exception (If any)
            if (DocumentPicker.isCancel(err)) {
                //If user canceled the document selection
                _toast("You have not selected any file");
            } else {
                //For Unknown Error
                _toast('Unknown Error: ' + JSON.stringify(err));
                throw err;
            }
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#1FC7B2" />


            <Modal visible={SIKNESS} transparent={true}>
                <ScrollView style={{ width: "100%", height: "100%", marginTop: "20%" }}>
                    <View style={styles.modalContainer}>
                        <Image source={modal} style={{ width: "100%", height: 200 }}></Image>

                        <Text style={{ fontWeight: 'bold', color: 'black', marginLeft: '5%', paddingTop: '5%' }}>EXPLAIN REASON FOR SICKNESS</Text>

                        <View style={[styles.inputContainer]}>
                            <TextInput
                                multiline={true}
                                autoCapitalize="none"
                                placeholder="Your Feedback"
                                placeholderTextColor={'#9a9999'}
                                onChangeText={(val) => { setSickness(val) }}
                                style={styles.input2}
                            />


                        </View>

                        <TouchableOpacity style={styles.ModalButton} onPress={() => { SubmitSickness() }}>
                            <Text style={{ color: '#FFFFFF', fontSize: 15, fontWeight: 'bold', textAlign: "center" }}>Confirm</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ marginVertical: 10 }} onPress={() => { setSIKNESS(false) }}>
                            <Text style={{ color: 'black', fontSize: 15, fontWeight: 'bold', textAlign: "center" }}>back</Text>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
            </Modal>


            <Modal visible={Holidays} transparent={true}>
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
                            // onChangeText={(val) => setPhoneNumber(val)}
                            >
                            </TextInput>

                        </ View>
                        < View style={styles.seperater}></ View>

                        <View style={[styles.inputContainer]}>
                            <TextInput
                                multiline={true}
                                autoCapitalize="none"
                                placeholder='Date'
                                placeholderTextColor='#d5c9de'
                                onChangeText={(val) => { }}


                                style={styles.input2}

                                underlineColorAndroid='transparent' />


                        </View>

                        <TouchableOpacity style={styles.ModalButton} onPress={() => { SubmitHourly() }}>
                            <Text style={{ color: '#FFFFFF', fontSize: 15, fontWeight: 'bold', textAlign: "center" }}>Confirm</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ marginVertical: 10 }} onPress={() => { setHolidays(false) }}>
                            <Text style={{ color: 'black', fontSize: 15, fontWeight: 'bold', textAlign: "center" }}>back</Text>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
            </Modal>

            <Modal visible={late} transparent={true}  >
                <ScrollView style={{
                    width: "100%", height: "100%", marginTop: "20%",

                }}>
                    <View style={styles.modalContainer}>
                        <Image source={modal2} style={{ width: "100%", height: 200 }}></Image>

                        <Text style={{ fontWeight: 'bold', color: 'black', marginLeft: '5%', paddingTop: '5%' }}>Why You are late?</Text>

                        <View style={[styles.inputContainer]}>
                            <TextInput
                                multiline={true}
                                autoCapitalize="none"
                                placeholder="Your Feedback"
                                placeholderTextColor={'#9a9999'}
                                onChangeText={(val) => { setLatereason(val) }}
                                style={styles.input2}
                                underlineColorAndroid='transparent' />
                        </View>
                        <TouchableOpacity style={styles.ModalButton} onPress={() => { SubmitLate() }}>
                            <Text style={{ color: '#FFFFFF', fontSize: 15, fontWeight: 'bold', textAlign: "center" }}>Confirm</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ marginVertical: 10 }} onPress={() => { setlate(false) }}>
                            <Text style={{ color: 'black', fontSize: 15, fontWeight: 'bold', textAlign: "center" }}>back</Text>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
            </Modal>




            <Modal visible={Incident}  >
                <ScrollView style={{ width: "100%", height: "100%", paddingTop: "20%", }}>
                    <View style={styles.modalContainer}>
                        <Image source={modal1} style={{ width: "100%", height: 200 }}></Image>
                        <Text style={{ fontWeight: 'bold', color: 'black', marginLeft: '5%', paddingTop: '5%' }}>EXPLAIN REASON FOR SIKNESS</Text>

                        <View style={[styles.inputContainer, { height: 80 }]}>
                            <TextInput
                                multiline={true}
                                autoCapitalize="none"
                                placeholder="Your Feedback"
                                placeholderTextColor={'#9a9999'}
                                onChangeText={(val) => { setReport(val) }}
                                style={styles.input2}
                                underlineColorAndroid='transparent' />
                        </View>
                        <View style={[styles.modalContainer, { backgroundColor: "#CFD2D2", width: "100%", marginTop: 20 }]}>
                            <TouchableOpacity onPress={() => selectFile()}>

                                <Image source={!singleFile ? camera : { uri: singleFile.uri }} style={{ width: 40, height: 40, alignSelf: 'center' }}></Image>
                                <Text style={{ fontWeight: 'bold', color: 'black', }}>Upload Image</Text>
                            </TouchableOpacity>


                        </View>
                        <TouchableOpacity style={styles.ModalButton} onPress={() => { SubmitIncident() }}>
                            <Text style={{ color: '#FFFFFF', fontSize: 15, fontWeight: 'bold', textAlign: "center" }}>Confirm</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ marginVertical: 10 }} onPress={() => { setIncident(false) }}>
                            <Text style={{ color: 'black', fontSize: 15, fontWeight: 'bold', textAlign: "center" }}>back</Text>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
            </Modal>




            <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-between', backgroundColor: "#1FC7B2" }}>
                <TouchableOpacity style={styles.back} styles={{ width: "15%" }} onPress={() => { Back() }}>
                    <Image source={back} style={styles.backIcon}></Image>
                </TouchableOpacity>
                <TouchableOpacity style={{ width: '15%', justifyContent: "center", alignItems: "center" }} onPress={() => { goToNotification() }} >
                    <Image source={bell} style={{ width: 25, height: 25 }}></Image>
                </TouchableOpacity>
            </View>

            <View style={{ backgroundColor: '#F2F2F5', flex: 1, }}>

                <ScrollView keyboardShouldPersistTaps='handled' style={{ marginBottom: '3%' }}>
                    <View style={{ backgroundColor: "#1FC7B2" }}>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: "center", width: '90%', marginLeft: '5%', paddingBottom: '5%' }}>
                            <View style={{}}>
                                <Text style={{ fontWeight: 'bold', color: 'white', marginLeft: '5%', paddingTop: '5%' }}>{route.params.title}</Text>
                                <Text style={{ paddingTop: '3%', color: 'white', marginLeft: '5%', }}>{route.params.company_name}</Text>
                                <View style={{ padding: 8 }} />
                                <Text style={{ marginTop: '4%', color: 'white', marginLeft: '5%', fontWeight: '700' }}>Job Timing</Text>
                                <Text style={{ marginTop: '0.7%', color: 'white', marginLeft: '5%', }}>{route.params.start_time}  {route.params.end_time}</Text>
                            </View>
                            <Image
                                source={backGroundImage1}
                                style={{ width: 80, height: 80, }}
                            />
                        </View>
                    </View>
                    <View style={{ width: '100%', padding: "5%", elevation: 2, flexDirection: 'row', marginTop: '3%', paddingBottom: '10%', marginBottom: '5%' }}>
                        <ProgressCircle
                            percent={80}
                            radius={50}
                            borderWidth={8}
                            color='#FFDA6D'
                            shadowColor="#999"
                            bgColor="#fff"
                        >
                            <Text>80%</Text>
                        </ProgressCircle>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={{ flex: 0.49, justifyContent: 'center' }}>
                                <Text style={{ fontSize: 16, textAlign: 'center' }}>Job Name</Text>
                                <Text style={{ fontSize: 12, paddingTop: '1.5%', paddingBottom: '15%', textAlign: 'center' }}>{Todayjob.skill_name}</Text>
                                <Text style={{ fontSize: 16, textAlign: 'center' }}>Job Type</Text>
                                <Text style={{ fontSize: 12, textAlign: 'center' }}>{Todayjob.job_type}</Text>
                            </View>
                            <View style={{ flex: 0.02, borderLeftWidth: 0.5, borderLeftColor: 'grey' }} />
                            <View style={{ flex: 0.49, justifyContent: 'center' }}>
                                <Text style={{ fontSize: 16, textAlign: 'center' }}>Post Code</Text>
                                <Text style={{ fontSize: 12, paddingTop: '1.5%', paddingBottom: '15%', textAlign: 'center' }}>123455</Text>
                                <Text style={{ fontSize: 16, textAlign: 'center' }}>Company</Text>
                                <Text style={{ fontSize: 12, textAlign: 'center' }}>{Todayjob.company_name}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ width: '100%', marginTop: '3%' }}>
                        {isCheckIn ?
                            <TouchableOpacity onPress={() => { gotoCheckin() }} style={{ width: '90%', backgroundColor: '#1E7EC7', marginTop: '5%', marginLeft: '5%', padding: '3%', alignItems: 'center', borderRadius: 8 }}>
                                <Text style={{ color: 'white' }}>CHECK IN</Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => { gotoCheckout() }} style={{ width: '90%', backgroundColor: '#1E7EC7', marginTop: '5%', marginLeft: '5%', padding: '3%', alignItems: 'center', borderRadius: 8 }}>
                                <Text style={{ color: 'white' }}>CHECK OUT</Text>
                            </TouchableOpacity>
                        }
                        {Shift ?
                            <TouchableOpacity onPress={() => { SubmitStartShift() }}
                                style={{ width: '90%', backgroundColor: '#1E7EC7', marginTop: '5%', marginLeft: '5%', padding: '3%', alignItems: 'center', borderRadius: 8 }}>
                                <Text style={{ color: 'white' }}>START SHIFT</Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => { SubmitEndShift() }}
                                style={{ width: '90%', backgroundColor: '#1E7EC7', marginTop: '5%', marginLeft: '5%', padding: '3%', alignItems: 'center', borderRadius: 8 }}>
                                <Text style={{ color: 'white' }}>END SHIFT</Text>
                            </TouchableOpacity>
                        }

                        <TouchableOpacity style={{ width: '90%', backgroundColor: '#FE4154', marginTop: '5%', marginLeft: '5%', padding: '3%', alignItems: 'center', borderRadius: 8 }} onPress={() => { setIncident(true) }}>
                            <Text style={{ color: 'white' }}>INCIDENT REPORT</Text>
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: '5%' }}>
                            <TouchableOpacity style={{ width: '43%', backgroundColor: "#1FC7B2", borderRadius: 7, justifyContent: 'center', alignItems: 'center', padding: '3%' }} onPress={() => { SubmitHourly() }}>
                                <Text style={{ color: 'white' }}>HOURLY CHECKER</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ width: '43%', backgroundColor: "#1FC7B2", borderRadius: 7, justifyContent: 'center', alignItems: 'center', padding: '3%' }}
                                onPress={() => navigation.navigate('ChangeShift',{JobId:JobId,Token:UToken})}
                            >
                                <Text style={{ color: 'white' }}>CHANGE SHIFT</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: '5%' }}>
                            <TouchableOpacity style={{ width: '43%', backgroundColor: '#1E7EC7', borderRadius: 7, justifyContent: 'center', alignItems: 'center', padding: '3%' }} onPress={() => { setlate(true) }}>
                                <Text style={{ color: 'white' }}>LATE</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ width: '43%', backgroundColor: '#1E7EC7', borderRadius: 7, justifyContent: 'center', alignItems: 'center', padding: '3%' }} onPress={() => { setSIKNESS(true) }}>
                                <Text style={{ color: 'white' }}>SICKNESS</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1FC7B2",
        alignContent: 'center',
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
        color:"black",

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
})
export default ScreenOne;