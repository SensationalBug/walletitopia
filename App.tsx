import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import Navigation from './src/router/Navigation';
import AccountProvider from './src/controller/AccountsContext';
import CategoriesProvider from './src/controller/CategoriesContext';
import UserProvider from './src/controller/UserContext';
import GastosProvider from './src/controller/GastosContext';

function App(): JSX.Element {
    return (
        <UserProvider>
            <AccountProvider>
                <GastosProvider>
                    <CategoriesProvider>
                        <View style={styles.sectionContainer}>
                            <StatusBar barStyle="default" />
                            <Navigation />
                        </View>
                    </CategoriesProvider>
                </GastosProvider>
            </AccountProvider>
        </UserProvider>
    );
}

const styles = StyleSheet.create({
    sectionContainer: {
        flex: 1,
    },
});

export default App;
