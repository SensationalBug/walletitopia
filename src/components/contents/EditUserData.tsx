import {
    GlobalConfigColor,
    SettingsModalButtonsStyles,
} from '../../styles/GlobalStyles';
import React, { useContext } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { UserContext } from '../../controller/UserContext';
import FormTextInput from '../customComponents/FormTextInput';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

const EditUserData = ({
    userDataLocal,
    setModalVisible,
    setUserDataLocal,
}: any) => {
    const { editUserName, userData }: any = useContext(UserContext);
    return (
        <View style={styles.modalContainer}>
            <View style={styles.modalView}>
                <View style={styles.container}>
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
                        onPress={() => {
                            setUserDataLocal({
                                userName: userData.full_name,
                            });
                            setModalVisible(false);
                        }}>
                        <Icon name="close" size={30} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity
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
    );
};

export default EditUserData;

const styles = StyleSheet.create({
    modalContainer: {
        height: '100%',
    },
    modalView: {
        width: '100%',
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
