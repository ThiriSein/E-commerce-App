import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Alert,
  ImageBackground
} from "react-native";
import React, { useState, useEffect } from "react";
import { firebase } from "../config";
import * as ImagePicker from "expo-image-picker";
import SelectDropdown from 'react-native-select-dropdown'
import { CommonActions } from '@react-navigation/native'
import { call } from "react-native-reanimated";
//import { CALLBACK_TYPE } from "react-native-gesture-handler/lib/typescript/handlers/gestures/gesture";

const UpdateProduct = ({ route, navigation }) => {

  const [product, setProduct] = useState([]);
  const dataRef = firebase.firestore().collection("products")

  const [productName, setProductName] = useState(route.params.item.name);
  const [desc, setDesc] = useState(route.params.item.desc);
  const [price, setPrice] = useState(route.params.item.price);
  const [category_id, setCategory_id] = useState(route.params.item.category_id);
  const [category_name, setCategory_name] = useState(route.params.item.category_name);
  const [callImage, setCallImage] = useState(route.params.item.imgURL);

  const [show, setshow] = useState(false);

  const [data, setData] = useState([]);
  const catRef = firebase.firestore().collection('categories');
  const [name, setName] = useState('')

  const [selectedItem, setSelectedItem] = useState();
  const [error, setError] = useState({});
  
  useEffect(() => {
    readCat();
  }, [])

  // read data From Categories
  const readCat = () => {
    catRef
      .orderBy('createdAt', 'desc')
      .onSnapshot(
        querySnapshot => {
          const data = []
          querySnapshot.forEach((doc) => {
            const { name } = doc.data()

            data.push({
              id: doc.id,
              name,
            })
          })
          setData(data)
        }
      )
  }

  const [updateImg, setUpdateImg] = useState(false);
  //image
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imgURL, setImageURL] = useState("");

  const pickImage = async () => {
    //No permission request is needed to upload photo
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    const source = { uri: result.uri };
    console.log(source);
    setImage(source);
  };
  //updateing data
  const update = async () => {
    setshow(true)
    setTimeout(() => {
      setshow(false)
    }, 4000)
   
     if (!selectedItem) {
        setError((prev) => {
          return {
            ...prev,
            selectedItem: 'Please select category'
          }
        })
      }
      else {
       if (
         //(image !== null) ||
         (productName && productName.length > 0) ||
         (desc && desc.length > 0) ||
         (price && price.length > 0)
       ) {
         setUploading(true);

         if (image == null) {
           const setImageURL = await firebase.storage().refFromURL(callImage).getDownloadURL();
           // setImageURL == callImage.uri;
           console.log("Original image :" + setImageURL);
           dataRef
             .doc(route.params.item.id)
             .update({
               name: productName,
               desc: desc,
               price: parseFloat(price),
               imgURL: setImageURL,
               category_id: selectedItem.id,
               category_name: selectedItem.name,
             })
             .then(async () => {
  
               Alert.alert("Successfully updated!");
  
               navigation.dispatch(
                 CommonActions.reset({
                   index: 0,
                   routes: [{ name: "Admin" }],
                 })
               );
             })
             .catch((error) => {
               Alert.alert("Error");
               console.warn(error.message);
             });
           // setUploading(false);
           // setImage(null);
         } else {
           const response = await fetch(image.uri);
           const blob = await response.blob();
           const filename = image.uri.substring(image.uri.lastIndexOf("/") + 1);
           var ref = firebase.storage().ref("products_images/").child(filename).put(blob);
           try {
             await ref;
           } catch (e) {
             console.log(e);
           }
           const setImageURL = await firebase
             .storage()
             .ref(`products_images/${filename}`)
             .getDownloadURL();
           console.log("print ref :", setImageURL);
           setUploading(false);
           setImage(null);

           dataRef
             .doc(route.params.item.id)
             .update({
               name: productName,
               desc: desc,
               price: parseFloat(price),
               imgURL: setImageURL,
               category_id: selectedItem.id,
               category_name: selectedItem.name,
             })
             .then(async () => {
  
               Alert.alert("Successfully updated!");
  
               navigation.dispatch(
                 CommonActions.reset({
                   index: 0,
                   routes: [{ name: "Admin" }],
                 })
               );
             })
             .catch((error) => {
               Alert.alert("Error");
               console.warn(error.message);
             });
        
         }
         
       }
    }
      };

  return (
    <View style={styles.container}>
        <View style={styles.imageContainer}>

        <Image
            source={{ uri: callImage }}
            style={{ width: 150, height: 150 ,borderRadius: 15, }}/>
        {image && (
          <Image
            source={{ uri: image.uri }}
            style={{ width: 150, height: 150, borderRadius: 15, position: "absolute"  }}
          /> )} 
          </View>
          <TouchableOpacity
            style={[styles.selectButton, styles.ImgBot]}
            onPress={pickImage}
          >
            <Text> Pick Update Image</Text>
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            placeholder="Description"
            onChangeText={(text) => setDesc(text)}
            value={desc}
            placeholderTextColor="#c4c4c2"
          />

          <TextInput
            style={styles.input}
            placeholder="Name"
            onChangeText={(text) => setProductName(text)}
            value={productName}
            placeholderTextColor="#c4c4c2"
          />

          <TextInput
            style={styles.input}
            placeholder="Price"
            onChangeText={(text) => setPrice(text)}
            value={price}
            keyboardType="numeric"
            placeholderTextColor="#c4c4c2"
          />

          <View style={styles.select}>
            <SelectDropdown
              data={data}
              onSelect={(selectedItem, index) => {
                setSelectedItem(selectedItem);
                console.log(selectedItem, index)
              }}

              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem.name
              }}

              rowTextForSelection={(item, index) => {
                return item.name
              }}
        />
        <Text style={{ color: 'red', fontSize: 20 ,fontWeight: '300' }}>{error.selectedItem}</Text>
          </View>
          <View style={{ justifyContent: "center", alignItems: "center", }}>
          <ActivityIndicator size="large" color="#fff700"  animating={show} style={{marginTop: -15,paddingBottom:10,}}></ActivityIndicator>
            <TouchableOpacity style={styles.btn} onPress={() => update()}>
              <Text>Update </Text>
            </TouchableOpacity>
          </View>
    </View>
  );
};

export default UpdateProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },

  select: {
    borderWidth: 1,
    borderColor: 'black',
    marginHorizontal: 89,
    //marginLeft: 90,
    //marginRight: 90,
    marginBottom: 30,
    marginTop: 20
  },

  input: {
    marginLeft: 50,
    width: '65%',
    fontSize: 18,
    padding: 10,
    borderColor: '#ffd700',
    borderBottomWidth: 2,
    color: '#fff',
    borderRadius: 10,
    paddingTop: 10,
    marginBottom: 10,
  },

  btn: {
    width: "100%",
    backgroundColor: "#ffd700",
    width: "30%",
    padding: 10,
    marginLeft: 40,
    marginRight: 30,
    borderRadius: 5,
    color: "#000",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  imageContainer: {
    marginTop: 10,
    marginLeft: "28%",
    borderWidth: 1,
    borderColor: "#000",
    backgroundColor: "lightgray",
    width: 150,
    height: 150,
    borderRadius: 15,
  },
  selectButton: {
    backgroundColor: "gold",
    marginTop: 20,
    marginLeft: "29%",
    padding: 10,
    borderRadius: 5,
  },
  ImgBot: {
    width: "37%",
    marginTop: 30,
  },
})