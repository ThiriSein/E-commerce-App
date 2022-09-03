//import { Text, View } from "react-native";
//import React, {Component} from 'react'
//import { CommonActions } from '@react-navigation/native'
//import { MaterialCommunityIcons } from "@expo/vector-icons";
//import { firebase } from '../config';
//class Logout extends React.Component {
//        
//  componentWillUnmount() {
//    // Reset register status to allow return to register page
//    function Signout({navigation}) {
//      firebase.auth().signOut();
//       navigation.dispatch(
//      CommonActions.reset({
//       index: 0,
//       routes: [{ name: 'Login' }]
//   })
//       )
//    }
//    
//  }
//
//  render() {
//   return Signout()
//  }
//}
//export default Logout