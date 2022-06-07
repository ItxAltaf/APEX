
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
import backGroundImage1 from '../Assets/Images/backGround4.png'
import logo from '../Assets/Images/logo.png'
import name from '../Assets/Icons/name.png'
import addresss from '../Assets/Icons/address.png'
import back from '../Assets/Icons/Arrr.png';
import nationalityy from '../Assets/Icons/nationality.png';
import card from '../Assets/Icons/crad.png';
import phone from '../Assets/Icons/phone.png';


import RadioButton from '../Compmonent/RadioButton'

import user from '../Assets/Icons/user.png'
import passwordd from '../Assets/Icons/password.png'
var validator = require("email-validator");
import { domain } from "../Api/Api";

import * as Animatable from 'react-native-animatable';
const screenWidth = Dimensions.get("window").width
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import { post } from "../utils/api";
import { _alert, images, WIDTH, HEIGHT, colours, _font, _toast, validateEmail } from '../utils/index';

export default function CriminalOffensesScreen({ navigation,route }) {




    const [isAnimating, setAnimating] = useState(false);
    const [isDisabled, setDisabled] = useState(false);
    let [PaymentYes, setPaymentYes] = useState(false);
    let [PaymentNo, setPaymentNo] = useState(false);
    let [AgainstYes, setAgainstYes] = useState(false);
    let [AgainstNo, setAgainstNo] = useState(false);

    let [AllegedYes, setAllegedYes] = useState(false);
    let [AllegedNo, setAllegedNo] = useState(false);

    let [GoodYes, setGoodYes] = useState(false);
    let [GoodNo, setGoodNo] = useState(false);
    // let [referanceYes, setReferanceYes] = useState(false);
    // let [referanceNo, setReferanceNo] = useState(false);

    Back = () => {
        navigation.goBack()
    }
    const CrimeOffenses = async () => {
        var data = null
        // var data = {
        //     'token': 770,
        //     'scriminal_sentence': GoodYes,
        //     'criminal_inside': AllegedYes,
        //     'criminal_alleged': AgainstYes,
        //     'criminal_outside': PaymentYes,

        // };
        console.log('CrimeOffenses', data)

        let result = await post(data, `ciminal?token=${route.params}&criminal_sentence=${GoodYes}&criminal_inside=${AllegedYes}&criminal_alleged=${AgainstYes}&criminal_outside=${PaymentYes}`);
        console.log('result1111', result)
        if (result.status) {
            setAnimating(false)
            _toast('Success')
            navigation.goBack()
        } else {
            setAnimating(false)
            _toast('Something went wrong!')
        }

    }

    Back = () => {
        navigation.goBack()
    }


    const setPaymentYesValue = () => {
        if (PaymentYes == true) {
            setPaymentYes(false)
            setPaymentNo(false)
        }
        else if (PaymentYes == false) {
            setPaymentYes(true)
            setPaymentNo(false)

        }

    }
    const setPaymentNoValue = () => {
        if (PaymentNo == true) {
            setPaymentYes(false)
            setPaymentNo(false)

        }
        else if (PaymentNo == false) {
            setPaymentYes(false)
            setPaymentNo(true)

        }

    }

    const setAgainstYesValue = () => {
        if (AgainstYes == true) {
            setAgainstYes(false)
            setAgainstNo(false)
        }
        else if (AgainstYes == false) {
            setAgainstYes(true)
            setAgainstNo(false)
        }

    }
    const setAgainstNoValue = () => {
        if (AgainstNo == true) {
            setAgainstYes(false)
            setAgainstNo(false)
        }
        else if (AgainstNo == false) {
            setAgainstYes(false)
            setAgainstNo(true)
        }

    }

    const setDerivingYesValue = () => {
        if (AllegedYes == true) {
            setAllegedYes(false)
            setAllegedNo(false)

        }
        else if (AllegedYes == false) {
            setAllegedYes(true)
            setAllegedNo(false)

        }

    }
    const setAllegedNoValue = () => {
        if (AllegedNo == true) {
            setAllegedYes(false)
            setAllegedNo(false)

        }
        else if (AllegedNo == false) {
            setAllegedYes(false)
            setAllegedNo(true)

        }

    }
    const setGoodYesValue = () => {
        if (GoodYes == true) {
            setGoodYes(false)
            setGoodNo(false)
        }
        else if (GoodYes == false) {
            setGoodYes(true)
            setGoodNo(false)
        }

    }
    const setGoodNoValue = () => {
        if (GoodNo == true) {
            setGoodYes(false)
            setGoodNo(false)
        }
        else if (GoodNo == false) {
            setGoodYes(false)
            setGoodNo(true)
        }

    }
    return (
        <SafeAreaView style={styles.container}>

            <StatusBar barStyle="light-content" backgroundColor="#1FC7B2" />
            <View style={{ width: "100%" }}>
                <TouchableOpacity style={styles.back} styles={{ width: "15%" }} onPress={() => { Back() }}>
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
                    <Animatable.View style={[styles.bottomView, { marginTop: 0 }]} animation="fadeIn" >
                        <Text style={[styles.label, { marginLeft: 0, }]}>Criminal Offenses, Cautions E.T.C</Text>
                    </Animatable.View>


                    <Animatable.Text animation="fadeInUp" style={[styles.label, { fontWeight: "normal", paddingRight: 20 }]}>Have you ever been fined, received a caution, sentenced to imprisonment, placed on probation, discharged on payment of cost?*</Animatable.Text>

                    <Animatable.View animation="fadeInUp" style={{ marginLeft: 30, }}>

                        <RadioButton
                            setFirstValue={setPaymentYesValue}
                            firstValue={PaymentYes}
                            text1={"Yes"}
                            setSecondValue={setPaymentNoValue}
                            secondValue={PaymentNo}
                            text2={"No"}
                        />
                    </Animatable.View>
                    <Animatable.Text animation="fadeInUp" style={[styles.label, { fontWeight: "normal", paddingRight: 20 }]}>
                        Have you ever been fined, convicted, or had any order made against you by a criminal, civil or military court inside the UK?*</Animatable.Text>

                    <Animatable.View animation="fadeInUp" style={{ marginLeft: 30, }}>
                        <RadioButton
                            setFirstValue={setAgainstYesValue}
                            firstValue={AgainstYes}
                            text1={"Yes"}
                            setSecondValue={setAgainstNoValue}
                            secondValue={AgainstNo}
                            text2={"No"}
                        />
                    </Animatable.View>
                    <Animatable.Text animation="fadeInUp" style={[styles.label, { fontWeight: "normal", paddingRight: 20 }]}>
                        Are there any alleged offenses outstanding against you?*</Animatable.Text>

                    <Animatable.View animation="fadeInUp" style={{ marginLeft: 30, }}>

                        <RadioButton
                            setFirstValue={setDerivingYesValue}
                            firstValue={AllegedYes}
                            text1={"Yes"}
                            setSecondValue={setAllegedNoValue}
                            secondValue={AllegedNo}
                            text2={"No"}
                        />
                    </Animatable.View>
                    <Animatable.Text animation="fadeInUp" style={[styles.label, { fontWeight: "normal", paddingRight: 20 }]}>
                        Have you ever been fined, convicted, or had any order made
                        against you by a criminal, civil or military court outside the
                        UK?*</Animatable.Text>

                    <Animatable.View animation="fadeInUp" style={{ marginLeft: 30, }}>

                        <RadioButton
                            setFirstValue={setGoodYesValue}
                            firstValue={GoodYes}
                            text1={"Yes"}
                            setSecondValue={setGoodNoValue}
                            secondValue={GoodNo}
                            text2={"No"}
                        />
                    </Animatable.View>



                    <Animatable.View animation="fadeInUp" >

                        <TouchableOpacity style={styles.button} onPress={() => CrimeOffenses()}>
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


    },
    seperater: {
        height: 1,
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

});