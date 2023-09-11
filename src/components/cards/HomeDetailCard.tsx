import SlidableCard from './SlidableCard';
import { useIsFocused } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { UserContext } from '../../controller/UserContext';
import { View, Text, StyleSheet, Alert } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { GastosContext } from '../../controller/GastosContext';
import { CatContext } from '../../controller/CategoriesContext';
import { AccountContext } from '../../controller/AccountsContext';
import SliderButtonsAccount from '../sliderButtons/SliderButtonsAccount';

const color = {
    credito: '#1F8A70',
    debito: '#F24C3D',
};

export interface types {
    item: {
        _id: string;
        id_cuenta: string;
        concepto: string;
        monto: number;
        tipo_gasto: number;
        id_categoria: string;
        fecha_de_creacion: string;
    };
    setData: any;
    setSelectedId: any;
    setModalVisible: any;
}
const HomeDetailCard = ({
    item,
    setData,
    setSelectedId,
    setModalVisible,
}: types) => {
    const focused = useIsFocused();
    const [categoryName, setCategoryName] = useState('question-circle-o');
    const { categories }: any = useContext(CatContext);
    const { formatter }: any = useContext(AccountContext);
    const { deleteGasto }: any = useContext(GastosContext);
    const { setResetSlider, resetSlider }: any = useContext(UserContext);
    const {
        _id,
        id_cuenta,
        concepto,
        monto,
        tipo_gasto,
        id_categoria,
        fecha_de_creacion,
    } = item;

    useEffect(() => {
        for (let category of categories) {
            if (category._id === id_categoria) {
                setCategoryName(category.icon_name);
            }
        }
    }, [categories, id_categoria, tipo_gasto, item]);

    // Funcion para mostrar el alert previo a borrar un gasto
    const showAlert = () => {
        Alert.alert(
            'Advertencia',
            `Seguro que quieres eliminar el gasto ${concepto} ?`,
            [
                {
                    text: 'No',
                    onPress: () => setResetSlider(true),
                },
                {
                    text: 'Si',
                    onPress: () => deleteGasto(_id, id_cuenta),
                },
            ],
        );
    };

    const setItemData = (elem: any) => {
        return new Promise(resolve => {
            setData(elem);
            resolve('ok');
        });
    };

    const buttons = (props: any) => (
        <SliderButtonsAccount
            {...props}
            onEdit={() =>
                setItemData(item).then(() => {
                    setModalVisible(true);
                    setResetSlider(false);
                    setSelectedId(item.id_categoria);
                })
            }
            onDelete={() => {
                showAlert();
                setResetSlider(false);
            }}
        />
    );
    return (
        <SlidableCard
            slideWidth={1}
            resetOnBlur={!focused}
            resetSlider={resetSlider}
            backgroundColor={!tipo_gasto ? color.debito : color.credito}
            buttonsComponent={(props: any) => buttons(props)}>
            <View style={styles.item}>
                <View style={styles.dataContainer}>
                    <Text style={styles.mainText}>{concepto}</Text>
                    <Text style={styles.mainText}>
                        {formatter.format(monto)}
                    </Text>
                    <Text style={styles.dateText}>
                        {fecha_de_creacion.split('T')[0]}
                    </Text>
                </View>
                <View style={styles.iconContainer}>
                    <Icon name={categoryName} size={60} color="#fff" />
                </View>
            </View>
        </SlidableCard>
    );
};

export default HomeDetailCard;

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
