import Dropdown from '../customComponents/Dropdown';
import React, { useContext, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { UserContext } from '../../controller/UserContext';
import FormTextInput from '../customComponents/FormTextInput';
import { AccountContext } from '../../controller/AccountsContext';
import { Modal, View, TouchableOpacity, StyleSheet } from 'react-native';

const AccountEditModal = ({ modalVisible, setModalVisible, data }: any) => {
    const { updStateData /*setResetSlider*/ }: any = useContext(UserContext);
    const { setAccountToEditData, editAccount }: any =
        useContext(AccountContext);
    const { acc_name, monto_inicial, tipo_de_cuenta, _id } = data;
    // useEffect(() => {
    //     updStateData(setAccountToEditData, _id, 'accountId');
    // }, [setAccountToEditData, updStateData, _id]);
    return (
        <Modal transparent={true} animationType="slide" visible={modalVisible}>
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <View style={styles.formBox}>
                        <Dropdown
                            label={tipo_de_cuenta}
                            onSelect={setAccountToEditData}
                        />
                        <FormTextInput
                            setState={setAccountToEditData}
                            textColor="#fff"
                            fieldName="accountEditName"
                            secureTextEntry={false}
                            placeholder={acc_name}
                        />
                        <FormTextInput
                            keyboardType="numeric"
                            setState={setAccountToEditData}
                            textColor="#fff"
                            fieldName="accountEditAmount"
                            secureTextEntry={false}
                            placeholder={`${monto_inicial}`}
                        />
                    </View>
                    <View style={styles.buttonGroup}>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => {
                                // setResetSlider(true);
                                setModalVisible(!modalVisible);
                            }}>
                            <Icon name="close" size={20} color="#fff" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonSave]}
                            onPress={() => {
                                editAccount();
                                // setResetSlider(true);
                                setModalVisible(!modalVisible);
                            }}>
                            <Icon name="check" size={20} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default AccountEditModal;

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
