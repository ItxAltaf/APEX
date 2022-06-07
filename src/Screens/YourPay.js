import React, { useState, useEffect, useContext, useRef } from "react";
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    Image,
    TextInput
} from 'react-native';
import back from '../Assets/Icons/Arrr.png';
import * as Animatable from 'react-native-animatable';
import Visa from '../Assets/Icons/visa.png';
import CalenderDate from '../Assets/Icons/calendardate.png';
import PayCase from '../Assets/Icons/paycase.png';
import WorkedProfile from '../Assets/Icons/profile.png';
import AsyncStorage from '@react-native-community/async-storage';

import { get } from '../utils/api';
import { _alert, _font, _toast } from '../utils/index';

function YourPay({ navigation }) {
    const [isAnimating, setAnimating] = useState(false);

    const [PayData, setPayData] = useState([]);
    const [worked, setworked] = useState([]);
    const [PendingInvite, setPendingInvite] = useState([]);
    const [PendingBalance, setPendingBalance] = useState([]);
    const [Balnce, setBalnce] = useState();
    const [BalnceGraph, setBalnceGraph] = useState();

    Back = () => {
        navigation.goBack()
    }
    useEffect(() => {
        GetPay();
    }, []);
    const GetPay = async () => {
        let usertoken = JSON.parse(await AsyncStorage.getItem('login_token'));
        console.log(usertoken)
        setAnimating(true)
        let result = await get(`pay?token=${usertoken}`);
        // console.log('result3330', result.data)
        if (result.success) {
            setPayData(result.data)
            setworked(result.data.worked[0])
            setPendingInvite(result.data.pending_invite[0])
            setPendingBalance(result.data.pending_balance[0])
            let sum = result.data.balance.reduce((accumulator, current) => accumulator + current.balance, 0)
            console.log(sum)
            setBalnce(sum)
            setAnimating(false)
        } else {
            setAnimating(false)
            _toast('something went wrong');
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#1FC7B2" />


            <View style={{ width: "100%", backgroundColor: "#1FC7B2", flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity style={styles.back} styles={{ width: "15%" }} onPress={() => { Back() }}>
                    <Image source={back} style={styles.backIcon}></Image>
                </TouchableOpacity>
                <Text style={{ color: 'white', fontSize: 20, fontWeight: "bold" }}>Your Pay</Text>
            </View>


            <View style={{ backgroundColor: '#F2F2F5', flex: 1, }}>


                <ScrollView keyboardShouldPersistTaps="handled" >


                    <View style={{ width: "100%", backgroundColor: "#1FC7B2", height: 80 }}>

                    </View>

                    <View style={{ width: '90%', flexDirection: 'row', marginLeft: '5%', justifyContent: 'space-around', marginTop: -40 }}>

                        <Animatable.View style={{ width: '45%', backgroundColor: '#1d7dc7', paddingBottom: '4%', borderRadius: 6 }}>
                            <View style={{ flexDirection: 'row', marginTop: '5%' }}>
                                <Image style={{ tintColor: 'white', height: 16, width: 16, marginLeft: '5%', marginRight: '5%', marginTop: '1%' }} source={CalenderDate} />
                                <Text style={{ color: 'white', fontSize: 16 }}>Today</Text>
                            </View>
                            <Text style={{ color: 'white', fontSize: 20, marginTop: '5%', marginLeft: '5%' }}>£{Balnce}</Text>
                        </Animatable.View>
                        <Animatable.View style={{ width: '45%', backgroundColor: '#f1706e', paddingBottom: '4%', borderRadius: 6 }}>
                            <View style={{ flexDirection: 'row', marginTop: '5%' }}>
                                <Image style={{ tintColor: 'white', height: 16, width: 16, marginLeft: '5%', marginRight: '5%', marginTop: '1%' }} source={CalenderDate} />
                                <Text style={{ color: 'white', fontSize: 16 }}>Pendings</Text>
                            </View>
                            <Text style={{ color: 'white', fontSize: 20, marginTop: '5%', marginLeft: '5%' }}>£{PendingBalance.pending_balance == null ? 0 : PendingBalance.pending_balance}</Text>
                        </Animatable.View>
                    </View>

                    <View style={{ width: '90%', flexDirection: 'row', marginLeft: '5%', justifyContent: 'space-around', marginTop: '5%' }}>
                        <Animatable.View style={{ width: '45%', backgroundColor: '#16d5c4', paddingBottom: '4%', borderRadius: 6 }}>
                            <View style={{ flexDirection: 'row', marginTop: '5%' }}>
                                <Image style={{ tintColor: 'white', height: 16, width: 16, marginLeft: '5%', marginRight: '5%', marginTop: '1%' }} source={PayCase} />
                                <Text style={{ color: 'white', fontSize: 14 }}>Pending Invites</Text>
                            </View>
                            <Text style={{ color: 'white', fontSize: 20, marginTop: '5%', marginLeft: '5%' }}>{PendingInvite.pending_invite}</Text>
                        </Animatable.View>

                        <Animatable.View style={{ width: '45%', backgroundColor: '#28d4f2', paddingBottom: '4%', borderRadius: 6 }}>
                            <View style={{ flexDirection: 'row', marginTop: '5%' }}>
                                <Image style={{ tintColor: 'white', height: 16, width: 16, marginLeft: '5%', marginRight: '5%', marginTop: '1%' }} source={WorkedProfile} />
                                <Text style={{ color: 'white', fontSize: 16 }}>Worked</Text>
                            </View>
                            <Text style={{ color: 'white', fontSize: 20, marginTop: '5%', marginLeft: '5%' }}>{worked.worked}</Text>
                        </Animatable.View>
                    </View>
                    <View style={[{ width: '90%', marginLeft: '5%', marginTop: '5%', backgroundColor: 'white', paddingBottom: '5%', borderRadius: 15 }, styles.shadStyle]}>
                        <View style={{ flexDirection: 'row', marginTop: '5%' }}>
                            <Image style={{ marginLeft: '5%', marginRight: '5%' }} source={Visa} />
                            <Text style={{ color: 'black', fontSize: 20 }}>Referral Amount</Text>
                        </View>
                        <Text style={{ color: '#34c4ef', fontSize: 20, marginTop: '2%', marginLeft: '5%', fontWeight: 'bold' }}>£4800</Text>

                        <TextInput
                            placeholder="12345678"
                            style={{ alignSelf: 'center', backgroundColor: '#dbdbdb', width: '80%', borderRadius: 10, textAlign: 'center', marginTop: '5%', height: 40, color:"black", }}
                        />
                        <TouchableOpacity
                            onPress={() => navigation.navigate('AddExperience')}
                            style={{ borderRadius: 15, width: '60%', backgroundColor: '#1dc7b1', alignSelf: 'center', marginTop: '7%', height: 40, justifyContent: 'center' }}>
                            <Text style={{ textAlign: 'center', color: 'white' }}>SHARE NOW</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={{ marginTop: '5%', marginLeft: '5%', fontSize: 20 }}>My Bank</Text>
                    <View style={[{ width: '90%', marginLeft: '5%', backgroundColor: 'white', marginTop: '3%', paddingBottom: '5%', borderRadius: 15 }, styles.shadStyle]}>
                        <View style={{ flexDirection: 'row', marginTop: '5%' }}>
                            <Image style={{ marginLeft: '5%', marginRight: '5%' }} source={Visa} />
                            <Text style={{ color: 'black', fontSize: 20 }}>Visa Card</Text>
                        </View>
                        <Text style={{ color: '#828282', fontSize: 16, marginTop: '2%', marginLeft: '5%', }}>
                            is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using '
                        </Text>
                    </View>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('Vetting')}
                        style={{ borderRadius: 15, width: '85%', backgroundColor: '#1dc7b1', alignSelf: 'center', marginTop: '7%', height: 40, justifyContent: 'center', marginBottom: '15%' }}>
                        <Text style={{ textAlign: 'center', color: 'white' }}>WITHDRAW NOW</Text>
                    </TouchableOpacity>

                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
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
    container: {
        flex: 1,
        backgroundColor: "#1FC7B2",
        alignContent: 'center',
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
})

export default YourPay;