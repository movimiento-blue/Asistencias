import React from "react";
import { Text, View } from "react-native";
import { styles } from "./styles";

const Modal = ({ text, width, height, color, textColor, margin }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.modal, { width: width, height: height, margin: margin, backgroundColor: color }]}>
        <Text style={[styles.modalText, { color: textColor }]}>{text}</Text>
      </View>
    </View>
  );
};

export default Modal;
