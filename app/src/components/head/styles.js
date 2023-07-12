import { StyleSheet, Platform } from "react-native";

import { COLORS } from "../../constants/index";

export const styles = StyleSheet.create({
  container: {
    height: 48,
    marginHorizontal: 10,
    marginTop: Platform.OS === "android" ? 48 : 38,
    justifyContent: "center",
  },

  title: {
    fontFamily: "Rubik-Bold",
    textAlign: "center",
    fontSize: 38,
  },
});
