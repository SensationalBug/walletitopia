import {
    GlobalConfigColor,
    HomeDetailCardStyles,
} from '../../styles/GlobalStyles';
import SlidableCard from './SlidableCard';
import { useIsFocused } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { UserContext } from '../../controller/UserContext';
import React, { useState, useEffect, useContext } from 'react';
import { GastosContext } from '../../controller/GastosContext';
import { CatContext } from '../../controller/CategoriesContext';
import { AccountContext } from '../../controller/AccountsContext';
import { View, Text, Alert, TouchableOpacity } from 'react-native';
import SliderButtonsAccount from '../sliderButtons/SliderButtonsAccount';

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
    const [moveSlider, setMoveSlider] = useState(false);
    const { categories }: any = useContext(CatContext);
    const { formatter }: any = useContext(AccountContext);
    const { deleteGasto }: any = useContext(GastosContext);
    const { /*setResetSlider,*/ resetSlider }: any = useContext(UserContext);
    const [categoryName, setCategoryName] = useState('question-circle-o');
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
                    // onPress: () => setResetSlider(true),
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
                    // setResetSlider(false);
                    setSelectedId(item.id_categoria);
                })
            }
            onDelete={() => {
                showAlert();
                // setResetSlider(false);
            }}
        />
    );
    return (
        <SlidableCard
            height="49.9%"
            slideWidth={1}
            moveSlider={moveSlider}
            setMoveSlider={setMoveSlider}
            resetOnBlur={!focused}
            resetSlider={resetSlider}
            backgroundColor={
                !tipo_gasto
                    ? GlobalConfigColor.primaryRed
                    : GlobalConfigColor.primaryGreen
            }
            buttonsComponent={(props: any) => buttons(props)}>
            <TouchableOpacity
                style={HomeDetailCardStyles.item}
                onPress={() => setMoveSlider(!moveSlider)}>
                <View style={HomeDetailCardStyles.dataContainer}>
                    <Text style={HomeDetailCardStyles.mainText}>
                        {concepto}
                    </Text>
                    <Text style={HomeDetailCardStyles.mainText}>
                        {formatter.format(monto)}
                    </Text>
                    <Text style={HomeDetailCardStyles.dateText}>
                        {fecha_de_creacion.split('T')[0]}
                    </Text>
                </View>
                <View style={HomeDetailCardStyles.iconContainer}>
                    <Icon name={categoryName} size={60} color="#fff" />
                </View>
            </TouchableOpacity>
        </SlidableCard>
    );
};

export default HomeDetailCard;
