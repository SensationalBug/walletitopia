import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { GlobalStyles } from '../styles/GlobalStyles';

const Accounts = ({ navigation }: any) => {
    return (
        <View>
            <TouchableOpacity
                onPress={() => navigation.navigate('Inicio')}
                style={styles.container}>
                <Text style={GlobalStyles.textStyle}>Accounts</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Accounts;

const styles = StyleSheet.create({
    container: {
        padding: 10,
        height: '100%',
        backgroundColor: 'green',
    },
});
