import React from 'react';
import { LogBox, SafeAreaView, StatusBar } from 'react-native';
import { MenuProvider } from 'react-native-popup-menu';

import AppProvider from './src/hooks';
import Routes from './src/routes'

export default function App() {
  LogBox.ignoreAllLogs(true);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor="#0c6eb5" />

      <MenuProvider>
        <AppProvider>
          <Routes />
        </AppProvider>
      </MenuProvider>
    </SafeAreaView>
  );
}
