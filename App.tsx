import React from 'react';
import { LogBox, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { MenuProvider } from 'react-native-popup-menu';
import AppProvider from './src/hooks';

import Routes from './src/routes'

export default function App() {
  LogBox.ignoreAllLogs(true)
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor="#0c6eb5" />
      {/*<View style={styles.statusBar} />*/}
      <MenuProvider>
        <AppProvider>
          <Routes />
        </AppProvider>
      </MenuProvider>
    </SafeAreaView>
  );
}

//https://docs.expo.io/versions/latest/guides/configuring-statusbar/
const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: '#2196F3',
    height: Constants.statusBarHeight,
  },

  // rest of the styles
});
