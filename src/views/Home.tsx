import { View, Text, FlatList } from 'react-native';
import React, { useContext } from 'react';
import { HomeStyles } from '../styles/GlobalStyles';
import AccountCard from '../components/AccountCard';
import { AccContext } from '../controller/AccountsContext';

const Home = () => {
    const { accounts }: any = useContext(AccContext);

    return (
        <View style={HomeStyles.container}>
            <View>
                <Text style={HomeStyles.mainTitle}>Bienvenido</Text>
                <Text style={HomeStyles.mainName}>Nombre de usuario</Text>
                <Text style={HomeStyles.date}>Fecha Actual</Text>
            </View>
            <FlatList
                data={accounts}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <AccountCard {...item} />}
            />
        </View>
    );
};

export default Home;
