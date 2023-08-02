import { StyleSheet } from "react-native";

import { COLORS } from "../../constants/index";

export const styles = StyleSheet.create({
  buttonContainer: {
    height: 40,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  text: {
    color: COLORS.text,
    fontSize: 20,
    fontFamily: "Rubik-Bold",
  },
});
