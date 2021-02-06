import React from 'react';
import { Text, View } from 'react-native';

import { enableScreens } from 'react-native-screens';
import { NavigationContainer, Route } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { createCollapsibleStack, disableExpoTranslucentStatusBar } from 'react-navigation-collapsible';

import { navigationRef, navigate } from './RootNavigation';

import TechNews from './pages/TechNews/Articles'
import TechNewsArticlesTabs from './TechNewsArticlesTabs';
import TechNewsDetail from './pages/TechNews/Detail'

import TechNewsDefinitions from './pages/TechNews/Definitions';
import TechNewsSocialAuth from './pages/TechNews/SocialAuth'
import TechNewsRefresh from './pages/TechNews/Refresh'

import HeaderRight from './components/HeaderRight'
import HeaderRightNewsDetail from './components/HeaderRightNewsDetail'

import { MaterialIcons } from '@expo/vector-icons';

enableScreens();
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>

        <Stack.Screen name="TechNewsArticlesTabs" component={TechNewsArticlesTabs}
          options={{
            headerStyle: {
              backgroundColor: '#1B75CB'
            },
            headerTintColor: '#fff',
            headerHideShadow: true,
            title: 'Tech News',
            headerRight: (props) => (
              <HeaderRight />
            ),
          }}
        />

        <Stack.Screen name="TechNewsDetail" component={TechNewsDetail}
          options={{
            headerStyle: { backgroundColor: '#1B75CB' },
            headerTintColor: '#fff',
            title: 'Post',
            headerRight: (props) => (
              <HeaderRightNewsDetail {...props} />
            ),
          }}
        />

        <Stack.Screen name="TechNewsDefinitions" component={TechNewsDefinitions}
          options={{
            headerStyle: { backgroundColor: '#1B75CB' },
            headerTintColor: '#fff',
            title: 'Definições',
          }}
        />

        <Stack.Screen name="TechNewsSocialAuth" component={TechNewsSocialAuth}
          options={{
            headerStyle: { backgroundColor: '#1B75CB' },
            headerTintColor: '#fff',
            title: 'Entrar - Login social',
          }}
        />

        <Stack.Screen name="TechNewsRefresh" component={TechNewsRefresh}
          options={{
            headerStyle: { backgroundColor: '#1B75CB' },
            headerTintColor: '#fff',
            title: 'Refresh',
          }}
        />

      </Stack.Navigator>
    </NavigationContainer >
  );
}