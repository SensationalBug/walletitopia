import React from 'react';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { GlobalConfigColor } from '../../styles/GlobalStyles';

const SliderButtonMetrics = ({ onDetail }: any) => {
    return (
        <View style={styles.btnContainer}>
            <TouchableOpacity
                onPress={onDetail}
                style={[
                    styles.btn,
                    { backgroundColor: GlobalConfigColor.primaryBlue },
                ]}>
                <Text style={styles.btnMoreText}>Detalles</Text>
            </TouchableOpacity>
        </View>
    );
};

export default SliderButtonMetrics;

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
    btnMoreText: {
        fontSize: 20,
        color: '#fff',
        fontWeight: '500',
        transform: [{ rotate: '-90deg' }],
    },
});
