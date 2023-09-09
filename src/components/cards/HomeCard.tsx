import React, { useContext } from 'react';
import SlidableCard from './SlidableCard';
import { View, Text, StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { UserContext } from '../../controller/UserContext';
import { GastosContext } from '../../controller/GastosContext';
import { AccountContext } from '../../controller/AccountsContext';
import SliderButtonsHome from '../sliderButtons/SliderButtonsHome';

const color = {
    rojo: '#F24C3D',
    verde: '#1F8A70',
    base: '#122e49',
    blanco: '#ffffff',
    bRojo: '#ff0000',
};
const HomeCard = ({ item, navigation, setModalVisible }: any) => {
    const focused = useIsFocused();
    const { updStateData, resetSlider, setResetSlider }: any =
        useContext(UserContext);
    const { formatter, accountIcon }: any = useContext(AccountContext);
    const { setNewGasto, getGastosByAccountId }: any =
        useContext(GastosContext);
    const { _id, acc_name, monto_corriente, tipo_de_cuenta } = item;

    const buttons = (props: any) => (
        <SliderButtonsHome
            {...props}
            onAddGasto={() => {
                setResetSlider(false);
                setModalVisible(true);
                updStateData(setNewGasto, _id, 'id_cuenta');
                updStateData(setNewGasto, 1, 'tipo_gasto');
            }}
            onAddDebito={() => {
                setResetSlider(false);
                setModalVisible(true);
                updStateData(setNewGasto, _id, 'id_cuenta');
                updStateData(setNewGasto, 0, 'tipo_gasto');
            }}
            onViewDetails={() => {
                setResetSlider(false);
                getGastosByAccountId(_id, navigation);
            }}
        />
    );

    return (
        <SlidableCard
            slideWidth={2}
            resetOnBlur={!focused}
            resetSlider={resetSlider}
            backgroundColor="#1F9FD0"
            buttonsComponent={(props: any) => buttons(props)}>
            <View>
                <Text style={styles.mainText}>{acc_name}</Text>
                <Text style={styles.typeText}>{tipo_de_cuenta}</Text>
                <Text
                    style={[
                        styles.amountText,
                        {
                            color:
                                monto_corriente < 0
                                    ? color.bRojo
                                    : color.blanco,
                        },
                    ]}>
                    {formatter.format(monto_corriente)}
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
export default HomeCard;

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
