import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, Text, TouchableOpacity } from 'react-native';
import { MetricsCardStyles } from '../../styles/GlobalStyles';
import { GlobalConfigColor } from '../../styles/GlobalStyles';

const MetricsCardView = ({
    acc_name,
    moveSlider,
    accountIcon,
    setMoveSlider,
    monto_inicial,
    tipo_de_cuenta,
    monto_corriente,
    fecha_de_creacion,
}: any) => {
    return (
        <TouchableOpacity
            style={MetricsCardStyles.dataContainer}
            onPress={() => setMoveSlider(!moveSlider)}>
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
        </TouchableOpacity>
    );
};

export default MetricsCardView;
