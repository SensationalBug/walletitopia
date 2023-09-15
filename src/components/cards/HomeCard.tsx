import MainCard from './MainCard';
import React, { useContext } from 'react';
import SlidableCard from './SlidableCard';
import { useIsFocused } from '@react-navigation/native';
import { UserContext } from '../../controller/UserContext';
import { GastosContext } from '../../controller/GastosContext';
import SliderButtonsHome from '../sliderButtons/SliderButtonsHome';

const HomeCard = ({ item, navigation, setModalVisible }: any) => {
    const focused = useIsFocused();
    const { updStateData, resetSlider, setResetSlider }: any =
        useContext(UserContext);
    const { setNewGasto, getGastosByAccountId }: any =
        useContext(GastosContext);
    const { _id, acc_name, monto_corriente, tipo_de_cuenta } = item;

    const buttons = (props: any) => (
        <SliderButtonsHome
            {...props}
            onAddGasto={() => {
                setResetSlider(false);
                setModalVisible(true);
                updStateData(setNewGasto, _id, 'id_cuenta');
                updStateData(setNewGasto, 1, 'tipo_gasto');
            }}
            onAddDebito={() => {
                setResetSlider(false);
                setModalVisible(true);
                updStateData(setNewGasto, _id, 'id_cuenta');
                updStateData(setNewGasto, 0, 'tipo_gasto');
            }}
            onViewDetails={() => {
                setResetSlider(false);
                getGastosByAccountId(_id, navigation, 'AccountDetails');
            }}
        />
    );

    return (
        <SlidableCard
            height="49.9%"
            slideWidth={2}
            resetOnBlur={!focused}
            resetSlider={resetSlider}
            backgroundColor="#1F9FD0"
            buttonsComponent={(props: any) => buttons(props)}>
            <MainCard
                acc_name={acc_name}
                monto={monto_corriente}
                tipo_de_cuenta={tipo_de_cuenta}
            />
        </SlidableCard>
    );
};
export default HomeCard;
