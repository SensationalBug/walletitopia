import Dropdown from '../customComponents/Dropdown';
import React, { useContext } from 'react';
import FormTextInput from '../customComponents/FormTextInput';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AccountContext } from '../../controller/AccountsContext';
import { Modal, View, TouchableOpacity, StyleSheet } from 'react-native';

const AccountModal = ({ modalVisible, setModalVisible }: any) => {
    const { setNewAccountData, validateAddAccount }: any =
        useContext(AccountContext);
    return (
        <Modal transparent={true} animationType="slide" visible={modalVisible}>
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <View style={styles.formBox}>
                        <Dropdown
                            label="Tipo de cuenta"
                            onSelect={setNewAccountData}
                        />
                        <FormTextInput
                            setState={setNewAccountData}
                            textColor="#fff"
                            fieldName="accountName"
                            secureTextEntry={false}
                            placeholder="Nombre de la cuenta"
                        />
                        <FormTextInput
                            keyboardType="numeric"
                            setState={setNewAccountData}
                            textColor="#fff"
                            fieldName="accountAmount"
                            secureTextEntry={false}
                            placeholder="Monto inicial"
                        />
                    </View>
                    <View style={styles.buttonGroup}>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Icon name="close" size={20} color="#fff" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonSave]}
                            onPress={() => {
                                validateAddAccount().then(() =>
                                    setModalVisible(!modalVisible),
                                );
                            }}>
                            <Icon name="check" size={20} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default AccountModal;

const styles = StyleSheet.create({
    modalContainer: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    modalView: {
        width: '100%',
        paddingTop: 10,
        paddingHorizontal: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: '#122e49',
        justifyContent: 'space-between',
    },
    formBox: {
        margin: 10,
    },
    buttonGroup: {
        marginVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    button: {
        width: '45%',
        height: 40,
        padding: 5,
        borderRadius: 10,
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F24C3D',
    },
    buttonClose: {
        backgroundColor: '#F24C3D',
    },
    buttonSave: {
        backgroundColor: '#1F8A70',
    },
});
