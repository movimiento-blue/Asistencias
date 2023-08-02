import React from "react";
import { View, Text } from "react-native";
import { styles } from "./styles";

const BadgeText = ({ text, width, color, textColor, height, margin }) => {
  return (
    <View
      style={[styles.buttonContainer,
         { width: width,
           height: height,
           margin: margin,
           backgroundColor: color}]}
    >
      <Text style={[styles.text, { color: textColor }]}>{text}</Text>
    </View>
  );
};

export default BadgeText;

