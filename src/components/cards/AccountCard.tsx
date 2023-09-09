import React, { useContext } from 'react';
import SlidableCard from './SlidableCard';
import { useIsFocused } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, Text, Alert, StyleSheet } from 'react-native';
import { AccountContext } from '../../controller/AccountsContext';
import SliderButtonsAccount from '../sliderButtons/SliderButtonsAccount';

interface types {
    item: {
        _id: string;
        acc_name: string;
        monto_inicial: number;
        tipo_de_cuenta: string;
    };
    setModalEditVisible: any;
    setData: any;
}

const AccountCard = ({ item, setModalEditVisible, setData }: types) => {
    const focused = useIsFocused();
    const { formatter, accountIcon, deleteAccount }: any =
        useContext(AccountContext);
    const { _id, acc_name, monto_inicial, tipo_de_cuenta } = item;
    // Funcion para mostrar el alert previo a borrar una cuenta
    const showAlert = () => {
        Alert.alert(
            'Advertencia',
            `Seguro que quieres eliminar la cuenta ${acc_name} ?`,
            [
                {
                    text: 'Si',
                    onPress: () => deleteAccount(_id),
                },
                {
                    text: 'No',
                },
            ],
        );
    };

    const setItemData = () => {
        return new Promise(resolve => {
            setData(item);
            resolve('ok');
        });
    };

    const buttons = (props: any) => (
        <SliderButtonsAccount
            {...props}
            onEdit={() => setItemData().then(() => setModalEditVisible(true))}
            onDelete={() => showAlert()}
        />
    );

    return (
        <SlidableCard
            slideWidth={1}
            resetOnBlur={!focused}
            backgroundColor="#1F9FD0"
            buttonsComponent={(props: any) => buttons(props)}>
            <View>
                <Text style={styles.mainText}>{acc_name}</Text>
                <Text style={styles.typeText}>{tipo_de_cuenta}</Text>
                <Text style={styles.amountText}>
                    {formatter.format(monto_inicial)}
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
        </SlidableCard>
    );
};
export default AccountCard;

const styles = StyleSheet.create({
    container: {
        height: 140,
        width: '100%',
        marginBottom: 1,
    },
    item: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 15,
        backgroundColor: '#1F9FD0',
        justifyContent: 'space-between',
    },
    iconContainer: {
        width: '40%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    mainIcon: {
        width: '60%',
        alignItems: 'center',
        justifyContent: 'center',
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
        color: '#fff',
        fontSize: 25,
    },
    btnContainer: {
        height: '49.9%',
        position: 'absolute',
        alignSelf: 'flex-end',
    },
    btn: {
        width: 80,
        height: '100%',
        borderColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnMore: {
        width: '100%',
    },
    btnMoreText: {
        fontSize: 20,
        color: '#fff',
        fontWeight: '500',
    },
});
