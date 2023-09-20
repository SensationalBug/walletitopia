import { View, Text } from 'react-native';
import React, { useContext } from 'react';
import { VictoryPie } from 'victory-native';
import { MetricsCardStyles } from '../styles/GlobalStyles';
import { CatContext } from '../controller/CategoriesContext';

const MetricsDetail = ({ route }: any) => {
    const { categories }: any = useContext(CatContext);
    const CategoryIcon = (id: string) => {
        for (let category of categories) {
            if (id === category._id) {
                console.log(category.category_name);
                return category.category_name;
            }
        }
    };
    const data = () => {
        const dataSet: Array<any> = [];
        route.params.map((elem: any) => {
            console.log(elem);
            dataSet.push({
                x: <Text>{CategoryIcon(elem.id_categoria)}</Text>,
                y: elem.monto,
            });
        });
        return dataSet;
    };
    return (
        <View style={MetricsCardStyles.chartContainer}>
            <VictoryPie
                width={400}
                height={400}
                data={data()}
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
