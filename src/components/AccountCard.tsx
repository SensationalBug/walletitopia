import { View, Text } from 'react-native';
import React from 'react';
import { AccountCardStyles } from '../styles/GlobalStyles';

interface types {
    acc_name: string;
    id_acc_type: string;
    monto_inicial: number;
}

const AccountCard = ({ acc_name, id_acc_type, monto_inicial }: types) => {
    return (
        <View style={AccountCardStyles.accContainer}>
            <View style={AccountCardStyles.accHeader}>
                <Text style={AccountCardStyles.accTitle}>{acc_name}</Text>
                <Text style={AccountCardStyles.accType}>{id_acc_type}</Text>
            </View>
            <Text style={AccountCardStyles.accAmount}>{monto_inicial}</Text>
        </View>
    );
};

export default AccountCard;
