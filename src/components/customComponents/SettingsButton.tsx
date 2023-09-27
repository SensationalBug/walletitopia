import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const SettingsButton = ({ buttonName, onAction, icon, disabled }: any) => {
    const opacity = {
        on: 1,
        off: 0.2,
    };
    return (
        <TouchableOpacity
            onPress={onAction}
            disabled={disabled || false}
            style={styles.buttonContainer}>
            <Text
                style={[
                    styles.buttonText,
                    { opacity: disabled ? opacity.off : opacity.on },
                ]}>
                {buttonName}
            </Text>
            <Icon
                name={icon}
                size={20}
                color="#000"
                style={[{ opacity: disabled ? opacity.off : opacity.on }]}
            />
        </TouchableOpacity>
    );
};

export default SettingsButton;

const styles = StyleSheet.create({
    buttonContainer: {
        paddingHorizontal: 20,
        height: '15%',
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
