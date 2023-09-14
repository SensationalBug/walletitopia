import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';

const fontColor = {
    blanco: '#fff',
};

const MetricsCard = ({
    acc_name,
    monto_inicial,
    // tipo_de_cuenta,
    monto_corriente,
    fecha_de_creacion,
}: any) => {
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
                        {/* <Icon name={tipo_de_cuenta} /> */}
                        <Text
                            style={[styles.date, { color: fontColor.blanco }]}>
                            Creada: {fecha_de_creacion.split('T')[0]}
                        </Text>
                    </View>
                </View>
            </View>
            <View style={styles.chartContainer}> </View>
        </View>
    );
};

export default MetricsCard;

const styles = StyleSheet.create({
    chart: {
        height: 200,
    },
    container: {
        // height: '50%',
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
    },
});
