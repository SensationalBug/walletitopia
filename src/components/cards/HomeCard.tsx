import MainCard from './MainCard';
import SlidableCard from './SlidableCard';
import React, { useContext, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { UserContext } from '../../controller/UserContext';
import { GastosContext } from '../../controller/GastosContext';
import SliderButtonsHome from '../sliderButtons/SliderButtonsHome';

const HomeCard = ({ item, navigation, setModalVisible }: any) => {
    const focused = useIsFocused();
    const { updStateData, resetSlider }: any = useContext(UserContext);
    const { setNewGasto, getGastosByAccountId }: any =
        useContext(GastosContext);
    const { _id, acc_name, monto_corriente, tipo_de_cuenta } = item;
    const [moveSlider, setMoveSlider] = useState(false);

    const buttons = (props: any) => (
        <SliderButtonsHome
            {...props}
            onAddGasto={() => {
                setModalVisible(true);
                updStateData(setNewGasto, _id, 'id_cuenta');
                updStateData(setNewGasto, 1, 'tipo_gasto');
            }}
            onAddDebito={() => {
                setModalVisible(true);
                updStateData(setNewGasto, _id, 'id_cuenta');
                updStateData(setNewGasto, 0, 'tipo_gasto');
            }}
            onViewDetails={() => {
                getGastosByAccountId(_id, navigation, 'AccountDetails');
            }}
        />
    );

    return (
        <SlidableCard
            height="49.9%"
            slideWidth={2}
            resetOnBlur={!focused}
            moveSlider={moveSlider}
            setMoveSlider={setMoveSlider}
            resetSlider={resetSlider}
            backgroundColor="#1F9FD0"
            buttonsComponent={(props: any) => buttons(props)}>
            <MainCard
                acc_name={acc_name}
                monto={monto_corriente}
                onMove={setMoveSlider}
                moveSlider={moveSlider}
                tipo_de_cuenta={tipo_de_cuenta}
            />
        </SlidableCard>
    );
};
export default HomeCard;
