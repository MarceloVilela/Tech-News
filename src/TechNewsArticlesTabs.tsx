import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import env from '../env';

//import { View } from 'react-native';
import { origins } from './assets/origins.json';
import OriginArticles from './pages/TechNews/Articles';
import { useDefinitions } from './hooks/definitions';
import { day, night } from './styles';

const Tab = createMaterialTopTabNavigator();
//const lazyPlaceholder = () => <View />;

function TechNewsArticlesTabs() {
  const { definitions } = useDefinitions();
  const theme = definitions?.appearance_darkMode === 'true' ? night : day;

  return (
    <Tab.Navigator
      tabBarOptions={{
        scrollEnabled: true,
        //lazy: true,
        //renderLazyPlaceholder: lazyPlaceholder,
        indicatorStyle: {
          backgroundColor: theme.primary400,
        },
        style: {
          elevation: 0,
          shadowOpacity: 0,
          backgroundColor: theme.primary400,
        },
        labelStyle: {
          fontSize: 12,
          margin: 0
        },
        inactiveTintColor: '#aaa',
        activeTintColor: '#eee',
      }}
    >
      <Tab.Screen
        name="recentes"
        component={OriginArticles}
        initialParams={{ id: '', BIN_ID: env.jsonbinDocIdRecents }}
        options={{ tabBarLabel: 'MAIS RECENTES' }}
      />
      {origins.map(({ title, url, BIN_ID }) => (
        <Tab.Screen
          name={title}
          component={OriginArticles}
          initialParams={{ id: url, tabTitle: title, BIN_ID }}
          options={{ tabBarLabel: title }}
          key={url}
        />
      ))}
    </Tab.Navigator>
  );
}

export default TechNewsArticlesTabs;
