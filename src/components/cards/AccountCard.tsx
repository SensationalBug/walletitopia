import MainCard from './MainCard';
import { Alert } from 'react-native';
import SlidableCard from './SlidableCard';
import React, { useContext, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { UserContext } from '../../controller/UserContext';
import { AccountContext } from '../../controller/AccountsContext';
import SliderButtonsAccount from '../sliderButtons/SliderButtonsAccount';

interface types {
    item?: {
        _id: string;
        acc_name: string;
        monto_inicial: number;
        tipo_de_cuenta: string;
    };
    setModalEditVisible: any;
    setData: any;
}

const AccountCard = ({ item, setModalEditVisible, setData }: types) => {
    const focused = useIsFocused();
    const { resetSlider }: any = useContext(UserContext);
    const { deleteAccount }: any = useContext(AccountContext);
    const { _id, acc_name, monto_inicial, tipo_de_cuenta } = item;
    const [moveSlider, setMoveSlider] = useState(false);

    const showAlert = () => {
        Alert.alert(
            'Advertencia',
            `Seguro que quieres eliminar la cuenta ${acc_name} ?`,
            [
                {
                    text: 'No',
                },
                {
                    text: 'Si',
                    onPress: () => deleteAccount(_id),
                },
            ],
        );
    };

    const setItemData = () => {
        return new Promise(resolve => {
            setData(item);
            resolve('ok');
        });
    };

    const buttons = (props: any) => (
        <SliderButtonsAccount
            {...props}
            onEdit={() => setItemData().then(() => setModalEditVisible(true))}
            onDelete={() => showAlert()}
        />
    );

    return (
        <SlidableCard
            height="49.9%"
            slideWidth={1}
            resetOnBlur={!focused}
            moveSlider={moveSlider}
            setMoveSlider={setMoveSlider}
            resetSlider={resetSlider}
            backgroundColor="#1F9FD0"
            buttonsComponent={(props: any) => buttons(props)}>
            <MainCard
                onMove={setMoveSlider}
                moveSlider={moveSlider}
                acc_name={acc_name}
                monto={monto_inicial}
                tipo_de_cuenta={tipo_de_cuenta}
            />
        </SlidableCard>
    );
};
export default AccountCard;
