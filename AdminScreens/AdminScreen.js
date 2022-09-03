import React, { useEffect, useState } from "react";
import { BackHandler } from "react-native";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { firebase } from "../config";

const AdminScreen = ({ route, navigation }) => {

  const [data, setData] = useState([]);
  const dataRef = firebase.firestore().collection("products");
  const [show, setshow] = useState(false);
  const [showBox, setShowBox] = useState(true);

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [imgURL, setImageURL] = useState("");
  const [category_name, setCategory_name] = useState('');

  useEffect(() => {
    read();
  }, []);

  // read data
  const read = () => {
    setshow(true)
    setTimeout(() => {
      setshow(false)
    }, 1000)
    dataRef
      .orderBy("createdAt", "desc")
      .onSnapshot((querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          const { imgURL } = doc.data();
          const { name } = doc.data();
          const { desc } = doc.data();
          const { price } = doc.data();
          const { category_name } = doc.data();

          data.push({
            id: doc.id,
            imgURL,
            name,
            desc,
            price,
            category_name,
          });
        });
        setData(data);
      });
  };

  //// delete data
  //const destroy = (data) => {
  //  dataRef
  //    .doc(data.id)
  //    .delete()
  //    .then(() => {
  //      alert("Deleted Successfully!");
  //      console.log(" Data Deleted");
  //    })
  //    .catch((error) => {
  //      alert("error");
  //    });
  //};

  // delete data
  const showConfirmDialog = (data) => {
    return Alert.alert(
      "Are your sure?",
      "Are you sure you want to remove this product?",
      [
        // The "Yes" button
        {
          text: "Yes",
          onPress: () => {
            //console.log("User pressed Later")
            dataRef
              .doc(data.id)
              .delete()
              .then(() => {
                alert("Deleted Successfully!");
                console.log(" Data Deleted");
              })
              .catch((error) => {
                alert("error");
              });
            setShowBox(false);
          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: "No",
        },
      ]
    );
  };
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress",()=>{
      BackHandler.exitApp();
    });
  }, []);
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.adminView}>
          <Image
            style={styles.tinyLogo}
            source={require('../assets/logo.png')}
          />

          <Text style={styles.adminText}>Add All Products</Text>
          <TouchableOpacity
            style={{ backgroundColor: "gold", padding: 20, borderRadius: 40 }}
            onPress={() => navigation.navigate("CreateProduct")}
          >
            <MaterialCommunityIcons name="plus" size={30} color={"black"} />
          </TouchableOpacity>
        </View>

        <View style={{ flex: 2, padding: 10, paddingTop: 0 }}>
          <ActivityIndicator size="small" color="gold" animating={show}></ActivityIndicator>
          <FlatList
            data={data}
            keyExtractor={(_, i) => String(i)}
            numColumns={1}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View
                style={styles.Box}
              >
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity
                    //onPress={() =>
                    //    navigation.navigate("UpdateProduct", { item })
                    //}

                    onPress={() => {
                      Alert.alert(
                        "Are your sure?",
                        "Are you sure you want to update this product?",
                        [
                          // The "Yes" button
                          {
                            text: "Yes",
                            onPress: () => {
                              navigation.navigate("UpdateProduct", { item })
                              setShowBox(false);
                            },
                          },
                          // The "No" button
                          // Does nothing but dismiss the dialog when tapped
                          {
                            text: "No",
                          },
                        ]
                      );
                    }}

                  >
                    <MaterialCommunityIcons
                      name="lead-pencil"
                      size={25}
                      color="gold"
                    />
                  </TouchableOpacity>

                  <Text style={styles.padd}>
                    {item.category_name}
                  </Text>


                  <TouchableOpacity onPress={() => showConfirmDialog(item)} style={{ left: 60, }}>
                    <Ionicons name="trash" color={"#ffd700"} size={30} />
                  </TouchableOpacity>
                </View>
                <View style={{ padding: 10, flexDirection: "row" }}>
                  <View>
                    <Image
                      style={styles.iimage}
                      source={{ uri: item.imgURL }}
                    />
                  </View>
                  <View style={{ padding: 10, }}>
                    <Text style={styles.text}>
                      {/*Name:*/}
                      {item.name}
                    </Text>
                    <Text style={styles.text}>
                      Price: ${item.price}
                    </Text>
                    <Text style={[styles.text, styles.decText]}>
                      {/*Description:*/}
                      {item.desc}
                    </Text>

                  </View>

                </View>
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
};

export default AdminScreen;

const styles = StyleSheet.create({
  adminView: {
    padding: 13,
    flexDirection: "row",
  },
  adminText: {
    fontSize: 20,
    color: "white",
    ontWeight: "500",
    letterSpacing: 1,
    paddingLeft: 12,
    paddingTop: 30,
    paddingRight: 12,
  },
  text: {
    fontSize: 16,
    color: "#fff",
    paddingBottom: 5,
    fontWeight: "500",
    letterSpacing: 1,
    width: 150,
  },
  iimage: {
    width: 150,
    height: 150,
    borderRadius: 15,
  },
  padd: {
    width: 100,
    marginLeft: '30%',
    color: 'gold',
    fontWeight: "bold",
    fontSize: 18,
  },
  Box: {
    padding: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: "#000",
    borderRadius: 15,
  },
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#000",
    paddingTop: 18,
    padding: 10
  },
  decText: {
    fontSize: 12,
    letterSpacing: 1.5,
    color: 'gold',
    fontWeight: 'bold',
  },
  tinyLogo: {
    width: 70,
    height: 70,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: "#fff",
  }
});
