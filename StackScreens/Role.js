//import { SafeAreaView, ActivityIndicator, StyleSheet, Text, View, TextInput, TouchableOpacity, Button, Image, ImageBackground } from 'react-native';
//import { firebase } from '../config'
//import React, { useState, useEffect } from 'react';
//export default function Role({ navigation }) {
//
//  const auth = firebase.auth;
//  const [user, setUser] = useState(null)
// 
//  
//
//  useEffect(() => {
//    firebase.firestore().collection("users")
//        .doc(auth().currentUser.uid).get()
//        .then(user => {
//            setUser(user.data())
//        })
//}, [])
//    if (user?.role == "Admin") {
//      
//      navigation.navigate('AdminHome')
//    }
//    else {
//    
//      navigation.navigate('Home')
//    }
//
//
////  return (
////
////    <View style={styles.container}>
////      {isadmin ?
////      
////        :
////       
////      }
////
////    </View>
////
////  );
//}
//
////  const styles = StyleSheet.create({
////    container: {
////      flex: 1,
////      position: 'relative'
////
////    }
////   
////});