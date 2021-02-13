import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

//import { View } from 'react-native';
import { origins } from './assets/origins.json';
import OriginArticles from './pages/TechNews/Articles';

const Tab = createMaterialTopTabNavigator();
//const lazyPlaceholder = () => <View />;

function TechNewsArticlesTabs() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        scrollEnabled: true,
        //lazy: true,
        //renderLazyPlaceholder: lazyPlaceholder,
        indicatorStyle: {
          backgroundColor: '#1B75CB'
        },
        style: {
          elevation: 0,
          shadowOpacity: 0,
          backgroundColor: '#1B75CB'
        },
        labelStyle: {
          fontSize: 14,
          margin: 0
        },
        //inactiveBackgroundColor: '#1B75CB',
        //activeBackgroundColor: '#1B75CB',
        inactiveTintColor: '#aaa',
        activeTintColor: '#eee'
      }}
    >
      <Tab.Screen
        name="recentes"
        component={OriginArticles}
        initialParams={{ id: '' }}
        options={{ tabBarLabel: 'MAIS RECENTES' }}
      />
      {origins.map(({ title, url }) => (
        <Tab.Screen
          name={title}
          component={OriginArticles}
          initialParams={{ id: url, tabTitle: title }}
          options={{ tabBarLabel: title }}
          key={url}
        />
      ))}
    </Tab.Navigator>
  );
}

export default TechNewsArticlesTabs;
