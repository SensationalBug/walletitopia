import { View, FlatList } from 'react-native';
import React, { useContext } from 'react';
import TableData from '../components/TableData';
import { CatContext } from '../controller/CategoriesContext';

const AccountDetails = ({ route }: any) => {
    const { params } = route;
    const { categories }: any = useContext(CatContext);
    return (
        <View>
            <FlatList
                data={params}
                keyExtractor={item => item._id}
                renderItem={({ item }: any) => (
                    <TableData {...item} categories={categories} />
                )}
            />
        </View>
    );
};

export default AccountDetails;
