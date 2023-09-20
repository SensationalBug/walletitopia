import SlidableCard from './SlidableCard';
import MetricsCardView from './MetricsCardView';
import React, { useContext, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { UserContext } from '../../controller/UserContext';
import { GastosContext } from '../../controller/GastosContext';
import { AccountContext } from '../../controller/AccountsContext';
import SliderButtonMetrics from '../sliderButtons/SliderButtonMetrics';

const MetricsCard = ({ item, navigation }: any) => {
    const focused = useIsFocused();
    const [moveSlider, setMoveSlider] = useState(false);
    const { resetSlider }: any = useContext(UserContext);
    const { accountIcon }: any = useContext(AccountContext);
    const { getGastosByAccountId }: any = useContext(GastosContext);
    const {
        _id,
        acc_name,
        monto_inicial,
        tipo_de_cuenta,
        monto_corriente,
        fecha_de_creacion,
    } = item;

    const buttons = (props: any) => {
        return (
            <SliderButtonMetrics
                {...props}
                onDetail={() => {
                    getGastosByAccountId(_id, navigation, 'MetricsDetail');
                }}
            />
        );
    };
    return (
        <SlidableCard
            height="100%"
            slideWidth={1}
            resetOnBlur={!focused}
            moveSlider={moveSlider}
            setMoveSlider={setMoveSlider}
            resetSlider={resetSlider}
            backgroundColor="#1F9FD0"
            buttonsComponent={(props: any) => buttons(props)}>
            <MetricsCardView
                acc_name={acc_name}
                moveSlider={moveSlider}
                accountIcon={accountIcon}
                setMoveSlider={setMoveSlider}
                monto_inicial={monto_inicial}
                tipo_de_cuenta={tipo_de_cuenta}
                monto_corriente={monto_corriente}
                fecha_de_creacion={fecha_de_creacion}
            />
        </SlidableCard>
    );
};

export default MetricsCard;
