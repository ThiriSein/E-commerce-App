import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
    TouchableOpacity,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { firebase } from "../config";
import { color } from "react-native-reanimated";

const AdminTrendList = ({ route, navigation }) => {
  const [data, setData] = useState([]);
    const dataRefTrend = firebase.firestore().collection("trending");
    const [showBox, setShowBox] = useState(true);

  useEffect(() => {
    read();
  }, []);

  // read data
  const read = () => {
    dataRefTrend.onSnapshot((querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        const { id } = doc.data();
        const { name } = doc.data();
        const { desc } = doc.data();
        const { imgURL } = doc.data();
        const { price } = doc.data();
        const { category_name } = doc.data();
        data.push({
          id: doc.id,
          name,
          desc,
          price,
          imgURL,
          category_name,
        });
      });
        setData(data);
        console.log(data);
    });
  };

  // delete data
  const deleteTrend = (data) => {
    return Alert.alert(
      "Are your sure?",
      "Are you sure you want to remove this product?",
      [
        {
          text: "Yes",
          onPress: () => {
            //console.log("User pressed Later")
            dataRefTrend
              .doc(data.id)
              .delete()
              .then(() => {
                alert("Deleted Successfully!");
                console.log("Trending Product Deleted");
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

  return (
      <View style={styles.container}>
        <View>
          <Text style={styles.adminText}>Trending List</Text>
        </View>

        <View style={{ flex: 2, padding: 10, marginTop: -10 }}>
          <FlatList
            data={data}
            keyExtractor={(_, i) => String(i)}
            numColumns={1}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <SafeAreaView style={{ flex: 1, padding: 5 }}>
                  <View style={{ padding: 15, paddingTop: 0 }}>
                    <View style={{ paddingTop: 5, flexDirection: "row" }}>
                      <View>
                        <Image
                          style={styles.iimage}
                          source={{ uri: item.imgURL }}
                        />
                      </View>

                      <View style={{ width: 200, padding: 10 }}>
                        <Text style={styles.expoText}>
                          {item.category_name}
                        </Text>
                        <Text style={styles.text}>Name : {item.name}</Text>
                            <Text style={styles.text}>Price : $ {item.price}</Text>
                            <TouchableOpacity onPress={() => deleteTrend(item)} style={{paddingTop: 10,}}>
                                <MaterialCommunityIcons name="delete" color={'red'} size={30} />
                            </TouchableOpacity>
                      </View>
                    </View>
                  </View>
              </SafeAreaView>
            )}
          />
        </View>
      </View>
  );
};

export default AdminTrendList;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      height: "100%",
      backgroundColor: "black",
    },
    iimage: {
      width: 150,
      height: 150,
      borderRadius: 20,
    },
    iimage1: {
      width: 80,
      height: 80,
      borderRadius: 10,
  },
    expoView: {
      textAlign: 'center',
      fontSize: 22,
      color: '#FFE89C',
      fontWeight: '500',
      letterSpacing: 1,
    },
    expoText: {
      //textAlign: 'center',
      paddingTop: 8,
      fontSize: 14,
      color: "#FFE89C",
      fontWeight: "900",
      letterSpacing: 1,
      lineHeight: 18,
    },
    button: {
      margin: 10,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#FFE89C",
      height: 50,
      width: 50,
  
    },
    text: {
      marginTop: 5,
      fontSize: 14,
      color: "#fff",
      fontWeight: "500",
      letterSpacing: 0.5,
    },
  });
  