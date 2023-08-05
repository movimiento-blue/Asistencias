import React, { useEffect, useState } from "react";
import { View, Image } from "react-native";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "../../store/store";
import { getData, storeData } from "../../store/storage";

import { ButtonText, InputText, BadgeText, Modal } from "../../components";

import Logo from "../../../assets/logo.png";
import { COLORS, SERVICES } from "../../constants";
import { styles } from "./styles";


const Login = ({ navigation }) => {
  const [login, setLogin] = useState(true);
  const [loggedUser, setLoggedUser] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    const getUserData = async () => {
      const token = await getData("token");
      const username = await getData("username");
      if (token && username) {
        dispatch(setUser({ token, username }));
        setLogin(false);
        setLoggedUser(username);
      }
    }
    getUserData();
    }, []);

  const handleLogin = async () => {
    response = await fetch(`${SERVICES.urlServer}/api/users/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: usernameValue,
        clave: passwordValue,
      })
    })
    .then(response => response.json())
    .then( async( data ) => {
      if ( 'token' in data) {
        await storeData('token', data.token);
        await storeData('username', data.username);
        dispatch(setUser({ token: data.token, username: data.username }));
        setLogin(false);
        setLoggedUser(data.username);
        navigation.navigate('QrscanTab');
      } else {
        setModalVisible(true);
        setTimeout(() => {
          setModalVisible(false);
        }, 3000);
      }
    })
  }

  const handleLogout = async () => {
    await storeData('token', "");
    await storeData('username', "");
    dispatch(clearUser());
    setLogin(true);
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <Image source={Logo} style={styles.logo} />
      </View>

      {modalVisible ? (
        <Modal 
          text="Usuario o contraseña incorrectos"
          width={300}
          height={200}
          color={COLORS.red}
          textColor={COLORS.white}
          margin={0}
        />
      ): (
        <></>
      )}
 
      {login ? (
          <View style={styles.containerLogin}>
            <InputText
              text="Usuario"
              width={250}
              height={35}
              color={COLORS.white}
              textColor={COLORS.text}
              margin={10}
              value={usernameValue}
              onChangeText={setUsernameValue}
            />
            <InputText
              text="Contraseña"
              width={250}
              height={35}
              color={COLORS.white}
              textColor={COLORS.text}
              margin={10}
              value={passwordValue}
              onChangeText={setPasswordValue}
              secureTextEntry={true}
            />
            <ButtonText
              text="Ingresar"
              width={250}
              height={35}
              color={COLORS.red}
              textColor={COLORS.white}
              margin={20}
              onPress={handleLogin}
            />
          </View>
      ) : (
          <View style={styles.containerLogin}>
            <BadgeText
              text={loggedUser}
              width={250}
              height={35}
              color={COLORS.blue}
              textColor={COLORS.white}
              margin={0}
            />
            <ButtonText
              text="Salir"
              width={250}
              height={35}
              color={COLORS.green}
              textColor={COLORS.white}
              margin={20}
              onPress={handleLogout}
            />
          </View>
      )}
   
    </View>
  );
};

export default Login;
