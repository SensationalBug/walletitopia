import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { UserContext } from '../controller/UserContext';

const Settings = ({ navigation }: any) => {
    const { userLogout }: any = useContext(UserContext);
    return (
        <View>
            <TouchableOpacity onPress={() => userLogout(navigation, 'Login')}>
                <Text>Salir</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Settings;
