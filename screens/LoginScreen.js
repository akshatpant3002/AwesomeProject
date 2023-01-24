import { useNavigation } from '@react-navigation/core'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View, FlatList } from 'react-native'
import React, { useState , useEffect, useRef, useLayoutEffect} from 'react'
import axios from 'axios'


const LoginScreen = (props) => {
    const [email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const[getPassword, setGetPassword] = useState('')
    const navigation = useNavigation()
    

    const [prevId, setPrevId] = useState(null);
    const [isFirstRender, setIsFirstRender] = useState(true);

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('blur', () => { // when the screen is on home set email and password back to null
          setEmail('');
          setPassword('');
          setPrevId('');
          setGetPassword('');
          //setIsFirstRender(true);
        });
    
        return unsubscribe;
      }, [props.navigation]); // when the navigation object changes

    //BUG: When put Eatt in the username with wrong password hhhh and then hit login and then backspace one and hit login it doesn't let me thru

    //BUG: after trying failed attempt with similar password charachters does not work actual time
            // The useeffect is not the issue for this bug



    //Solves the problem where I had to hit the login button twice too switch to new screen if correct input
    //the prev id thing solves the problem of when opening app navigating to wrong screen
    useEffect(() => {
      if (!isFirstRender && (prevId !== password) && (password === getPassword)) { // checks if it is the first render and if prev password input same as current password input
        props.navigation.navigate('Home');
      }// mby else statement set mby all state variables to empty
       setPrevId(getPassword); // changes prev to curr for newx iter
    }, [getPassword, isFirstRender]); // if either have changed the useEffect will execute - mby put password here

    useEffect(() => {
      setIsFirstRender(false); // after first render this changes the state of isFirstRender to false
    }, []); // this means it will only run in inital render

 


    const callGetUsers = () => {axios.get('http://localhost:5000/api/goals/' + email).then((response) =>{ //pulls the email
            const myRepo = response.data;
            setGetPassword(myRepo);


         });
    };

    




  return (
    <KeyboardAvoidingView 
        style={styles.container}
        behavior="padding">

        <View style={styles.inputContainer}>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={text => setEmail(text)}
                style={styles.input}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={text => setPassword(text)}
                style={styles.input}
                secureTextEntry
            />
        </View>
        <View style={styles.buttonContainer}>
            <TouchableOpacity
                onPress={callGetUsers} // NEXT STEP: if email's respective password is in the database navigate to home otherwise do nothing
                style={styles.button}
            >
            <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => props.navigation.navigate('Registration')}// updates password textbox to pulled username from database
                style={[styles.button, styles.buttonOutline]}
            >
            <Text style={styles.buttonOutlineText}>Register</Text>
            </TouchableOpacity>
        </View>
        <Text style={styles.buttonOutlineText}></Text>
        
    </KeyboardAvoidingView>
  )
}

//<Text style={styles.buttonOutlineText}>Password pulled from DB: {getPassword}</Text>

export default LoginScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'

    },
inputContainer:{
    width: '80%'
},

input:{
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
},
buttonContainer:{
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,


},
button:{
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,



},
buttonOutline:{
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWifth: 2,
},
buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,

},
buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
}


})