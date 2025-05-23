import HomeCard from '../components/cards/HomeCard';
import { HomeStyles } from '../styles/GlobalStyles';
import { View, Text, FlatList } from 'react-native';
import { toastConfig } from '../styles/ToastStyles';
import { UserContext } from '../controller/UserContext';
import React, { useContext, useEffect, useState } from 'react';
import AddGastoModal from '../components/modals/AddGastoModal';
import { AccountContext } from '../controller/AccountsContext';
import NoAccountMessage from '../components/customComponents/NoAccountMessage';

const Home = ({ navigation }: any) => {
    const { accounts, getAccounts }: any = useContext(AccountContext);
    const [modalVisible, setModalVisible] = useState(false);
    const { Toast, data }: any = useContext(UserContext);
    const [accountsData, setAccountsData] = useState({});

    // useEffect(() => {
    //     getAccounts();
    // }, [getAccounts, accounts]);

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
                <Text style={HomeStyles.mainName}>
                    {data && data.people.fullName}
                </Text>
                {fecha()}
            </View>
            {accounts.length ? (
                <FlatList
                    data={accounts}
                    keyExtractor={item => item._id}
                    renderItem={(item: any) => (
                        <HomeCard
                            {...item}
                            setData={setAccountsData}
                            navigation={navigation}
                            setModalVisible={setModalVisible}
                        />
                    )}
                />
            ) : (
                <NoAccountMessage />
            )}
            <AddGastoModal
                data={accountsData}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
            />
            <Toast config={toastConfig} />
        </View>
    );
};

export default Home;
