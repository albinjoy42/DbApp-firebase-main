import { View, Text, Button, TextInput, StyleSheet, TouchableHighlight, Alert } from 'react-native';
import React, { useState } from 'react';
import auth from '@react-native-firebase/auth';

function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const signup = () => {
    if (email != "" && password != "") {
      auth().createUserWithEmailAndPassword(email, password)
        .then((res) => {
          console.log("user created", res);
          Alert.alert("User created. You can login now");
          setEmail("");
          setPass("");
        })
        .catch((error) => {
          console.log("Error in signup = ", error);
          Alert.alert(error.message);
        })
    }
    else {
      Alert.alert('Error : Both fields are mandatory');
    }
  }
  const login = () => {
    if (email != "" && password != "") {
      auth().signInWithEmailAndPassword(email, password)
        .then((res) => {
          console.log("Login response : ", res);
          navigation.navigate('Home');
        })
        .catch((err) => {
          console.log("Error logging in: ", err);
          Alert.alert("Error: Wrong email id or password");
        })
    }
    else if(email == ""&&password == ""){
      Alert.alert('Please enter your Email-ID and Password to login');
    }
    else if(email == ""){
      Alert.alert('Please enter your Email-ID');
    }
    else{
      Alert.alert('Please enter your Password');
    }
    }
  
  return (
    <View style={styles.container}>
      <TextInput style={styles.txtbox}
        onChangeText={setEmail}
        value={email}
        placeholder='Enter email'
        placeholderTextColor='#000000'
        keyboardType='email-address'
      />
      <TextInput style={styles.txtbox}
        onChangeText={setPass}
        value={password}
        placeholder='Enter password'
        placeholderTextColor='#000000'
        secureTextEntry={true}
      />
      <View style={styles.btnView}>
        <TouchableHighlight style={styles.btn} onPress={signup}>
          <Text style={styles.btntxt}>Sign Up</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.btn} onPress={login}>
          <Text style={styles.btntxt}>Login</Text>
        </TouchableHighlight>
      </View>
      {/* <View>
        <Text/>
      <Button
            title='Login with OTP'
            color='#112277'
            onPress={() => navigation.navigate('Mobilenumber')}
          /></View> */}
    </View>
  )
}

export default Login
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  txtbox: {
    height: 50,
    width: '70%',
    borderColor: '#113019',
    borderWidth: 2,
    color: '#000000',
    marginTop: 20,
    borderRadius: 6,
    fontSize: 15
  },
  btnView: {
    flexDirection: 'row'
  },
  btn: {
    height: 40,
    width: '35%',
    backgroundColor: "#113019",
    marginTop: 20,
    marginLeft: 10,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btntxt: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: 'bold'
  }
})