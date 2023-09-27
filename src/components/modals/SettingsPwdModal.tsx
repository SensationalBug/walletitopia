import {
    GlobalConfigColor,
    SettingsModalButtonsStyles,
} from '../../styles/GlobalStyles';
import React, { useContext } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { UserContext } from '../../controller/UserContext';
import FormTextInput from '../customComponents/FormTextInput';
import { View, Modal, StyleSheet, TouchableOpacity } from 'react-native';

const SettingsPwdModal = ({ modalVisible, setModalVisible }: any) => {
    const {
        setChangePassword,
        validatePassword,
        changePassword,
        clearPwdFields,
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
                            onPress={() => validatePassword()}>
                            <Icon name="check" size={30} color="#fff" />
                        </TouchableOpacity>
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
});
