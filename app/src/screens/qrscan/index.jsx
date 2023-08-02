import React from "react";
import { View, Image } from "react-native";

import Logo from "../../../assets/logo.png";

import { QRScanner } from "../../components";
import { COLORS } from "../../constants";
import { styles } from "./styles";


const Qrscan = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <Image source={Logo} style={styles.logo} />
      </View>
      <View style={styles.containerQR}>
        <View style={styles.qr}>
          <QRScanner />
        </View>
      </View>
    </View>
  );
};

export default Qrscan;
