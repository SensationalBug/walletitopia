import React, { useContext, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-paper';
import { UserContext } from '../controller/UserContext'; // Adjust path if needed

const EntryScreen = ({ navigation }: any) => {
    // Ensure UserContext provides these values and they are correctly typed in UserContext.tsx
    const { isBiometricProtectionEnabled, isLoading } = useContext(UserContext) as any; 

    useEffect(() => {
        // Only act once the loading of the flag is complete (isLoading is false)
        if (isLoading === false) { 
            if (isBiometricProtectionEnabled === true) {
                navigation.replace('BiometricLock'); // Ensure 'BiometricLock' route is defined in Navigation.tsx
            }
            // If biometrics are not enabled, the screen remains as is, showing the "Enter App" button.
            // No navigation needed here, the component will render its normal UI.
        }
    }, [isLoading, isBiometricProtectionEnabled, navigation]);

    const handleEnterApp = () => {
        navigation.replace('Main'); // Use replace to prevent going back to Entry screen
    };

    // If isLoading is true (or undefined initially), show a loading indicator.
    if (isLoading === true || isLoading === undefined) { 
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#122e49" /> 
            </View>
        );
    }

    // This part is rendered only if not loading AND biometrics are not enabled.
    return (
        <View style={styles.container}>
            <Button 
                mode="contained" 
                onPress={handleEnterApp}
                style={styles.button}
                labelStyle={styles.buttonLabel}
            >
                Enter App
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f0f0f0', 
    },
    button: {
        width: '80%',
        paddingVertical: 10,
        backgroundColor: '#122e49', 
    },
    buttonLabel: {
        fontSize: 18,
    },
    loadingContainer: { // Added loading container style
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0', // Optional: match other screen background
    },
});

export default EntryScreen;
