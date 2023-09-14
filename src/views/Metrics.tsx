import { View, FlatList, StyleSheet } from 'react-native';
import React, { useContext } from 'react';
import { AccountContext } from '../controller/AccountsContext';
import MetricsCard from '../components/cards/MetricsCard';

const Metrics = () => {
    const { accounts }: any = useContext(AccountContext);
    return (
        <View style={styles.container}>
            <FlatList
                data={accounts}
                keyExtractor={item => item._id}
                renderItem={({ item }) => <MetricsCard {...item} />}
            />
        </View>
    );
};

export default Metrics;

const styles = StyleSheet.create({
    container: {
        height: '100%',
    },
});
