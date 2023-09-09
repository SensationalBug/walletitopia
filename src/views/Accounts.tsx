import { FAB } from 'react-native-paper';
import React, { useContext, useState } from 'react';
import { toastConfig } from '../styles/ToastStyles';
import { UserContext } from '../controller/UserContext';
import AccountCard from '../components/cards/AccountCard';
import { View, StyleSheet, FlatList } from 'react-native';
import AccountModal from '../components/modals/AccountModal';
import NoAccountMessage from '../components/customComponents/NoAccountMessage';
import { AccountContext } from '../controller/AccountsContext';
import AccountEditModal from '../components/modals/AccountEditModal';

const Accounts = () => {
    const { accounts }: any = useContext(AccountContext);
    const { Toast }: any = useContext(UserContext);

    const [data, setData] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [modalEditVisible, setModalEditVisible] = useState(false);
    return (
        <View style={styles.container}>
            {accounts?.length ? (
                <FlatList
                    data={accounts}
                    keyExtractor={(item: any) => item._id}
                    renderItem={(item: any) => (
                        <AccountCard
                            {...item}
                            setData={setData}
                            setModalEditVisible={setModalEditVisible}
                        />
                    )}
                />
            ) : (
                <NoAccountMessage position="center" />
            )}
            <View style={styles.buttonsContainer}>
                <View style={styles.FABContainer}>
                    <FAB
                        icon="plus"
                        color="#fff"
                        style={styles.FABStyle}
                        onPress={() => setModalVisible(true)}
                    />
                </View>
            </View>
            <AccountModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
            />
            <AccountEditModal
                data={data}
                modalVisible={modalEditVisible}
                setModalVisible={setModalEditVisible}
            />
            <Toast config={toastConfig} />
        </View>
    );
};

export default Accounts;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 3,
        justifyContent: 'space-between',
    },
    buttonsContainer: {
        right: 0,
        bottom: 0,
        width: '100%',
        position: 'absolute',
    },
    FABContainer: {
        margin: 10,
        borderRadius: 10,
        textAlign: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    FABStyle: {
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#122e49',
    },
});
