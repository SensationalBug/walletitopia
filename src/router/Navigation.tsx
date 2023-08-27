import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Main from '../Main';
import Login from '../views/Login';
import AddGasto from '../views/AddGasto';
import AccountDetails from '../views/AccountDetails';

const Navigation = () => {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Main"
                    component={Main}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="AddGasto"
                    component={AddGasto}
                    options={{
                        title: 'Añadir gasto',
                        headerTitleStyle: { color: '#fff' },
                        headerStyle: { backgroundColor: '#122e49' },
                    }}
                />
                <Stack.Screen
                    name="AccountDetails"
                    component={AccountDetails}
                    options={{
                        title: 'Detalles',
                        headerTitleStyle: { color: '#fff' },
                        headerStyle: { backgroundColor: '#122e49' },
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;
