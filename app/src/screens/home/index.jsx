import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";


import { Head, QRScanner } from "../../components";
import { COLORS } from "../../constants";
import { styles } from "./styles";
//import { Ionicons } from "@expo/vector-icons";

const Home = ({ navigation }) => {


  return (
    <View>
      <Head />
      <View style={styles.container}>
        <Text>Bienvenido</Text>
        <QRScanner />
      </View>
    </View>
  );
};

export default Home;
