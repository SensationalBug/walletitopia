import MainCard from './MainCard';
import { Alert } from 'react-native';
import React, { useContext, useState } from 'react';
import SlidableCard from './SlidableCard';
import { useIsFocused } from '@react-navigation/native';
import { UserContext } from '../../controller/UserContext';
import { AccountContext } from '../../controller/AccountsContext';
import SliderButtonsAccount from '../sliderButtons/SliderButtonsAccount';

interface types {
    item: {
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
    const { deleteAccount }: any = useContext(AccountContext);
    const { resetSlider /*setResetSlider*/ }: any = useContext(UserContext);
    const { _id, acc_name, monto_inicial, tipo_de_cuenta } = item;
    const [moveSlider, setMoveSlider] = useState(false);

    const showAlert = () => {
        Alert.alert(
            'Advertencia',
            `Seguro que quieres eliminar la cuenta ${acc_name} ?`,
            [
                {
                    text: 'No',
                    // onPress: () => setResetSlider(true),
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
            onEdit={() => {
                // setResetSlider(false);
                setItemData().then(() => setModalEditVisible(true));
            }}
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
