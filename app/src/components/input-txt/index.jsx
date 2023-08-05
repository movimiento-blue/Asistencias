import React from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { styles } from "./styles";

const InputText = ({ text, width, color, textColor, height, margin, value, onChangeText, secureTextEntry }) => {
  return (
    <TouchableOpacity style={[styles.container, { width: width, height: height, margin: margin, backgroundColor: color }]}>
      <TextInput
        style={[styles.input, { color: textColor }]}
        placeholder={text}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </TouchableOpacity>
  );
};

export default InputText;
