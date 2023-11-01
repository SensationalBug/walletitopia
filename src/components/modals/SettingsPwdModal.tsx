import {
    GlobalConfigColor,
    SettingsModalButtonsStyles,
} from '../../styles/GlobalStyles';
import React, { useContext } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { UserContext } from '../../controller/UserContext';
import FormTextInput from '../customComponents/FormTextInput';
import { View, Modal, StyleSheet, TouchableOpacity, Text } from 'react-native';

const SettingsPwdModal = ({ modalVisible, setModalVisible }: any) => {
    const {
        setChangePassword,
        validatePassword,
        changePassword,
        clearPwdFields,
        changePwd,
    }: any = useContext(UserContext);
    return (
        <Modal transparent visible={modalVisible} animationType="fade">
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <FormTextInput
                        value={changePassword.oldPwd}
                        setState={setChangePassword}
                        fieldName="oldPwd"
                        textColor="#fff"
                        placeholder="Antigua contraseña"
                        secureTextEntry={true}
                    />
                    <FormTextInput
                        value={changePassword.newPwd}
                        setState={setChangePassword}
                        fieldName="newPwd"
                        textColor="#fff"
                        placeholder="Nueva contraseña"
                        secureTextEntry={true}
                    />
                    <FormTextInput
                        value={changePassword.reNewPwd}
                        setState={setChangePassword}
                        fieldName="reNewPwd"
                        textColor="#fff"
                        placeholder="Repita la nueva contraseña"
                        secureTextEntry={true}
                    />
                    <View style={SettingsModalButtonsStyles.buttonsContainer}>
                        <TouchableOpacity
                            style={[
                                SettingsModalButtonsStyles.button,
                                SettingsModalButtonsStyles.closeButton,
                            ]}
                            onPress={() => {
                                clearPwdFields();
                                setModalVisible(!modalVisible);
                            }}>
                            <Icon name="close" size={30} color="#fff" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                SettingsModalButtonsStyles.button,
                                SettingsModalButtonsStyles.saveButton,
                            ]}
                            onPress={() =>
                                validatePassword().then(() => {
                                    changePwd();
                                    setModalVisible(!modalVisible);
                                })
                            }>
                            <Icon name="check" size={30} color="#fff" />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text
                            style={[
                                styles.minLengthText,
                                {
                                    color:
                                        changePassword.oldPwd === '' &&
                                        changePassword.newPwd ===
                                            changePassword.reNewPwd
                                            ? GlobalConfigColor.primaryRed
                                            : GlobalConfigColor.primaryGreen,
                                },
                            ]}>
                            {changePassword.oldPwd === '' &&
                            changePassword.newPwd === changePassword.reNewPwd
                                ? 'Todos los campos deben ser completados'
                                : 'Campos completos'}
                        </Text>
                        <Text
                            style={[
                                styles.minLengthText,
                                {
                                    color:
                                        changePassword.newPwd === '' ||
                                        changePassword.newPwd !==
                                            changePassword.reNewPwd
                                            ? GlobalConfigColor.primaryRed
                                            : GlobalConfigColor.primaryGreen,
                                },
                            ]}>
                            {changePassword.newPwd === '' ||
                            changePassword.newPwd !== changePassword.reNewPwd
                                ? 'Las contraseñas deben iguales'
                                : 'Las contraseñas son iguales'}
                        </Text>
                        <Text
                            style={[
                                styles.minLengthText,
                                {
                                    color:
                                        changePassword.newPwd.length < 8
                                            ? GlobalConfigColor.primaryRed
                                            : GlobalConfigColor.primaryGreen,
                                },
                            ]}>
                            {changePassword.newPwd.length < 8
                                ? 'Mínimo 8 caracteres para la nueva contraseña'
                                : 'Perfecto la contraseña contiene 8 caracteres'}
                        </Text>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default SettingsPwdModal;

const styles = StyleSheet.create({
    modalContainer: {
        height: '100%',
    },
    modalView: {
        width: '100%',
        paddingVertical: 25,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: GlobalConfigColor.primaryBlue,
    },
    minLengthText: {
        fontSize: 16,
        paddingTop: 20,
    },
});
