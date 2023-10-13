import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet, ActivityIndicator } from "react-native";
function Verifycode(props) {
    const [code, setCode] = useState("");
    return (
        <View style={styles.container}>
            <Text style={{color:'black'}}>Enter your OTP</Text>
            <TextInput
                autoFocus
                keyboardType="numeric"
                value={code}
                onChangeText={setCode}
                style={styles.textbox}
            />
            <Button title="Confirm OTP" onPress={()=>props.onSubmit(code)}/>
        </View>
    )
}
export default Verifycode;
const styles = StyleSheet.create({
    container : {
        flex : 1,
        alignItems : 'center',
        justifyContent : 'center'
    },
    textbox: {
        width: 300,
        height: 45,
        borderRadius: 9,
        borderColor: '#777',
        borderWidth: 1,
        color: '#000',
        marginBottom: 20
    }
})