import React from 'react';
import { PieChart } from 'react-native-chart-kit';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const fontColor = {
    blanco: '#fff',
};

const MetricsCard = ({
    acc_name,
    monto_inicial,
    tipo_de_cuenta,
    monto_corriente,
    fecha_de_creacion,
}: any) => {
    const width = Dimensions.get('window').width;
    const data = [
        {
            name: 'Seoul',
            population: 21500000,
            color: 'rgba(131, 167, 234, 1)',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
        },
        {
            name: 'Toronto',
            population: 2800000,
            color: '#F00',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
        },
        {
            name: 'Beijing',
            population: 527612,
            color: 'red',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
        },
        {
            name: 'New York',
            population: 8538000,
            color: '#ffffff',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
        },
        {
            name: 'Moscow',
            population: 11920000,
            color: 'rgb(0, 0, 255)',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
        },
    ];
    const chartConfig = {
        backgroundGradientFrom: '#1E2923',
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: '#08130D',
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        barPercentage: 0.5,
    };
    return (
        <View style={styles.container}>
            <View style={styles.dataContainer}>
                <View style={styles.textContent}>
                    <Text style={[styles.title, { color: fontColor.blanco }]}>
                        {acc_name}
                    </Text>
                </View>
                <View style={styles.amountContent}>
                    <View style={styles.textContent}>
                        <Text style={styles.amount}>
                            Monto Inicial: {monto_inicial}
                        </Text>
                        <Text style={styles.amount}>
                            Monto Restante: {monto_corriente}
                        </Text>
                    </View>
                    <View style={styles.textContent}>
                        <Icon name={tipo_de_cuenta} />
                        <Text
                            style={[styles.date, { color: fontColor.blanco }]}>
                            Creada: {fecha_de_creacion.split('T')[0]}
                        </Text>
                    </View>
                </View>
            </View>
            <View style={styles.chartContainer}>
                <PieChart
                    data={data}
                    width={width}
                    height={220}
                    chartConfig={chartConfig}
                    accessor={'population'}
                    backgroundColor={'transparent'}
                    paddingLeft={'15'}
                    center={[10, 50]}
                    absolute
                />
            </View>
        </View>
    );
};

export default MetricsCard;

const styles = StyleSheet.create({
    container: {
        marginVertical: 5,
        paddingHorizontal: 5,
        backgroundColor: '#1F9FD0',
    },
    dataContainer: {
        backgroundColor: 'red',
    },
    textContent: {
        marginVertical: 10,
    },
    title: {
        color: '#fff',
        fontSize: 25,
    },
    amountContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    amount: {
        color: '#fff',
        fontSize: 16,
    },
    date: {
        color: '#fff',
    },
    chartContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'green',
    },
});
