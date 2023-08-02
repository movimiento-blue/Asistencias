import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/index";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  containerLogo: {
    paddingTop: 20,
    alignItems: "center",
    justifyContent: "center",
    height: 150
  },
  logo:{
    width: 100,
    height: 100
  },
  containerQR: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary
  },
  qr:{
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    padding: 20,
    width: 250,
    height: 250
  }
});
