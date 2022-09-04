import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView
} from "react-native";
import React, { useState, useEffect } from "react";
import { firebase } from "../config";

const TrendProduct = ({ route, navigation }) => {

  const [id] = useState(route.params.item.id);
  const [productName, setProductName] = useState(route.params.item.name);
  const [desc, setDesc] = useState(route.params.item.desc);
  const [price, setPrice] = useState(route.params.item.price);
  const [category_id, setCategory_id] = useState(route.params.item.category_id);
  const [category_name, setCategory_name] = useState(route.params.item.category_name);
  const [imgURL, setImageURL] = useState(route.params.item.imgURL);

  const [showBox, setShowBox] = useState(true);
  const [show, setshow] = useState(false);
  const [data, setData] = useState([]);

 // trending item adding
 const trending = () => {
  const trendList = {
    'id': id,
    'imgURL': imgURL,
    'name': productName,
    'desc': desc,
    'price': price,
    'category_name': category_name,
  };
  console.log(trendList);
  
  firebase.firestore().collection("trending")
    .doc(trendList.id)
    .set(trendList)
    .then(() => {
      alert("Insert Trending Item Successfully!");
      console.log(" Data Inserted into Trending List");
    })
    .catch((error) => {
      alert("error");
    }); 
  };
  return (
    <View style={styles.container}>
      <Image style={styles.iimage} source={{ uri: imgURL }} />
      <Text style={styles.text}>{id}</Text>
      <Text style={styles.text}>{productName}</Text>
      <Text style={styles.text}>$ {price}</Text>
      <Text style={styles.text}>{desc}</Text>
      <Text style={styles.text}>{category_name}</Text>
      <View style={{marginTop: 80}}>
       <TouchableOpacity
         style={styles.button}
         onPress={trending}
       >
         <Text style={{fontSize: 16,color:'#444',fontWeight:'bold'}}>Add To Trending List</Text>
        </TouchableOpacity>
     </View>
      </View>
  );
};

export default TrendProduct;

const styles = StyleSheet.create({
  container: {
   flex: 1,
   width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: 'flex-start',
   backgroundColor: "black",
  
  },
  iimage: {
   width: 300,
    height: 300,
   borderRadius: 20,
    margin: 20,
  },
  expoView: {
   fontSize: 24,
   color: "gold",
   fontWeight: "500",
   letterSpacing: 1,
   marginBottom: 5,
  },
  button: {
   alignItems: "center",
   justifyContent: 'center',
   backgroundColor: "#f7d081",
   padding: 15,
   width: '90%',
   borderRadius: 15, marginTop: -50, margin: 15,
  },
  button2: {
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: "#f7d081",
    padding: 15,
    width: '90%',
    borderRadius: 15, marginTop: 0, margin: 15,
   },
  textcount: {
  fontSize: 16,
  color:'#FFE89C',
  fontWeight: "400",
  letterSpacing: 1,
  padding: 10,
  borderWidth: 1,
  borderColor: '#FFE89C'
  },
  text: {
   fontSize: 16,
   color: "#fff",
   fontWeight: "400",
   letterSpacing: 1,
    paddingTop: 5,
    marginLeft: 10,
   marginRight: 10,
  },
  });