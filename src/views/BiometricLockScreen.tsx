import React, { useEffect, useState }  from 'react';
import { View, StyleSheet, Alert, Platform } from 'react-native';
import { Button, Text, ActivityIndicator } from 'react-native-paper'; // Or other UI libraries used
// IMPORTANT: Import the actual biometric library used in the project here!
// For example, if using expo-local-authentication:
// import * as LocalAuthentication from 'expo-local-authentication'; 
// Or if using react-native-biometrics:
// import ReactNativeBiometrics from 'react-native-biometrics';

const BiometricLockScreen = ({ navigation }: any) => {
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const performBiometricAuth = async () => {
        setIsAuthenticating(true);
        setError(null);

        try {
            // === Placeholder for actual biometric authentication logic ===
            // This section needs to be filled with the project's specific biometric library usage.
            // Example using expo-local-authentication:
            /*
            const hasHardware = await LocalAuthentication.hasHardwareAsync();
            if (!hasHardware) {
                setError("Biometric hardware not available.");
                setIsAuthenticating(false);
                // Potentially navigate away or show a different message, 
                // as biometrics can't be used. Or this screen shouldn't be reached
                // if hardware is not available (checked during enable step).
                Alert.alert("Error", "Biometric hardware not available on this device.");
                // For now, let's assume if this screen is shown, hardware is available.
                // Fallback: Allow entry, or this should be handled by not enabling biometrics.
                // navigation.replace('Entry'); // Or a more appropriate fallback
                return;
            }

            const isEnrolled = await LocalAuthentication.isEnrolledAsync();
            if (!isEnrolled) {
                setError("No biometrics enrolled on this device.");
                setIsAuthenticating(false);
                Alert.alert(
                    "Error", 
                    "No biometrics enrolled. Please enroll biometrics in your device settings or disable biometric protection in the app settings."
                );
                // Fallback: Allow entry, or this should be handled by not enabling biometrics.
                // navigation.replace('Entry'); // Or a more appropriate fallback
                return;
            }

            const result = await LocalAuthentication.authenticateAsync({
                promptMessage: 'Authenticate to access Walletitopia',
                disableDeviceFallback: true, // Do not allow device PIN/pattern as fallback
                cancelLabel: 'Cancel',
            });

            if (result.success) {
                navigation.replace('Entry'); // Navigate to Entry, which then goes to Main
            } else {
                setError(result.error === 'user_cancel' ? 'Authentication cancelled.' : 'Authentication failed.');
                // Do not automatically retry here to avoid loops on persistent failure. 
                // User can press the "Retry" button.
                if (result.error && result.error !== 'user_cancel') {
                     Alert.alert("Authentication Failed", "Could not verify your identity. Please try again.");
                }
            }
            */
            // === End of Placeholder ===

            // --- SIMULATED BIOMETRIC FOR NOW ---
            // Remove this simulation when actual biometric lib is integrated
            console.log("Biometric authentication logic needs to be implemented here.");
            Alert.alert(
                "Biometric Not Implemented", 
                "This is a placeholder. Press OK to simulate successful authentication.", 
                [{ text: "OK", onPress: () => navigation.replace('Entry') }]
            );
            // --- END OF SIMULATION ---

        } catch (e: any) {
            console.error("Biometric authentication error", e);
            setError("An unexpected error occurred during authentication.");
            Alert.alert("Error", "An unexpected error occurred. Please try again.");
        } finally {
            setIsAuthenticating(false);
        }
    };

    useEffect(() => {
        // Automatically trigger auth when the screen loads
        performBiometricAuth();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Biometric Lock</Text>
            {isAuthenticating ? (
                <ActivityIndicator animating={true} size="large" />
            ) : (
                <Button 
                    mode="contained" 
                    onPress={performBiometricAuth}
                    style={styles.button}
                    icon="fingerprint" // Example icon
                >
                    Retry Authentication
                </Button>
            )}
            {error && <Text style={styles.errorText}>{error}</Text>}
            <Text style={styles.infoText}>
                Please authenticate using your device's biometric sensor.
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#1c1c1e', // Darker background
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
        color: '#fff',
    },
    button: {
        marginTop: 20,
        width: '80%',
        paddingVertical: 8,
    },
    errorText: {
        color: 'red',
        marginTop: 15,
        textAlign: 'center',
    },
    infoText: {
        color: '#aaa',
        marginTop: 30,
        textAlign: 'center',
        fontSize: 16,
    }
});

export default BiometricLockScreen;
