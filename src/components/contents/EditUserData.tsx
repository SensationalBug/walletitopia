import {
    GlobalConfigColor,
    SettingsModalButtonsStyles,
} from '../../styles/GlobalStyles';
import ModalIcons from '../modals/ModalIcons';
import React, { useContext, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { UserContext } from '../../controller/UserContext';
import FormTextInput from '../customComponents/FormTextInput';
import { CatContext } from '../../controller/CategoriesContext';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
const EditUserData = ({
    userDataLocal,
    setModalVisible,
    setUserDataLocal,
}: any) => {
    const [icon, setIcon] = useState('');
    const { catIcons }: any = useContext(CatContext);
    const { editUserName }: any = useContext(UserContext);
    const [modalIconVisible, setModalIconVisible] = useState(false);
    return (
        <>
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <View style={styles.container}>
                        <View>
                            <Icon
                                size={130}
                                name="user"
                                color={GlobalConfigColor.white}
                            />
                        </View>
                        <FormTextInput
                            setState={setUserDataLocal}
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
                            onPress={() => setModalVisible(false)}>
                            <Icon name="close" size={30} color="#fff" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            disabled={
                                !icon && userDataLocal.userName === ''
                                    ? true
                                    : false
                            }
                            style={[
                                SettingsModalButtonsStyles.button,
                                SettingsModalButtonsStyles.saveButton,
                            ]}
                            onPress={() => {
                                setModalVisible(false);
                                editUserName(
                                    '65158c345cd3dd16fd0b86cd',
                                    userDataLocal.userName,
                                );
                            }}>
                            <Icon name="check" size={30} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <ModalIcons
                icons={catIcons}
                setFuction={setUserDataLocal}
                modalVisible={modalIconVisible}
                setModalVisible={setModalIconVisible}
                setSelectedIcon={setIcon}
            />
        </>
    );
};

export default EditUserData;

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
