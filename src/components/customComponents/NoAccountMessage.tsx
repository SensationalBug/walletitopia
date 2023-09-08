import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const NoAccountMessage = ({ position }: any) => {
    const styles = StyleSheet.create({
        textContainer: {
            height: '100%',
            paddingVertical: 50,
            justifyContent: position,
        },
        mainText: {
            fontSize: 25,
            opacity: 0.5,
            color: '#000',
            textAlign: 'center',
        },
    });

    return (
        <View style={styles.textContainer}>
            <Text style={styles.mainText}>No tienes cuentas agregadas</Text>
        </View>
    );
};

export default NoAccountMessage;
