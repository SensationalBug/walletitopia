import {
    GlobalConfigColor,
    SettingsModalButtonsStyles,
} from '../../styles/GlobalStyles';
import ModalIcons from './ModalIcons';
import React, { useContext, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { UserContext } from '../../controller/UserContext';
import FormTextInput from '../customComponents/FormTextInput';
import { CatContext } from '../../controller/CategoriesContext';
import { View, Modal, StyleSheet, TouchableOpacity } from 'react-native';

const SettingsUserModal = ({
    selectedIcon,
    modalVisible,
    setSelectedIcon,
    setModalVisible,
}: any) => {
    const { catIcons }: any = useContext(CatContext);
    const { updStateData }: any = useContext(UserContext);
    const [icon, setIcon] = useState('');
    const [modalIconVisible, setModalIconVisible] = useState(false);
    const [userData, setUserData] = useState({
        userName: '',
        iconName: selectedIcon,
    });
    return (
        <Modal transparent visible={modalVisible} animationType="fade">
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <View style={styles.container}>
                        <View>
                            <Icon
                                size={130}
                                name={userData.iconName}
                                color={GlobalConfigColor.white}
                            />
                        </View>
                        <FormTextInput
                            setState={setUserData}
                            fieldName="userName"
                            textColor="#fff"
                            placeholder="Nombre de usuario"
                        />
                    </View>
                    <View style={SettingsModalButtonsStyles.buttonsContainer}>
                        <TouchableOpacity
                            style={[
                                SettingsModalButtonsStyles.button,
                                SettingsModalButtonsStyles.closeButton,
                            ]}
                            onPress={() => {
                                updStateData(
                                    setUserData,
                                    selectedIcon,
                                    'iconName',
                                );
                                setModalVisible(false);
                            }}>
                            <Icon name="close" size={30} color="#fff" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                SettingsModalButtonsStyles.button,
                                SettingsModalButtonsStyles.editButton,
                            ]}
                            onPress={() =>
                                setModalIconVisible(!modalIconVisible)
                            }>
                            <Icon name="edit" size={30} color="#fff" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                SettingsModalButtonsStyles.button,
                                SettingsModalButtonsStyles.saveButton,
                            ]}
                            onPress={() => {
                                setModalVisible(false);
                                setSelectedIcon(icon);
                            }}>
                            <Icon name="check" size={30} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <ModalIcons
                icons={catIcons}
                setFuction={setUserData}
                modalVisible={modalIconVisible}
                setModalVisible={setModalIconVisible}
                setSelectedIcon={setIcon}
            />
        </Modal>
    );
};

export default SettingsUserModal;

const styles = StyleSheet.create({
    modalContainer: {
        height: '100%',
    },
    modalView: {
        width: '100%',
        paddingVertical: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: GlobalConfigColor.primaryBlue,
    },
    container: {
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    otherStyles: {
        fontSize: 30,
        borderRadius: 4,
        marginVertical: 20,
    },
});
