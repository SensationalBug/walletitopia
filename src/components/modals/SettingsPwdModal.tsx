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
    const { setPassword, validatePassword }: any = useContext(UserContext);
    return (
        <Modal transparent visible={modalVisible} animationType="fade">
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <FormTextInput
                        setState={setPassword}
                        fieldName="oldPwd"
                        textColor="#fff"
                        placeholder="Antigua contraseña"
                        secureTextEntry={true}
                    />
                    <FormTextInput
                        setState={setPassword}
                        fieldName="newPwd"
                        textColor="#fff"
                        placeholder="Nueva contraseña"
                        secureTextEntry={true}
                    />
                    <FormTextInput
                        setState={setPassword}
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
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Icon name="close" size={30} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                SettingsModalButtonsStyles.button,
                                SettingsModalButtonsStyles.saveButton,
                            ]}
                            onPress={() => validatePassword()}>
                            <Icon name="check" size={30} />
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
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalView: {
        width: '100%',
        borderRadius: 5,
        paddingVertical: 25,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: GlobalConfigColor.primaryBlue,
    },
});