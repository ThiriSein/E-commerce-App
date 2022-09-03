import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator
} from "react-native";
import { firebase } from "../config";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Confirm = ({ route, navigation }) => {

  const [status, setStatus] = useState(route.params.item.status)
  const [userid, setUserId] = useState(route.params.item.userid)
  const [username, setUserName] = useState(route.params.item.username)
  const [phone, setPhone] = useState(route.params.item.phone)
  const [address, setAddress] = useState(route.params.item.address)
  const [note, setNote] = useState(route.params.item.note)
  const [total,setTotal] = useState(route.params.item.total)
  const [cartList, setCartList] = useState(route.params.item.cartList,[])
  const [createdAt, setCreatedAt] = useState(route.params.item.createdAt)

  const [show, setshow] = useState(false);
  
  const [data, setData] = useState([]);
  const dataRef = firebase.firestore().collection('orders')

  console.log('cartListRoute.Param',cartList);

  const update = async () => {
    setshow(true)
        setTimeout(() => {
            setshow(false)
        }, 4000)
    dataRef
      .doc(route.params.item.id)
      .update({
        "status": { pending: true },
      })
      .then(() => {
        navigation.goBack();
        Alert.alert("Confirmed order Successfully!");
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 19, fontWeight: 'bold', color: '#fff', textAlign: 'center' }}>OrderList</Text>
      {
        cartList.map((cartItem,index) => {
        return (
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5 }} key={index}>
                    <Text style={styles.textInfo}>{cartItem.qty} x</Text>
                    <Text style={styles.textInfo}>{cartItem.name}</Text>
                    <Text style={styles.textInfo}>$ {cartItem.price}</Text>
                  </View>
                )
          }
        )
      }
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
        <MaterialCommunityIcons name="truck-delivery-outline" color={'#f7d081'} size={25} />
        <Text style={styles.textInfo}>$ 10</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
        <MaterialCommunityIcons name="cash-100" color={'#f7d081'} size={25} />
        <Text style={styles.textInfo}>$ {total}</Text>
      </View>


      <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
        <MaterialCommunityIcons name="clock" color={'#f7d081'} size={25} />
        <Text style={styles.textInfo}> {createdAt}</Text>
      </View>
      <Text style={{ fontSize: 19, fontWeight: 'bold', color: '#fff', textAlign: 'center' }}>Customer's Info</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
        <MaterialCommunityIcons name="id-card" color={'#f7d081'} size={25} />
        <Text style={styles.textInfo}>{userid}</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
        <MaterialCommunityIcons name="account" color={'#f7d081'} size={25} />
        <Text style={styles.textInfo}>{username}</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
        <MaterialCommunityIcons name="phone" color={'#f7d081'} size={25} />
        <Text style={styles.textInfo}>{phone}</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
        <MaterialCommunityIcons name="home" color={'#f7d081'} size={25} />
        <Text style={styles.textInfo}>{address}</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
        <MaterialCommunityIcons name="text-box" color={'#f7d081'} size={25} />
        <Text style={styles.textInfo}>{note}</Text>
      </View>
      <ActivityIndicator size="large" color="gold" animating={show} style={styles.activityIndicator}></ActivityIndicator>
      <TouchableOpacity style={styles.btn} onPress={update}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Order Confirm</Text>
      </TouchableOpacity>
    </View>
  );
}
export default Confirm

const styles = StyleSheet.create({
  btn: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f7d081",
    padding: 10,
    width: "100%",
    borderRadius: 20,
  },
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#000",
    padding: 20,
    //alignItems: "center",
    justifyContent: "center",
  },
  textInfo: {
    fontSize: 16,
    color: "#f7d081",
    fontWeight: "500",
    letterSpacing: 1,
    padding: 5,
    paddingTop: 8
  },
});