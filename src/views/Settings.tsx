import React, { useContext, useState } from 'react';
import UserCard from '../components/cards/UserCard';
import { UserContext } from '../controller/UserContext';
import { View, StyleSheet, Linking, Alert } from 'react-native';
import SettingsUserModal from '../components/modals/SettingsUserModal';
import SettingsButton from '../components/customComponents/SettingsButton';
import SettingsPwdModal from '../components/modals/SettingsPwdModal';

const Settings = ({ navigation }: any) => {
    const { userLogout }: any = useContext(UserContext);
    const [selectedIcon, setSelectedIcon] = useState('bus');
    const [modalUserVisible, setModalUserVisible] = useState(false);
    const [modalPwdVisible, setModalPwdVisible] = useState(false);
    const alert = () => {
        Alert.alert('Advertencia', 'Seguro que quiere cerrar sesión?', [
            {
                text: 'No',
            },
            {
                text: 'Si',
                onPress: () => userLogout(navigation, 'Login'),
            },
        ]);
    };
    return (
        <View style={styles.container}>
            <UserCard iconName={selectedIcon} userName="Pedro De Leon" />
            <View>
                <SettingsButton
                    icon="edit"
                    buttonName="Editar perfil"
                    onAction={() => setModalUserVisible(!modalUserVisible)}
                />
                <SettingsButton
                    icon="eye-slash"
                    buttonName="Cambiar contraseña"
                    onAction={() => setModalPwdVisible(!modalPwdVisible)}
                />
                <SettingsButton
                    disabled={true}
                    icon="bookmark-o"
                    buttonName="Recordatorios"
                    onAction={() => {
                        navigation.navigate('Categorias');
                    }}
                />
                <SettingsButton
                    icon="external-link"
                    buttonName="Acerca de XXX"
                    onAction={() => {
                        Linking.openURL(
                            'https://landingpa-3022d.web.app/',
                        ).catch(() => console.log('Error al abrir el enlace'));
                    }}
                />
                <SettingsButton
                    icon="power-off"
                    buttonName="Cerrar sesión"
                    onAction={() => alert()}
                />
            </View>
            <SettingsUserModal
                selectedIcon={selectedIcon}
                modalVisible={modalUserVisible}
                setSelectedIcon={setSelectedIcon}
                setModalVisible={setModalUserVisible}
            />
            <SettingsPwdModal
                modalVisible={modalPwdVisible}
                setModalVisible={setModalPwdVisible}
            />
        </View>
    );
};

export default Settings;

const styles = StyleSheet.create({
    container: {
        height: '100%',
    },
});
