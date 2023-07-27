import { StyleSheet, Platform } from "react-native";

import { COLORS } from "../../constants/index";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    backgroundColor: COLORS.primary,
  },
  image: {
    width: 20,
    height: 20,
    marginHorizontal: 5,
  },
  input: {
    flex: 1,
    fontFamily: "Rubik-Bold",
    textAlign: "left",
    fontSize: 20,
  },
});
