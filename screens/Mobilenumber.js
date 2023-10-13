import React, { useState } from "react";
import { View, StyleSheet, TextInput, Button,Text } from "react-native";

function Mobilenumber(props) {
    const [phoneNumber, setphoneNumber] = useState(null)
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Enter your mobile number</Text>
            <TextInput autoFocus
            value={phoneNumber}
                onChangeText={setphoneNumber}
                style={styles.textbox}
                keyboardType="numeric"
                maxLength={10}
            />
            <Button title="Get OTP" onPress={()=>props.onSubmit(phoneNumber)}/>
        </View>
    )
}
export default Mobilenumber
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textbox: {
        width: 300,
        height: 45,
        borderRadius: 9,
        borderColor: '#888',
        borderWidth: 1,
        color: '#000',
        marginBottom: 20
    },
    text : {
        color:'#000',
        fontSize:16,
        marginBottom:10
    }
}
)
