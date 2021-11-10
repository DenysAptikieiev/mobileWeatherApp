import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: 'lightgreen',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#2C2C2C',
    fontSize: 36,
  }
})

export const Loading = () => {
  return(
    <View style={styles.loading}>
      <Text style={styles.text}>Loading weather...</Text>
    </View>
  )
}