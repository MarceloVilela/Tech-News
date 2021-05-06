import React from 'react';

import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { navigationRef } from './RootNavigation';

import TechNewsArticlesTabs from './TechNewsArticlesTabs';
import TechNewsDetail from './pages/TechNews/Detail';

import TechNewsDefinitions from './pages/TechNews/Definitions';
import TechNewsSocialAuth from './pages/TechNews/SocialAuth';
import TechNewsRefresh from './pages/TechNews/Refresh';
import TechNewsPlaceholder from './pages/TechNews/Placeholder';

import HeaderRight from './components/HeaderRight';
import HeaderRightNewsDetail from './components/HeaderRightNewsDetail';

enableScreens();
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen
          name="TechNewsArticlesTabs"
          component={TechNewsArticlesTabs}
          options={{
            headerStyle: {
              backgroundColor: '#1B75CB'
            },
            headerTintColor: '#fff',
            headerHideShadow: true,
            title: 'Tech News',
            headerRight: () => <HeaderRight />
          }}
        />

        <Stack.Screen
          name="TechNewsDetail"
          component={TechNewsDetail}
          options={{
            headerStyle: { backgroundColor: '#1B75CB' },
            headerTintColor: '#fff',
            title: 'Post',
            headerRight: () => <HeaderRightNewsDetail />
          }}
        />

        <Stack.Screen
          name="TechNewsDefinitions"
          component={TechNewsDefinitions}
          options={{
            headerStyle: { backgroundColor: '#1B75CB' },
            headerTintColor: '#fff',
            title: 'Definições'
          }}
        />

        <Stack.Screen
          name="TechNewsSocialAuth"
          component={TechNewsSocialAuth}
          options={{
            headerStyle: { backgroundColor: '#1B75CB' },
            headerTintColor: '#fff',
            title: 'Entrar - Login social'
          }}
        />

        <Stack.Screen
          name="TechNewsRefresh"
          component={TechNewsRefresh}
          options={{
            headerStyle: { backgroundColor: '#1B75CB' },
            headerTintColor: '#fff',
            title: 'Refresh'
          }}
        />

        <Stack.Screen
          name="TechNewsPlaceholder"
          component={TechNewsPlaceholder}
          options={{
            headerStyle: { backgroundColor: '#1B75CB' },
            headerTintColor: '#fff',
            title: 'Placeholder'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
