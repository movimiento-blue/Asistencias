import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/index";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  containerLogo: {
    paddingTop: 50,
    alignItems: "center",
    justifyContent: "center",
    height: 300
  },
  logo:{
    width: 150,
    height: 150
  },
  containerLogin: {
    flex: 1,
    width: "100%",
    borderTopLeftRadius: 100,
    borderBottomRightRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary
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
