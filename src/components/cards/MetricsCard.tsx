import {
    GlobalConfigColor,
    MetricsCardStyles,
} from '../../styles/GlobalStyles';
import React, { useContext } from 'react';
import SlidableCard from './SlidableCard';
import { View, Text } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { UserContext } from '../../controller/UserContext';
import { AccountContext } from '../../controller/AccountsContext';
import SliderButtonMetrics from '../sliderButtons/SliderButtonMetrics';
import { GastosContext } from '../../controller/GastosContext';

const MetricsCard = ({ item, navigation }: any) => {
    const focused = useIsFocused();
    const { resetSlider }: any = useContext(UserContext);
    const { accountIcon }: any = useContext(AccountContext);
    const { getGastosByAccountId }: any = useContext(GastosContext);
    const {
        _id,
        acc_name,
        monto_inicial,
        tipo_de_cuenta,
        monto_corriente,
        fecha_de_creacion,
    } = item;

    const buttons = (props: any) => {
        return (
            <SliderButtonMetrics
                {...props}
                onDetail={() => {
                    getGastosByAccountId(_id, navigation, 'MetricsDetail');
                    navigation.navigate('MetricsDetail', { item });
                }}
            />
        );
    };
    return (
        <SlidableCard
            height="100%"
            slideWidth={1}
            resetOnBlur={!focused}
            resetSlider={resetSlider}
            backgroundColor="#1F9FD0"
            buttonsComponent={(props: any) => buttons(props)}>
            <View style={MetricsCardStyles.dataContainer}>
                <View style={MetricsCardStyles.textContent}>
                    <Text
                        style={[
                            MetricsCardStyles.title,
                            { color: GlobalConfigColor.white },
                        ]}>
                        {acc_name}
                    </Text>
                    <Text style={[{ color: GlobalConfigColor.white }]}>
                        {fecha_de_creacion.split('T')[0]}
                    </Text>
                    <Text style={MetricsCardStyles.amountText}>
                        Monto Inicial:
                        <Text style={MetricsCardStyles.amount}>
                            {monto_inicial}
                        </Text>
                    </Text>
                    <Text style={MetricsCardStyles.amountText}>
                        Monto Restante:
                        <Text
                            style={[
                                MetricsCardStyles.amount,
                                {
                                    color:
                                        monto_corriente < 0
                                            ? GlobalConfigColor.secondaryRed
                                            : GlobalConfigColor.white,
                                },
                            ]}>
                            {monto_corriente}
                        </Text>
                    </Text>
                </View>
                <View style={MetricsCardStyles.iconContent}>
                    <Icon
                        name={accountIcon(tipo_de_cuenta)}
                        size={80}
                        color="#fff"
                    />
                </View>
                <View style={MetricsCardStyles.iconShow}>
                    <Icon name="chevron-left" size={20} color="#fff" />
                </View>
            </View>
        </SlidableCard>
    );
};

export default MetricsCard;
