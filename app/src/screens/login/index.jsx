import React from "react";
import { View, Text, Image } from "react-native";

import { ButtonText, InputText } from "../../components";

import Logo from "../../../assets/logo.png";
import { COLORS } from "../../constants";
import { styles } from "./styles";
//import { Ionicons } from "@expo/vector-icons";

const Login = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <Image source={Logo} style={styles.logo} />
      </View>
      <View style={styles.containerLogin}>
        <InputText text="Usuario" width={250} height={35} color={COLORS.white} textColor={COLORS.white} margin={20}/>
        <InputText text="Contraseña" width={250} height={35} color={COLORS.white} textColor={COLORS.white} margin={20}/>
        <ButtonText text="Ingresar" width={250} height={35} color={COLORS.red} textColor={COLORS.white} margin={20} onPress={() => navigation.navigate("Home")} />
      </View>
    </View>
  );
};

export default Login;
