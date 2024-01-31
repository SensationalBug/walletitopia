import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { GlobalConfigColor } from '../../styles/GlobalStyles';

const SliderButtonsAccount = ({ onEdit, onDelete }: any) => {
    return (
        <View style={styles.btnContainer}>
            <TouchableOpacity
                onPress={onEdit}
                style={[
                    styles.btn,
                    { backgroundColor: GlobalConfigColor.primaryYellow },
                ]}>
                <Icon name="edit" size={25} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={onDelete}
                style={[
                    styles.btn,
                    { backgroundColor: GlobalConfigColor.primaryRed },
                ]}>
                <Icon name="trash" size={25} color="#fff" />
            </TouchableOpacity>
        </View>
    );
};

export default SliderButtonsAccount;

const styles = StyleSheet.create({
    btnContainer: {
        height: '100%',
    },
    btn: {
        width: 80,
        height: '100%',
        borderLeftWidth: 1,
        borderColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
