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
    viewMode = false,
    setHeight,
}: any) => {
    const height = useWindowDimensions().height;
    return (
        <Modal transparent={true} animationType="fade" visible={modalVisible}>
            <View
                style={[CustomModalStyles.modalContainer, { height: height }]}>
                <View
                    style={[
                        CustomModalStyles.modalView,
                        { height: setHeight || 550 },
                    ]}>
                    <View style={CustomModalStyles.header}>
                        <Text style={CustomModalStyles.title}>{title}</Text>
                        <TouchableOpacity
                            style={CustomModalStyles.buttonClose}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <IconClose name="close" size={15} color="#fff" />
                        </TouchableOpacity>
                    </View>
                    {viewMode ? (
                        <View style={CustomModalStyles.containerView}>
                            {content}
                        </View>
                    ) : (
                        <ScrollView style={CustomModalStyles.containerScroll}>
                            {content}
                        </ScrollView>
                    )}
                </View>
            </View>
        </Modal>
    );
};

export default CustomModal;
