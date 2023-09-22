import React, { useContext } from 'react';
import UserCard from '../components/cards/UserCard';
import { UserContext } from '../controller/UserContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import SettingsButton from '../components/customComponents/SettingsButton';

const Settings = ({ navigation }: any) => {
    const { userLogout }: any = useContext(UserContext);
    return (
        <View style={styles.container}>
            <UserCard iconName="bus" userName="Pedro De Leon" />
            <View style={styles.options}>
                <SettingsButton
                    buttonName="Editar perfil"
                    onAction={() => {
                        console.log('Editar perfil');
                    }}
                />
                <SettingsButton
                    buttonName="Cambiar contraseña"
                    onAction={() => {
                        console.log('Cambiar contraseña');
                    }}
                />
                <SettingsButton
                    buttonName="Recordatorios"
                    onAction={() => {
                        console.log('Recordatorios');
                    }}
                />
                <SettingsButton
                    buttonName="Acerca de XXX"
                    onAction={() => {
                        console.log('Acerca de XXX');
                    }}
                />
            </View>
            <View style={styles.logOut}>
                <TouchableOpacity
                    onPress={() => userLogout(navigation, 'Login')}>
                    <Icon name="power-off" size={30} color="#ff0000" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Settings;

const styles = StyleSheet.create({
    container: {
        height: '100%',
    },
    userData: {
        height: '30%',
    },
    options: {
        height: '60%',
        paddingVertical: 10,
    },
    logOut: {
        padding: 10,
        alignItems: 'flex-end',
    },
});
