import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";


import { Head } from "../../components";
import { COLORS } from "../../constants";
import { styles } from "../login/styles";
//import { Ionicons } from "@expo/vector-icons";

const Home = ({ navigation }) => {


  return (
    <View>
      <Head />
      <View style={styles.container}>
        <Text>Home</Text>
      </View>
    </View>
  );
};

export default Home;
