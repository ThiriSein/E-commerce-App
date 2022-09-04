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
} from "react-native";
import { firebase } from "../config";
import { useNavigation } from "@react-navigation/native";

const UserTrendList = ({ route }) => {
  const [data, setData] = useState([]);
  const dataRefTrend = firebase.firestore().collection("trending");
  const navigation = useNavigation();
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

  const Deletefeedback = (data) => {
    dataRef
      .doc(data.id)
      .delete()
      .then(() => {
        alert("Deleted Successfully!");
        console.log(" Data Deleted");
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 2, padding: 10, marginTop: -10 }}>
        <FlatList
          data={data}
          keyExtractor={(_, i) => String(i)}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <SafeAreaView style={{ flex: 1, padding: 5 }}>
              <View style={styles.shadow}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("ProductDetail", { item })}
                >
                  <Image style={styles.iimage} source={{ uri: item.imgURL }} />
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          )}
        />
      </View>
    </View>
  );
};

export default UserTrendList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
  },
  iimage: {
    width: 150,
    height: 150,
    borderRadius: 3,
   
  },
  shadow: {
    shadowColor: "#000",
    //shadowOffset: { width: 5, height: 9 },
    shadowOpacity: 0.3,
    elevation: 7,
      padding: 14, paddingTop: 0,
      borderWidth: 0.1,
      borderColor: "lightgray",
  },
});
