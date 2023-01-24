import {Button,SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';




export default function HomeScreen({navigation}){
    const route = useRoute();
    return (
        <View>
            <SafeAreaView>
                
            </SafeAreaView>  
        </View>
      )


}

// const HomeScreen = ({navigation}) => {
    
//   return (
//     <View>
//         <SafeAreaView>
//         <Text style={styles.baseText}>
//             {navigation.getParam()}
//         </Text >
            
//         </SafeAreaView>  
//     </View>
//   )
// }

//export default HomeScreen


//<Text style={styles.baseText}>Password pulled from DB: {route.params.getPassword}

const styles = StyleSheet.create({})