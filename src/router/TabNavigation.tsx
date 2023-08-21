import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../views/Home';
import Accounts from '../views/Accounts';
import Categories from '../views/Categories';
import Settings from '../views/Settings';

const Tab = createBottomTabNavigator();

const homeIcon = (color: any, iconName: string) => (
    <FontAwesome name={iconName} color={color} size={26} />
);
const TabNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName="Cuentas"
            screenOptions={{
                tabBarActiveTintColor: '#fff',
                tabBarInactiveTintColor: '#616161',
                tabBarItemStyle: { paddingVertical: 5 },
                tabBarStyle: { backgroundColor: '#122e49', height: 60 },
            }}>
            <Tab.Screen
                name="Inicio"
                component={Home}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }: any) => homeIcon(color, 'home'),
                }}
            />
            <Tab.Screen
                name="Cuentas"
                component={Accounts}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }: any) => homeIcon(color, 'wallet'),
                }}
            />
            <Tab.Screen
                name="Categorias"
                component={Categories}
                options={{
                    headerTitle: 'Nueva Categoria',
                    headerTitleStyle: { color: '#fff' },
                    headerStyle: { backgroundColor: '#122e49' },
                    tabBarIcon: ({ color }: any) => homeIcon(color, 'stream'),
                }}
            />
            <Tab.Screen
                name="Ajustes"
                component={Settings}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }: any) => homeIcon(color, 'cog'),
                }}
            />
        </Tab.Navigator>
    );
};

export default TabNavigator;
