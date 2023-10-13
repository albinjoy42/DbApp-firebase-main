import { View, Text, StyleSheet, ScrollView, Button, TextInput, TouchableHighlight } from 'react-native'
import React, { useState, useEffect } from 'react';
import database from '@react-native-firebase/database'
let itemRef = database().ref('/Items');

function List() {
  const [itemArray, setItemArray] = useState([]);
  const [keys, setKey] = useState();
  const [ifUpdate, setIfUpdate] = useState(false)
  const [updateText, setUpdateText] = useState('')
  const [updateIndex, setUpdateIndex] = useState(null);
  useEffect(() => {
    itemRef.on('value', snapshot => {
      let data = snapshot.val();
      console.log('data = ', data)
      if (data!=null){
      setKey(Object.keys(data))
      console.log('keys = ', keys)
      const items = Object.values(data);
      console.log('items = ', items)
      setItemArray(items);
    }
  })
}, [])
  const handleDelete = (index) => {
    let childkey = keys[index];
    itemRef.child(childkey).remove();
  }
  const handleUpdate = (name, index) => {
    setUpdateText(name)
    setUpdateIndex(index)
    setIfUpdate(true)
  }
  const submitUpdate = () => {
    let childkey = keys[updateIndex];
    itemRef.child(childkey).update({
      name: updateText
    })
    setIfUpdate(false)
  }
  return (
    <View style={styles.container}>
      {(itemArray.length > 0)
      ?
      ifUpdate
        ?
        <View style={{alignItems:'center',flexDirection:'column',flex:1,justifyContent:'center'}}>
          <TextInput
          value={updateText}
          onChangeText={setUpdateText}
          style={styles.inputContainer}
          />
          <View style={{flexDirection:'row'}}>
          <Button title='   submit   ' onPress={()=>submitUpdate()} color='#112'/>
          <View style={{marginLeft:20}}>
          <Button title='   cancel   ' onPress={()=>setIfUpdate(false)} color='#112'/>
          </View>
          </View>
          </View>
          :
        <View>
          {itemArray.map((item, index) => {
            return (
              <View style={{ flexDirection: 'row' ,alignItems:'center',justifyContent:'center'}}>
                <Text style={styles.card}>{item.name}</Text>
                <TouchableHighlight style={styles.button1} onPress={() => handleUpdate(item.name, index)} >
                  <Text>Update</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.button1} onPress={() => handleDelete(index)}>
                  <Text>Delete</Text>
                </TouchableHighlight>
              </View>
            )
          })
          }
        </View>
        : (<Text>No data found</Text>)}
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#bbb'
  },
  card: {
    width: '50%',
    backgroundColor: '#b4dadb',
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,
    marginTop: 10,
    borderRadius: 2
  },
  button1: {
    width: 70,
    alignItems:'center',
    backgroundColor: '#235',
    padding: 10,
    marginTop: 10,
    fontSize: 16,
    marginLeft: 8,
    borderRadius: 5,
    flexDirection: 'column'
  },
  inputContainer: {
    borderColor: 'black',
    color:'black',
    width: '80%',
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 5,
    marginTop:10
  },
  button3: {
    padding: 20,
    marginTop: 10
  }
})
export default List