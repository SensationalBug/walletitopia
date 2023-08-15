import React, { useState } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Home from '../views/Home';
import Accounts from '../views/Accounts';
import Login from '../views/Login';

const Tab = createMaterialBottomTabNavigator();

const homeIcon = (color: any, iconName: string) => (
  <Icon name={iconName} color={color} size={30} />
);

const TabNavigator = () => {
  const [bgColor, setBgColor] = useState('red');
  return (
    <Tab.Navigator
      shifting
      activeColor="blue"
      barStyle={{ backgroundColor: bgColor }}>
      <Tab.Screen
        name="Login"
        component={Login}
        options={{
          tabBarIcon: ({ color }) => homeIcon(color, 'abugida-devanagari'),
          tabBarColor: '#000',
        }}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => homeIcon(color, 'abjad-arabic'),
          tabBarColor: 'red',
        }}
      />
      <Tab.Screen
        name="Accounts"
        component={Accounts}
        options={{
          tabBarIcon: ({ color }) => homeIcon(color, 'abjad-hebrew'),
          tabBarColor: 'red',
        }}
      />
      <Tab.Screen
        name="Accounts2"
        component={Accounts}
        options={{
          tabBarIcon: ({ color }) => homeIcon(color, 'abugida-thai'),
          tabBarColor: 'red',
        }}
      />
      <Tab.Screen
        name="Accounts3"
        component={Accounts}
        options={{
          tabBarIcon: ({ color }) => homeIcon(color, 'alien'),
          tabBarColor: 'red',
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
