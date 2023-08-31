import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

const color = {
    credito: '#1F8A70',
    debito: '#F24C3D',
};
const TableData = ({
    concepto,
    monto,
    tipo_gastos,
    id_categoria,
    fecha_de_creacion,
}: any) => {
    return (
        <View
            style={[
                styles.item,
                {
                    backgroundColor:
                        tipo_gastos === 'credito'
                            ? color.credito
                            : color.debito,
                },
            ]}>
            <View>
                <Text style={styles.mainText}>{concepto}</Text>
                <Text style={styles.mainText}>{monto}</Text>
            </View>
            <View style={styles.iconContainer}>
                <Icon name={id_categoria} />
                <Text style={styles.typeText}>{fecha_de_creacion}</Text>
            </View>
        </View>
    );
};

export default TableData;

const styles = StyleSheet.create({
    item: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 15,
        backgroundColor: '#1F9FD0',
        justifyContent: 'space-between',
        marginTop: 3,
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
    iconContainer: {
        justifyContent: 'space-between',
    },
});
