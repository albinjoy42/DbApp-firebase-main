import { View, Text, TextInput, TouchableHighlight, StyleSheet, Button, Alert } from 'react-native'
import React, { useState } from 'react'
import database from '@react-native-firebase/database';
let addItem = item => {
  database().ref('/Items').push({
    name: item
  })
}
function AddItem() {
  const [name, setName] = useState('');
  const handleSubmit = () => {
    addItem(name);
    setName('');
    Alert.alert('Data saved successfully')
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Add Item</Text>
      <TextInput
        value={name}
        placeholder='Enter new item'
        placeholderTextColor='black'
        onChangeText={text => setName(text)}
        style={styles.inputContainer}
      />
      <Button title='   Add Item   ' onPress={handleSubmit} style={styles.button} />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#bbbbbb',
  },
  inputContainer: {
    borderColor: 'grey',
    width: 260,
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 5,
    color: '#000000'
  },
  button: {
    backgroundColor: 'blue',
    marginTop: 30
  },
  text : {
    fontSize : 25,
    fontWeight : 'bold',
    marginBottom : 20,
    color : 'black'
  } 
})
export default AddItem;