import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import Navigation from './src/router/Navigation';

function App(): JSX.Element {
  return (
    <View style={styles.sectionContainer}>
      <StatusBar barStyle="default" />
      <Navigation />
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
  },
});

export default App;
