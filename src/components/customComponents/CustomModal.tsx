import React from 'react';
import IconClose from 'react-native-vector-icons/FontAwesome';
import { CustomModalStyles } from '../../styles/GlobalStyles';
import {
    Modal,
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    useWindowDimensions,
} from 'react-native';

const CustomModal = ({
    title,
    content,
    modalVisible,
    setModalVisible,
}: any) => {
    const height = useWindowDimensions().height;
    return (
        <Modal transparent={true} animationType="fade" visible={modalVisible}>
            <View
                style={[CustomModalStyles.modalContainer, { height: height }]}>
                <View style={CustomModalStyles.modalView}>
                    <View style={CustomModalStyles.header}>
                        <Text style={CustomModalStyles.title}>{title}</Text>
                        <TouchableOpacity
                            style={CustomModalStyles.buttonClose}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <IconClose name="close" size={15} color="#fff" />
                        </TouchableOpacity>
                    </View>
                    <ScrollView style={CustomModalStyles.container}>
                        {content}
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};

export default CustomModal;
