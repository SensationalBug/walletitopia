import { View, Text, StyleSheet } from 'react-native';
import React, { useContext } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AccountContext } from '../../controller/AccountsContext';
import { GlobalConfigColor } from '../../styles/GlobalStyles';

const MainCard = ({ acc_name, tipo_de_cuenta, monto }: any) => {
    const { formatter, accountIcon }: any = useContext(AccountContext);
    return (
        <>
            <View>
                <Text style={styles.mainText}>{acc_name}</Text>
                <Text style={styles.typeText}>{tipo_de_cuenta}</Text>
                <Text
                    style={[
                        styles.amountText,
                        {
                            color:
                                monto < 0
                                    ? GlobalConfigColor.secondaryRed
                                    : GlobalConfigColor.white,
                        },
                    ]}>
                    {formatter.format(monto)}
                </Text>
            </View>
            <View style={styles.iconContainer}>
                <View style={styles.mainIcon}>
                    <Icon
                        size={80}
                        color="#fff"
                        name={accountIcon(tipo_de_cuenta)}
                    />
                </View>
                <Icon name="chevron-left" color="#fff" size={20} />
            </View>
        </>
    );
};

export default MainCard;

const styles = StyleSheet.create({
    iconContainer: {
        width: '40%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    mainIcon: {
        justifyContent: 'center',
        width: '60%',
        alignItems: 'center',
    },
    mainText: {
        color: '#fff',
        fontSize: 30,
        paddingVertical: 5,
    },
    typeText: {
        color: '#fff',
        fontSize: 15,
    },
    amountText: {
        fontSize: 25,
    },
});
