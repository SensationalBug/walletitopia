import React, { useContext } from 'react';
import MetricsCard from '../components/cards/MetricsCard';
import { View, FlatList, StyleSheet } from 'react-native';
import { AccountContext } from '../controller/AccountsContext';

const Metrics = ({ navigation }: any) => {
    const { accounts }: any = useContext(AccountContext);
    return (
        <View style={styles.container}>
            <FlatList
                data={accounts}
                keyExtractor={item => item._id}
                renderItem={({ item }) => (
                    <MetricsCard item={item} navigation={navigation} />
                )}
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
