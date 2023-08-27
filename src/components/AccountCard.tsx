import React, { useContext } from 'react';
// import { AccountCardStyles } from '../styles/GlobalStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AccountContext } from '../controller/AccountsContext';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface types {
    item: {
        _id: string;
        acc_name: string;
        monto_inicial: number;
        tipo_de_cuenta: string;
    };
    setIsEditable: any;
    selectedAccount: any;
    selectedAccColor: string;
}

const AccountCard = ({
    item,
    setIsEditable,
    selectedAccount,
    selectedAccColor,
}: types) => {
    const { formatter, setAccountToDelete, getAccountById, accountIcon }: any =
        useContext(AccountContext);
    const { _id, acc_name, monto_inicial, tipo_de_cuenta } = item;
    const colors = {
        selected: '#122e49',
        noSelected: '#20a5d8',
    };
    return (
        <TouchableOpacity
            style={[
                styles.cuentaContainer,
                {
                    backgroundColor:
                        selectedAccColor === _id
                            ? colors.selected
                            : colors.noSelected,
                },
            ]}
            onLongPress={() => {
                setAccountToDelete({
                    id: _id,
                    accountName: acc_name,
                });
                setIsEditable(true);
                selectedAccount(_id);
                getAccountById(_id);
            }}>
            <View style={styles.dataContainer}>
                <Text style={styles.cuentaName}>{acc_name}</Text>
                <Text style={styles.cuentaType}>{tipo_de_cuenta}</Text>
                <Text style={[styles.cuentaName]}>
                    {formatter.format(monto_inicial)}
                </Text>
            </View>
            <View style={styles.banco}>
                <Icon
                    size={70}
                    color="#fff"
                    name={accountIcon(tipo_de_cuenta)}
                />
            </View>
        </TouchableOpacity>
    );
};

export default AccountCard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    cuentaContainer: {
        marginHorizontal: 10,
        marginTop: 8,
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dataContainer: {
        width: '70%',
    },
    cuentaName: {
        color: '#fff',
        fontSize: 30,
    },
    cuentaType: {
        color: '#fff',
        marginBottom: 10,
    },
    banco: {
        width: '30%',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
