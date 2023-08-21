import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useContext } from 'react';
import { GlobalStyles } from '../styles/GlobalStyles';
import { AccountContext } from '../controller/AccountsContext';

const Accounts = () => {
    const { getAccounts }: any = useContext(AccountContext);
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => getAccounts()}>
                <Text style={GlobalStyles.textStyle}>Accounts</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Accounts;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: 'green',
    },
});
