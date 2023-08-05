import { ActivityIndicator, View } from "react-native";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";

import store from "./store/store";

import AppNavigator from "./navigation";
import { styles } from "./styles";

//import { init } from "./store/db";

//init()
//  .then(() => {
//    console.log("Database initialized");
//  })
//  .catch((err) => {
//    console.log("Error initializing database");
//    console.error(err.message);
//  });

export default function App() {
  const [fontsLoaded] = useFonts({
    "Rubik-Black": require("../assets/fonts/Rubik-Black.ttf"),
    "Rubik-Bold": require("../assets/fonts/Rubik-Bold.ttf"),
    "Rubik-Medium": require("../assets/fonts/Rubik-Medium.ttf"),
    "Rubik-Regular": require("../assets/fonts/Rubik-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
