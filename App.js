import React, {useEffect, useState} from 'react';
import {Alert, Modal, View, Text, StyleSheet} from 'react-native';
import * as Location from 'expo-location';
import { StatusBar } from 'expo-status-bar';
import {Loading} from "./components/Loading/Loading";
import {getWeather} from "./api/api";
import {Weather} from "./components/Weather/Weather";

const App = () => {

  const [isLatitude, setIsLatitude] = useState(null);
  const [isLongitude, setIsLongitude] = useState(null);
  const [isLoading, setIsLoading] = useState(true)
  const [isTemp, setIsTemp] = useState(null);
  const [isData, setIsData] = useState({});

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
          .then(data => setIsData(data))
          .catch(error => console.log(error))
      })
      .catch(error => {
        console.log(error)
        setIsLoading(true)
      })
    return () => {

    }
  }, []);

  return (
    isLoading ? <Loading/> : <Weather data={isData}/>
  );
};

export default App;


