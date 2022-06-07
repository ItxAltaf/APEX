import React, { useState, useEffect, useContext, useRef } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView, FlatList,
    ScrollView,
    Image,
    StyleSheet,
    StatusBar
} from 'react-native';
import back from '../Assets/Icons/Arrr.png';
import next from '../Assets/Icons/next.png';
import goldNoti from '../Assets/Icons/goldNoti.png';
import { get, post } from "../utils/api";
import { _alert, images, WIDTH, HEIGHT, colours, _font, _toast, validateEmail } from '../utils/index';
import address from '../Assets/Icons/location.png'
import add from '../Assets/Icons/add.png'
function AddSkills({ navigation, route }) {
    const [SkilLList, setSkilList] = useState([]);
    useEffect(() => {
        Submit()
        //alert('ok')
    }, [])
    const Submit = async () => {

        let result = await get(`all_skill_location`);
        console.log('result3330', result.data)
        if (result.success) {
            setSkilList(result.data.skills)
            // setAnimating(false)
        } else {
            // setAnimating(false)
            _toast('something went wrong');
        }
    }
    const Adddata = async (Id) => {
        // setAnimating(true)
        var data = {
            token: route.params.UToken,
            id: Id,
            action: 'add',
            type: "skills"
        }
        console.log(data, "apiData")
        let result = await post(data, 'add_skill');
        console.log('result1111', result)
        if (result.status) {
            // setAnimating(false)
            _toast('Skills Added')


        }
    }
    Back = () => {
        navigation.goBack()
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#1FC7B2" />
            <View style={{ width: "100%", backgroundColor: "#1FC7B2", flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity style={styles.back} styles={{ width: "15%" }} onPress={() => { Back() }}>
                    <Image source={back} style={styles.backIcon}></Image>
                </TouchableOpacity>
                <Text style={{ color: 'white', fontSize: 18 }}>Add Skill</Text>
            </View>

            <View style={{ flex: 1, width: "100%", backgroundColor: "#f5f5f5" }}>
                <View style={{ flex: 1, width: "100%", }}>
                    <View style={{ width: "90%", alignSelf: "center", flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, marginTop: 20 }}>

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

                                    <View style={{ alignItems: 'center', flexDirection: 'row', flex: 1 }}>
                                        <Image source={address}
                                            style={{ width: 25, height: 25, marginHorizontal: 5 }}
                                        />
                                        <Text style={{ fontSize: 13, color: "black" }}>{item.skill_name}</Text>
                                    </View>
                                    <View style={{ flex: 1, margin: 17 }}>
                                        <TouchableOpacity style={{ paddingLeft: 120 }} onPress={() => Adddata(item.id)}  >
                                            <Image source={add} style={{ marginHorizontal: 5, width: 15, height: 15, }} />
                                        </TouchableOpacity>

                                    </View>

                                </View>

                            </TouchableOpacity>


                        )}
                    />

                </View>
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
    seperater: {
        height: 1,
        marginLeft: 20,
        marginRight: 30,
        marginBottom: 10,
        backgroundColor: '#d5c9de',
    },
});

export default AddSkills;