import React, { useContext, useState } from 'react';
import UserCard from '../components/cards/UserCard';
import { UserContext } from '../controller/UserContext';
import { View, StyleSheet, Linking, Alert } from 'react-native';
import SettingsUserModal from '../components/modals/SettingsUserModal';
import SettingsButton from '../components/customComponents/SettingsButton';
import SettingsPwdModal from '../components/modals/SettingsPwdModal';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { toastConfig } from '../styles/ToastStyles';

const Settings = ({ navigation }: any) => {
    const { userLogout, userData }: any = useContext(UserContext);
    const [selectedIcon, setSelectedIcon] = useState(userData.icon_name);
    const [modalUserVisible, setModalUserVisible] = useState(false);
    const [modalPwdVisible, setModalPwdVisible] = useState(false);
    const [userDataLocal, setUserDataLocal] = useState({
        userName: userData.full_name,
        iconName: selectedIcon,
    });
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
            <UserCard
                iconName={selectedIcon}
                userName={userDataLocal.userName}
            />
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
                userDataLocal={userDataLocal}
                setUserDataLocal={setUserDataLocal}
            />
            <SettingsPwdModal
                modalVisible={modalPwdVisible}
                setModalVisible={setModalPwdVisible}
            />
            <Toast config={toastConfig} />
        </View>
    );
};

export default Settings;

const styles = StyleSheet.create({
    container: {
        height: '100%',
    },
});
