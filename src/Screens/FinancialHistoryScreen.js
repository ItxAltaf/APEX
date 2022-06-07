import React, { useState } from 'react';
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
     BackHandler, SafeAreaView, KeyboardAvoidingView,
    Button
} from 'react-native';
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
import DocumentPicker from 'react-native-document-picker';
import { post } from "../utils/api";
import { _alert, images, WIDTH, HEIGHT, colours, _font, _toast, validateEmail } from '../utils/index';


function FinancialHistory({ navigation,route }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddres] = useState("");
    const [nationality, setNationality] = useState("");
    const [cardnumber, setcardnumber] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const [isAnimating, setAnimating] = useState(false);
    const [isDisabled, setDisabled] = useState(false);
    let [male, setMale] = useState(false);
    let [female, setFemale] = useState(false);
    let [gender, setGender] = useState("Gender");
    let [ProceedingsYes, setProceedingsYes] = useState(false);
    let [ProceedingsNo, setProceedingsNo] = useState(false);
    let [bankruptcyYes, setbankruptcyYes] = useState(false);
    let [bankruptcyNo, setbankruptcyNo] = useState(false);
    let [AttatchmentYes, setAttatchmentYes] = useState(false);
    let [AttatchmentNo, setAttatchmentNo] = useState(false);
    let [singleFile, setSingleFile] = useState(null);
    let [singleFile1, setSingleFile1] = useState(null);
    let [singleFile2, setSingleFile2] = useState(null);
    let [singleFile3, setSingleFile3] = useState(null);

    const FinancialHistory = async () => {
        //    var data = new FormData();
        //     data.append("criminal_outside", PaymentYes)
        //     data.append("criminal_alleged", AgainstYes)
        //     data.append("criminal_inside", AllegedYes)
        //     data.append("scriminal_sentence", GoodYes)
        //     data.append("token",770)
        const fileToUpload = singleFile;
        var data = {
            'token': route.params,
            'financial_attachment': ProceedingsYes,
            'financial_bankrupt': bankruptcyYes,
            'financial_ccj': AttatchmentYes,
            'uploadedFile': fileToUpload,

        };
        console.log('CrimeOffenses', data)

        let result = await post(data, 'financial');
        console.log('result1111', result)
        if (result.status) {
            setAnimating(false)
            _toast('Success')
            navigation.goBack()
            // navigation.dispatch({
            //     ...CommonActions.reset({
            //         index: 0,
            //         routes: [{ name: 'signIn' }],
            //     }),
            // })
        } else {
            setAnimating(false)
            _toast('something went wrong!')
        }

    }
    let selectFile = async (obj) => {
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
            obj(res);
        } catch (err) {
            obj(null);
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
  const  setAttecmentYesValue = () => {
        if (AttatchmentYes == true) {
            setAttatchmentYes(false)
            setAttatchmentNo(false)

        }
        else if (AttatchmentYes == false) {
            setAttatchmentYes(true)
            setAttatchmentNo(false)

        }

    }
   const setAttecmentNoValue = () => {

        if (AttatchmentNo == true) {
            setAttatchmentYes(false)
            setAttatchmentNo(false)

        }
        else if (AttatchmentNo == false) {
            setAttatchmentYes(false)
            setAttatchmentNo(true)

        }

    }


   const setbankruptcyYesValue = () => {
        if (bankruptcyYes == true) {
            setbankruptcyYes(false)
            setbankruptcyNo(false)

        }
        else if (bankruptcyYes == false) {
            setbankruptcyYes(true)
            setbankruptcyNo(false)

        }

    }
   const setbankruptcyNoValue = () => {

        if (bankruptcyNo == true) {
            setbankruptcyYes(false)
            setbankruptcyNo(false)

        }
        else if (bankruptcyNo == false) {
            setbankruptcyYes(false)
            setbankruptcyNo(true)

        }

    }

  const  setProceedingsYesValue = () => {
        if (ProceedingsYes == true) {
            setProceedingsYes(false)
            setProceedingsNo(false)

        }
        else if (ProceedingsYes == false) {
            setProceedingsYes(true)
            setProceedingsNo(false)

        }

    }

  const  setProceedingsNoValue = () => {

        if (ProceedingsNo == true) {
            setProceedingsYes(false)
            setProceedingsNo(false)

        }
        else if (ProceedingsNo == false) {
            setProceedingsYes(false)
            setProceedingsNo(true)

        }

    }

    Back = () => {
        navigation.goBack()
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#1FC7B2" />
            <View style={{ width: "100%", backgroundColor: '#1FC7B2' }}>
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
                <View style={{ backgroundColor: 'white', paddingBottom: '4%' }}>
                    <Animatable.View animation="fadeInUp" style={{ backgroundColor: "white" }} >

                        <Image source={logo} style={styles.logo}></Image>
                        <Animatable.View style={[styles.bottomView, { marginTop: 0 }]} animation="fadeIn" >
                            <Text style={[styles.label, { marginLeft: 0, }]}>Financial History</Text>
                        </Animatable.View>
                    </Animatable.View>
                    <View style={{ width: '90%', marginLeft: '5%', backgroundColor: 'white', marginTop: '5%' }}>
                        <Text style={{ fontSize: 15 }}>Have you any oustanding attachment to earning?</Text>
                        <Animatable.View animation="fadeInUp" style={{}}>

                            <RadioButton
                                setFirstValue={setAttecmentYesValue}
                                firstValue={AttatchmentYes}
                                text1={"Yes"}
                                setSecondValue={setAttecmentNoValue}
                                secondValue={AttatchmentNo}
                                text2={"No"}
                            />
                        </Animatable.View>
                    </View>

                    <View style={{ width: '90%', marginLeft: '5%', backgroundColor: 'white', marginTop: '5%' }}>
                        <Text style={{ fontSize: 15 }}>Do you have any bankcrupcy order or any voluntary arrangements?</Text>
                        <Animatable.View animation="fadeInUp" style={{}}>

                            <RadioButton
                                setFirstValue={setbankruptcyYesValue}
                                firstValue={bankruptcyYes}
                                text1={"Yes"}
                                setSecondValue={setbankruptcyNoValue}
                                secondValue={bankruptcyNo}
                                text2={"No"}
                            />
                        </Animatable.View>
                    </View>

                    <View style={{ width: '90%', marginLeft: '5%', backgroundColor: 'white', marginTop: '5%' }}>
                        <Text style={{ fontSize: 15 }}>Are you the subject of any country court proceedings(CCJs)?</Text>
                        <Animatable.View animation="fadeInUp" style={{}}>

                            <RadioButton

                                setFirstValue={setProceedingsYesValue}
                                firstValue={ProceedingsYes}
                                text1={"Yes"}
                                setSecondValue={setProceedingsNoValue}
                                secondValue={ProceedingsNo}
                                text2={"No"}
                            />
                        </Animatable.View>
                    </View>

                    <TouchableOpacity onPress={ ()=> {selectFile(setSingleFile1)}}>

                    <View style={[{ marginTop: '4%', borderRadius: 10, width: '90%', marginLeft: '5%', flexDirection: 'row', alignItems: "center", justifyContent: "space-between", backgroundColor: 'white', elevation: 5, height: 40 }, styles.shadStyle]} >
                        <View style={{ flexDirection: 'row' }}>
                            <Image source={paycase} style={{ alignSelf: 'center', height: 15, width: 15, marginLeft: 15, marginRight: 10 }}></Image>

                     <Text>{singleFile1?singleFile1.name:'Add Job History'} </Text>
                         
                        </View>
                        <Image style={{ width: 10, height: 10, marginRight: 15 }} source={require('../Assets/Icons/plus.png')}
                         onPress={() => selectFile(setSingleFile1)}
                          />
                    </View>


                       <TouchableOpacity onPress={ ()=> {selectFile(setSingleFile2)}}>
                        <View style={[{ marginTop: '4%', borderRadius: 10, width: '90%', marginLeft: '5%', flexDirection: 'row', alignItems: "center", backgroundColor: 'white', justifyContent: "space-between", elevation: 5, height: 40 }, styles.shadStyle]} >
                            <View style={{ flexDirection: 'row' }}>
                                <Image source={require('../Assets/Icons/document.png')} style={{ alignSelf: 'center', height: 15, width: 15, marginLeft: 15, marginRight: 10 }}></Image>

                     <Text>{singleFile2?singleFile2.name:'Attach Document'} </Text>
                               
                            </View>
                            <Image style={{ width: 10, height: 10, marginRight: 15 }} source={require('../Assets/Icons/attchdoc.png')}
                             onPress={() => selectFile(setSingleFile2)}
                            />
                        </View>
                        </TouchableOpacity>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={ ()=> {selectFile(setSingleFile3)}}>
                    <View style={[{ marginTop: '4%', borderRadius: 10, width: '90%', marginLeft: '5%', flexDirection: 'row', alignItems: "center", backgroundColor: 'white', justifyContent: "space-between", elevation: 5, height: 40 }, styles.shadStyle]} >
                        <View style={{ flexDirection: 'row' }}>
                            <Image source={paycase} style={{ alignSelf: 'center', height: 15, width: 15, marginLeft: 15, marginRight: 10 }}></Image>

                    <Text>{singleFile3?singleFile3.name:'Declaration'} </Text>
                           
                        </View>
                        <Image style={{ width: 10, height: 10, marginRight: 15 }} source={require('../Assets/Icons/plus.png')} />
                    </View>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', width: '90%', marginLeft: '5%', marginTop: '10%' }}>
                        <Image source={require('../Assets/Icons/checked.png')} style={{
                            width: 15, height: 15 }}
                            onPress={() => selectFile(setSingleFile3)}
                            />
                        <Text style={{ fontSize: 15, marginLeft: 4 }}>Lorem Ipsum is has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled</Text>
                    </View>

                    <Animatable.View animation="fadeInUp" >

                        <TouchableOpacity style={styles.button} onPress={() => FinancialHistory()}  >
                            <Text style={styles.buttonText}>CONFIRM</Text>
                        </TouchableOpacity>
                    </Animatable.View>


                    <View style={{ height: 100 }}></View>
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
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
export default FinancialHistory;