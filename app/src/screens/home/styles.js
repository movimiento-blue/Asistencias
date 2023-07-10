import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/index";

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    fontFamily: "Rubik-Bold",
    fontSize: 18,
    marginBottom: 30,
  },
  loginContainer: {
    width: "100%",
    alignItems: "center",
  },
  inputElement: {
    height: 50,
    fontFamily: "Rubik-Regular",
    fontSize: 20,
    width: 300,
    marginBottom: 10,
    paddingHorizontal: 10,
    textAlign: "center",
    backgroundColor: COLORS.primary,
  },
});
