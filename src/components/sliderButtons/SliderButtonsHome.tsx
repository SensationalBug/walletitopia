import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { GlobalConfigColor } from '../../styles/GlobalStyles';

const SliderButtonsHome = ({ onAddGasto, onAddDebito, onViewDetails }: any) => {
    return (
        <>
            <View style={styles.btnGastoContainer}>
                <TouchableOpacity
                    onPress={onAddGasto}
                    style={[
                        styles.btn,
                        { backgroundColor: GlobalConfigColor.primaryGreen },
                    ]}>
                    <Icon name="plus" size={25} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={onAddDebito}
                    style={[
                        styles.btn,
                        { backgroundColor: GlobalConfigColor.primaryRed },
                    ]}>
                    <Icon name="minus" size={25} color="#fff" />
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                onPress={onViewDetails}
                style={[
                    styles.btn,
                    styles.btnMore,
                    { backgroundColor: GlobalConfigColor.primaryBlue },
                ]}>
                <Text style={styles.btnMoreText}>Detalles</Text>
            </TouchableOpacity>
        </>
    );
};

export default SliderButtonsHome;

const styles = StyleSheet.create({
    btn: {
        width: 80,
        height: '100%',
        borderColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnMore: {
        width: '100%',
    },
    btnMoreText: {
        fontSize: 20,
        color: '#fff',
        fontWeight: '500',
    },
    btnGastoContainer: {
        height: '100%',
        flexDirection: 'row',
    },
});
