import React, { useContext } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GlobalConfigColor } from '../../styles/GlobalStyles';
import { AccountContext } from '../../controller/AccountsContext';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const MainCard = ({
    acc_name,
    tipo_de_cuenta,
    monto,
    onMove,
    moveSlider,
}: any) => {
    const { formatter, accountIcon }: any = useContext(AccountContext);
    return (
        <TouchableOpacity
            style={styles.mainCard}
            onPress={() => onMove(!moveSlider)}>
            <View style={styles.textContent}>
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
        </TouchableOpacity>
    );
};

export default MainCard;

const styles = StyleSheet.create({
    mainCard: {
        flexDirection: 'row',
    },
    textContent: {
        width: '60%',
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
});
