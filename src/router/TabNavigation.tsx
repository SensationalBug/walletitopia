import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Home from '../views/Home';
import Accounts from '../views/Accounts';
import Login from '../views/Login';

const Tab = createMaterialBottomTabNavigator();

const homeIcon = () => {
  <MaterialCommunityIcons name="home" color="red" size={26} />;
};

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Login"
        component={Login}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }: any) => homeIcon(color),
        }}
      />
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Accounts" component={Accounts} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
