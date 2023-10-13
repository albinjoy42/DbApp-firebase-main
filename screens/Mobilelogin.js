import React, { useState } from "react";
import Verifycode from "./Verifycode";
import Mobilenumber from "./Mobilenumber";
import auth from '@react-native-firebase/auth';
import { Alert,ActivityIndicator,View,StyleSheet } from "react-native";

export default function Mobilelogin({ navigation }) {
    const [confirm, setConfirm] = useState(null);
    const [loading, setLoading] = useState(false);
    const mobileLogin = async (phoneNumber) => {
        setLoading(true); // Set loading to true when sending verification
        auth().signInWithPhoneNumber('+91' + phoneNumber).then((res)=>{
            setConfirm(res)
            setLoading(false); // Set loading back to false
        })
        .catch((error)=>{
            console.log ("Error : ",error);
            setLoading(false); // Set loading back to false
        })
        
    }
    const confirmVerification = async (code) => {
        setLoading(true); // Set loading to true when sending verification
        try {
            await confirm.confirm(code);
            setLoading(false); // Set loading back to false
        }
        catch (error) {
            Alert.alert('Invalid code');
            setLoading(false); // Set loading back to false
            console.log('Error : ',error)
        }
    }

    if (loading) {
        return (
        <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#369"/>
        </View>
        )
    } else if (confirm) { return <Verifycode onSubmit={confirmVerification} /> }

    auth().onAuthStateChanged((user) => {
        if (loading) {
            return (
            <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#369"/>
            </View>
            )
        } else if (user) {
            setConfirm(null)
            navigation.navigate('Home');
        }
        else {
            if (confirm) {
                Alert.alert("Authentication failed");
            }
        }
    })

    return <Mobilenumber onSubmit={mobileLogin} />

}
const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the opacity as needed
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
});