import {
  Text,
  View,
  Image,
  StyleSheet,
  FlatList,
  Alert,
  TouchableOpacity,
  ScrollView,
  ImageBackground
} from "react-native";
import {  MaterialCommunityIcons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { firebase } from "../config";
import { Ionicons } from "@expo/vector-icons";
import * as Animatable from 'react-native-animatable';

export default function OrderDetail({ navigation }) {
  //Getting user id
  const firestore = firebase.firestore;
  const auth = firebase.auth;
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(auth().currentUser.uid)
      .get()
      .then((user) => {
        setUser(user.data());
        console.log("user id ==", user.data().id);
        read(user.data().id);
      });
  }, []);
  const uid = user?.id;
  const urname = user?.username;
  //const urname = firestoreDocument.data()?.username

  console.log(uid);
  console.log(urname);

  const timestamp = firebase.firestore.FieldValue.serverTimestamp();
  const [data, setData] = useState([]);
  const [cartList, setCartList] = useState([]);
  const dataRef = firebase.firestore().collection("orders");

  // read data
  const read = (userId) => {
    //const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    console.log("inside read function", userId);
    //console.log("inside read function");
    dataRef.where("userid", "==", userId)
      .onSnapshot((querySnapshot) => {
      const data = [];
      //console.log("Data", querySnapshot.docs.data());
      querySnapshot.forEach((doc) => {
        //console.log("Data = ", doc.data());
        //console.log("orderId" ,doc.id)
        //data.push(doc.data());
        //data.id = doc.id;
        const { userid } = doc.data();
        const { address } = doc.data();
        const { cartList } = doc.data();
        const { phone } = doc.data();
        const { total } = doc.data();
        const { username } = doc.data();
        const { status } = doc.data();
        const { note } = doc.data();
        //const { createdAt } =
        //  //doc.data();
        //  firebase.firestore.FieldValue.serverTimestamp();
        //id : doc.id,
        setCartList(doc.data().cartList);
        //console.log("arr obj=" + cartList);
        data.push({
          id: doc.id,
          address,
          cartList,
          phone,
          total,
          userid,
          username,
          status,
          note,
          //createdAt,
            //: timestamp,
            //new Date(createdAt.seconds * 1000).toLocaleDateString("en-US"),
          //createdAt,
        });
      });
      setData(data);
    });
    //console.log(" data Data = ", data);
    //console.log(uid);
  };
  useEffect(() => {
    // read();
  }, []);


  return (
    <View style={styles.container}>
        {/*<Text style={styles.adminText}>OrderDetail</Text>*/}
        <View style={{ flex: 1, padding: 10 }}>
          <FlatList
            data={data}
            showsVerticalScrollIndicator={true}
            style={{ flex: 1, marginTop: 16 }}
            keyExtractor={(_,i) => String(i)}
            renderItem={({ item }) => (
                <View>
                  {/*<TouchableOpacity onPress={showConfirmDialog}>*/}
                  <View style={{
                    borderWidth: 1, borderColor: 'gold', backgroundColor: "#000", padding: 10, borderRadius: 10,
                    marginBottom: 10
                  }}>
                    <ScrollView>

                      <View>
                        {
                          item.status.pending === true ?
                            (
                              <View style={{ flexDirection: 'row' }}>
                                <MaterialCommunityIcons name="marker-check" size={35} color={'green'} />
                                <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'gold', textAlign: 'center', paddingLeft: 30, paddingRight: 30 }}>Your Order is{item.status.pending} Confirmed</Text>

                                {/*<TouchableOpacity onPress={() => Deletefeedback(item)}>
                                  <MaterialCommunityIcons name="delete" color={'red'} size={30} />
                                </TouchableOpacity>*/}
                              </View>
                            )
                            :
                            <View style={{ flexDirection: 'row' }}>
                              <MaterialCommunityIcons name="alert" size={35} color={'orange'} />
                              <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'gold', textAlign: 'center', paddingLeft: 30, paddingRight: 30 }}>Your Order is{item.status.pending} Pending</Text>

                              {/*<TouchableOpacity onPress={() => Deletefeedback(item)}>
                                <MaterialCommunityIcons name="delete" color={'red'} size={30} />
                              </TouchableOpacity>*/}

                            </View>
                        }


                        <Text style={{ fontSize: 19, fontWeight: 'bold', color: '#fff', textAlign: 'center' }}>OrderList</Text>
                        {
                          item.cartList.map((cartItem,index) => {
                            //console.log("cart Item",cartItem)
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
                          <Text style={styles.textInfo}>$ {item.total}</Text>
                        </View>


                        {/*<View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                          <MaterialCommunityIcons name="clock" color={'#f7d081'} size={25} />
                          <Text style={styles.textInfo}> {item.createdAt}</Text>
                        </View>*/}
                        <Text style={{ fontSize: 19, fontWeight: 'bold', color: '#fff', textAlign: 'center' }}>Your Info</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                          <MaterialCommunityIcons name="id-card" color={'#f7d081'} size={25} />
                          <Text style={styles.textInfo}>{item.userid}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                          <MaterialCommunityIcons name="account" color={'#f7d081'} size={25} />
                          <Text style={styles.textInfo}>{item.username}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                          <MaterialCommunityIcons name="phone" color={'#f7d081'} size={25} />
                          <Text style={styles.textInfo}>{item.phone}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                          <MaterialCommunityIcons name="home" color={'#f7d081'} size={25} />
                          <Text style={styles.textInfo}>{item.address}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                          <MaterialCommunityIcons name="text-box" color={'#f7d081'} size={25} />
                          <Text style={styles.textInfo}>{item.note}</Text>
                        </View>
                      </View>
                    </ScrollView>
                  </View>
                </View>
            )}
          />
        </View>
    </View>

  );
}

const styles = StyleSheet.create({
  adminText: {
    fontSize: 20,
    color: "white",
    fontWeight: "500",
    letterSpacing: 1,
    padding: 20,
    textAlign: 'center',
  },
  textBoxes: {
    width: '60%',
    marginLeft: 20,
    fontSize: 16,
    padding: 10,
    borderColor: 'black',
    borderBottomWidth: 2,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    color: "black"
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
    letterSpacing: 1,

  },
  textInfo: {
    fontSize: 16,
    color: "#f7d081",
    fontWeight: "500",
    letterSpacing: 1,
    padding: 5,
    paddingTop: 8
  },
  padd: {
    color: 'gold',
    fontWeight: "bold",
    fontSize: 18,
    textAlign: 'center',
  },
  Box: {
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "#fff",
    backgroundColor: "gray",
    borderRadius: 15,
    padding: 10
  },
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#000",
    justifyContent: "flex-start",
  },
  decText: {
    fontSize: 10,
    color: 'gold',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#ffd700',
    marginLeft: 10,
    marginTop: 10,
    borderRadius: 5,
    alignItems: "center",
    padding: 10,
    justifyContent: 'center'
  },
})
