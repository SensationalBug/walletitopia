import React, { useContext } from 'react';
import { View, FlatList } from 'react-native';
import { GastosContext } from '../controller/GastosContext';
import { CatContext } from '../controller/CategoriesContext';
import HomeDetailCard from '../components/cards/HomeDetailCard';

const AccountDetails = () => {
    const { gastos }: any = useContext(GastosContext);
    const { categories }: any = useContext(CatContext);
    return (
        <View>
            <FlatList
                data={gastos}
                keyExtractor={item => item._id}
                renderItem={({ item }: any) => (
                    <HomeDetailCard {...item} categories={categories} />
                )}
            />
        </View>
    );
};

export default AccountDetails;
