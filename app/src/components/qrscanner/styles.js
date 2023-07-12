import { StyleSheet, Platform } from "react-native";

import { COLORS } from "../../constants/index";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    height: 500,
    width: 400,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 16,
  },
  scanOverlayText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});
