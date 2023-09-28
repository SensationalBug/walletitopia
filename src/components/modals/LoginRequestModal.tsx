import React, { useContext, useState } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import FormTextInput from '../customComponents/FormTextInput';
import { UserContext } from '../../controller/UserContext';
import { GlobalConfigColor } from '../../styles/GlobalStyles';

const LoginRequestModal = ({ modalVisible, setModalVisible }: any) => {
    const [requestEmail, setRequesEmail] = useState('');
    const { reqChangePassword }: any = useContext(UserContext);
    return (
        <Modal
            animationType="fade"
            visible={modalVisible}
            onRequestClose={() => setModalVisible(!modalVisible)}>
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <FormTextInput
                        value={requestEmail}
                        setState={setRequesEmail}
                        textColor="#fff"
                        fieldName="reqEmail"
                        secureTextEntry={false}
                        placeholder="Correo electrónico"
                    />
                    <TouchableOpacity
                        style={styles.buttonText}
                        onPress={() => reqChangePassword(requestEmail)}>
                        <Text style={styles.sendText}>Enviar e-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default LoginRequestModal;

const styles = StyleSheet.create({
    modalContainer: {
        height: '100%',
        marginTop: '25%',
        alignItems: 'center',
    },
    modalView: {
        width: '80%',
        borderRadius: 10,
        paddingVertical: 10,
        alignItems: 'center',
        backgroundColor: '#122e49',
        justifyContent: 'space-between',
    },
    buttonText: {
        marginTop: 10,
    },
    sendText: {
        padding: 15,
        fontSize: 18,
        color: '#fff',
        borderRadius: 5,
        marginVertical: 10,
        textAlign: 'center',
        backgroundColor: GlobalConfigColor.primaryGreen,
    },
});
