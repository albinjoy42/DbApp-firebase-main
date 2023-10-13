import React from "react";
import { View,StyleSheet, Button,Text } from "react-native";
function Payment(){
return(
    <View style={styles.container}>
        <Text style={styles.txt}>Test</Text>
        <Button title="Pay"/>
    </View>
)
}
export default Payment;
const styles = StyleSheet.create({
    container : {
        flex:1 ,
        justifyContent:"center",
        alignItems :"center"
    },
    txt : {
        fontSize : 20,
        marginTop : 20,
        marginBottom : 20
    }
})