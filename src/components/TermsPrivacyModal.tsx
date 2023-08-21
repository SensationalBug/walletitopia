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
    // title,
    // message,
    modalVisible,
    setModalVisible,
}: any) => {
    return (
        <Modal transparent={true} animationType="fade" visible={modalVisible}>
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <View style={styles.header}>
                        {/* <Text>{title}</Text> */}
                        <Text style={styles.title}>
                            Politicas de privacidad
                        </Text>
                        <TouchableOpacity
                            style={styles.buttonClose}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <IconClose name="close" size={15} color="#fff" />
                        </TouchableOpacity>
                    </View>
                    <ScrollView style={styles.messageContainer}>
                        <Text style={styles.message}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Elit sed vulputate mi sit amet
                            mauris commodo quis imperdiet. Sociis natoque
                            penatibus et magnis dis parturient montes nascetur
                            ridiculus. Enim blandit volutpat maecenas volutpat
                            blandit aliquam. Nec feugiat in fermentum posuere
                            urna nec tincidunt. Sed augue lacus viverra vitae
                            congue. Nec ullamcorper sit amet risus nullam.
                            Interdum consectetur libero id faucibus nisl
                            tincidunt eget nullam. Risus sed vulputate odio
                            blandit volutpat. Morbi tincidunt augue interdum
                            interdum velit euismod. Posuere morbi leo urna
                            molestie at. Odio pellentesque diam volutpat commodo
                            sed egestas egestas. Quisque egestas diam in arcu
                            cursus euismod quis. Tempor commodo ullamcorper a /n
                            lacus vestibulum sed arcu non odio. Faucibus nisl
                            tincidunt eget nullam non nisi est sit. Auctor urna
                            nunc id cursus metus aliquam. Viverra vitae congue
                            eu consequat ac felis donec. Nibh tellus molestie
                            nunc non blandit massa enim nec dui.
                        </Text>
                        {/* <Text style={styles.message}>{message}</Text> */}
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
        width: '70%',
        height: '75%',
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: '#122e49',
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
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
        marginHorizontal: 10,
    },
    message: {
        color: '#fff',
        textAlign: 'justify',
    },
});
