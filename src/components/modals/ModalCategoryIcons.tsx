import React, { useContext } from 'react';
import {
    Modal,
    View,
    FlatList,
    Pressable,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { UserContext } from '../../controller/UserContext';
import { ModalCatStyles } from '../../styles/GlobalStyles';
import IconClose from 'react-native-vector-icons/FontAwesome';
import { CatContext } from '../../controller/CategoriesContext';

const ModalCategoryIcons = ({
    modalVisible,
    setModalVisible,
    setSelectedCatIcon,
}: any) => {
    const { catIcons, setNewCategory }: any = useContext(CatContext);
    const { updStateData }: any = useContext(UserContext);

    return (
        <Modal transparent={true} animationType="fade" visible={modalVisible}>
            <View style={ModalCatStyles.modalContainer}>
                <View style={ModalCatStyles.modalView}>
                    <Pressable
                        style={ModalCatStyles.buttonClose}
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
                                    style={ModalCatStyles.buttonIcon}
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
