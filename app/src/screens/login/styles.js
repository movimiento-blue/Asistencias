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
  },
  input: {
    height: 50,
    fontFamily: "Rubik-Regular",
    fontSize: 20,
    width: "100%",
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: COLORS.primary,
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 40,
    backgroundColor: COLORS.primary,
    marginBottom: 10,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 5,
  },
  eyeIconContainer: {
    position: "absolute",
    right: 10,
  },
});
