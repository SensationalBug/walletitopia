import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';

const SettingsButton = ({ buttonName, onAction }: any) => {
    return (
        <TouchableOpacity onPress={onAction} style={styles.buttonContainer}>
            <Text style={styles.buttonText}>{buttonName}</Text>
        </TouchableOpacity>
    );
};

export default SettingsButton;

const styles = StyleSheet.create({
    buttonContainer: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
    },
    buttonText: {
        fontSize: 20,
    },
});
