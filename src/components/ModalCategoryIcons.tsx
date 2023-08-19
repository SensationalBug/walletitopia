import React, { useContext } from 'react';
import {
    Modal,
    Text,
    View,
    FlatList,
    Pressable,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { CatContext } from '../controller/CategoriesContext';

const ModalCategoryIcons = ({ modalVisible, setModalVisible }: any) => {
    const { getCatIcons, catIcons }: any = useContext(CatContext);
    return (
        <Modal animationType="fade" transparent={true} visible={modalVisible}>
            <View>
                <View style={styles.modalView}>
                    <FlatList
                        numColumns={4}
                        data={catIcons}
                        keyExtractor={item => item.id}
                        renderItem={({ item }: any) => {
                            return (
                                <TouchableOpacity>
                                    <Icon
                                        size={20}
                                        color="#000"
                                        name={item.IconName}
                                    />
                                </TouchableOpacity>
                            );
                        }}
                    />
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => getCatIcons()}>
                        {/* onPress={() => setModalVisible(!modalVisible)}> */}
                        <Text>Hide Modal</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
};

export default ModalCategoryIcons;

const styles = StyleSheet.create({
    modalView: {
        margin: 20,
        padding: 35,
        borderRadius: 5,
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'center',
    },
    button: {
        padding: 10,
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
});
