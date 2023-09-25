import {
    View,
    Modal,
    TextInput,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import ModalIcons from './ModalIcons';
import React, { useContext, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { UserContext } from '../../controller/UserContext';
import { CategoryStyles, GlobalConfigColor } from '../../styles/GlobalStyles';
import { CatContext } from '../../controller/CategoriesContext';

const SettingsUserModal = ({
    modalVisible,
    setSelectedIcon,
    setModalVisible,
}: any) => {
    const { updStateData }: any = useContext(UserContext);
    const { catIcons }: any = useContext(CatContext);
    const [modalIconVisible, setModalIconVisible] = useState(false);
    const [userData, setUserData] = useState({
        userName: '',
        iconName: 'question',
    });
    return (
        <Modal transparent visible={modalVisible} animationType="fade">
            <View style={styles.modalContainer}>
                <TouchableOpacity
                    style={[styles.button, styles.editButton]}
                    onPress={() => setModalIconVisible(!modalIconVisible)}>
                    <Icon name="edit" size={30} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, styles.closeButton]}
                    onPress={() => setModalVisible(false)}>
                    <Icon name="close" size={30} color="#fff" />
                </TouchableOpacity>
                <View style={styles.container}>
                    <View style={styles.imgContainer}>
                        <Icon
                            size={150}
                            color={GlobalConfigColor.primaryGreen}
                            name={userData.iconName}
                        />
                    </View>
                    <TextInput
                        maxLength={20}
                        value={userData.userName}
                        style={[
                            styles.otherStyles,
                            CategoryStyles.catNameInput,
                        ]}
                        placeholder="Nombre de usuario"
                        onChangeText={value =>
                            updStateData(setUserData, value, 'userName')
                        }
                    />
                </View>
            </View>
            <ModalIcons
                icons={catIcons}
                setFuction={setUserData}
                modalVisible={modalIconVisible}
                setModalVisible={setModalIconVisible}
                setSelectedIcon={setSelectedIcon}
            />
        </Modal>
    );
};

export default SettingsUserModal;

const styles = StyleSheet.create({
    modalContainer: {
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    button: {
        top: 0,
        width: 40,
        height: 40,
        margin: 10,
        padding: 5,
        borderRadius: 5,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    closeButton: {
        right: 0,
        backgroundColor: GlobalConfigColor.primaryRed,
    },
    editButton: {
        left: 0,
        backgroundColor: GlobalConfigColor.primaryBlue,
    },
    container: {
        paddingBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imgContainer: {
        marginVertical: 20,
    },
    otherStyles: {
        fontSize: 30,
        borderRadius: 4,
    },
});
