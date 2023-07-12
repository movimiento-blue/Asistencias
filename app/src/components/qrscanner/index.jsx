import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

import { styles } from './styles';

const QRScanner = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
      (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
        console.log(status);
      })();
    }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
      setScanned(true);
      console.log(`Bar code with type ${type} and data ${data} has been scanned!`);
      const response = await fetch(`http://192.168.1.18:8080/attendance?id=${data}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },

      });
      console.log(response.msg, 'response-------------------------------------');
      setTimeout(() => {
        setScanned(false);
      }, 3000);
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
    </View>
  );
};

export default QRScanner

//      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}