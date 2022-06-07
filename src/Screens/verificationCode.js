
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
    ScrollView,
    AsyncStorage, BackHandler, SafeAreaView, KeyboardAvoidingView,
    Button
} from "react-native";
import { isIphoneX } from 'react-native-iphone-x-helper';
import backGroundImage1 from '../Assets/Images/backGround2.png'
import logo from '../Assets/Images/logo.png'
import name from '../Assets/Icons/name.png'
import addresss from '../Assets/Icons/address.png'
import back from '../Assets/Icons/Arrr.png';

import OTPInputView from '@twotalltotems/react-native-otp-input'


var validator = require("email-validator");
import { domain } from "../Api/Api";

import * as Animatable from 'react-native-animatable';
const screenWidth = Dimensions.get("window").width
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import { _alert, _font, _toast } from '../utils/index';
import { put } from "../utils/api";

const screenheight = Dimensions.get('window').height;

export default function ValidationCode({ navigation, route }) {


    const [code, setCode] = useState("");
    const [isAnimating, setAnimating] = useState(false);
    const [isDisabled, setDisabled] = useState(false);
    // const RecievedCode = route.params.Code
    const [RecievedCode, setRecCode] = useState(route.params.Code);

    const Submit = () => {
        // console.log('matching',RecievedCode)
        // console.log('with',code)


        if (RecievedCode == code) {
            navigation.push('ResetPassword', { token: RecievedCode })
        } else {
            _toast('Recived code Not matched')
        }
    }

    const buForgotPassword = async () => {
        setAnimating(true);
        let data = {
            email: route.params.Email,
        };
        let result = await put(data, 'forgot_password');
        console.log(result)
        if (result.status) {
            _toast('your code has been sent to your email');
            setRecCode(result.data.login_token)
        } else {
            //if (result.message != 'something went wrong') {
            _toast('Something went wrong');
            // }
        }
        setAnimating(false);
    };

    Back = () => {
        navigation.goBack()
    }

    return (
        <SafeAreaView style={styles.container}>

            <StatusBar barStyle="light-content" backgroundColor="#1FC7B2" />
            <View style={{ width: "100%" }}>
                <TouchableOpacity style={styles.back} styles={{ width: "15%" }} onPress={() => { Back() }}>
                    <Image source={back} style={styles.backIcon}></Image>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1, }}>
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
                        <Animatable.View style={[styles.bottomView, { marginTop: 0 }]} animation="fadeIn" >
                            <Text style={[styles.label, { marginLeft: 0, }]}>Enter Code You Received on Email</Text>
                        </Animatable.View>
                        <View style={{ width: "90%", alignSelf: "center", paddingVertical: 30 }}>
                            <OTPInputView
                                style={{ width: '100%', height: 50, }}
                                pinCount={5}
                                placeholderCharacter="x"
                                placeholderTextColor="#8DAFB2"
                                selectionColor={"#1FC7B2"}
                                autoFocusOnLoad={false}

                                codeInputFieldStyle={{ height: 55, width: 55, borderRadius: 5, borderColor: "#1FC7B2", borderWidth: 1, color: "#1FC7B2", fontSize: 20, fontWeight: '700' }}
                                onCodeFilled={(code => setCode(code))}
                            />
                        </View>
                        <Animatable.View animation="fadeInUp" >

                            <TouchableOpacity style={styles.button} onPress={() => Submit()}>
                                <Text style={styles.buttonText}>SUBMIT</Text>
                            </TouchableOpacity>
                        </Animatable.View>
                        <TouchableOpacity onPress={() => buForgotPassword()}>
                            <Text style={styles.newUser}>Resend Code</Text>
                        </TouchableOpacity>

                        <Image source={logo} style={styles.logo}></Image>

                        <View style={{ height: 100 }}></View>
                    </Animatable.View>

                </KeyboardAwareScrollView>
            </View>

            {
                isAnimating &&
                <ActivityIndicator size="large" color="#0178B9" animating={isAnimating} style={styles.loading} />
            }
        </SafeAreaView >
    )
}


const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 35 : 0;
const STATUSBAR_COLOR = Platform.OS === 'ios' ? 'white' : '#0178B9';
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
    newUser: {
        fontSize: 15,
        color: '#010a0a',
        alignSelf: "center", marginTop: 20
    },
    backIcon: {
        height: 30,
        width: 30,
    },
    logo: {
        resizeMode: "contain",
        height: 90,
        width: 120,
        marginTop: Platform.OS == "ios" ? screenheight - 770 : screenheight - 700,

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
        marginLeft: 30,
        marginRight: 30,
        width: '70%',
        marginTop: 6,
        marginBottom: 3,
        paddingTop: '3%',
        paddingBottom: '3%',


    },
    seperater: {
        height: 1,
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 10,
        backgroundColor: '#d5c9de'

    },
    ForgotPassword: {
        alignSelf: 'center',
        marginTop: 15,
        color: '#acacac',
        fontSize: 15
    },
    button: {
        marginTop: 30,
        alignSelf: 'center',
        height: 50,
        width: screenWidth - 60,
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
        fontSize: 17,
    },
    bottomView: {
        marginTop: 10,
        justifyContent: 'center',
        alignSelf: 'center',
        flexDirection: 'row',
        marginBottom: 10,
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

});