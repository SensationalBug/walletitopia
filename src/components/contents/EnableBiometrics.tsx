import React, { useContext } from 'react';
import { UserContext } from '../../controller/UserContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, TouchableOpacity, StyleSheet, Alert, Text } from 'react-native'; // Added Text

// Removed TextInput, Button from react-native-paper
// Removed AsyncStorage as it's handled in UserContext

const EnableBiometrics = ({ setModalFingerVisible }: any) => { // setModalFingerVisible prop is kept
    const {
        isBiometricProtectionEnabled,
        toggleBiometricProtection,
        // showToastAlert, // Assuming UserContext still provides this, if needed for other alerts
    }: any = useContext(UserContext);

    const styles = StyleSheet.create({
        contentView: {
            flex: 1,
            justifyContent: 'center', // Centering the toggle
            alignItems: 'center',
            padding: 20,
        },
        checkBoxView: {
            alignItems: 'center',
            // Removed styles for text inputs and old buttons
        },
        checkBoxText: { // Added style for a label
            color: '#fff',
            fontSize: 18,
            marginBottom: 10,
        },
        // Removed textinputView and checkBoxButton (old button style)
    });

    const handleTogglePress = () => {
        if (isBiometricProtectionEnabled) {
            // Trying to disable
            Alert.alert(
                'Desactivar Protección',
                '¿Seguro que quieres desactivar la protección con huella/biometría?',
                [
                    { text: 'No', style: 'cancel' },
                    {
                        text: 'Sí',
                        onPress: () => {
                            toggleBiometricProtection();
                            if (setModalFingerVisible) setModalFingerVisible(false); // Close modal if prop is used
                        }
                    },
                ],
                { cancelable: true }
            );
        } else {
            // Trying to enable
            toggleBiometricProtection();
            if (setModalFingerVisible) setModalFingerVisible(false); // Close modal if prop is used
        }
    };

    const iconName = isBiometricProtectionEnabled ? 'checkbox-marked-outline' : 'checkbox-blank-outline';

    return (
        <View style={styles.contentView}>
            {/* Removed TextInput views and "Guardar datos de huella" button */}
            {/* The "Desactivar huella" button is also effectively replaced by the toggle logic below */}
            
            <View style={styles.checkBoxView}>
                <Text style={styles.checkBoxText}>
                    {isBiometricProtectionEnabled ? 'Biometría Activada' : 'Activar Biometría'}
                </Text>
                <TouchableOpacity onPress={handleTogglePress}>
                    <Icon name={iconName} color={'#fff'} size={60} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default EnableBiometrics;
