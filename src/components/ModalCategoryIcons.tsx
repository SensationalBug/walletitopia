import React, { useContext } from 'react';
import {
    Modal,
    View,
    FlatList,
    Pressable,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconClose from 'react-native-vector-icons/FontAwesome';
import { CatContext } from '../controller/CategoriesContext';
import { UserContext } from '../controller/UserContext';

const ModalCategoryIcons = ({
    modalVisible,
    setModalVisible,
    setSelectedCatIcon,
}: any) => {
    const { catIcons, setNewCategory }: any = useContext(CatContext);
    const { updStateData }: any = useContext(UserContext);

    return (
        <Modal transparent={true} animationType="fade" visible={modalVisible}>
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <Pressable
                        style={styles.buttonClose}
                        onPress={() => setModalVisible(!modalVisible)}>
                        <IconClose name="close" size={15} color="#fff" />
                    </Pressable>
                    <FlatList
                        numColumns={4}
                        data={catIcons}
                        keyExtractor={item => item._id}
                        renderItem={({ item }: any) => {
                            return (
                                <TouchableOpacity
                                    style={styles.buttonIcon}
                                    onPress={() => {
                                        setModalVisible(!modalVisible);
                                        setSelectedCatIcon(item.IconName);
                                        updStateData(
                                            setNewCategory,
                                            item.IconName,
                                            'iconName',
                                        );
                                    }}>
                                    <Icon
                                        size={30}
                                        color="#fff"
                                        name={item.IconName}
                                    />
                                </TouchableOpacity>
                            );
                        }}
                    />
                </View>
            </View>
        </Modal>
    );
};

export default ModalCategoryIcons;

const styles = StyleSheet.create({
    modalContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    modalView: {
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        backgroundColor: '#122e49',
        justifyContent: 'center',
        width: '90%',
        height: '65%',
    },
    buttonIcon: {
        width: 50,
        height: 50,
        margin: 15,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1F9FD0',
    },
    buttonClose: {
        width: 100,
        height: 30,
        padding: 5,
        borderRadius: 5,
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F24C3D',
    },
});
