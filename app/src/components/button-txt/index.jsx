import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { styles } from "./styles";

const ButtonText = ({ text, width, color, textColor, height, margin, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.buttonContainer,
         { width: width,
           height: height,
           margin: margin,
           backgroundColor: color}]}
      onPress={onPress}>
      <Text style={[styles.text, { color: textColor }]}>{text}</Text>
    </TouchableOpacity>
  );
};

export default ButtonText;
