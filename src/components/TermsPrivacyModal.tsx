import React from 'react';
import IconClose from 'react-native-vector-icons/FontAwesome';
import {
    Modal,
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

const TermsPrivacyModal = ({
    title,
    message,
    modalVisible,
    setModalVisible,
}: any) => {
    return (
        <Modal transparent={true} animationType="fade" visible={modalVisible}>
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <View style={styles.header}>
                        <Text style={styles.title}>{title}</Text>
                        <TouchableOpacity
                            style={styles.buttonClose}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <IconClose name="close" size={15} color="#fff" />
                        </TouchableOpacity>
                    </View>
                    <ScrollView style={styles.messageContainer}>
                        <Text style={styles.message}>{message}</Text>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};

export default TermsPrivacyModal;

const styles = StyleSheet.create({
    modalContainer: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalView: {
        padding: 15,
        width: '80%',
        height: '75%',
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: '#122e49',
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 5,
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 20,
        color: '#fff',
    },
    buttonClose: {
        width: 25,
        height: 25,
        padding: 5,
        borderRadius: 5,
        alignItems: 'center',
        alignSelf: 'flex-end',
        justifyContent: 'center',
        backgroundColor: '#F24C3D',
    },
    messageContainer: {
        marginVertical: 5,
        marginHorizontal: 5,
    },
    message: {
        color: '#fff',
        // textAlign: 'justify',
    },
});
