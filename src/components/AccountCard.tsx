import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useContext } from 'react';
// import { AccountCardStyles } from '../styles/GlobalStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AccountContext } from '../controller/AccountsContext';

interface types {
    item: {
        acc_name: string;
        monto_inicial: number;
        tipo_de_cuenta: string;
    };
    isEditable: boolean;
    setIsEditable: any;
}

const AccountCard = ({ item, isEditable, setIsEditable }: types) => {
    const { formatter }: any = useContext(AccountContext);
    const { acc_name, monto_inicial, tipo_de_cuenta } = item;
    const accountIcon = (icon: string): any => {
        switch (icon) {
            case 'Efectivo':
                return 'dollar';
            case 'Cuenta corriente':
                return 'bank';
            case 'Cuenta de ahorros':
                return 'money';
            case 'Tarjeta de crédito':
                return 'credit-card';
        }
    };
    return (
        <TouchableOpacity
            style={styles.cuentaContainer}
            onLongPress={() => setIsEditable(!isEditable)}>
            <View style={styles.dataContainer}>
                <Text style={styles.cuentaName}>{acc_name}</Text>
                <Text style={styles.cuentaType}>{tipo_de_cuenta}</Text>
                <Text style={[styles.cuentaName]}>
                    {formatter.format(monto_inicial)}
                </Text>
            </View>
            <View style={styles.banco}>
                <Icon
                    name={accountIcon(tipo_de_cuenta)}
                    size={70}
                    color="#fff"
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
        marginTop: 10,
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        flexDirection: 'row',
        backgroundColor: '#1F9FD0',
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
