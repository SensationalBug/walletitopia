import React, { useContext } from 'react';
import UserCard from '../components/cards/UserCard';
import { UserContext } from '../controller/UserContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, TouchableOpacity, StyleSheet, Linking } from 'react-native';
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
                        navigation.navigate('Inicio');
                    }}
                />
                <SettingsButton
                    buttonName="Cambiar contraseña"
                    onAction={() => {
                        navigation.navigate('Cuentas');
                    }}
                />
                <SettingsButton
                    buttonName="Recordatorios"
                    onAction={() => {
                        navigation.navigate('Categorias');
                    }}
                />
                <SettingsButton
                    buttonName="Acerca de XXX"
                    onAction={() => {
                        Linking.openURL(
                            'https://landingpa-3022d.web.app/',
                        ).catch(() => console.log('Error al abrir el enlace'));
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
        paddingHorizontal: 30,
        alignItems: 'flex-end',
    },
});
