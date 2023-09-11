import { View, FlatList } from 'react-native';
import React, { useContext, useState } from 'react';
import { toastConfig } from '../styles/ToastStyles';
import { UserContext } from '../controller/UserContext';
import { GastosContext } from '../controller/GastosContext';
import HomeDetailCard from '../components/cards/HomeDetailCard';
import HomeDetailEditModal from '../components/modals/HomeDetailEditModal';

const AccountDetails = () => {
    const { Toast }: any = useContext(UserContext);
    const { gastos }: any = useContext(GastosContext);
    const [selectedId, setSelectedId] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [data, setData] = useState({});
    return (
        <View>
            <FlatList
                data={gastos}
                keyExtractor={item => item._id}
                renderItem={({ item }: any) => (
                    <HomeDetailCard
                        item={item}
                        setData={setData}
                        setSelectedId={setSelectedId}
                        setModalVisible={setModalVisible}
                    />
                )}
            />
            <HomeDetailEditModal
                data={data}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
            />
            <Toast config={toastConfig} />
        </View>
    );
};

export default AccountDetails;
