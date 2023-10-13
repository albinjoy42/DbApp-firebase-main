import { View, Text, Button, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import auth from '@react-native-firebase/auth';
import Login from './Login';

function Home({ navigation }) {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    console.log("user = ", user)
    if (initializing) setInitializing(false);
  }
  function logout() {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
    navigation.navigate('Login');
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;
  return (
    user ? (
      <View style={styles.container}>
        <View><Text style={styles.txt}>Logged in as : {user.email||user.phoneNumber}</Text>
          <Button title='Logout'  color='#12a' onPress={logout} />
        </View>
        <View style={styles.btnview}>
          <View>
          <Button
            title='Add new item'
            color='#112277'
            onPress={() => navigation.navigate('AddItem')}
          />
          </View>
          <View style={{marginTop:30}}>
          <Button
            title='   Show all items   '
            onPress={() => navigation.navigate('List')}
            color='#112277'
          />
          </View>
        </View>
      </View>
    ) : <Login />
  )
}

export default Home
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: '#fff'
  },
  btnview: {
    flex: 1,
    justifyContent: "center",
  },
  txt: {
    fontSize: 15,
    fontWeight: 'bold',
    color: "#112277",
    marginTop: 10,
    marginBottom: 20,
    paddingBottom: 3
  }
})