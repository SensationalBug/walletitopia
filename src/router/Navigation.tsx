import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Main from '../Main';
// import Login from '../views/Login'; // Removed Login import
import EntryScreen from '../views/EntryScreen'; // Import the new EntryScreen
import BiometricLockScreen from '../views/BiometricLockScreen'; // Import BiometricLockScreen
import HomeDetail from '../views/HomeDetail';
import MetricsDetail from '../views/MetricsDetail';

const Navigation = () => {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Entry">
                <Stack.Screen
                    name="Entry"
                    component={EntryScreen} // Use the new EntryScreen
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="BiometricLock"
                    component={BiometricLockScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Main"
                    component={Main}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="AccountDetails"
                    component={HomeDetail}
                    options={{
                        title: 'Detalles',
                        headerTintColor: '#122e49',
                        headerTitleStyle: { color: '#122e49' },
                        headerStyle: { backgroundColor: '#fff' },
                    }}
                />
                <Stack.Screen
                    name="MetricsDetail"
                    component={MetricsDetail}
                    options={{
                        title: 'MetricsDetail',
                        headerTintColor: '#122e49',
                        headerTitleStyle: { color: '#122e49' },
                        headerStyle: { backgroundColor: '#fff' },
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;
