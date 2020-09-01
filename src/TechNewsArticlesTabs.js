import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { origins } from './assets/origins.json';
import OriginArticles from '../src/pages/TechNews/Articles';
import { View } from 'react-native';

const Tab = createMaterialTopTabNavigator();
const lazyPlaceholder = () => <View />

function TechNewsArticlesTabs() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        scrollEnabled: true,
        lazy: true,
        renderLazyPlaceholder: lazyPlaceholder,
        indicatorStyle: {
          backgroundColor: '#1B75CB'
        },
        style: {
          elevation: 0,
          shadowOpacity: 0,
          backgroundColor: '#1B75CB'
        },
        labelStyle: {
          fontSize: 15,
          marginLeft: 0,
        },
        inactiveBackgroundColor: '#1B75CB',
        activeBackgroundColor: '#1B75CB',
        inactiveTintColor: '#aaa',
        activeTintColor: '#eee',
      }}
    >
      <Tab.Screen
        name="recentes"
        component={OriginArticles}
        initialParams={{ id: '' }}
        options={{ tabBarLabel: 'MAIS RECENTES' }}
      />
      {origins.map(({ title, url }, key) => (
        <Tab.Screen
          name={title}
          component={OriginArticles}
          initialParams={{ id: url, tabTitle: title }}
          options={{ tabBarLabel: title }}
          key={key}
        />
      ))}
    </Tab.Navigator>
  )
}

export default TechNewsArticlesTabs;