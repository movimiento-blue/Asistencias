import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { useDispatch } from "react-redux";
import { setUser } from "../../store/store";
import { getData } from "../../store/storage";

import QrscanIcon from "../../../assets/icons/iconoqr.png";
import LoginIcon from "../../../assets/icons/iconoperfil.png";

import QrscanNavigator from "../qrscan";
import LoginNavigator from "../login";
import { COLORS } from "../../constants";
import { useEffect, useState } from "react";

const BottomTab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const [loggedUser, setLoggedUser] = useState(false);
  const dispatch = useDispatch();
  let initialRoute = "LoginTab"

  useEffect(() => {
    const getUserData = async () => {
      token = await getData("token");
      username = await getData("username");   
      if ( token && username ) {
        dispatch(setUser({ token, username }));
        setLoggedUser(true);
        initialRoute = "QrscanTab";
      } else {
        setLoggedUser(false);
      }
    }
    getUserData();
  }, []);
 
 
  return (
    <BottomTab.Navigator
      initialRouteName={initialRoute}
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
        name="QrscanTab"
        component={QrscanNavigator}
        options={{
          tabBarLabel: "QR Scan",
          tabBarIcon: ({ focused, color, size }) => (
            <Image source={QrscanIcon} size={size} color={focused ? color : COLORS.darkGray} />
          ),
        }}
        unmountOnBlur={!loggedUser}
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


