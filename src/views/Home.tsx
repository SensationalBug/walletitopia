import HomeCard from '../components/cards/HomeCard';
import { HomeStyles } from '../styles/GlobalStyles';
import { View, Text, FlatList } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import AddGastoModal from '../components/modals/AddGastoModal';
import NoAccountMessage from '../components/customComponents/NoAccountMessage';
import { AccountContext } from '../controller/AccountsContext';

const Home = ({ navigation }: any) => {
    const { accounts, getAccounts }: any = useContext(AccountContext);
    const [modalVisible, setModalVisible] = useState(false);
    const [data, setData] = useState({});
    useEffect(() => {
        getAccounts();
    }, [getAccounts, accounts]);
    const fecha = () => {
        const date = new Date();
        return (
            <Text style={HomeStyles.date}>
                {date.getMonth() + 1}/{date.getDate()}/{date.getFullYear()}
            </Text>
        );
    };
    return (
        <View style={HomeStyles.container}>
            <View>
                <Text style={HomeStyles.mainTitle}>Bienvenido</Text>
                <Text style={HomeStyles.mainName}>Nombre de usuario</Text>
                {fecha()}
            </View>
            {accounts.length ? (
                <FlatList
                    data={accounts}
                    keyExtractor={item => item._id}
                    renderItem={(item: any) => (
                        <HomeCard
                            {...item}
                            setData={setData}
                            navigation={navigation}
                            setModalVisible={setModalVisible}
                        />
                    )}
                />
            ) : (
                <NoAccountMessage />
            )}
            <AddGastoModal
                data={data}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
            />
        </View>
    );
};

export default Home;
