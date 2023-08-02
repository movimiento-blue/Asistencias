import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Qrscan } from "../../screens/index";

const Stack = createNativeStackNavigator();

const QrscanNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Qrscan"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Qrscan" component={Qrscan} />
    </Stack.Navigator>
  );
};
export default QrscanNavigator;
