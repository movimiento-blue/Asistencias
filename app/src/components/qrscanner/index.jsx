import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Audio } from 'expo-av';

import { COLORS } from "../../constants";
import Modal from '../modal';

import { styles } from './styles';

const API_URL = 'http://192.168.1.14:8080/attendance';

const loadSound = async (soundFile) => {
  try {
    const soundObject = new Audio.Sound();
    await soundObject.loadAsync(soundFile);
    return soundObject;
  } catch (error) {
    console.error('Error al cargar el sonido:', error);
    return null;
  }
};


const QRScanner = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [text, setText] = useState('');
  const [okSound, setOkSound] = useState(null);
  const [badSound, setBadSound] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
      const loadSounds = async () => {
        const okSoundObject = await loadSound(require('../../../assets/sounds/qrok.mp3'));
        const badSoundObject = await loadSound(require('../../../assets/sounds/qrbad.mp3'));
        setOkSound(okSoundObject);
        setBadSound(badSoundObject);
      };
      loadSounds();
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    console.log(`Bar code with type ${type} and data ${data} has been scanned!`);
    try {
      const response = await fetch(`${API_URL}?id=${data}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
      });
      const jsonResponse = await response.json();
      if (jsonResponse.msg === 'asistencia registrada.') {
        if (okSound) {
          await okSound.replayAsync();
        }
      } else {
        if (badSound) {
          await badSound.replayAsync();
        }
      }
      setShowModal(true);
      setText(`${jsonResponse.nombre} ${jsonResponse.apellido}, ${jsonResponse.msg}`);
      setTimeout(() => {
        setScanned(false);
        setShowModal(false);
      }, 3000);
    } catch (error) {
      console.error('Error al llamar a la API:', error);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {showModal && <Modal text={text} width={300} height={200} color={COLORS.primary}/>}
    </View>
  );
};

export default QRScanner;


//      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}