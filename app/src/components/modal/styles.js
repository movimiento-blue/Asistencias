import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    zIndex: 100,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    marginTop: 20,
    borderRadius: 12,
    borderWidth: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  modalText: {
    fontSize: 20,
    textAlign: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    fontFamily: "Rubik-Bold",
  },
});
