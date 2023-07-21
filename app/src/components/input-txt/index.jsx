import React, { useState } from "react";

import { View, TextInput, TouchableOpacity } from "react-native";

import { styles } from "./styles";

const InputText = ({ text, width, color, textColor, height, margin }) => {
  const [searchText, setSearchText] = useState("");

  return (
    <View style={[styles.container, { width: width, height: height, margin: margin, backgroundColor: color }]}>
      <TextInput
        style={[styles.input, { color: textColor }]}
        placeholder={text}
        value={searchText}
        onChangeText={setSearchText}
      />
    </View>
  );
};

export default InputText;
