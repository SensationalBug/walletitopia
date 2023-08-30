import React, { useContext } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AccountCardStyles } from '../styles/GlobalStyles';
import { View, Text, TouchableOpacity } from 'react-native';
import { AccountContext } from '../controller/AccountsContext';

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
                AccountCardStyles.cuentaContainer,
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
            <View style={AccountCardStyles.dataContainer}>
                <Text style={AccountCardStyles.cuentaName}>{acc_name}</Text>
                <Text style={AccountCardStyles.cuentaType}>
                    {tipo_de_cuenta}
                </Text>
                <Text style={[AccountCardStyles.cuentaName]}>
                    {formatter.format(monto_inicial)}
                </Text>
            </View>
            <View style={AccountCardStyles.accType}>
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
