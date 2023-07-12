import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeIcon from "../../../assets/icons/iconohome.png";
import LoginIcon from "../../../assets/icons/iconoperfil.png";

import HomeNavigator from "../home";
import LoginNavigator from "../login";
import { COLORS } from "../../constants";

const BottomTab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator
      initialRouteName="HomeTab"
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: "Rubik-Medium",
        },
        tabBarActiveTintColor: COLORS.black,
        tabBarInactiveTintColor: COLORS.darkGray,
        tabBarIconStyle: {
          fontSize: 24,
        },
      }}>
      <BottomTab.Screen
        name="HomeTab"
        component={HomeNavigator}
        options={{
          tabBarLabel: "Inicio",
          tabBarIcon: ({ focused, color, size }) => (
            <Image source={HomeIcon} size={size} color={focused ? color : COLORS.darkGray} />
          ),
        }}
      />
      <BottomTab.Screen
        name="LoginTab"
        component={LoginNavigator}
        options={{
          tabBarLabel: "Login",
          tabBarIcon: ({ focused, color, size }) => (
            <Image source={LoginIcon} size={size} color={focused ? color : COLORS.darkGray} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigator;
