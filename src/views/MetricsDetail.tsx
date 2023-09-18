import React from 'react';
import { View } from 'react-native';
import { VictoryPie } from 'victory-native';
import { MetricsCardStyles } from '../styles/GlobalStyles';

const MetricsDetail = ({ route }: any) => {
    // const { acc_name, monto_corriente, monto_inicial } = route.params.item;
    console.log(route);
    const data = [
        { x: 'Cats', y: 35 },
        { x: 'Dogs', y: 40 },
        { x: 'Birds', y: 55 },
    ];

    // const formatData = () => {

    // }
    return (
        <View style={MetricsCardStyles.chartContainer}>
            <VictoryPie
                width={400}
                height={400}
                data={data}
                labelRadius={100}
                labelPosition="centroid"
                labelPlacement="parallel"
                colorScale={'qualitative'}
                style={{
                    labels: { fontSize: 20, fill: '#000', fontWeight: '700' },
                }}
            />
        </View>
    );
};

export default MetricsDetail;
