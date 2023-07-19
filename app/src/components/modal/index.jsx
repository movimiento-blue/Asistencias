import React from "react";
import { Text, View } from "react-native";
import { styles } from "./styles";

const Modal = ({ text, width, height, color }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.modal, { width: width, height: height, backgroundColor: color }]}>
        <Text style={styles.modalText}>{text}</Text>
      </View>
    </View>
  );
};

export default Modal;
