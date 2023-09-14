import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { PieChart } from 'react-native-charts-wrapper';

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
    const data = {
        dataSets: [
            {
                values: [
                    { value: 45, label: 'Sandwiches' },
                    { value: 21, label: 'Salads' },
                    { value: 15, label: 'Soup' },
                    { value: 9, label: 'Beverages' },
                    { value: 15, label: 'Desserts' },
                ],
                label: 'Pie dataset',
                config: {
                    colors: [
                        '#C0FF8C',
                        '#FFF78C',
                        '#FFD08C',
                        '#8CEAFF',
                        '#FF8C9D',
                    ],
                    valueTextSize: 20,
                    valueTextColor: 'green',
                    sliceSpace: 5,
                    selectionShift: 13,
                    // xValuePosition: "OUTSIDE_SLICE",
                    // yValuePosition: "OUTSIDE_SLICE",
                    valueFormatter: "#.#'%'",
                    valueLineColor: 'green',
                    valueLinePart1Length: 0.5,
                },
            },
        ],
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
                        {/* <Icon name={tipo_de_cuenta} /> */}
                        <Text
                            style={[styles.date, { color: fontColor.blanco }]}>
                            Creada: {fecha_de_creacion.split('T')[0]}
                        </Text>
                    </View>
                </View>
            </View>
            <View style={styles.chartContainer}>
                <PieChart
                    style={styles.chart}
                    logEnabled={true}
                    chartBackgroundColor={'pink'}
                    chartDescription={'prueba'}
                    data={data}
                    legend={'legend'}
                    highlights={{ x: 2 }}
                    extraOffsets={{ left: 5, top: 5, right: 5, bottom: 5 }}
                    entryLabelColor={'green'}
                    entryLabelTextSize={20}
                    entryLabelFontFamily={'HelveticaNeue-Medium'}
                    drawEntryLabels={true}
                    rotationEnabled={true}
                    rotationAngle={45}
                    usePercentValues={true}
                    // eslint-disable-next-line react-native/no-inline-styles
                    styledCenterText={{
                        text: 'Pie center text!',
                        color: 'pink',
                        fontFamily: 'HelveticaNeue-Medium',
                        size: 20,
                    }}
                    centerTextRadiusPercent={100}
                    holeRadius={40}
                    holeColor={'#f0f0f0'}
                    transparentCircleRadius={45}
                    transparentCircleColor={'#f0f0f088'}
                    maxAngle={350}
                    // onSelect={this.handleSelect.bind(this)}
                    onChange={(event: any) => console.log(event.nativeEvent)}
                />
            </View>
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
