import {
    GlobalConfigColor,
    SettingsModalButtonsStyles,
} from '../../styles/GlobalStyles';
import React, { useContext, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { UserContext } from '../../controller/UserContext';
import FormTextInput from '../customComponents/FormTextInput';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { pickImageFromGallery } from '../../utils/pickImageFromGallery';

const EditUserData = ({
    userDataLocal,
    setModalVisible,
    setUserDataLocal,
}: any) => {
    const { editUserName, data }: any = useContext(UserContext);
    const [selectedProfileImage, setSelectedProfileImage] = useState('');
    return (
        <View style={styles.modalContainer}>
            <View style={styles.modalView}>
                <View>
                    <View style={styles.imgContainer}>
                        <Image
                            alt=""
                            source={{
                                uri: `data:application/octet-stream;base64,${selectedProfileImage}`,
                            }}
                            width={150}
                            height={150}
                            resizeMode="contain"
                        />
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            pickImageFromGallery().then((imageBase64: any) => {
                                setSelectedProfileImage(imageBase64);
                                // imageURLencoder(imageURI)
                                //     .then(res =>
                                //         console.log(res, 'imageURLencoder RES'),
                                //     )
                                //     .catch(err =>
                                //         console.log(err, 'imageURLencoder ERR'),
                                //     );
                            });
                        }}
                        style={[
                            SettingsModalButtonsStyles.button,
                            SettingsModalButtonsStyles.saveButton,
                        ]}>
                        <Text>Cambiar Imagen</Text>
                    </TouchableOpacity>
                </View>
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
                                userName: data && data.people.fullName,
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
    imgContainer: {
        marginVertical: 20,
    },
    otherStyles: {
        fontSize: 30,
        borderRadius: 4,
        marginVertical: 20,
    },
});
