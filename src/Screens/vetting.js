import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    Image,
    StyleSheet,
    StatusBar
} from 'react-native';
import back from '../Assets/Icons/Arrr.png';
import next from '../Assets/Icons/next.png';

function Vetting({ navigation ,route}) {
    Back = () => {
        navigation.goBack()
    }

    const goToNextScreen = (root) => {
        navigation.navigate(root,route.params.UToken)
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#1FC7B2" />
            <View style={{ width: "100%", backgroundColor: "#1FC7B2", flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity style={styles.back} styles={{ width: "15%" }} onPress={() => { Back() }}>
                    <Image source={back} style={styles.backIcon}></Image>
                </TouchableOpacity>
                <Text style={{ color: 'white', fontSize: 18 }}>Vetting</Text>
            </View>
            <View style={{ backgroundColor: '#F2F2F5', flex: 1, }}>
                <ScrollView keyboardShouldPersistTaps="handled">
                    <TouchableOpacity  >
                        <View style={{ width: '90%', marginTop: '5%', flexDirection: 'row', justifyContent: 'space-between', marginLeft: '5%' }}>
                            <Text style={{ fontSize: 16, color: '#1dc6b0', fontWeight: 'bold' }}>Required Steps</Text>
                            <Text style={{ fontSize: 14, color: 'red' }}>Clear All</Text>
                        </View>
                        <View style={[styles.seperater, { width: '100%', marginLeft: 0, marginRight: 0, marginTop: '4%' }]} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => goToNextScreen("TwoPersonalCharScreen")}>

                        <View style={{ marginTop: '5%', width: '90%', marginLeft: '5%', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View>
                                <Text style={{ color: '#1dc6b0' }}>Next Step</Text>
                                <Text style={{ fontWeight: 'bold', marginVertical: '2%' }}>Two Personal Character References</Text>
                                <Text>Required step for Job</Text>
                            </View>
                            <Image source={next} style={{ width: 15, height: 15, tintColor: '#1dc6b0', alignSelf: 'center' }} />
                        </View>
                        <View style={[styles.seperater, { marginTop: '3%' }]} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => goToNextScreen("SelfEmploymentRefScreen")}>

                        <View style={{ marginTop: '5%', width: '90%', marginLeft: '5%', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View>
                                <Text style={{ color: '#1dc6b0' }}>Next Step</Text>
                                <Text style={{ fontWeight: 'bold', marginVertical: '2%' }}>Self Employment References</Text>
                                <Text>Required step to security</Text>
                            </View>
                            <Image source={next} style={{ width: 15, height: 15, tintColor: '#1dc6b0', alignSelf: 'center' }} />
                        </View>
                        <View style={[styles.seperater, { marginTop: '3%' }]} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => goToNextScreen("CriminalOffensesScreen")}>

                        <View style={{ marginTop: '5%', width: '90%', marginLeft: '5%', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View>
                                <Text style={{ color: '#1dc6b0' }}>Next Step</Text>
                                <Text style={{ fontWeight: 'bold', marginVertical: '2%' }}>Criminal Offenses, Cautions E.T.C</Text>
                                <Text>Required step to security</Text>
                            </View>
                            <Image source={next} style={{ width: 15, height: 15, tintColor: '#1dc6b0', alignSelf: 'center' }} />
                        </View>
                        <View style={[styles.seperater, { marginTop: '3%' }]} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => goToNextScreen("AddExperianceScreen")}>

                        <View style={{ marginTop: '5%', width: '90%', marginLeft: '5%', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View>
                                <Text style={{ color: '#1dc6b0' }}>Next Step</Text>
                                <Text style={{ fontWeight: 'bold', marginVertical: '2%' }}>Add More Experience</Text>
                                <Text>Required step to security</Text>
                            </View>
                            <Image source={next} style={{ width: 15, height: 15, tintColor: '#1dc6b0', alignSelf: 'center' }} />
                        </View>
                        <View style={[styles.seperater, { marginTop: '3%' }]} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => goToNextScreen("FinancialHistoryScreen")}>

                        <View style={{ marginTop: '3%', width: '90%', marginLeft: '5%', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View>
                                <Text style={{ color: '#1dc6b0' }}>Next Step</Text>
                                <Text style={{ fontWeight: 'bold', marginVertical: '2%' }}>Financial History</Text>
                                <Text>Required step to security</Text>
                            </View>
                            <Image source={next} style={{ width: 15, height: 15, tintColor: '#1dc6b0', alignSelf: 'center' }} />
                        </View>
                        <View style={[styles.seperater, { marginTop: '3%' }]} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('ChangeShift')}
                        style={{ borderRadius: 15, width: '85%', backgroundColor: '#1dc7b1', alignSelf: 'center', marginTop: '5%', height: 40, justifyContent: 'center', marginBottom: '15%' }}>
                        <Text style={{ textAlign: 'center', color: 'white' }}>APPLY NOW</Text>
                    </TouchableOpacity>

                </ScrollView>
            </View>

        </SafeAreaView >
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

export default Vetting;