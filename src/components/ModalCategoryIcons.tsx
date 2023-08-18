import React from 'react';
import { Modal, StyleSheet, Text, View, Pressable } from 'react-native';

const ModalCategoryIcons = ({ modalVisible, setModalVisible }: any) => {
    return (
        <Modal animationType="fade" transparent={true} visible={modalVisible}>
            <View>
                <View style={styles.modalView}>
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisible(!modalVisible)}>
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
