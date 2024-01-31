import React, { useContext, useState } from 'react';
import UserCard from '../components/cards/UserCard';
import { toastConfig } from '../styles/ToastStyles';
import { UserContext } from '../controller/UserContext';
import { View, StyleSheet, Linking, Alert } from 'react-native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import SettingsPwdModal from '../components/modals/SettingsPwdModal';
import CustomModal from '../components/customComponents/CustomModal';
import SettingsUserModal from '../components/modals/SettingsUserModal';
import EnableBiometrics from '../components/contents/EnableBiometrics';
import SettingsButton from '../components/customComponents/SettingsButton';

const Settings = ({ navigation }: any) => {
    const { userLogout, userData }: any = useContext(UserContext);
    const [selectedIcon, setSelectedIcon] = useState(userData.icon_name);
    const [modalUserVisible, setModalUserVisible] = useState(false);
    const [modalPwdVisible, setModalPwdVisible] = useState(false);
    const [modalFingerVisible, setModalFingerVisible] = useState(false);
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
                    icon="file-edit-outline"
                    buttonName="Editar perfil"
                    onAction={() => setModalUserVisible(!modalUserVisible)}
                />
                <SettingsButton
                    icon="eye-off-outline"
                    buttonName="Cambiar contraseña"
                    onAction={() => setModalPwdVisible(!modalPwdVisible)}
                />
                <SettingsButton
                    icon="fingerprint"
                    buttonName="Habilitar Biometrics"
                    onAction={() => setModalFingerVisible(!modalFingerVisible)}
                />
                <SettingsButton
                    icon="link"
                    buttonName="Acerca de XXX"
                    onAction={() => {
                        Linking.openURL(
                            'https://landingpa-3022d.web.app/',
                        ).catch(() => console.log('Error al abrir el enlace'));
                    }}
                />
                <SettingsButton
                    icon="power"
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
            <CustomModal
                viewMode={true}
                title="Habilitar Inicio con Huella"
                content={
                    <EnableBiometrics
                        setModalFingerVisible={setModalFingerVisible}
                    />
                }
                modalVisible={modalFingerVisible}
                setModalVisible={setModalFingerVisible}
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
