import React from 'react';
import { StyleSheet, Text, View, StatusBar, SegmentedControlIOSComponent } from 'react-native';
import propTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const weatherOptions = {
  Thunderstorm: { iconName: 'thunderstorm', gradient: ['#000000', '#434343'] },
  Drizzle: { iconName: 'rainy-outline', gradient: ['#c0c0aa', '#1cefff'] },
  Rain: { iconName: 'rainy', gradient: ['#9CECFB', '#65C7F7', '#0052D4'] },
  Snow: { iconName: 'snow', gradient: ['#c0c0aa', '#1cefff'] },
  Clear: { iconName: 'sunny', gradient: ['#00c3ff', '#ffff1c'] },
  Clouds: { iconName: 'partly-sunny', gradient: ['#bdc3c7', '#2c3e50'] }
}
export const Weather = ({ data }) => {
  const main = data.data?.main || {};
  const place = data.data?.name || 'unknow';
  const weather = data.data?.weather[0]?.main || 'Clear';

  return (
    <LinearGradient
      style={styles.container}
      colors={weatherOptions[weather].gradient}
    >
      <View style={styles.halfContainer}>
        <Ionicons
          name={weatherOptions[weather].iconName}
          size={60}
          color="white"
        />
        <Text style={styles.temp}>
          {Math.round(main?.temp) || 0}°
        </Text>
      </View>
      <View style={{...styles.halfContainer, ...styles.textContainer}}>
        <Text style={styles.title}>
          Feels: {Math.round(main?.feels_like) || 0}°
        </Text>
        <Text style={styles.subtitle}>
          {place}
        </Text>
      </View>
    </LinearGradient>
  );
};

Weather.prototype = {
  temp: propTypes.number.isRequired,
  condition: propTypes.oneOf(['Thunderstorm', 'Drizzle', 'Rain', 'Snow', 'Atmosphere', 'Clear', 'Clouds']).isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  halfContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 46,
    textAlign: 'center',
  },
  subtitle: {
    color: '#FFFFFF',
    fontSize: 36,
    textAlign: 'center',
  },
  temp: {
    color: '#FFFFFF',
    fontSize: 46,
  },
})
