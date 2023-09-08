import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

const color = {
    rojo: '#F24C3D',
    amarillo: '#b3b329',
};

const SliderButtonsAccount = ({ onEdit, onDelete }: any) => {
    return (
        <View style={styles.btnContainer}>
            <TouchableOpacity
                onPress={onEdit}
                style={[styles.btn, { backgroundColor: color.amarillo }]}>
                <Icon name="edit" size={25} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={onDelete}
                style={[styles.btn, { backgroundColor: color.rojo }]}>
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
