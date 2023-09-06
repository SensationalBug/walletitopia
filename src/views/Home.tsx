import React, { useContext, useState } from 'react';
import HomeCard from '../components/HomeCard';
import { HomeStyles } from '../styles/GlobalStyles';
import { View, Text, FlatList } from 'react-native';
import { AccountContext } from '../controller/AccountsContext';
import AddGastoModal from '../components/AddGastoModal';

const Home = ({ navigation }: any) => {
    const { accounts }: any = useContext(AccountContext);
    const [modalVisible, setModalVisible] = useState(false);
    const [data, setData] = useState({});
    return (
        <View style={HomeStyles.container}>
            <View>
                <Text style={HomeStyles.mainTitle}>Bienvenido</Text>
                <Text style={HomeStyles.mainName}>Nombre de usuario</Text>
                <Text style={HomeStyles.date}>Fecha Actual</Text>
            </View>
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
            <AddGastoModal
                data={data}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
            />
        </View>
    );
};

export default Home;
