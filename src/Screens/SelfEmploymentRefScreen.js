
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
import backGroundImage1 from '../Assets/Images/backGround4.png'
import logo from '../Assets/Images/logo.png'
import name from '../Assets/Icons/name.png'
import addresss from '../Assets/Icons/address.png'
import back from '../Assets/Icons/Arrr.png';
import nationalityy from '../Assets/Icons/nationality.png';
import card from '../Assets/Icons/crad.png';
import phone from '../Assets/Icons/phone.png';
import ocupation from '../Assets/Icons/ocupation.png';
import longLive from '../Assets/Icons/longLive.png';
import PostalCode from '../Assets/Icons/postalCode.png';
import { post,get } from "../utils/api";
import { _alert,_font, _toast, validateEmail } from '../utils/index';



import RadioButton from '../Compmonent/RadioButton'

import user from '../Assets/Icons/user.png'
import passwordd from '../Assets/Icons/password.png'
var validator = require("email-validator");
import { domain } from "../Api/Api";

import * as Animatable from 'react-native-animatable';
const screenWidth = Dimensions.get("window").width
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'


export default function SelfEmploymentRefScreen({ navigation,route }) {


    const [firstName1, setFirstName1] = useState("");
    const [Ocuppation1, setOcuppation1] = useState("");
    const [address1, setaddres1] = useState("");
    const [postalCode1, setpostalCode1] = useState("");
    const [phoneNumber1, setphoneNumber1] = useState("");
    const [email1, setemail1] = useState("");
    const [Known1, setknown1] = useState("");
    const [firstName2, setFirstName2] = useState("");
    const [Ocuppation2, setOcuppation2] = useState("");
    const [address2, setAddres2] = useState("");
    const [postalCode2, setpostalCode2] = useState("");
    const [Known2, setKnown2] = useState("");
    const [phoneNumber2, setPhoneNumber2] = useState("");
    const [email2, setemail2] = useState("");
    let [referanceYes, setReferanceYes] = useState(false);
    let [referanceNo, setReferanceNo] = useState(false);

    const [isAnimating, setAnimating] = useState(false);
    const [isDisabled, setDisabled] = useState(false);

    let [gender, setGender] = useState("Gender");

    Back = () => {
        navigation.goBack()
    }


    const SelfEmploymentScreen = async () => {


        if (firstName1.trim() === "") {
            _toast("Person Name One is required!");
            return
        }
        // else if  (Ocuppation1.trim() === "") {
        //     _toast("Occupation is required!.");
        //     return
        // }

        // else if (address1 === "") {
        //     _toast("Address is required!");
        //     return
        // }
        //     else if (postalCode1.trim() === "") {
        //         _toast("PostalCode is required!");
        //         return
        //     }
        //     else if (email1.trim() === "") {
        //         _toast("Email is required!");
        //         return
        //     }
        //     else if (Known1.trim() === "") {
        //         _toast("How long Known is required!");
        //         return
        //     }
        //     if (firstName2.trim() === "") {
        //         _toast("Person Name Two is required!");
        //         return
        //     }
        //     else if  (Ocuppation2.trim() === "") {
        //         _toast("Occupation is required!.");
        //         return
        //     }

        //     else if (address2 === "") {
        //         _toast("Address is required!");
        //         return
        //     }
        //         else if (postalCode2.trim() === "") {
        //             _toast("postalCode is required!");
        //             return
        //         }
        //         else if (email2.trim() === "") {
        //             _toast("Email is required!");
        //             return
        //         }
        //         else if (Known2.trim() === "") {
        //             _toast("How long Known is required!");
        //             return
        //         }



        else {
            SelfEmploymentRefScreen()
        }
    }




    const SelfEmploymentRefScreen = async () => {

        setAnimating(true)
        var data = {
            'token': route.params,
            'firstName1': firstName1,
            'Ocuppation1': Ocuppation1,
            'phoneNumber1': phoneNumber1,
            'postalCode1': postalCode1,
            'address1': address1,
            'Known1': Known1,
            'email1': email1,
            'firstName2': firstName2,
            'Ocuppation2': Ocuppation2,
            'phoneNumber2': phoneNumber2,
            'postalCode2': postalCode2,
            'address2': address2,
            'Known2': Known2,
            'address2': address2,
            'email2': email2,
            'self_emp': referanceYes,
        }
        //  console.log('data:',data)
        let result = await post(data, 'self_reference');
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
    const PostCodeChangeHandler1 = async (value) => {
        console.log(value)
        let result = await get(`post_code/${value}`);
        console.log('result3330', result.data)
        if (result.data.success) {
            //setMessage(result.data)
            setpostalCode1(value)
            _toast(result.data.success);
        } else {
            setAnimating(false)
            setpostalCode1('')
            _toast('PostCode not found');
        }
    }
    const PostCodeChangeHandler2 = async (value) => {
        console.log(value)
        let result = await get(`post_code/${value}`);
        console.log('result3330', result.data)
        if (result.data.success) {
            //setMessage(result.data)
            setpostalCode2(value)
            _toast(result.data.success);
        } else {
            setAnimating(false)
            setpostalCode2('')
            _toast('PostCode not found');
        }
    }



    Back = () => {
        navigation.goBack()
    }

    const setLisenceYesValue = () => {
        if (lisenceYes == true) {
            setLisenceYes(false)
            setLisenceNo(false)
        }
        else if (lisenceYes == false) {
            setLisenceYes(true)
            setLisenceNo(false)

        }

    }
    const setLisenceNoValue = () => {
        if (lisenceNo == true) {
            setLisenceYes(false)
            setLisenceNo(false)
        }
        else if (lisenceNo == false) {
            setLisenceYes(false)
            setLisenceNo(true)

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
                        <Text style={[styles.label, { marginLeft: 0, fontSize: 16 }]}>Self Employment References</Text>
                    </Animatable.View>

                    <Text style={[styles.label, { marginLeft: 0, fontSize: 16, textAlign: "left", marginLeft: 30 }]}>Person One</Text>
                    <Animatable.Text animation="fadeInUp" style={styles.label}>Name</Animatable.Text>
                    <Animatable.View animation="fadeInUp" style={{ flexDirection: 'row', alignItems: "center" }} >
                        <Image source={name} style={{ height: 18, width: '5%', marginLeft: 30, marginRight: 10 }}></Image>

                        <TextInput
                            style={styles.textField}
                            placeholder='FirstName'
                            placeholderTextColor='#d5c9de'
                            onChangeText={(val) => setFirstName1(val)}
                        >
                        </TextInput>

                    </Animatable.View>


                    <Animatable.View animation="fadeInUp" style={styles.seperater}></Animatable.View>

                    <Animatable.Text animation="fadeInUp" style={styles.label}>Occupation</Animatable.Text>
                    <Animatable.View animation="fadeInUp" style={{ flexDirection: 'row', alignItems: "center" }} >
                        <Image source={ocupation} style={{ height: 18, width: '5%', marginLeft: 30, marginRight: 10 }}></Image>

                        <TextInput
                            style={styles.textField}
                            placeholder='Occupation'
                            placeholderTextColor='#d5c9de'
                            onChangeText={(val) => setOcuppation1(val)}
                        >
                        </TextInput>

                    </Animatable.View>


                    <Animatable.View animation="fadeInUp" style={styles.seperater}></Animatable.View>

                    <Animatable.Text animation="fadeInUp" style={styles.label}>Phone Number</Animatable.Text>
                    <Animatable.View animation="fadeInUp" style={{ flexDirection: 'row', alignItems: "center" }} >
                        <Image source={phone} style={{ height: 18, width: '5%', marginLeft: 30, marginRight: 10 }}></Image>

                        <TextInput
                            style={styles.textField}
                            placeholder='Phone Number'
                            placeholderTextColor='#d5c9de'
                            keyboardType='decimal-pad'
                            onChangeText={(val) => setphoneNumber1(val)}
                        >
                        </TextInput>

                    </Animatable.View>


                    <Animatable.View animation="fadeInUp" style={styles.seperater}></Animatable.View>
                    <Animatable.Text animation="fadeInUp" style={styles.label}>Address</Animatable.Text>
                    <Animatable.View animation="fadeInUp" style={{ flexDirection: 'row', alignItems: "center" }} >
                        <Image source={addresss} style={{ height: 18, width: '5%', marginLeft: 30, marginRight: 10 }}></Image>

                        <TextInput
                            style={styles.textField}
                            placeholder='Address'
                            placeholderTextColor='#d5c9de'
                            onChangeText={(val) => setaddres1(val)}
                        >
                        </TextInput>

                    </Animatable.View>


                    <Animatable.View animation="fadeInUp" style={styles.seperater}></Animatable.View>
                    <Animatable.Text animation="fadeInUp" style={styles.label}>Post Code</Animatable.Text>
                    <Animatable.View animation="fadeInUp" style={{ flexDirection: 'row', alignItems: "center" }} >
                        <Image source={PostalCode} style={{ height: 18, width: '5%', marginLeft: 30, marginRight: 10 }}></Image>

                        <TextInput
                            style={styles.textField}
                            placeholder='Post Code'
                            placeholderTextColor='#d5c9de'
                            // keyboardType='decimal-pad'
                            onChangeText={(val) => PostCodeChangeHandler1(val)}
                        >
                        </TextInput>

                    </Animatable.View>
                    <Animatable.View animation="fadeInUp" style={styles.seperater}></Animatable.View>
                    <Animatable.Text animation="fadeInUp" style={styles.label}>Email</Animatable.Text>
                    <Animatable.View animation="fadeInUp" style={{ flexDirection: 'row', alignItems: "center" }} >
                        <Image source={user} style={{ height: 18, width: '5%', marginLeft: 30, marginRight: 10 }}></Image>

                        <TextInput
                            style={styles.textField}
                            placeholder='jhondoe@gmail.com'
                            placeholderTextColor='#d5c9de'
                            onChangeText={(val) => setemail1(val)}
                            // value={email}
                            keyboardType={'email-address'}
                            autoCapitalize={'none'}
                            textContentType={"name"}>
                        </TextInput>

                    </Animatable.View>
                    <Animatable.View animation="fadeInUp" style={styles.seperater}></Animatable.View>
                    <Animatable.Text animation="fadeInUp" style={styles.label}>How long Known?</Animatable.Text>
                    <Animatable.View animation="fadeInUp" style={{ flexDirection: 'row', alignItems: "center" }} >
                        <Image source={longLive} style={{ height: 18, width: '5%', marginLeft: 30, marginRight: 10 }}></Image>
                        <TextInput
                            style={styles.textField}
                            placeholder='How long Known?'
                            placeholderTextColor='#d5c9de'
                            onChangeText={(val) => setknown1(val)}
                        >
                        </TextInput>
                    </Animatable.View>
                    <Animatable.View animation="fadeInUp" style={styles.seperater}></Animatable.View>
                    <Text style={[styles.label, { marginLeft: 0, fontSize: 16, textAlign: "left", marginLeft: 30, marginTop: 30 }]}>Person Two</Text>
                    <Animatable.Text animation="fadeInUp" style={styles.label}>Name</Animatable.Text>
                    <Animatable.View animation="fadeInUp" style={{ flexDirection: 'row', alignItems: "center" }} >
                        <Image source={name} style={{ height: 18, width: '5%', marginLeft: 30, marginRight: 10 }}></Image>
                        <TextInput
                            style={styles.textField}
                            placeholder='FirstName'
                            placeholderTextColor='#d5c9de'
                            onChangeText={(val) => setFirstName2(val)}
                        >
                        </TextInput>

                    </Animatable.View>


                    <Animatable.View animation="fadeInUp" style={styles.seperater}></Animatable.View>

                    <Animatable.Text animation="fadeInUp" style={styles.label}>Occupation</Animatable.Text>
                    <Animatable.View animation="fadeInUp" style={{ flexDirection: 'row', alignItems: "center" }} >
                        <Image source={ocupation} style={{ height: 18, width: '5%', marginLeft: 30, marginRight: 10 }}></Image>

                        <TextInput
                            style={styles.textField}
                            placeholder='Occupation'
                            placeholderTextColor='#d5c9de'
                            onChangeText={(val) => setOcuppation2(val)}
                        >
                        </TextInput>

                    </Animatable.View>


                    <Animatable.View animation="fadeInUp" style={styles.seperater}></Animatable.View>

                    <Animatable.Text animation="fadeInUp" style={styles.label}>Phone Number</Animatable.Text>
                    <Animatable.View animation="fadeInUp" style={{ flexDirection: 'row', alignItems: "center" }} >
                        <Image source={phone} style={{ height: 18, width: '5%', marginLeft: 30, marginRight: 10 }}></Image>

                        <TextInput
                            style={styles.textField}
                            placeholder='Phone Number'
                            placeholderTextColor='#d5c9de'
                            keyboardType='decimal-pad'
                            onChangeText={(val) => setPhoneNumber2(val)}
                        >
                        </TextInput>

                    </Animatable.View>


                    <Animatable.View animation="fadeInUp" style={styles.seperater}></Animatable.View>
                    <Animatable.Text animation="fadeInUp" style={styles.label}>Address</Animatable.Text>
                    <Animatable.View animation="fadeInUp" style={{ flexDirection: 'row', alignItems: "center" }} >
                        <Image source={addresss} style={{ height: 18, width: '5%', marginLeft: 30, marginRight: 10 }}></Image>

                        <TextInput
                            style={styles.textField}
                            placeholder='Address'
                            placeholderTextColor='#d5c9de'
                            onChangeText={(val) => setAddres2(val)}
                        >
                        </TextInput>

                    </Animatable.View>


                    <Animatable.View animation="fadeInUp" style={styles.seperater}></Animatable.View>
                    <Animatable.Text animation="fadeInUp" style={styles.label}>Post Code</Animatable.Text>
                    <Animatable.View animation="fadeInUp" style={{ flexDirection: 'row', alignItems: "center" }} >
                        <Image source={PostalCode} style={{ height: 18, width: '5%', marginLeft: 30, marginRight: 10 }}></Image>

                        <TextInput
                            style={styles.textField}
                            placeholder='Post Code'
                            placeholderTextColor='#d5c9de'
                            // keyboardType='decimal-pad'
                            onChangeText={(val) => PostCodeChangeHandler2(val)}
                        >
                        </TextInput>


                    </Animatable.View>
                    <Animatable.View animation="fadeInUp" style={styles.seperater}></Animatable.View>
                    <Animatable.Text animation="fadeInUp" style={styles.label}>Email</Animatable.Text>
                    <Animatable.View animation="fadeInUp" style={{ flexDirection: 'row', alignItems: "center" }} >
                        <Image source={user} style={{ height: 18, width: '5%', marginLeft: 30, marginRight: 10 }}></Image>

                        <TextInput
                            style={styles.textField}
                            placeholder='jhondoe@gmail.com'
                            placeholderTextColor='#d5c9de'
                            onChangeText={(val) => setemail2(val)}
                            // value={email}
                            keyboardType={'email-address'}
                            autoCapitalize={'none'}
                            textContentType={"name"}>
                        </TextInput>

                    </Animatable.View>

                    <Animatable.View animation="fadeInUp" style={styles.seperater}></Animatable.View>
                    <Animatable.Text animation="fadeInUp" style={styles.label}>How long Known?</Animatable.Text>
                    <Animatable.View animation="fadeInUp" style={{ flexDirection: 'row', alignItems: "center" }} >
                        <Image source={longLive} style={{ height: 18, width: '5%', marginLeft: 30, marginRight: 10 }}></Image>

                        <TextInput
                            style={styles.textField}
                            placeholder='How long Known?'
                            placeholderTextColor='#d5c9de'
                            onChangeText={(val) => setKnown2(val)}
                        >
                        </TextInput>

                    </Animatable.View>


                    <Animatable.View animation="fadeInUp" style={styles.seperater}></Animatable.View>

                    <Animatable.Text animation="fadeInUp" style={[styles.label, { fontWeight: "normal" }]}>Self employment references</Animatable.Text>

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


                    <Animatable.View animation="fadeInUp" >

                        <TouchableOpacity style={styles.button} onPress={() => SelfEmploymentScreen()}  >
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
        marginBottom: 10,
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