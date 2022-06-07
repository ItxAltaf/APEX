// ./screens/Home.js

import React, { useState, useEffect, useContext, useRef } from "react";
import { View, StyleSheet, Button, ActivityIndicator, Text, StatusBar, TextInput, TouchableOpacity, Image, ScrollView, SafeAreaView, FlatList, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'

import manue from '../Assets/Icons/manue.png'
import image from '../Assets/Icons/image.png'
import image1 from '../Assets/Icons/image2.png'
import profile_icon from '../Assets/Icons/profile_icon.png'
import back from '../Assets/Icons/Arrr.png';

import * as Animatable from 'react-native-animatable';

import bell from '../Assets/Icons/bell_icon.png'
import AsyncStorage from '@react-native-community/async-storage';

import { get, post } from '../utils/api';
import { _alert, _font, _toast } from '../utils/index';
import DocumentPicker from 'react-native-document-picker';

var moment = require('moment');
function AdminChatBox({ navigation,route }) {


    const [isAnimating, setAnimating] = useState(false);
    const [MessageText, setMessagetext] = useState('');
    const [message, setMessage] = useState([]);
    let [singleFile, setSingleFile] = useState(null);
    const [UToken, setUToken] = useState();

    const scrollViewRef = useRef();


    useEffect(() => {
        Submit()
    }, [])
    const Submit = async () => {

        setAnimating(true)
        //const getToken = await AsyncStorage.getItem('token');${usertoken}${route.params.id}
        let usertoken = JSON.parse(await AsyncStorage.getItem('login_token'));
        setUToken(usertoken)
        let result = await get(`get-chat-admin?token=${usertoken}&page=1`);
        // console.log('result3330', result.data)
        if (result.success) {
            setMessage(result.data.chat_admin)
            setAnimating(false)
        } else {
            setAnimating(false)
            _toast('something went wrong');
        }
    }
    const SendCompanyChat = async () => {
        // setAnimating(true)
        var data = {
            token: UToken,
            // receiver_id: 1,
            uploadedFile: singleFile,
            type: "admin",
            text: MessageText
        }
        console.log(data, "apiData")
        let result = await post(data, 'admin-chat-add');
        console.log('result1111', result)
        if (result.status) {
            // setAnimating(false)
            _toast('Message sent')
            setMessage(result.data.data)
            //console.log(result.data.data)
            setMessagetext('')
            setSingleFile(null)

            // let result = await get(`get-chat-admin?token=770&page=1`);
            // // console.log('result3330', result.data)
            // if (result.success) {
            //     setMessage(result.data.chat_admin)
            //     setAnimating(false)
            // } else {
            //     setAnimating(false)
            //     _toast('something went wrong');
            // }

        }
    }

    let selectFile = async () => {
        //Opening Document Picker to select one file
        try {
            const res = await DocumentPicker.pick({
                //Provide which type of file you want user to pick
                type: [DocumentPicker.types.allFiles],
                //There can me more options as well
                // DocumentPicker.types.allFiles
                // DocumentPicker.types.images
                // DocumentPicker.types.plainText
                // DocumentPicker.types.audio
                // DocumentPicker.types.pdf
            });
            //Printing the log realted to the file
            console.log('res : ' + JSON.stringify(res));
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
    const goToNotification = () => {
        navigation.navigate('Notification')
    }

    return (
        <SafeAreaView style={[styles.container]}>
            <StatusBar barStyle="light-content" backgroundColor="#1FC7B2" />
            {/* top bar */}

            <View style={{ width: "100%", backgroundColor: "#1FC7B2", flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity style={styles.back} styles={{ width: "15%" }} onPress={() => navigation.goBack()}>
                    <Image source={back} style={styles.backIcon}></Image>
                </TouchableOpacity>
                <View style={{ alignItems: "center", justifyContent: "center", marginRight: 10 }}>
                    <Image source={profile_icon} style={{ width: 35, height: 35, resizeMode: "contain" }} />
                </View>
                <View style={{ width: "55%", justifyContent: "center", }}>
                    <Text style={{ fontSize: 18, color: "white", fontWeight: "bold" }}>Admin</Text>
                </View>
                {/* <TouchableOpacity style={{ width: '15%', justifyContent: "center", alignItems: "center" }} onPress={() => { goToNotification() }} >
                    <Image source={bell} style={{ width: 25, height: 25 }}></Image>
                </TouchableOpacity> */}
            </View>


            {/* top bar */}

            <ScrollView style={{ backgroundColor: 'white', }} showsVerticalScrollIndicator={false}
                ref={scrollViewRef}
                onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: false })}>

                {/* 
                   // keyboardShouldPersistTaps={'handled'} showsVerticalScrollIndicator={true}
                    <View style={{ flexDirection: "row", alignItems: "center", }}>
                        <View style={{ height: 60, width: 60, borderRadius: 30, alignItems: "center", justifyContent: "center", marginRight: 10 }}>
                            <Image source={profile_icon} style={{ width: 60, height: 60, resizeMode: "contain" }} />
                        </View>
                        <View style={{}}>
                            <Text style={{ fontSize: 16, fontWeight: "bold",color:'black' }}>Some Name</Text>
                            <Text style={{ fontSize: 14, color: "#797A79" }}>active now</Text>

                        </View>
                    </View> */}

                {/* <Text style={{ fontWeight: 'bold', marginHorizontal: 20, fontSize: 16, marginTop: 15, }}>MESSAGES</Text> */}

                <View style={{ width: "100%", marginBottom: '1%' }}>
                    {
                        message.map((item, index) => {
                            return (
                                <View>
                                    {parseInt(item.is_guard) === 1 ?

                                        <TouchableOpacity key={index}>
                                            <View style={{ flexDirection: "row", alignSelf: "flex-end", marginRight: '5%', marginTop: '2%' }}>
                                                <View style={{ alignItems: "center", }}>
                                                    {item.file != '' ?
                                                        <View style={{ height: 90, width: 90, borderRadius: 30, alignItems: "center", justifyContent: "center", marginRight: 10 }}>
                                                            <Image source={{ uri: item.file }} style={{ width: 90, height: 90, resizeMode: "contain" }} />
                                                        </View>
                                                        :
                                                        null
                                                    }
                                                    {item.text != '' ?
                                                        <View style={{ backgroundColor: '#a8e6de', padding: 15, borderRadius: 18, borderBottomRightRadius: 0 }}>
                                                            {/* <Text style={{ fontSize: 16, fontWeight: "bold" }}>{item.company_name}</Text> */}
                                                            <Text style={{ fontSize: 14, color: "black" }}>{item.text}</Text>

                                                        </View>
                                                        :
                                                        null
                                                    }

                                                </View>
                                                {/* <View styl={{}}>
                                             <Text style={{ marginLeft: 20, fontSize: 16, color: "#797A79" }}>{moment(item.created_date).fromNow()}</Text>

                                         </View> */}
                                            </View>
                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity key={index}>
                                            <View style={{ width: "90%", flexDirection: "row", height: 60, alignItems: "center", alignSelf: "center", justifyContent: "space-between" }}>
                                                <View style={{ alignItems: "center", }}>
                                                    {item.file != '' ?
                                                        <View style={{ height: 90, width: 90, borderRadius: 30, alignItems: "center", justifyContent: "center", marginRight: 10 }}>
                                                            <Image source={{ uri: item.file }} style={{ width: 90, height: 90, resizeMode: "contain" }} />
                                                        </View>
                                                        :
                                                        null
                                                    }
                                                    {item.text != '' ?
                                                        <View style={{ backgroundColor: '#e1edec', padding: 15, borderRadius: 18, borderBottomLeftRadius: 0 }}>
                                                            {/* <Text style={{ fontSize: 16, fontWeight: "bold" }}>{item.company_name}</Text> */}
                                                            <Text style={{ fontSize: 14, color: "black" }}>{item.text}</Text>

                                                        </View>
                                                        :
                                                        null
                                                    }

                                                </View>
                                                {/* <View styl={{}}>
                                            <Text style={{ marginLeft: 20, fontSize: 16, color: "#797A79" }}>{moment(item.created_date).fromNow()}</Text>

                                        </View> */}
                                            </View>
                                        </TouchableOpacity>
                                    }


                                </View>
                            );
                        })
                    }
                </View>


            </ScrollView>
            <View style={{backgroundColor: 'white',paddingVertical:'2%' }}>
                {singleFile != null ?
                    <View style={{backgroundColor:'lightgrey', height: 150, width: '100%', borderRadius: 30, alignItems: "center", alignSelf: "center" }}>
                        <Image source={{ uri: singleFile.uri }} style={{ width: 150, height: 150, resizeMode: "contain" }} />
                    </View>
                    :
                    null
                }
            </View>
            <View style={{ backgroundColor: 'white' }}>
                <View style={[{ marginBottom: '1%', borderRadius: 15, width: '90%', flexDirection: 'row', alignSelf: "center", alignItems: "center", backgroundColor: 'white', elevation: 5, height: 45 }, styles.shadStyle]}>
                    <Image source={require('../Assets/Icons/smile.png')} style={{ alignSelf: 'center', height: 18, width: 18, marginLeft: 15, marginRight: 10 }}></Image>

                    <TextInput
                        style={[styles.textField]}
                        placeholder='Type here'
                        placeholderTextColor='grey'
                        onChangeText={(val) => setMessagetext(val)}
                        value={MessageText}
                    >
                    </TextInput>
                    <TouchableOpacity onPress={() => selectFile()}>
                        <Image source={require('../Assets/Icons/attchdoc.png')} style={{ alignSelf: 'center', height: 18, width: 18, marginLeft: 5 }}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => SendCompanyChat()}>
                        <Image source={require('../Assets/Icons/send.png')} style={{ alignSelf: 'center', height: 35, width: 35, marginLeft: 5, marginRight: 10 }}></Image>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#1FC7B2",
        alignContent: 'center', flex: 1
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
    textField: {
        width: '65%',
        marginBottom: 6,
        paddingTop: '3%',
        paddingBottom: '3%',
        color:"black",
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

export default AdminChatBox;
