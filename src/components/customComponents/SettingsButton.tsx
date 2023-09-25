import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const SettingsButton = ({ buttonName, onAction, icon }: any) => {
    return (
        <TouchableOpacity onPress={onAction} style={styles.buttonContainer}>
            <Text style={styles.buttonText}>{buttonName}</Text>
            <Icon name={icon} size={20} color="#000" />
        </TouchableOpacity>
    );
};

export default SettingsButton;

const styles = StyleSheet.create({
    buttonContainer: {
        padding: 20,
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#000',
        justifyContent: 'space-between',
    },
    buttonText: {
        fontSize: 20,
        color: '#000',
    },
});
