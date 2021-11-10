import React, {useEffect, useState} from 'react';
import {Alert, Modal, View, Text, StyleSheet} from 'react-native';
import * as Location from 'expo-location';
import { StatusBar } from 'expo-status-bar';
import {Loading} from "./Loading";
import {getWeather} from "./api/api";

const App = () => {

  const [isLatitude, setIsLatitude] = useState(null);
  const [isLongitude, setIsLongitude] = useState(null);
  const [isLoading, setIsLoading] = useState(true)

  // if (isLatitude && isLongitude) console.log(`Широта:${isLatitude} Долгота:${isLongitude}`);

  const getLocation = async () =>  {
    try {
      await Location.requestForegroundPermissionsAsync();
      await Location.getForegroundPermissionsAsync();
      const {coords: {latitude, longitude}} = await Location.getCurrentPositionAsync();
      return {
        latitude: latitude,
        longitude: longitude
      }
      // TODO: have to do request to API
    } catch (error) {
      Alert.alert('Sorry, I can\'t get your location. Please give permission')
      return error;
    }
  }

  const Info = () => {
    const styles = StyleSheet.create({
      component: {
        flex: 1,
        backgroundColor: 'lightgreen',
        justifyContent: "center",
        alignItems: "center"
      }
    })
    return (
      <View style={styles.component}>
        <Text>{`Широта:${isLatitude} Долгота:${isLongitude}`}</Text>
      </View>
    )
  }

  useEffect(() => {
    getLocation()
      .then(data => {
        const {latitude, longitude} = data;
        setIsLoading(false)
        setIsLatitude(latitude);
        setIsLongitude(longitude)
        getWeather(latitude, longitude)
          .then(data => console.log(data))
          .catch(error => console.log(error))
      })
      .catch(error => {
        console.log(error)
        setIsLoading(true)
      })
  }, []);

  return (
    isLoading ? <Loading/> : <Info/>
  );
};

export default App;


