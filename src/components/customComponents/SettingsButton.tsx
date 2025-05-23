import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { SettingsButtonStyle } from '../../styles/GlobalStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SettingsButton = ({ buttonName, onAction, icon }: any) => {
    return (
        <TouchableOpacity
            onPress={onAction}
            style={SettingsButtonStyle.buttonContainer}>
            <Text style={[SettingsButtonStyle.buttonText]}>{buttonName}</Text>
            <Icon name={icon} size={30} color="#000" />
        </TouchableOpacity>
    );
};

export default SettingsButton;
