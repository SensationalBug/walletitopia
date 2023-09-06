import { View, Text, StyleSheet } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { AccountContext } from '../controller/AccountsContext';

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
    categories,
}: any) => {
    const [categoryName, setCategoryName] = useState('');
    const { formatter }: any = useContext(AccountContext);
    useEffect(() => {
        for (let category of categories) {
            if (category._id === id_categoria) {
                setCategoryName(category.icon_name);
            }
        }
    }, [categories, id_categoria]);
    return (
        <View
            style={[
                styles.item,
                {
                    backgroundColor:
                        tipo_gastos === 'credito'
                            ? color.debito
                            : color.credito,
                },
            ]}>
            <View style={styles.dataContainer}>
                <Text style={styles.mainText}>{concepto}</Text>
                <Text style={styles.mainText}>{formatter.format(monto)}</Text>
                <Text style={styles.dateText}>
                    {fecha_de_creacion.split('T')[0]}
                </Text>
            </View>
            <View style={styles.iconContainer}>
                <Icon name={categoryName} size={60} color="#fff" />
            </View>
        </View>
    );
};

export default TableData;

const styles = StyleSheet.create({
    item: {
        marginTop: 3,
        flexDirection: 'row',
    },
    dataContainer: {
        width: '70%',
        paddingVertical: 5,
        paddingHorizontal: 20,
    },
    mainText: {
        fontSize: 30,
        color: '#fff',
    },
    dateText: {
        color: '#fff',
        fontSize: 15,
    },
    amountText: {
        color: '#fff',
        fontSize: 25,
    },
    iconContainer: {
        width: '30%',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
