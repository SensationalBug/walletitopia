import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import Navigation from './src/router/Navigation';
import AccProvider from './src/controller/AccountsContext';
import CatProvider from './src/controller/CategoriesContext';
import UserProvider from './src/controller/UserContext';

function App(): JSX.Element {
    return (
        <UserProvider>
            <AccProvider>
                <CatProvider>
                    <View style={styles.sectionContainer}>
                        <StatusBar barStyle="default" />
                        <Navigation />
                    </View>
                </CatProvider>
            </AccProvider>
        </UserProvider>
    );
}

const styles = StyleSheet.create({
    sectionContainer: {
        flex: 1,
    },
});

export default App;
