import React from 'react';
import FontAwesome from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../views/Home';
import Accounts from '../views/Accounts';
import Categories from '../views/Categories';
import Settings from '../views/Settings';
// import Metrics from '../views/Metrics';

const Tab = createBottomTabNavigator();

const homeIcon = (color: any, iconName: string) => (
    <FontAwesome name={iconName} color={color} size={26} />
);
const TabNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName="Accounts"
            screenOptions={{
                tabBarActiveTintColor: '#122e49',
                tabBarInactiveTintColor: '#c4c4c4',
                tabBarItemStyle: { paddingVertical: 5 },
                tabBarStyle: { backgroundColor: '#ffffff', height: 60 },
            }}>
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused, color }: any) =>
                        focused
                            ? homeIcon(color, 'home')
                            : homeIcon(color, 'home-outline'),
                }}
            />
            <Tab.Screen
                name="Accounts"
                component={Accounts}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused, color }: any) =>
                        focused
                            ? homeIcon(color, 'wallet')
                            : homeIcon(color, 'wallet-outline'),
                }}
            />
            <Tab.Screen
                name="Categories"
                component={Categories}
                options={{
                    headerTitle: 'Categorias',
                    headerTitleStyle: { color: '#122e49' },
                    headerStyle: { backgroundColor: '#fff' },
                    tabBarIcon: ({ focused, color }: any) =>
                        focused
                            ? homeIcon(color, 'layers')
                            : homeIcon(color, 'layers-outline'),
                }}
            />
            {/* <Tab.Screen
                name="Métricas"
                component={Metrics}
                options={{
                    headerTitleStyle: { color: '#122e49' },
                    headerStyle: { backgroundColor: '#fff' },
                    tabBarIcon: ({ focused, color }: any) =>
                        focused
                            ? homeIcon(color, 'stats-chart')
                            : homeIcon(color, 'stats-chart-outline'),
                }}
            /> */}
            <Tab.Screen
                name="Ajustes"
                component={Settings}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused, color }: any) =>
                        focused
                            ? homeIcon(color, 'cog')
                            : homeIcon(color, 'cog-outline'),
                }}
            />
        </Tab.Navigator>
    );
};

export default TabNavigator;
