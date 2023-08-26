import React from 'react';
import IconClose from 'react-native-vector-icons/FontAwesome';
import { Modal, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { TermsPrivacyStyles } from '../styles/GlobalStyles';

const TermsPrivacyModal = ({
    title,
    message,
    modalVisible,
    setModalVisible,
}: any) => {
    return (
        <Modal transparent={true} animationType="fade" visible={modalVisible}>
            <View style={TermsPrivacyStyles.modalContainer}>
                <View style={TermsPrivacyStyles.modalView}>
                    <View style={TermsPrivacyStyles.header}>
                        <Text style={TermsPrivacyStyles.title}>{title}</Text>
                        <TouchableOpacity
                            style={TermsPrivacyStyles.buttonClose}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <IconClose name="close" size={15} color="#fff" />
                        </TouchableOpacity>
                    </View>
                    <ScrollView style={TermsPrivacyStyles.messageContainer}>
                        <Text style={TermsPrivacyStyles.message}>
                            {message}
                        </Text>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};

export default TermsPrivacyModal;
